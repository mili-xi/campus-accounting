const fs = require('fs');
const path = require('path');

const analysisFile = path.join(__dirname, 'pages', 'analysis', 'analysis.js');
const content = fs.readFileSync(analysisFile, 'utf8');
const lines = content.split('\n');

console.log('=== Lines containing "now" ===');
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('now')) {
        console.log(i + 1 + ': ' + lines[i]);
    }
}
