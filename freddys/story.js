export const CAMERAS = [
  'Show Stage',
  'Dining Hall',
  'Prize Corner',
  'Kitchen',
  'Restrooms',
  'Parts & Service',
  'West Hall',
  'East Hall',
  'Office',
  'Party Room',
  'Loading Dock',
  'Supply Closet',
];

export const PEOPLE = {
  bubba: 'Bubba Beer Bot',
  tiggy: 'Ticklish Tiggy',
  pete: 'Chicken Pete',
  joey: 'Joey Cha-Cha',
  tatter: 'Tatter Tot Tat',
};

export function station(state, person, room) {
  if (person === PEOPLE.tiggy) {
    ensureTiggy(state);
    return;
  }
  for (const cam of CAMERAS) {
    state.cams[cam] = (state.cams[cam] || []).filter((name) => name !== person);
  }
  if (room && state.cams[room] && !state.cams[room].includes(person)) state.cams[room].push(person);
}

export function ensureTiggy(state) {
  for (const cam of CAMERAS) {
    state.cams[cam] = (state.cams[cam] || []).filter((name) => name !== PEOPLE.tiggy);
  }
  state.cams['Parts & Service'].push(PEOPLE.tiggy);
}

function parkParty(state) {
  station(state, PEOPLE.joey, 'Party Room');
  station(state, PEOPLE.pete, 'Party Room');
}

const qualifiedTickle = (s) => s.flags.tickled || s.inventory.includes('feather') || s.inventory.includes('broom');

export const ITEMS = {
  slice: { name: 'Grease-luxury slice', detail: 'Bubba cut this like it owes him rent.' },
  fuse: { name: 'Cheese fuse', detail: 'It was behind the mozzarella. It still smells like a decision.' },
  feather: { name: 'Feather duster', detail: 'The shelf was winning. You ended the streak.' },
  mop: { name: 'Night mop', detail: 'Has seen things. Has cleaned two of them.' },
  glitter: { name: 'Glitter rag', detail: 'Joey calls it a costume. It is a rag with ambition.' },
  plunger: { name: 'Cowboy plunger', detail: 'Leaned in the stall like it has a past and a pension.' },
  broom: { name: 'Emotional-support broom', detail: 'Tiggy can hold this. He still does not commute.' },
  ticket: { name: 'Golden ticket sticker', detail: 'Prize-bin currency. The gold is a rumor.' },
  breadstick: { name: 'Emergency breadstick', detail: 'Carbs are a kind of voltage.' },
};

export const CAST = [
  {
    id: 'bhad',
    name: 'Bhad Bunny',
    short: 'Bhad',
    file: 'assets/bhad-bunny.jpg',
    role: 'Night closer, lead',
    alt: 'Bhad Bunny, blonde pigtails and bunny ears, white crop top and skirt, white knee socks, holding a giant swirl lollipop outside the pizzeria.',
    blurb: 'You. Bunny ears, white outfit, knee socks, swirl lollipop, and the confidence of someone who clocked in on purpose. Mildly flirty. Fully in charge of her own jokes.',
  },
  {
    id: 'bubba',
    name: 'Bubba Beer Bot',
    short: 'Bubba',
    file: 'assets/bubba-beer-bot.jpg',
    role: 'Kitchen cyborg',
    alt: 'Bubba Beer Bot, a stocky shirtless bearded man with a buzz cut, mechanical arms and legs, black shorts, holding a beer in a dim checkered dining room.',
    blurb: 'Stocky, shirtless, bearded, buzzed hair, cyborg arms and legs, black shorts, a beer in one metal hand. He treats pizza like a sacred chore and feelings like a second shift.',
  },
  {
    id: 'tiggy',
    name: 'Ticklish Tiggy',
    short: 'Tiggy',
    file: 'assets/ticklish-tiggy.jpg',
    role: 'Stationary tiger',
    alt: 'Ticklish Tiggy, a round tiger-striped torso on a stationary metal base, top hat, blue bowtie, and clawed arms reaching forward. No legs.',
    blurb: 'Round tiger-striped torso, top hat, blue bowtie, clawed arms, planted on a stationary metal base. No legs. He reaches to tickle and cannot reach you unless you step into the radius. He likes the bit. He does not commute.',
  },
  {
    id: 'pete',
    name: 'Chicken Pete',
    short: 'Pete',
    file: 'assets/chicken-pete.jpg',
    role: 'Standards and headset',
    alt: 'Chicken Pete, a muscular man in sunglasses and a headset, holding a swirl lollipop, seated in a wheelchair with bird legs and talons.',
    blurb: 'Muscular, sunglasses, headset, swirl lollipop, black suspenders, in his wheelchair with bird legs and talons. His anger is instant and about tiny things: soap, napkins, typos. The wheelchair is just how he rolls in. The napkin is the problem.',
  },
  {
    id: 'joey',
    name: 'Joey Cha-Cha',
    short: 'Joey',
    file: 'assets/joey-cha-cha.jpg',
    role: 'Captain of dance breaks',
    alt: 'Joey Cha-Cha, a bearded human face in a captain hat on a glittery pink, blue, and gold robot body, one arm raised in a dance pose, star on the chest.',
    blurb: 'Human face, beard, captain hat, a cigarette held like a baton, glittery pink-blue-gold body and a star on the chest. He loves dancing and will call a dance break in the middle of any crisis, including the crisis of you trying to leave.',
  },
  {
    id: 'tatter',
    name: 'Tatter Tot Tat',
    short: 'Tatter',
    file: 'assets/tatter-tot-tat.jpg',
    role: 'Night auditor, final boss',
    alt: 'Tatter Tot Tat, long dark hair and blue eyeshadow, smiling in a draped brown dress, seated on an ornate dark throne.',
    blurb: 'Final boss, not the closer. Long dark hair, blue eyeshadow, a draped brown dress, and a carved throne she brought into a pizza place. She smiles like the franchise already lost. The joke is her paperwork, her stamp, and her fake health code. Bhad Bunny is still the one on the clock.',
  },
];

export const SECRETS = [
  { id: 'lipstickLaw', name: 'Lipstick amendment', detail: 'You kissed the corporate note and made charm a local policy.' },
  { id: 'paKiss', name: 'PA kiss', detail: 'The whole building heard you blow a kiss at midnight.' },
  { id: 'ateBread', name: 'Emergency carbs', detail: 'You ate the drawer breadstick. The power bar took it personally, in a good way.' },
  { id: 'tickled', name: 'Glancing tickle', detail: 'You stepped into Tiggy’s radius and he finally booped an elbow.' },
  { id: 'boop', name: 'Boop returned', detail: 'You booped the tiger back. Diplomacy.' },
  { id: 'featherGiven', name: 'Feather, delivered', detail: 'You put the duster in Tiggy’s claws because the shelf never would.' },
  { id: 'listenedDough', name: 'The dough speaks', detail: 'You listened to the walk-in dough plot its tiny yeast coup.' },
  { id: 'toiletTalk', name: 'Tuba conference', detail: 'You held a meeting with the toilet. Minutes were damp.' },
  { id: 'flushed', name: 'A correct flush', detail: 'Pete respected a flush. This is the closest he gets to a valentine.' },
  { id: 'poweredUp', name: 'Cheese fuse', detail: 'You found voltage hiding behind the mozzarella and seated it properly.' },
  { id: 'secretCone', name: 'Cone chaperone', detail: 'Joey bedazzled a traffic cone and you played along. The cone is fine.' },
  { id: 'curbToast', name: 'Parking-line toast', detail: 'You toasted a parking line with Bubba, who takes beer and paint seriously.' },
  { id: 'tatterCleared', name: 'Stamp missed', detail: 'You passed Tatter Tot Tat’s audit. The throne had to share the room with morning.' },
];

function lines(...parts) {
  return parts;
}

function auditVictory(state) {
  return 'out-back-pickup';
}

const AUDIT_WINS = ['out-back-pickup', 'ending-pickup-joey-jets', 'ending-pickup-snowy', 'ending-pickup-mr-bulge', 'ending-audit-failed', 'tatter-offering'];

