// 检查云开发功能是否已开发
const fs = require('fs');
const path = require('path');

console.log('=== 云开发功能检查 ===');

// 检查云开发配置文件
function checkCloudConfig() {
    const cloudConfigPath = path.join(__dirname, 'cloudfunctions');
    
    console.log('检查云函数目录:', cloudConfigPath);
    
    if (!fs.existsSync(cloudConfigPath)) {
        console.warn('⚠️ 云函数目录不存在');
        return false;
    }
    
    const cloudFunctions = fs.readdirSync(cloudConfigPath);
    console.log('云函数数量:', cloudFunctions.length);
    
    if (cloudFunctions.length === 0) {
        console.warn('⚠️ 云函数目录为空');
    }
    
    // 检查是否有云数据库相关配置
    const databaseConfigPath = path.join(__dirname, 'cloudfunctions', 'database');
    
    if (!fs.existsSync(databaseConfigPath)) {
        console.warn('⚠️ 未找到数据库云函数');
    }
    
    return true;
}

// 检查云开发环境配置
function checkCloudEnvironment() {
    const cloudEnvPath = path.join(__dirname, '.cloudbase');
    
    console.log('检查云环境配置:', cloudEnvPath);
    
    if (!fs.existsSync(cloudEnvPath)) {
        console.warn('⚠️ 云环境配置文件不存在');
        return false;
    }
    
    return true;
}

// 检查 project.config.json 中的云开发配置
function checkProjectCloudConfig() {
    try {
        const projectConfigPath = path.join(__dirname, 'project.config.json');
        const projectConfigContent = fs.readFileSync(projectConfigPath, 'utf-8');
        const projectConfig = JSON.parse(projectConfigContent);
        
        console.log('检查 project.config.json 中的云开发配置');
        
        if (!projectConfig.cloudfunctionRoot) {
            console.warn('⚠️ 未配置云函数根目录');
            return false;
        }
        
        console.log('云函数根目录:', projectConfig.cloudfunctionRoot);
        
        return true;
    } catch (error) {
        console.error('解析 project.config.json 失败:', error);
        return false;
    }
}

// 检查 app.js 中的云开发初始化
function checkAppCloudInit() {
    try {
        const appJsPath = path.join(__dirname, 'app.js');
        const appJsContent = fs.readFileSync(appJsPath, 'utf-8');
        
        console.log('检查 app.js 中的云开发初始化');
        
        if (!appJsContent.includes('wx.cloud.init')) {
            console.error('未在 app.js 中初始化云开发');
            return false;
        }
        
        if (!appJsContent.includes('DYNAMIC_CURRENT_ENV')) {
            console.warn('⚠️ 未使用动态环境变量');
        }
        
        console.log('云开发初始化代码存在');
        
        return true;
    } catch (error) {
        console.error('解析 app.js 失败:', error);
        return false;
    }
}

// 检查云数据库权限配置
function checkDatabasePermissions() {
    // 在微信小程序中，数据库权限配置是在云开发控制台进行的
    // 这里只是提供检查建议
    console.log('数据库权限配置检查建议');
    console.log('1. 请确保 records 集合的权限设置正确');
    console.log('2. 建议设置为"所有用户可读，仅创建者可读写" 或更严格的权限');
    console.log('3. 如果使用云函数，可以设置为"云函数获取数据库权限"');
    console.log('4. 避免使用 "所有用户可读写" 的宽松权限设置');
}

// 主函数
function main() {
    let cloudConfigValid = true;

    console.log('1. 检查云开发配置文件');
    if (!checkCloudConfig()) {
        cloudConfigValid = false;
    }

    console.log('\n2. 检查云环境配置');
    if (!checkCloudEnvironment()) {
        cloudConfigValid = false;
    }

    console.log('\n3. 检查项目云配置');
    if (!checkProjectCloudConfig()) {
        cloudConfigValid = false;
    }

    console.log('\n4. 检查应用云初始化');
    if (!checkAppCloudInit()) {
        cloudConfigValid = false;
    }

    console.log('\n5. 检查数据库权限配置');
    checkDatabasePermissions();

    console.log('\n=== 云开发功能检查结束 ===');
    if (cloudConfigValid) {
        console.log('云开发功能检查通过');
        console.log('建议进一步检查云开发控制台的配置');
    } else {
        console.log('云开发功能检查失败');
    }
}

// 运行主函数
main();
