const app = document.querySelector('#app');
const A = 'assets/';
const state = JSON.parse(localStorage.getItem('staff-clean-v2') || '{"c1":0,"johnny":0,"c2":0,"done":[]}');
const save = () => localStorage.setItem('staff-clean-v2', JSON.stringify(state));
const fig = (file, label) => `<figure><img src="${A + file}" alt="${label}"><figcaption>${label}</figcaption></figure>`;
const gallery = (...items) => `<section class="gallery">${items.join('')}</section>`;
let currentChapter = 0;
const shell = content => {
  const shown = content
    .replace('Start at the Storrs Library.', 'Start at the library.')
    .replace('Start at the Razzmatazz Kids toy store.', 'Start at Razzmatazz Kids.')
    .replace('<h2>The Ding-Ding clue!</h2>', `${gallery(fig('c7-storefront.jpg', 'Razzmatazz Kids storefront'))}<h2>The Ding-Ding clue!</h2>`);
  const progress = /You are ready to move onto the next chapter/.test(shown) ? '<button class="button ghost" onclick="caseMap()">View the Case Map</button>' : '';
  return `<div class="shell"><img class="form-banner" src="${A}form-header.jpg" alt="The Staff of Ministry — A Longmeadow Outdoor Escape Game"><section class="card">${currentChapter ? `<p class="eyebrow">CHAPTER ${currentChapter} OUT OF 8</p>` : ''}${shown}${progress}</section></div>`;
};
const normalize = value => value.toLowerCase().replace(/[^a-z0-9]/g, '');

function goHome() {
  currentChapter = 0;
  const hasProgress = state.done.length > 0 || state.c1 > 0 || state.johnny > 0 || state.c2 > 0;
  const beginLabel = hasProgress ? 'Continue the adventure' : 'Begin the adventure';
  app.innerHTML = shell(`<h2>Get ready for a <strong>FREE, interactive, historical mystery adventure through Longmeadow!</strong></h2><button class="button ghost" onclick="aboutCreator()">About the game creators</button><p><strong>How to play:</strong> Each chapter of the game has a location and a puzzle. Complete a chapter to unlock the next one. Start at Bliss Park Playground, follow clues from destination to destination, use hints when needed, and bring a charged phone plus pencil and paper.</p><p><strong>Difficulty:</strong> You can always get hints or skip a puzzle if you are stuck, but to solve every puzzle without hints would require ages 14+</p><p>📸 <strong>Pro Tip:</strong> Screenshot clues to your photo gallery so you can draw or write directly on them while solving.</p><p>🚲 Consider bikes or scooters: the adventure spans 8 destinations across a 4-mile trail. Travel safely, respect private property, and play at your own pace. There’s no rush! You can pause anytime and break the adventure across multiple days.</p><button class="button" onclick="continueAdventure()">${beginLabel}</button>${hasProgress ? '<button class="button ghost" onclick="caseMap()">View the Case Map</button>' : ''}<button class="button ghost" onclick="restartPrompt()">Restart from the beginning</button>`);
  window.scrollTo({ top: 0 });
}
function aboutCreator() {
  currentChapter = 0;
  app.innerHTML = shell(`<img class="creator-card" src="${A}five-of-hearts-card-no-frame.png" alt="The 5 of Hearts card"><h2 style="text-align:center">About the Game Creators</h2><p>Welcome! We are a local Longmeadow family who loves puzzles, outdoor adventures, and our town’s rich history! We built this interactive mystery trail so neighbors, friends, and families could explore Longmeadow in a fun, new way together.</p><p>This adventure is completely free to enjoy! If you have a great time and would like to support our family in creating more local games, a contribution via <a href="https://www.venmo.com/u/CarohartMA" target="_blank" rel="noopener">Venmo</a> at @CarohartMA is always appreciated (but never expected!). We hope you enjoy it!</p><img class="creator-family" src="${A}game-creators-family.jpg" alt="The game creators"><p class="creator-signature">The 5 of H(e)arts</p><button class="button" onclick="goHome()">Return to the welcome page</button>`);
  window.scrollTo({ top: 0 });
}

function continueAdventure() {
  if (state.done.includes(6) && !state.done.includes(7)) chapter8();
  else if (state.done.includes(7)) ending();
  else if (state.done.includes(5)) chapter7();
  else if (state.done.includes(4)) chapter6();
  else if (state.done.includes(3)) chapter5();
  else if (state.done.includes(2)) chapter4();
  else if (state.done.includes(1)) chapter3Start();
  else if (state.done.includes(0)) chapter2();
  else chapter1();
}
function restartPrompt() {
  currentChapter = 0;
  app.innerHTML = shell(`<p class="eyebrow">RESTART FROM THE BEGINNING</p><h2>Reset all progress?</h2><p>This will reset the unlocked chapters and every hint you have revealed. This cannot be undone.</p><button class="button" onclick="confirmRestart()">Yes — reset my adventure</button><button class="button ghost" onclick="goHome()">No — keep my progress</button>`);
  window.scrollTo({ top: 0 });
}
function confirmRestart() {
  state.c1 = 0; state.johnny = 0; state.c2 = 0; state.c3 = 0; state.c4 = 0; state.c5 = 0; state.c5follow = 0; state.c6 = 0; state.c7 = 0; state.c8 = 0; state.done = []; save(); goHome();
}

