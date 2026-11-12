// B2 — 42 unitni yig'ish (grammatika va lug'at navbatma-navbat) + har 6 unitdan keyin Review
(function () {
  var base = (window.LEVELS.B2 && window.LEVELS.B2.pages) || [];
  var G = window.B2GU || [], V = window.B2VU || [], EX = window.B2G || {};
  function full(u) {
    var p = { title: u.title, theory: u.theory, qs: u.qs };
    if (u.base) {
      var b = base.filter(function (x) { return x.title.indexOf(u.base) >= 0; })[0];
      if (!b) throw new Error("B2 base topilmadi: " + u.base);
      p.theory = u.theory || b.theory; p.qs = b.qs.concat(u.qs);
    }
    Object.keys(EX).forEach(function (k) { if (u.title.indexOf(k) >= 0) p.explain = EX[k]; });
    return p;
  }
  var units = [];
  for (var i = 0; i < Math.max(G.length, V.length); i++) { if (G[i]) units.push(full(G[i])); if (V[i]) units.push(full(V[i])); }
  var out = [];
  units.forEach(function (p, i) {
    out.push({ title: "Unit " + (i + 1) + " · " + p.title, theory: p.theory, qs: p.qs, explain: p.explain });
    if ((i + 1) % 6 === 0 || i === units.length - 1 && (i + 1) % 6) {
      var from = i - ((i + 1) % 6 || 6) + 1, qs = [];
      for (var j = from; j <= i; j++) { var q = units[j].qs; qs.push(q[q.length - 3], q[2]); }
      out.push({ title: "Review " + Math.ceil((i + 1) / 6) + " · Unit " + (from + 1) + "–" + (i + 1) + " takrorlash", review: true,
        theory: "Bu bet " + (from + 1) + "–" + (i + 1) + "-unitlarni takrorlaydi.", qs: qs });
    }
  });
  window.LEVELS.B2.pages = out;
})();
