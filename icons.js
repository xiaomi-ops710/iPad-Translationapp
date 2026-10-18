/* SF Symbols 風アイコン（24pt グリッド / Regular ウェイト相当の線幅 / 丸い線端）
 * Apple の SF Symbols そのものではなく、同じ幾何（角丸・線幅・二重矩形など）で描き起こした SVG です。 */
(function () {
  const sv = (body, o) => {
    o = o || {};
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${o.sw || 1.7}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
  };
  const fillSv = (body) => `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${body}</svg>`;

  window.XI = {
    plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>`,
    compose: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11.5 5H8.2A4.2 4.2 0 0 0 4 9.2v6.6A4.2 4.2 0 0 0 8.2 20h6.6a4.2 4.2 0 0 0 4.2-4.2v-3.3"/><path d="M19.2 3.9a1.9 1.9 0 0 1 2.7 2.7l-8.7 8.7-3.7.9.9-3.7z"/></svg>`,
    filter: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h16M7.2 12h9.6M10.5 17h3"/></svg>`,
    chat: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6.5 4.5h11A3.5 3.5 0 0 1 21 8v6a3.5 3.5 0 0 1-3.5 3.5H12.2l-4.6 3.5v-3.5H6.5A3.5 3.5 0 0 1 3 14V8a3.5 3.5 0 0 1 3.5-3.5z"/><path d="M7.6 9.3h8.8M7.6 12.7h5.2"/></svg>`,
    chatF: `<svg viewBox="0 0 24 24" aria-hidden="true"><defs><mask id="xi-chm"><rect width="24" height="24" fill="#fff"/><path d="M7.6 9.3h8.8M7.6 12.7h5.2" stroke="#000" stroke-width="1.8" stroke-linecap="round" fill="none"/></mask></defs><path mask="url(#xi-chm)" fill="currentColor" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" d="M6.5 4.5h11A3.5 3.5 0 0 1 21 8v6a3.5 3.5 0 0 1-3.5 3.5H12.2l-4.6 3.5v-3.5H6.5A3.5 3.5 0 0 1 3 14V8a3.5 3.5 0 0 1 3.5-3.5z"/></svg>`,
    arrowUp: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M6.2 10.8L12 5l5.8 5.8"/></svg>`,
    siri: `<svg viewBox="20 17 690 690" aria-hidden="true"><defs><mask id="xi-sm" maskUnits="userSpaceOnUse" x="0" y="0" width="735" height="728"><rect width="735" height="728" fill="#fff"/><path fill="#000" d="M130 352A234.2 234.2 0 0 1 598 345C600 380 580 402 540 405C470 412 430 380 370 355C320 335 250 328 200 345C170 356 150 365 134 362C128 360 126 356 130 352Z"/><path fill="#000" d="M185 470C183 425 225 392 285 394C340 396 380 420 430 442C472 460 520 471 548 470C562 469 562 484 552 494A203 203 0 0 1 185 470Z"/></mask></defs><circle cx="365" cy="362" r="300" fill="currentColor" mask="url(#xi-sm)"/></svg>`,
    siriF: `<svg viewBox="20 17 690 690" aria-hidden="true"><defs><mask id="xi-sm" maskUnits="userSpaceOnUse" x="0" y="0" width="735" height="728"><rect width="735" height="728" fill="#fff"/><path fill="#000" d="M130 352A234.2 234.2 0 0 1 598 345C600 380 580 402 540 405C470 412 430 380 370 355C320 335 250 328 200 345C170 356 150 365 134 362C128 360 126 356 130 352Z"/><path fill="#000" d="M185 470C183 425 225 392 285 394C340 396 380 420 430 442C472 460 520 471 548 470C562 469 562 484 552 494A203 203 0 0 1 185 470Z"/></mask></defs><circle cx="365" cy="362" r="300" fill="currentColor" mask="url(#xi-sm)"/></svg>`,
    favlist: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" aria-hidden="true"><path d="M9.6 6.2H21M9.6 12H21M9.6 17.8H21"/><g fill="currentColor" stroke="currentColor" stroke-width=".5" stroke-linejoin="round"><polygon points="4.60,3.70 5.22,5.35 6.98,5.43 5.60,6.52 6.07,8.22 4.60,7.25 3.13,8.22 3.60,6.52 2.22,5.43 3.98,5.35"/><polygon points="4.60,9.50 5.22,11.15 6.98,11.23 5.60,12.32 6.07,14.02 4.60,13.05 3.13,14.02 3.60,12.32 2.22,11.23 3.98,11.15"/><polygon points="4.60,15.30 5.22,16.95 6.98,17.03 5.60,18.12 6.07,19.82 4.60,18.85 3.13,19.82 3.60,18.12 2.22,17.03 3.98,16.95"/></g></svg>`,
    back: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.6 5.6L8.2 12l6.4 6.4"/></svg>`,
    translateF: `<svg viewBox="240 56 960 960" aria-hidden="true">
      <defs>
        <mask id="xi-tf1" maskUnits="userSpaceOnUse" x="200" y="150" width="1040" height="800"><rect x="200" y="150" width="1040" height="800" fill="#fff"/>
          <path d="M764 338H1094A115 115 0 0 1 1209 453V663A115 115 0 0 1 1094 778H1068V846Q1068 866 1056 880Q1043 897 1022 885L881 778H764A115 115 0 0 1 649 663V453A115 115 0 0 1 764 338Z" fill="#000" stroke="#000" stroke-width="95" stroke-linejoin="round"/>
          <path d="M424.4 502L493.2 310A19.8 19.8 0 0 1 532.8 310L601.6 502M455 427H571" fill="none" stroke="#000" stroke-width="52" stroke-linecap="round" stroke-linejoin="round"/></mask>
        <mask id="xi-tf2" maskUnits="userSpaceOnUse" x="600" y="300" width="660" height="640"><rect x="600" y="300" width="660" height="640" fill="#fff"/>
          <g fill="none" stroke="#000" stroke-width="48" stroke-linecap="round" stroke-linejoin="round"><path d="M826 509H1030M903 424L925 461M857 538C882 598 932 648 1034 668M988 538C968 598 918 648 822 668"/></g></mask></defs>
      <path fill="currentColor" mask="url(#xi-tf1)" d="M347 181H678A115 115 0 0 1 793 296V505A115 115 0 0 1 678 620H560L405 745V620H347A115 115 0 0 1 232 505V296A115 115 0 0 1 347 181Z"/>
      <path fill="currentColor" mask="url(#xi-tf2)" d="M764 338H1094A115 115 0 0 1 1209 453V663A115 115 0 0 1 1094 778H1068V846Q1068 866 1056 880Q1043 897 1022 885L881 778H764A115 115 0 0 1 649 663V453A115 115 0 0 1 764 338Z"/>
    </svg>`,
    cameraF: `<svg viewBox="329.4 58.5 64.6 64.6" aria-hidden="true"><defs><mask id="xi-cf2" maskUnits="userSpaceOnUse" x="320" y="55" width="85" height="70"><rect x="320" y="55" width="85" height="70" fill="#fff"/><circle cx="361.6" cy="92.8" r="10" fill="none" stroke="#000" stroke-width="2.8"/><circle cx="379" cy="83.75" r="2.3" fill="#000"/></mask></defs><path mask="url(#xi-cf2)" fill="currentColor" d="M341 75H349.5Q351 75 352 73.6L353.6 71.6Q354.6 70.6 356 70.6H369Q370.4 70.6 371.4 71.6L373 73.6Q374 75 375.5 75H382.4A5 5 0 0 1 387.4 80V106A5 5 0 0 1 382.4 111H341A5 5 0 0 1 336 106V80A5 5 0 0 1 341 75Z"/></svg>`,
    peopleF: `<svg viewBox="488.2 59.2 64.6 64.6" aria-hidden="true"><defs><mask id="xi-pf2" maskUnits="userSpaceOnUse" x="480" y="60" width="80" height="60"><rect x="480" y="60" width="80" height="60" fill="#fff"/><path d="M516.5 110H546Q549 110 549 107C549 100 540 94.4 531 94.4C522 94.4 513.1 100 513.1 106.5Q513.1 110 516.5 110Z" fill="#000" stroke="#000" stroke-width="5" stroke-linejoin="round"/></mask></defs><ellipse cx="506.9" cy="83.1" rx="7.5" ry="8.1" fill="currentColor"/><ellipse cx="531.25" cy="81.5" rx="8.5" ry="9.4" fill="currentColor"/><path mask="url(#xi-pf2)" fill="currentColor" d="M495 110Q491.9 110 491.9 106.5C491.9 99 500 93.75 508 93.75C511.5 93.75 514.5 94.5 516.3 95.5V110Z"/><path fill="currentColor" d="M516.5 110H546Q549 110 549 107C549 100 540 94.4 531 94.4C522 94.4 513.1 100 513.1 106.5Q513.1 110 516.5 110Z"/></svg>`,
    // translate（SF Symbols「translate」を実測した寸法で再構成：線幅=高さの約7%、角丸R≈115/710）
    translate: `<svg viewBox="220 36 1000 1000" aria-hidden="true">
      <defs><mask id="xi-tm" maskUnits="userSpaceOnUse" x="600" y="300" width="660" height="640"><rect x="600" y="300" width="660" height="640" fill="#fff"/>
        <g fill="none" stroke="#000" stroke-width="46" stroke-linecap="round" stroke-linejoin="round"><path d="M826 509H1030M903 424L925 461M857 538C882 598 932 648 1034 668M988 538C968 598 918 648 822 668"/></g></mask></defs>
      <g fill="none" stroke="currentColor" stroke-width="49" stroke-linecap="round" stroke-linejoin="round">
        <path d="M347 206H678A90 90 0 0 1 768 296V420M257 296A90 90 0 0 1 347 206M257 296V508A90 90 0 0 0 347 598H660M548 598L405 716V598"/>
        <path d="M424.4 502L493.2 310A19.8 19.8 0 0 1 532.8 310L601.6 502M455 427H571"/>
      </g>
      <path fill="currentColor" mask="url(#xi-tm)" d="M764 338H1094A115 115 0 0 1 1209 453V663A115 115 0 0 1 1094 778H1068V846Q1068 866 1056 880Q1043 897 1022 885L881 778H764A115 115 0 0 1 649 663V453A115 115 0 0 1 764 338Z"/>
    </svg>`,
    // camera
    camera: `<svg viewBox="332.7 61.8 58 58" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g transform="translate(361.7 90.8) scale(.93) translate(-361.7 -90.8)"><path d="M341 75H349.5Q351 75 352 73.6L353.6 71.6Q354.6 70.6 356 70.6H369Q370.4 70.6 371.4 71.6L373 73.6Q374 75 375.5 75H382.4A5 5 0 0 1 387.4 80V106A5 5 0 0 1 382.4 111H341A5 5 0 0 1 336 106V80A5 5 0 0 1 341 75Z"/><circle cx="361.6" cy="92.8" r="8.4"/><circle cx="379" cy="83.75" r="1.9" fill="currentColor" stroke="none"/></g></svg>`,
    // person.2
    people: `<svg viewBox="491.5 62.5 58 58" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g transform="translate(520.5 91.5) scale(.93) translate(-520.5 -91.5)"><ellipse cx="506.9" cy="83.1" rx="5.8" ry="6.4"/><ellipse cx="531.25" cy="81.5" rx="6.8" ry="7.7"/><path d="M513.4 110H495Q491.9 110 491.9 106.5C491.9 99 500 93.75 508 93.75C510.6 93.75 512.8 94.1 514.4 94.8"/><path d="M516.5 110H546Q549 110 549 107C549 100 540 94.4 531 94.4C522 94.4 513.1 100 513.1 106.5Q513.1 110 516.5 110Z"/></g></svg>`,
    // star / star.fill
    starO: `<svg viewBox="46.3 352.5 44 44" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="68.30,360.70 72.41,369.34 81.90,370.58 74.96,377.16 76.71,386.57 68.30,382.00 59.89,386.57 61.64,377.16 54.70,370.58 64.19,369.34"/></svg>`,
    star: `<svg viewBox="46.3 352.5 44 44" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="68.30,360.70 72.41,369.34 81.90,370.58 74.96,377.16 76.71,386.57 68.30,382.00 59.89,386.57 61.64,377.16 54.70,370.58 64.19,369.34"/></svg>`,
    // arrow.up.left.and.arrow.down.right
    expand: `<svg viewBox="40 19.0 22 22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M44.9 23.9L57.1 36.1"/><path d="M44.9 29.3V23.9H50.3"/><path d="M57.1 30.7V36.1H51.7"/></svg>`,
    // doc.on.doc
    copy: `<svg viewBox="115.5 18.5 22 22" fill="none" stroke="currentColor" stroke-width="1.45" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g transform="translate(-.1 .2)">
<path d="M121.9 38.8a2.1 2.1 0 0 1-2.1-2.1V27a2.1 2.1 0 0 1 2.1-2.1h4.3l4 4v7.8a2.1 2.1 0 0 1-2.1 2.1z"/><path d="M126.2 24.9v2.9a1.1 1.1 0 0 0 1.1 1.1h2.9"/>
<path d="M123 24v-1.2a2.1 2.1 0 0 1 2.1-2.1h6.1a2.1 2.1 0 0 1 2.1 2.1v9.5a2.1 2.1 0 0 1-2.1 2.1h-.9"/></g></svg>`,
    // play.circle.fill（三角は本当に抜く）
    play: `<svg viewBox="0 0 24 24" aria-hidden="true"><defs><mask id="xi-pm"><rect width="24" height="24" fill="#fff"/><path d="M9.6 7.2l7.1 4.2c.5.3.5.9 0 1.2l-7.1 4.2c-.6.4-1.3 0-1.3-.7V7.9c0-.7.7-1.1 1.3-.7z" fill="#000"/></mask></defs><circle cx="12" cy="12" r="12" fill="currentColor" mask="url(#xi-pm)"/></svg>`,
    // mic（SF Symbols「mic」を実測：線幅=高さの約7%、カプセル幅/高さ=233/450）
    mic: `<svg viewBox="273 116 826 826" fill="none" stroke="currentColor" stroke-width="49" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="594.5" y="212.5" width="184" height="401" rx="92"/><path d="M482.5 460V520A204 204 0 0 0 890.5 520V460M686.5 724V847M544.5 847H828.5"/></svg>`,
    // arrow.left.arrow.right
    swap: sv('<path d="M4.4 8.2h15.2M16 4.6l3.6 3.6-3.6 3.6M19.6 15.8H4.4M8 12.2l-3.6 3.6L8 19.4"/>', { sw: 1.7 }),
    // chevron.down
    chev: `<svg viewBox="304.4 301.5 28 28" fill="none" stroke="currentColor" stroke-width="2.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M311.5 312.5L318.5 318.6L325.4 311.6"/></svg>`,
    // chevron.up.chevron.down
    updown: sv('<path d="M8 9.6l4-4 4 4M8 14.4l4 4 4-4"/>', { sw: 2.6 }),
    // xmark.circle.fill
    clear: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="#b4b4b9"/><path d="M8.4 8.4l7.2 7.2M15.6 8.4l-7.2 7.2" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>`,
    // macwindow（サイドバーを隠す）
    window: `<svg viewBox="49.7 33.8 51.4 51.4" fill="none" stroke="currentColor" stroke-width="3.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="57.6" y="44.6" width="35.5" height="29.9" rx="3"/><path d="M67.8 50H83.3" stroke-width="2.3"/></svg>`,
    // sidebar.left（タブバー左端）
    sidebar: `<svg viewBox="61.3 30.5 51.4 51.4" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="69.6" y="42.7" width="34.8" height="27" rx="3.6"/><path d="M82.9 42.7V69.7"/><path d="M74.4 49.2H76.9M74.4 53.7H76.9M74.4 58.1H76.9" stroke-width="2"/></svg>`,
    // ellipsis
    more: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5.2" cy="12" r="1.85"/><circle cx="12" cy="12" r="1.85"/><circle cx="18.8" cy="12" r="1.85"/></svg>`,
    // photo.on.rectangle
    photos: sv('<rect x="2.8" y="8" width="14.6" height="12.4" rx="2.8"/><path d="M7 8V6.6a2.8 2.8 0 0 1 2.8-2.8h8.4A2.8 2.8 0 0 1 21 6.6v7.1a2.8 2.8 0 0 1-2.8 2.8h-.8"/><circle cx="7.6" cy="12.2" r="1.35" fill="currentColor" stroke="none"/><path d="M3 18.2l4.5-4 3.4 3 2.4-2 3.9 3.2"/>', { sw: 1.5 }),
    // flashlight.off.fill
    torch: fillSv('<path fill-rule="evenodd" d="M8.1 2.8h7.8c.4 0 .7.3.7.7V6c0 .4-.1.7-.4 1l-1 1.2V19a2.3 2.3 0 0 1-2.3 2.3h-1.8A2.3 2.3 0 0 1 8.8 19V8.2l-1-1.2a1.6 1.6 0 0 1-.4-1V3.5c0-.4.3-.7.7-.7zM12 9.6a1.1 1.1 0 0 0-1.1 1.1v1.9a1.1 1.1 0 0 0 2.2 0v-1.9A1.1 1.1 0 0 0 12 9.6z"/>'),
    // xmark
    x: sv('<path d="M6 6l12 12M18 6L6 18"/>', { sw: 2 }),
    // checkmark
    check: sv('<path d="M4.6 12.6l5 5L19.6 6.8"/>', { sw: 2.5 }),
    // arrow.right
    arrow: sv('<path d="M4.4 12h15M13.6 6.2L19.4 12l-5.8 5.8"/>', { sw: 1.8 }),
    bike: `<svg viewBox="0 0 120 80" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="24" cy="56" r="17"/><circle cx="96" cy="56" r="17"/><path d="M24 56l16-30h30l26 30M40 26l22 30h-4M58 16h14M35 16h14l-9 10"/></svg>`,
    bigArrow: `<svg viewBox="0 0 120 40" fill="currentColor" aria-hidden="true"><path d="M2 14h82V4l34 16-34 16V26H2z"/></svg>`
  };
})();