export const NODES = {
  'clock-in': {
    title: 'Bunny on the clock',
    location: 'Office',
    speaker: 'bhad',
    who: 'Bhad Bunny',
    body: () => lines(
      'The plastic clock clicks to 12:00 AM like it is proud of being a problem. You are Bhad Bunny, night closer: bunny ears on, white outfit still somehow unstained, swirl lollipop held like a scepter you could also eat. The pizzeria is locked. The neon did not get the memo.',
      'Four coworkers are already loose in here with you. Joey Cha-Cha is glittering on the show stage, captain hat tilted, one arm up. Bubba Beer Bot is in the kitchen, beer in a metal hand, guarding dough. Chicken Pete is in the restroom, headset on, furious in advance. Ticklish Tiggy is installed in Parts and Service, claws out, reaching, not arriving. The sixth name is not on the floor yet: Tatter Tot Tat, night auditor, who brings her own throne when the grease clock nears 5:00 AM. You have until 6:00 AM only if you can pass her. Power is scarce. Staring at cameras and locking doors spends it. Breadsticks and signs do not respawn.',
    ),
    choices: [
      { id: 'read-note', label: 'Read the corporate note out loud', hint: 'The auditor’s three rules are on it. Read them before 5.', to: 'corporate-note', time: 12, power: -2, flag: { readRules: true } },
      { id: 'open-cams', label: 'Check the floor board first', hint: 'See who is posing in which room. Costs a little power.', to: 'first-cams', time: 12, power: -6 },
      { id: 'strut', label: 'Strut to the show stage', hint: 'Joey is already dancing at nobody. Join the nobody.', to: 'dining-welcome', time: 15, power: -1 },
      { id: 'pa-hello', label: 'Hop on the PA and say you clocked in', hint: 'The whole building will hear your bit.', to: 'pa-announcement', time: 10, power: -4 },
    ],
  },
  'corporate-note': {
    title: 'Laminated threats',
    location: 'Office',
    speaker: 'bhad',
    who: 'The corporate note',
    body: () => lines(
      'The note says: Night closer, keep the power above embarrassing, do not unionize the toppings, and flush once for yes. If the tiger asks you to step closer, that is a you problem, because Ticklish Tiggy does not commute. If the captain calls a dance break, an eight-count is legal. The party banner is missing an H. Management went home and left the hobbies.',
      'Under that, in smaller laminate: Tatter Tot Tat audits any closer still here when the clock nears 5:00 AM. She will ask for those three house rules. Flush once for yes. The tiger does not commute. The banner is missing an H. She accepts one proof of work: a real pizza slice, the cheese fuse if the lights were actually saved, Joey’s eight-count if you danced it, or Pete’s real grievance, which is the soap angle and not the chair. Guesses are how she tats a failure. She smiles the whole time. The smile is not the puzzle.',
    ),
    choices: [
      { id: 'lipstick', label: 'Kiss the corner and amend it', hint: 'Charm becomes written policy. A secret, if you like secrets.', to: 'lipstick-amendment', time: 10, power: 0, flag: { lipstickLaw: true } },
      { id: 'lock-up', label: 'Lock the office and play it safe', hint: 'Doors drink power. Boredom is free.', to: 'office-hold', time: 15, power: -8 },
      { id: 'to-kitchen', label: 'Walk to the kitchen before the pizza does', hint: 'Bubba and the dough are already in a relationship.', to: 'kitchen-threshold', time: 15, power: -1 },
      { id: 'check-party', label: 'Inspect the party room banner', hint: 'Typos are a kind of wildlife.', to: 'party-room-empty', time: 15, power: -1 },
    ],
  },
  'lipstick-amendment': {
    title: 'Lipstick is a bylaw',
    location: 'Office',
    speaker: 'bhad',
    who: 'Bhad Bunny',
    body: (s) => lines(
      'You kiss the laminate. It now says the closer may flirt, mop, and overrule any napkin that gets ideas. The kiss print looks like a signature from a county that only exists after midnight. You feel, incorrectly, like a lawyer.',
      s.flags.lipstickLaw
        ? 'If anyone cites policy tonight, you can cite the kiss. Pete will hate this in a precise way. Joey will try to choreograph it. Tiggy will ask the kiss to step closer, which kisses cannot do. Bubba will nod like romance is a condiment.'
        : 'The note looks amended anyway, which is the sort of confidence that gets people promoted or mopped.',
    ),
    choices: [
      { id: 'cams-after-kiss', label: 'Go look at the floor board', hint: 'Policy is cuter when you know where everyone is.', to: 'first-cams', time: 12, power: -6 },
      { id: 'dance-after-kiss', label: 'Take the new law to Joey', hint: 'He will treat a kiss like a downbeat.', to: 'dining-welcome', time: 15, power: -1 },
      { id: 'flush-after-kiss', label: 'The note said flush. Go flush.', hint: 'Pete is already in there, emotionally.', to: 'restroom-standoff', time: 15, power: -1 },
      { id: 'hall-after-kiss', label: 'Patrol before the law cools', hint: 'West hall, four bad ideas, one bunny.', to: 'hall-patrol', time: 15, power: -1 },
    ],
  },
  'office-hold': {
    title: 'Locked in with the hum',
    location: 'Office',
    speaker: 'bhad',
    who: 'Bhad Bunny',
    body: () => lines(
      'You shut the office like a person who has read a manual. The locks drink power and give you a hum. A single emergency breadstick lives in the drawer. It is one breadstick. The drawer is not a bakery.',
      'On the floor board, the four coworkers continue without you, and Tatter Tot Tat’s nameplate stays dark. You can watch, unlock, eat the carbs once, or reread the threat. Locking yourself in is not a strategy. It is a bill.',
    ),
    choices: [
      { id: 'watch-board', label: 'Watch the floor board from the chair', hint: 'Cameras cost a sip of power.', to: 'first-cams', time: 12, power: -6 },
      { id: 'unlock-hall', label: 'Unlock and patrol the west hall', hint: 'Give the locks their power back, mostly.', to: 'hall-patrol', time: 15, power: 3 },
      { id: 'breadstick', label: 'Eat the emergency breadstick', hint: 'Once. A second bite is the wrapper. Not a power farm.', to: 'office-hold', time: 10, power: (s) => (s.flags.ateBread ? -3 : 8), add: ['breadstick'], flag: { ateBread: true } },
      { id: 'reread-note', label: 'Reread the laminated note', hint: 'It has not become kinder.', to: 'corporate-note', time: 10, power: 0 },
    ],
  },
  'first-cams': {
    title: 'Floor board, midnight',
    location: 'Office',
    speaker: 'bhad',
    who: 'Bhad Bunny',
    body: () => lines(
      'The floor board is a hostess station with delusions, and it costs power to light. Show stage: Joey Cha-Cha, glitter doing cardio. Kitchen: Bubba Beer Bot toasting a peel. Restrooms: Chicken Pete squared to the grout, negotiating with soap, not with his chair. Parts and Service: Ticklish Tiggy, arms out, gaining zero ground. A sixth nameplate is dark: Tatter Tot Tat. NOT CLOCKED IN. The throne is not a camera yet.',
      'Tiggy waves at the lens and misses it, which he will later describe as policy. If you stare at all of this until the breaker files for divorce, that is a choice with a price. One look is reconnaissance. A marathon is how closers black out before the auditor even sits down.',
    ),
    choices: [
      { id: 'to-joey', label: 'Go to Joey on the show stage', hint: 'He has already saved you a dance you did not request.', to: 'dining-welcome', time: 12, power: -1 },
      { id: 'to-bubba', label: 'Go to Bubba in the kitchen', hint: 'The dough is listening. He says that like a warning.', to: 'kitchen-threshold', time: 12, power: -1 },
      { id: 'to-pete', label: 'Go to Pete in the restrooms', hint: 'Bring patience. He brought a headset and a grievance.', to: 'restroom-standoff', time: 12, power: -1 },
      { id: 'more-rooms', label: 'Flip to the other rooms', hint: 'Tiggy, prizes, the dock, or the stare that spends power.', to: 'cam-picks', time: 12, power: -2 },
    ],
  },
  'cam-picks': {
    title: 'The other four feeds',
    location: 'Office',
    speaker: 'bhad',
    who: 'Bhad Bunny',
    body: () => lines(
      'Prize Corner is a bin of toys that know your search history. Loading dock has a dumpster with a doctorate and a sign that hums in the wrong key. Supply closet is a rumor with shelves. Parts and Service is still just Tiggy, magnificent and stationary, top hat level, blue bowtie perfect, claws opening and closing on a hug the geography will not allow.',
      'He mouths, step closer, at a camera that cannot step. You respect the effort. You can go be a good coworker, loot a prize, breathe dock air, or stare at all of this until the lights file for divorce.',
    ),
    choices: [
      { id: 'to-tiggy', label: 'Visit Tiggy in Parts and Service', hint: 'He cannot come to you. That is the whole bit.', to: 'parts-service', time: 12, power: -1 },
      { id: 'to-prize', label: 'Slip into the prize corner', hint: 'Tickets, bins, and poor decisions.', to: 'prize-corner', time: 12, power: -1 },
      { id: 'to-dock', label: 'Step out to the loading dock', hint: 'Night air. A sign you could switch off.', to: 'loading-dock', time: 12, power: -1 },
      { id: 'stare', label: 'Stare at every feed like it owes you', hint: 'This is how closers black out at 12:40.', to: 'cam-marathon', time: 10, power: -10 },
    ],
  },
  'cam-marathon': {
    title: 'Staring as a career',
    location: 'Office',
    speaker: 'bhad',
    who: 'Bhad Bunny',
    body: (s) => lines(
      'You watch the feeds the way other people watch a sport with no ball. Joey sparkles. Bubba rotates a beer one precise degree. Pete lectures a soap pump. Tiggy reaches, misses, looks delighted about the miss, reaches again. The power meter takes notes in a handwriting you do not like.',
      s.power < 30
        ? 'The lights brown a little, like they are shy. If you keep this up, the night will become a group activity in the dark. You can still stop. Stopping is a kind of intelligence.'
        : 'Nothing has jumped out of a camera, because this is a comedy and the building is unionizing its own nonsense instead. You can keep spending power or go touch a real problem.',
    ),
    choices: [
      {
        id: 'keep',
        label: 'Keep staring. The board can take it.',
        hint: 'Heavy power. The clock barely moves. Lights might.',
        to: 'cam-marathon',
        edges: ['cam-marathon', 'ending-blackout-huddle', 'ending-blackout-polka', 'ending-blackout-keg'],
        time: 5,
        power: -30,
      },
      { id: 'to-loudest', label: 'Go to whichever room is loudest', hint: 'That will be the party room. It is always the party room.', to: 'party-room-crisis', time: 12, power: -1 },
      { id: 'to-kitchen-from-cams', label: 'Walk to the kitchen instead', hint: 'Bubba is a calmer screen, somehow.', to: 'kitchen-threshold', time: 12, power: -1 },
      { id: 'stop-staring', label: 'Stop. Patrol like a closer.', hint: 'The west hall has not seen a responsible adult.', to: 'hall-patrol', time: 12, power: -1 },
    ],
  },
  'pa-announcement': {
    title: 'The PA hears everything',
    location: 'Office',
    speaker: 'bhad',
    who: 'Bhad Bunny',
    body: () => lines(
      'You thumb the PA. The click is intimate and then extremely public. "Bunny’s on the clock," you say, and your voice comes back from four rooms wearing reverb like a cheap jacket. Someone in the kitchen claps with a metal hand. Someone in Parts and Service claps short of the microphone, which is on brand.',
      'Pete’s headset squeals. He was not ready for charm at this volume. Joey answers with a dance count: five, six, seven, you. You can own the bit, get professional, offer a pizza bounty, or say the words "pizza pie" and learn what a grievance sounds like at midnight.',
    ),
    choices: [
      { id: 'own-kiss', label: 'Own it and blow a kiss to the building', hint: 'Everybody hears it. A secret, and a little warmth.', to: 'first-cams', time: 10, power: -2, rel: { joey: 1, bubba: 1, pete: 1, tiggy: 1 }, flag: { paKiss: true } },
      { id: 'professional', label: 'Clarify that you are extremely professional', hint: 'Pete respects a clarification. He respects almost nothing else.', to: 'corporate-note', time: 10, power: -1, rel: { pete: 1 }, flag: { professional: true } },
      { id: 'bounty', label: 'Offer a compliment for a pizza slice', hint: 'Bubba will arrive before the sentence ends.', to: 'pizza-bounty', time: 12, power: -2 },
      { id: 'say-pie', label: 'Say "pizza pie" like a tourist', hint: 'Pete has opinions about redundant nouns.', to: 'restroom-standoff', time: 12, power: -1, rel: { pete: -2 }, flag: { peteMad: true } },
    ],
  },
  'pizza-bounty': {
    title: 'A compliment, itemized',
    location: 'Kitchen',
    speaker: 'bubba',
    who: 'Bubba Beer Bot',
    body: () => lines(
      'Bubba Beer Bot fills the pass-through, beer steady, chest hair catching neon like it has seniority. "You offered a compliment," he says, sincere as a warranty. "I need to know which part of the operation you are praising. I run several." The dough behind him makes a quiet yeast noise that wants a lawyer.',
      'He is not fishing. He is doing inventory of kindness. You can praise the beer, the arms, the dough, or admit the bounty was a bit. Admitting the bit will disappoint four adults and one pizza. Praising something will move the night.',
    ),
    choices: [
      { id: 'compliment-beer', label: 'Praise the beer like it is a coworker', hint: 'He will take you seriously. That is the risk.', to: 'bubba-beer-talk', time: 12, power: -1, rel: { bubba: 2 } },
      { id: 'compliment-arms', label: 'Praise the arms, and mean the rest too', hint: 'Flirting. He can handle a sentence.', to: 'bubba-flirt', time: 12, power: -1, rel: { bubba: 2 }, flag: { flirtBubba: true } },
      { id: 'compliment-dough', label: 'Tell the dough it is doing great', hint: 'The dough has been waiting to be addressed.', to: 'dough-whisper', time: 12, power: -1, rel: { bubba: 1 }, flag: { doughHeard: true } },
      { id: 'kidding', label: 'Admit you were doing a bit', hint: 'Honest. Slightly cooling. The slice stays put.', to: 'hall-patrol', time: 12, power: -1, rel: { joey: -1, bubba: -1, pete: -1, tiggy: -1 } },
    ],
  },
  'dining-welcome': {
    title: 'Mandatory welcome number',
    location: 'Show Stage',
    speaker: 'joey',
    who: 'Joey Cha-Cha',
    body: (s) => lines(
      'Joey Cha-Cha spins, human face delighted under the captain hat, pink and blue and gold limbs throwing sparkles like polite hail. One arm is already up. The other finds his hip like the hip applied for the job. "Welcome to the shift, sugar. We begin every night with a dance break in case the night gets ideas."',
      s.inventory.includes('glitter')
        ? 'The glitter rag in your pocket lights up his whole belief system. He almost proposes to the rag, then remembers you are attached to it. The cigarette bobs on the beat and, annoyingly, does not ash early. You can dance, postpone, flirt, or sneak toward the prize corner while he bows at a chair.'
        : 'The cigarette bobs on the beat and somehow never ashes early, which feels like cheating. Behind him the empty dining room is a ballroom if you squint and a mess if you don’t. Dance, postpone, flirt, or sneak. He will have a feeling about all four.',
    ),
    choices: [
      { id: 'dance', label: 'Dance the welcome number with him', hint: 'He remembers dancers. The clock spends a bigger bite.', to: 'joey-dance-break', time: 25, power: -2, rel: { joey: 2 }, flag: { dancedOnce: true } },
      { id: 'later', label: 'Ask him to hold the dance', hint: 'A postponed dance is, to him, a tiny heartbreak with shoes.', to: 'joey-later', time: 12, power: -1, rel: { joey: -1 }, flag: { danceDebt: true } },
      { id: 'flirt-joey', label: 'Tell him you only dance if he leads', hint: 'Flirting, with a bow-out available later.', to: 'joey-flirt', time: 12, power: -1, rel: { joey: 2 }, flag: { flirtJoey: true } },
      { id: 'sneak-prize', label: 'Sneak toward the prize corner', hint: 'He is bowing. You are a raccoon with ears.', to: 'prize-corner', time: 12, power: -1, flag: { snuck: true } },
    ],
  },
  'joey-dance-break': {
    title: 'Glitter in the socks',
    location: 'Show Stage',
    speaker: 'joey',
    who: 'Joey Cha-Cha',
    body: () => lines(
      'You dance. It is, unfortunately, good. He dips you over a chair and thanks the chair by name. Sparkles migrate into your socks, which is now a medical condition and a conversation starter. "Crises," he says, delighted, "are just choreography that skipped class."',
      'The building applauds by humming. You can go find the actual crisis, burn power watching yourselves on the board, flirt for an encore, or take the afterglow to Bubba, who will not dance but might offer a slice like a medal.',
    ),
    choices: [
      { id: 'crisis-soon', label: 'Ask where the real crisis is', hint: 'He will point at the party room like it is act two.', to: 'party-room-crisis', time: 15, power: -1 },
      { id: 'cams-from-dance', label: 'Watch the building from the board', hint: 'A victory lap that spends power.', to: 'cam-marathon', time: 10, power: -8 },
      { id: 'encore-flirt', label: 'Ask for an encore, closer than policy', hint: 'More charm. He is a willing audience.', to: 'joey-flirt', time: 12, power: -1, rel: { joey: 1 }, flag: { flirtJoey: true } },
      { id: 'kitchen-after-dance', label: 'Take the victory to the kitchen', hint: 'Bubba should know the night can be fun.', to: 'kitchen-threshold', time: 15, power: -1 },
    ],
  },
  'joey-flirt': {
    title: 'Consent, in four-four',
    location: 'Show Stage',
    speaker: 'joey',
    who: 'Joey Cha-Cha',
    body: (s) => lines(
      'Joey short-circuits one sequin and recovers with a bow. "I lead, I follow, and either of us can bow out. The song still counts." His voice is warm, not grabby. The captain hat tips like it is also asking. You are allowed to want the parking lot, the number, the kitchen, or none of it.',
      s.flags.dancedOnce
        ? 'You already danced, so he trusts your yes and your no. A curb at 6:00 AM is on the table, next to a traffic cone he has definitely already named. Bowing out will not cost you the night. He says that, and he means it, which is annoyingly attractive.'
        : 'You have not danced yet. He will still flirt, but he will not walk you to a parking lot on theory alone. "One number," he says, "then we may discuss curbs. A curb without a dance is just concrete."',
    ),
    choices: [
      {
        id: 'date-ask',
        label: 'Ask him to walk you out at six',
        hint: 'He wants a dance on the books first.',
        to: (s) => (s.flags.dancedOnce ? 'waiting-curb-joey' : 'joey-later'),
        edges: ['waiting-curb-joey', 'joey-later'],
        time: 15,
        power: -1,
        flag: (s) => (s.flags.dancedOnce ? { dateJoey: true, flirtJoey: true } : { dateDenied: true }),
      },
      { id: 'decline-song', label: 'Bow out. Not tonight, captain.', hint: 'He treats a no as choreography. Rel stays kind.', to: 'hall-patrol', time: 12, power: -1, rel: { joey: 1 }, flag: { declinedFlirt: true } },
      { id: 'song-then-pizza', label: 'Flirt, then go check the pizza', hint: 'Charm now, dough later. Very you.', to: 'kitchen-threshold', time: 15, power: -1 },
      {
        id: 'lead-or-encore',
        label: 'Let him lead a full number',
        hint: 'This puts a dance on the books.',
        to: (s) => (s.flags.dancedOnce ? 'dance-or-die' : 'joey-dance-break'),
        edges: ['dance-or-die', 'joey-dance-break'],
        time: 20,
        power: -2,
        rel: { joey: 1 },
        flag: { dancedOnce: true, flirtJoey: true },
      },
    ],
  },
  'joey-later': {
    title: 'A heartbreak with shoes',
    location: 'Show Stage',
    speaker: 'joey',
    who: 'Joey Cha-Cha',
    body: (s) => lines(
      'Joey clutches his bow like it called in sick. "A postponed dance is a tiny heartbreak with shoes," he says, and then, because he is an adult and not a trap, "I will live. The night might not." He still sparkles. The sparkle is just slightly disappointed, which is a color.',
      s.flags.dateDenied
        ? 'He adds, gently, that parking lots are a reward for people who have counted to eight together. Come back after a number if you want the curb. Until then he will choreograph the empty room and pretend it is sold out.'
        : 'He allows the delay. He will collect it later, probably in the middle of a fire, a typo, or a feeling. You can promise him the crisis dance, go see Bubba, go see Pete, or hide among prizes.',
    ),
    choices: [
      { id: 'promise-dance', label: 'Promise him the crisis dance', hint: 'He will hold you to it with glitter.', to: 'party-room-crisis', time: 15, power: -1, flag: { danceDebt: true } },
      { id: 'visit-bubba', label: 'Leave him sparkling and find Bubba', hint: 'The kitchen is a different genre.', to: 'kitchen-threshold', time: 12, power: -1 },
      { id: 'visit-pete', label: 'Go see what Pete is yelling at', hint: 'It is smaller than the yelling.', to: 'restroom-standoff', time: 12, power: -1 },
      { id: 'visit-prize', label: 'Cool off in the prize corner', hint: 'Toys do not ask you to count.', to: 'prize-corner', time: 12, power: -1 },
    ],
  },
  'kitchen-threshold': {
    title: 'The dough is listening',
    location: 'Kitchen',
    speaker: 'bubba',
    who: 'Bubba Beer Bot',
    body: () => lines(
      'Bubba Beer Bot stands in the kitchen doorway like a polite eclipse. Shirtless, bearded, cyborg knees whirring, beer held at a respectful height. "Bun," he says. "You are early or the dough is late. One of you is a problem." Behind him the walk-in ticks. The pizza peel has been toasted. He did that for morale.',
      'He offers the night in four shapes: talk about the beer, flirt like adults, step into the cooler with him, or leave him and go see why the restroom is filing paperwork. He adds, almost shy, "If an auditor asks what I hid, it is the fuse behind the cheese. If she asks for leverage, a slice is leverage. I do not mean a person."',
    ),
    choices: [
      { id: 'beer-talk', label: 'Ask him about the beer and the night', hint: 'He will answer both with the same sentence.', to: 'bubba-beer-talk', time: 15, power: -1 },
      { id: 'keg-flirt', label: 'Ask if he lifts kegs or just the mood', hint: 'Flirting. He blushes in neon and chest hair.', to: 'bubba-flirt', time: 12, power: -1, rel: { bubba: 2 }, flag: { flirtBubba: true } },
      { id: 'cooler', label: 'Step into the walk-in with him', hint: 'Trust, cold air, and a job offer with foam.', to: 'bubba-trust-cooler', time: 15, power: -1, rel: { bubba: 2 }, flag: { coolerTrust: true } },
      { id: 'leave-restroom', label: 'Leave him be and check the restrooms', hint: 'Pete’s headset has been redlining.', to: 'restroom-standoff', time: 12, power: -1 },
    ],
  },
  'bubba-beer-talk': {
    title: 'A cold can, a long shift',
    location: 'Kitchen',
    speaker: 'bubba',
    who: 'Bubba Beer Bot',
    body: () => lines(
      '"I am not drunk," Bubba says, which nobody asked, "I am on duty in a different font." He looks at the beer like it is a coworker who does not talk back. "The night is long. The pizza is a responsibility. You want a slice, a secret, or the dignity of saying no?" The cyborg thumb could open a jar of fate. It taps the can instead, gently.',
      'Steam, yeast, and a little honesty fog the pass. A sip would be a joke and a battery. A slice would be lunch and leverage. Asking about the dough would be how people join cults that only meet in walk-ins. Declining is also a kind of respect, and he will clock it.',
    ),
    choices: [
      { id: 'take-sip', label: 'Take one sip. For science.', hint: 'Once. A little power, then the can is a prop.', to: 'bubba-trust-cooler', time: 12, power: (s) => (s.flags.sipped ? -2 : 6), rel: { bubba: 1 }, flag: { sipped: true, coolerTrust: true } },
      { id: 'take-slice', label: 'Ask for a slice, no philosophy', hint: 'Goes in your pocket. He likes being useful.', to: 'hall-patrol', time: 12, power: -1, rel: { bubba: 2 }, add: ['slice'] },
      { id: 'ask-dough', label: 'Ask what the dough has been saying', hint: 'This is how secrets start. Yeast-based.', to: 'dough-whisper', time: 12, power: -1, flag: { doughHeard: true } },
      { id: 'decline-beer', label: 'Decline. Keep it kind.', hint: 'He respects a no more than a performance.', to: 'hall-patrol', time: 12, power: -1, rel: { bubba: 1 }, flag: { politeSip: true } },
    ],
  },
  'bubba-flirt': {
    title: 'Arms do kegs',
    location: 'Kitchen',
    speaker: 'bubba',
    who: 'Bubba Beer Bot',
    body: () => lines(
      'Bubba looks at his own arms, then at you, then at a point on the wall that is safer than eye contact. "These lift kegs," he says. "The rest of me is trying to be polite about the bad neon and how good you look in it." The beer sweats. He does not. He condensates, he claims, and calls it a feature.',
      'It is flirting, not a trap. You can take a slice and change the subject, tour the cooler, ask about the parking lot at six, or go back to work and leave the compliment standing. He will not chase. His knees are loud enough without a pursuit.',
    ),
    choices: [
      { id: 'still-slice', label: 'Take the flirt, and a slice', hint: 'Pocket the pizza. Keep the warmth.', to: 'bubba-beer-talk', time: 12, power: -1, add: ['slice'], rel: { bubba: 1 } },
      { id: 'tour-cooler', label: 'Ask for the cooler tour', hint: 'Cold air makes people honest.', to: 'bubba-trust-cooler', time: 15, power: -1, flag: { coolerTrust: true } },
      { id: 'ask-date', label: 'Ask for a curb at 6, no animatronic chorus', hint: 'He will consider the parking lot a venue.', to: 'waiting-curb-bubba', time: 15, power: -1, flag: { dateBubba: true, flirtBubba: true } },
      { id: 'back-to-work', label: 'Smile and get back on the clock', hint: 'The building still has problems with legs and without.', to: 'hall-patrol', time: 12, power: -1 },
    ],
  },
  'bubba-trust-cooler': {
    title: 'Walk-in diplomacy',
    location: 'Walk-in Cooler',
    speaker: 'bubba',
    who: 'Bubba Beer Bot',
    body: () => lines(
      'The walk-in is a chapel of cheese. Bubba holds the door like a gentleman and a forklift. "Foam Manager is open," he says, as if that is a real title and not something he invented between the olives and the doubt. "Benefits are a beer and the knowledge that you left security for a feeling." The dough, on a tray, clears a throat it does not have.',
      'You can listen to the dough, pocket the fuse someone hid behind the mozzarella, take the ridiculous title tonight, or go stare at cameras until the lights give up. The title is early and silly and permanent enough to end a shift. He will not be wounded if you keep working. He will be wounded if you mock the yeast.',
    ),
    choices: [
      { id: 'listen-dough', label: 'Listen to the dough', hint: 'It has a platform. You may regret literacy.', to: 'dough-whisper', time: 12, power: -1, flag: { listenedDough: true } },
      { id: 'cheese-fuse', label: 'Pocket the fuse behind the cheese', hint: 'Voltage, mozzarella-scented. Then the breaker box.', to: 'fuse-box', time: 12, power: -1, add: ['fuse'] },
      { id: 'foam-now', label: 'Take the Foam Manager title tonight', hint: 'Only after you have heard the dough or shared the sip. Otherwise he sends you back to listen.', to: (s) => ((s.flags.listenedDough || s.flags.sipped) ? 'ending-foam-manager' : 'dough-whisper'), edges: ['ending-foam-manager', 'dough-whisper'], time: 10, power: -2, force: (s) => Boolean(s.flags.listenedDough || s.flags.sipped), flag: (s) => ((s.flags.listenedDough || s.flags.sipped) ? { foamBoss: true } : {}) },
      { id: 'cams-from-cooler', label: 'Leave the cold and stare at cams', hint: 'Power-hungry. The beer will not save the lights.', to: 'cam-marathon', time: 10, power: -8 },
    ],
  },
  'dough-whisper': {
    title: 'Yeast, unionizing',
    location: 'Walk-in Cooler',
    speaker: 'bubba',
    who: 'The dough, allegedly',
    onEnter(s) { s.flags.listenedDough = true; },
    body: () => lines(
      'The dough says, in a voice that is absolutely Bubba doing a bit and also maybe not, "Unionize the toppings. Rise together. The pineapple is a scab." Bubba stares at the tray with the seriousness of a man who has heard worse from management. You are freezing, charmed, and one bad decision away from a new career in gluten.',
      'A plunger is chilling between the cheese and a bag of doubt, which is the walk-in’s idea of a joke. You can join the dough and end the night as a coworker of bread, go back to a human shift, tell Bubba the tray is chatty, or take the plunger before Pete needs a myth.',
    ),
    choices: [
      { id: 'join-dough', label: 'Join the dough. End the shift risen.', hint: 'A secret ending. You will not be the same bunny.', to: 'ending-dough', time: 10, power: -1, force: true, flag: { doughPact: true } },
      { id: 'back-to-shift', label: 'I have a shift. Sorry, yeast.', hint: 'The supply closet is on the way back to sanity.', to: 'supply-closet', time: 12, power: -1 },
      { id: 'tell-bubba', label: 'Tell Bubba his dough is chatty', hint: 'He already knows. He wants a witness.', to: 'bubba-beer-talk', time: 12, power: -1, rel: { bubba: 1 } },
      { id: 'grab-plunger-nearby', label: 'Take the chilled plunger', hint: 'The restroom will understand. Or it will not.', to: 'toilet-stall', time: 12, power: -1, add: ['plunger'] },
    ],
  },
  'restroom-standoff': {
    title: 'Soap, squared to the grout',
    location: 'Restrooms',
    speaker: 'pete',
    who: 'Chicken Pete',
    body: (s) => {
      const here = (s.cams.Restrooms || []).includes(PEOPLE.pete);
      return lines(
        here
          ? 'Chicken Pete has the sunglasses, the headset, the lollipop, and a grievance with a pulse. He is parked square to the grout line, bird feet resting on the footplates, talons quiet until the soap disappoints him again. "THIS SOAP," he says, at a volume that is a choice, "HAS A VIBE. THE VIBE IS WRONG."'
          : 'Pete is not in the restroom. The soap is worse without an audience, which would delight him and ruin you. His voice still arrives through the headset from wherever the party dragged him. The toilet plays one exploratory note, like a tuba paying rent.',
        'His anger is about one degree of pump angle, not about the chair, not about the bird legs, not about you existing. He will say this again if you let him: if the auditor asks, the grievance is the soap. You can fix the soap, audit a napkin, hide in a stall, or tell him it is just a bathroom and accept the weather. The lollipop clicks. He is ready to gavel.',
      );
    },
    choices: [
      { id: 'fix-soap', label: 'Straighten the soap. Gently. Precisely.', hint: 'He rewards correct hands. This is his love language.', to: 'pete-standards', time: 15, power: -1, rel: { pete: 2 }, flag: { soapFixed: true } },
      { id: 'check-napkin', label: 'Ask about the napkin situation', hint: 'There is a swan. He wants it tried as an adult.', to: 'pete-napkin', time: 12, power: -1 },
      { id: 'into-stall', label: 'Excuse yourself into a stall', hint: 'The toilet has a solo career.', to: 'toilet-stall', time: 12, power: -1 },
      { id: 'dismiss', label: 'Tell him it is just a bathroom', hint: 'He will promote this into a crisis.', to: 'pete-rage', time: 12, power: -1, rel: { pete: -2 }, flag: { peteMad: true } },
    ],
  },
  'pete-napkin': {
    title: 'The sad origami swan',
    location: 'Restrooms',
    speaker: 'pete',
    who: 'Chicken Pete',
    body: () => lines(
      'A napkin on the sink has been folded into a swan by a person who should not be allowed near birds or paper. Pete rolls closer and aims the lollipop at it like a badge. "WHO FOLDED THIS INTO A SAD SWAN. I WILL FIGHT THE SWAN." The bird feet tap an impatient eighth note. The fight is philosophical. The swan is paper. He knows. He is still right, in his heart.',
      'You can refold it to his spec, defend the swan as art, offer a pizza slice as a peace topping if you have one, or flirt while you fold and see a headset short-circuit. He is an adult with a checklist. Charm is not on the checklist. Competence is.',
    ),
    choices: [
      { id: 'refold', label: 'Refold the napkin to his spec', hint: 'Three points of Pete. A calm that feels expensive.', to: 'pete-standards', time: 15, power: -1, rel: { pete: 3 }, flag: { napkinFixed: true } },
      { id: 'defend-swan', label: 'Defend the swan. It is art.', hint: 'He will write the swan up. And you.', to: 'pete-rage', time: 12, power: -1, flag: { swanWar: true, peteMad: true }, rel: { pete: -1 } },
      {
        id: 'peace-topping',
        label: 'Offer a pizza slice as a peace topping',
        hint: 'Works if you actually have pizza. Air does not.',
        to: (s) => (s.inventory.includes('slice') ? 'pete-standards' : 'pete-rage'),
        edges: ['pete-standards', 'pete-rage'],
        time: 12,
        power: -1,
        remove: (s) => (s.inventory.includes('slice') ? ['slice'] : []),
        rel: (s) => ({ pete: s.inventory.includes('slice') ? 3 : -1 }),
        flag: (s) => (s.inventory.includes('slice') ? { toppingPeace: true, napkinFixed: true } : { peteMad: true }),
      },
      { id: 'flirt-fold', label: 'Flirt while you fold his standards', hint: 'He will file the charm. He might keep it.', to: 'pete-flirt', time: 12, power: -1, rel: { pete: 1 }, flag: { flirtPete: true } },
    ],
  },
  'pete-flirt': {
    title: 'Unauthorized charm',
    location: 'Restrooms',
    speaker: 'pete',
    who: 'Chicken Pete',
    body: (s) => lines(
      '"The lollipop makes you look like a very strict sweetheart," you tell him. Pete’s headset pops. "FLIRTING IS NOT ON THE LAMINATE." He pauses. The sunglasses stay on, which is cowardly and correct. "However. Your volume was correct." The bird feet go still, which from him is a sonnet.',
      s.flags.lipstickLaw
        ? 'You mention the lipstick amendment. He hates that it is written down and respects that it is written down. Those are the same muscle. He will either log this in the headset or allow it to become a union of correct things, which is Pete for fond.'
        : 'He does not want a mess. He wants a form. If you help him log the moment, he might accidentally make you official. If you flee, he will allow the flee. Pete is loud, not a cage.',
    ),
    choices: [
      { id: 'headset-log', label: 'Help him log the incident in the headset', hint: 'This is how Pete asks someone to stay.', to: 'pete-union-pitch', time: 15, power: -1, rel: { pete: 1 } },
      { id: 'visit-tiggy', label: 'Smile and go see Tiggy', hint: 'A different kind of reach.', to: 'parts-service', time: 12, power: -1 },
      { id: 'mop-escape', label: 'Take the compliment and patrol', hint: 'Leave him with correct volume and a feeling.', to: 'hall-patrol', time: 12, power: -1 },
      { id: 'apologize-form', label: 'Apologize in the shape of a form', hint: 'He calms down when paper is involved.', to: 'pete-standards', time: 12, power: -1, rel: { pete: 1 } },
    ],
  },
  'pete-rage': {
    title: 'Eleven degrees toward chaos',
    location: 'Restrooms',
    speaker: 'pete',
    who: 'Chicken Pete',
    body: () => lines(
      'Pete’s volume finds a second gear that should have required a permit. "THE LINES ON THE FLOOR ARE A CONTRACT." He rolls a perfect line anyway, because the anger is about standards, not about getting anywhere. The lollipop is a gavel. The soap is a defendant. You are adjacent to the crime of having a personality.',
      'You can apologize and return to the napkin, double down and let a paper bird end your employment, hide in a stall while the toilet offers asylum, or try to bribe him. A real slice might save you. A mime of a slice will not. He has had enough theater from the swan.',
    ),
    choices: [
      { id: 'apologize', label: 'Apologize and face the napkin', hint: 'He wants the swan fixed, not your obituary.', to: 'pete-napkin', time: 12, power: -1 },
      { id: 'double-down', label: 'Double down. Napkins are fake.', hint: 'This can fire you. He is not kidding.', to: 'ending-fired-napkin', time: 8, power: -1, force: true, rel: { pete: -1 } },
      { id: 'hide-stall', label: 'Hide in a stall until the volume drops', hint: 'The toilet is taking auditions.', to: 'toilet-stall', time: 12, power: -1 },
      {
        id: 'bribe-pete',
        label: 'Bribe him with a pizza slice',
        hint: 'Only a real slice de-escalates a swan.',
        to: (s) => (s.inventory.includes('slice') ? 'pete-standards' : 'ending-fired-napkin'),
        edges: ['pete-standards', 'ending-fired-napkin'],
        force: (s) => !s.inventory.includes('slice'),
        time: 10,
        power: -1,
        remove: (s) => (s.inventory.includes('slice') ? ['slice'] : []),
        rel: (s) => ({ pete: s.inventory.includes('slice') ? 2 : -1 }),
        flag: (s) => (s.inventory.includes('slice') ? { toppingPeace: true } : { peteMad: true }),
      },
    ],
  },
  'pete-standards': {
    title: 'A calm made of right angles',
    location: 'Restrooms',
    speaker: 'pete',
    who: 'Chicken Pete',
    body: (s) => lines(
      'The restroom, against its nature, becomes correct. Pete exhales like a man who has won a war against a pump. "ACCEPTABLE," he says, which from him is a parade. The headset light stops being a siren and becomes a nightlight. He looks at you over the sunglasses for half a second, then remembers sunglasses are a lifestyle.',
      s.flags.flirtPete
        ? 'He adds, quieter, "If we are writing a union of correct things, the charm clause can be a footnote. Footnotes are still binding." The offer is ridiculous and, if you want it, real.'
        : 'He is one signature away from making his standards a club. You can take the title, leave while you are ahead, carry the calm to the party room, or go meet the tiger who cannot attend meetings.',
    ),
    choices: [
      { id: 'make-official', label: 'Ask him to make it official', hint: 'Ends the shift in the union of correct things.', to: 'ending-pete-union', time: 10, power: -1, force: true },
      { id: 'enough-rules', label: 'That is enough rules. Patrol.', hint: 'Leave the win on the sink.', to: 'hall-patrol', time: 12, power: -1 },
      { id: 'tell-party', label: 'Take this energy to the party room', hint: 'A typo is waiting to be prosecuted.', to: 'party-room-crisis', time: 15, power: -1 },
      { id: 'meet-tiggy', label: 'Go meet Tiggy while Pete is calm', hint: 'Different radius. Same building.', to: 'parts-service', time: 12, power: -1 },
    ],
  },
  'toilet-stall': {
    title: 'The tuba that pays rent',
    location: 'Restrooms',
    speaker: 'bhad',
    who: 'Bhad Bunny',
    body: (s) => lines(
      'The stall is a green room for a toilet with ambitions. It plays one wet note, a tuba that pays rent and regrets the lease. Something in the bowl has plans. None of them are flushable. You respect the plans from a safe emotional distance and keep your white skirt out of the narrative.',
      s.inventory.includes('plunger')
        ? 'The cowboy plunger is already yours, leaned once like an extra in a western and now demoted to inventory. You can talk to the toilet with authority, flush in solidarity, or leave before Pete writes up the acoustics.'
        : 'A plunger leans in the corner like a cowboy between jobs. You can hire it, flush like a professional, hold a conference with the bowl, or return to the hall. Crude, yes. Mean, no. The toilet started it.',
    ),
    choices: [
      { id: 'take-plunger', label: 'Take the cowboy plunger', hint: 'You may need a myth later.', to: 'toilet-stall', time: 10, power: 0, add: ['plunger'], flag: { tookPlunger: true } },
      { id: 'flush-correct', label: 'Flush once, correctly, for yes', hint: 'Pete can hear a correct flush through drywall.', to: 'restroom-standoff', time: 10, power: -1, rel: { pete: 1 }, flag: { flushed: true } },
      {
        id: 'talk-toilet',
        label: 'Hold a serious meeting with the toilet',
        hint: 'With a plunger, this becomes a coronation path.',
        to: (s) => (s.inventory.includes('plunger') ? 'toilet-finale' : 'toilet-stall'),
        edges: ['toilet-finale', 'toilet-stall'],
        time: 12,
        power: -1,
        flag: { toiletTalk: true },
      },
      { id: 'leave-stall', label: 'Leave the stall to its solo career', hint: 'The west hall smells less like plot.', to: 'hall-patrol', time: 12, power: -1 },
    ],
  },
  'toilet-finale': {
    title: 'Application to the throne',
    location: 'Restrooms',
    speaker: 'bhad',
    who: 'Bhad Bunny',
    body: (s) => lines(
      'The toilet has composed itself into a single dignified note. With the right tools and the right conversation, it might accept a monarch. Without them, it will splash one sock and call that governance. You stand like a closer who has seen things and is choosing to describe them as "workplace."',
      s.inventory.includes('plunger') && (s.flags.toiletTalk || s.flags.flushed)
        ? 'Plunger in hand, conference already held or flush already respected: the bowl is ready to retire from mischief. Claiming the throne ends the night as a legend the next closer will refuse to believe.'
        : 'You are underdressed for royalty, in the equipment sense. The toilet declines to knight anyone who showed up with vibes alone. You can still mop toward dawn, fetch Pete, or get dock air.',
    ),
    choices: [
      {
        id: 'claim-throne',
        label: 'Claim the throne of the tuba toilet',
        hint: 'Needs the plunger and a prior conversation or flush.',
        to: (s) => (s.inventory.includes('plunger') && (s.flags.toiletTalk || s.flags.flushed) ? 'ending-toilet-throne' : 'last-hour'),
        edges: ['ending-toilet-throne', 'last-hour'],
        force: (s) => s.inventory.includes('plunger') && (s.flags.toiletTalk || s.flags.flushed),
        time: 15,
        power: -1,
      },
      { id: 'finale-mop', label: 'Skip royalty. Mop toward morning.', hint: 'Dawn is a cleaner ambition.', to: 'last-hour', time: 15, power: -1 },
      { id: 'finale-pete', label: 'Report the acoustics to Pete', hint: 'He will have a form. He will be moved.', to: 'restroom-standoff', time: 12, power: -1 },
      { id: 'finale-dock', label: 'Get night air before you ferment', hint: 'The dock does not have a solo.', to: 'loading-dock', time: 12, power: -1 },
    ],
  },
  'parts-service': {
    title: 'A landmark with a bowtie',
    location: 'Parts & Service',
    speaker: 'tiggy',
    who: 'Ticklish Tiggy',
    body: () => lines(
      'Ticklish Tiggy is exactly where the building installed him: round, tiger-striped, top hat level, blue bowtie shining, claws open, round metal base planted in the checkered floor. No legs, no commute, no apology. "Hello, ears," he says, delighted. "I would tickle you hello, but distance has unionized against me."',
      'The reach stops short of your elbow by a polite, infuriating gap. He looks at the gap like it owes him money and also like he is fond of it. "An auditor cited me once for being furniture," he adds. "I do not commute. If she asks, that is the whole statute. Tell her the base is a base." You can step into the radius, flirt from outside it, ask about the shelf, or respect the radius and leave.',
    ),
    choices: [
      { id: 'step-in', label: 'Step into his radius', hint: 'He can finally boop an elbow. This matters to him.', to: 'tiggy-step-in', time: 12, power: -1, rel: { tiggy: 3 }, flag: { tickled: true } },
      { id: 'flirt-tiggy', label: 'Flirt from just outside the reach', hint: 'Old-fashioned. He cannot catch you. He likes that.', to: 'tiggy-flirt', time: 12, power: -1, rel: { tiggy: 2 }, flag: { flirtTiggy: true } },
      { id: 'ask-errand', label: 'Ask what he has been reaching for', hint: 'A feather duster. Since approximately forever.', to: 'tiggy-errand', time: 12, power: -1, flag: { featherQuest: true } },
      { id: 'respect-radius', label: 'Respect the radius and patrol', hint: 'He calls this consent and also a shame.', to: 'hall-patrol', time: 12, power: -1, rel: { tiggy: 1 }, flag: { respectedRadius: true } },
    ],
  },
  'tiggy-step-in': {
    title: 'Contact, reported to the base',
    location: 'Parts & Service',
    speaker: 'tiggy',
    who: 'Ticklish Tiggy',
    onEnter(s) { s.flags.tickled = true; },
    body: () => lines(
      'You step in. One claw boops your elbow with the ceremony of a knighting. Tiggy gasps like someone revealed cake. "Contact. I shall tell the base. The base never listens, but I shall tell it." The top hat does not move. The base does not roll. The whole miracle is that you walked four inches and ended a long almost.',
      'He is giddy and still stationary. A treaty is available, the silly kind with clauses about weekends and elbows. He can also narrate the building from here, because landmarks see everything and attend nothing. You may boop him back. He will file the boop under diplomacy.',
    ),
    choices: [
      { id: 'open-treaty', label: 'Talk radius treaty', hint: 'If you already made contact, he will sign.', to: 'tickle-treaty-talk', time: 12, power: -1 },
      { id: 'ask-intel', label: 'Ask him to read the building for you', hint: 'He stays. You go look at the board.', to: 'first-cams', time: 12, power: -3, flag: { tiggyIntel: true } },
      { id: 'boop-back', label: 'Boop him back, equally formal', hint: 'A secret. Also manners.', to: 'parts-service', time: 10, power: 0, rel: { tiggy: 1 }, flag: { boop: true } },
      { id: 'invite-crisis', label: 'Leave him celebrating and find the crisis', hint: 'He cannot roll into the party room. He will comment by cam.', to: 'party-room-crisis', time: 15, power: -1 },
    ],
  },
  'tiggy-flirt': {
    title: 'A letter that bites',
    location: 'Parts & Service',
    speaker: 'tiggy',
    who: 'Ticklish Tiggy',
    body: () => lines(
      '"That hat is doing more for me than most people’s whole personalities," you say. Tiggy fans himself with a striped arm and nearly hats himself again. "Flirtation acknowledged. I still cannot reach you, which makes this charmingly old-fashioned. Like a letter. That bites." The blue bowtie catches the light and behaves better than either of you.',
      'He does not lunge. He could not if he tried, and he is not trying. The game is that you decide the distance. Step in, promise the feather he has been losing to a shelf, blow a kiss he will fail to catch and love anyway, or salute the radius and go.',
    ),
    choices: [
      { id: 'step-in-now', label: 'Step in now and let him boop', hint: 'The flirt becomes contact. He will embroider it.', to: 'tiggy-step-in', time: 12, power: -1, rel: { tiggy: 1 }, flag: { tickled: true } },
      { id: 'promise-feather', label: 'Promise to fetch the feather duster', hint: 'Supply closet. The shelf’s long winning streak.', to: 'supply-closet', time: 12, power: -1, flag: { featherQuest: true } },
      { id: 'blow-kiss', label: 'Blow a kiss he cannot catch', hint: 'He catches it emotionally. You end up by the prizes.', to: 'prize-corner', time: 12, power: -1, rel: { tiggy: 1 } },
      { id: 'respect-from-here', label: 'Keep the flirt and the distance', hint: 'He calls this exquisite. Then you patrol.', to: 'hall-patrol', time: 12, power: -1, flag: { flirtTiggy: true } },
    ],
  },
  'tiggy-errand': {
    title: 'The shelf is winning',
    location: 'Parts & Service',
    speaker: 'tiggy',
    who: 'Ticklish Tiggy',
    body: () => lines(
      '"Feather duster," Tiggy says, pointing with a claw at a high shelf that has never lost a fight. "I have been reaching since the pizza was a theory. The shelf knows. The shelf is smug." He demonstrates. The demonstration ends in air. He looks proud of the attempt and furious at the geometry, in a fond way.',
      'You can fetch the real duster, hand him a broom as emotional support, step into range instead and skip the errand, or leave the landmark to his landmarking. He will not call you cruel for leaving. He will call the shelf a rival, which is healthier.',
    ),
    choices: [
      { id: 'get-feather', label: 'Go get the feather duster', hint: 'Supply closet, then maybe a delivery.', to: 'supply-closet', time: 12, power: -1, flag: { featherQuest: true } },
      { id: 'give-broom', label: 'Hand him the emotional-support broom', hint: 'He can hold it. He still cannot travel.', to: 'tickle-treaty-talk', time: 12, power: -1, add: ['broom'], rel: { tiggy: 1 }, flag: { broom: true } },
      { id: 'step-instead', label: 'Skip the shelf. Step in.', hint: 'Contact beats inventory.', to: 'tiggy-step-in', time: 12, power: -1, rel: { tiggy: 2 }, flag: { tickled: true } },
      { id: 'later-tiger', label: 'Tell the shelf it can wait', hint: 'Patrol. He will still be here. That is his gift.', to: 'hall-patrol', time: 12, power: -1 },
    ],
  },
  'tickle-treaty-talk': {
    title: 'Clauses about elbows',
    location: 'Parts & Service',
    speaker: 'tiggy',
    who: 'Ticklish Tiggy',
    body: (s) => lines(
      'Tiggy clears his throat like a tiny parliament. "A radius treaty. You agree to occasionally be within reach. I agree not to pretend I can cross a room. The base remains a base. The hat remains a hat. Tickles are by appointment and by you stepping, never by me suddenly growing a commute."',
      qualifiedTickle(s)
        ? 'You have either been booped, or you are holding something he can actually grasp. He is ready to sign with a claw and a ridiculous amount of dignity. Weekends-only is also a legal personality.'
        : 'He will not sign with someone outside the radius and empty-handed. "I am fond, not fictional," he says. Fetch the feather, or step in, or both, in some order that respects physics.',
    ),
    choices: [
      {
        id: 'sign-treaty',
        label: 'Offer the radius treaty',
        hint: 'Needs a boop, a feather, or the broom.',
        to: (s) => (qualifiedTickle(s) ? 'ending-tickle-treaty' : 'tiggy-errand'),
        edges: ['ending-tickle-treaty', 'tiggy-errand'],
        force: (s) => qualifiedTickle(s),
        time: 12,
        power: -1,
      },
      {
        id: 'weekend-tickles',
        label: 'Offer weekend tickles only',
        hint: 'A smaller promise. Still needs proof of reach.',
        to: (s) => (qualifiedTickle(s) ? 'last-hour' : 'tiggy-errand'),
        edges: ['last-hour', 'tiggy-errand'],
        time: 12,
        power: -1,
        flag: (s) => (qualifiedTickle(s) ? { partialTreaty: true } : {}),
      },
      { id: 'fetch-feather', label: 'Go get the feather first', hint: 'The shelf does not get a vote.', to: 'supply-closet', time: 12, power: -1, flag: { featherQuest: true } },
      { id: 'step-closer', label: 'Step closer, then we talk', hint: 'Physics first. Paperwork second.', to: 'tiggy-step-in', time: 10, power: -1, flag: { tickled: true }, rel: { tiggy: 1 } },
    ],
  },
  'prize-corner': {
    title: 'Toys with opinions',
    location: 'Prize Corner',
    speaker: 'bhad',
    who: 'Bhad Bunny',
    body: () => lines(
      'The prize corner smells like sugar and lawsuits. A bin of tickets waits under a sign that promised a golden something and delivered stickers. The stuffed animals have the expressions of people who have heard your PA announcement and chosen sides. On the cam, Tiggy waves from Parts and Service, miles away in spirit and about forty feet in fact.',
      'You can pocket a sticker, climb into the bin and let the night end as a beloved cryptid, call Tiggy and actually walk to him, or leave before a plush makes eye contact that counts as HR. Climbing in is a choice with a clock. The clock will hit six while you are among the bears. They do not tickle. They judge.',
    ),
    choices: [
      { id: 'take-ticket', label: 'Pocket a golden ticket sticker', hint: 'Mostly fake gold. Real pocket weight.', to: 'prize-corner', time: 10, power: 0, add: ['ticket'] },
      { id: 'climb-bin', label: 'Climb into the prize bin and stay', hint: 'Quits the shift among the toys. This does not pass the auditor.', to: 'ending-prize-locked', time: 0, setMinutes: 360, power: -1, force: true, flag: { binned: true } },
      { id: 'call-tiggy', label: 'Leave the toys and go to Tiggy', hint: 'He cannot come here. You can go there.', to: 'parts-service', time: 12, power: -3 },
      { id: 'leave-prize', label: 'Back to the hall, sticker or not', hint: 'Patrol is less fuzzy.', to: 'hall-patrol', time: 12, power: -1 },
    ],
  },
  'supply-closet': {
    title: 'Shelves of responsibility',
    location: 'Supply Closet',
    speaker: 'bhad',
    who: 'Bhad Bunny',
    body: () => lines(
      'The supply closet is a narrow chapel of things that fix other things. Feather duster, fuse, mop, glitter rag: the four gospels of a closer. It smells like lemon and a decision. You have the arms of one bunny. You do not have to take everything. You do have to admit that "later" is how shelves win.',
      'Tiggy’s feather is right here, smug, finally reachable because you have legs and a work ethic. The fuse looks deliciously illegal. The mop has seen nights. The glitter rag wants to meet Joey and ruin a washing machine. Pick one and keep moving. Hoarding is a second trip.',
    ),
    choices: [
      { id: 'take-feather', label: 'Take the feather duster', hint: 'Tiggy’s white whale. It is a duster.', to: 'closet-next', time: 10, power: 0, add: ['feather'] },
      { id: 'take-fuse', label: 'Take the spare fuse', hint: 'The breaker box on the east hall will purr.', to: 'closet-next', time: 10, power: 0, add: ['fuse'] },
      { id: 'take-mop', label: 'Take the night mop', hint: 'Dawn likes a prop.', to: 'closet-next', time: 10, power: 0, add: ['mop'] },
      { id: 'take-glitter', label: 'Take the glitter rag', hint: 'Joey will propose to it. You are warned.', to: 'closet-next', time: 10, power: 0, add: ['glitter'] },
    ],
  },
  'closet-next': {
    title: 'Arms full of plot',
    location: 'Supply Closet',
    speaker: 'bhad',
    who: 'Bhad Bunny',
    body: (s) => lines(
      'Your arms are full of responsibility and one of your knees is full of doubt. The closet door sticks, which is its personality. You hip-check it like a coworker you respect.',
      `Pockets so far: ${s.inventory.length ? s.inventory.join(', ') : 'still mostly theoretical'}. The party room is inventing a crisis, the fuse box is hungry, Tiggy is a delivery address that does not move, and Bubba is a kitchen. Choose a direction before the mop unionizes with the rag.`,
    ),
    choices: [
      { id: 'to-crisis', label: 'Carry this toward the party room', hint: 'Crises love an audience with props.', to: 'party-room-crisis', time: 15, power: -1 },
      { id: 'to-fuse-box', label: 'Visit the fuse box', hint: 'East hall. Bring a fuse or bring a stare.', to: 'fuse-box', time: 12, power: -1 },
      { id: 'to-deliver', label: 'Deliver something to Tiggy', hint: 'He stays on the base. You do the walking.', to: 'parts-delivery', time: 12, power: -1 },
      { id: 'back-kitchen', label: 'Show the kitchen what you stole', hint: 'Bubba respects inventory.', to: 'kitchen-threshold', time: 12, power: -1 },
    ],
  },
  'parts-delivery': {
    title: 'Last-mile tickle logistics',
    location: 'Parts & Service',
    speaker: 'tiggy',
    who: 'Ticklish Tiggy',
    body: (s) => lines(
      'Tiggy watches you arrive the way a mailbox watches a holiday. "You commuted," he says, awed. "I knew someone in this establishment had legs they were willing to use for good." The base does not inch forward to meet you. That would be fan fiction. He is not that kind of tiger.',
      s.inventory.includes('feather')
        ? 'The feather duster is in your hand and his claws are open like a very polite bear trap. Placing it there counts. He still will not be able to dust the ceiling. He will be able to win, once, against a shelf. He would like that more than a parade.'
        : 'You did not bring the feather. He is too polite to sigh and not polite enough to hide the almost-sigh. You can chat, step into range anyway, or go get the thing. Landmarks are patient. Shelves are not your friend.',
    ),
    choices: [
      {
        id: 'give-feather',
        label: 'Place the feather duster in his claws',
        hint: 'Only works if you actually brought it.',
        to: (s) => (s.inventory.includes('feather') ? 'tickle-treaty-talk' : 'tiggy-errand'),
        edges: ['tickle-treaty-talk', 'tiggy-errand'],
        time: 12,
        power: -1,
        remove: (s) => (s.inventory.includes('feather') ? ['feather'] : []),
        rel: (s) => (s.inventory.includes('feather') ? { tiggy: 2 } : {}),
        flag: (s) => (s.inventory.includes('feather') ? { featherGiven: true, tickled: true } : {}),
      },
      { id: 'chat-tiger', label: 'Chat without a delivery', hint: 'He is good company and bad at errands.', to: 'parts-service', time: 10, power: 0 },
      { id: 'step-deliver', label: 'Forget the parcel. Step in.', hint: 'Elbow boop. Treaty speedrun.', to: 'tiggy-step-in', time: 10, power: -1, flag: { tickled: true }, rel: { tiggy: 1 } },
      { id: 'leave-parts', label: 'Wave and get back to the hall', hint: 'He waves short. You wave long.', to: 'hall-patrol', time: 12, power: -1 },
    ],
  },
  'fuse-box': {
    title: 'East hall arithmetic',
    location: 'East Hall',
    speaker: 'bhad',
    who: 'Bhad Bunny',
    body: (s) => lines(
      'The fuse box is a gray conscience. It smells like warm dust and somebody else’s shortcut. The east hall neon buzzes in B flat, which Pete would prosecute and Joey would sample. You are the only closer on the clock, so the math is yours.',
      s.inventory.includes('fuse')
        ? 'The cheese fuse is in your pocket, perfumed and ready. Seating it gives the building its spine back. Staring at the empty math instead is how people meet the dark early.'
        : 'Your hands are fuseless. The box knows. You can go back to the closet, stare until the lights complain, step onto the dock, or retreat to the office and pretend this was a vibe check.',
    ),
    choices: [
      {
        id: 'install-fuse',
        label: 'Seat the fuse like a guest of honor',
        hint: 'If you have one, power jumps. If not, go find one.',
        to: (s) => (s.inventory.includes('fuse') ? 'hall-patrol' : 'supply-closet'),
        edges: ['hall-patrol', 'supply-closet'],
        time: 12,
        power: (s) => (s.inventory.includes('fuse') ? 30 : -4),
        remove: (s) => (s.inventory.includes('fuse') ? ['fuse'] : []),
        flag: (s) => (s.inventory.includes('fuse') ? { poweredUp: true } : { staredAtFuse: true }),
      },
      { id: 'stare-box', label: 'Stare at the breakers anyway', hint: 'A smaller, sadder camera marathon.', to: 'cam-marathon', time: 10, power: -5 },
      { id: 'out-to-dock', label: 'Forget voltage. Get dock air.', hint: 'The sign outside is wasting more than you are.', to: 'loading-dock', time: 12, power: -1 },
      { id: 'back-office', label: 'Retreat to the office hum', hint: 'Locks, breadsticks, regret.', to: 'office-hold', time: 12, power: -1 },
    ],
  },
  'hall-patrol': {
    title: 'West hall, four doors',
    location: 'West Hall',
    speaker: 'bhad',
    who: 'Bhad Bunny',
    body: (s) => lines(
      'The west hall is checkered, sticky in one philosophical spot, and lit like a secret. Your ears cast bunny shadows that look more employed than you feel. You walk it like you own the neon and the neon is behind on rent. Turn count is a diary. The clock only moves because you do.',
      `From here the kitchen smells like Bubba’s sincerity, the restroom sounds like Pete’s standards, Parts and Service is a stationary roar of charm, and the party room is ${s.flags.sawTypo || s.flags.dancedOnce ? 'already a crisis with a banner' : 'probably fine, which means it is not'}. Pick a door. Patrolling is the job. Arriving is the joke.`,
    ),
    choices: [
      { id: 'to-kitchen-hall', label: 'Kitchen door', hint: 'Bubba, beer, dough with opinions.', to: 'kitchen-threshold', time: 12, power: -1 },
      { id: 'to-restroom-hall', label: 'Restroom door', hint: 'Pete or the echo of Pete.', to: 'restroom-standoff', time: 12, power: -1 },
      { id: 'to-parts', label: 'Parts and Service', hint: 'Tiggy does not do house calls.', to: 'parts-service', time: 12, power: -1 },
      {
        id: 'to-party',
        label: 'Party room banner',
        hint: 'First visit is reconnaissance. After that, it is a show.',
        to: (s) => (s.flags.sawTypo || s.flags.dancedOnce || s.flags.typoFixed ? 'party-room-crisis' : 'party-room-empty'),
        edges: ['party-room-crisis', 'party-room-empty'],
        time: 12,
        power: -1,
      },
    ],
  },
  'party-room-empty': {
    title: 'Happy Brithday, apparently',
    location: 'Party Room',
    speaker: 'bhad',
    who: 'Bhad Bunny',
    onEnter(s) { s.flags.sawTypo = true; },
    body: () => lines(
      'The party room is between birthdays and bad ideas. A banner says HAPPY BRITHDAY, missing an H and also missing shame. Streamers hang like they are tired of being a metaphor. No one is here yet, which means you have a minute of power before Joey declares the typo a ballad and Pete declares it a crime.',
      'You can fix the letter like a stealth hero, leave the typo as jazz for Joey to discover, escape to the dock, or go back to the office and pretend you never learned to read. The banner rustles. It knows it is content.',
    ),
    choices: [
      { id: 'fix-typo', label: 'Fix the banner before they see it', hint: 'Pete would cry, but only on the inside, loudly.', to: 'hall-patrol', time: 15, power: -1, flag: { typoFixed: true } },
      { id: 'leave-for-jazz', label: 'Leave it. Let them find the jazz.', hint: 'This becomes the crisis. You will be present.', to: 'party-room-crisis', time: 12, power: -1 },
      { id: 'empty-dock', label: 'Skip the banner. Dock air.', hint: 'Typos cannot follow you outside. Probably.', to: 'loading-dock', time: 12, power: -1 },
      { id: 'empty-office', label: 'Retreat and lock the office', hint: 'The banner will still be wrong when you return.', to: 'office-hold', time: 12, power: -4 },
    ],
  },
  'party-room-crisis': {
    title: 'A crisis with a count-in',
    location: 'Party Room',
    speaker: 'joey',
    who: 'Joey Cha-Cha',
    onEnter: parkParty,
    body: () => lines(
      'The crisis arrives wearing a banner and two personalities. Joey Cha-Cha insists that nobody may touch HAPPY BRITHDAY until a dance break has honored the missing H. Chicken Pete rolls in square to the tile, lollipop gavel ready, bird feet tapping, headset already writing the typo up as a moral event. From the kitchen pass, Bubba Beer Bot yells that the pizza is fine and the letters are your problem.',
      'On the Parts and Service cam, Ticklish Tiggy waves a claw and misses the lens again. "I cannot attend," he announces, cheerful, "but I oppose the letter and support the dancer. Step closer to your own lives." All five of you are in this. The building is a group chat with feet, wheels, a base, and a beer.',
    ),
    choices: [
      { id: 'dance-crisis', label: 'Allow Joey’s crisis dance break', hint: 'The banner might fix itself out of shame.', to: 'dance-or-die', time: 30, power: -2, rel: { joey: 2 }, flag: { dancedOnce: true, crisisDance: true } },
      { id: 'hold-tribunal', label: 'Hold Pete’s tribunal for the letter H', hint: 'Due process, but make it a napkin.', to: 'typo-tribunal', time: 20, power: -1 },
      { id: 'flirt-room', label: 'Tell the whole room they are doing great', hint: 'A group flirt. Consequences in every direction.', to: 'mop-meeting', time: 15, power: -1, rel: { joey: 1, bubba: 1, pete: 1, tiggy: 1 }, flag: { flirtAll: true } },
      { id: 'crisis-dock', label: 'Sneak out to the dock mid-crisis', hint: 'Leaders sometimes touch grass. Or asphalt.', to: 'loading-dock', time: 12, power: -1 },
    ],
  },
  'dance-or-die': {
    title: 'We honor the missing H',
    location: 'Party Room',
    speaker: 'joey',
    who: 'Joey Cha-Cha',
    onEnter: parkParty,
    body: (s) => lines(
      'Joey counts you in. The banner, humiliated by choreography, gives up a spare H from behind a streamer. Pete is offended that dancing worked and also, secretly, that he is keeping time with his wheels and it is good time. Bubba appears in the doorway with the beer and does not dance, which is its own tribute. Tiggy, on the cam, conducts with both claws and hits neither of you.',
      s.flags.flirtJoey
        ? 'Joey’s hand is offered, not grabbed. A dip is available. So is diplomacy, a power-wasting replay, and a sudden need to visit a toilet that has opinions. You are allowed to want the dip. You are allowed to bow.'
        : 'Sparkles migrate. The crisis becomes a number with a bow at the end. You can turn it into a meeting, spend power rewatching it, or flee to the stall. The night is still a job after the eight-count.',
    ),
    choices: [
      { id: 'to-diplomacy', label: 'Bow, then call a staff meeting', hint: 'All five of you, even the one on the cam.', to: 'mop-meeting', time: 15, power: -1 },
      {
        id: 'dip-joey',
        label: 'Take the dip if he is offering',
        hint: 'If you have been flirting, this leans toward a date.',
        to: 'mop-meeting',
        time: 15,
        power: -1,
        rel: { joey: 1 },
        flag: (s) => (s.flags.flirtJoey ? { dipped: true, dateJoey: true } : { dipped: true }),
      },
      { id: 'watch-dance', label: 'Make the cams watch the replay', hint: 'Vanity is a power bill.', to: 'cam-marathon', time: 10, power: -10 },
      { id: 'dance-toilet', label: 'I need the toilet. Now.', hint: 'Even legends have plumbing.', to: 'toilet-stall', time: 12, power: -1 },
    ],
  },
  'typo-tribunal': {
    title: 'The people versus the letter H',
    location: 'Party Room',
    speaker: 'pete',
    who: 'Chicken Pete',
    onEnter: parkParty,
    body: () => lines(
      'Pete convenes a tribunal against a missing letter. Joey is counsel for the jazz. Bubba is in the doorway eating a breadstick he found, which is not evidence and also is. Tiggy attends by speaker, stationary, and objects to the word "stand" in "please stand." "I am installed," he says. "Continue."',
      'You can side with Pete and reprint the banner, side with Joey and call the typo a syncopation, compromise until everyone is annoyed equally, or bribe the bench with pizza. The bench is a man in sunglasses. He can be moved by correctness or by cheese. Not by mocking how he sits. Do not be that closer.',
    ),
    choices: [
      { id: 'side-pete', label: 'Side with Pete. Reprint it.', hint: 'He may offer you a union, or a lecture.', to: 'pete-union-pitch', time: 15, power: -1, rel: { pete: 2 }, flag: { sidedPete: true, typoFixed: true } },
      { id: 'side-joey', label: 'Side with Joey. The typo is jazz.', hint: 'Pete will remember this in all caps.', to: 'dance-or-die', time: 15, power: -1, rel: { joey: 2, pete: -1 }, flag: { sidedJoey: true, peteMad: true } },
      { id: 'compromise', label: 'Compromise: dance-spelling bee', hint: 'Nobody wins. Everybody stays.', to: 'mop-meeting', time: 15, power: -1, rel: { joey: 1, pete: 1 }, flag: { compromise: true } },
      {
        id: 'bribe-tribunal',
        label: 'Bribe the bench with a slice',
        hint: 'Cheese is a closing argument if you have it.',
        to: (s) => (s.inventory.includes('slice') ? 'pete-standards' : 'pete-rage'),
        edges: ['pete-standards', 'pete-rage'],
        time: 12,
        power: -1,
        remove: (s) => (s.inventory.includes('slice') ? ['slice'] : []),
        rel: (s) => ({ pete: s.inventory.includes('slice') ? 2 : -1 }),
        flag: (s) => (s.inventory.includes('slice') ? { toppingPeace: true } : { peteMad: true }),
      },
    ],
  },
  'mop-meeting': {
    title: 'All five, one sticky floor',
    location: 'Party Room',
    speaker: 'bhad',
    who: 'Bhad Bunny',
    onEnter: parkParty,
    body: () => lines(
      'You call the meeting to order with the lollipop. Joey Cha-Cha sits like a captain who might encore at any second. Chicken Pete has a pen and a glare and his chair parked where the sightline is fair. Bubba Beer Bot leans in the doorway, beer lowered in respect. On the cam, Ticklish Tiggy says, "Present, in the only way I am ever present."',
      'This is the shift’s crossroads. You can mop toward 6:00 AM like a professional menace, hear Bubba’s foam title again, sign something with Tiggy about elbows, or let Pete unionize correctness. The floor is sticky. The company is good. Nobody is getting a jumpscare. They are getting a choice.',
    ),
    choices: [
      { id: 'mop-heroes', label: 'We mop until six and go home heroes', hint: 'The long way to dawn. Bring patience.', to: 'last-hour', time: 20, power: -1 },
      { id: 'pitch-foam', label: 'Bubba, talk to me about Foam Manager', hint: 'He has a title and a walk-in.', to: 'bubba-pitch', time: 12, power: -1 },
      { id: 'pitch-treaty', label: 'Tiggy, let’s write the radius down', hint: 'He is listening from the only room he haunts.', to: 'tickle-treaty-talk', time: 12, power: -1 },
      { id: 'pitch-union', label: 'Pete, read us the union of correct things', hint: 'If you never helped him, this can backfire.', to: 'pete-union-pitch', time: 12, power: -1 },
    ],
  },
  'bubba-pitch': {
    title: 'Benefits: one beer, infinite foam',
    location: 'Kitchen',
    speaker: 'bubba',
    who: 'Bubba Beer Bot',
    body: (s) => lines(
      'Bubba has migrated as far as the kitchen pass, which is his idea of a commute. "Foam Manager," he repeats, tasting the words like a new sauce. "You would quit guarding doors and start guarding temperature. The beer stays with me. The title stays with you. The dough remains a witness."',
      (s.flags.coolerTrust || s.flags.flirtBubba || s.rel.bubba >= 3)
        ? 'He means it. You have been in the cooler or in the flirt or both, and he does not offer jobs to strangers. Accepting ends the night. Declining keeps the clock.'
        : 'He squints, kind. "Ask me again when you have watched a beer cool or said something brave in my direction. I do not promote mysteries." The cooler is right there.',
    ),
    choices: [
      {
        id: 'accept-foam',
        label: 'Accept if he is actually offering',
        hint: 'If you are still a stranger, he sends you to the cooler.',
        to: (s) => (s.flags.coolerTrust || s.flags.flirtBubba || s.rel.bubba >= 3 ? 'ending-foam-manager' : 'bubba-trust-cooler'),
        edges: ['ending-foam-manager', 'bubba-trust-cooler'],
        force: (s) => s.flags.coolerTrust || s.flags.flirtBubba || s.rel.bubba >= 3,
        time: 12,
        power: -1,
        flag: { foamBoss: true },
      },
      { id: 'decline-foam', label: 'Decline. I like doors.', hint: 'Back toward the long mop and the morning.', to: 'last-hour', time: 12, power: -1 },
      { id: 'revisit-cooler', label: 'Show me the cooler again', hint: 'Trust is a cold room.', to: 'bubba-trust-cooler', time: 12, power: -1, flag: { coolerTrust: true } },
      { id: 'back-to-meeting', label: 'Table it. Back to the meeting.', hint: 'The others are still a group chat.', to: 'mop-meeting', time: 10, power: 0 },
    ],
  },
  'pete-union-pitch': {
    title: 'Correct things, local chapter',
    location: 'Restrooms',
    speaker: 'pete',
    who: 'Chicken Pete',
    body: (s) => lines(
      'Pete has produced a one-page union from behind the headset like a magician who only knows one trick and it is compliance. "WE WILL BE CORRECT," he reads, "ABOUT SOAP, NAPKINS, BANNERS, AND THE WORD PIE." He looks at you. The look is a job offer wearing sunglasses.',
      (s.flags.peteMad && !s.flags.napkinFixed && !s.flags.soapFixed && !s.flags.toppingPeace)
        ? 'He has not been helped. He has been maddened. Signing now is how a napkin fires you. You can still fold something, go back, or flirt your way into a footnote before the gavel.'
        : 'If you have fixed even one small thing, or simply not declared war, he wants your name on the page. It ends the shift as a colleague of right angles. You may also flee back to the meeting.',
    ),
    choices: [
      {
        id: 'sign-union',
        label: 'Sign Pete’s union of correct things',
        hint: 'If you only ever made him angry, the napkin wins.',
        to: (s) => (s.flags.peteMad && !s.flags.napkinFixed && !s.flags.soapFixed && !s.flags.toppingPeace ? 'ending-fired-napkin' : 'ending-pete-union'),
        edges: ['ending-fired-napkin', 'ending-pete-union'],
        force: true,
        time: 12,
        power: -1,
      },
      { id: 'fold-test', label: 'Ask for a folding test first', hint: 'Back to the swan. Redemption is paper.', to: 'pete-napkin', time: 12, power: -1 },
      { id: 'back-meeting', label: 'Not tonight. Back to the group.', hint: 'The meeting still has other genres.', to: 'mop-meeting', time: 10, power: 0 },
      { id: 'flirt-clause', label: 'Ask for a charm footnote', hint: 'He will be loud, then precise.', to: 'pete-flirt', time: 12, power: -1, flag: { flirtPete: true }, rel: { pete: 1 } },
    ],
  },
  'last-hour': {
    title: 'The long mop',
    location: 'Dining Hall',
    speaker: 'bhad',
    who: 'Bhad Bunny',
    body: (s) => lines(
      s.minutes >= 240
        ? 'The neon has gone from party to witness protection. You are close to 5:00 AM, which is when Tatter Tot Tat sits her throne and asks for the laminated rules. Mopping does not skip her. It delivers you.'
        : 'The building is still in its opening argument. You can mop, invite someone to the curb, spend power on the board, or check the toilet. Six o’clock is behind an audit, not behind a mop alone.',
      'Joey’s eight-count, Pete’s soap angle, Bubba’s slice or fuse: those are proofs, not vibes. Tiggy stays on the base. You are Bhad Bunny, and the throne is not yours yet.',
    ),
    choices: [
      {
        id: 'long-mop',
        label: 'Mop the long way toward the audit',
        hint: 'Moves the clock toward 5:00 AM. Tatter Tot Tat takes the floor then. This does not skip her.',
        to: 'last-hour',
        edges: ['last-hour', 'tatter-arrival', 'out-back-pickup', 'ending-pickup-joey-jets', 'ending-pickup-snowy', 'ending-pickup-mr-bulge'],
        time: 45,
        power: -3,
      },
      { id: 'floor-board', label: 'Burn time on the floor board', hint: 'Costs power. The rooms are the same and nosy.', to: 'cam-marathon', time: 20, power: -12 },
      { id: 'invite-out', label: 'Invite someone to the parking lot', hint: 'Dates, picnics, or a solo closer mood.', to: 'date-plan', time: 15, power: -1 },
      { id: 'last-toilet', label: 'Check the toilet one last time', hint: 'It may accept a monarch or splash a sock.', to: 'toilet-finale', time: 15, power: -1 },
    ],
  },
  'date-plan': {
    title: 'Who gets the curb',
    location: 'Loading Dock',
    speaker: 'bhad',
    who: 'Bhad Bunny',
    body: () => lines(
      'The dock at the edge of morning is just asphalt with ambitions. You could invite Joey, if the flirting was real. You could invite Bubba, if the beer talk ever turned brave. You could invite everybody and call it a staff picnic, which is chaos with napkins Pete will immediately regulate. Or you could stay a solo closer, mysterious and slightly sticky.',
      'Nobody is owed a yes. If you never flirted, the invitation just becomes the flirt, late and clumsy and still allowed. The cone by the bumper is unbedazzled so far. Joey can fix that. He should not be encouraged, and he will be.',
    ),
    choices: [
      {
        id: 'ask-joey-out',
        label: 'Invite Joey Cha-Cha to the curb',
        hint: 'If you never flirted, he takes you back to the stage.',
        to: (s) => (s.flags.flirtJoey ? 'waiting-curb-joey' : 'joey-flirt'),
        edges: ['waiting-curb-joey', 'joey-flirt'],
        time: 12,
        power: -1,
        flag: (s) => (s.flags.flirtJoey ? { dateJoey: true } : { dateDenied: true }),
      },
      {
        id: 'ask-bubba-out',
        label: 'Invite Bubba Beer Bot to the curb',
        hint: 'If you never flirted, he walks you back to the kitchen.',
        to: (s) => (s.flags.flirtBubba ? 'waiting-curb-bubba' : 'bubba-flirt'),
        edges: ['waiting-curb-bubba', 'bubba-flirt'],
        time: 12,
        power: -1,
        flag: (s) => (s.flags.flirtBubba ? { dateBubba: true } : {}),
      },
      { id: 'stay-solo', label: 'Stay a solo closer', hint: 'Mysterious. Slightly damp. Still employed.', to: 'last-hour', time: 10, power: 0, flag: { soloCloser: true } },
      { id: 'staff-picnic', label: 'Invite all of them. Staff picnic.', hint: 'Dawn becomes a group photo with bad lighting.', to: 'last-hour', time: 15, power: -1, flag: { picnic: true } },
    ],
  },
  'waiting-curb-joey': {
    title: 'Cone chaperone',
    location: 'Loading Dock',
    speaker: 'joey',
    who: 'Joey Cha-Cha',
    onEnter(s) {
      s.flags.dateJoey = true;
      station(s, PEOPLE.joey, 'Loading Dock');
    },
    body: () => lines(
      'Joey walks you out in a trail of legal glitter. He bedazzles a traffic cone with a spare sequin and calls it a chaperone. "The cone has notes," he says. The cigarette, still somehow on the beat, is not offered to you. He is a date, not a bad influence with a lighter. The pizzeria sign hums. Morning is a rumor with a schedule.',
      'You can wait the clock down, go back inside with the date still on the books, kiss the cone because the bit demands it, or admire the hat until the hat gets smug. Six o’clock, if you reach it, is a pasodoble in a parking lot. He will bow. You can bow back or laugh. Both count.',
    ),
    choices: [
      {
        id: 'wait-joey',
        label: 'Wait with him until the real six',
        hint: 'A long wait. Around 5:00 AM the auditor interrupts the date.',
        to: 'waiting-curb-joey',
        edges: ['waiting-curb-joey', 'tatter-arrival', 'out-back-pickup', 'ending-pickup-joey-jets', 'ending-pickup-snowy', 'ending-pickup-mr-bulge'],
        time: 80,
        power: -1,
      },
      { id: 'back-inside', label: 'Go back in. The date can keep', hint: 'The flag stays. Morning still remembers.', to: 'last-hour', time: 10, power: 0 },
      { id: 'kiss-cone', label: 'Play along and salute the cone', hint: 'A secret. The cone is fine.', to: 'waiting-curb-joey', time: 10, power: 0, flag: { secretCone: true }, rel: { joey: 1 } },
      { id: 'admire-hat', label: 'Tell him the hat is doing its job', hint: 'He will sparkle harder. Science.', to: 'waiting-curb-joey', time: 10, power: 0, rel: { joey: 1 } },
    ],
  },
  'waiting-curb-bubba': {
    title: 'Paint, beer, and a line',
    location: 'Loading Dock',
    speaker: 'bubba',
    who: 'Bubba Beer Bot',
    onEnter(s) {
      s.flags.dateBubba = true;
      station(s, PEOPLE.bubba, 'Loading Dock');
    },
    body: () => lines(
      'Bubba Beer Bot stands on the dock like the night air asked for a bouncer and got a poet. The beer is almost done. He does not litter. He respects the parking line the way Pete respects grout, but quieter, and with more chest hair. "We can wait for six," he says. "Or we can go back to temperature. I am good at temperature."',
      'It is a date if you want the word. It is two adults and a cold drink if you do not. Tiggy remains inside on his base, unreachable and pleased you are choosing things on purpose. You can wait out the clock, toast the paint, head back, or talk about the title you did not take.',
    ),
    choices: [
      {
        id: 'wait-bubba',
        label: 'Wait with him until 6:00 AM',
        hint: 'The curb is the reward after the audit, not instead of it.',
        to: 'waiting-curb-bubba',
        edges: ['waiting-curb-bubba', 'tatter-arrival', 'out-back-pickup', 'ending-pickup-joey-jets', 'ending-pickup-snowy', 'ending-pickup-mr-bulge'],
        time: 80,
        power: -1,
      },
      { id: 'toast-line', label: 'Toast the parking line', hint: 'A secret. He takes paint seriously.', to: 'waiting-curb-bubba', time: 10, power: 0, flag: { curbToast: true }, rel: { bubba: 1 } },
      { id: 'back-temp', label: 'Go back to the kitchen temperature', hint: 'The date flag can survive a detour.', to: 'last-hour', time: 12, power: -1 },
      { id: 'talk-title', label: 'Ask if Foam Manager has office hours', hint: 'He will walk you toward the cooler.', to: 'bubba-trust-cooler', time: 12, power: -1 },
    ],
  },
  'loading-dock': {
    title: 'Dumpster with a doctorate',
    location: 'Loading Dock',
    speaker: 'bhad',
    who: 'Bhad Bunny',
    body: () => lines(
      'Outside, the night is ordinary and therefore luxurious. The dumpster has a doctorate in smells. A useless sign burns power into the parking lot like it is showing off. Your bunny ears do not care. Your power meter might. You can kill the sign, yell for Bubba, eat if you stole a slice, or go back in before the building invents a new typo.',
      'No one out here is hunting you. The comedy stayed inside, where the wages are. Still, the dock is part of the job: air, trash, and the knowledge that 6:00 AM will look like this, plus birds who are not Pete.',
    ),
    choices: [
      { id: 'kill-sign', label: 'Switch off the useless sign', hint: 'Once. The sign stays off. Flipping it again just spends power.', to: 'loading-dock', time: 10, power: (s) => (s.flags.savedPower ? -4 : 6), flag: { savedPower: true } },
      { id: 'yell-bubba', label: 'Yell for Bubba like he is a bellhop', hint: 'He will meet you in the kitchen, not as a bellhop.', to: 'kitchen-threshold', time: 12, power: -1 },
      {
        id: 'eat-slice',
        label: 'Eat a slice in the night air',
        hint: 'Heals a little if you have a slice. You spend it, so the auditor cannot be paid with it later.',
        to: 'loading-dock',
        time: 12,
        power: (s) => (s.inventory.includes('slice') ? 6 : -1),
        remove: (s) => (s.inventory.includes('slice') ? ['slice'] : []),
        flag: (s) => (s.inventory.includes('slice') ? { ateSlice: true } : { airBite: true }),
      },
      { id: 'dock-inside', label: 'Go back inside and patrol', hint: 'The west hall missed you. It will not say so.', to: 'hall-patrol', time: 12, power: -1 },
    ],
  },

  'tatter-arrival': {
    title: 'The throne clocks in',
    location: 'Dining Hall',
    speaker: 'tatter',
    who: 'Tatter Tot Tat',
    onEnter(state) {
      station(state, PEOPLE.tatter, 'Dining Hall');
    },
    body: (s) => lines(
      'The dining hall grows a throne. Tatter Tot Tat is in it, long dark hair over a draped brown dress, blue eyeshadow like dress code, smile already stamped approved. She did not walk in so much as the building made room. A clipboard rests on the carved arm. A paper cup of tater tots sits where a gavel would, and she taps it once. "I am the night auditor. The night is in arrears. You are Bhad Bunny, and I am not replacing you. I am grading you."',
      s.flags.readRules
        ? 'You can still see the laminate: flush once for yes, the tiger does not commute, the banner is missing an H. She will want those words, then one piece of proof. Slice, fuse, eight-count, or Pete’s soap angle. She looks delighted to be the obstacle. The delight is professional.'
        : 'She does not read the rules for free. "They were laminated," she says, cheerful as a fine. "Laminate is my love language. You may try, you may ask me to recite, or you may slip once toward the kitchen. A second slip is contempt of clipboard." The smile does not mean the quiz is optional.',
    ),
    choices: [
      { id: 'face-rules', label: 'Take the house-rules quiz', hint: 'The note listed three. She wants those, not a vibe.', to: 'tatter-rules', time: 10, power: -2, force: true },
      { id: 'ask-recite', label: 'Ask her to recite the rules', hint: 'Costs power. She loves reading aloud. This is not a wrong answer.', to: 'tatter-rules', time: 8, power: -8, force: true, flag: { rulesReadAloud: true } },
      { id: 'bluff-smile', label: 'Smile back and hope charm is a rule', hint: 'It is not. Costs power, and you still have to take the quiz.', to: 'tatter-rules', time: 8, power: -8, force: true, flag: { bluffedAudit: true } },
      { id: 'slip-kitchen', label: 'Slip once toward the kitchen', hint: 'One prep trip. Doing it twice fails the audit on purpose.', to: (s) => (s.flags.preppedOnce ? 'ending-audit-failed' : 'tatter-prep'), edges: ['tatter-prep', 'ending-audit-failed'], time: 8, power: -4, force: true },
    ],
  },
  'tatter-rules': {
    title: 'Three rules, no vibes',
    location: 'Dining Hall',
    speaker: 'tatter',
    who: 'Tatter Tot Tat',
    body: (s) => lines(
      'Tatter Tot Tat crosses her ankles on the throne and aims the smile at you like a stamp. "Three house rules. In order is nice. Accurate is required. I allow one wrong sheet. The second wrong sheet becomes your whole employment." A tot clicks against the clipboard. It is a sound effect, not a riddle about anyone’s body.',
      s.flags.rulesReadAloud || s.flags.auditStrike
        ? 'She recites, sweetly, because you asked or because you already missed: flush once for yes. The tiger does not commute. The banner is missing an H. "Pete’s chair is not the grievance. Joey’s jazz is not the statute. I wrote this down while eating nothing symbolic."'
        : 'She does not list them. If you read the note, the laminate is still in your head. If you listened to Tiggy, he does not commute. If you listened to Pete, the soap is the grievance and the chair is not. Pick the set that matches the building, not the loudest coworker.',
    ),
    choices: [
      {
        id: 'rules-right',
        label: 'Flush once for yes. The tiger does not commute. The banner is missing an H.',
        hint: 'This is the laminate. The other buttons are other people’s bad advice.',
        to: 'tatter-offering',
        time: 12,
        power: -2,
        force: true,
        flag: { rulesPassed: true },
      },
      {
        id: 'rules-jazz',
        label: 'The tiger should come to you. The typo is jazz. Flush if you feel like it.',
        hint: 'Joey energy. Not the statute. One miss is allowed.',
        to: (s) => (s.flags.auditStrike ? 'ending-audit-failed' : 'tatter-rules'),
        edges: ['tatter-rules', 'ending-audit-failed'],
        time: 10,
        power: -4,
        force: true,
        flag: { auditStrike: true },
      },
      {
        id: 'rules-chair',
        label: 'Pete is angry about the chair. The dough is management. Power is a rumor.',
        hint: 'This contradicts Pete and the power meter. One miss is allowed.',
        to: (s) => (s.flags.auditStrike ? 'ending-audit-failed' : 'tatter-rules'),
        edges: ['tatter-rules', 'ending-audit-failed'],
        time: 10,
        power: -4,
        force: true,
        flag: { auditStrike: true },
      },
      { id: 'rules-slow', label: 'Ask her to say the three rules slower', hint: 'Spends power. Does not spend your one mistake.', to: 'tatter-rules', time: 8, power: -6, force: true, flag: { rulesReadAloud: true } },
    ],
  },
  'tatter-offering': {
    title: 'Proof of work',
    location: 'Dining Hall',
    speaker: 'tatter',
    who: 'Tatter Tot Tat',
    body: (s) => lines(
      '"Rules are the mouth," Tatter Tot Tat says. "Proof is the hand." She wants one real thing you did tonight: the slice Bubba called leverage, the fuse from behind the cheese, the eight-count you actually danced with Joey, or Pete’s grievance named correctly because you fixed the soap or the napkin. Empty hands are a miss. She allows one empty miss. The tots do not vote.',
      s.flags.offeringMiss
        ? 'She already watched you present nothing. "Kitchen for a slice or a fuse. Stage if you danced. Restroom if you fixed his actual problem. I am not subtle. I am a throne with a clipboard."'
        : 'The labels say what works. If you prepared none of it, you may still slip to the kitchen once. A second slip, or a second empty offering, and she stamps the shift failed with obvious joy.',
    ),
    choices: [
      {
        id: 'present-slice',
        label: 'Pay the fine with the pizza slice',
        hint: 'Only if a slice is in your pocket. Saying "slice" is not a slice.',
        to: (s) => (s.inventory.includes('slice') ? auditVictory(s) : (s.flags.offeringMiss ? 'ending-audit-failed' : 'tatter-offering')),
        edges: AUDIT_WINS,
        time: 10,
        power: -2,
        force: true,
        remove: (s) => (s.inventory.includes('slice') ? ['slice'] : []),
        flag: (s) => (s.inventory.includes('slice') ? { tatterCleared: true, offeringSlice: true } : { offeringMiss: true }),
        setMinutes: (s) => (s.inventory.includes('slice') ? 360 : null),
      },
      {
        id: 'present-fuse',
        label: 'Show the cheese fuse, pocket or already seated',
        hint: 'Works if you are carrying it, or you already installed it in the box.',
        to: (s) => ((s.inventory.includes('fuse') || s.flags.poweredUp) ? auditVictory(s) : (s.flags.offeringMiss ? 'ending-audit-failed' : 'tatter-offering')),
        edges: AUDIT_WINS,
        time: 10,
        power: -2,
        force: true,
        remove: (s) => (s.inventory.includes('fuse') ? ['fuse'] : []),
        flag: (s) => ((s.inventory.includes('fuse') || s.flags.poweredUp) ? { tatterCleared: true, offeringFuse: true } : { offeringMiss: true }),
        setMinutes: (s) => ((s.inventory.includes('fuse') || s.flags.poweredUp) ? 360 : null),
      },
      {
        id: 'present-work',
        label: 'Show the eight-count, or Pete’s soap-and-napkin work',
        hint: 'Works if you danced with Joey, or you fixed Pete’s soap or napkin. Not the chair.',
        to: (s) => ((s.flags.dancedOnce || s.flags.soapFixed || s.flags.napkinFixed) ? auditVictory(s) : (s.flags.offeringMiss ? 'ending-audit-failed' : 'tatter-offering')),
        edges: AUDIT_WINS,
        time: 10,
        power: -2,
        force: true,
        flag: (s) => ((s.flags.dancedOnce || s.flags.soapFixed || s.flags.napkinFixed) ? { tatterCleared: true, offeringWork: true } : { offeringMiss: true }),
        setMinutes: (s) => ((s.flags.dancedOnce || s.flags.soapFixed || s.flags.napkinFixed) ? 360 : null),
      },
      {
        id: 'slip-for-proof',
        label: 'Slip to the kitchen for proof',
        hint: 'One trip. A second trip is how she fails you.',
        to: (s) => (s.flags.preppedOnce ? 'ending-audit-failed' : 'tatter-prep'),
        edges: ['tatter-prep', 'ending-audit-failed'],
        time: 8,
        power: -4,
        force: true,
      },
    ],
  },
  'tatter-prep': {
    title: 'One trip, then the throne',
    location: 'Kitchen',
    speaker: 'bubba',
    who: 'Bubba Beer Bot',
    body: () => lines(
      'Bubba Beer Bot meets you at the pass like a man who heard a throne scrape and decided to be useful. "She is not subtle," he says. "Slice is in my hand if you need leverage. Fuse is behind the cheese if the lights are your argument. I will not fight her. I will hand you the prop." Joey’s voice, from the stage, offers a fast eight-count through the pass if you still need the dance on the books.',
      'This is the one prep the auditor allowed. Take what you are missing and go back. Staying here to farm voltage will not work. The sign, the breadstick, and the sip already told you the building does not respawn favors.',
    ),
    choices: [
      { id: 'prep-slice', label: 'Take Bubba’s leverage slice', hint: 'Puts a slice in your pocket if you do not already have one.', to: 'tatter-offering', time: 12, power: -6, force: true, add: ['slice'], flag: { preppedOnce: true } },
      { id: 'prep-fuse', label: 'Pocket the cheese fuse', hint: 'If you already seated one, this is just the walk back.', to: 'tatter-offering', time: 12, power: -6, force: true, add: ['fuse'], flag: { preppedOnce: true } },
      { id: 'prep-count', label: 'Let Joey count eight through the pass', hint: 'Puts the dance on the books. Costs power.', to: 'tatter-offering', time: 12, power: -8, force: true, flag: { preppedOnce: true, dancedOnce: true } },
      { id: 'prep-back', label: 'Go back with whatever you already had', hint: 'Uses up your one trip.', to: 'tatter-offering', time: 8, power: -4, force: true, flag: { preppedOnce: true } },
    ],
  },

  'ending-foam-manager': {
    title: 'Foam Manager, benefits negotiable',
    location: 'Walk-in Cooler',
    speaker: 'bubba',
    who: 'Bubba Beer Bot',
    ending: true,
    epilogue: 'You leave security for a title Bubba invented between the olives and the doubt.',
    body: () => lines(
      'You accept. The walk-in hums like a cathedral that serves ranch. Bubba Beer Bot pins nothing to your white top, because pins are for people who trust fabric, and instead nods with his whole cyborg shoulder. "Foam Manager," he says. "You start whenever the beer is cold, which is always, which is the benefit."',
      'Security can find another bunny. The dough witnesses the promotion and does not object, which is as close as yeast gets to applause. You clink a slice against his can. Outside, the night continues without you, and for once that is not your problem. It is colder in here. It is also, somehow, a raise.',
    ),
    choices: [],
  },
  'ending-tickle-treaty': {
    title: 'The radius treaty',
    location: 'Parts & Service',
    speaker: 'tiggy',
    who: 'Ticklish Tiggy',
    ending: true,
    epilogue: 'You sign with a tiger who cannot commute, and an elbow goes down in history.',
    body: () => lines(
      'Tiggy signs with a claw. You sign with a lollipop smear, which he calls wax. The treaty says you will sometimes step into reach, and he will never pretend the base is a vehicle. "I remain a landmark," he says, glowing. "You remain a commuter. This is a romance of logistics, or a friendship. I am not greedy about the noun."',
      'He boops the elbow one more time so the night has a souvenir. The hat stays on. The bowtie stays blue. Parts and Service stays his whole country. You leave the room when you want, because the treaty is about distance chosen, not distance owed. Dawn can have the rest of the building. The radius is handled.',
    ),
    choices: [],
  },
  'ending-pete-union': {
    title: 'Union of correct things',
    location: 'Restrooms',
    speaker: 'pete',
    who: 'Chicken Pete',
    ending: true,
    epilogue: 'Pete yells you into a union of soap, napkins, and not saying pizza pie.',
    body: (s) => lines(
      'Pete stamps the page so hard the headset apologizes. "YOU ARE IN," he announces, which is a yell wearing a welcome mat. The union of correct things covers soap angle, napkin geometry, banner spelling, and a ban on the phrase pizza pie. It does not cover how anybody’s body works. He would write that ban twice.',
      s.flags.flirtPete
        ? 'A footnote, in smaller yelling, allows charm if the volume is correct. He does not look at you when he reads it. The sunglasses do a lot of work. You are employed, affiliated, and slightly feared by linens.  The morning crew will find the bylaws and assume a lawyer was here. A bunny was here. Close enough.'
        : 'You are employee of the forever, which is not a raise and is a vibe. He rolls back one exact foot so the grout can recover. "SHIFT COMPLETE," he says, and for Pete that is a hug. You clock the feeling and the actual clock. Both say you made it.',
    ),
    choices: [],
  },
  'ending-fired-napkin': {
    title: 'Fired by a napkin',
    location: 'Restrooms',
    speaker: 'pete',
    who: 'Chicken Pete',
    ending: true,
    epilogue: 'A paper swan ends your employment. The swan is not sorry.',
    body: () => lines(
      'Pete fires you with a sentence that has never been said in a kind universe. "THE NAPKIN HAS WON. YOU ARE RELEASED." He is not mocking anyone’s body. He is losing a fight with stationery and taking you with him. The sad origami swan looks, if anything, promoted. Your badge, which was never a badge, is the lollipop, and he does not confiscate it. He has limits. They are just about the wrong objects.',
      'You walk out before 6:00 AM with your ears on and your record spotless except for this. Joey will hear and call it a tragic ballet. Bubba will save you a slice you cannot clock in to eat. Tiggy will wave at the door cam and miss. The napkin remains, geometrically wrong, spiritually employed. You will tell this story forever, and you will be the hero. Pete would like a rebuttal. He may file it.',
    ),
    choices: [],
  },
  'ending-toilet-throne': {
    title: 'Throne of the tuba toilet',
    location: 'Restrooms',
    speaker: 'bhad',
    who: 'Bhad Bunny',
    ending: true,
    epilogue: 'You fix the haunted flush and leave as a legend the morning crew will deny.',
    body: () => lines(
      'The plunger seats. The tuba note resolves into a polite gurgle, which is the toilet’s way of retiring. You do not sit on anything unwise. You stand, lollipop raised, and accept a knighthood from a fixture. Somewhere Pete hears a correct silence and, against his will, respects you. That is the real crown.',
      'By the time the clock gives up and admits morning, the restroom is boring. Boring is the highest prize in plumbing. You write "fixed" on a paper towel in letters large enough to survive Pete, and you clock out as the closer who talked to a bowl and won. Crude work. Clean ending. Wash your hands, which you do, because you are not a monster. You are a monarch of maintenance.',
    ),
    choices: [],
  },
  'ending-dough': {
    title: 'You joined the dough',
    location: 'Walk-in Cooler',
    speaker: 'bubba',
    who: 'The dough, with Bubba',
    ending: true,
    epilogue: 'You side with the yeast. Security loses a bunny. The tray gains a shop steward.',
    body: () => lines(
      'You tell the dough yes. Bubba puts a hand over his heart, and the hand whirs. "I knew you had rising action in you," he says, and then apologizes for the pun with his whole soul. The tray does not actually gain a human member. You are still Bhad Bunny, ears and all. You are also, ceremonially, shop steward of toppings, opposed to pineapple, ambivalent about olives, fiercely pro-heat.',
      'The shift ends in the cold on purpose. Outside, cameras keep their gossip. You leave a note for the morning crew: the dough has representation, do not cross it, and flush once for yes. It is not a horror ending. It is a labor ending with better seasoning. You clock out powdered in flour that was not there a minute ago. The flour denies everything.',
    ),
    choices: [],
  },
  'ending-blackout-polka': {
    title: 'Blackout polka',
    location: 'Office',
    speaker: 'joey',
    who: 'Joey Cha-Cha',
    ending: true,
    epilogue: 'The lights die and Joey turns the blackout into a dance with a flashlight nobody has.',
    body: () => lines(
      'The power gives up mid-sparkle. Joey Cha-Cha treats the dark as a lighting cue he ordered. "Polka," he announces, which is wrong and perfect. You cannot see the captain hat. You can hear the sequins. He offers a hand and narrates the steps so a bow-out is still easy: "Left, right, or we stand and gossip." You pick motion. The building becomes a ballroom that failed an electric bill.',
      'Pete yells that blackouts are not on the laminate. Bubba lights a path with the reflective logo of responsibility and also a can. Tiggy, unseen, says he is waving. You believe him. You dance the outage down to a giggle and leave through a door you find with your shins. The shift does not reach a heroic 6:00 AM. It reaches a story. Joey bows to the dark. The dark, rudely, does not bow back.',
    ),
    choices: [],
  },
  'ending-blackout-keg': {
    title: 'Lights out, beer in',
    location: 'Kitchen',
    speaker: 'bubba',
    who: 'Bubba Beer Bot',
    ending: true,
    epilogue: 'The breaker dies. Bubba hosts the dark like it is a private table.',
    body: () => lines(
      'The lights quit while Bubba still has a cold can and a plan. "Sit," he says, and the kitchen floor is not a romantic venue until he makes it one by not making a big deal. You split the dark. He does not split the beer unless you ask. The walk-in ticks on, traitorously still powered, because walk-ins have secret lives. He lets it be. Some miracles are refrigeration.',
      'You talk about nothing important: cheese, knees, the way neon flatters a bad decision. When a dim emergency strip finally remembers its job, you are both fine, un-haunted, and late. The clock never had to be scary. You just spent the budget on staring and then spent the rest on a person. He walks you to the office so you can pretend to clock the truth. The truth is you clocked a feeling.',
    ),
    choices: [],
  },
  'ending-blackout-huddle': {
    title: 'Group huddle in the dark',
    location: 'Dining Hall',
    speaker: 'bhad',
    who: 'Bhad Bunny',
    ending: true,
    epilogue: 'Everybody finds everybody by voice. Tiggy supervises from the only room he has.',
    body: () => lines(
      'The power exits like a coworker who did not give notice. You are not anyone’s favorite yet, so the dark is a group project. Joey counts. Pete demands a headcount and then provides it himself, loudly, so nobody has to guess where his wheels are. Bubba knocks once on the doorframe, a courtesy. Tiggy, over the dying speaker, says, "I am where I always am. Do not rescue me. Rescue the chips."',
      'You huddle in the dining hall until the emergency strip coughs up a beige morning. Nobody tickles anyone who did not step in. Nobody makes the chair a joke. The joke is that five adults hid from a light switch and called it a shift. You laugh anyway. Laughing is the clock-out. The real clock can catch up alone.',
    ),
    choices: [],
  },
  'out-back-pickup': {
    title: 'Out back, who is it',
    location: 'Loading Dock',
    speaker: 'bhad',
    who: 'Bhad Bunny',
    body: (s) => lines(
      'Tatter Tot Tat’s stamp missed you. 6:00 AM is a rumor the dumpster already believed. You, Bhad Bunny, tip the bunny ears, tuck the lollipop, and step out back like the night owes you a ride. The loading dock smells like victory and old pizza boxes. Three headlights argue in the alley. None of them belong to the throne. The throne is inside, filing feelings.',
      s.flags.picnic || s.flags.dateJoey || s.flags.dateBubba
        ? 'You had plans with the building. The building can wait. A girl who beat the auditor gets to choose her pickup like a sitcom credits roll. Joey Jets honks once, musically. Snowy Horz Kok idles like a snowdrift with a license. Mr. Bulge leans on a horn that should not be that confident. Pick one. Replay is forever. Regret is optional.'
        : 'Three guys. Zero photos. Maximum unseriousness. Joey Jets, Snowy Horz Kok, and Mr. Bulge are parked like bad decisions with good timing. You are playful, a little flirty, and extremely off the clock. The morning crew will ask questions. You will answer with a wink and a story that sounds illegal but is mostly comedy.',
    ),
    choices: [
      { id: 'pick-joey-jets', label: 'Wave over Joey Jets', hint: 'He brought a playlist and a questionable car. Text-only ending. Replay anytime.', to: 'ending-pickup-joey-jets', time: 0, power: 0, force: true, flag: { pickedJoeyJets: true } },
      { id: 'pick-snowy', label: 'Flag down Snowy Horz Kok', hint: 'Cold car, warm nonsense. Text-only ending. Replay anytime.', to: 'ending-pickup-snowy', time: 0, power: 0, force: true, flag: { pickedSnowy: true } },
      { id: 'pick-bulge', label: 'Nod at Mr. Bulge', hint: 'The name does the joke for you. Text-only ending. Replay anytime.', to: 'ending-pickup-mr-bulge', time: 0, power: 0, force: true, flag: { pickedMrBulge: true } },
    ],
  },
  'ending-pickup-joey-jets': {
    title: 'Joey Jets, curb service',
    location: 'Loading Dock',
    speaker: 'bhad',
    who: 'Bhad Bunny',
    ending: true,
    epilogue: 'You beat the auditor, then Joey Jets scooped you out back like a neon Uber with worse insurance.',
    body: () => lines(
      'Joey Jets rolls up in something that used to be a car and is now a rumor with cup holders. He pops the door with a flourish that almost becomes a dance and then wisely does not. "Bunny," he says, like your name is a VIP list. You hop in, ears first, audit still warm on your shoulders. He peels out just slow enough that the dumpster can watch respectfully.',
      'On the way he narrates traffic like a sports broadcast nobody requested. You laugh, a little flirty, mostly free. Tatter Tot Tat does not get a plus-one. The shift is stamped PASSED. The ride is stamped RIDICULOUS. Dawn loses. Joey Jets wins the alley. You win the night. Start a new shift whenever the ears itch again.',
    ),
    choices: [],
  },
  'ending-pickup-snowy': {
    title: 'Snowy Horz Kok, frostbitten chauffeur',
    location: 'Loading Dock',
    speaker: 'bhad',
    who: 'Bhad Bunny',
    ending: true,
    epilogue: 'Snowy Horz Kok picked you up out back. The heater worked. The nickname did overtime.',
    body: () => lines(
      'Snowy Horz Kok’s ride looks refrigerated on purpose. He rolls down the window and the alley gets colder, which somehow feels like a compliment. "Heard you survived the tots," he says, deadpan as a snowman with a license. You slide in, bunny ears brushing the roof, lollipop clicking against your teeth like a victory metronome.',
      'He drives like winter: careful, dramatic, slightly slippery on jokes. You tease him about the name. He pretends the name is a weather system. By the first red light you are both laughing at nothing and everything. The pizzeria shrinks in the mirror. The auditor stays on her throne. You, Bhad Bunny, leave with frost on the window and a story the morning crew will refuse to believe. Replay is allowed. Snow days are optional.',
    ),
    choices: [],
  },
  'ending-pickup-mr-bulge': {
    title: 'Mr. Bulge, name first',
    location: 'Loading Dock',
    speaker: 'bhad',
    who: 'Bhad Bunny',
    ending: true,
    epilogue: 'Mr. Bulge picked you up out back. The joke arrived before the car did.',
    body: () => lines(
      'Mr. Bulge arrives like a punchline that paid for parking. The headlights blink once, apologetic and proud. You do not ask about the name. The name asked about itself years ago and never recovered. "Need a lift, closer?" he offers, and you, playful on purpose, say the night already got lifted by an auditor with a clipboard.',
      'You climb in anyway. The seat is normal. The nickname is not. He keeps both hands on the wheel and both eyebrows on the joke, which is the correct comedy posture. You ride away from the dock with the ears still on and the shift officially over. Tatter Tot Tat can keep the tots. You keep the win, the wink, and a chauffeur whose business card is just the word Bulge in a brave font. Hit replay when you want the other two guys.',
    ),
    choices: [],
  },
  'ending-prize-locked': {
    title: 'Beloved by the prize bin',
    location: 'Prize Corner',
    speaker: 'bhad',
    who: 'Bhad Bunny',
    ending: true,
    epilogue: 'You spend the night in the prize bin. The toys are poor coworkers and excellent alibis.',
    body: () => lines(
      'You climb into the prize bin and the bin accepts you with a plastic sigh. Tickets stick to your knees. A bear with a dead-eyed smile becomes your supervisor. Time does a weird courtesy and leaps toward morning because you asked it to, which is the opposite of a scare and the same as a nap. Joey finds you and refuses to rescue you until he has choreographed the extraction. You decline the extraction.',
      'Pete writes you up for improper prize posture and then, ashamed of his own fondness, adds a commendation for commitment. Bubba lowers a slice in a basket like you are a storybook. Tiggy says, over the cam, that he respects a person who chooses a container. At 6:00 AM you are still in the bin, fully employed in spirit, slightly less employed in the handbook. The toys know what you did. They are not telling. They are toys.',
    ),
    choices: [],
  },
  'ending-audit-failed': {
    title: 'Stamped in arrears',
    location: 'Dining Hall',
    speaker: 'tatter',
    who: 'Tatter Tot Tat',
    ending: true,
    epilogue: 'Tatter Tot Tat fails the shift. The throne stays. Your closer badge does not.',
    body: () => lines(
      'Tatter Tot Tat stamps the page with a sound like a gavel that went to charm school. "FAILED," she says, and the smile is the worst part because it is sincere. "You guessed. I published the rules on a laminate and in the mouths of your coworkers. The tiger does not commute. The soap is not the chair. A slice you do not hold is not a fine." She does not insult you. She invoices you.',
      'The throne does not chase you to the parking lot. It does not have to. The night ends before 6:00 AM can pretend you survived it. Joey will call this a tragic ballet. Bubba will hold a slice you needed earlier. Pete will write that the audit was correct and also upsetting. Tiggy will wave at the door cam and miss. You, Bhad Bunny, keep the ears. You do not keep the shift. The tots remain a fine, which is to say potato, which is to say not a comment on anybody in the room.',
    ),
    choices: [],
  },
};

for (const [id, node] of Object.entries(NODES)) node.id = id;
