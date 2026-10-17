/* SF Symbols 風アイコン（24pt グリッド / Regular ウェイト相当の線幅 / 丸い線端）
 * Apple の SF Symbols そのものではなく、同じ幾何（角丸・線幅・二重矩形など）で描き起こした SVG です。 */
(function () {
  const sv = (body, o) => {
    o = o || {};
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${o.sw || 1.7}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
  };
  const fillSv = (body) => `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${body}</svg>`;

  window.XI = {
    // translate: 左=アウトラインの吹き出し「A」 / 右=塗りの吹き出し「文」（重なり部分は抜き）
    translate: `<svg viewBox="0 0 32 31" aria-hidden="true">
      <defs><mask id="xi-tm" maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="31"><rect width="32" height="31" fill="#fff"/>
        <path d="M15.6 11.2h11.3a3.6 3.6 0 0 1 3.6 3.6v7.6a3.6 3.6 0 0 1-3.6 3.6h-1.2v3.5l-4.2-3.5h-5.9a3.6 3.6 0 0 1-3.6-3.6v-7.6a3.6 3.6 0 0 1 3.6-3.6z" fill="#000" stroke="#000" stroke-width="3.2" stroke-linejoin="round"/></mask></defs>
      <path d="M5 2.6h12.2a3 3 0 0 1 3 3v8.1a3 3 0 0 1-3 3h-6.5L6.4 20.4v-3.7H5a3 3 0 0 1-3-3V5.6a3 3 0 0 1 3-3z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" mask="url(#xi-tm)"/>
      <text x="11" y="13" text-anchor="middle" font-size="10.4" font-weight="600" fill="currentColor" font-family="-apple-system,'SF Pro Text',Helvetica,Arial,sans-serif" mask="url(#xi-tm)">A</text>
      <mask id="xi-tm2" maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="31"><rect width="32" height="31" fill="#fff"/>
        <text x="21.4" y="23.6" text-anchor="middle" font-size="11.6" font-weight="700" fill="#000" font-family="-apple-system,'Hiragino Sans','Noto Sans CJK JP',sans-serif">文</text></mask>
      <path d="M15.6 11.2h11.3a3.6 3.6 0 0 1 3.6 3.6v7.6a3.6 3.6 0 0 1-3.6 3.6h-1.2v3.5l-4.2-3.5h-5.9a3.6 3.6 0 0 1-3.6-3.6v-7.6a3.6 3.6 0 0 1 3.6-3.6z" fill="currentColor" mask="url(#xi-tm2)"/>
    </svg>`,
    // camera
    camera: sv('<path d="M5.7 7.4H8l1.1-1.9a1 1 0 0 1 .9-.5h4a1 1 0 0 1 .9.5l1.1 1.9h2.3a3 3 0 0 1 3 3v6.6a3 3 0 0 1-3 3H5.7a3 3 0 0 1-3-3v-6.6a3 3 0 0 1 3-3z"/><circle cx="12" cy="13.5" r="3.8"/><circle cx="17.9" cy="10.6" r=".85" fill="currentColor" stroke="none"/>', { sw: 1.6 }),
    // person.2
    people: sv('<circle cx="9.1" cy="8.2" r="3.3"/><path d="M3.1 19.4v-.5c0-2.9 2.6-4.9 6-4.9s6 2 6 4.9v.5c0 .3-.2.5-.5.5H3.6c-.3 0-.5-.2-.5-.5z"/><path d="M15.2 5.1a3.1 3.1 0 1 1 .9 5.9"/><path d="M17.3 14.2c2.4.3 4.2 1.9 4.2 4.4v.3c0 .3-.2.5-.5.5h-2.4"/>', { sw: 1.6 }),
    // star / star.fill
    starO: sv('<path d="M12 3.4l2.5 5.3 5.8.8-4.2 4.1 1 5.8-5.1-2.8-5.1 2.8 1-5.8-4.2-4.1 5.8-.8z"/>', { sw: 1.6 }),
    star: sv('<path d="M12 3.4l2.5 5.3 5.8.8-4.2 4.1 1 5.8-5.1-2.8-5.1 2.8 1-5.8-4.2-4.1 5.8-.8z"/>', { sw: 1.6 }),
    // arrow.up.left.and.arrow.down.right
    expand: sv('<path d="M4.2 9.4V4.2h5.2M4.4 4.4l6.4 6.4M19.8 14.6v5.2h-5.2M19.6 19.6l-6.4-6.4"/>', { sw: 1.6 }),
    // doc.on.doc
    copy: sv('<rect x="3.4" y="7.4" width="12" height="13.6" rx="2.8"/><path d="M8.6 7.4V6.2a2.8 2.8 0 0 1 2.8-2.8h6.4a2.8 2.8 0 0 1 2.8 2.8v8a2.8 2.8 0 0 1-2.8 2.8h-2.4"/>', { sw: 1.5 }),
    // play.circle.fill（三角は抜き色）
    play: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="currentColor"/><path d="M9.7 7.3l7 4.1c.4.2.4.8 0 1l-7 4.1c-.5.3-1-.1-1-.6V7.9c0-.5.5-.9 1-.6z" fill="var(--card)"/></svg>`,
    // mic
    mic: sv('<rect x="8.9" y="2.8" width="6.2" height="12" rx="3.1"/><path d="M5.2 11.4a6.8 6.8 0 0 0 13.6 0M12 18.2v3"/>', { sw: 1.6 }),
    // arrow.left.arrow.right
    swap: sv('<path d="M4.4 8.2h15.2M16 4.6l3.6 3.6-3.6 3.6M19.6 15.8H4.4M8 12.2l-3.6 3.6L8 19.4"/>', { sw: 1.7 }),
    // chevron.down
    chev: sv('<path d="M5.8 9.4l6.2 6.2 6.2-6.2"/>', { sw: 2.4 }),
    // chevron.up.chevron.down
    updown: sv('<path d="M8 9.6l4-4 4 4M8 14.4l4 4 4-4"/>', { sw: 2.6 }),
    // xmark.circle.fill
    clear: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="#b4b4b9"/><path d="M8.4 8.4l7.2 7.2M15.6 8.4l-7.2 7.2" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>`,
    // macwindow（サイドバーを隠す）
    window: sv('<rect x="2.8" y="4.6" width="18.4" height="14.8" rx="3.6"/><path d="M2.9 9.6h18.2"/>', { sw: 1.7 }),
    // sidebar.left（タブバー左端）
    sidebar: sv('<rect x="2.8" y="4.6" width="18.4" height="14.8" rx="3.6"/><path d="M9.5 4.8v14.4M5.5 8.7h1.9M5.5 11.5h1.9"/>', { sw: 1.7 }),
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