const c1Hints = [
  `<strong>Hint #1: Examine the crime scene</strong><br>Take a close look at the back of the cryptic note left behind at Bliss Park. The message points straight to your very first destination!`,
  `<strong>Hint #2: Go to the address mentioned in the back of the cryptic note.</strong>${gallery(fig('fairfield-map-illustrated.png', 'Location of Fairfield Terrace'))}`,
  `<strong>Hint #3: The address</strong><br>Look for the house located at 14 Fairfield Terrace.`
];
const johnnyHints = [
  `<strong>Hint #1: The Legend of the Fruit</strong><br>The boy grew up to travel across America planting orchards of a crisp, delicious red fruit. Think of his famous nickname.`,
  `<strong>Hint #2: The “Hat” clue</strong><br>This folk hero wore a metal cooking pot on his head and became an iconic apple planter.`,
  `<strong>Hint #3</strong><br>His legal name was John Chapman, but he is known by a six-letter nickname: J _ _ _ _ Y.`
];
const c2Hints = [
  `<strong>Hint #1: Focus on the Shapes</strong><br>The clue left at the sculpture has two main elements: floating stars and intercepting lines. They are not placed randomly. Try looking at how these two shapes interact with what you see in the real world.`,
  `<strong>Hint #2: Alignment is Key</strong><br>Not all stars are created equal. Some stars perfectly align and overlap with the circular orbs, while others float completely off-center. The intercepting lines indicate where branches cross. Are you looking at the sculpture and clue from where the clue was found?`,
  `<strong>Hint #3: Filtering Out The Noise</strong><br>Try filtering out the noise: what happens if you only look at the letters attached to stars that perfectly line up with an orb?`,
  `<strong>Hint #4: Where to Next?</strong><br>The stars that perfectly align with the orbs spell a 7-letter word indicating your next physical destination. Read the letters from left to right.`,
  `<strong>Hint #5: The solved puzzle</strong><br>You now have enough information to identify the next destination. If you would prefer the answer, use the button below.${gallery(fig('c2-clue-sculpture.jpg', 'The clue and the sculpture'))}`
];
const c3Hints = [
  `<strong>Hint #1: Who is Who?</strong><br>Reverend Richard Salter Storrs (1763–1819) wears an older 18th-century style black clerical robe with white collar tabs.<br><br>Reverend Richard S. Storrs of Brooklyn (1821–1900) has the prominent white mutton-chop sideburns.<br><br>Mary Elwell (Jenks) Storrs (1824–1898), wife of Reverend Richard S. Storrs of Brooklyn, is the elegant woman in the gold frame.<br><br>Professor Richard S. Storrs (1830–1884) wears a 19th-century suit. His portrait is in black and white.`,
  `<strong>Hint #2: Use the clue left behind by the strange lady.</strong><br>Once you have identified who is in each portrait, find the family member's corresponding letter shown on the Storrs family tree (back of folded slip of paper).<br><br>Each family member has a <strong>red</strong> letter associated with them. Put the selected letters in the correct order (portraits from left to right) to decode your next destination!`,
  `<strong>Hint #3: Put the letters in the correct order.</strong><br><strong>Step 1:</strong> Look at the first portrait (from left to right). It is a portrait of <strong>Rev. Richard S. Storrs (1763-1819).</strong> On the back of the folded paper, the letter <strong>C</strong> is associated with him. This means the first letter of your destination is <strong>C.</strong> (Look carefully at the dates as there are so many men named Richard S. Storrs in the Storrs family!)<br><br><strong>Step 2:</strong> Look at the second portrait. It is a portrait of <strong>Rev. Richard S. Storrs of Brooklyn (1821-1900).</strong> Find which letter is associated with his portrait on the back of the paper to get your second letter.<br><br><strong>Step 3:</strong> Continue this process for all six portraits until you have decoded the full word!`
];
const c4Hints = [
  `<strong>Hint #1: Where do I start?</strong><br>Find the true/false answers at red-star houses, street signs with the town seal, the Green behind the war memorials, the witness stones, and the memorial plaques.`,
  `<strong>Hint #2: Some visual clues.</strong><br>Use the visual-reference clue to help identify the locations for the true/false statements.${gallery(fig('c4-visual-clues.jpg', 'Some visual clues'))}`,
  `<strong>Hint #3: What are the T/F answers?</strong><br>1T, 2T, 3T, 4F, 5T, 6F, 7F, 8F, 9F.`,
  `<strong>Hint #4: Now what?!</strong><br>Use the correct answers to connect the dots. Pay attention to the number and color pairs.`,
  `<strong>Hint #5: How do I connect the dots?</strong><br>Start with the green dot marked 1 because statement 1 is true, then use the green dot marked 2, and continue through all nine dots.`,
  `<strong>Hint #6: The solved puzzle.</strong><br>You now have enough information to identify the house number on Williams Street. If you would prefer the answer, use the button below.`
];
const c5Hints = [
  `<strong>Hint #1: Where do I need to look?</strong><br>Look up at the scroll pediment above the main door. Match the symbols there to the pictures on the clue left in the bench frame.${gallery(fig('c5-pediment.jpg', 'The scroll pediment at 20 Williams Street'))}`,
  `<strong>Hint #2: Making sense of it all.</strong><br>Use the real-world clue to place the symbols, and their letters, in order from left to right.`,
  `<strong>Hint #3: A common palindrome</strong><br>Look closely at the stonework from left to right. Your eyes will pass a stylized pineapple, an elegant scroll flourish, a rosette, and a central flame finial, before mirroring back down through another rosette, scroll flourish, and pineapple. Match the letters to these symbols in the exact order you found them to uncover a hidden palindrome!`,
  `<strong>Hint #4: Solved puzzle</strong><br>You now have enough information to identify the palindrome. If you would prefer the answer, use the button below.`
];
const c6Hints = [
  `<strong>Hint #1: Lines</strong><br>Ummm... Could this be a coincidence?! There are exactly 9 lines of text engraved into the memorial plaque and 9 line positions* mentioned on the clue left by the thief.<br><br><em>*Look closely on the left side of the clue for the “line position” label.</em>${gallery(fig('c6-memorial-plaque.jpg', 'The memorial plaque'))}`,
  `<strong>Hint #2: Words</strong><br>At the top of the matrix, you notice details about word positions. It stands to reason that cross-referencing a line number with a word position yields a specific word from the stone.<br><br>For instance, the yellow square is positioned at Line 1, Word 2. The second word on the first line of the tribute stone is <strong>PLACE</strong>.`,
  `<strong>Hint #3: Letters</strong><br>You should now have five words in front of you, but the puzzle isn’t finished yet. Look back at the matrix: the number tucked inside each colored square tells you exactly which letter to extract from its corresponding word.<br><br>For example, the yellow square has the number 1 in it. That means the letter to extract from the word <strong>PLACE</strong> is <strong>P</strong> (the first letter).`,
  `<strong>Hint #4: Colors</strong><br>Use the sequence of colors for the 5-letter code at the bottom of the clue to arrange the letters you extracted. You now have enough information to identify the final word. If you would prefer the answer, use the button below.`
];
const c7Hints = [
  `<strong>Hint #1</strong><br>Notice the colors and patterns on the note? Look around—and higher up! Can you spot where those same design details appear in the real world?`,
  `<strong>Hint #2</strong><br>Study the visual clue again and compare it with the details around Razzmatazz.${gallery(fig('c7-storefront-hint.jpg', 'Razzmatazz Kids storefront sign'))}`,
  `<strong>Hint #3</strong><br>Think about the “Ding-Ding!” sound and the historical vehicle that made it.`,
  `<strong>Hint #4</strong><br>Before cars filled the roads in the early 1900s, electric streetcars ran up and down Route 5 through Longmeadow. What is another 4-letter word for a trolley?`
];
const c8Hints = [
  `<strong>Hint #1: Look around</strong><br>Look at the Polaroid images. Can you figure out the stores/business names associated with those features at the Longmeadow Shops?`,
  `<strong>Hint #2: Focus on the letters of the store/business names</strong><br>Once you have found the names that match each feature on the Polaroids, you need to choose one letter from each store/business name. Look for something else on the Polaroids that might tell you which letter to choose.`,
  `<strong>Hint #3: An example</strong><br>The first Polaroid shows the lights on top of the CHICO store logo, and it has the number 3. Take the 3rd letter from the store name, an <strong>I</strong>. Try these with the other Polaroids to spell your answer!`,
  `<strong>Hint #4: The Polaroid answers</strong><br>Polaroid #1: CHICO (3rd letter: <strong>I</strong>)<br>Polaroid #2: Urgent Care (7th letter: <strong>C</strong>)<br>Polaroid #3: McKenna & Caban (4th letter: <strong>E</strong>)<br>Polaroid #4: CVS (1st letter: <strong>C</strong>)<br>Polaroid #5: Warby Parker (3rd letter: <strong>R</strong>)<br>Polaroid #6: Fleet Feet (3rd letter: <strong>E</strong>)<br>Polaroid #7: Delaney (4th letter: <strong>A</strong>)<br>Polaroid #8: Max Burger (1st letter: <strong>M</strong>)`
];

