const fs = require('fs');
let content = fs.readFileSync('src/pages/LandingPage.jsx', 'utf8');

// Section boxes
content = content.replace(/className="bg-\[#0f1015\] border border-\[#222222\] rounded-2xl p-6 shadow-md"/g, 'className="bg-[#0f1015] border border-[#222222] rounded-2xl p-4 md:p-6 shadow-md"');

// Inner cards Key Price Levels
content = content.replace(/className="bg-\[#1a1b22\] border border-\[#222222\] rounded-xl p-5/g, 'className="bg-[#1a1b22] border border-[#222222] rounded-xl p-3 md:p-5');

// Watch Next bullet points
content = content.replace(/className="bg-\[#111111\] border border-\[#222222\] rounded-xl p-4 flex gap-3"/g, 'className="bg-[#111111] border border-[#222222] rounded-xl p-3 md:p-4 flex gap-3"');

// IN VERY SHORT and News Cards
content = content.replace(/className="bg-\[#161616\] border border-\[#222222\] rounded-2xl p-6/g, 'className="bg-[#161616] border border-[#222222] rounded-2xl p-4 md:p-6');

// News inner impact analysis
content = content.replace(/className="bg-\[#00d060\]\/5 border border-\[#00d060\]\/20 rounded-xl p-5 mb-5"/g, 'className="bg-[#00d060]/5 border border-[#00d060]/20 rounded-xl p-4 md:p-5 mb-4 md:mb-5"');

fs.writeFileSync('src/pages/LandingPage.jsx', content);
console.log("Done");
