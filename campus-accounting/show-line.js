const fs = require('fs');
const path = require('path');

const analysisFile = path.join(__dirname, 'pages', 'analysis', 'analysis.js');
const content = fs.readFileSync(analysisFile, 'utf8');
const lines = content.split('\n');

console.log('=== 第 160-190 行 ===');
for (let i = 160; i < 190; i++) {
    const line = lines[i];
    const prefix = i === 174 ? '👉' : '  ';
    console.log(`${prefix}${i + 1}: ${line}`);
}
