/**
 * The three stretches. One is picked at random each time the app opens.
 *
 * Three rather than twenty-four because a short list is one you actually learn:
 * the form stops being something you read off the screen and becomes something
 * you know. Between them they cover the chain that takes the load from a day at
 * the desk and an evening on the bike — the front of the hip, the inner thigh,
 * and the spine.
 *
 * seconds  hold length for a single hold
 * perSide  true when the stretch is done left, then right (so the timer runs twice)
 * photo    the photograph of the pose: { src, aspect }. The card takes the
 *          photo's own shape rather than cropping it, because these poses are
 *          not all the same shape.
 */
const STRETCHES = [
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
    id: 'adductor-butterfly',
    name: 'Seated butterfly',
    area: 'Hips',
    target: 'Adductors, inner thigh and groin',
    photo: { src: 'photos/adductor-butterfly.jpg', aspect: '12 / 13' },
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
    id: 'spinal-twist',
    name: 'Lying spinal twist',
    area: 'Back',
    target: 'Spine, obliques and outer hip',
    photo: { src: 'photos/spinal-twist.jpg', aspect: '3 / 2' },
    seconds: 40,
    perSide: true,
    setup: 'Lie on your back with your arms out wide in a T.',
    steps: [
      'Draw one knee up and let it fall across your body toward the floor.',
      'Keep both shoulder blades down — that is the whole point of the stretch.',
      'Turn your head the other way and let the breath unwind it.'
    ],
    note: 'Chase the shoulder staying down rather than the knee reaching the floor.'
  }
];

if (typeof module !== 'undefined') module.exports = { STRETCHES };
