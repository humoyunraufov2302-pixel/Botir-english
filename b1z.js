// B1 — 42 unit tartibini yig'ish + har 6 unitdan keyin Review
(function () {
  var all = (window.B1P || []).filter(function (p) { return !/^Review/.test(p.title); });
  function key(t) { return t.replace(/^Unit \d+ · /, ""); }
  var ORDER = [
    "Present simple va continuous", "Fun and games", "Past simple, past continuous", "Learning and doing",
    "Future time", "Coming and going", "Present perfect simple", "Friends and relations",
    "Past perfect simple", "Buying and selling", "Questions va question tags", "Weather",
    "Articles", "Clothes and fashion", "Countable / uncountable", "Inventions and discoveries",
    "Modals 1", "Sickness and health", "Modals 2", "Working and earning",
    "Conditionals 1", "People and daily life", "Conditionals 2", "Technology and communication",
    "Passive voice", "Nature and the environment", "Causative", "Holidays and celebrations",
    "Reported speech", "Media and entertainment", "Relative clauses", "Town and city",
    "Gerunds and infinitives", "Food and cooking", "Comparatives", "Feelings and emotions",
    "Pronouns", "Animals", "Prepositions of time", "Art and music",
    "Linking words", "Crime and the law"
  ];
  var units = ORDER.map(function (k) {
    var p = all.filter(function (x) { return key(x.title).indexOf(k) >= 0; })[0];
    if (!p) throw new Error("B1 unit topilmadi: " + k);
    return p;
  });
  var out = [];
  units.forEach(function (p, i) {
    var G = window.B1G || {}, ex = null;
    Object.keys(G).forEach(function (k) { if (key(p.title).indexOf(k) >= 0) ex = G[k]; });
    out.push({ title: "Unit " + (i + 1) + " · " + key(p.title), theory: p.theory, qs: p.qs, video: p.video, explain: ex });
    if ((i + 1) % 6 === 0) {
      var from = i - 5, qs = [];
      for (var j = from; j <= i; j++) { var u = units[j].qs; qs.push(u[u.length - 3], u[2]); }
      out.push({ title: "Review " + ((i + 1) / 6) + " · Unit " + (from + 1) + "–" + (i + 1) + " takrorlash", review: true,
        theory: "Bu bet " + (from + 1) + "–" + (i + 1) + "-unitlarni takrorlaydi. Har bir unitdan mashqlar aralash berilgan.", qs: qs });
    }
  });
  window.LEVELS.B1.pages = out;
})();