function hintPanel(list, key, route, solution) {
  const shown = state[key] || 0;
  const body = list.slice(0, shown).map(item => `<div class="hint-item">${item}</div>`).join('');
  const control = shown < list.length
    ? `<button class="button ghost" onclick="showHint('${key}', '${route}')">${shown ? 'Show another hint' : 'I need a hint'}</button>`
    : `<button class="button ghost" onclick="showHintSolution('${solution}')">Just show me the solution!</button>`;
  return `<section class="hint">${body}${control}</section>`;
}

function showHint(key, route) {
  const lists = { c1: c1Hints, johnny: johnnyHints, c2: c2Hints, c3: c3Hints, c4: c4Hints, c5: c5Hints, c6: c6Hints, c7: c7Hints, c8: c8Hints };
  const maximum = lists[key].length;
  state[key] = Math.min((state[key] || 0) + 1, maximum);
  save(); window[route]();
  requestAnimationFrame(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'auto' }));
}
function showHintSolution(which) {
  const text = which === 'star' ? 'Solution: 76' : which === 'johnny' ? 'Solution: Johnny' : which === 'library' ? 'Solution: Library' : which === 'church' ? 'Solution: Church' : which === 'twenty' ? 'Solution: 20' : which === 'racecar' ? 'Solution: RACECAR' : which === 'razzmatazz' ? 'Solution: SHOPS' : which === 'tram' ? 'Solution: TRAM' : 'Solution: ICE CREAM';
  const panel = document.querySelector('.hint');
  const solved = which === 'church' ? gallery(fig('c3-solved-puzzle.jpg', 'Solved puzzle')) : which === 'twenty' ? gallery(fig('c4-solved-puzzle.jpg', 'Solved puzzle')) : which === 'racecar' ? gallery(fig('c5-solved-puzzle.jpg', 'Solved puzzle')) : '';
  if (panel) panel.innerHTML = `${panel.innerHTML}<p class="solution-reveal"><strong>${text}</strong></p>${solved}`;
}

function chapter1() {
  currentChapter = 1;
  app.innerHTML = shell(`<p class="location">📍 Start at Bliss Park Playground</p>
    <h2>THE STORY</h2>
    <p>Back in 1716, the General Court granted 30 acres of <strong>“Ministry Land”</strong> to support Longmeadow’s first minister, Reverend Stephen Williams. What the early settlers never realized was that this land held an ancient secret: buried deep beneath the soil lay the <strong>Staff of Ministry</strong>, a magical relic of unknown origin that quietly kept the valley fertile and protected.</p>
    <p>The staff remained completely lost and forgotten for over three centuries as the town grew. That is, until <strong>2026</strong>.</p>
    <p>When excavation crews broke ground in Bliss Park to install the newly-renovated playground, they unearthed the strange, perfectly preserved wooden staff. Believing it to be a quirky piece of historical farm debris, the installation team whimsically incorporated it into the Mr. Potato Head statue's design, placing it right in Mr. Potato Head's hand. Unknowingly, they had awakened the ancient protection magic of the Green.</p>
    ${gallery(fig('form-image-1.jpg', 'Mr. Potato Head before the staff got stolen'))}
    <h2>THE CRIME</h2><p>Bliss Park, Longmeadow. 9:00 AM. The playground opens, but Mr. Potato Head is missing his staff. A <strong>cryptic note</strong> sits in its place.</p>
    <p>The police are on-site but brush the missing staff story off. They dismiss it as nothing more than a local myth and a fantastic tale.</p>
    <p>Suddenly, a woman approaches you. She introduces herself as <strong>Mrs. Orac</strong> from the <strong>Underground Longmeadow Historical Society</strong>. She desperately needs your help.</p>
    <h2>YOUR MISSION</h2><p>Mrs. Orac warns that the thief has left <strong>a trail of clues</strong> tied to Longmeadow's history. You need to crack the clues and retrieve the relic before the Curse of 1716 is complete and the town of Longmeadow reverts to wilderness forever!</p>
    ${gallery(fig('c1-1.jpg', 'The thief’s cryptic note'), fig('c1-2.jpg', 'The back of the thief’s cryptic note'))}
    <section class="answer"><h3>Did you find the star?</h3><button class="button" onclick="answerPage('star')">Yes and I know the star number!</button>${hintPanel(c1Hints, 'c1', 'chapter1', 'star')}</section>`);
  window.scrollTo({ top: 0 });
}

