/**
 * The rotation: 24 stretches, one per day, no repeats until all 24 are used.
 *
 * Weighted toward legs and hips, because that chain takes the load twice over —
 * once from sitting at a desk all day, again from long hours on the bike.
 *
 * seconds  hold length for a single hold
 * perSide  true when the stretch is done left, then right (so the timer runs twice)
 * photo    optional photograph shown in place of the drawing in figures.js:
 *           { src, aspect } — the card takes the photo's own shape rather than
 *           cropping it, because these poses are not all the same shape
 */
const STRETCHES = [
  // ---------------------------------------------------------------- legs & hips
  {
    id: 'hip-flexor-lunge',
    name: 'Kneeling hip flexor lunge',
    area: 'Hips',
    target: 'Hip flexors, psoas, front of the hip',
    photo: { src: 'photos/hip-flexor-lunge.jpg', aspect: '2 / 3' },
    seconds: 45,
    perSide: true,
    setup: 'Kneel on one knee with the other foot flat in front, that knee stacked over the ankle. Pad the down knee if the floor is hard.',
    steps: [
      'Tuck your pelvis under — point your belt buckle up toward your chin.',
      'Keeping that tuck, ease your hips forward until the front of the kneeling hip pulls.',
      'Stand tall through the chest, ribs down. Do not arch your lower back.'
    ],
    note: 'The highest-value one on this list for you. Hips sit folded all day at the desk and fold again on the bike; this is the muscle that quietly takes the power out of your pedal stroke.'
  },
  {
    id: 'couch-stretch',
    name: 'Couch stretch',
    area: 'Hips',
    target: 'Quadriceps and hip flexors, deep',
    seconds: 45,
    perSide: true,
    setup: 'Kneel facing away from a wall or sofa. Slide one shin up the wall behind you, foot pointing at the ceiling. Other foot flat in front.',
    steps: [
      'Walk the front foot out until you can bring your torso upright.',
      'Squeeze the glute on the stretching side and tuck the pelvis under.',
      'Back off until it is a strong stretch, not a sharp one.'
    ],
    note: 'The deep version of the lunge. It is meant to be uncomfortable — start further from the wall than you think you need.'
  },
  {
    id: 'standing-quad',
    name: 'Standing quad stretch',
    area: 'Legs',
    target: 'Quadriceps, front of the thigh',
    seconds: 30,
    perSide: true,
    setup: 'Stand tall with a wall or chair under one hand for balance.',
    steps: [
      'Bend one knee and take that ankle behind you.',
      'Draw the knee down and back so it sits under your hip, not out in front.',
      'Tuck the pelvis under and stand tall — that is where the stretch appears.'
    ],
    note: 'Quads do most of the work over 300 km. Two minutes of this a week beats an hour of it once.'
  },
  {
    id: 'standing-hamstring',
    name: 'Standing hamstring hinge',
    area: 'Legs',
    target: 'Hamstrings, back of the thigh',
    seconds: 40,
    perSide: true,
    setup: 'Put one heel on a low step or chair, leg straight, toes pointing up.',
    steps: [
      'Keep your back flat and your hips square to the front.',
      'Hinge forward from the hips — chest toward the toes, not spine curling.',
      'Stop as soon as your lower back wants to round.'
    ],
    note: 'Hinge from the hip, not the waist. A rounded back feels like a bigger stretch while giving the hamstring less of one.'
  },
  {
    id: 'supine-hamstring',
    name: 'Lying hamstring stretch',
    area: 'Legs',
    target: 'Hamstrings',
    seconds: 45,
    perSide: true,
    setup: 'Lie on your back. Loop a towel or belt over the arch of one foot. Other leg bent, foot on the floor.',
    steps: [
      'Raise the looped leg with the knee softly straight.',
      'Pull gently on the towel until you feel the back of the thigh.',
      'Keep your head, shoulders and the opposite hip on the floor.'
    ],
    note: 'The kinder version of the hamstring stretch — the floor holds your back flat for you, so you cannot cheat it.'
  },
  {
    id: 'figure-four',
    name: 'Figure-4 glute stretch',
    area: 'Hips',
    target: 'Glutes and piriformis',
    seconds: 40,
    perSide: true,
    setup: 'Lie on your back, both knees bent, feet flat.',
    steps: [
      'Cross one ankle over the opposite thigh, just above the knee.',
      'Reach through the gap and pull the supporting thigh toward your chest.',
      'Let the crossed knee fall away from you. Keep your head down.'
    ],
    note: 'Deep glute tightness is what turns into that dull ache in one side of the backside on a long ride.'
  },
  {
    id: 'standing-calf',
    name: 'Wall calf stretch',
    area: 'Legs',
    target: 'Gastrocnemius, upper calf',
    seconds: 30,
    perSide: true,
    setup: 'Hands on a wall, one foot back in a split stance, back leg straight.',
    steps: [
      'Point the back foot straight ahead and keep that heel pinned down.',
      'Bend the front knee and lean into the wall.',
      'Straight back knee — that is what puts it in the upper calf.'
    ],
    note: 'Calves take every pedal stroke. Tight ones pull on the Achilles and quietly stiffen the ankle.'
  },
  {
    id: 'soleus',
    name: 'Bent-knee soleus stretch',
    area: 'Legs',
    target: 'Soleus, lower calf near the Achilles',
    seconds: 30,
    perSide: true,
    setup: 'Same wall split stance as the calf stretch, but stand a little closer.',
    steps: [
      'Keep the back heel down and bend the back knee toward the floor.',
      'Feel it drop lower — down by the ankle rather than mid-calf.',
      'Small movement. It should feel deep, not long.'
    ],
    note: 'The calf muscle nobody stretches. It sits under the big one and is the one that matters for ankle range on the bike.'
  },
  {
    id: 'tfl-lean',
    name: 'Standing IT band lean',
    area: 'Hips',
    target: 'TFL and iliotibial band, outer thigh',
    seconds: 30,
    perSide: true,
    setup: 'Stand side-on to a wall, hand on it for balance.',
    steps: [
      'Cross the outside leg behind the one nearest the wall.',
      'Push the near hip toward the wall and lean your torso away.',
      'You should feel a long line down the outside of the near thigh.'
    ],
    note: 'The classic cyclist complaint. A tight IT band is what starts nagging at the outside of the knee somewhere past 100 km.'
  },
  {
    id: 'adductor-butterfly',
    name: 'Seated butterfly',
    area: 'Hips',
    target: 'Adductors, inner thigh and groin',
    photo: { src: 'photos/adductor-butterfly.jpg', aspect: '3 / 2' },
    seconds: 45,
    perSide: false,
    setup: 'Sit on the floor, soles of the feet together, heels drawn in toward you.',
    steps: [
      'Sit up tall on your sit bones rather than slumping back.',
      'Let the knees fall open under their own weight.',
      'To go deeper, hinge forward from the hips with a flat back.'
    ],
    note: 'Inner thighs get almost no range on a bike — the legs only ever travel in one plane. This gives them the other one.'
  },
  {
    id: 'knee-to-wall',
    name: 'Knee-to-wall ankle stretch',
    area: 'Legs',
    target: 'Ankle dorsiflexion, front of the ankle',
    seconds: 30,
    perSide: true,
    setup: 'Stand facing a wall with one foot a hand-span back from it.',
    steps: [
      'Keeping the heel flat on the floor, drive that knee forward to touch the wall.',
      'If it touches easily, slide the foot back and try again.',
      'Hold at the point where the heel just wants to lift.'
    ],
    note: 'Ankle range is the joint everyone forgets. Losing it changes how your foot loads the pedal all the way up the chain.'
  },
  {
    id: 'wide-fold',
    name: 'Wide-legged forward fold',
    area: 'Legs',
    target: 'Hamstrings, adductors and lower back',
    seconds: 45,
    perSide: false,
    setup: 'Stand with your feet wide, toes pointing forward, legs straight but not locked.',
    steps: [
      'Hinge forward from the hips with a long back.',
      'Let your head hang and your hands rest on the floor, a chair or your shins.',
      'Breathe out and let gravity do the work — do not pull.'
    ],
    note: 'Three areas at once for a day when you want one stretch to cover a lot of ground.'
  },

  // -------------------------------------------------------------- back & torso
  {
    id: 'cat-cow',
    name: 'Cat–cow',
    area: 'Back',
    target: 'The whole spine, segment by segment',
    seconds: 45,
    perSide: false,
    setup: 'On hands and knees, hands under shoulders, knees under hips.',
    steps: [
      'Breathe in and drop your belly, lifting your chest and tailbone.',
      'Breathe out and press the floor away, rounding your back up.',
      'Move slowly with the breath rather than counting reps.'
    ],
    note: 'Not a hold — keep moving for the whole timer. The best single thing you can do for a spine that spent eight hours in one shape.'
  },
  {
    id: 'thoracic-chair',
    name: 'Thoracic extension over a chair',
    area: 'Back',
    target: 'Upper back, thoracic spine',
    seconds: 45,
    perSide: false,
    setup: 'Sit in a chair with a firm back edge that hits around your shoulder blades.',
    steps: [
      'Lace your hands behind your head and support its weight.',
      'Breathe out and drape your upper back backward over the chair edge.',
      'Bend where the chair meets you — keep your lower back and ribs still.'
    ],
    note: 'The direct antidote to both of your positions: hunched at a keyboard, and hunched over the bars.'
  },
  {
    id: 'spinal-twist',
    name: 'Lying spinal twist',
    area: 'Back',
    target: 'Spine, obliques and outer hip',
    photo: { src: 'photos/spinal-twist.jpg', aspect: '2 / 3' },
    seconds: 40,
    perSide: true,
    setup: 'Lie on your back with your arms out wide in a T.',
    steps: [
      'Draw one knee up and let it fall across your body toward the floor.',
      'Keep both shoulder blades down — that is the whole point of the stretch.',
      'Turn your head the other way and let the breath unwind it.'
    ],
    note: 'Chase the shoulder staying down rather than the knee reaching the floor.'
  },
  {
    id: 'childs-pose-side',
    name: "Child's pose with a side reach",
    area: 'Back',
    target: 'Lats, side of the torso and lower back',
    seconds: 40,
    perSide: true,
    setup: 'Kneel and sit back onto your heels, then walk your hands forward along the floor.',
    steps: [
      'Walk both hands over to one side until you feel the opposite ribs open.',
      'Keep your hips settled back on your heels.',
      'Press the palm down and breathe into the stretched side.'
    ],
    note: 'The lats connect your arms to your lower back. Tight ones are part of why long rides end with a sore lower back.'
  },
  {
    id: 'knees-to-chest',
    name: 'Knees to chest',
    area: 'Back',
    target: 'Lower back and glutes',
    photo: { src: 'photos/knees-to-chest.jpg', aspect: '3 / 2' },
    seconds: 45,
    perSide: false,
    setup: 'Lie flat on your back.',
    steps: [
      'Draw both knees in and wrap your arms around your shins.',
      'Let your lower back flatten and spread into the floor.',
      'Optional: rock gently side to side to massage it out.'
    ],
    note: 'The easiest one here. Good for a day when the whole idea of stretching feels like too much.'
  },
  {
    id: 'standing-extension',
    name: 'Standing back extension',
    area: 'Back',
    target: 'Lower back and abdominals',
    seconds: 30,
    perSide: false,
    setup: 'Stand with your feet hip-width apart, palms on your lower back, fingers pointing down.',
    steps: [
      'Squeeze your glutes and gently lean back over your hands.',
      'Look forward and up, not straight up at the ceiling.',
      'Go only as far as is comfortable and come out slowly.'
    ],
    note: 'Takes ten seconds and needs no floor — the one to reach for in the middle of a work day.'
  },

  // --------------------------------------------------------- neck, chest & arms
  {
    id: 'doorway-pec',
    name: 'Doorway chest stretch',
    area: 'Chest',
    target: 'Pectorals and the front of the shoulders',
    seconds: 40,
    perSide: false,
    setup: 'Stand in a doorway. Forearms on the frame, elbows at about shoulder height.',
    steps: [
      'Step through with one foot until the chest opens.',
      'Keep your ribs down and your chin gently tucked.',
      'Lead with the chest, not the head.'
    ],
    note: 'A closed-up chest is what pulls the shoulders forward and rounds the upper back. Opening it does more for posture than any amount of sitting up straight.'
  },
  {
    id: 'upper-trap',
    name: 'Upper trap side bend',
    area: 'Neck',
    target: 'Upper trapezius, side of the neck',
    seconds: 30,
    perSide: true,
    setup: 'Sit or stand tall. Let one arm hang heavy, or hold the edge of the chair.',
    steps: [
      'Tip your ear toward the opposite shoulder.',
      'Rest that same hand on your head for a little extra weight — do not pull.',
      'Keep the hanging shoulder pressed down and away.'
    ],
    note: 'This is the muscle that turns into that band of tension across the top of the shoulders by Thursday afternoon.'
  },
  {
    id: 'levator-scap',
    name: 'Levator scapulae stretch',
    area: 'Neck',
    target: 'Levator scapulae, back corner of the neck',
    seconds: 30,
    perSide: true,
    setup: 'Sit tall and hold the seat of the chair with one hand to anchor that shoulder.',
    steps: [
      'Turn your head about 45 degrees away from the anchored side.',
      'Look down into your armpit, letting your chin drop toward your chest.',
      'Add light pressure with your free hand if you want more.'
    ],
    note: 'Different muscle from the last one, and it needs the turn to reach it. This is the one behind a stiff neck after hours at a screen.'
  },
  {
    id: 'overhead-lat',
    name: 'Overhead lat reach',
    area: 'Chest',
    target: 'Lats and the side of the torso',
    seconds: 40,
    perSide: true,
    setup: 'Stand an arm-length from a doorframe or worktop.',
    steps: [
      'Reach one hand up high onto the frame, thumb pointing back.',
      'Sit your hips back and away, letting your chest drop toward the floor.',
      'Feel a long line from the armpit down to the hip.'
    ],
    note: 'Opens up the reach to the handlebars and undoes some of the keyboard hunch at the same time.'
  },
  {
    id: 'wrist-flexor-extensor',
    name: 'Wrist flexors and extensors',
    area: 'Arms',
    target: 'Forearms, wrists',
    seconds: 30,
    perSide: true,
    setup: 'Extend one arm straight out in front of you, elbow locked.',
    steps: [
      'Palm down, fingers pointing at the floor — gently pull the hand toward you.',
      'Halfway through, flip to palm up with the fingers pointing down and pull again.',
      'Keep the elbow straight for both halves.'
    ],
    note: 'Typing all day and gripping the bars all weekend load the same forearms. This is also what keeps the hand numbness on long rides at bay.'
  },
  {
    id: 'chin-tuck',
    name: 'Chin tuck and shoulder squeeze',
    area: 'Neck',
    target: 'Deep neck flexors and the mid back',
    seconds: 30,
    perSide: false,
    setup: 'Sit or stand tall, looking straight ahead.',
    steps: [
      'Draw your chin straight back, as if making a double chin. Do not tip your head.',
      'At the same time, pull your shoulder blades down and together.',
      'Hold five seconds, release, repeat for the whole timer.'
    ],
    note: 'The reset for a head that has been drifting forward toward a monitor since morning. Nobody can see you doing it.'
  }
];

if (typeof module !== 'undefined') module.exports = { STRETCHES };
