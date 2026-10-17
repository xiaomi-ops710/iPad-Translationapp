/* 翻訳 PWA — iPad「翻訳」アプリ風 UI（日本語）
 * 翻訳: MyMemory API / 読み上げ: Web Speech API / 音声入力: SpeechRecognition / OCR: Tesseract.js(遅延ロード)
 */
'use strict';
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const app = $('#app');

  /* ------------------------------------------------------------------ icons */
  const sv = (body, o = {}) =>
    `<svg viewBox="${o.vb || '0 0 24 24'}" fill="${o.fill || 'none'}" stroke="${o.stroke || 'currentColor'}" stroke-width="${o.sw || 1.7}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
  const I = {
    translate: `<svg viewBox="0 0 32 31" aria-hidden="true"><path d="M4 2.5h13a2.5 2.5 0 0 1 2.5 2.5v8.5A2.5 2.5 0 0 1 17 16h-6.5L6 19.6V16H4a2.5 2.5 0 0 1-2.5-2.5V5A2.5 2.5 0 0 1 4 2.5z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><text x="10.4" y="12.3" text-anchor="middle" font-size="9.6" font-weight="700" fill="currentColor" font-family="-apple-system,Helvetica,Arial,sans-serif">A</text><path d="M16.5 12h10a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H25v3.4L21.1 26h-4.6a3 3 0 0 1-3-3v-8a3 3 0 0 1 3-3z" fill="currentColor" stroke="var(--sb)" stroke-width="1.2"/><text x="21.5" y="23.2" text-anchor="middle" font-size="10.5" font-weight="700" fill="#fff" font-family="-apple-system,'Hiragino Sans',sans-serif">文</text></svg>`,
    camera: sv('<path d="M4 8h3l1.5-2.5h7L17 8h3a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2z"/><circle cx="12" cy="14" r="3.7"/><circle cx="18.4" cy="10.7" r=".7" fill="currentColor"/>', { sw: 1.5 }),
    people: sv('<circle cx="9" cy="8" r="3.1"/><path d="M2.8 20v-1.4a5 5 0 0 1 5-5h2.4a5 5 0 0 1 5 5V20"/><circle cx="17.2" cy="9" r="2.5"/><path d="M17.6 14a4.4 4.4 0 0 1 4.4 4.4V20"/>', { sw: 1.5 }),
    starO: sv('<path d="M12 3.2l2.7 5.5 6 .9-4.4 4.2 1.1 6-5.4-2.9-5.4 2.9 1.1-6-4.4-4.2 6-.9z"/>', { sw: 1.5 }),
    star: sv('<path d="M12 3.2l2.7 5.5 6 .9-4.4 4.2 1.1 6-5.4-2.9-5.4 2.9 1.1-6-4.4-4.2 6-.9z"/>', { sw: 1.5 }),
    expand: sv('<path d="M4 9V4h5M4 4l7 7M20 15v5h-5M20 20l-7-7"/>', { sw: 1.5 }),
    copy: sv('<path d="M9 3h6.5L19 6.5V16a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M15.5 3v3.5H19"/><path d="M8 7H6a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-2"/>', { sw: 1.4 }),
    play: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="currentColor"/><path d="M9.6 7.4l7.2 4.1c.4.2.4.8 0 1l-7.2 4.1c-.4.2-.9 0-.9-.5V7.9c0-.5.5-.7.9-.5z" fill="var(--card)"/></svg>`,
    mic: sv('<rect x="9" y="2.5" width="6" height="12" rx="3"/><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3.5"/>', { sw: 1.6 }),
    swap: sv('<path d="M5 8.5h13.5l-3.2-3.2M19 15.5H5.5l3.2 3.2"/>', { sw: 1.9 }),
    chev: sv('<path d="M5 9l7 7 7-7"/>', { sw: 2.6 }),
    updown: sv('<path d="M8 10l4-4 4 4M8 14l4 4 4-4"/>', { sw: 2.4 }),
    clear: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="#b4b4b9"/><path d="M8.2 8.2l7.6 7.6M15.8 8.2l-7.6 7.6" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>`,
    window: sv('<rect x="3" y="4.5" width="18" height="15" rx="3.2"/><path d="M3 8.6h18"/>', { sw: 1.6 }),
    sidebar: sv('<rect x="3" y="4.5" width="18" height="15" rx="3.2"/><path d="M9.2 4.5v15"/>', { sw: 1.6 }),
    more: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="5" cy="12" r="1.9" fill="currentColor"/><circle cx="12" cy="12" r="1.9" fill="currentColor"/><circle cx="19" cy="12" r="1.9" fill="currentColor"/></svg>`,
    photos: sv('<rect x="3" y="5" width="18" height="14" rx="3"/><circle cx="9" cy="10.2" r="1.6"/><path d="M4 17l5-4.4 3.4 3 3.2-2.6L20 16"/>', { sw: 1.5 }),
    torch: sv('<path d="M8.6 3h6.8v3.6L14 9.4V19a1.2 1.2 0 0 1-1.2 1.2h-1.6A1.2 1.2 0 0 1 10 19V9.4L8.6 6.6z" fill="currentColor"/>', { sw: 1.2 }),
    x: sv('<path d="M5 5l14 14M19 5L5 19"/>', { sw: 2 }),
    check: sv('<path d="M4.5 12.5l5 5L19.5 7"/>', { sw: 2.4 }),
    arrow: sv('<path d="M4 12h15M13.5 6.5L19 12l-5.5 5.5"/>', { sw: 1.8 }),
    bike: `<svg viewBox="0 0 120 80" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="24" cy="56" r="17"/><circle cx="96" cy="56" r="17"/><path d="M24 56l16-30h30l26 30M40 26l22 30h-4M58 16h14M35 16h14l-9 10"/></svg>`,
    bigArrow: `<svg viewBox="0 0 120 40" fill="currentColor" aria-hidden="true"><path d="M2 14h82V4l34 16-34 16V26H2z"/></svg>`
  };

  /* -------------------------------------------------------------- languages */
  // [code, 名称, 短い名称, MyMemory, 音声BCP47, tesseract, 入力プレースホルダ, 会話のプレースホルダ]
  const L = [
    ['ar', 'アラビア語', 'アラビア語', 'ar', 'ar-SA', 'ara', 'أدخل النص', 'انقر على الميكروفون للتحدث'],
    ['zh-CN', '中国語（北京語 - 簡体字）', '中国語（簡体字）', 'zh-CN', 'zh-CN', 'chi_sim', '输入文本', '点击麦克风开始说话'],
    ['zh-TW', '中国語（北京語 - 繁体字）', '中国語（繁体字）', 'zh-TW', 'zh-TW', 'chi_tra', '輸入文字', '輕點麥克風開始說話'],
    ['nl', 'オランダ語', 'オランダ語', 'nl', 'nl-NL', 'nld', 'Voer tekst in', 'Tik op de microfoon om te spreken'],
    ['en-GB', '英語（英国）', '英語（英国）', 'en', 'en-GB', 'eng', 'Enter text', 'Tap mic to speak'],
    ['en-US', '英語（米国）', '英語（米国）', 'en', 'en-US', 'eng', 'Enter text', 'Tap mic to speak'],
    ['fr', 'フランス語', 'フランス語', 'fr', 'fr-FR', 'fra', 'Saisir du texte', 'Touchez le micro pour parler'],
    ['de', 'ドイツ語', 'ドイツ語', 'de', 'de-DE', 'deu', 'Text eingeben', 'Tippe auf das Mikrofon, um zu sprechen'],
    ['hi', 'ヒンディー語', 'ヒンディー語', 'hi', 'hi-IN', 'hin', 'टेक्स्ट दर्ज करें', 'बोलने के लिए माइक पर टैप करें'],
    ['id', 'インドネシア語', 'インドネシア語', 'id', 'id-ID', 'ind', 'Masukkan teks', 'Ketuk mikrofon untuk berbicara'],
    ['it', 'イタリア語', 'イタリア語', 'it', 'it-IT', 'ita', 'Inserisci testo', 'Tocca il microfono per parlare'],
    ['ja', '日本語', '日本語', 'ja', 'ja-JP', 'jpn', 'テキストを入力', 'マイクをタップして話す'],
    ['ko', '韓国語', '韓国語', 'ko', 'ko-KR', 'kor', '텍스트 입력', '마이크를 탭하여 말하기'],
    ['pl', 'ポーランド語', 'ポーランド語', 'pl', 'pl-PL', 'pol', 'Wprowadź tekst', 'Dotknij mikrofonu, aby mówić'],
    ['pt-BR', 'ポルトガル語（ブラジル）', 'ポルトガル語', 'pt-BR', 'pt-BR', 'por', 'Inserir texto', 'Toque no microfone para falar'],
    ['ru', 'ロシア語', 'ロシア語', 'ru', 'ru-RU', 'rus', 'Введите текст', 'Нажмите на микрофон, чтобы говорить'],
    ['es-ES', 'スペイン語（スペイン）', 'スペイン語', 'es', 'es-ES', 'spa', 'Introducir texto', 'Toca el micrófono para hablar'],
    ['th', 'タイ語', 'タイ語', 'th', 'th-TH', 'tha', 'ป้อนข้อความ', 'แตะไมค์เพื่อพูด'],
    ['tr', 'トルコ語', 'トルコ語', 'tr', 'tr-TR', 'tur', 'Metin girin', 'Konuşmak için mikrofona dokunun'],
    ['uk', 'ウクライナ語', 'ウクライナ語', 'uk', 'uk-UA', 'ukr', 'Введіть текст', 'Торкніться мікрофона, щоб говорити'],
    ['vi', 'ベトナム語', 'ベトナム語', 'vi', 'vi-VN', 'vie', 'Nhập văn bản', 'Nhấn vào micrô để nói']
  ].map(([c, name, short, api, sp, tess, enter, mic]) => ({ c, name, short, api, sp, tess, enter, mic }));
  const LB = Object.fromEntries(L.map((l) => [l.c, l]));
  const base = (c) => c.split('-')[0];

  /* ------------------------------------------------------------------ state */
  const KEY = 'xlate.pwa.v1';
  const loadS = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } };
  const S = Object.assign({ src: 'ja', tgt: 'en-US', history: [], layout: null, favOpen: true, speak: false, convSpeak: true, detect: false }, loadS());
  if (!LB[S.src]) S.src = 'ja';
  if (!LB[S.tgt]) S.tgt = 'en-US';
  if (!S.layout) S.layout = window.innerWidth >= 900 ? 'sidebar' : 'tabbar';
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* ignore */ } };

  let view = 'translate';
  let favFilter = null;
  let inputText = '', outText = '', outFor = '', status = 'idle', gender = null;
  let session = [];
  let reqId = 0, tTimer = null, curP = null, rec = null;
  const isNarrow = () => window.innerWidth < 700;
  const layout = () => (isNarrow() ? 'tabbar' : S.layout);
  const nameOf = (c) => LB[c].name;
  const pairLabel = (a, b) => `${LB[a].short} - ${LB[b].short}`;

  /* ------------------------------------------------------------------ utils */
  let toastT;
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastT);
    toastT = setTimeout(() => t.classList.remove('show'), 2200);
  }
  function decode(s) { const t = document.createElement('textarea'); t.innerHTML = s; return t.value; }
  function chunk(text, max = 450) {
    const parts = text.split(/(?<=[.!?。！？\n])\s*/).filter(Boolean);
    const out = []; let cur = '';
    for (const p of parts) {
      if ((cur + p).length > max && cur) { out.push(cur); cur = ''; }
      if (p.length > max) { for (let i = 0; i < p.length; i += max) out.push(p.slice(i, i + max)); } else cur += (cur ? ' ' : '') + p;
    }
    if (cur) out.push(cur);
    return out.length ? out : [text];
  }
  const cache = new Map();
  async function xlate(text, src, tgt, detect) {
    const key = `${detect ? 'auto' : src}|${tgt}|${text}`;
    if (cache.has(key)) return cache.get(key);
    const pair = `${detect ? 'Autodetect' : LB[src].api}|${LB[tgt].api}`;
    const out = [];
    for (const c of chunk(text)) {
      const r = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(c)}&langpair=${encodeURIComponent(pair)}`);
      if (!r.ok) throw new Error('http ' + r.status);
      const j = await r.json();
      const tx = j && j.responseData && j.responseData.translatedText;
      if (!tx || /MYMEMORY WARNING|INVALID/i.test(tx)) throw new Error('limit');
      out.push(decode(tx));
    }
    const res = out.join(' ');
    cache.set(key, res);
    return res;
  }
  function speak(text, code) {
    if (!('speechSynthesis' in window) || !text) { toast('このブラウザでは読み上げを利用できません'); return; }
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = LB[code].sp;
      const vs = speechSynthesis.getVoices();
      const v = vs.find((x) => x.lang.replace('_', '-') === u.lang) || vs.find((x) => x.lang.toLowerCase().startsWith(base(u.lang)));
      if (v) u.voice = v;
      speechSynthesis.speak(u);
    } catch (e) { /* ignore */ }
  }
  function listen(lang, onText, onEnd) {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { toast('このブラウザでは音声入力を利用できません'); return null; }
    const r = new SR();
    r.lang = lang; r.interimResults = true; r.continuous = false;
    r.onresult = (e) => {
      let t = '';
      for (let i = 0; i < e.results.length; i++) t += e.results[i][0].transcript;
      onText(t, e.results[e.results.length - 1].isFinal);
    };
    r.onerror = (e) => { if (e.error !== 'aborted' && e.error !== 'no-speech') toast('音声認識を利用できません（' + e.error + '）'); };
    r.onend = () => onEnd && onEnd();
    try { r.start(); } catch (e) { return null; }
    return r;
  }
  async function copyText(t) {
    try { await navigator.clipboard.writeText(t); toast('コピーしました'); }
    catch (e) {
      const ta = document.createElement('textarea'); ta.value = t; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); toast('コピーしました'); } catch (e2) { toast('コピーできませんでした'); }
      ta.remove();
    }
  }

  /* ------------------------------------------------------- gender selection */
  const GEN = {
    'es-ES': { teacher: [['profesor', 'profesora']], nurse: [['enfermero', 'enfermera']], doctor: [['médico', 'médica'], ['doctor', 'doctora']], friend: [['amigo', 'amiga']], student: [['alumno', 'alumna'], ['estudiante', 'estudiante']] },
    'pt-BR': { teacher: [['professor', 'professora']], nurse: [['enfermeiro', 'enfermeira']], doctor: [['médico', 'médica'], ['doutor', 'doutora']], friend: [['amigo', 'amiga']], student: [['aluno', 'aluna']] },
    fr: { teacher: [['professeur', 'professeure'], ['enseignant', 'enseignante']], nurse: [['infirmier', 'infirmière']], doctor: [['médecin', 'médecin'], ['docteur', 'docteure']], friend: [['ami', 'amie']], student: [['étudiant', 'étudiante'], ['élève', 'élève']] },
    it: { teacher: [['insegnante', 'insegnante'], ['professore', 'professoressa']], nurse: [['infermiere', 'infermiera']], doctor: [['dottore', 'dottoressa'], ['medico', 'medica']], friend: [['amico', 'amica']], student: [['studente', 'studentessa']] },
    de: { teacher: [['Lehrer', 'Lehrerin']], nurse: [['Krankenpfleger', 'Krankenschwester']], doctor: [['Arzt', 'Ärztin']], friend: [['Freund', 'Freundin']], student: [['Student', 'Studentin']] }
  };
  const ART = {
    'es-ES': [['el', 'la'], ['un', 'una'], ['los', 'las'], ['unos', 'unas']],
    'pt-BR': [['o', 'a'], ['um', 'uma'], ['os', 'as'], ['uns', 'umas']],
    fr: [['le', 'la'], ['un', 'une']],
    it: [['il', 'la'], ['lo', 'la'], ['un', 'una']],
    de: [['der', 'die'], ['ein', 'eine']]
  };
  function findGender(srcText, out, srcCode, tgt) {
    const t = GEN[tgt];
    if (!t || base(srcCode) !== 'en' || !out) return null;
    for (const [k, pairs] of Object.entries(t)) {
      if (!new RegExp('\\b' + k + 's?\\b', 'i').test(srcText)) continue;
      for (const pair of pairs) {
        for (const idx of [1, 0]) {
          const form = pair[idx];
          const m = new RegExp('(^|[^\\p{L}])(' + form + ')(?![\\p{L}])', 'iu').exec(out);
          if (m) { const start = m.index + m[1].length; return { start, end: start + form.length, pair, idx: pair[0] === pair[1] ? 0 : idx }; }
        }
      }
    }
    return null;
  }
  function applyGender(g, newIdx, tgt) {
    if (g.pair[0] === g.pair[1]) return;
    const cap = (w, ref) => (ref[0] !== ref[0].toLowerCase() ? w[0].toUpperCase() + w.slice(1) : w);
    let word = g.pair[newIdx];
    const cur = outText.slice(g.start, g.end);
    if (cur[0] === cur[0].toUpperCase() && cur[0] !== cur[0].toLowerCase()) word = word[0].toUpperCase() + word.slice(1);
    else if (tgt !== 'de') word = word[0].toLowerCase() + word.slice(1);
    let before = outText.slice(0, g.start);
    const am = /(\p{L}+)(\s+)$/u.exec(before);
    if (am) {
      const lw = am[1].toLowerCase();
      for (const pr of ART[tgt] || []) {
        const from = pr[g.idx], to = pr[newIdx];
        if (lw === from && from !== to) { before = before.slice(0, am.index) + cap(to, am[1]) + am[2]; break; }
      }
    }
    outText = before + word + outText.slice(g.end);
    gender = findGender(inputText, outText, S.src, tgt);
  }

  /* ----------------------------------------------------------------- render */
  let lastLay = null;
  function render() {
    const lay = layout();
    lastLay = lay;
    const prevScroll = $('#content') ? $('#content').scrollTop : 0;
    const prevView = app.dataset.v;
    app.className = `lay-${lay} view-${view}`;
    app.dataset.v = view;
    app.innerHTML = sidebarHTML() + `<main id="main">${topbarHTML(lay)}<div id="content">${contentHTML()}</div></main>`;
    if (view !== 'camera') stopCam();
    if (view === 'translate') {
      bindLive(); syncLive();
      const c = $('#content');
      c.scrollTop = prevView === 'translate' ? prevScroll : c.scrollHeight;
      if (prevView !== 'translate') requestAnimationFrame(() => { c.scrollTop = c.scrollHeight; });
    } else if (view === 'camera') startCam();
    else if (prevView === 'fav') $('#content').scrollTop = prevScroll;
  }
  function sidebarHTML() {
    const favs = S.history.filter((h) => h.fav);
    const pairs = [...new Set(favs.map((h) => h.src + '>' + h.tgt))];
    const it = (nav, icon, label, on, extra = '') => `<button class="sb-item${on ? ' on' : ''}" data-nav="${nav}" ${extra}>${icon}<span>${label}</span></button>`;
    return `<aside id="sidebar">
      <div class="sb-head"><button class="icon-btn" data-act="layout" aria-label="サイドバーを隠す">${I.window}</button></div>
      <nav>${it('translate', I.translate, '翻訳', view === 'translate')}${it('camera', I.camera, 'カメラ', view === 'camera')}${it('conversation', I.people, '会話', false)}</nav>
      <button class="sb-sec" data-act="favtoggle"><span>お気に入り</span><i class="${S.favOpen ? '' : 'shut'}">${I.chev}</i></button>
      ${S.favOpen ? `<nav>${it('fav', I.starO, 'すべてのお気に入り', view === 'fav' && !favFilter)}${pairs.map((p) => { const [a, b] = p.split('>'); return it('fav', I.starO, esc(pairLabel(a, b)), view === 'fav' && favFilter === p, `data-pair="${p}"`); }).join('')}</nav>` : ''}
    </aside>`;
  }
  function topbarHTML(lay) {
    const tab = (n, label, on) => `<button class="tab${on ? ' on' : ''}" data-nav="${n}">${label}</button>`;
    return `<header id="topbar">${lay === 'tabbar'
      ? `<div class="tabs"><button class="tab tab-ic" data-act="layout" aria-label="サイドバーを表示">${I.sidebar}</button>${tab('translate', '翻訳', view === 'translate')}${tab('camera', 'カメラ', view === 'camera')}${tab('conversation', '会話', false)}${tab('fav', 'お気に入り', view === 'fav')}</div>`
      : ''}${view === 'camera' ? '' : `<button class="more-btn" data-act="more" aria-label="その他">${I.more}</button>`}</header>`;
  }
  function contentHTML() {
    if (view === 'translate') return `<div id="tview"><div id="hist">${session.map((id) => S.history.find((h) => h.id === id)).filter(Boolean).map(cardHTML).join('')}</div>${liveHTML()}</div>`;
    if (view === 'camera') return camHTML();
    return favHTML();
  }
  function cardHTML(h) {
    const sm = (s) => (s.length > 60 ? ' sm' : '');
    return `<article class="card" data-id="${h.id}">
      <div class="half l"><div class="lbl">${esc(nameOf(h.src))}</div><div class="row"><div class="tx${sm(h.s)}" dir="auto">${esc(h.s)}</div><button class="play" data-act="play" data-side="s" aria-label="原文を再生">${I.play}</button></div></div>
      <div class="mid"><div class="vline"></div></div>
      <div class="half r"><div class="lbl t">${esc(nameOf(h.tgt))}</div><div class="row"><div class="tx t${sm(h.t)}" dir="auto">${esc(h.t)}</div><button class="play teal" data-act="play" data-side="t" aria-label="翻訳を再生">${I.play}</button></div>
        <div class="acts"><button data-act="expand" aria-label="拡大">${I.expand}</button><button data-act="fav" class="${h.fav ? 'on' : ''}" aria-label="お気に入り">${I.star}</button><button data-act="copy" aria-label="コピー">${I.copy}</button></div></div>
    </article>`;
  }
  function liveHTML() {
    return `<section class="card live" id="live">
      <div class="half l"><div class="lbl"><button class="lang-sel" data-lang="src" id="lblS"></button></div>
        <div class="row"><textarea id="inp" rows="1" enterkeyhint="go" autocomplete="off" autocorrect="off" spellcheck="false" placeholder="テキストを入力"></textarea>
        <div class="tools"><button class="clr" id="clr" data-act="clear" aria-label="消去">${I.clear}</button><button class="mic" id="micL" data-act="micL" aria-label="音声入力">${I.mic}</button></div></div></div>
      <div class="mid"><div class="vline"></div><button class="swap" data-act="swap" aria-label="言語を入れ替え">${I.swap}</button></div>
      <div class="half r"><div class="lbl t"><button class="lang-sel" data-lang="tgt" id="lblT"></button></div>
        <div class="row"><div class="tx t ph" id="out" dir="auto"></div>
        <div class="tools"><button class="play teal" id="playR" data-act="playLive" aria-label="翻訳を再生">${I.play}</button><button class="mic t" id="micR" data-act="micR" aria-label="音声入力">${I.mic}</button></div></div>
        <div class="acts" id="acts"><button data-act="expandLive" aria-label="拡大">${I.expand}</button><button data-act="favLive" aria-label="お気に入り">${I.star}</button><button data-act="copyLive" aria-label="コピー">${I.copy}</button></div></div>
    </section>`;
  }
  function favHTML() {
    const favs = S.history.filter((h) => h.fav);
    const groups = {};
    favs.slice().reverse().forEach((h) => { (groups[h.src + '>' + h.tgt] = groups[h.src + '>' + h.tgt] || []).push(h); });
    let keys = Object.keys(groups);
    if (favFilter) keys = keys.filter((k) => k === favFilter);
    let html = '';
    if (!keys.length) html += `<div class="empty">${I.starO}<br>お気に入りはまだありません。<br>翻訳結果の ☆ をタップして追加できます。</div>`;
    keys.forEach((k) => { const [a, b] = k.split('>'); html += `<h2 class="section-h">${esc(pairLabel(a, b))}</h2>` + groups[k].map(cardHTML).join(''); });
    if (!favFilter) {
      const rec = S.history.slice().reverse().slice(0, 30);
      if (rec.length) html += `<h2 class="section-h">最近の項目</h2>` + rec.map(cardHTML).join('');
    }
    return html;
  }

  /* ----------------------------------------------------------- live card */
  function autosize(t) { t.style.height = 'auto'; t.style.height = Math.max(44, t.scrollHeight) + 'px'; }
  function bindLive() {
    const inp = $('#inp');
    if (!inp) return;
    inp.value = inputText;
    autosize(inp);
    inp.addEventListener('input', () => { inputText = inp.value; autosize(inp); scheduleTranslate(); syncLive(); });
    inp.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey && !e.isComposing && e.keyCode !== 229) { e.preventDefault(); commit(); }
    });
  }
  function setInput(t) {
    inputText = t;
    const inp = $('#inp');
    if (inp) { inp.value = t; autosize(inp); }
    scheduleTranslate(); syncLive();
  }
  function scheduleTranslate() {
    clearTimeout(tTimer);
    if (!inputText.trim()) { reqId++; outText = ''; outFor = ''; status = 'idle'; gender = null; return; }
    tTimer = setTimeout(doTranslate, 450);
  }
  function doTranslate() {
    const text = inputText.trim();
    if (!text) return Promise.resolve();
    const id = ++reqId;
    status = 'loading'; syncLive();
    curP = (async () => {
      try {
        const r = await xlate(text, S.src, S.tgt, S.detect);
        if (id !== reqId) return;
        outText = r; outFor = text; status = 'idle';
        gender = findGender(text, r, S.src, S.tgt);
        syncLive();
        if (S.speak) speak(r, S.tgt);
      } catch (e) {
        if (id !== reqId) return;
        status = 'error'; outText = ''; outFor = ''; gender = null; syncLive();
      }
    })();
    return curP;
  }
  function syncLive() {
    const out = $('#out');
    if (!out) return;
    const has = !!inputText.trim();
    $('#lblS').innerHTML = `${esc(S.detect ? '言語を検出' : nameOf(S.src))}${I.updown}`;
    $('#lblT').innerHTML = `${esc(nameOf(S.tgt))}${I.updown}`;
    $('#inp').placeholder = 'テキストを入力';
    $('#clr').hidden = !has;
    $('#micL').hidden = has;
    const sm = outText.length > 70 ? ' sm' : '';
    if (!has) { out.className = 'tx t ph'; out.textContent = LB[S.tgt].enter; }
    else if (status === 'error') { out.className = 'tx t err'; out.textContent = '翻訳できませんでした。ネットワーク接続を確認してください。'; }
    else if (!outText) { out.className = 'tx t ph'; out.textContent = '…'; }
    else {
      out.className = 'tx t' + sm;
      if (gender) out.innerHTML = esc(outText.slice(0, gender.start)) + `<span class="gn" data-act="gender">${esc(outText.slice(gender.start, gender.end))}</span>` + esc(outText.slice(gender.end));
      else out.textContent = outText;
    }
    $('#playR').hidden = !outText;
    $('#micR').hidden = has;
    $('#acts').hidden = !outText;
  }
  async function commit(fav) {
    clearTimeout(tTimer);
    const text = inputText.trim();
    if (!text) return;
    if (outFor !== text || status === 'loading') await doTranslate();
    if (!outText || outFor !== text) { toast('翻訳できませんでした'); return; }
    const item = { id: Date.now() + Math.random(), src: S.src, tgt: S.tgt, s: text, t: outText, fav: !!fav };
    S.history.push(item);
    if (S.history.length > 300) S.history = S.history.slice(-300);
    session.push(item.id);
    inputText = ''; outText = ''; outFor = ''; status = 'idle'; gender = null; reqId++;
    save();
    render();
    const c = $('#content'); c.scrollTop = c.scrollHeight;
  }

  /* ------------------------------------------------------------- popovers */
  let popCb = null;
  function closePop() { const p = $('#pop'); if (p) p.remove(); popCb = null; }
  function showPop(anchor, html, o = {}) {
    closePop();
    const p = document.createElement('div');
    p.id = 'pop'; p.className = 'pop'; p.innerHTML = html;
    document.body.appendChild(p);
    const r = anchor.getBoundingClientRect(), pw = p.offsetWidth, ph = p.offsetHeight;
    let x = o.align === 'right' ? r.right - pw : o.align === 'center' ? r.left + r.width / 2 - pw / 2 : r.left;
    x = Math.max(8, Math.min(x, innerWidth - pw - 8));
    let y = r.bottom + 8;
    if (y + ph > innerHeight - 8) y = r.top > ph + 16 ? r.top - ph - 8 : Math.max(8, innerHeight - ph - 8);
    p.style.left = x + 'px'; p.style.top = y + 'px';
    return p;
  }
  function langMenu(anchor, side, afterPick) {
    const other = side === 'src' ? S.tgt : S.src;
    const items = L.map((l) => {
      const same = l.c === other, dis = same || base(l.c) === base(other);
      const sub = same ? '<span class="sub">文字起こしのみ</span>' : '';
      return `<button class="pop-item${dis ? ' dis' : ''}" data-pick="${l.c}" ${dis ? 'data-dis="1"' : ''}>${S[side] === l.c ? `<span class="ck">${I.check}</span>` : ''}<span>${esc(l.name)}${sub}</span></button>`;
    }).join('');
    showPop(anchor, items, { align: 'left' });
    popCb = (c, el) => {
      if (el && el.dataset.dis) return false;
      S[side] = c; save(); afterPick ? afterPick() : afterLang();
    };
  }
  function afterLang() {
    save();
    if (conv.open) renderConv();
    if (view === 'camera') { updateCam(); return; }
    render();
    if (view === 'translate' && inputText.trim()) doTranslate();
  }

  /* ---------------------------------------------------------- full screen */
  function showFull(text) {
    closeFull();
    const d = document.createElement('div');
    d.id = 'full';
    d.innerHTML = `<button class="x" data-act="closeFull" aria-label="閉じる">${I.x}</button><div class="big" dir="auto">${esc(text)}</div>`;
    document.body.appendChild(d);
  }
  function closeFull() { const f = $('#full'); if (f) f.remove(); }

  /* --------------------------------------------------------------- camera */
  let stream = null, paused = false, camBusy = false, camTimer = null, torchOn = false, photoMode = false, demo = false;
  let worker = null, workerLang = null;
  function camHTML() {
    return `<div id="cam">
      <video id="camv" playsinline muted autoplay></video><img id="camimg" alt="" hidden>
      <div id="camdemo" hidden><div class="demo-bg"><div class="demo-sign"><div class="ov" id="demoOv" hidden></div>${I.bike}${I.bigArrow}</div></div><div class="demo-note">カメラを利用できないためデモ画面を表示しています</div></div>
      <div id="camov"></div>
      <div class="cam-hint" id="camHint">シャッターボタンをタップして一時停止</div>
      <div class="cam-ctl"><button data-act="camPhotos" aria-label="写真を選択">${I.photos}</button><button class="shutter" id="shutter" data-act="shutter" aria-label="一時停止"><i></i></button><button class="torch" id="torch" data-act="torch" aria-label="ライト">${I.torch}</button></div>
      <div class="cam-langs"><button class="lang-sel" data-lang="src" id="cLs"></button><span class="arr">${I.arrow}</span><button class="lang-sel" data-lang="tgt" id="cLt"></button></div>
      <input type="file" id="camfile" accept="image/*" hidden>
    </div>`;
  }
  function updateCam() {
    const a = $('#cLs'), b = $('#cLt');
    if (a) a.innerHTML = `${esc(LB[S.src].short)}${I.updown}`;
    if (b) b.innerHTML = `${esc(LB[S.tgt].short)}${I.updown}`;
    clearOv();
    if (demo) showDemoOv();
    else if (paused || photoMode) scanOnce();
  }
  function clearOv() { const o = $('#camov'); if (o) o.innerHTML = ''; }
  async function startCam() {
    updateCam();
    const v = $('#camv'); if (!v) return;
    if (paused) $('#shutter').classList.add('paused');
    $('#camfile').addEventListener('change', onPhoto);
    if (photoMode) { $('#camimg').hidden = false; return; }
    try {
      if (!stream) {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) throw new Error('nocam');
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' }, width: { ideal: 1920 }, height: { ideal: 1080 } }, audio: false });
      }
      if (view !== 'camera') { stopCam(); return; }
      demo = false;
      const vv = $('#camv'); vv.srcObject = stream; await vv.play().catch(() => {});
      if (paused) vv.pause();
      scheduleScan(600);
    } catch (e) {
      demo = true;
      const d = $('#camdemo'); if (d) { d.hidden = false; $('#camv').hidden = true; showDemoOv(); }
    }
  }
  function stopCam() {
    clearTimeout(camTimer);
    if (stream) { stream.getTracks().forEach((t) => t.stop()); stream = null; }
    torchOn = false; paused = false; photoMode = false;
  }
  async function showDemoOv() {
    const ov = $('#demoOv'); if (!ov) return;
    ov.hidden = false; ov.textContent = '…';
    const s = 'Camino de las tres águilas';
    try { ov.textContent = S.tgt === 'es-ES' ? s : await xlate(s, 'es-ES', S.tgt); } catch (e) { ov.textContent = s; }
  }
  function scheduleScan(ms) { clearTimeout(camTimer); camTimer = setTimeout(scanOnce, ms == null ? 1500 : ms); }
  function loadScript(src) {
    return new Promise((res, rej) => { const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = () => rej(new Error('script')); document.head.appendChild(s); });
  }
  async function getWorker(lang) {
    if (!window.Tesseract) await loadScript('https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js');
    if (worker && workerLang === lang) return worker;
    if (worker) { try { await worker.terminate(); } catch (e) { /* ignore */ } worker = null; }
    worker = await window.Tesseract.createWorker(lang);
    workerLang = lang;
    return worker;
  }
  function getLines(d) {
    if (d.lines && d.lines.length) return d.lines;
    const out = [];
    (d.blocks || []).forEach((b) => (b.paragraphs || []).forEach((p) => (p.lines || []).forEach((l) => out.push(l))));
    return out;
  }
  function media() {
    if (photoMode) { const im = $('#camimg'); return im && im.naturalWidth ? { el: im, w: im.naturalWidth, h: im.naturalHeight } : null; }
    const v = $('#camv'); return v && v.videoWidth ? { el: v, w: v.videoWidth, h: v.videoHeight } : null;
  }
  async function scanOnce() {
    if (view !== 'camera' || demo || camBusy) return;
    const m = media();
    if (!m) { if (!paused && !photoMode) scheduleScan(800); return; }
    camBusy = true;
    const hint = $('#camHint');
    const myLang = S.src;
    try {
      const cw = Math.min(1100, m.w), f = cw / m.w, ch = Math.round(m.h * f);
      const cv = document.createElement('canvas'); cv.width = cw; cv.height = ch;
      cv.getContext('2d').drawImage(m.el, 0, 0, cw, ch);
      if (hint) hint.textContent = 'テキストを認識しています…';
      const w = await getWorker(LB[myLang].tess);
      const { data } = await w.recognize(cv);
      const lines = getLines(data).filter((l) => l.text && l.text.trim().length > 1 && (l.confidence == null || l.confidence > 55)).slice(0, 10);
      const results = await Promise.all(lines.map(async (l) => {
        const txt = l.text.replace(/\s+/g, ' ').trim();
        try { return { l, t: await xlate(txt, myLang, S.tgt) }; } catch (e) { return null; }
      }));
      if (view !== 'camera' || myLang !== S.src) return;
      const cam = $('#cam'); if (!cam) return;
      const ew = cam.clientWidth, eh = cam.clientHeight, sc = Math.max(ew / m.w, eh / m.h);
      const ox = (m.w * sc - ew) / 2, oy = (m.h * sc - eh) / 2;
      const ovEl = $('#camov'); ovEl.innerHTML = '';
      results.filter(Boolean).forEach(({ l, t }) => {
        const b = l.bbox, x = (b.x0 / f) * sc - ox, y = (b.y0 / f) * sc - oy, w2 = ((b.x1 - b.x0) / f) * sc, h2 = ((b.y1 - b.y0) / f) * sc;
        const d = document.createElement('div');
        d.className = 'ov';
        d.style.cssText = `left:${x - 4}px;top:${y - 3}px;min-width:${w2 + 8}px;height:${h2 + 6}px;font-size:${Math.max(11, Math.min(h2 * 0.7, 44))}px`;
        d.textContent = t;
        ovEl.appendChild(d);
      });
      if (hint) hint.textContent = paused || photoMode ? 'もう一度タップして再開' : 'シャッターボタンをタップして一時停止';
    } catch (e) {
      if (hint) hint.textContent = 'テキストを認識できませんでした';
    } finally {
      camBusy = false;
      if (!paused && !photoMode && view === 'camera') scheduleScan(1200);
    }
  }
  function onPhoto(e) {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const im = $('#camimg');
    im.onload = () => { photoMode = true; paused = true; $('#shutter').classList.add('paused'); im.hidden = false; $('#camv').hidden = true; clearOv(); scanOnce(); };
    im.src = URL.createObjectURL(f);
    e.target.value = '';
  }

  /* ----------------------------------------------------------- conversation */
  const conv = { open: false, msgs: [], rec: null, focus: null };
  function openConv() { conv.open = true; renderConv(); }
  function closeConv() { if (conv.rec) { try { conv.rec.stop(); } catch (e) { /* ignore */ } conv.rec = null; } conv.open = false; const c = $('#conv'); if (c) c.remove(); }
  function half(side) {
    const code = side === 'a' ? S.src : S.tgt;
    const msgs = conv.msgs.map((m, i) => {
      const own = m.from === side, txt = own ? m.text : m.trans;
      return `<div class="msg ${own ? 'own' : 'oth'}"><button class="play ${own ? '' : 'teal'}" data-act="cplay" data-i="${i}" data-side="${side}" aria-label="再生">${I.play}</button><div class="bub${own ? '' : ' t'}" dir="auto">${esc(txt)}</div></div>`;
    }).join('');
    return `<section class="cv-half ${side === 'a' ? 'bot' : 'top'}">
      <div class="cv-msgs" id="msgs-${side}">${msgs}</div>
      <div class="cv-in"><button class="lang-sel" data-clang="${side}">${esc(LB[code].name)}${I.updown}</button><input data-cin="${side}" dir="auto" enterkeyhint="send" autocomplete="off" autocorrect="off" spellcheck="false" placeholder="${esc(LB[code].mic)}"></div>
      <button class="cv-mic${conv.rec && conv.recSide === side ? ' rec' : ''}" data-act="cmic" data-side="${side}" aria-label="音声入力">${I.mic}</button>
    </section>`;
  }
  function renderConv() {
    let el = $('#conv');
    if (!el) { el = document.createElement('div'); el.id = 'conv'; document.body.appendChild(el); }
    const keep = {};
    $$('[data-cin]', el).forEach((i) => (keep[i.dataset.cin] = i.value));
    el.innerHTML = `<button class="cv-x" data-act="convclose" aria-label="閉じる">${I.x}</button>${half('b')}<div class="cv-mid"><button class="swap" data-act="swap" aria-label="言語を入れ替え">${I.swap}</button></div>${half('a')}<button class="cv-more" data-act="more" aria-label="その他">${I.more}</button>`;
    $$('[data-cin]', el).forEach((i) => { if (keep[i.dataset.cin]) i.value = keep[i.dataset.cin]; });
    ['a', 'b'].forEach((s) => { const m = $('#msgs-' + s); if (m) m.scrollTop = m.scrollHeight; });
    if (conv.focus) { const i = $(`[data-cin="${conv.focus}"]`); if (i) i.focus(); }
  }
  async function csend(side, text) {
    text = (text || '').trim();
    if (!text) return;
    const fl = side === 'a' ? S.src : S.tgt, tl = side === 'a' ? S.tgt : S.src;
    const m = { from: side, text, trans: '…' };
    conv.msgs.push(m);
    const inp = $(`[data-cin="${side}"]`); if (inp) inp.value = '';
    renderConv();
    try { m.trans = await xlate(text, fl, tl); } catch (e) { m.trans = '（翻訳できませんでした）'; }
    renderConv();
    if (S.convSpeak && !m.trans.startsWith('（')) speak(m.trans, tl);
  }
  function cmic(side) {
    if (conv.rec) { try { conv.rec.stop(); } catch (e) { /* ignore */ } return; }
    const lang = LB[side === 'a' ? S.src : S.tgt].sp;
    const r = listen(lang, (t, fin) => {
      const inp = $(`[data-cin="${side}"]`); if (inp) inp.value = t;
      if (fin) csend(side, t);
    }, () => { conv.rec = null; conv.recSide = null; $$('.cv-mic').forEach((b) => b.classList.remove('rec')); });
    if (!r) { const i = $(`[data-cin="${side}"]`); if (i) i.focus(); return; }
    conv.rec = r; conv.recSide = side;
    $(`.cv-mic[data-side="${side}"]`).classList.add('rec');
  }

  /* ----------------------------------------------------------------- events */
  function nav(name, pair) {
    closePop();
    if (name === 'conversation') { openConv(); return; }
    view = name; favFilter = name === 'fav' ? (pair || null) : null;
    render();
  }
  const itemOf = (el) => { const c = el.closest('[data-id]'); return c ? S.history.find((h) => String(h.id) === c.dataset.id) : null; };

  document.addEventListener('click', (e) => {
    const t = e.target;
    const pick = t.closest('[data-pick]');
    if (pick) {
      const cb = popCb;
      if (cb) { const r = cb(pick.dataset.pick, pick); if (r === false) return; }
      closePop();
      return;
    }
    if (!t.closest('#pop')) closePop();
    const nv = t.closest('[data-nav]');
    if (nv) { nav(nv.dataset.nav, nv.dataset.pair); return; }
    const lg = t.closest('[data-lang]');
    if (lg) { langMenu(lg, lg.dataset.lang); return; }
    const cl = t.closest('[data-clang]');
    if (cl) { langMenu(cl, cl.dataset.clang === 'a' ? 'src' : 'tgt', () => { save(); renderConv(); }); return; }
    const a = t.closest('[data-act]');
    if (a) act(a.dataset.act, a, e);
  });
  document.addEventListener('keydown', (e) => {
    const t = e.target;
    if (t && t.dataset && t.dataset.cin) {
      conv.focus = t.dataset.cin;
      if (e.key === 'Enter' && !e.isComposing && e.keyCode !== 229) { e.preventDefault(); csend(t.dataset.cin, t.value); }
    }
    if (e.key === 'Escape') { closePop(); closeFull(); }
  });
  document.addEventListener('focusout', (e) => { if (e.target && e.target.dataset && e.target.dataset.cin) conv.focus = null; });

  function act(name, el, e) {
    switch (name) {
      case 'layout': S.layout = S.layout === 'sidebar' ? 'tabbar' : 'sidebar'; save(); app.dataset.anim = '1'; render(); setTimeout(() => delete app.dataset.anim, 450); break;
      case 'favtoggle': S.favOpen = !S.favOpen; save(); render(); break;
      case 'swap': {
        [S.src, S.tgt] = [S.tgt, S.src];
        if (S.detect) S.detect = false;
        if (!conv.open && view === 'translate' && outText) { inputText = outText; outText = ''; outFor = ''; }
        save();
        if (conv.open) renderConv(); else afterLang();
        break;
      }
      case 'clear': inputText = ''; outText = ''; outFor = ''; status = 'idle'; gender = null; reqId++; { const i = $('#inp'); if (i) { i.value = ''; autosize(i); i.focus(); } } syncLive(); break;
      case 'micL': dictate(false); break;
      case 'micR': dictate(true); break;
      case 'playLive': speak(outText, S.tgt); break;
      case 'expandLive': showFull(outText); break;
      case 'copyLive': copyText(outText); break;
      case 'favLive': commit(true).then(() => toast('お気に入りに追加しました')); break;
      case 'gender': {
        if (!gender) break;
        const g = gender;
        const opt = (i, label) => `<button class="pop-item" data-pick="${i}">${g.idx === i ? `<span class="ck">${I.check}</span>` : ''}<span>${label}<span class="sub">${esc(g.pair[i])}</span></span></button>`;
        showPop(el, `<div class="pop-h">性別を選択</div>${opt(0, '男性')}${opt(1, '女性')}`, { align: 'left' });
        popCb = (i) => { applyGender(g, Number(i), S.tgt); syncLive(); };
        e.stopPropagation();
        break;
      }
      case 'play': { const h = itemOf(el); if (h) el.dataset.side === 's' ? speak(h.s, h.src) : speak(h.t, h.tgt); break; }
      case 'expand': { const h = itemOf(el); if (h) showFull(h.t); break; }
      case 'copy': { const h = itemOf(el); if (h) copyText(h.t); break; }
      case 'fav': { const h = itemOf(el); if (h) { h.fav = !h.fav; save(); render(); } break; }
      case 'closeFull': closeFull(); break;
      case 'convclose': closeConv(); break;
      case 'cmic': cmic(el.dataset.side); break;
      case 'cplay': {
        const m = conv.msgs[Number(el.dataset.i)]; if (!m) break;
        const side = el.dataset.side, own = m.from === side;
        speak(own ? m.text : m.trans, side === 'a' ? S.src : S.tgt); break;
      }
      case 'shutter': {
        const v = $('#camv'), sh = $('#shutter');
        if (demo) { toast('デモ画面では一時停止できません'); break; }
        paused = !paused;
        sh.classList.toggle('paused', paused);
        if (photoMode && !paused) { photoMode = false; $('#camimg').hidden = true; $('#camv').hidden = false; }
        if (paused) { clearTimeout(camTimer); if (v && !photoMode) v.pause(); scanOnce(); }
        else { if (v) v.play().catch(() => {}); clearOv(); $('#camHint').textContent = 'シャッターボタンをタップして一時停止'; scheduleScan(400); }
        break;
      }
      case 'camPhotos': $('#camfile').click(); break;
      case 'torch': torchToggle(el); break;
      case 'more': moreMenu(el); break;
    }
  }
  function dictate(swapFirst) {
    if (rec) { try { rec.stop(); } catch (e) { /* ignore */ } return; }
    if (swapFirst) { [S.src, S.tgt] = [S.tgt, S.src]; S.detect = false; save(); render(); }
    const btn = $(swapFirst ? '#micL' : '#micL');
    const r = listen(LB[S.src].sp, (t) => setInput(t), () => { rec = null; $$('.mic').forEach((b) => b.classList.remove('rec')); });
    if (!r) { const i = $('#inp'); if (i) i.focus(); return; }
    rec = r;
    if (btn) btn.classList.add('rec');
  }
  async function torchToggle(el) {
    const tr = stream && stream.getVideoTracks()[0];
    const cap = tr && tr.getCapabilities ? tr.getCapabilities() : null;
    if (!cap || !cap.torch) { toast('このデバイスではライトを使用できません'); return; }
    try { torchOn = !torchOn; await tr.applyConstraints({ advanced: [{ torch: torchOn }] }); el.classList.toggle('on', torchOn); } catch (e) { torchOn = false; toast('ライトを切り替えられませんでした'); }
  }
  function moreMenu(el) {
    const ck = (on) => (on ? `<span class="ck">${I.check}</span>` : '');
    let html, cb;
    if (conv.open) {
      html = `<button class="pop-item" data-pick="cs">${ck(S.convSpeak)}翻訳を自動再生</button><button class="pop-item danger" data-pick="cc">会話を消去</button>`;
      cb = (k) => { if (k === 'cs') { S.convSpeak = !S.convSpeak; save(); } if (k === 'cc') { conv.msgs = []; renderConv(); } };
    } else {
      html = `<button class="pop-item" data-pick="sp">${ck(S.speak)}翻訳を自動再生</button><button class="pop-item" data-pick="det">${ck(S.detect)}言語を自動検出</button><button class="pop-item danger" data-pick="clr">履歴を消去</button>`;
      cb = (k) => {
        if (k === 'sp') { S.speak = !S.speak; save(); }
        if (k === 'det') { S.detect = !S.detect; save(); render(); if (inputText.trim()) doTranslate(); }
        if (k === 'clr') { if (confirm('翻訳の履歴とお気に入りをすべて消去しますか？')) { S.history = []; session = []; favFilter = null; save(); render(); } }
      };
    }
    showPop(el, html, { align: 'right' });
    popCb = cb;
  }

  window.addEventListener('resize', () => { if (layout() !== lastLay) render(); });
  if ('speechSynthesis' in window) speechSynthesis.getVoices();
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));

  render();
})();