function answerPage(kind) {
  state.activeChapter = { star: 1, johnny: 1, library: 2, church: 3, twenty: 4, racecar: 5, razzmatazz: 6, tram: 7, icecream: 8 }[kind];
  const prompt = kind === 'star' ? 'What is the star number?' : kind === 'johnny' ? 'What was the boy’s name?' : kind === 'library' ? 'Where is the clue pointing next?' : kind === 'church' ? 'Where is your next destination?' : kind === 'twenty' ? 'What is the house number?' : kind === 'racecar' ? 'What is the palindrome?' : kind === 'razzmatazz' ? 'Where is your next destination?' : kind === 'tram' ? 'What is the 4-letter word?' : 'What is the final answer?';
  const back = kind === 'star' ? 'chapter1()' : kind === 'johnny' ? 'johnnyPage()' : kind === 'library' ? 'chapter2()' : kind === 'church' ? 'chapter3Clue()' : kind === 'twenty' ? 'chapter4()' : kind === 'racecar' ? 'chapter5()' : kind === 'razzmatazz' ? 'chapter6()' : kind === 'tram' ? 'chapter7()' : 'chapter8()';
  app.innerHTML = shell(`<p class="eyebrow">SUBMIT YOUR ANSWER</p><h2>${prompt}</h2><input id="answer" autocomplete="off" autofocus><button class="button" onclick="checkAnswer('${kind}')">Submit answer</button><p id="feedback" class="small"></p><button class="button ghost" onclick="${back}">Back to the puzzle</button>`);
  window.scrollTo({ top: 0 });
}
function checkAnswer(kind) {
  const answer = normalize(document.querySelector('#answer').value);
  const correct = (kind === 'star' && answer === '76') || (kind === 'johnny' && (answer === 'john' || answer === 'johnny')) || (kind === 'library' && (answer === 'library' || answer === 'storrslibrary')) || (kind === 'church' && (answer === 'church' || answer === 'firstchurch' || answer === 'firstchurchofchrist')) || (kind === 'twenty' && (answer === '20' || answer === '20williams' || answer === '20williamsstreet')) || (kind === 'racecar' && answer === 'racecar') || (kind === 'razzmatazz' && answer === 'shops') || (kind === 'tram' && answer === 'tram') || (kind === 'icecream' && answer === 'icecream');
  if (!correct) { document.querySelector('#feedback').textContent = 'Incorrect. Review the clues and try again.'; return; }
  if (kind === 'star') johnnyPage(); else if (kind === 'johnny') complete1(); else if (kind === 'library') complete2(); else if (kind === 'church') complete3(); else if (kind === 'twenty') complete4(); else if (kind === 'racecar') chapter5FollowUp(); else if (kind === 'razzmatazz') complete6(); else if (kind === 'tram') complete7(); else ending();
}

function johnnyPage() {
  app.innerHTML = shell(`<h2 style="text-align:center">76 is right!</h2>${gallery(fig('star.jpg', 'The star'))}<p>In front of the house marked with a star with the number 76, you find <strong>a crumpled note</strong>.</p>${gallery(fig('crumpled-note.jpg', 'The crumpled note'))}<section class="answer"><h3><strong>Do you know the name of the boy who lived in the house with the numbered star during the late 18th century?</strong></h3><button class="button" onclick="answerPage('johnny')">Yes! I know the answer.</button>${hintPanel(johnnyHints, 'johnny', 'johnnyPage', 'johnny')}</section>`);
  window.scrollTo({ top: 0 });
}

