/* Inglizcha Qadam — asosiy kod */
(function () {
  "use strict";
  var ADMIN_PIN = "2302";          // admin panel PIN kodi (xohlasangiz o'zgartiring)
  var PASS = 80;                   // keyingi betga o'tish uchun foiz
  var LS_PROG = "iq_progress", LS_DRAFT = "iq_draft", LS_ADMIN = "iq_admin";

  var view = document.getElementById("view");
  var titleEl = document.getElementById("title");
  var backBtn = document.getElementById("back");
  var CONTENT = { videos: [], pages: { B1: [], B2: [], C1: [] } };

  /* ---------- yordamchilar ---------- */
  function load(k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }
  function save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function el(html) { var d = document.createElement("div"); d.innerHTML = html.trim(); return d.firstChild; }
  function toast(t) { var x = document.getElementById("toast"); x.textContent = t; x.hidden = false; clearTimeout(toast._t); toast._t = setTimeout(function () { x.hidden = true; }, 2200); }
  function norm(s) {
    return String(s || "").toLowerCase().replace(/[‘’ʼ`´]/g, "'").replace(/[“”]/g, '"')
      .replace(/\s+/g, " ").replace(/^[\s.,!?;:]+|[\s.,!?;:]+$/g, "").trim();
  }
  function shuffle(n) { var a = []; for (var i = 0; i < n; i++) a.push(i); for (var j = n - 1; j > 0; j--) { var r = Math.floor(Math.random() * (j + 1)); var t = a[j]; a[j] = a[r]; a[r] = t; } return a; }
  function setHeader(t, back) { titleEl.textContent = t; backBtn.hidden = !back; backBtn.onclick = function () { location.hash = back || "#/"; }; window.scrollTo(0, 0); }

  function prog() { return load(LS_PROG, { levels: {}, watched: {} }); }
  function setScore(L, i, pct) { var p = prog(); p.levels[L] = p.levels[L] || {}; var old = p.levels[L][i] || 0; if (pct > old) p.levels[L][i] = pct; save(LS_PROG, p); }
  function score(L, i) { var p = prog(); return (p.levels[L] && p.levels[L][i]) || 0; }
  function unlocked(L, i) { return i === 0 || score(L, i - 1) >= PASS; }

  function content() { return load(LS_DRAFT, null) || CONTENT; }
  function pagesOf(L) { var base = (window.LEVELS[L] && window.LEVELS[L].pages) || []; var extra = (content().pages && content().pages[L]) || []; return base.concat(extra.map(function (p) { p._custom = true; return p; })); }

  /* ---------- bosh sahifa ---------- */
  function home() {
    setHeader("Botir bilan CEFR kurslari", null);
    var p = prog(), vids = content().videos || [];
    var watched = Object.keys(p.watched || {}).length;
    var h = '<div class="hero"><h2>Botir bilan CEFR kurslari 🚀</h2><p>Ingliz tilini noldan CEFR sertifikatigacha. Har bir unit: animatsion dars → mashqlar → listening → speaking. Har betdan ' + PASS + '% to\'g\'ri javob bilan keyingisi ochiladi.</p></div><div class="grid">';
    h += '<button class="tile" data-go="#/videos"><span class="badge" style="background:linear-gradient(135deg,#f97316,#ec4899)">▶</span><span><b>Videodarslar</b><small>Noldan boshlovchilar uchun · ' + vids.length + ' ta dars</small><div class="bar-p"><i style="width:' + (vids.length ? Math.round(100 * Math.min(watched, vids.length) / vids.length) : 0) + '%"></i></div></span></button>';
    var vs = vocStats();
    h += '<button class="tile" data-go="#/vocab"><span class="badge" style="background:linear-gradient(135deg,#f59e0b,#ef4444)">Aa</span><span><b>Lug\'at o\'yinlari</b><small>' + vs.learned + ' / ' + vs.total + ' so\'z o\'rganildi</small><div class="bar-p"><i style="width:' + Math.round(100 * vs.learned / Math.max(1, vs.total)) + '%"></i></div></span></button>';
    var ir = irrList(), st0 = vstate(), il = ir.filter(function (v) { return st0[v.id] && st0[v.id].b >= 3; }).length;
    h += '<button class="tile" data-go="#/irr"><span class="badge" style="background:linear-gradient(135deg,#14b8a6,#6366f1);font-size:14px">V3</span><span><b>Noto\'g\'ri fe\'llar</b><small>' + il + ' / ' + ir.length + ' fe\'l · V1 – V2 – V3</small><div class="bar-p"><i style="width:' + Math.round(100 * il / Math.max(1, ir.length)) + '%"></i></div></span></button>';
    h += '<button class="tile" data-go="#/cefr"><span class="badge" style="background:linear-gradient(135deg,#0ea5e9,#22c55e)">🎓</span><span><b>CEFR tayyorlov</b><small>Listening va Speaking mashg\'ulotlari</small></span></button>';
    ["B1", "B2", "C1"].forEach(function (L) {
      var lv = window.LEVELS[L], pages = pagesOf(L), done = 0;
      pages.forEach(function (_, i) { if (score(L, i) >= PASS) done++; });
      h += '<button class="tile" data-go="#/level/' + L + '"><span class="badge" style="background:' + lv.color + '">' + L + '</span><span><b>' + L + ' mashqlari</b><small>' + lv.sub + ' · ' + pages.length + ' bet</small><div class="bar-p"><i style="width:' + Math.round(100 * done / Math.max(1, pages.length)) + '%"></i></div></span><span class="right">' + done + '/' + pages.length + '</span></button>';
    });
    h += '</div><div class="card set"><b>⚙️ Sozlamalar</b><button class="del" id="tv">' + (musicOn() ? "🎵 Darsda fon musiqasi: yoqilgan" : "🔇 Darsda fon musiqasi: o'chirilgan") + '</button><button class="del" id="ts">' + (sfxOn() ? "🔔 Klaviatura va topshiriq ovozlari: yoqilgan" : "🔕 Klaviatura va topshiriq ovozlari: o'chirilgan") + '</button></div><p class="muted" style="text-align:center;margin-top:18px" id="adm">© Raufov H.R.</p>';
    view.innerHTML = h;
    bindGo();
    document.getElementById("tv").onclick = function () { save(LS_MUSIC, !musicOn()); home(); };
    document.getElementById("ts").onclick = function () { save(LS_SFX, !sfxOn()); home(); sfx("ok"); };
    // admin panelga kirish: muallif yozuviga 5 marta bosish
    var n = 0, a = document.getElementById("adm");
    a.onclick = function () { if (++n >= 5) location.hash = "#/admin"; };
  }
  function bindGo() { view.querySelectorAll("[data-go]").forEach(function (b) { b.onclick = function () { var g = b.getAttribute("data-go"); if (location.hash === g) route(); else location.hash = g; }; }); }

  /* ---------- videodarslar ---------- */
  function parseLink(link) {
    link = String(link || "").trim();
    var m;
    if ((m = link.match(/t\.me\/c\/(\d+)\/(\d+)/))) return { kind: "tgprivate", url: link };
    if ((m = link.match(/t\.me\/(?:s\/)?([A-Za-z0-9_]{4,})\/(\d+)/))) return { kind: "tg", post: m[1] + "/" + m[2], url: "https://t.me/" + m[1] + "/" + m[2] };
    if ((m = link.match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{11})/))) return { kind: "yt", id: m[1], url: link };
    if (/\.(mp4|webm|m3u8)(\?|$)/i.test(link)) return { kind: "file", url: link };
    return { kind: "link", url: link };
  }
  function videos() {
    setHeader("Videodarslar", "#/");
    var vids = content().videos || [], p = prog();
    if (!vids.length) { view.innerHTML = '<div class="card">Videodarslar hali qo\'shilmagan. Tez orada shu yerda paydo bo\'ladi!</div>'; return; }
    var h = '<div class="grid">';
    vids.forEach(function (v, i) {
      var w = p.watched && p.watched[i];
      h += '<button class="tile" data-go="#/video/' + i + '"><span class="badge" style="background:' + (w ? "#16a34a" : "linear-gradient(135deg,#f97316,#ec4899)") + '">' + (w ? "✓" : (i + 1)) + '</span><span><b>' + esc(v.title) + '</b><small>' + esc(v.desc || "") + '</small></span></button>';
    });
    view.innerHTML = h + '</div>';
    bindGo();
  }
  function video(i) {
    var vids = content().videos || [], v = vids[i];
    if (!v) return videos();
    setHeader((i + 1) + "-dars", "#/videos");
    var L = parseLink(v.link), h = '<div class="card"><h3>' + esc(v.title) + '</h3>' + (v.desc ? '<p class="muted">' + esc(v.desc) + '</p>' : '');
    if (L.kind === "tg") h += '<div class="tgpost" id="tgpost"></div><button class="btn tg" id="open">Telegramda ochish</button>';
    else if (L.kind === "yt") h += '<div class="video-wrap"><iframe style="width:100%;aspect-ratio:16/9;border:0" src="https://www.youtube.com/embed/' + L.id + '?rel=0" allowfullscreen allow="autoplay; encrypted-media; picture-in-picture"></iframe></div>';
    else if (L.kind === "file") h += '<div class="video-wrap"><video controls playsinline src="' + esc(L.url) + '"></video></div>';
    else h += '<p style="margin:10px 0">Bu dars Telegram kanalda joylashgan. Ko\'rish uchun tugmani bosing.</p><button class="btn tg" id="open">▶ Darsni Telegramda ko\'rish</button>' + (L.kind === "tgprivate" ? '<p class="muted" style="margin-top:6px">Yopiq kanal: video ochilishi uchun kanalga a\'zo bo\'lishingiz kerak.</p>' : '');
    h += '</div><button class="btn green" id="done">✓ Darsni ko\'rdim</button>';
    if (i + 1 < vids.length) h += '<button class="btn alt" data-go="#/video/' + (i + 1) + '">Keyingi dars ›</button>';
    view.innerHTML = h;
    bindGo();
    var o = document.getElementById("open"); if (o) o.onclick = function () { window.open(L.url, "_blank"); };
    if (L.kind === "tg") {
      var s = document.createElement("script"); s.async = true; s.src = "https://telegram.org/js/telegram-widget.js?22";
      s.setAttribute("data-telegram-post", L.post); s.setAttribute("data-width", "100%");
      document.getElementById("tgpost").appendChild(s);
    }
    document.getElementById("done").onclick = function () {
      var p = prog(); p.watched = p.watched || {}; p.watched[i] = 1; save(LS_PROG, p); toast("Barakalla! 👏");
      if (i + 1 < vids.length) location.hash = "#/video/" + (i + 1); else location.hash = "#/videos";
    };
  }

  /* ---------- daraja ---------- */
  function level(L) {
    var lv = window.LEVELS[L]; if (!lv) return home();
    setHeader(L + " · " + lv.sub, "#/");
    var pages = pagesOf(L), h = '<div class="grid">';
    pages.forEach(function (pg, i) {
      var ok = unlocked(L, i), sc = score(L, i);
      h += '<button class="tile ' + (ok ? "" : "locked") + '" ' + (ok ? 'data-go="#/page/' + L + '/' + i + '"' : 'data-lock="1"') + '><span class="badge" style="background:' + (sc >= PASS ? "#16a34a" : lv.color) + '">' + (ok ? (sc >= PASS ? "✓" : (i + 1)) : "🔒") + '</span><span><b>' + (i + 1) + '-bet' + (pg._custom ? '<span class="pill">Kitob</span>' : '') + '</b><small>' + esc(pg.title) + '</small></span><span class="right">' + (sc ? sc + "%" : "") + '</span></button>';
    });
    view.innerHTML = h + '</div>';
    bindGo();
    view.querySelectorAll("[data-lock]").forEach(function (b) { b.onclick = function () { toast("Avval oldingi betdan " + PASS + "% to'plang 🔒"); }; });
  }

  /* ---------- bet (mashqlar) ---------- */
  var TYPE = { mc: "To'g'ri variantni tanlang", gap: "Bo'sh joyni to'ldiring", wf: "So'z yasash: katta harfli so'zdan foydalaning", kw: "Kalit so'z bilan qayta yozing (2–5 so'z)" };
  function page(L, i) {
    var pages = pagesOf(L), pg = pages[i];
    if (!pg) return level(L);
    if (!unlocked(L, i)) { toast("Bu bet hali yopiq 🔒"); location.hash = "#/level/" + L; return; }
    if (!pg.review && !lessonSeen(L, i) && !page._force) return lesson(L, i);
    page._force = false;
    setHeader(L + " · " + (i + 1) + "-bet", "#/level/" + L);
    var h = tabs(L, i, "page") + (pg.review ? '' : '<button class="btn tg" id="rewatch" style="margin:0 0 14px">▶ Videodarsni qayta ko\'rish</button>') +
      (pg.explain ? explainHTML(pg) : '<div class="card theory"><h3>' + esc(pg.title) + '</h3>' + esc(pg.theory || "") + '</div>') + '<h3 class="sec">✏️ Mashqlar</h3><div id="qs">';
    var orders = [];
    (pg.qs || []).forEach(function (q, k) {
      h += '<div class="card q" data-k="' + k + '"><span class="num">' + (k + 1) + '</span><span class="type">' + TYPE[q.t] + '</span>';
      if (q.t === "kw") h += '<p class="orig">' + esc(q.s) + '</p><p><span class="key">' + esc(q.k) + '</span></p>';
      h += '<p>' + esc(q.q).replace(/_{3,}/g, "<b>______</b>") + (q.t === "wf" ? ' <span class="key">' + esc(q.w) + '</span>' : '') + '</p>';
      if (q.t === "mc") {
        var ord = shuffle(q.o.length); orders[k] = ord;
        h += '<div class="opts">' + ord.map(function (oi) { return '<button class="opt" data-o="' + oi + '">' + esc(q.o[oi]) + '</button>'; }).join("") + '</div>';
      } else h += '<input class="ans" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Javobingiz...">';
      h += '<div class="fix" hidden></div></div>';
    });
    h += '</div><div id="res"></div><button class="btn" id="check">Tekshirish</button>';
    view.innerHTML = h;
    view.querySelectorAll(".opts").forEach(function (box) {
      box.querySelectorAll(".opt").forEach(function (b) { b.onclick = function () { if (box.dataset.locked) return; box.querySelectorAll(".opt").forEach(function (x) { x.classList.remove("sel"); }); b.classList.add("sel"); }; });
    });
    document.getElementById("check").onclick = function () { check(L, i, pg, pages.length); };
    var rw = document.getElementById("rewatch"); if (rw) rw.onclick = function () { lesson(L, i); };
    bindGo();
  }
  function check(L, i, pg, total) {
    var qs = pg.qs || [], right = 0, empty = 0;
    view.querySelectorAll(".q").forEach(function (box) {
      var q = qs[+box.dataset.k], ok = false, fix = box.querySelector(".fix");
      if (q.t === "mc") {
        var sel = box.querySelector(".opt.sel");
        if (!sel) empty++;
        ok = sel && +sel.dataset.o === q.a;
        box.querySelector(".opts").dataset.locked = 1;
        box.querySelectorAll(".opt").forEach(function (b) { if (+b.dataset.o === q.a) b.classList.add("right"); else if (b === sel) b.classList.add("wrong"); });
        if (!ok) { fix.hidden = false; fix.textContent = "To'g'ri javob: " + q.o[q.a]; }
      } else {
        var inp = box.querySelector(".ans"), v = norm(inp.value);
        if (!v) empty++;
        ok = (q.a || []).some(function (a) { return norm(a) === v; });
        inp.classList.add(ok ? "right" : "wrong"); inp.readOnly = true;
        if (!ok) { fix.hidden = false; fix.textContent = "To'g'ri javob: " + q.a[0]; }
      }
      if (ok) right++;
    });
    var pct = Math.round(100 * right / Math.max(1, qs.length));
    setScore(L, i, pct);
    var pass = pct >= PASS, res = document.getElementById("res"), last = i + 1 >= total;
    res.innerHTML = '<div class="result ' + (pass ? "pass" : "fail") + '">' + right + ' / ' + qs.length + ' to\'g\'ri — ' + pct + '%<br><span style="font-size:15px;font-weight:600">' +
      (pass ? (last ? "Ajoyib! Bu darajani tugatdingiz 🎉" : "Barakalla! Keyingi bet ochildi 🎉") : "Keyingi betga o'tish uchun kamida " + PASS + "% kerak. Xatolarni ko'rib chiqing va qayta urinib ko'ring.") + '</span></div>';
    var btn = document.getElementById("check");
    if (!pass) sfx("fail");
    if (pass) {
      confetti();
      if (!last) {
        btn.textContent = "Keyingi bet ›"; btn.className = "btn green";
        btn.onclick = function () { clearTimeout(check._t); location.hash = "#/page/" + L + "/" + (i + 1); };
        check._t = setTimeout(function () { if (location.hash === "#/page/" + L + "/" + i) location.hash = "#/page/" + L + "/" + (i + 1); }, 4000);
      } else { btn.textContent = "Darajalarga qaytish"; btn.onclick = function () { location.hash = "#/"; }; }
    } else {
      btn.textContent = "Qayta urinish ↻"; btn.className = "btn alt";
      btn.onclick = function () { page(L, i); };
    }
    res.scrollIntoView({ behavior: "smooth", block: "center" });
  }


  function explainHTML(pg) {
    var h = '<div class="card explain"><h3>📖 ' + esc(pg.title) + '</h3>';
    pg.explain.forEach(function (b) {
      if (b.h) h += '<h4>' + esc(b.h) + '</h4>';
      if (b.p) h += '<p>' + esc(b.p) + '</p>';
      if (b.f) h += '<div class="formula">' + b.f.map(function (l) { return '<div>' + esc(l) + '</div>'; }).join("") + '</div>';
      if (b.ex) h += '<div class="exs">' + b.ex.map(function (e) { return '<div><b>' + esc(e[0]) + '</b><span>' + esc(e[1]) + '</span></div>'; }).join("") + '</div>';
      if (b.w) h += '<div class="warn"><s>❌ ' + esc(b.w[0]) + '</s><b>✅ ' + esc(b.w[1]) + '</b><span>' + esc(b.w[2]) + '</span></div>';
    });
    return h + '</div>';
  }


  /* ---------- OVOZ: darsdagi tushuntirish va effektlar ---------- */
  var LS_VOICE = "iq_voice", LS_SFX = "iq_sfx", ACTX = null;
  function voiceOn() { return false; }
  function sfxOn() { return load(LS_SFX, true); }
  function sfx(type) {
    if (!sfxOn()) return;
    try {
      ACTX = ACTX || new (window.AudioContext || window.webkitAudioContext)();
      if (ACTX.state === "suspended") ACTX.resume();
      var seq = { tap: [[660, .05, "sine", .05]], ok: [[660, .09, "sine"], [990, .16, "sine"]], bad: [[220, .12, "square", .05], [180, .2, "square", .05]],
        win: [[523, .1, "triangle"], [659, .1, "triangle"], [784, .1, "triangle"], [1047, .3, "triangle"]], fail: [[392, .15, "triangle"], [330, .15, "triangle"], [262, .35, "triangle"]] }[type] || [];
      var t = ACTX.currentTime;
      seq.forEach(function (n) {
        var o = ACTX.createOscillator(), g = ACTX.createGain(), v = n[3] || .12;
        o.type = n[2]; o.frequency.value = n[0]; g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(.0001, t + n[1] + .05);
        o.connect(g); g.connect(ACTX.destination); o.start(t); o.stop(t + n[1] + .06); t += n[1];
      });
    } catch (e) {}
  }
  document.addEventListener("click", function (e) { if (e.target.closest && e.target.closest(".tile2, .modes button, .tile, .tabs button")) sfx("tap"); }, true);
  function uzVoice() { try { var v = speechSynthesis.getVoices(); return v.filter(function (x) { return /^uz/i.test(x.lang); })[0] || v.filter(function (x) { return /^tr/i.test(x.lang); })[0] || null; } catch (e) { return null; } }
  function isUz(t) { return /[oOgG]['ʻ’`]|\b(va|bilan|uchun|bu|yoki|emas|qachon|nima|kerak|ham|esa|deb|hozir|gap|bor|keladi|ishlatiladi|misol|tasdiq|inkor|ega|odat|holat|harakat|zamon|qoida|bugun|assalomu|alaykum|endi|agar|lekin|juda|biror|narsa|kishi|ma'no|sifat|ravish)\b/i.test(t); }
  function speakable(t) {
    return String(t).replace(/[✅❌❓⚠️✍️👏🎉💪→]/g, " ").replace(/_{3,}/g, " blank ").replace(/V-ing/g, "V ing").replace(/\s*\/\s*/g, ", ").replace(/\s*\+\s*/g, " plus ").replace(/[()]/g, ", ").replace(/\|/g, ". ").replace(/\s+/g, " ").trim();
  }
  function narrate(parts, done) {
    // parts: [{t, uz}] — ketma-ket o'qiladi
    if (!voiceOn() || !window.speechSynthesis) return done();
    var uv = uzVoice(), en = voices(), q = [];
    parts.forEach(function (p) {
      var t = speakable(p.t); if (!t) return;
      if (p.uz && !uv) return;
      var last = q[q.length - 1];
      if (last && last.uz === p.uz) last.t += ". " + t; else q.push({ t: t, uz: p.uz });
    });
    if (!q.length) return done();
    var k = 0, finished = false;
    function end() { if (!finished) { finished = true; done(); } }
    (function next() {
      if (k >= q.length) return end();
      var c = q[k++], u = new SpeechSynthesisUtterance(c.t);
      try { if (c.uz) { u.lang = uv.lang; u.voice = uv; u.rate = .95; } else { u.lang = "en-US"; u.rate = .88; if (en.length) u.voice = en[0]; } } catch (e) {}
      var fired = false, guard = setTimeout(go, c.t.length * 110 + 4000);
      function go() { if (fired) return; fired = true; clearTimeout(guard); next(); }
      u.onend = go; u.onerror = go;
      speechSynthesis.speak(u);
    })();
  }
  function sceneParts(s) {
    if (s.k === "ex") return [{ t: (s.before + s.ans + s.after).replace(/\s+/g, " "), uz: false }];
    if (s.k === "intro" || s.k === "outro") return [{ t: s.segs.map(function (g) { return g.t; }).join(" "), uz: true }];
    return s.segs.map(function (g) { var uz = g.c === "uz" || (g.c !== "en" && g.c !== "mono" && g.c !== "key" && isUz(g.t)) || (g.c === "key" && isUz(g.t)) || (g.c === "mono" && isUz(g.t)); return { t: g.t, uz: uz }; });
  }


  /* ---------- klaviatura ovozi va fon musiqasi ---------- */
  var LS_MUSIC = "iq_music", MUS = null;
  function musicOn() { return load(LS_MUSIC, true); }
  function actx() { ACTX = ACTX || new (window.AudioContext || window.webkitAudioContext)(); if (ACTX.state === "suspended") ACTX.resume(); return ACTX; }
  var NOISE = null;
  function keyClick() {
    if (!sfxOn()) return;
    try {
      var c = actx();
      if (!NOISE) { NOISE = c.createBuffer(1, c.sampleRate * .05, c.sampleRate); var d = NOISE.getChannelData(0); for (var i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 6); }
      var src = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain(), t = c.currentTime;
      src.buffer = NOISE; f.type = "bandpass"; f.frequency.value = 1800 + Math.random() * 2200; f.Q.value = 1.2;
      g.gain.value = .22 + Math.random() * .12;
      src.connect(f); f.connect(g); g.connect(c.destination); src.start(t);
      var o = c.createOscillator(), og = c.createGain(); o.type = "square"; o.frequency.value = 120 + Math.random() * 60;
      og.gain.setValueAtTime(.03, t); og.gain.exponentialRampToValueAtTime(.0001, t + .03); o.connect(og); og.connect(c.destination); o.start(t); o.stop(t + .04);
    } catch (e) {}
  }
  function musicStart() {
    if (!musicOn() || MUS) return;
    try {
      var c = actx(), bpm = 102, sx = 60 / bpm / 4, master = c.createGain(), comp = c.createDynamicsCompressor(), duck = c.createGain(), dl = c.createDelay(), fb = c.createGain(), dlv = c.createGain();
      master.gain.setValueAtTime(0, c.currentTime); master.gain.linearRampToValueAtTime(.7, c.currentTime + 2);
      comp.threshold.value = -16; comp.ratio.value = 4; master.connect(comp); comp.connect(c.destination);
      duck.connect(master); dl.delayTime.value = sx * 3; fb.gain.value = .3; dlv.gain.value = .35; dl.connect(fb); fb.connect(dl); dl.connect(dlv); dlv.connect(master);
      var noise = c.createBuffer(1, c.sampleRate, c.sampleRate), nd = noise.getChannelData(0); for (var i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;
      // I – V – vi – IV (C – G – Am – F), zamonaviy pop progressiya
      var prog = [[261.63, 329.63, 392, 493.88], [196, 246.94, 293.66, 369.99], [220, 261.63, 329.63, 392], [174.61, 220, 261.63, 329.63]];
      var bassN = [65.41, 98, 110, 87.31], mel = [[523.25, 659.25, 783.99, 659.25], [587.33, 783.99, 987.77, 783.99], [523.25, 659.25, 880, 659.25], [523.25, 698.46, 880, 698.46]];
      function env(g, t, a, d, v) { g.gain.setValueAtTime(.0001, t); g.gain.linearRampToValueAtTime(v, t + a); g.gain.exponentialRampToValueAtTime(.0001, t + a + d); }
      function kick(t) { var o = c.createOscillator(), g = c.createGain(); o.frequency.setValueAtTime(140, t); o.frequency.exponentialRampToValueAtTime(42, t + .25); env(g, t, .005, .32, .9); o.connect(g); g.connect(master); o.start(t); o.stop(t + .4);
        duck.gain.cancelScheduledValues(t); duck.gain.setValueAtTime(.35, t); duck.gain.linearRampToValueAtTime(1, t + .22); }
      function nz(t, type, fq, d, v, dest) { var sN = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain(); sN.buffer = noise; f.type = type; f.frequency.value = fq; env(g, t, .002, d, v); sN.connect(f); f.connect(g); g.connect(dest || master); sN.start(t, Math.random() * .5); sN.stop(t + d + .05); }
      function snare(t) { nz(t, "bandpass", 1900, .18, .32); nz(t + .012, "highpass", 3000, .12, .18); var o = c.createOscillator(), g = c.createGain(); o.frequency.value = 190; env(g, t, .002, .09, .18); o.connect(g); g.connect(master); o.start(t); o.stop(t + .12); }
      function hat(t, open) { nz(t, "highpass", 8000, open ? .18 : .035, open ? .07 : .085); }
      function tone(fq, t, a, d, v, type, dest, cut) { var o = c.createOscillator(), g = c.createGain(), f = c.createBiquadFilter(); o.type = type; o.frequency.value = fq; f.type = "lowpass"; f.frequency.value = cut || 2400; env(g, t, a, d, v); o.connect(f); f.connect(g); g.connect(dest || duck); o.start(t); o.stop(t + a + d + .05); }
      function keys(ch, t, len) { ch.forEach(function (fq) { tone(fq, t, .01, len, .045, "triangle"); tone(fq * 2, t, .01, len * .6, .012, "sine"); }); }
      var step = 0, next = c.currentTime + .1;
      function sched() {
        while (next < c.currentTime + .25) {
          var st = step % 16, bar = Math.floor(step / 16) % 4, t = next, sec = Math.floor(step / 64) % 4;
          if (st === 0 || st === 10 || (st === 7 && sec % 2)) kick(t);
          if (st === 4 || st === 12) snare(t);
          if (st % 2 === 0) hat(t, st === 14); else if (sec > 0 && Math.random() < .35) hat(t, false);
          if (st === 0) keys(prog[bar], t, sx * 6); if (st === 6) keys(prog[bar], t, sx * 3); if (st === 10) keys(prog[bar], t, sx * 5);
          if (st === 0 || st === 3 || st === 8 || st === 11 || st === 14) tone(bassN[bar] * (st === 14 ? 1.5 : 1), t, .01, sx * 2.2, .22, "triangle", duck, 600);
          if (sec >= 1 && st % 2 === 0) { var m = mel[bar][(st / 2) % 4] * (sec === 3 ? 2 : 1); var o2 = c.createGain(); o2.gain.value = 1; o2.connect(duck); o2.connect(dl); tone(m, t, .005, sx * 1.4, .035, "square", o2, 3200); }
          next += sx; step++;
        }
      }
      sched(); MUS = { out: master, iv: setInterval(sched, 40) };
    } catch (e) {}
  }
  function musicStop() {
    if (!MUS) return; var m = MUS; MUS = null; clearInterval(m.iv);
    try { var c = actx(); m.out.gain.cancelScheduledValues(c.currentTime); m.out.gain.setValueAtTime(m.out.gain.value, c.currentTime); m.out.gain.linearRampToValueAtTime(0, c.currentTime + 1.2); setTimeout(function () { try { m.out.disconnect(); } catch (e) {} }, 1500); } catch (e) {}
  }

  /* ---------- animatsion videodars ---------- */
  function lessonSeen(L, i) { var p = prog(); return !!(p.lessons && p.lessons[L + ":" + i]); }
  function markSeen(L, i) { var p = prog(); p.lessons = p.lessons || {}; p.lessons[L + ":" + i] = 1; save(LS_PROG, p); }
  function topicOf(t) { return String(t).replace(/^(Unit|Bet)?\s*\d*\s*·\s*/, "").replace(/^(Grammar|Vocabulary):\s*/, ""); }
  function buildScenes(pg) {
    var topic = topicOf(pg.title), sc = [];
    sc.push({ k: "intro", bg: 0, segs: [{ t: "Assalomu alaykum! " }, { t: "Botir bilan CEFR kurslari.", c: "hl" }, { t: "\nBugun " }, { t: topic, c: "key" }, { t: " mavzusini o'rganamiz!" }] });
    if (pg.explain) pg.explain.forEach(function (b) {
      if (b.h || b.p) { var sg = []; if (b.h) sg.push({ t: b.h, c: "key" }); if (b.p) sg.push({ t: (b.h ? "\n" : "") + b.p }); if (b.p || !(b.f || b.ex)) sc.push({ k: "rule", tag: "Tushuntirish", bg: 1, segs: sg }); }
      if (b.f) { var fs = []; b.f.forEach(function (l, n) { fs.push({ t: (n ? "\n" : "") + l, c: "mono" }); }); sc.push({ k: "rule", tag: b.h && !b.p ? b.h : "Formula", bg: 2, segs: fs, f: 1 }); }
      if (b.ex) b.ex.forEach(function (e) { sc.push({ k: "rule", tag: "Misol", bg: 3, segs: [{ t: e[0], c: "en" }, { t: "\n" + e[1], c: "uz" }] }); });
      if (b.w) sc.push({ k: "rule", tag: "⚠️ Ko'p uchraydigan xato", bg: 6, segs: [{ t: "❌ " + b.w[0], c: "bad" }, { t: "\n✅ " + b.w[1], c: "good" }, { t: "\n" + b.w[2], c: "uz" }] });
    });
    else String(pg.theory || "").split("\n").filter(Boolean).forEach(function (line, n) {
      var segs = [], m = line.match(/^(.{2,70}?)\s+—\s+(.*)$/);
      if (m) { segs.push({ t: m[1], c: "key" }); segs.push({ t: " — " }); line = m[2]; }
      line.split(/(\([^)]*\))/).forEach(function (part) { if (part) segs.push(/^\(/.test(part) ? { t: part, c: "uz" } : { t: part }); });
      sc.push({ k: "rule", bg: 1 + (n % 3), n: n + 1, segs: segs });
    });
    var ex = (pg.qs || []).filter(function (q) { return q.t === "mc" || q.t === "gap" || q.t === "wf"; });
    var pick = (pg.explain ? [ex[0], ex[Math.floor(ex.length / 2)]] : [ex[0], ex[Math.floor(ex.length / 3)], ex[Math.floor(2 * ex.length / 3)], ex[ex.length - 1]]).filter(function (q, k, a) { return q && a.indexOf(q) === k; });
    pick.forEach(function (q, n) {
      var ans = q.t === "mc" ? q.o[q.a] : q.a[0];
      var parts = q.q.split(/_{3,}/);
      sc.push({ k: "ex", bg: 4, n: n + 1, before: parts[0], after: parts.slice(1).join("___"), ans: ans, w: q.w });
    });
    sc.push({ k: "outro", bg: 5, segs: [{ t: "Dars yoqqan bo'lsa, " }, { t: "do'stlaringizga ulashing!", c: "hl" }, { t: "\nEndi mashqlarni bajaramiz 💪" }] });
    return sc;
  }
  var PL = null;
  function hold(chars) { return Math.min(10000, 2500 + chars * 28); }
  function lesson(L, i) {
    var pg = pagesOf(L)[i]; if (!pg) return level(L);
    setHeader("🎬 " + L + " · " + (i + 1) + "-dars", "#/level/" + L);
    if (PL) clearTimeout(PL.t);
    PL = { L: L, i: i, pg: pg, sc: buildScenes(pg), at: 0, paused: false, t: null, gen: 0 };
    view.innerHTML = '<div class="stage" id="stage"><div class="bars" id="bars"></div><div class="scene" id="scene"></div></div>' +
      '<div class="ctrl"><button id="pv">⏮</button><button id="pp">⏸</button><button id="nx">⏭</button><button id="vo">' + (musicOn() ? "🎵" : "🔇") + '</button></div><div id="after"></div>';
    document.getElementById("bars").innerHTML = PL.sc.map(function () { return "<i><b></b></i>"; }).join("");
    document.getElementById("pv").onclick = function () { go2(PL.at - 1); };
    document.getElementById("nx").onclick = function () { go2(PL.at + 1); };
    document.getElementById("pp").onclick = function () { PL.paused = !PL.paused; this.textContent = PL.paused ? "▶" : "⏸"; if (!PL.paused) go2(PL.at); else { clearTimeout(PL.t); musicStop(); try { speechSynthesis.cancel(); } catch (e) {} } };
    document.getElementById("vo").onclick = function () { save(LS_MUSIC, !musicOn()); this.textContent = musicOn() ? "🎵" : "🔇"; if (musicOn()) { var k = PL.sc[PL.at].k; if (k !== "intro" && k !== "outro") musicStart(); } else musicStop(); };
    go2(0);
  }
  function go2(n) {
    if (!PL || !document.getElementById("scene")) return;
    clearTimeout(PL.t); var gen = ++PL.gen;
    try { speechSynthesis.cancel(); } catch (e) {}
    if (n < 0) n = 0;
    if (n >= PL.sc.length) return finish();
    PL.at = n; var s = PL.sc[n], box = document.getElementById("scene"), stage = document.getElementById("stage");
    if (s.k === "intro" || s.k === "outro") musicStop(); else if (!PL.paused) musicStart();
    var modern = s.k === "intro" || s.k === "outro";
    stage.className = "stage bg" + s.bg + (modern ? " modern" : "");
    document.querySelectorAll("#bars i").forEach(function (b, k) { b.className = k < n ? "done" : (k === n ? "now" : ""); });
    var head = s.k === "intro" ? '<div class="hr-badge"><img src="botir.jpg" alt=""></div><div class="hr-name">Botir bilan CEFR kurslari</div>' :
      s.k === "rule" ? '<div class="tag">' + esc(s.tag || ("Qoida " + s.n)) + '</div>' : s.k === "ex" ? '<div class="tag">Mashqdan misol ' + s.n + '</div>' : '<div class="hr-badge sm"><img src="botir.jpg" alt=""></div>';
    box.innerHTML = head + '<div class="txt" id="txt"></div>';
    var txt = document.getElementById("txt");
    function later(fn, ms) { PL.t = setTimeout(function () { if (gen === PL.gen && !PL.paused) fn(); }, ms); }
    if (s.k === "ex") {
      txt.className = "txt ex";
      txt.innerHTML = '<span>' + esc(s.before) + '</span><span class="blank" id="bl">?</span><span>' + esc(s.after) + '</span>' + (s.w ? ' <span class="key">' + esc(s.w) + '</span>' : '');
      later(function () {
        var b = document.getElementById("bl"); b.textContent = s.ans; b.className = "blank fill"; sfx("ok");
        if (voiceOn()) narrate(sceneParts(s), function () { later(function () { go2(n + 1); }, 1500); });
        else later(function () { go2(n + 1); }, 4000);
      }, 2600);
      return;
    }
    var chars = s.segs.reduce(function (a, g) { return a + g.t.length; }, 0);
    if (s.f) txt.className = "txt fml"; else if (chars > 170) txt.className = "txt long";
    var cur = document.querySelector("#bars i.now b"); if (cur) cur.style.animationDuration = ((chars * 40 + hold(chars)) / 1000) + "s";
    var spans = s.segs.map(function (g) { var e = document.createElement("span"); if (g.c) e.className = g.c; txt.appendChild(e); return e; });
    var pen = document.createElement("span"); pen.className = modern ? "caret" : "pen"; pen.textContent = modern ? "" : "🖊️"; txt.appendChild(pen);
    var si = 0, ci = 0, typed = false, spoken = !voiceOn();
    function both() { if (typed && spoken && gen === PL.gen) later(function () { go2(n + 1); }, voiceOn() ? 1300 : (s.k === "outro" ? 2500 : hold(chars))); }
    try { speechSynthesis.cancel(); } catch (e) {}
    if (voiceOn()) narrate(sceneParts(s), function () { spoken = true; both(); });
    (function type() {
      if (gen !== PL.gen || PL.paused) return;
      if (si >= s.segs.length) { pen.remove(); typed = true; both(); return; }
      var g = s.segs[si].t; spans[si].textContent = g.slice(0, ++ci);
      if ((s.k === "intro" || s.k === "outro") && g[ci - 1] !== " ") keyClick();
      if (ci >= g.length) { si++; ci = 0; }
      PL.t = setTimeout(type, /[.,!—]/.test(g[ci - 1] || "") ? 160 : 38);
    })();
  }
  function finish() {
    clearTimeout(PL.t); PL.gen++;
    var o = PL.sc[PL.sc.length - 1], tx = document.getElementById("txt");
    if (tx && PL.at === PL.sc.length - 1) tx.innerHTML = o.segs.map(function (g) { return '<span class="' + (g.c || "") + '">' + esc(g.t) + '</span>'; }).join("");
    if (document.getElementById("toex")) return;
    musicStop(); markSeen(PL.L, PL.i); confetti();
    document.querySelectorAll("#bars i").forEach(function (b) { b.className = "done"; });
    var a = document.getElementById("after"), v = PL.pg.video;
    a.innerHTML = '<button class="btn green" id="toex">Mashqlarga o\'tish ›</button><button class="btn alt" id="again">↻ Qayta ko\'rish</button>' + (v ? '<button class="btn tg" id="tgv">Telegramdagi videodarsni ko\'rish</button>' : '');
    var L = PL.L, i = PL.i;
    document.getElementById("toex").onclick = function () { page._force = true; page(L, i); };
    document.getElementById("again").onclick = function () { lesson(L, i); };
    if (v) document.getElementById("tgv").onclick = function () { var x = parseLink(v); window.open(x.url, "_blank"); };
    a.scrollIntoView({ behavior: "smooth" });
  }


  function nav(h) { location.hash = h; }

  /* ---------- ovoz: TTS va nutqni tanish ---------- */
  var REC = null, TIMER = null;
  function stopAll() { try { speechSynthesis.cancel(); } catch (e) {} if (REC) { try { REC.stop(); } catch (e) {} REC = null; } clearInterval(TIMER); }
  function voices() { try { var v = speechSynthesis.getVoices().filter(function (x) { return /^en/i.test(x.lang); }); v.sort(function (a, b) { return (/US|GB/.test(b.lang) ? 1 : 0) - (/US|GB/.test(a.lang) ? 1 : 0); }); return v; } catch (e) { return []; } }
  try { speechSynthesis.onvoiceschanged = function () {}; speechSynthesis.getVoices(); } catch (e) {}
  function say(text, rate, vi, cb) {
    try {
      var u = new SpeechSynthesisUtterance(text), v = voices();
      u.lang = "en-US"; u.rate = rate || 0.9; if (v.length) u.voice = v[(vi || 0) % v.length];
      if (vi && v.length < 2) u.pitch = 0.75;
      u.onend = function () { cb && cb(); }; u.onerror = function () { cb && cb(); };
      speechSynthesis.speak(u);
    } catch (e) { toast("Bu qurilmada ovoz o'qish ishlamaydi"); cb && cb(); }
  }
  function sayLines(lines, rate, cb) {
    try { speechSynthesis.cancel(); } catch (e) {}
    var k = 0;
    (function next() { if (k >= lines.length) return cb && cb(); var l = lines[k++]; say(l[1], rate, l[0] === "B" ? 1 : 0, next); })();
  }
  function recognize(onText, onEnd) {
    var R = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!R) { toast("Mikrofon bu yerda ishlamaydi — APK ilovada sinab ko'ring"); onEnd && onEnd(""); return null; }
    var r = new R(), full = ""; r.lang = "en-US"; r.interimResults = true; r.continuous = true;
    r.onresult = function (e) { var fin = "", tmp = ""; for (var k = 0; k < e.results.length; k++) { if (e.results[k].isFinal) fin += e.results[k][0].transcript + " "; else tmp += e.results[k][0].transcript; } full = fin; onText(fin + tmp); };
    r.onerror = function (e) { if (e.error === "not-allowed" || e.error === "service-not-allowed") toast("Mikrofonga ruxsat berilmadi"); };
    r.onend = function () { REC = null; onEnd && onEnd(full.trim()); };
    try { r.start(); REC = r; } catch (e) { onEnd && onEnd(""); return null; }
    return r;
  }
  function words(s) { return norm(s).replace(/[^a-z0-9' ]/g, " ").split(/\s+/).filter(Boolean); }
  function match(target, said) {
    var t = words(target), s = words(said), bag = {}, hit = 0;
    s.forEach(function (w) { bag[w] = (bag[w] || 0) + 1; });
    t.forEach(function (w) { if (bag[w]) { bag[w]--; hit++; } });
    return t.length ? Math.round(100 * hit / t.length) : 0;
  }

  /* ---------- unit: Listening va Speaking ---------- */
  function tabs(L, i, cur) {
    var t = [["page", "📝 Mashq"], ["listen", "🎧 Listen"], ["speak", "🗣 Speak"], ["build", "🧩 Gap"]];
    return '<div class="tabs">' + t.map(function (x) { return '<button class="' + (x[0] === cur ? "on" : "") + '" data-go="#/' + x[0] + '/' + L + '/' + i + '">' + x[1] + '</button>'; }).join("") + '</div>';
  }
  function sentences(pg) {
    var out = [];
    (pg.qs || []).forEach(function (q) {
      if ((q.t !== "mc" && q.t !== "gap" && q.t !== "wf") || /→/.test(q.q) || (q.q.match(/_{3,}/g) || []).length !== 1) return;
      var ans = q.t === "mc" ? q.o[q.a] : q.a[0];
      if (/\//.test(ans) || ans === "—") return;
      var parts = q.q.replace(/\s*\([^)]*\)/g, "").split(/_{3,}/);
      var a = parts[0].trim() === "" ? ans.charAt(0).toUpperCase() + ans.slice(1) : ans;
      out.push({ before: parts[0], ans: a, after: parts[1], full: (parts[0] + a + parts[1]).replace(/\s+/g, " ").trim() });
    });
    return out;
  }
  function spread(arr, n) { if (arr.length <= n) return arr; var o = []; for (var k = 0; k < n; k++) o.push(arr[Math.floor(k * arr.length / n)]); return o; }
  function unitListen(L, i) {
    var pg = pagesOf(L)[i]; if (!pg) return level(L);
    if (!unlocked(L, i)) { nav("#/level/" + L); return; }
    setHeader("🎧 " + L + " · " + (i + 1) + "-bet", "#/level/" + L);
    var items = spread(sentences(pg), 6);
    var h = tabs(L, i, "listen") + '<div class="card theory"><h3>Listening: eshitib yozing</h3>Gapni tinglang va tushib qolgan so\'z(lar)ni yozing. 🐢 — sekin o\'qish.</div>';
    items.forEach(function (it, k) {
      h += '<div class="card q" data-k="' + k + '"><span class="num">' + (k + 1) + '</span><div class="row" style="margin:8px 0"><button class="btn tg sm" data-p="' + k + '">▶ Tinglash</button><button class="btn alt sm" data-s="' + k + '">🐢 Sekin</button></div>' +
        '<p>' + esc(it.before) + '<b>______</b>' + esc(it.after) + '</p><input class="ans" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Eshitganingizni yozing..."><div class="fix" hidden></div></div>';
    });
    view.innerHTML = h + '<div id="res"></div><button class="btn" id="chk">Tekshirish</button>';
    bindGo();
    view.querySelectorAll("[data-p]").forEach(function (b) { b.onclick = function () { stopAll(); say(items[+b.dataset.p].full, 0.95); }; });
    view.querySelectorAll("[data-s]").forEach(function (b) { b.onclick = function () { stopAll(); say(items[+b.dataset.s].full, 0.6); }; });
    document.getElementById("chk").onclick = function () {
      var r = 0;
      view.querySelectorAll(".q").forEach(function (box) {
        var it = items[+box.dataset.k], inp = box.querySelector(".ans"), ok = norm(inp.value) === norm(it.ans);
        inp.classList.add(ok ? "right" : "wrong"); inp.readOnly = true; if (ok) r++;
        var f = box.querySelector(".fix"); f.hidden = false; f.textContent = (ok ? "✓ " : "To'g'ri: ") + it.full;
      });
      var pct = Math.round(100 * r / Math.max(1, items.length));
      document.getElementById("res").innerHTML = '<div class="result ' + (pct >= PASS ? "pass" : "fail") + '">' + r + ' / ' + items.length + ' — ' + pct + '%</div>';
      if (pct >= PASS) confetti(); else sfx("fail");
      var b = document.getElementById("chk"); b.textContent = "Speaking ›"; b.className = "btn green"; b.onclick = function () { nav("#/speak/" + L + "/" + i); };
    };
  }
  function unitSpeak(L, i) {
    var pg = pagesOf(L)[i]; if (!pg) return level(L);
    if (!unlocked(L, i)) { nav("#/level/" + L); return; }
    setHeader("🗣 " + L + " · " + (i + 1) + "-bet", "#/level/" + L);
    var items = spread(sentences(pg).slice().reverse(), 4);
    var h = tabs(L, i, "speak") + '<div class="card theory"><h3>Speaking: takrorlang</h3>Avval gapni tinglang, so\'ng 🎤 tugmasini bosib ovoz chiqarib ayting. Ilova talaffuzingizni tekshiradi (70% dan yuqori — yaxshi).</div>';
    items.forEach(function (it, k) {
      h += '<div class="card q" data-k="' + k + '"><span class="num">' + (k + 1) + '</span><p class="say">' + esc(it.full) + '</p>' +
        '<div class="row"><button class="btn tg sm" data-p="' + k + '">▶ Tinglash</button><button class="btn sm" data-m="' + k + '">🎤 Gapirish</button></div><div class="heard muted" id="hd' + k + '"></div></div>';
    });
    view.innerHTML = h;
    bindGo();
    view.querySelectorAll("[data-p]").forEach(function (b) { b.onclick = function () { stopAll(); say(items[+b.dataset.p].full, 0.85); }; });
    view.querySelectorAll("[data-m]").forEach(function (b) {
      b.onclick = function () {
        var k = +b.dataset.m, hd = document.getElementById("hd" + k);
        if (REC) { REC.stop(); return; }
        stopAll(); b.textContent = "⏹ To'xtatish"; hd.textContent = "Tinglayapman...";
        recognize(function (t) { hd.textContent = "Siz: " + t; }, function (said) {
          b.textContent = "🎤 Qayta gapirish";
          if (!said) { hd.textContent = hd.textContent === "Tinglayapman..." ? "Ovoz eshitilmadi. Qayta urinib ko'ring." : hd.textContent; return; }
          var p = match(items[k].full, said);
          hd.innerHTML = 'Siz: «' + esc(said) + '» — <b style="color:' + (p >= 70 ? "var(--ok)" : "var(--bad)") + '">' + p + '%</b>' + (p >= 70 ? " ✓" : " — yana bir bor urinib ko'ring"); sfx(p >= 70 ? "ok" : "bad");
        });
      };
    });
  }


  /* ---------- LUG'AT ---------- */
  var LS_VOC = "iq_voc", VTOP = null, SET = 20, DAYS = [0, 1, 2, 4, 8, 16, 32];
  function vtopics() {
    if (VTOP) return VTOP;
    VTOP = (window.VOC || []).map(function (t, k) {
      var ws = t[2].trim().split("\n").map(function (l) { var p = l.split(" | "); return { en: p[0].trim(), uz: (p[1] || "").trim(), id: k + ":" + p[0].trim() }; }).filter(function (w) { return w.en && w.uz; });
      return { name: t[0], lvl: t[1], words: ws };
    });
    return VTOP;
  }
  function vstate() { return load(LS_VOC, {}); }
  function vStats() { var st = vstate(), total = 0, learned = 0, due = 0, now = Date.now(); vtopics().forEach(function (t) { t.words.forEach(function (w) { total++; var x = st[w.id]; if (x && x.b >= 3) learned++; if (x && x.b > 0 && x.d <= now) due++; }); }); return { total: total, learned: learned, due: due }; }
  var vocStats = vStats;
  function vMark(w, ok) {
    var st = vstate(), x = st[w.id] || { b: 0, d: 0 };
    x.b = ok ? Math.min(6, x.b + 1) : 0; x.d = Date.now() + DAYS[x.b] * 864e5; st[w.id] = x; save(LS_VOC, st);
  }
  function vocab() {
    setHeader("Lug'at o'yinlari", "#/");
    var s = vStats(), st = vstate();
    var h = '<div class="hero"><h2>Aa Lug\'at</h2><p>' + s.learned + ' / ' + s.total + ' so\'z o\'rganildi. So\'z 3 marta to\'g\'ri topilsa — o\'rganilgan hisoblanadi va vaqti-vaqti bilan takrorlashga qaytadi.</p></div>';
    h += '<button class="btn ' + (s.due ? "green" : "alt") + '" data-go="#/vg/review/0/0">🔁 Takrorlash' + (s.due ? " (" + s.due + " ta so'z)" : " — hozircha yo'q") + '</button><div class="grid" style="margin-top:14px">';
    vtopics().forEach(function (t, k) {
      var l = t.words.filter(function (w) { return st[w.id] && st[w.id].b >= 3; }).length;
      h += '<button class="tile" data-go="#/vt/' + k + '"><span class="badge" style="background:' + ({ A1: "#22c55e", A2: "#0ea5e9", B1: "#6366f1", B2: "#a855f7", C1: "#ec4899" }[t.lvl] || "#64748b") + ';font-size:15px">' + t.lvl + '</span><span><b>' + esc(t.name) + '</b><small>' + t.words.length + ' so\'z</small><div class="bar-p"><i style="width:' + Math.round(100 * l / t.words.length) + '%"></i></div></span><span class="right">' + l + '/' + t.words.length + '</span></button>';
    });
    view.innerHTML = h + '</div>'; bindGo();
  }
  function vTopic(k) {
    var t = vtopics()[k]; if (!t) return vocab();
    setHeader(t.name, "#/vocab");
    var st = vstate(), n = Math.ceil(t.words.length / SET), h = '';
    for (var s = 0; s < n; s++) {
      var ws = t.words.slice(s * SET, s * SET + SET), l = ws.filter(function (w) { return st[w.id] && st[w.id].b >= 3; }).length;
      h += '<div class="card"><div class="row" style="align-items:center"><b style="flex:2">' + (s + 1) + '-to\'plam · ' + ws.length + ' so\'z</b><span class="muted" style="flex:1;text-align:right">' + l + '/' + ws.length + ' ✓</span></div>' +
        '<p class="muted" style="margin:4px 0 8px">' + ws.slice(0, 6).map(function (w) { return esc(w.en); }).join(", ") + '…</p><div class="modes">' +
        [["cards", "🃏 Kartochka"], ["en", "EN → UZ"], ["uz", "UZ → EN"], ["write", "✍️ Yozish"], ["match", "🔗 Juftlash"]].map(function (m) { return '<button data-go="#/vg/' + m[0] + '/' + k + '/' + s + '">' + m[1] + '</button>'; }).join("") + '</div></div>';
    }
    view.innerHTML = h; bindGo();
  }
  function vWords(mode, k, s) {
    if (mode === "review") {
      var st = vstate(), now = Date.now(), all = [];
      vtopics().forEach(function (t) { t.words.forEach(function (w) { var x = st[w.id]; if (x && x.b > 0 && x.d <= now) all.push(w); }); });
      return pickN(all, 20);
    }
    return vtopics()[k].words.slice(s * SET, s * SET + SET);
  }
  function vGame(mode, k, s) {
    var ws = vWords(mode, k, s), back = mode === "review" ? "#/vocab" : "#/vt/" + k, here = "#/vg/" + mode + "/" + k + "/" + s;
    var title = { cards: "Kartochkalar", en: "EN → UZ", uz: "UZ → EN", write: "Yozib ko'rish", match: "Juftlash", review: "Takrorlash" }[mode];
    setHeader(title, back);
    if (!ws.length) { view.innerHTML = '<div class="card">Hozircha takrorlanadigan so\'z yo\'q. Yangi so\'zlarni o\'rganing!</div>'; return; }
    if (mode === "match") return vMatch(ws, back, here);
    var order = shuffle(ws.length), i = 0, right = 0, pool = mode === "review" ? ws : vtopics()[k].words;
    function fin() {
      var pct = Math.round(100 * right / ws.length);
      view.innerHTML = '<div class="result ' + (pct >= PASS ? "pass" : "fail") + '">' + right + ' / ' + ws.length + ' — ' + pct + '%</div>' +
        '<button class="btn" data-go="' + here + '">↻ Qayta o\'ynash</button><button class="btn alt" data-go="' + back + '">‹ Orqaga</button>';
      if (pct >= PASS) confetti(); else sfx("fail"); bindGo();
    }
    function next() {
      if (i >= order.length) return fin();
      var w = ws[order[i]], m = mode === "review" ? (Math.random() < .5 ? "en" : "uz") : mode;
      var head = '<div class="vprog"><i style="width:' + Math.round(100 * i / ws.length) + '%"></i></div><p class="muted" style="text-align:center">' + (i + 1) + ' / ' + ws.length + '</p>';
      if (m === "cards") {
        view.innerHTML = head + '<div class="flip" id="fc"><div class="front"><div class="vw">' + esc(w.en) + '</div><p class="muted">Bosing — tarjimasi</p></div><div class="back"><div class="vw">' + esc(w.uz) + '</div><p class="muted">' + esc(w.en) + '</p></div></div>' +
          '<button class="btn tg" id="snd">🔊 Talaffuz</button><div class="row"><button class="btn alt" id="no">✗ Bilmayman</button><button class="btn green" id="yes">✓ Bilaman</button></div>';
        say(w.en, 0.85);
        document.getElementById("fc").onclick = function () { this.classList.toggle("on"); };
        document.getElementById("snd").onclick = function () { stopAll(); say(w.en, 0.8); };
        document.getElementById("yes").onclick = function () { sfx("ok"); vMark(w, true); right++; i++; next(); };
        document.getElementById("no").onclick = function () { vMark(w, false); i++; next(); };
        return;
      }
      if (m === "write") {
        view.innerHTML = head + '<div class="card vcard"><div class="vw">' + esc(w.uz) + '</div><p class="muted">Inglizchasini yozing</p></div><input class="ans" id="wa" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="English..."><div class="fix" id="wf" hidden></div><button class="btn" id="ok">Tekshirish</button>';
        var inp = document.getElementById("wa"); inp.focus();
        function go1() {
          var v = norm(inp.value).replace(/^to /, ""), t = norm(w.en).replace(/^to /, ""), ok = v === t;
          inp.classList.add(ok ? "right" : "wrong"); vMark(w, ok); if (ok) right++; sfx(ok ? "ok" : "bad");
          var f = document.getElementById("wf"); f.hidden = false; f.textContent = (ok ? "✓ " : "To'g'ri: ") + w.en; say(w.en, 0.85);
          var b = document.getElementById("ok"); b.textContent = "Keyingisi ›"; b.onclick = function () { i++; next(); }; inp.onkeydown = function (e) { if (e.key === "Enter") { i++; next(); } };
        }
        document.getElementById("ok").onclick = go1; inp.onkeydown = function (e) { if (e.key === "Enter") go1(); };
        return;
      }
      var opts = [w], others = pool.filter(function (x) { return x.id !== w.id && x.uz !== w.uz && x.en !== w.en; });
      pickN(others, 3).forEach(function (x) { opts.push(x); });
      opts = shuffle(opts.length).map(function (j) { return opts[j]; });
      var q = m === "en" ? w.en : w.uz;
      view.innerHTML = head + '<div class="card vcard"><div class="vw">' + esc(q) + '</div>' + (m === "en" ? '<button class="del" id="snd">🔊</button>' : '') + '</div><div class="opts">' + opts.map(function (o, j) { return '<button class="opt" data-j="' + j + '">' + esc(m === "en" ? o.uz : o.en) + '</button>'; }).join("") + '</div>';
      if (m === "en") { say(w.en, 0.85); document.getElementById("snd").onclick = function () { stopAll(); say(w.en, 0.8); }; }
      view.querySelectorAll(".opt").forEach(function (b) {
        b.onclick = function () {
          if (view.dataset.lock) return; view.dataset.lock = 1;
          var ok = opts[+b.dataset.j].id === w.id; vMark(w, ok); if (ok) right++; sfx(ok ? "ok" : "bad");
          view.querySelectorAll(".opt").forEach(function (x) { if (opts[+x.dataset.j].id === w.id) x.classList.add("right"); });
          if (!ok) b.classList.add("wrong");
          if (m === "uz") say(w.en, 0.85);
          setTimeout(function () { delete view.dataset.lock; i++; next(); }, ok ? 700 : 1600);
        };
      });
    }
    next();
  }
  function vMatch(ws, back, here) {
    var rounds = [], r = 0, mistakes = 0, t0 = Date.now();
    for (var a = 0; a < ws.length; a += 5) rounds.push(ws.slice(a, a + 5));
    function round() {
      if (r >= rounds.length) {
        var sec = Math.round((Date.now() - t0) / 1000);
        view.innerHTML = '<div class="result pass">🔗 Barakalla! ' + sec + ' soniya · ' + mistakes + ' ta xato</div><button class="btn" data-go="' + here + '">↻ Qayta o\'ynash</button><button class="btn alt" data-go="' + back + '">‹ Orqaga</button>';
        confetti(); bindGo(); return;
      }
      var set = rounds[r], L = shuffle(set.length), R = shuffle(set.length), sel = null, left = set.length;
      view.innerHTML = '<p class="muted" style="text-align:center">' + (r + 1) + ' / ' + rounds.length + ' · Inglizcha so\'zni o\'zbekchasi bilan juftlang</p><div class="match"><div>' +
        L.map(function (j) { return '<button class="opt" data-s="en" data-j="' + j + '">' + esc(set[j].en) + '</button>'; }).join("") + '</div><div>' +
        R.map(function (j) { return '<button class="opt" data-s="uz" data-j="' + j + '">' + esc(set[j].uz) + '</button>'; }).join("") + '</div></div>';
      view.querySelectorAll(".match .opt").forEach(function (b) {
        b.onclick = function () {
          if (b.disabled) return;
          if (b.dataset.s === "en") say(set[+b.dataset.j].en, 0.9);
          if (!sel || sel.dataset.s === b.dataset.s) { if (sel) sel.classList.remove("sel"); sel = b; b.classList.add("sel"); return; }
          if (sel.dataset.j === b.dataset.j) {
            [sel, b].forEach(function (x) { x.classList.remove("sel"); x.classList.add("right"); x.disabled = true; }); sfx("ok");
            vMark(set[+b.dataset.j], true); sel = null;
            if (--left === 0) { r++; setTimeout(round, 500); }
          } else {
            mistakes++; sfx("bad"); var a2 = sel; b.classList.add("wrong"); a2.classList.add("wrong");
            vMark(set[+a2.dataset.j], false);
            setTimeout(function () { b.classList.remove("wrong"); a2.classList.remove("wrong", "sel"); }, 500); sel = null;
          }
        };
      });
    }
    round();
  }


  /* ---------- NOTO'G'RI FE'LLAR ---------- */
  var IRRL = null, ISET = 15;
  function irrList() {
    if (IRRL) return IRRL;
    var seen = {}; IRRL = [];
    String(window.IRR || "").trim().split("\n").forEach(function (l) {
      var p = l.split(" | ").map(function (x) { return x.trim(); });
      if (p.length < 4 || seen[p[0]]) return; seen[p[0]] = 1;
      IRRL.push({ v1: p[0], v2: p[1], v3: p[2], uz: p[3], id: "irr:" + p[0], en: p[0] });
    });
    return IRRL;
  }
  function alts(f) { return f.split("/").map(function (x) { return norm(x); }); }
  function okForm(inp, f) { var v = norm(inp).replace(/\s*\/\s*/g, "/"); return alts(f).indexOf(v) >= 0 || v === alts(f).join("/"); }
  function irrSay(v) { say(v.v1 + ". " + v.v2.replace(/ \/ /g, ", ") + ". " + v.v3.replace(/ \/ /g, ", "), 0.75); }
  function irrHome() {
    setHeader("Noto'g'ri fe'llar", "#/");
    var L = irrList(), st = vstate(), n = Math.ceil(L.length / ISET);
    var h = '<div class="card theory"><h3>Noto\'g\'ri fe\'llar nima?</h3>To\'g\'ri fe\'llar o\'tgan zamonda -ed oladi: work → worked → worked. Noto\'g\'ri fe\'llar esa o\'z shakliga ega va ularni yod olish kerak: go → went → gone.\nV1 — hozirgi zamon (I go); V2 — past simple (I went); V3 — perfect va passiv (I have gone, it was written).\nRo\'yxat eng ko\'p ishlatiladigan fe\'llardan boshlanadi.</div>';
    for (var s = 0; s < n; s++) {
      var vs = L.slice(s * ISET, s * ISET + ISET), l = vs.filter(function (v) { return st[v.id] && st[v.id].b >= 3; }).length;
      h += '<div class="card"><div class="row" style="align-items:center"><b style="flex:2">' + (s + 1) + '-guruh · ' + vs.length + ' fe\'l</b><span class="muted" style="flex:1;text-align:right">' + l + '/' + vs.length + ' ✓</span></div><p class="muted" style="margin:4px 0 8px">' + vs.slice(0, 5).map(function (v) { return esc(v.v1); }).join(", ") + '…</p><div class="modes">' +
        [["table", "📋 Jadval"], ["cards", "🃏 Kartochka"], ["test", "❓ Test"], ["write", "✍️ 3 shakl"]].map(function (m) { return '<button data-go="#/ig/' + m[0] + '/' + s + '">' + m[1] + '</button>'; }).join("") + '</div></div>';
    }
    view.innerHTML = h; bindGo();
  }
  function irrGame(mode, s) {
    var L = irrList(), vs = L.slice(s * ISET, s * ISET + ISET), here = "#/ig/" + mode + "/" + s;
    setHeader({ table: "Jadval", cards: "Kartochkalar", test: "Test", write: "3 shaklni yozish" }[mode] + " · " + (s + 1) + "-guruh", "#/irr");
    if (!vs.length) return irrHome();
    if (mode === "table") {
      view.innerHTML = '<div class="card"><table class="irr"><tr><th>V1</th><th>V2</th><th>V3</th><th></th></tr>' + vs.map(function (v, j) {
        return '<tr><td><b>' + esc(v.v1) + '</b><small>' + esc(v.uz) + '</small></td><td>' + esc(v.v2) + '</td><td>' + esc(v.v3) + '</td><td><button class="del" data-j="' + j + '">🔊</button></td></tr>';
      }).join("") + '</table></div><button class="btn" data-go="#/ig/cards/' + s + '">🃏 Yodlashni boshlash ›</button>';
      view.querySelectorAll("[data-j]").forEach(function (b) { b.onclick = function () { stopAll(); irrSay(vs[+b.dataset.j]); }; });
      bindGo(); return;
    }
    var order = shuffle(vs.length), i = 0, right = 0;
    function fin() {
      var pct = Math.round(100 * right / vs.length);
      view.innerHTML = '<div class="result ' + (pct >= PASS ? "pass" : "fail") + '">' + right + ' / ' + vs.length + ' — ' + pct + '%</div><button class="btn" data-go="' + here + '">↻ Qayta</button>' +
        (mode !== "write" ? '<button class="btn green" data-go="#/ig/' + (mode === "cards" ? "test" : "write") + '/' + s + '">Keyingi o\'yin ›</button>' : (s + 1 < Math.ceil(L.length / ISET) ? '<button class="btn green" data-go="#/ig/table/' + (s + 1) + '">Keyingi guruh ›</button>' : '')) +
        '<button class="btn alt" data-go="#/irr">‹ Guruhlar</button>';
      if (pct >= PASS) confetti(); else sfx("fail"); bindGo();
    }
    function next() {
      if (i >= order.length) return fin();
      var v = vs[order[i]], head = '<div class="vprog"><i style="width:' + Math.round(100 * i / vs.length) + '%"></i></div><p class="muted" style="text-align:center">' + (i + 1) + ' / ' + vs.length + '</p>';
      if (mode === "cards") {
        view.innerHTML = head + '<div class="flip" id="fc"><div class="front"><div class="vw">' + esc(v.v1) + '</div><p class="muted">' + esc(v.uz) + '</p><p class="muted">Bosing — V2 va V3</p></div><div class="back"><div class="vw" style="font-size:24px">' + esc(v.v1) + ' → ' + esc(v.v2) + ' → ' + esc(v.v3) + '</div><p class="muted">' + esc(v.uz) + '</p></div></div>' +
          '<button class="btn tg" id="snd">🔊 Talaffuz</button><div class="row"><button class="btn alt" id="no">✗ Bilmayman</button><button class="btn green" id="yes">✓ Bilaman</button></div>';
        document.getElementById("fc").onclick = function () { this.classList.toggle("on"); if (this.classList.contains("on")) irrSay(v); };
        document.getElementById("snd").onclick = function () { stopAll(); irrSay(v); };
        document.getElementById("yes").onclick = function () { sfx("ok"); vMark(v, true); right++; i++; next(); };
        document.getElementById("no").onclick = function () { vMark(v, false); i++; next(); };
        return;
      }
      if (mode === "write") {
        view.innerHTML = head + '<div class="card vcard"><div class="vw">' + esc(v.v1) + '</div><p class="muted">' + esc(v.uz) + '</p></div><label>V2 (past simple)</label><input class="ans" id="a2" autocomplete="off" autocapitalize="off" spellcheck="false"><label>V3 (past participle)</label><input class="ans" id="a3" autocomplete="off" autocapitalize="off" spellcheck="false"><div class="fix" id="wf" hidden></div><button class="btn" id="ok">Tekshirish</button>';
        document.getElementById("a2").focus();
        document.getElementById("ok").onclick = function () {
          var a2 = document.getElementById("a2"), a3 = document.getElementById("a3"), o2 = okForm(a2.value, v.v2), o3 = okForm(a3.value, v.v3), ok = o2 && o3;
          a2.classList.add(o2 ? "right" : "wrong"); a3.classList.add(o3 ? "right" : "wrong"); vMark(v, ok); if (ok) right++; sfx(ok ? "ok" : "bad");
          var f = document.getElementById("wf"); f.hidden = false; f.textContent = (ok ? "✓ " : "To'g'ri: ") + v.v1 + " → " + v.v2 + " → " + v.v3; irrSay(v);
          var b = document.getElementById("ok"); b.textContent = "Keyingisi ›"; b.onclick = function () { i++; next(); };
        };
        return;
      }
      // test
      var form = Math.random() < .5 ? "v2" : "v3", corr = v[form];
      var wrong = [v.v1 + "ed", (form === "v2" ? v.v3 : v.v2)], pool = L.filter(function (x) { return x.id !== v.id; });
      pickN(pool, 4).forEach(function (x) { wrong.push(x[form]); });
      var opts = [corr]; wrong.forEach(function (w) { if (opts.length < 4 && opts.map(norm).indexOf(norm(w)) < 0) opts.push(w); });
      opts = shuffle(opts.length).map(function (j) { return opts[j]; });
      view.innerHTML = head + '<div class="card vcard"><div class="vw">' + esc(v.v1) + '</div><p class="muted">' + esc(v.uz) + '</p><p style="margin-top:8px;font-weight:800;color:var(--brand)">' + (form === "v2" ? "V2 (past simple) qaysi?" : "V3 (past participle) qaysi?") + '</p></div><div class="opts">' + opts.map(function (o, j) { return '<button class="opt" data-j="' + j + '">' + esc(o) + '</button>'; }).join("") + '</div>';
      view.querySelectorAll(".opt").forEach(function (b) {
        b.onclick = function () {
          if (view.dataset.lock) return; view.dataset.lock = 1;
          var ok = opts[+b.dataset.j] === corr; vMark(v, ok); if (ok) right++; sfx(ok ? "ok" : "bad");
          view.querySelectorAll(".opt").forEach(function (x) { if (opts[+x.dataset.j] === corr) x.classList.add("right"); });
          if (!ok) b.classList.add("wrong"); irrSay(v);
          setTimeout(function () { delete view.dataset.lock; i++; next(); }, ok ? 900 : 1800);
        };
      });
    }
    next();
  }

  /* ---------- GAP TUZISH o'yini ---------- */
  function buildItems(pg) {
    var out = [];
    (pg.explain || []).forEach(function (b) { (b.ex || []).forEach(function (e) { var en = e[0].replace(/\s*\(.*?\)\s*/g, " ").replace(/\s*→.*$/, "").trim(); if (en.split(" ").length >= 3 && en.split(" ").length <= 12 && !/[|=]/.test(en)) out.push({ en: en, uz: e[1] }); }); });
    sentences(pg).forEach(function (x) { if (x.full.split(" ").length <= 12 && !/—/.test(x.full)) out.push({ en: x.full, uz: "" }); });
    return out;
  }
  function toks(s) { return s.replace(/([.,!?])/g, "").split(/\s+/).filter(Boolean); }
  function unitBuild(L, i) {
    var pg = pagesOf(L)[i]; if (!pg) return level(L);
    if (!unlocked(L, i)) { nav("#/level/" + L); return; }
    setHeader("🧩 " + L + " · " + (i + 1) + "-bet", "#/level/" + L);
    var items = spread(buildItems(pg), 8), k = 0, right = 0;
    function freeTask() {
      var srcs = pickN(sentences(pg).filter(function (x) { return toks(x.full).length >= 5; }), 3), n = 0;
      (function one() {
        if (n >= srcs.length) {
          view.innerHTML = tabs(L, i, "build") + '<div class="result pass">🧩 ' + right + ' / ' + items.length + ' gap to\'g\'ri tuzildi. Erkin gaplar ham bajarildi!</div><button class="btn" data-go="#/build/' + L + '/' + i + '">↻ Qayta o\'ynash</button>';
          bindGo(); confetti(); return;
        }
        var src = srcs[n], cw = toks(src.full).filter(function (w) { return w.length > 3 && !/^(that|this|with|from|have|they|their|there|were|will|been|when|what)$/i.test(w); });
        var given = pickN(cw, Math.min(3, cw.length));
        view.innerHTML = tabs(L, i, "build") + '<div class="card theory"><h3>Erkin gap tuzish ' + (n + 1) + ' / ' + srcs.length + '</h3>Quyidagi so\'zlarning hammasini ishlatib, o\'zingiz inglizcha gap tuzing.</div><div class="card"><div class="given">' + given.map(function (g) { return '<span>' + esc(g) + '</span>'; }).join("") + '</div>' +
          '<textarea id="fg" rows="3" placeholder="Gapingizni yozing..."></textarea><div id="fr"></div><button class="btn" id="fc">Tekshirish</button></div>';
        bindGo();
        document.getElementById("fc").onclick = function () {
          var v = document.getElementById("fg").value.trim(), lw = words(v), miss = given.filter(function (g) { var gg = norm(g).slice(0, Math.max(4, g.length - 2)); return !lw.some(function (x) { return x.indexOf(gg) === 0; }); });
          var fr = document.getElementById("fr"), probs = [];
          if (lw.length < 4) probs.push("Gap juda qisqa — kamida 4–5 so'z yozing.");
          if (miss.length) probs.push("Bu so'z(lar) ishlatilmadi: " + miss.join(", "));
          if (v && !/^[A-Z]/.test(v)) probs.push("Gap bosh harf bilan boshlansin.");
          if (v && !/[.!?]$/.test(v)) probs.push("Gap oxiriga nuqta qo'ying.");
          fr.innerHTML = probs.length ? '<div class="warn"><b style="color:var(--bad)">Tuzating:</b>' + probs.map(function (p) { return '<span>• ' + esc(p) + '</span>'; }).join("") + '</div>'
            : '<div class="exs"><div><b>✓ Zo\'r! So\'zlarning hammasi ishlatildi.</b><span>Namuna gap: ' + esc(src.full) + '</span></div></div>';
          sfx(probs.length ? "bad" : "ok");
          if (!probs.length) { say(v, 0.9); var b = document.getElementById("fc"); b.textContent = "Keyingisi ›"; b.className = "btn green"; b.onclick = function () { n++; one(); }; }
        };
      })();
    }
    function task() {
      if (k >= items.length) return freeTask();
      var it = items[k], target = toks(it.en), extra = [];
      items.forEach(function (o, j) { if (j !== k) toks(o.en).forEach(function (w) { if (target.indexOf(w) < 0 && w.length > 2) extra.push(w); }); });
      var tiles = target.concat(pickN(extra, 2)), ord = shuffle(tiles.length), ans = [];
      view.innerHTML = tabs(L, i, "build") + '<div class="vprog"><i style="width:' + Math.round(100 * k / items.length) + '%"></i></div>' +
        '<div class="card theory"><h3>Gapni tuzing ' + (k + 1) + ' / ' + items.length + '</h3>' + (it.uz ? '🇺🇿 ' + esc(it.uz) : "So'zlarni to'g'ri tartibda joylashtiring (2 ta ortiqcha so'z bor).") + '</div>' +
        '<div class="ansline" id="al"></div><div class="tiles" id="tl">' + ord.map(function (j) { return '<button class="tile2" data-j="' + j + '">' + esc(tiles[j]) + '</button>'; }).join("") + '</div><div id="br"></div><button class="btn" id="bc">Tekshirish</button>';
      bindGo();
      var al = document.getElementById("al");
      view.querySelectorAll("#tl .tile2").forEach(function (b) {
        b.onclick = function () {
          if (b.parentNode.id === "tl") { al.appendChild(b); ans.push(b); } else { document.getElementById("tl").appendChild(b); ans.splice(ans.indexOf(b), 1); }
        };
      });
      document.getElementById("bc").onclick = function () {
        var got = Array.prototype.map.call(al.children, function (x) { return x.textContent; }).join(" ");
        var ok = norm(got) === norm(target.join(" "));
        if (ok) right++;
        al.className = "ansline " + (ok ? "ok" : "bad"); sfx(ok ? "ok" : "bad");
        document.getElementById("br").innerHTML = ok ? '<div class="fix">✓ To\'g\'ri!</div>' : '<div class="fix" style="color:var(--bad)">To\'g\'ri javob: ' + esc(it.en) + '</div>';
        say(it.en, 0.9);
        var b = document.getElementById("bc"); b.textContent = "Keyingisi ›"; b.className = "btn green"; b.onclick = function () { k++; task(); };
      };
    }
    task();
  }

  /* ---------- CEFR tayyorlov ---------- */
  function cefr() {
    setHeader("🎓 CEFR tayyorlov", "#/");
    var C = window.CEFR, p = prog(), done = p.cl || {};
    var h = '<div class="hero"><h2>Listening & Speaking</h2><p>CEFR imtihoni uslubidagi mashg\'ulotlar. Matnlarni telefoningiz ingliz tilida o\'qib beradi.</p></div>';
    h += '<h3 style="margin:6px 0 10px">🗣 Speaking</h3><div class="grid">' +
      '<button class="tile" data-go="#/sp/1"><span class="badge" style="background:#6366f1">P1</span><span><b>Part 1 — Savollarga javob</b><small>3 ta savol, har biriga 30 soniya</small></span></button>' +
      '<button class="tile" data-go="#/sp/2"><span class="badge" style="background:#ec4899">P2</span><span><b>Part 2 — Monolog</b><small>1 daqiqa tayyorgarlik, 2 daqiqa gapirish</small></span></button>' +
      '<button class="tile" data-go="#/sp/3"><span class="badge" style="background:#f97316">P3</span><span><b>Part 3 — Fikr bildirish</b><small>Ijobiy va salbiy tomonlar, 2 daqiqa</small></span></button></div>';
    h += '<h3 style="margin:18px 0 10px">🎧 Listening</h3><div class="grid">';
    C.listening.forEach(function (t, k) {
      h += '<button class="tile" data-go="#/cl/' + k + '"><span class="badge" style="background:' + (done[k] >= PASS ? "#16a34a" : "#0ea5e9") + '">' + (done[k] >= PASS ? "✓" : k + 1) + '</span><span><b>' + esc(t.title) + '</b><small>' + (t.lines.length > 1 ? "Dialog" : "Monolog") + ' · ' + t.qs.length + ' savol</small></span><span class="right">' + (done[k] ? done[k] + "%" : "") + '</span></button>';
    });
    view.innerHTML = h + '</div>';
    bindGo();
  }
  function cefrListen(k) {
    var t = window.CEFR.listening[k]; if (!t) return cefr();
    setHeader("🎧 Listening " + (k + 1), "#/cefr");
    var plays = 0;
    var h = '<div class="card theory"><h3>' + esc(t.title) + '</h3>Avval savollarni o\'qib chiqing, so\'ng tinglang. Imtihonda matn 2 marta eshittiriladi.</div>' +
      '<div class="row"><button class="btn tg" id="play">▶ Tinglash</button><button class="btn alt" id="slow">🐢 Sekin</button></div><p class="muted" id="pc" style="text-align:center;margin:6px 0 12px">Tinglandi: 0 marta</p><div id="qs">';
    t.qs.forEach(function (q, n) {
      h += '<div class="card q" data-k="' + n + '"><span class="num">' + (n + 1) + '</span><p>' + esc(q.q) + '</p><div class="opts">' + q.o.map(function (o, j) { return '<button class="opt" data-o="' + j + '">' + esc(o) + '</button>'; }).join("") + '</div></div>';
    });
    view.innerHTML = h + '</div><div id="res"></div><button class="btn" id="chk">Tekshirish</button><div id="scr"></div>';
    function play(rate) { stopAll(); plays++; document.getElementById("pc").textContent = "Tinglandi: " + plays + " marta"; sayLines(t.lines, rate); }
    document.getElementById("play").onclick = function () { play(0.92); };
    document.getElementById("slow").onclick = function () { play(0.65); };
    view.querySelectorAll(".opts").forEach(function (box) { box.querySelectorAll(".opt").forEach(function (b) { b.onclick = function () { if (box.dataset.locked) return; box.querySelectorAll(".opt").forEach(function (x) { x.classList.remove("sel"); }); b.classList.add("sel"); }; }); });
    document.getElementById("chk").onclick = function () {
      var r = 0;
      view.querySelectorAll(".q").forEach(function (box) {
        var q = t.qs[+box.dataset.k], sel = box.querySelector(".opt.sel"); box.querySelector(".opts").dataset.locked = 1;
        if (sel && +sel.dataset.o === q.a) r++;
        box.querySelectorAll(".opt").forEach(function (b) { if (+b.dataset.o === q.a) b.classList.add("right"); else if (b === sel) b.classList.add("wrong"); });
      });
      var pct = Math.round(100 * r / t.qs.length), p = prog(); p.cl = p.cl || {}; if (pct > (p.cl[k] || 0)) p.cl[k] = pct; save(LS_PROG, p);
      document.getElementById("res").innerHTML = '<div class="result ' + (pct >= PASS ? "pass" : "fail") + '">' + r + ' / ' + t.qs.length + ' — ' + pct + '%</div>';
      if (pct >= PASS) confetti(); else sfx("fail");
      document.getElementById("scr").innerHTML = '<div class="card"><h3>Matn (transcript)</h3>' + t.lines.map(function (l) { return '<p>' + (l[0] !== "N" ? '<b>' + l[0] + ':</b> ' : '') + esc(l[1]) + '</p>'; }).join("") + '</div>' + (k + 1 < window.CEFR.listening.length ? '<button class="btn green" data-go="#/cl/' + (k + 1) + '">Keyingi listening ›</button>' : '');
      bindGo();
      var b = document.getElementById("chk"); b.textContent = "↻ Qayta ishlash"; b.className = "btn alt"; b.onclick = function () { cefrListen(k); };
    };
  }
  function pickN(arr, n) { var o = shuffle(arr.length).slice(0, n); return o.map(function (x) { return arr[x]; }); }
  function fmt(s) { return Math.floor(s / 60) + ":" + ("0" + (s % 60)).slice(-2); }
  function speakBox(box, secs, onDone) {
    box.innerHTML = '<div class="timer" id="tm">' + fmt(secs) + '</div><div class="heard" id="tr">🎤 Gapiring...</div><button class="btn alt" id="stp">⏹ Tugatish</button>';
    var left = secs, text = "", t0 = Date.now(), ended = false;
    function end() {
      if (ended) return; ended = true; clearInterval(TIMER); if (REC) { try { REC.stop(); } catch (e) {} }
      var w = words(text).length, min = Math.max(0.25, (Date.now() - t0) / 60000);
      box.innerHTML = '<div class="card" style="background:#f0fdf4"><b>Natija:</b> ' + w + ' ta so\'z · ' + Math.round(w / min) + ' so\'z/daqiqa' +
        '<p class="muted" style="margin-top:6px">' + (text ? esc(text) : "Matn yozib olinmadi (mikrofon ishlamagan bo'lishi mumkin).") + '</p>' +
        '<p class="muted" style="margin-top:6px">Maqsad: B2 uchun ravon, daqiqasiga 100+ so\'z, bog\'lovchilar va turli zamonlar.</p></div>';
      onDone && onDone(text);
    }
    recognize(function (t) { text = t; document.getElementById("tr") && (document.getElementById("tr").textContent = t || "🎤 Gapiring..."); }, function (f) { if (f) text = f; if (!ended && left > 1) { /* qayta ulash */ if (!REC && left > 1) recognize(function (t) { document.getElementById("tr") && (document.getElementById("tr").textContent = text + " " + t); }, function (g) { if (g) text = (text + " " + g).trim(); }); } });
    TIMER = setInterval(function () { left--; var tm = document.getElementById("tm"); if (tm) tm.textContent = fmt(Math.max(0, left)); if (left <= 0) end(); }, 1000);
    document.getElementById("stp").onclick = end;
  }
  function prep(box, secs, label, cb) {
    var left = secs;
    box.innerHTML = '<div class="timer prep" id="tm">' + fmt(left) + '</div><p class="muted" style="text-align:center">' + label + '</p><button class="btn" id="go">Hoziroq boshlash ›</button>';
    clearInterval(TIMER);
    TIMER = setInterval(function () { left--; var tm = document.getElementById("tm"); if (tm) tm.textContent = fmt(left); if (left <= 0) { clearInterval(TIMER); cb(); } }, 1000);
    document.getElementById("go").onclick = function () { clearInterval(TIMER); cb(); };
  }
  function phr(list) { return '<div class="card"><b>Foydali iboralar:</b><ul style="margin:6px 0 0 18px">' + list.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join("") + '</ul></div>'; }
  function cefrSpeak(part) {
    var C = window.CEFR;
    setHeader("🗣 Speaking Part " + part, "#/cefr");
    if (part === 1) {
      var qs = pickN(C.part1, 3), n = 0;
      view.innerHTML = '<div class="card theory"><h3>Part 1</h3>Har bir savolga 30 soniya ichida 2–4 gap bilan javob bering.</div><div class="card"><div class="tag2" id="qn"></div><p class="bigq" id="qq"></p><div id="box"></div></div>' + phr(C.phrases.part1);
      (function ask() {
        if (n >= qs.length) { document.getElementById("box").innerHTML = '<button class="btn green" data-go="#/sp/1">↻ Yangi savollar</button><button class="btn alt" data-go="#/sp/2">Part 2 ›</button>'; bindGo(); return; }
        document.getElementById("qn").textContent = "Savol " + (n + 1) + " / " + qs.length; document.getElementById("qq").textContent = qs[n];
        var box = document.getElementById("box");
        box.innerHTML = '<button class="btn tg" id="go">▶ Savolni tinglash va javob berish</button>';
        document.getElementById("go").onclick = function () { stopAll(); say(qs[n], 0.9, 0, function () { speakBox(box, 30, function () { n++; box.insertAdjacentHTML("beforeend", '<button class="btn" id="nx2">Keyingi savol ›</button>'); document.getElementById("nx2").onclick = ask; }); }); };
      })();
      return;
    }
    var c = part === 2 ? pickN(C.part2, 1)[0] : pickN(C.part3, 1)[0];
    var body = part === 2 ? '<p class="bigq">' + esc(c.topic) + '</p><p class="muted">You should say:</p><ul style="margin:4px 0 0 18px">' + c.cues.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join("") + '</ul>'
      : '<p class="bigq">' + esc(c.topic) + '</p><div class="pc"><div><b style="color:var(--ok)">FOR ✓</b><ul>' + c.pro.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join("") + '</ul></div><div><b style="color:var(--bad)">AGAINST ✗</b><ul>' + c.con.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join("") + '</ul></div></div><p class="muted">Ikkala tomonni muhokama qiling va o\'z fikringizni ayting.</p>';
    view.innerHTML = '<div class="card theory"><h3>Part ' + part + '</h3>' + (part === 2 ? "1 daqiqa tayyorlaning, so'ng 2 daqiqagacha gapiring." : "1 daqiqa tayyorlaning, so'ng 2 daqiqa davomida fikringizni asoslab bering.") + '</div><div class="card">' + body + '</div><div class="card" id="box"></div>' + phr(part === 2 ? C.phrases.part2 : C.phrases.part3);
    var box = document.getElementById("box");
    box.innerHTML = '<button class="btn tg" id="st">▶ Boshlash</button>';
    document.getElementById("st").onclick = function () {
      stopAll(); say(c.topic, 0.9);
      prep(box, 60, "Tayyorgarlik vaqti — fikrlaringizni yozib oling", function () {
        speakBox(box, 120, function () { box.insertAdjacentHTML("beforeend", '<button class="btn green" data-go="#/sp/' + part + '">↻ Boshqa mavzu</button>'); bindGo(); });
      });
    };
  }

  /* ---------- konfetti ---------- */
  function confetti() {
    sfx("win");
    var c = document.getElementById("confetti"), x = c.getContext("2d"); c.width = innerWidth; c.height = innerHeight;
    var cols = ["#f43f5e", "#f59e0b", "#22c55e", "#3b82f6", "#a855f7", "#ec4899"], ps = [];
    for (var i = 0; i < 140; i++) ps.push({ x: Math.random() * c.width, y: -20 - Math.random() * c.height * .5, r: 4 + Math.random() * 6, vy: 2 + Math.random() * 4, vx: -2 + Math.random() * 4, c: cols[i % 6], a: Math.random() * 6 });
    var t = 0;
    (function f() { x.clearRect(0, 0, c.width, c.height); ps.forEach(function (p) { p.y += p.vy; p.x += p.vx; p.a += .1; x.fillStyle = p.c; x.save(); x.translate(p.x, p.y); x.rotate(p.a); x.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 1.6); x.restore(); }); if (++t < 150) requestAnimationFrame(f); else x.clearRect(0, 0, c.width, c.height); })();
  }

  /* ---------- admin panel ---------- */
  function draft() { var d = load(LS_DRAFT, null); if (!d) { d = JSON.parse(JSON.stringify(CONTENT)); } d.videos = d.videos || []; d.pages = d.pages || {}; ["B1", "B2", "C1"].forEach(function (L) { d.pages[L] = d.pages[L] || []; }); return d; }
  function saveDraft(d) { save(LS_DRAFT, d); }
  function admin(tab) {
    setHeader("Admin panel", "#/");
    if (!load(LS_ADMIN, false)) {
      view.innerHTML = '<div class="card"><label>PIN kod</label><input class="f" id="pin" type="password" inputmode="numeric"><button class="btn" id="go">Kirish</button></div>';
      document.getElementById("go").onclick = function () { if (document.getElementById("pin").value === ADMIN_PIN) { save(LS_ADMIN, true); admin(); } else toast("PIN noto'g'ri"); };
      return;
    }
    tab = tab || "v";
    var h = '<div class="row" style="margin-bottom:12px"><button class="btn ' + (tab === "v" ? "" : "alt") + '" data-go="#/admin/v">Videolar</button><button class="btn ' + (tab === "p" ? "" : "alt") + '" data-go="#/admin/p">Mashqlar</button><button class="btn ' + (tab === "c" ? "" : "alt") + '" data-go="#/admin/c">Saqlash</button></div><div id="adm"></div>';
    view.innerHTML = h; bindGo();
    var box = document.getElementById("adm");
    if (tab === "v") adminVideos(box); else if (tab === "p") adminPages(box); else adminCode(box);
  }
  function adminVideos(box) {
    var d = draft();
    var h = '<div class="card"><h3>Yangi videodars</h3><label>Dars nomi</label><input class="f" id="vt" placeholder="1-dars. Alifbo va tovushlar"><label>Telegram post havolasi</label><input class="f" id="vl" placeholder="https://t.me/kanal_nomi/12"><label>Qisqa izoh (ixtiyoriy)</label><input class="f" id="vd"><button class="btn" id="vadd">+ Qo\'shish</button>' +
      '<p class="muted" style="margin-top:8px">Havolani olish: Telegramda videoni bosib turing → «Havolani nusxalash» (Copy link).</p></div><div class="card"><h3>Darslar (' + d.videos.length + ')</h3>';
    d.videos.forEach(function (v, i) { h += '<div class="row" style="align-items:center;border-top:1px solid var(--line);padding:8px 0"><span style="flex:3"><b>' + (i + 1) + '. ' + esc(v.title) + '</b><br><span class="muted">' + esc(v.link) + '</span></span><span style="flex:none"><button class="del" data-up="' + i + '">↑</button> <button class="del" data-del="' + i + '">✕</button></span></div>'; });
    box.innerHTML = h + '</div>';
    document.getElementById("vadd").onclick = function () {
      var t = document.getElementById("vt").value.trim(), l = document.getElementById("vl").value.trim();
      if (!t || !l) return toast("Nom va havolani kiriting");
      d.videos.push({ title: t, link: l, desc: document.getElementById("vd").value.trim() }); saveDraft(d); toast("Qo'shildi"); adminVideos(box);
    };
    box.querySelectorAll("[data-del]").forEach(function (b) { b.onclick = function () { d.videos.splice(+b.dataset.del, 1); saveDraft(d); adminVideos(box); }; });
    box.querySelectorAll("[data-up]").forEach(function (b) { b.onclick = function () { var i = +b.dataset.up; if (i > 0) { var t = d.videos[i]; d.videos[i] = d.videos[i - 1]; d.videos[i - 1] = t; saveDraft(d); adminVideos(box); } }; });
  }
  var cur = null; // tahrirlanayotgan bet
  function adminPages(box) {
    var d = draft();
    if (!cur) cur = { L: "B1", title: "", theory: "", qs: [] };
    var h = '<div class="card"><h3>Yangi bet (kitob mashqlari)</h3><label>Daraja</label><select id="pl">' + ["B1", "B2", "C1"].map(function (L) { return '<option' + (cur.L === L ? " selected" : "") + '>' + L + '</option>'; }).join("") + '</select>' +
      '<label>Bet nomi</label><input class="f" id="pt" value="' + esc(cur.title) + '" placeholder="Unit 1 — Present time"><label>Qisqa nazariya (ixtiyoriy)</label><textarea id="ph" rows="3">' + esc(cur.theory) + '</textarea></div>' +
      '<div class="card"><h3>Mashq qo\'shish</h3><label>Turi</label><select id="qt"><option value="mc">Test (4 variant)</option><option value="gap">Bo\'sh joyni to\'ldirish</option><option value="wf">So\'z yasash</option><option value="kw">Kalit so\'z bilan qayta yozish</option></select>' +
      '<div id="kwf" hidden><label>Asl gap</label><input class="f" id="qs"><label>Kalit so\'z</label><input class="f" id="qk"></div>' +
      '<label>Savol (bo\'sh joyni ___ bilan belgilang)</label><input class="f" id="qq" placeholder="She ___ to school every day.">' +
      '<div id="wff" hidden><label>Asos so\'z (katta harfda)</label><input class="f" id="qw"></div>' +
      '<div id="mcf"><label>Variantlar</label><input class="f" id="o0" placeholder="A"><input class="f" id="o1" placeholder="B" style="margin-top:6px"><input class="f" id="o2" placeholder="C" style="margin-top:6px"><input class="f" id="o3" placeholder="D" style="margin-top:6px"><label>To\'g\'ri variant</label><select id="oa"><option value="0">A</option><option value="1">B</option><option value="2">C</option><option value="3">D</option></select></div>' +
      '<div id="ansf" hidden><label>To\'g\'ri javob(lar) — bir nechta bo\'lsa | bilan ajrating</label><input class="f" id="qa" placeholder="goes | is going"></div>' +
      '<button class="btn" id="qadd">+ Mashqni qo\'shish</button></div>' +
      '<div class="card"><h3>Shu betdagi mashqlar (' + cur.qs.length + ')</h3>' + cur.qs.map(function (q, k) { return '<div class="row" style="align-items:center;border-top:1px solid var(--line);padding:6px 0"><span style="flex:3">' + (k + 1) + '. ' + esc(q.q) + '</span><span style="flex:none"><button class="del" data-dq="' + k + '">✕</button></span></div>'; }).join("") +
      '<button class="btn green" id="psave">Betni saqlash</button></div>';
    h += '<div class="card"><h3>Qo\'shilgan betlar</h3>';
    ["B1", "B2", "C1"].forEach(function (L) { d.pages[L].forEach(function (p, i) { h += '<div class="row" style="align-items:center;border-top:1px solid var(--line);padding:6px 0"><span style="flex:3"><b>' + L + '</b> · ' + esc(p.title) + ' (' + p.qs.length + ' mashq)</span><span style="flex:none"><button class="del" data-dp="' + L + ':' + i + '">✕</button></span></div>'; }); });
    box.innerHTML = h + '</div>';
    var qt = document.getElementById("qt");
    function sync() { var t = qt.value; document.getElementById("mcf").hidden = t !== "mc"; document.getElementById("ansf").hidden = t === "mc"; document.getElementById("wff").hidden = t !== "wf"; document.getElementById("kwf").hidden = t !== "kw"; }
    qt.onchange = sync; sync();
    function keep() { cur.L = document.getElementById("pl").value; cur.title = document.getElementById("pt").value; cur.theory = document.getElementById("ph").value; }
    document.getElementById("qadd").onclick = function () {
      keep();
      var t = qt.value, q = { t: t, q: document.getElementById("qq").value.trim() };
      if (!q.q) return toast("Savolni kiriting");
      if (t === "mc") { q.o = [0, 1, 2, 3].map(function (n) { return document.getElementById("o" + n).value.trim(); }).filter(Boolean); q.a = +document.getElementById("oa").value; if (q.o.length < 2 || q.a >= q.o.length) return toast("Variantlarni to'liq kiriting"); }
      else { q.a = document.getElementById("qa").value.split("|").map(function (s) { return s.trim(); }).filter(Boolean); if (!q.a.length) return toast("To'g'ri javobni kiriting"); }
      if (t === "wf") q.w = document.getElementById("qw").value.trim().toUpperCase();
      if (t === "kw") { q.s = document.getElementById("qs").value.trim(); q.k = document.getElementById("qk").value.trim().toUpperCase(); }
      cur.qs.push(q); toast("Mashq qo'shildi"); adminPages(box);
    };
    box.querySelectorAll("[data-dq]").forEach(function (b) { b.onclick = function () { keep(); cur.qs.splice(+b.dataset.dq, 1); adminPages(box); }; });
    document.getElementById("psave").onclick = function () {
      keep(); if (!cur.title || !cur.qs.length) return toast("Bet nomi va kamida 1 ta mashq kerak");
      d.pages[cur.L].push({ title: cur.title, theory: cur.theory, qs: cur.qs }); saveDraft(d); cur = null; toast("Bet saqlandi"); adminPages(box);
    };
    box.querySelectorAll("[data-dp]").forEach(function (b) { b.onclick = function () { var x = b.dataset.dp.split(":"); d.pages[x[0]].splice(+x[1], 1); saveDraft(d); adminPages(box); }; });
  }
  function adminCode(box) {
    var json = JSON.stringify(draft(), null, 1);
    box.innerHTML = '<div class="card"><h3>Talabalarga chiqarish</h3><p>Qo\'shganlaringiz hozircha faqat shu telefonda ko\'rinadi. Hammaga chiqishi uchun:</p><ol style="margin:8px 0 8px 20px"><li>«Kodni nusxalash» tugmasini bosing.</li><li>GitHub\'dagi <b>ingliz</b> reposida <b>content.json</b> faylini oching → ✏️ (Edit).</li><li>Eski matnni o\'chirib, nusxani qo\'ying → «Commit changes».</li></ol><button class="btn" id="cp">Kodni nusxalash</button><button class="btn alt" id="rs">Saytdagi versiyani qayta yuklash</button></div><pre class="code">' + esc(json) + '</pre>';
    document.getElementById("cp").onclick = function () {
      if (navigator.clipboard) navigator.clipboard.writeText(json).then(function () { toast("Nusxalandi ✓"); }, function () { toast("Pastdagi matnni qo'lda belgilang"); });
      else toast("Pastdagi matnni qo'lda belgilang");
    };
    document.getElementById("rs").onclick = function () { localStorage.removeItem(LS_DRAFT); toast("Saytdagi versiya yuklandi"); admin("c"); };
  }

  /* ---------- router ---------- */
  function route() {
    if (PL) { clearTimeout(PL.t); PL.gen++; }
    musicStop(); stopAll();
    var h = location.hash.replace(/^#\/?/, "").split("/");
    if (h[0] === "videos") videos();
    else if (h[0] === "video") video(+h[1] || 0);
    else if (h[0] === "level") level(h[1]);
    else if (h[0] === "page") page(h[1], +h[2] || 0);
    else if (h[0] === "admin") admin(h[1]);
    else if (h[0] === "listen") unitListen(h[1], +h[2] || 0);
    else if (h[0] === "speak") unitSpeak(h[1], +h[2] || 0);
    else if (h[0] === "cefr") cefr();
    else if (h[0] === "build") unitBuild(h[1], +h[2] || 0);
    else if (h[0] === "vocab") vocab();
    else if (h[0] === "irr") irrHome();
    else if (h[0] === "ig") irrGame(h[1], +h[2] || 0);
    else if (h[0] === "vt") vTopic(+h[1] || 0);
    else if (h[0] === "vg") vGame(h[1], +h[2] || 0, +h[3] || 0);
    else if (h[0] === "cl") cefrListen(+h[1] || 0);
    else if (h[0] === "sp") cefrSpeak(+h[1] || 1);
    else home();
  }
  window.addEventListener("hashchange", route);
  (function splash() {
    var d = document.createElement("div"); d.id = "splash";
    d.innerHTML = '<div class="hr-badge big"><img src="botir.jpg" alt=""></div><h1>Botir bilan<br>CEFR kurslari</h1><p>B1 · B2 · C1 · Listening · Speaking</p>';
    document.body.appendChild(d);
    function off() { d.classList.add("out"); setTimeout(function () { d.remove(); }, 600); }
    d.onclick = off; setTimeout(off, 2600);
  })();

  fetch("content.json?v=" + Date.now()).then(function (r) { return r.json(); }).then(function (j) { CONTENT = j; }).catch(function () {}).then(route);
  if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(function () {});
})();
