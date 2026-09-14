/**
 * The four stretches. One is picked at random each time the app opens.
 *
 * Four rather than twenty-four because a short list is one you actually learn:
 * the form stops being something you read off the screen and becomes something
 * you know. Every one of them is done on bare floor with empty hands — no mat,
 * no strap, no wall, nothing to kneel on. Fetching a mat for a single stretch is
 * exactly the kind of small errand that turns a daily habit into a skipped one,
 * so nothing here asks for one.
 *
 * Between them they cover the back of the legs, the inner thigh and the front of
 * the upper body — the parts that shorten from a day at the desk and an evening
 * on the bike.
 *
 * seconds  hold length for a single hold
 * perSide  true when the stretch is done left, then right (so the timer runs twice)
 * photo    the photograph of the pose: { src, aspect }. The card takes the
 *          photo's own shape rather than cropping it, because these poses are
 *          not all the same shape.
 */
const STRETCHES = [
  {
    id: 'standing-forward-fold',
    name: 'Standing forward fold',
    area: 'Legs',
    target: 'Hamstrings, calves and the back of the legs',
    photo: { src: 'photos/standing-forward-fold.jpg', aspect: '10 / 11' },
    seconds: 45,
    perSide: false,
    setup: 'Stand with your feet under your hips, knees soft rather than locked.',
    steps: [
      'Hinge from the hips, not the waist — tip the top of the pelvis forward.',
      'Let the head, neck and arms hang, and reach your fingertips toward the floor.',
      'Bend the knees as much as you need to keep the back long.'
    ],
    note: 'Reaching the floor is not the point and never was — a long back with bent knees stretches the hamstrings, a rounded back with straight legs stretches the ligaments in your spine.'
  },
  {
    id: 'wide-leg-fold',
    name: 'Seated wide-leg fold',
    area: 'Hips',
    target: 'Adductors, inner thigh and groin',
    photo: { src: 'photos/wide-leg-fold.jpg', aspect: '3 / 2' },
    seconds: 45,
    perSide: false,
    setup: 'Sit on the floor and open your legs as wide as they go without strain, knees and toes pointing up.',
    steps: [
      'Roll forward off your tailbone first, so you are sitting on your sit bones.',
      'Walk your hands forward along the floor between your legs, back flat.',
      'Stop where the inner thighs pull, not where the back starts to round.'
    ],
    note: 'Inner thighs get almost no range on a bike — the legs only ever travel in one plane. This gives them the other one.'
  },
  {
    id: 'seated-forward-fold',
    name: 'Seated forward fold',
    area: 'Legs',
    target: 'Hamstrings, calves and the lower back',
    photo: { src: 'photos/seated-forward-fold.jpg', aspect: '3 / 2' },
    seconds: 45,
    perSide: false,
    setup: 'Sit on the floor with both legs straight out in front of you, toes pointing up.',
    steps: [
      'Sit tall first, then hinge forward from the hips with the chest leading.',
      'Reach your fingers toward your toes and take hold of whatever you reach.',
      'Leave a soft bend in the knees rather than locking them out.'
    ],
    note: 'The same hamstrings as the standing fold, but with your weight off them — this is the one to pick on a day when standing up makes your back complain.'
  },
  {
    id: 'overhead-reach',
    name: 'Standing overhead reach',
    area: 'Upper body',
    target: 'Shoulders, ribs and spine',
    photo: { src: 'photos/overhead-reach.jpg', aspect: '2 / 3' },
    seconds: 40,
    perSide: false,
    setup: 'Stand tall with your feet under your hips and nothing in your hands.',
    steps: [
      'Lace your fingers together, turn the palms up, and press them overhead.',
      'Push up through the heels of the hands until the ribs lift away from the hips.',
      'Keep the ribs down at the front — grow upward rather than leaning back.'
    ],
    note: 'The one move here you can do in shoes, in a corridor, in a coat. It undoes the shape a keyboard and a set of handlebars both put you in.'
  }
];

if (typeof module !== 'undefined') module.exports = { STRETCHES };