function complete1() {
  if (!state.done.includes(0)) state.done.push(0); save();
  app.innerHTML = shell(`<h2 style="text-align:center">Correct! Johnny Appleseed once lived in this house!</h2><aside class="history"><p>Johnny Appleseed (born John Chapman) was an American pioneer and nurseryman who became a legendary folk hero of the 19th century. Far from just casually scattering seeds, he strategically established formal apple tree nurseries across the American frontier, with his saplings primarily providing apples for hard cider — a crucial beverage of the era. With deep ties to the Massachusetts region, a young John Chapman even lived in Longmeadow's oldest standing home at <strong>14 Fairfield Terrace</strong> after his family moved to town in 1780.</p></aside>${gallery(fig('johnny-appleseed.jpg', 'Johnny Appleseed'))}<aside class="history"><h3>Did you know that the historic house located at <strong>14 Fairfield Terrace</strong> holds the title of being the oldest standing structure in Longmeadow?</h3><p>Its journey to its current location is a fascinating tale of three distinct eras:</p><p><strong>1. Built in the Meadows (Before 1700)</strong><br>The house was originally built down in the fertile lowlands along the Connecticut River (the “meadows”). During this early period, the entire settlement of Longmeadow was concentrated in this low-lying floodplain.</p><p><strong>2. Moved to the Hill (1700)</strong><br>Living in the lowlands came with a major hazard: devastating seasonal floods. After a particularly disastrous flood in 1695, the townspeople decided it was time to abandon the floodplain. In <strong>1700</strong>, the house was physically moved up the hill to the “upper terrace” (standing parallel to what is now Longmeadow Street) to escape the rising waters. This is the location where a young John Chapman (Johnny Appleseed) would later live with his family after they moved to town in 1780!</p><p><strong>3. Moved to its Present Location (1913)</strong><br>As the town modernized and suburban subdivisions began expanding at the turn of the 20th century, the house was moved a final time. In <strong>1913</strong>, it was relocated to its current resting spot on <strong>14 Fairfield Terrace</strong> to make room for newer developments along the main road.</p></aside><p>While you marvel at the incredible feat of moving a historic house three times, your phone buzzes with <strong>a message from Mrs. Orac.</strong> She is also kind enough to send you the location of Harold Grinspoon's <strong>sculpture.</strong></p>${gallery(fig('orac-message.jpg', 'Message from Mrs. Orac'), fig('grinspoon-map-illustrated.png', 'Location of Harold Grinspoon’s sculpture'), fig('c2-life-sculpture.jpg', 'Harold Grinspoon ‘Life’ Sculpture'))}<p>Head toward the sculpture to continue the adventure.</p><p><strong>You are ready to move onto the next chapter.</strong></p><button class="button" onclick="chapter2()">Open Chapter 2</button>`);
  window.scrollTo({ top: 0 });
}

function chapter2() {
  currentChapter = 2;
  app.innerHTML = shell(`<p class="location">📍 Start at the Harold Grinspoon’s ‘Life’ sculpture.</p><h2>The Harold Grinspoon ‘Life’ Sculpture</h2><aside class="history"><p>In his mid-80s, renowned local businessman and philanthropist Harold Grinspoon embarked on a third career as an artist, inspired quite by accident when a large cherry tree fell in his Longmeadow backyard. Captivated by its organic form, he chose to transform the fallen timber into a lasting work of art rather than discard it, resulting in a striking 25-foot outdoor sculpture. This initial spark launched a prolific artistic chapter. In the years since, he has produced over a hundred large-scale sculptures crafted from reclaimed trees, with many prominently installed in public spaces and institutions across Massachusetts and nationwide.</p></aside>${gallery(fig('3.jpg', 'Harold Grinspoon'), fig('c2-life-sculpture.jpg', 'Harold Grinspoon ‘Life’ Sculpture'))}<p>As you expected based on Mrs. Orac’s message, you spot a fresh <strong>clue left behind by the thief</strong> right in front of the magnificent sculpture.</p>${gallery(fig('c2-view.jpg', 'The view from where the clue was left'), fig('c2-clue.jpg', 'The clue left behind by the thief'))}<section class="answer"><h3>Do you know where the clue is pointing next?</h3><button class="button" onclick="answerPage('library')">Yes! I know the answer.</button>${hintPanel(c2Hints, 'c2', 'chapter2', 'library')}</section>`);
  window.scrollTo({ top: 0 });
}

function complete2() {
  if (!state.done.includes(1)) state.done.push(1); save();
  app.innerHTML = shell(`<h2 style="text-align:center">Correct! The clue points to Storrs Library.</h2><p>Head toward Storrs Library to continue the adventure.</p>${gallery(fig('c2-storrs-map-illustrated.png', 'Location of Storrs Library'))}<p><strong>You are ready to move onto the next chapter.</strong></p><button class="button" onclick="chapter3Start()">Open Chapter 3</button>`);
  window.scrollTo({ top: 0 });
}

