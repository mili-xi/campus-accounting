
const fs = require('fs');
const path = 'pages/analysis/analysis.js';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split(/\r?\n/);

console.log('=== Line numbers (1-based) ===');
for (let i = 305; i <= 325; i++) {
    console.log(`Line ${i}:`, JSON.stringify(lines[i - 1]));
}

console.log('\n=== Attempting to parse file ===');
try {
    new Function(content);
    console.log('Success: File parsed correctly');
} catch (error) {
    console.log('Error:', error);
}
