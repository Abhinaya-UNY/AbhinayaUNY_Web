const fs = require('fs');
const path = require('path');

const content = fs.readFileSync('data/instagramFeedData.ts', 'utf8');
const arrayMatch = content.match(/export const INSTAGRAM_FEED_ITEMS: InstagramFeedItem\[\] = (\[[\s\S]*?\]);\s*\n\s*export const INSTAGRAM_FEED_CATEGORIES/);
const items = eval(arrayMatch[1]);

console.log('--- POSTS AUDIT ---');
let aiSlopFound = 0;
let emDashFound = 0;
let emojiFound = 0;
let englishGenericFound = 0;

items.forEach((item, i) => {
  const text = item.title + ' ' + item.caption;
  if (/—|\u2014/.test(text)) {
    console.error('EM DASH at item', i, item.id);
    emDashFound++;
  }
  if (/\p{Extended_Pictographic}/u.test(text)) {
    console.error('EMOJI at item', i, item.id);
    emojiFound++;
  }
  if (/Together, we’re stronger|No challenge can defeat us|greatness is on the way/i.test(text)) {
    console.error('AI SLOP EN at item', i, item.id);
    aiSlopFound++;
  }
  if (/lorem ipsum|as an ai|in conclusion|delve into|testament/i.test(text)) {
    console.error('GENERIC AI WORDS at item', i, item.id);
    englishGenericFound++;
  }
  console.log(`[${i+1}] Year: ${item.year} | ID: ${item.id}\n     Title: ${item.title}\n     Caption: ${item.caption.replace(/\n+/g, ' ').slice(0, 100)}...\n`);
});

console.log('====================================');
console.log('Total posts audited:', items.length);
console.log('Em Dash count:', emDashFound);
console.log('Emoji count:', emojiFound);
console.log('Repetitive English slop count:', aiSlopFound);
console.log('Generic AI words count:', englishGenericFound);
if (items.length === 45 && emDashFound === 0 && emojiFound === 0 && aiSlopFound === 0 && englishGenericFound === 0) {
  console.log('AUDIT RESULT: ALL CHECKS PASSED PERFECTLY!');
} else {
  console.error('AUDIT RESULT: VIOLATIONS DETECTED!');
  process.exit(1);
}