function chapter3Start() {
  currentChapter = 3;
  app.innerHTML = shell(`<p class="location">📍 Start at the Storrs Library.</p><h2>Welcome to Storrs Library!</h2><aside class="history"><p>In 1907, <strong>Sarah Williams Storrs</strong>—granddaughter of the town's second pastor, Richard Salter Storrs—donated the Storrs Estate and property in her will. This generous gift led to the establishment of the Richard Salter Storrs Library Association in 1910.</p><p>The initial home of the Richard Salter Storrs Library was established in the historic Storrs House at <a href="https://www.google.com/maps/search/697+Longmeadow+Street?entry=gmail&amp;source=g" target="_blank" rel="noopener">697 Longmeadow Street</a>. When the current library building was constructed in 1932, the historic house was physically moved a short distance to the south to make room for it, where it now serves as the Storrs House Museum and Archive for the Longmeadow Historical Society.</p></aside><p>While the library has changed locations over the years, the presence of <strong>Reverend Richard Salter Storrs</strong> and several of his family members can still be felt inside.</p>${gallery(fig('chapter3/library.jpg', 'The Storrs Library'))}<section class="answer"><h3>Are you able to enter the library and look for the family portraits?</h3><button class="button" onclick="chapter3Clue()">Yes, I can enter the library.</button><button class="button ghost" onclick="chapter3Portraits()">No, the library is closed.</button></section>`);
  window.scrollTo({ top: 0 });
}
function chapter3Portraits() {
  currentChapter = 3;
  app.innerHTML = shell(`<h2>The portraits inside the library</h2><p>Use these portraits if you cannot enter the library.</p>${gallery(fig('chapter3/portrait-1.jpg', 'Portrait #1'), fig('chapter3/portrait-2.jpg', 'Portrait #2'), fig('chapter3/portrait-3.jpg', 'Portrait #3'), fig('chapter3/portrait-4.jpg', 'Portrait #4'))}<button class="button" onclick="chapter3Clue()">Continue to the clue</button><button class="button ghost" onclick="chapter3Start()">Back to Chapter 3</button>`);
  window.scrollTo({ top: 0 });
}
function chapter3Clue() {
  currentChapter = 3;
  app.innerHTML = shell(`<h2>Good job! You have located the four portraits.</h2><p>As you wonder what to do with your newfound observations, a librarian notices you studying the portraits and approaches.</p><p>“Excuse me,” she says quietly. “A woman came in just before you did and asked me to give this piece of paper to anyone who was examining these portraits. She left in such a hurry that I didn't even have time to ask her any questions, but she insisted that you would need this.”</p><p>She hands you <strong>a folded slip of paper</strong> and leaves you to your investigation.</p>${gallery(fig('chapter3/librarian.jpg', 'The librarian'), fig('chapter3/clue-front.jpg', 'Folded slip of paper (front)'), fig('chapter3/clue-back.jpg', 'Folded slip of paper (back)'))}<button class="button ghost" onclick="chapter3Portraits()">View the portraits</button><section class="answer"><h3>Did you uncover your next destination?</h3><button class="button" onclick="answerPage('church')">Yes! I know the answer.</button>${hintPanel(c3Hints, 'c3', 'chapter3Clue', 'church')}</section>`);
  window.scrollTo({ top: 0 });
}
function complete3() {
  if (!state.done.includes(2)) state.done.push(2); save();
  app.innerHTML = shell(`<h2 style="text-align:center">Correct! Head toward the First Church of Christ to continue the adventure.</h2>${gallery(fig('c4-map-illustrated.png', 'Location of the First Church of Christ'))}<p><strong>You are ready to move onto the next chapter.</strong></p><button class="button" onclick="chapter4()">Open Chapter 4</button>`);
  window.scrollTo({ top: 0 });
}
function chapter4() {
  currentChapter = 4;
  app.innerHTML = shell(`<p class="location">📍 Start at the First Church of Christ.</p><h2>The First Church</h2><aside class="history"><p><strong>The First Pastor’s Captivity:</strong> Long before the current building rose, the church’s first minister was Reverend Stephen Williams, who settled here in 1716. As a young boy, Williams survived the 1704 Deerfield raid and was marched to Canada before being ransomed.</p><p><strong>The Human Alarm Clock:</strong> Before the church got its first bell in 1743, Longmeadow paid Nathaniel Burt 10 shillings a year to walk the street beating a drum to announce services.</p><p><strong>The Great Building Migration:</strong> The current 1768 structure originally stood on the Green, where the flagpole is today. In 1873, the entire church was moved to its present location.</p><p><strong>A Paul Revere Connection:</strong> The congregation purchased a replacement bell directly from Paul Revere in Boston in 1809.</p></aside>${gallery(fig('c4-church.jpg', 'First Church of Christ'))}<h2>The panicked groom</h2><p>You are standing in front of the big white church when a man in a sharp tuxedo approaches you in a total panic!</p><p><em>"Thank goodness!"</em> he gasps. <em>"A strange woman just ran past, shoved two pieces of paper into my hands, and told me it was of extreme importance to solve some puzzle! I don't have time for games—I'm getting married today and I've lost my bride! Finding my future wife is a bit more urgent than solving riddles!"</em></p><p>Relieved to pass the buck, he thrusts the <strong>enigmatic papers</strong> into your hands so he can rush off to search for his missing bride. You eagerly agree to tackle the puzzle.</p>${gallery(fig('c4-groom.jpg', 'The panicked groom'), fig('c4-paper-1.jpg', 'Enigmatic paper #1'), fig('c4-paper-2.jpg', 'Enigmatic paper #2'))}<section class="answer"><h3>Do you know where to go next?</h3><button class="button" onclick="answerPage('twenty')">Yes! I know the answer.</button>${hintPanel(c4Hints, 'c4', 'chapter4', 'twenty')}</section>`);
  window.scrollTo({ top: 0 });
}
function complete4() {
  if (!state.done.includes(3)) state.done.push(3); save();
  app.innerHTML = shell(`<h2 style="text-align:center">Correct! Head toward 20 Williams Street to continue the adventure.</h2>${gallery(fig('c4-williams-map-illustrated.png', 'Location of 20 Williams Street'))}<p><strong>You are ready to move onto the next chapter.</strong></p><button class="button" onclick="chapter5()">Open Chapter 5</button>`);
  window.scrollTo({ top: 0 });
}

