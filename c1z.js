// C1 — Destination C1&C2 mundarijasi bo'yicha 26 unit, har 2 unitdan keyin Review, 12 va 26-unitdan keyin Progress Test, oxirida ma'lumotnoma bo'limlari
window.C1VU = (window.C1VU || []).concat([
{ title: "Vocabulary: Preference and leisure", theory: "be into (qiziqmoq), be keen on, be fond of, have a soft spot for (alohida mehri bor), can't stand, go in for (shug'ullanmoq), take up, get into, unwind (dam olib bo'shashmoq), while away the time (vaqt o'tkazmoq), pastime, pursuit.\nprefer A to B; would rather + V1 + than + V1.", qs: [
  {t:"mc", q:"I've been ___ photography since I was a teenager.", o:["into","onto","in for","up"], a:0},
  {t:"mc", q:"She has a soft ___ for old films.", o:["spot","place","heart","corner"], a:0},
  {t:"mc", q:"I can't ___ horror films; they scare me.", o:["stand","bear up","like","put"], a:0},
  {t:"mc", q:"After work, I like to ___ with a good book.", o:["unwind","wind up","undo","unload"], a:0},
  {t:"mc", q:"Chess is his favourite ___.", o:["pastime","pass time","past-time","time pass"], a:0},
  {t:"mc", q:"We whiled ___ the afternoon playing cards.", o:["away","off","out","on"], a:0},
  {t:"gap", q:"My brother goes in ___ extreme sports.", a:["for"]},
  {t:"gap", q:"I'd rather ___ (stay) in than go out tonight.", a:["stay"]},
  {t:"gap", q:"I prefer hiking ___ cycling.", a:["to"]},
  {t:"gap", q:"She took ___ yoga last year.", a:["up"]},
  {t:"gap", q:"I got ___ jazz when I was at university.", a:["into"]},
  {t:"wf", q:"Fishing is a very ___ hobby.", w:"RELAX", a:["relaxing"]},
  {t:"wf", q:"Gardening is one of the most popular leisure ___.", w:"PURSUE", a:["pursuits"]},
  {t:"wf", q:"His ___ for football started in childhood.", w:"ENTHUSE", a:["enthusiasm"]},
  {t:"kw", s:"I'd prefer to watch a film rather than go out.", k:"RATHER", q:"I ___ a film than go out.", a:["would rather watch","'d rather watch"]}
]}
]);
(function () {
  var base = (window.LEVELS.C1 && window.LEVELS.C1.pages) || [], all = (window.C1GU || []).concat(window.C1VU || []), EX = window.C1G || {};
  function src(key) {
    var u = all.filter(function (x) { return x.title.indexOf(key) >= 0; })[0];
    if (!u) throw new Error("C1 manba topilmadi: " + key);
    var qs = u.qs, th = u.theory;
    if (u.base) { var b = base.filter(function (x) { return x.title.indexOf(u.base) >= 0; })[0]; if (!b) throw new Error("C1 base: " + u.base); qs = b.qs.concat(u.qs); th = th || b.theory; }
    return { qs: qs, theory: th };
  }
  // [kitobdagi nom, [manbalar], grammatika tushuntirish kaliti]
  var BOOK = [
    ["Grammar: Present time", ["Present time"], "Present time"],
    ["Vocabulary: Thinking and learning", ["Thinking and learning"]],
    ["Grammar: Past time", ["Past time"], "Past time"],
    ["Vocabulary: Change and technology", ["Change and technology", "Science and research"]],
    ["Grammar: Future time", ["Future time"], "Future time"],
    ["Vocabulary: Time and work", ["Time and work"]],
    ["Grammar: Passives and causatives", ["impersonal passive"], "Passives and causatives"],
    ["Vocabulary: Movement and transport", ["Movement and transport"]],
    ["Grammar: Modals and semi-modals", ["Modals 1", "Modals 2"], "Modals and semi-modals"],
    ["Vocabulary: Communication and the media", ["Communication and the media"]],
    ["Grammar: Conditionals", ["Advanced conditionals"], "Conditionals"],
    ["Vocabulary: Chance and nature", ["Chance and nature", "The environment"]],
    ["Grammar: Unreal time", ["Unreal past"], "Unreal time"],
    ["Vocabulary: Quantity and money", ["Quantity and money", "Business and economics"]],
    ["Grammar: Adjectives and adverbs", ["Adjectives va adverbs", "Comparison"], "Adjectives and adverbs"],
    ["Vocabulary: Materials and the built environment", ["Materials and the built"]],
    ["Grammar: Clauses", ["Relative clauses", "Participle va reduced", "Linking words"], "Clauses"],
    ["Vocabulary: Reactions and health", ["Health and reactions"]],
    ["Grammar: Complex sentences", ["Inversion", "Cleft sentences"], "Complex sentences"],
    ["Vocabulary: Power and social issues", ["Society and politics", "Law and order"]],
    ["Grammar: Noun phrases", ["Nouns, articles"], "Noun phrases"],
    ["Vocabulary: Quality and the arts", ["Arts and entertainment"]],
    ["Grammar: Verbal complements", ["Gerunds va infinitives", "Dependent prepositions"], "Verbal complements"],
    ["Vocabulary: Relationships and people", ["Relationships"]],
    ["Grammar: Reporting", ["Reported speech"], "Reporting"],
    ["Vocabulary: Preference and leisure activities", ["Preference and leisure", "Opinion and belief"]]
  ];
  var units = BOOK.map(function (b) {
    var qs = [], th = [];
    b[1].forEach(function (k) { var s = src(k); qs = qs.concat(s.qs); if (s.theory) th.push(s.theory); });
    return { title: b[0], theory: th.join("\n\n"), qs: qs, explain: b[2] ? EX[b[2]] : null };
  });
  function pick(from, to, per) { var qs = []; for (var j = from; j <= to; j++) { var q = units[j].qs; for (var k = 0; k < per; k++) qs.push(q[Math.floor((k + 0.5) * q.length / per)]); } return qs; }
  var out = [];
  units.forEach(function (p, i) {
    out.push({ title: "Unit " + (i + 1) + " · " + p.title, theory: p.theory, qs: p.qs, explain: p.explain });
    if (i % 2 === 1) out.push({ title: "Review " + ((i + 1) / 2) + " · Unit " + i + " va " + (i + 1), review: true, theory: "Bu bet " + i + " va " + (i + 1) + "-unitlarni takrorlaydi.", qs: pick(i - 1, i, 6) });
    if (i === 11) out.push({ title: "Progress Test 1 · Unit 1–12", review: true, theory: "Birinchi 12 unit bo'yicha nazorat testi.", qs: pick(0, 11, 2) });
    if (i === 25) out.push({ title: "Progress Test 2 · Unit 13–26", review: true, theory: "13–26-unitlar bo'yicha nazorat testi.", qs: pick(12, 25, 2) });
  });
  [["Reference: Phrasal verbs va collocations", "Collocations va phrasal"], ["Reference: Idioms", "Idioms"], ["Reference: Word formation", "Word formation"], ["Reference: Academic English", "Academic English"]].forEach(function (r) {
    var s = src(r[1]); out.push({ title: r[0], theory: s.theory, qs: s.qs });
  });
  window.LEVELS.C1.pages = out;
  window.LEVELS.C1.sub = "Advanced (Destination C1&C2)";
})();
