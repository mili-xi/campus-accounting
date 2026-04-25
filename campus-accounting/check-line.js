
const fs = require('fs');
const path = 'pages/analysis/analysis.js';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split(/\r?\n/);

console.log('=== Line numbers 385-395 (1-based) ===');
for (let i = 385; i <= 395; i++) {
    console.log(`Line ${i}:`, JSON.stringify(lines[i - 1]));
}