function chapter5() {
  currentChapter = 5;
  app.innerHTML = shell(`<p class="location">📍 Start at 20 Williams Street.</p><h2>The Second Town Hall</h2><p>You arrive at 20 Williams Street, a beautiful Colonial Revival building that served as Longmeadow's Town Hall before the recent move to Greenwood Center. The town's civic hubs have a habit of shifting over time:</p><aside class="history"><p><strong>1716:</strong> Early town meetings take place at the multi-purpose Meeting House right on the Town Green.</p><p><strong>1905:</strong> The town opens its first official municipal office at 417 Longmeadow St, retrofitting an 1873 one-room schoolhouse with a secure record vault.</p><p><strong>1930:</strong> The town moves here to 20 Williams St, building a spacious new hub that remains a centerpiece of the historic district.</p><p><strong>Late 2024:</strong> The town hall moves once again to the Greenwood Center at 231 Maple Road.</p></aside>${gallery(fig('c5-town-hall.jpg', '20 Williams Street'))}<p>It looks like the town hall isn't the only thing that relocated — the thief is nowhere to be found! Dejected, you sit down on the bench in front of the building. As you lean back, you notice <strong>a slip of paper wedged into the bench frame.</strong> You pull it out. A new puzzle awaits...</p>${gallery(fig('c5-clue.jpg', 'Slip of paper wedged into the bench frame'))}<section class="answer"><h3>Did you solve the puzzle?</h3><button class="button" onclick="answerPage('racecar')">Yes! I know the answer.</button>${hintPanel(c5Hints, 'c5', 'chapter5', 'racecar')}</section>`);
  window.scrollTo({ top: 0 });
}
function chapter5FollowUp() {
  currentChapter = 5;
  const hasHint = state.c5follow === 1;
  app.innerHTML = shell(`<h2 style="text-align:center">Correct! Racecar?! Race car?! What in the world could that mean?</h2><p>As you stand there scratching your head, a sudden, deafening roar echoes from behind the police station.</p><p>In a flash, a sleek race car screeches into view, its driver completely hidden behind pitch-black tinted windows. It zooms right past you, tears a sharp left onto Williams Street, and barrels toward the center of town. There is absolutely no way this is a coincidence — the clue you just decoded is unfolding right before your eyes!</p><p>You sprint after it, your heart pounding. While catching up to a speeding car is impossible, you spot a hand flash out of the driver window and toss something onto the pavement. Following the tire tracks down Williams Street, you find a crisp, handwritten note sitting on the sidewalk. You reach down and pick it up... your <strong>next clue</strong>.</p>${gallery(fig('c5-racecar-clue.jpg', 'The clue left by the thief'))}<section class="answer"><h3>Did you find the location that the thief hinted at?</h3><button class="button" onclick="complete5()">Yes</button>${hasHint ? `<section class="hint"><p><strong>Hint:</strong> The place you are looking for is Ann Scibelli’s Memorial, near 134 Williams Street on the median between Williams Street and Parkside Drive.</p>${gallery(fig('c5-ann-map-illustrated.png', 'Map to Ann Scibelli’s Memorial'), fig('c5-ann-memorial.jpg', 'Ann Scibelli’s Memorial'), fig('c5-ann-stone.jpg', 'The stone'))}</section>` : '<button class="button ghost" onclick="showC5FollowHint()">No — I need a hint</button>'}</section>`);
  window.scrollTo({ top: 0 });
}
function showC5FollowHint() { state.c5follow = 1; save(); chapter5FollowUp(); requestAnimationFrame(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'auto' })); }
function complete5() {
  if (!state.done.includes(4)) state.done.push(4); save();
  app.innerHTML = shell(`<h2 style="text-align:center">Great! Head toward the Ann Scibelli’s Memorial to continue the adventure.</h2>${gallery(fig('c5-ann-map-illustrated.png', 'Location of the memorial'))}<p>The memorial is located near 134 Williams Street on a median area between Williams Street and Parkside Dr.</p><p><strong>You are ready to move onto the next chapter.</strong></p><button class="button" onclick="chapter6()">Open Chapter 6</button>`);
  window.scrollTo({ top: 0 });
}
function chapter6() {
  currentChapter = 6;
  app.innerHTML = shell(`<p class="location">📍 Start at the Ann Scibelli’s Memorial.</p><h2>A Place to Rest, Reflect and Renew</h2>${gallery(fig('c6-memorial.jpg', 'Ann Scibelli’s Memorial'), fig('c5-ann-stone.jpg', 'The memorial stone'))}<p>You are now standing in front of Ann Scibelli's memorial stone. Ann was a beloved member of the Longmeadow community. Looking around, you notice a small, <strong>colorful piece of paper</strong> wedged neatly between two pavers. You carefully pull it free and examine it. What could that mean? You pull out your notebook, study the pattern, and start putting the pieces together...</p>${gallery(fig('c6-clue-front.jpg', 'Piece of paper found between two pavers (front)'), fig('c6-clue-back.jpg', 'Piece of paper found between two pavers (back)'))}<section class="answer"><h3>Did you crack the code and know where to go next?</h3><button class="button" onclick="answerPage('razzmatazz')">Yes! I know the answer.</button>${hintPanel(c6Hints, 'c6', 'chapter6', 'razzmatazz')}</section>`);
  window.scrollTo({ top: 0 });
}
function complete6() {
  if (!state.done.includes(5)) state.done.push(5); save();
  app.innerHTML = shell(`<h2 style="text-align:center">Correct!</h2><p>As you head toward the center of town, your phone buzzes with an urgent <strong>text from Mrs. Orac</strong>: <em>“Quick, go to Razzmatazz! A new cryptic note was just spotted outside the entrance!”</em></p>${gallery(fig('c6-orac-text.jpg', 'Text message from Mrs. Orac'), fig('c7-location-illustrated.png', 'Location of Razzmatazz Kids'))}<p>Head toward Razzmatazz Kids to continue the adventure.</p><p><strong>You are ready to move onto the next chapter.</strong></p><button class="button" onclick="chapter7()">Open Chapter 7</button>`);
  window.scrollTo({ top: 0 });
}

