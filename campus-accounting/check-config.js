// 检查项目配置
const fs = require('fs');
const path = require('path');

console.log('=== 项目配置检查 ===');

// 检查项目目录结构
function checkDirectoryStructure() {
    const expectedFiles = ['app.js', 'app.json', 'app.wxss', 'project.config.json', 'pages'];
    const missingFiles = [];

    expectedFiles.forEach(file => {
        const fullPath = path.join(__dirname, file);
        if (!fs.existsSync(fullPath)) {
            missingFiles.push(file);
        }
    });

    if (missingFiles.length > 0) {
        console.error('项目文件缺失:', missingFiles.join(', '));
        return false;
    }

    console.log('项目目录结构完整');
    return true;
}

// 检查 app.json 配置
function checkAppJson() {
    try {
        const appJsonPath = path.join(__dirname, 'app.json');
        const appJsonContent = fs.readFileSync(appJsonPath, 'utf-8');
        const appJson = JSON.parse(appJsonContent);

        // 检查页面配置
        if (!appJson.pages || !Array.isArray(appJson.pages) || appJson.pages.length === 0) {
            console.error('app.json 中未配置页面路径');
            return false;
        }

        console.log('页面配置:', appJson.pages.length, '个页面');

        // 检查 tabBar 配置
        if (appJson.tabBar && appJson.tabBar.list) {
            console.log('tabBar 配置:', appJson.tabBar.list.length, '个项目');

            // 检查 tabBar 页面是否在 pages 数组中
            const tabBarPages = appJson.tabBar.list.map(item => item.pagePath);
            const missingPages = tabBarPages.filter(page => !appJson.pages.includes(page));

            if (missingPages.length > 0) {
                console.warn('⚠️ tabBar 配置的页面不在 pages 数组中:', missingPages.join(', '));
            }
        }

        // 检查 window 配置
        if (!appJson.window) {
            console.warn('⚠️ app.json 中未配置 window 属性');
        }

        return true;
    } catch (error) {
        console.error('解析 app.json 失败:', error);
        return false;
    }
}

// 检查 project.config.json
function checkProjectConfig() {
    try {
        const projectConfigPath = path.join(__dirname, 'project.config.json');
        const projectConfigContent = fs.readFileSync(projectConfigPath, 'utf-8');
        const projectConfig = JSON.parse(projectConfigContent);

        if (!projectConfig.appid) {
            console.error('未配置 AppId');
            return false;
        }

        if (!projectConfig.projectname) {
            console.warn('⚠️ 未配置项目名');
        }

        console.log('项目配置检查完成');
        return true;
    } catch (error) {
        console.error('解析 project.config.json 失败:', error);
        return false;
    }
}

// 检查各个页面的配置
function checkPages() {
    const pagesDir = path.join(__dirname, 'pages');
    const pages = fs.readdirSync(pagesDir);
    let allPagesValid = true;

    pages.forEach(page => {
        const pagePath = path.join(pagesDir, page);
        if (fs.statSync(pagePath).isDirectory()) {
            const expectedFiles = [
                `${page}.js`,
                `${page}.wxml`,
                `${page}.wxss`,
            ];

            const missingFiles = [];
            expectedFiles.forEach(file => {
                const fullPath = path.join(pagePath, file);
                if (!fs.existsSync(fullPath)) {
                    missingFiles.push(file);
                }
            });

            if (missingFiles.length > 0) {
                console.warn(`⚠️ 页面 ${page} 缺少文件:`, missingFiles.join(', '));
                allPagesValid = false;
            } else {
                console.log(`页面 ${page} 配置完整`);
            }
        }
    });

    return allPagesValid;
}

// 主函数
function main() {
    let configValid = true;

    console.log('1. 检查项目目录结构');
    if (!checkDirectoryStructure()) {
        configValid = false;
    }

    console.log('\n2. 检查 app.json 配置');
    if (!checkAppJson()) {
        configValid = false;
    }

    console.log('\n3. 检查项目配置');
    if (!checkProjectConfig()) {
        configValid = false;
    }

    console.log('\n4. 检查各个页面的配置');
    if (!checkPages()) {
        configValid = false;
    }

    console.log('\n=== 检查结束 ===');
    if (configValid) {
        console.log('项目配置检查通过');
    } else {
        console.log('项目配置检查失败');
    }
}

// 运行主函数
main();
