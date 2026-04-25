const fs = require('fs');
const path = require('path');

const projectDir = '.';
const targetExtensions = ['.json'];

const checkJSONSyntax = () => {
    const files = getFilesWithExtension(targetExtensions);
    let hasErrors = false;

    files.forEach(filePath => {
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            JSON.parse(content);
            console.log(`✅ ${filePath} 语法正确`);
        } catch (error) {
            console.error(`❌ ${filePath} 语法错误: ${error.message}`);
            hasErrors = true;
        }
    });

    if (hasErrors) {
        console.log('\n⚠️  项目中存在JSON文件语法错误！');
        process.exit(1);
    } else {
        console.log('\n🎉 所有JSON文件语法正确！');
    }
};

const getFilesWithExtension = (extensions) => {
    const results = [];

    const walk = (dir) => {
        const files = fs.readdirSync(dir);
        files.forEach(file => {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);
            
            if (stat.isDirectory()) {
                if (file !== 'node_modules' && file !== '.git') {
                    walk(filePath);
                }
            } else {
                if (extensions.some(ext => file.endsWith(ext))) {
                    results.push(filePath);
                }
            }
        });
    };

    walk(projectDir);
    return results;
};

checkJSONSyntax();