function chapter7() {
  currentChapter = 7;
  app.innerHTML = shell(`<p class="location">📍 Start at the Razzmatazz Kids toy store.</p><h2>The Ding-Ding clue!</h2><p>You arrive at Razzmatazz, where an employee is waiting outside, holding a mysterious slip of paper. She tells you that moments ago, an eccentric woman marched past the store, tossed the note high into the air, and shouted <strong>“Ding-Ding!”</strong> at the top of her lungs before disappearing. The employee has no idea what the wild proclamation means. Can you crack the mystery?</p>${gallery(fig('c7-employee.jpg', 'The toy store employee'), fig('c7-clue.jpg', 'The Ding-Ding clue'))}<section class="answer"><h3>Did you find the 4-letter word hidden behind the clue?</h3><button class="button" onclick="answerPage('tram')">Yes! I know the answer.</button>${hintPanel(c7Hints, 'c7', 'chapter7', 'tram')}</section>`);
  window.scrollTo({ top: 0 });
}
function complete7() {
  if (!state.done.includes(6)) state.done.push(6); save();
  app.innerHTML = shell(`<h2 style="text-align:center">Correct! Tram was the answer!</h2>${gallery(fig('c7-trolley.jpg', 'The Longmeadow trolley'))}<aside class="history"><p>From 1896 until 1940, long before cars filled Route 5, electric trolleys (or trams) rattled straight down Longmeadow Street. Powered by overhead wires, these wooden streetcars were famous for the sharp “Ding! Ding!” of their brass foot-gongs.</p></aside><p>Your thoughts wander to the past, imagining what it would have felt like to glide down Route 5 on an old electric tram with your friends. Suddenly, a panicked message from Mrs. Orac snaps you back to the present: <em>“Hurry! The thief just left a threatening voicemail - your time is almost up! To retrieve the Staff of ministry, you must solve one final clue. Go to the North side of Bliss at the Longmeadow Shops and search for someone holding an old camera!”</em></p>${gallery(fig('c7-orac-text.jpg', 'Panicked message from Mrs. Orac'), fig('c8-map-illustrated.png', 'Location of the Longmeadow Shops on the North side of Bliss Road'))}<p><strong>Head toward the Longmeadow Shops on the North side of Bliss Road.</strong></p><p><strong>You are ready to move onto the next chapter.</strong></p><button class="button" onclick="chapter8()">Open Chapter 8</button>`);
  window.scrollTo({ top: 0 });
}
function chapter8() {
  currentChapter = 8;
  app.innerHTML = shell(`<p class="location">📍 Start at the Longmeadow Shops — North side of Bliss Road.</p><h2>The Strange Photographer</h2><p>You arrive at the Longmeadow Shops and waste no time searching for the photographer. Sure enough, you spot a lady snapping photos with an old-fashioned Polaroid camera.</p><p><em>“You can read a town's history like an open book just by looking at its storefronts!” she says with a knowing smile. “The shop names hold a hidden message—one letter at a time. Put the right pieces together, and you'll find the coolest reward in town. Want to look at my pictures?”</em></p><p>Before you even have a chance to answer, she hands you <strong>a stack of pictures</strong> and turns right back to taking photos. You examine the prints closely. This is <strong>your final test</strong>. Solve the puzzle to retrieve the Staff of Ministry and save Longmeadow from reverting to wilderness! No time to waste!</p>${gallery(fig('c8-photographer.jpg', 'The photographer'), fig('c8-polaroids.jpg', 'The stack of Polaroids'))}<section class="answer"><h3>Did you decode your last clue?</h3><button class="button" onclick="answerPage('icecream')">Yes! I know the answer.</button>${hintPanel(c8Hints, 'c8', 'chapter8', 'icecream')}</section>`);
  window.scrollTo({ top: 0 });
}
function ending() {
  currentChapter = 0;
  if (!state.done.includes(7)) state.done.push(7); save();
  app.innerHTML = shell(`<h2 style="text-align:center">Ice cream was the final clue!</h2><p><strong>Ice cream</strong> was the final clue! You head toward the local ice cream shop — <strong>Batch Ice Cream</strong> (682A Bliss Rd) — expecting to find the rogue historian ready to surrender the Staff of Ministry.</p><p>Instead, you find Mrs. Orac smiling ear-to-ear while enjoying a scoop. But she isn't just smiling because of the ice cream—she’s smiling because of <strong>you</strong>! Looking around, you spot the very race car you’d been chasing earlier, safely parked right out front. What in the world?!</p><p>As you stand there confused, Mrs. Orac invites you to take a seat and reveals the truth: <strong>it was all a test!</strong></p><p>The <strong>Staff of Ministry</strong> was pure fiction (though all the fascinating Longmeadow history you uncovered along the way was 100% real!). Longmeadow was never under the Curse of 1716, and there was no actual thief—just Mrs. Orac dropping clues all over town to test your skills!</p><p>As a member of the Underground Longmeadow Historical Society, she designed this challenge to recruit the sharpest minds in town—the Master Detectives Longmeadow can count on when real mysteries arise.</p><p>You’ve proven your brilliance, teamwork, and quick thinking. Take a bow—you are officially <strong>certified Underground Longmeadow Historical Society members!</strong></p>${gallery(fig('c8-icecream.jpg', 'Ice cream was the “coolest” reward in town!'), fig('c8-badge.jpg', 'Your badge of honor!'), fig('c8-certificate.jpg', 'Your official certificate'))}<p>Thanks for playing! If you enjoyed the game and want to support our family making more local adventures like this, feel free to add an optional tip.</p><a class="button" href="https://www.venmo.com/u/CarohartMA" target="_blank" rel="noopener">Optional tip via Venmo</a><p>🌟 Loved the adventure? We'd love to hear your thoughts! Help others discover the outdoor escape game by leaving us a review on our Facebook Page.</p><a class="button" href="https://www.facebook.com/5ofHeartsEscapeGames/reviews" target="_blank" rel="noopener">Leave a review</a><button class="button ghost" onclick="goHome()">Return to the welcome page</button>`);
  window.scrollTo({ top: 0 });
}

function caseMap() {
  currentChapter = 0;
  const routes = [chapter1, chapter2, chapter3Start, chapter4, chapter5, chapter6, chapter7, chapter8];
  const names = ['Bliss Park', 'Harold’s Grinspoon’s Sculpture', 'Storrs Library', 'First Church of Christ', '20 Williams Street', "Ann Scibelli's Memorial", 'Razzmatazz Kids', 'The Longmeadow Shops'];
  const buttons = routes.map((route, i) => state.done.includes(i) ? `<button class="button case-map-entry" onclick="caseMapOpen(${i})">Chapter ${i + 1} - ${names[i]}</button>` : `<button class="button ghost case-map-entry" disabled>Chapter ${i + 1} locked</button>`).join('');
  app.innerHTML = shell(`<h2>Case map</h2><p>Select your case chapter. When you solve a case chapter, you unlock the next chapter.</p><section class="answer">${buttons}</section><button class="button ghost" onclick="goHome()">Return to the welcome page</button>`);
  window.scrollTo({ top: 0 });
}
function caseMapOpen(index) { [chapter1, chapter2, chapter3Start, chapter4, chapter5, chapter6, chapter7, chapter8][index](); }

Object.assign(window, { goHome, aboutCreator, continueAdventure, restartPrompt, confirmRestart, caseMap, caseMapOpen, chapter1, chapter2, chapter3Start, chapter3Portraits, chapter3Clue, chapter4, chapter5, chapter5FollowUp, showC5FollowHint, complete5, chapter6, chapter7, chapter8, answerPage, checkAnswer, johnnyPage, showHint, showHintSolution });
goHome();
