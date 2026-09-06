/**
 * One figure per stretch, hand-authored on a shared 0 0 200 220 viewBox.
 *
 * Each value is the *inside* of the <svg> — app.js supplies the wrapper and the
 * arrowhead marker. Colour comes from CSS classes rather than literal fills, so
 * the figures follow the light/dark theme:
 *
 *   fig-limb    arms, legs, shins            fig-hot    the muscle being stretched
 *   fig-torso   trunk and spine              fig-ghost  a dashed "other half" of a movement
 *   fig-head    head                         fig-arrow  direction of the stretch
 *   fig-ground  the floor                    fig-prop   wall, chair, step, doorframe
 */
const FIGURES = {

  // ---------------------------------------------------------------- legs & hips

  'hip-flexor-lunge': `
    <line class="fig-ground" x1="16" y1="200" x2="184" y2="200"/>
    <path class="fig-limb" d="M46 200 H74"/>
    <path class="fig-limb" d="M46 200 L40 190"/>
    <path class="fig-limb" d="M74 200 L102 142"/>
    <path class="fig-limb" d="M102 142 L140 166 L142 200"/>
    <path class="fig-limb" d="M132 200 H156"/>
    <path class="fig-torso" d="M102 142 L100 92"/>
    <path class="fig-limb" d="M100 92 L114 124 L136 158"/>
    <circle class="fig-head" cx="100" cy="76" r="11"/>
    <path class="fig-hot" d="M102 142 L88 172"/>
    <path class="fig-arrow" d="M114 124 Q132 119 148 122" marker-end="url(#fig-arrowhead)"/>
  `,

  'couch-stretch': `
    <line class="fig-ground" x1="16" y1="200" x2="184" y2="200"/>
    <path class="fig-prop" d="M38 88 V200"/>
    <path class="fig-limb" d="M48 198 L44 132"/>
    <path class="fig-limb" d="M44 132 L44 122"/>
    <path class="fig-limb" d="M48 198 L92 160"/>
    <path class="fig-limb" d="M92 160 L134 180 L136 200"/>
    <path class="fig-limb" d="M126 200 H150"/>
    <path class="fig-torso" d="M92 160 L92 104"/>
    <path class="fig-limb" d="M92 104 L106 134 L130 174"/>
    <circle class="fig-head" cx="92" cy="88" r="11"/>
    <path class="fig-hot" d="M86 164 L60 190"/>
  `,

  'standing-quad': `
    <line class="fig-ground" x1="16" y1="200" x2="184" y2="200"/>
    <path class="fig-prop" d="M170 66 V200"/>
    <path class="fig-limb" d="M98 134 L98 168 L98 200"/>
    <path class="fig-limb" d="M90 200 H112"/>
    <path class="fig-limb" d="M96 134 L86 168 L64 146"/>
    <path class="fig-limb" d="M64 146 L54 142"/>
    <path class="fig-torso" d="M97 134 L99 86"/>
    <path class="fig-limb" d="M99 86 L86 114 L64 143"/>
    <path class="fig-limb" d="M99 86 L130 92 L166 96"/>
    <circle class="fig-head" cx="101" cy="70" r="11"/>
    <path class="fig-hot" d="M95 138 L87 164"/>
  `,

  'standing-hamstring': `
    <line class="fig-ground" x1="16" y1="200" x2="184" y2="200"/>
    <path class="fig-prop" d="M128 200 V168 H180"/>
    <path class="fig-limb" d="M84 138 L84 170 L84 200"/>
    <path class="fig-limb" d="M76 200 H98"/>
    <path class="fig-limb" d="M84 138 L112 154 L140 168"/>
    <path class="fig-limb" d="M140 168 L148 156"/>
    <path class="fig-torso" d="M84 138 L106 102"/>
    <path class="fig-limb" d="M106 102 L120 126 L136 148"/>
    <circle class="fig-head" cx="115" cy="88" r="11"/>
    <path class="fig-hot" d="M88 141 L112 154"/>
  `,

  'supine-hamstring': `
    <line class="fig-ground" x1="16" y1="194" x2="184" y2="194"/>
    <circle class="fig-head" cx="40" cy="176" r="11"/>
    <path class="fig-torso" d="M56 182 H114"/>
    <path class="fig-limb" d="M114 184 L146 152 L160 190"/>
    <path class="fig-limb" d="M160 190 H176"/>
    <path class="fig-limb" d="M114 182 L120 142 L126 102"/>
    <path class="fig-limb" d="M126 102 L112 96"/>
    <path class="fig-limb" d="M58 182 L84 180 L108 166"/>
    <path class="fig-prop" d="M108 166 L124 106"/>
    <path class="fig-hot" d="M115 178 L120 146"/>
  `,

  'figure-four': `
    <line class="fig-ground" x1="16" y1="194" x2="184" y2="194"/>
    <circle class="fig-head" cx="40" cy="176" r="11"/>
    <path class="fig-torso" d="M56 180 H110"/>
    <path class="fig-limb" d="M110 182 L132 132 L114 104"/>
    <path class="fig-limb" d="M114 104 L101 99"/>
    <path class="fig-limb" d="M110 186 L168 148 L126 138"/>
    <path class="fig-limb" d="M126 138 L117 130"/>
    <path class="fig-limb" d="M56 180 L82 178 L112 152"/>
    <path class="fig-hot" d="M113 184 L148 161"/>
    <path class="fig-arrow" d="M176 152 H192" marker-end="url(#fig-arrowhead)"/>
  `,

  'standing-calf': `
    <line class="fig-ground" x1="16" y1="200" x2="184" y2="200"/>
    <path class="fig-prop" d="M172 58 V200"/>
    <path class="fig-torso" d="M84 140 L108 98"/>
    <circle class="fig-head" cx="118" cy="84" r="11"/>
    <path class="fig-limb" d="M108 98 L136 96 L168 96"/>
    <path class="fig-limb" d="M84 140 L114 166 L120 200"/>
    <path class="fig-limb" d="M110 200 H134"/>
    <path class="fig-limb" d="M84 140 L66 170 L48 200"/>
    <path class="fig-limb" d="M42 200 H66"/>
    <path class="fig-hot" d="M65 172 L50 197"/>
  `,

  'soleus': `
    <line class="fig-ground" x1="16" y1="200" x2="184" y2="200"/>
    <path class="fig-prop" d="M172 58 V200"/>
    <path class="fig-torso" d="M96 142 L116 100"/>
    <circle class="fig-head" cx="126" cy="86" r="11"/>
    <path class="fig-limb" d="M116 100 L142 98 L168 98"/>
    <path class="fig-limb" d="M96 142 L126 168 L132 200"/>
    <path class="fig-limb" d="M122 200 H146"/>
    <path class="fig-limb" d="M96 142 L80 174 L64 200"/>
    <path class="fig-limb" d="M58 200 H82"/>
    <path class="fig-hot" d="M74 184 L65 198"/>
    <path class="fig-arrow" d="M92 176 Q80 186 72 194" marker-end="url(#fig-arrowhead)"/>
  `,

  'tfl-lean': `
    <line class="fig-ground" x1="16" y1="200" x2="184" y2="200"/>
    <path class="fig-prop" d="M34 58 V200"/>
    <path class="fig-torso" d="M84 140 L112 88"/>
    <circle class="fig-head" cx="118" cy="72" r="11"/>
    <path class="fig-limb" d="M112 88 L84 92 L40 94"/>
    <path class="fig-limb" d="M112 88 L128 112 L112 136"/>
    <path class="fig-limb" d="M90 142 L100 170 L112 200"/>
    <path class="fig-limb" d="M104 200 H126"/>
    <path class="fig-limb" d="M84 140 L76 170 L70 200"/>
    <path class="fig-limb" d="M60 200 H82"/>
    <path class="fig-hot" d="M83 143 L76 170 L70 196"/>
    <path class="fig-arrow" d="M62 132 Q50 132 42 134" marker-end="url(#fig-arrowhead)"/>
  `,

  'adductor-butterfly': `
    <line class="fig-ground" x1="16" y1="196" x2="184" y2="196"/>
    <circle class="fig-head" cx="100" cy="72" r="11"/>
    <path class="fig-torso" d="M100 88 V146"/>
    <path class="fig-limb" d="M100 148 L56 178 L98 190"/>
    <path class="fig-limb" d="M100 148 L144 178 L102 190"/>
    <path class="fig-limb" d="M100 92 L70 126 L92 186"/>
    <path class="fig-limb" d="M100 92 L130 126 L108 186"/>
    <path class="fig-hot" d="M96 152 L64 174"/>
    <path class="fig-hot" d="M104 152 L136 174"/>
  `,

  'knee-to-wall': `
    <line class="fig-ground" x1="16" y1="200" x2="184" y2="200"/>
    <path class="fig-prop" d="M158 58 V200"/>
    <path class="fig-limb" d="M96 138 L152 172 L120 200"/>
    <path class="fig-limb" d="M110 200 H136"/>
    <path class="fig-limb" d="M96 138 L82 168 L72 200"/>
    <path class="fig-limb" d="M64 200 H86"/>
    <path class="fig-torso" d="M96 138 L102 92"/>
    <circle class="fig-head" cx="106" cy="76" r="11"/>
    <path class="fig-limb" d="M102 92 L126 96 L152 100"/>
    <path class="fig-hot" d="M136 184 L121 198"/>
    <path class="fig-arrow" d="M128 154 H150" marker-end="url(#fig-arrowhead)"/>
  `,

  'wide-fold': `
    <line class="fig-ground" x1="16" y1="198" x2="184" y2="198"/>
    <path class="fig-limb" d="M92 126 L64 162 L48 198"/>
    <path class="fig-limb" d="M38 198 H60"/>
    <path class="fig-limb" d="M108 126 L136 162 L152 198"/>
    <path class="fig-limb" d="M140 198 H162"/>
    <path class="fig-torso" d="M100 124 V154"/>
    <circle class="fig-head" cx="100" cy="176" r="11"/>
    <path class="fig-limb" d="M100 152 L74 168 L64 194"/>
    <path class="fig-limb" d="M100 152 L126 168 L136 194"/>
    <path class="fig-hot" d="M90 130 L68 158"/>
    <path class="fig-hot" d="M110 130 L132 158"/>
  `,

  // -------------------------------------------------------------- back & torso

  'cat-cow': `
    <line class="fig-ground" x1="16" y1="200" x2="184" y2="200"/>
    <path class="fig-limb" d="M44 200 H68"/>
    <path class="fig-limb" d="M40 192 L44 200"/>
    <path class="fig-limb" d="M68 200 L72 152"/>
    <path class="fig-limb" d="M146 154 L150 178 L152 200"/>
    <path class="fig-ghost" d="M72 152 Q109 180 146 154"/>
    <path class="fig-torso" d="M72 152 Q109 116 146 154"/>
    <path class="fig-hot" d="M84 140 Q109 120 134 140"/>
    <circle class="fig-head" cx="160" cy="172" r="11"/>
    <path class="fig-arrow" d="M98 118 Q109 106 120 118" marker-end="url(#fig-arrowhead)"/>
  `,

  'thoracic-chair': `
    <line class="fig-ground" x1="16" y1="204" x2="184" y2="204"/>
    <path class="fig-prop" d="M60 160 H144"/>
    <path class="fig-prop" d="M60 160 V106"/>
    <path class="fig-prop" d="M68 160 V204"/>
    <path class="fig-prop" d="M138 160 V204"/>
    <path class="fig-limb" d="M80 152 H128 L130 196"/>
    <path class="fig-limb" d="M122 196 H146"/>
    <path class="fig-torso" d="M80 152 Q77 124 63 104"/>
    <path class="fig-hot" d="M78 140 Q74 120 63 106"/>
    <circle class="fig-head" cx="53" cy="90" r="11"/>
    <path class="fig-limb" d="M66 106 L82 90 L60 82"/>
    <path class="fig-arrow" d="M96 118 Q80 104 68 96" marker-end="url(#fig-arrowhead)"/>
  `,

  'spinal-twist': `
    <rect class="fig-prop" x="18" y="42" width="170" height="136" rx="12"/>
    <circle class="fig-head" cx="42" cy="110" r="11"/>
    <path class="fig-torso" d="M56 110 H116"/>
    <path class="fig-limb" d="M68 110 L66 62"/>
    <path class="fig-limb" d="M68 110 L66 158"/>
    <path class="fig-limb" d="M116 110 L148 104 L176 100"/>
    <path class="fig-limb" d="M116 112 L140 152 L172 148"/>
    <path class="fig-hot" d="M92 110 H116"/>
    <path class="fig-hot" d="M118 114 L138 148"/>
    <path class="fig-arrow" d="M116 128 Q130 140 146 142" marker-end="url(#fig-arrowhead)"/>
  `,

  'childs-pose-side': `
    <line class="fig-ground" x1="16" y1="196" x2="184" y2="196"/>
    <path class="fig-limb" d="M44 190 H104"/>
    <path class="fig-limb" d="M44 190 L36 183"/>
    <path class="fig-limb" d="M104 190 L66 150"/>
    <path class="fig-knockout" d="M66 150 L140 182"/>
    <path class="fig-torso" d="M66 150 L140 182"/>
    <circle class="fig-head" cx="157" cy="188" r="10"/>
    <path class="fig-limb" d="M138 175 L160 181 L184 183"/>
    <path class="fig-limb" d="M140 184 L162 190 L184 192"/>
    <path class="fig-hot" d="M72 145 L134 172"/>
    <path class="fig-arrow" d="M166 160 Q179 162 186 170" marker-end="url(#fig-arrowhead)"/>
  `,

  'knees-to-chest': `
    <line class="fig-ground" x1="16" y1="194" x2="184" y2="194"/>
    <circle class="fig-head" cx="40" cy="176" r="11"/>
    <path class="fig-torso" d="M56 180 H108"/>
    <path class="fig-limb" d="M108 182 L128 136 L100 120"/>
    <path class="fig-limb" d="M108 188 L142 146 L112 130"/>
    <path class="fig-limb" d="M56 180 L80 174 L100 144"/>
    <path class="fig-hot" d="M78 182 Q94 170 108 180"/>
    <path class="fig-arrow" d="M146 122 Q132 110 118 106" marker-end="url(#fig-arrowhead)"/>
  `,

  'standing-extension': `
    <line class="fig-ground" x1="16" y1="200" x2="184" y2="200"/>
    <path class="fig-limb" d="M92 140 L84 170 L80 200"/>
    <path class="fig-limb" d="M70 200 H92"/>
    <path class="fig-limb" d="M100 140 L108 170 L112 200"/>
    <path class="fig-limb" d="M102 200 H124"/>
    <path class="fig-torso" d="M96 140 L84 90"/>
    <circle class="fig-head" cx="79" cy="73" r="11"/>
    <path class="fig-limb" d="M84 90 L104 114 L100 138"/>
    <path class="fig-hot" d="M96 136 Q86 120 84 104"/>
    <path class="fig-arrow" d="M112 84 Q100 68 84 60" marker-end="url(#fig-arrowhead)"/>
  `,

  // --------------------------------------------------------- neck, chest & arms

  'doorway-pec': `
    <line class="fig-ground" x1="16" y1="200" x2="184" y2="200"/>
    <path class="fig-prop" d="M40 200 V36 H160 V200"/>
    <path class="fig-torso" d="M100 92 V142"/>
    <circle class="fig-head" cx="100" cy="74" r="11"/>
    <path class="fig-limb" d="M100 94 L62 98 L56 66"/>
    <path class="fig-limb" d="M100 94 L138 98 L144 66"/>
    <path class="fig-limb" d="M96 142 L86 170 L82 200"/>
    <path class="fig-limb" d="M72 200 H94"/>
    <path class="fig-limb" d="M104 142 L114 170 L118 200"/>
    <path class="fig-limb" d="M108 200 H130"/>
    <path class="fig-hot" d="M74 100 Q100 118 126 100"/>
  `,

  'upper-trap': `
    <circle class="fig-head" cx="120" cy="82" r="20"/>
    <circle class="fig-nose" cx="102" cy="88" r="3.5"/>
    <path class="fig-torso" d="M108 102 L96 126"/>
    <path class="fig-torso" d="M56 132 H144"/>
    <path class="fig-limb" d="M56 132 L66 198"/>
    <path class="fig-limb" d="M144 132 L134 198"/>
    <path class="fig-limb" d="M144 132 L170 106 L138 68"/>
    <path class="fig-limb" d="M56 132 L46 166 L42 198"/>
    <path class="fig-hot" d="M100 108 Q84 116 68 130"/>
    <path class="fig-arrow" d="M34 148 V174" marker-end="url(#fig-arrowhead)"/>
  `,

  'levator-scap': `
    <circle class="fig-head" cx="116" cy="86" r="20"/>
    <circle class="fig-nose" cx="106" cy="102" r="3.5"/>
    <path class="fig-torso" d="M106 106 L98 128"/>
    <path class="fig-torso" d="M56 134 H144"/>
    <path class="fig-limb" d="M56 134 L66 198"/>
    <path class="fig-limb" d="M144 134 L134 198"/>
    <path class="fig-limb" d="M144 134 L160 166 L152 198"/>
    <path class="fig-limb" d="M56 134 L54 98 L94 72"/>
    <path class="fig-hot" d="M108 112 Q122 122 134 132"/>
    <path class="fig-arrow" d="M96 56 Q116 48 134 58" marker-end="url(#fig-arrowhead)"/>
  `,

  'overhead-lat': `
    <line class="fig-ground" x1="16" y1="200" x2="184" y2="200"/>
    <path class="fig-prop" d="M170 30 V200"/>
    <path class="fig-limb" d="M164 62 L140 84 L116 104"/>
    <path class="fig-torso" d="M116 104 L72 132"/>
    <circle class="fig-head" cx="132" cy="94" r="11"/>
    <path class="fig-limb" d="M116 104 L96 126 L78 132"/>
    <path class="fig-limb" d="M72 132 L76 168 L72 200"/>
    <path class="fig-limb" d="M62 200 H84"/>
    <path class="fig-limb" d="M72 136 L86 170 L84 200"/>
    <path class="fig-limb" d="M76 200 H98"/>
    <path class="fig-hot" d="M114 112 L78 136"/>
    <path class="fig-arrow" d="M62 116 Q46 118 36 124" marker-end="url(#fig-arrowhead)"/>
  `,

  'wrist-flexor-extensor': `
    <circle class="fig-head" cx="46" cy="56" r="16"/>
    <path class="fig-torso" d="M34 84 H70"/>
    <path class="fig-torso" d="M40 84 L38 150"/>
    <path class="fig-torso" d="M66 84 L68 150"/>
    <path class="fig-limb" d="M68 86 L114 92 L158 98"/>
    <path class="fig-limb" d="M158 98 L162 126"/>
    <path class="fig-limb" d="M40 88 L86 126 L152 122"/>
    <path class="fig-hot" d="M114 92 L156 98"/>
    <path class="fig-arrow" d="M176 104 Q182 118 176 132" marker-end="url(#fig-arrowhead)"/>
  `,

  'chin-tuck': `
    <circle class="fig-ghost-head" cx="122" cy="86" r="20"/>
    <circle class="fig-head" cx="102" cy="82" r="20"/>
    <circle class="fig-nose" cx="120" cy="88" r="3.5"/>
    <path class="fig-torso" d="M100 102 L98 128"/>
    <path class="fig-torso" d="M56 134 H144"/>
    <path class="fig-limb" d="M56 134 L46 168 L44 198"/>
    <path class="fig-limb" d="M144 134 L154 168 L156 198"/>
    <path class="fig-limb" d="M56 134 L66 198"/>
    <path class="fig-limb" d="M144 134 L134 198"/>
    <path class="fig-hot" d="M64 134 H136"/>
    <path class="fig-arrow" d="M146 74 H112" marker-end="url(#fig-arrowhead)"/>
  `
};

if (typeof module !== 'undefined') module.exports = { FIGURES };
