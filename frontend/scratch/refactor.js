
const fs = require('fs');
const file = 'C:/Users/HP/OneDrive/Desktop/project-J/frontend/src/pages/AnalysisPage.jsx';
let content = fs.readFileSync(file, 'utf8');

// Find sections
function extractSection(startMarker, endMarker) {
    const startIdx = content.indexOf(startMarker);
    const endIdx = content.indexOf(endMarker, startIdx);
    if (startIdx === -1 || endIdx === -1) return null;
    return content.substring(startIdx, endIdx);
}

console.log('OK');

