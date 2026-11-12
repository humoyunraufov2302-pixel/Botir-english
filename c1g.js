// C1 grammatika — batafsil tushuntirish (avval asos, so'ng C1 nozikliklari)
window.C1G = {
"Present time": [
 {h:"Asosdan boshlaymiz", p:"Hozirgi zamonning to'rt shakli bor. Har birining asosiy vazifasini eslab olamiz, so'ng C1 darajasidagi nozik ma'nolarga o'tamiz."},
 {h:"To'rt shakl", f:["Present simple:  I work — odat, fakt, doimiy holat","Present continuous:  I am working — hozir, vaqtinchalik, o'zgarib borayotgan","Present perfect:  I have worked — natija, tajriba, hozirgacha","Present perfect continuous:  I have been working — davomiylik, yaqinda tugagan ishning izi"]},
 {h:"Stative fe'llar", p:"know, believe, belong, own, seem, consist, contain — odatda continuous olmaydi. Ma'nosi o'zgarsa olishi mumkin: I'm thinking (o'ylayapman) / I think (fikrimcha)."},
 {h:"C1: odatni ifodalash", f:["will + V1 — xarakterli odat:  He'll sit there for hours.","keep (on) + V-ing — qayta-qayta, bezovta qiladi:  He keeps losing his keys.","always / forever / constantly + continuous — norozilik:  She's forever complaining."]},
 {h:"C1: perfect continuous — iz qoldirgan ish", p:"Your hands are dirty. What have you been doing? — Ish tugagan, lekin natijasi ko'rinib turibdi."},
 {h:"Hikoya va sharhlarda present simple", p:"Kitob, film syujetini aytganda va sport sharhlarida present simple ishlatiladi: In the novel, the hero returns home after the war."},
 {ex:[["I've been learning Chinese for three years.","Uch yildan beri xitoy tilini o'rganyapman."],["He keeps leaving his socks on the floor.","U paypoqlarini polga tashlab ketaveradi."],["This is the third time you've called me today.","Bu bugun menga uchinchi marta qo'ng'iroq qilishing."]]},
 {w:["This is the first time I see snow.","This is the first time I've seen snow.","This is the first / second time ... dan keyin present perfect."]}
],
"Past time": [
 {h:"Asosdan boshlaymiz", f:["Past simple:  I worked — tugagan ish","Past continuous:  I was working — o'tmishda davom etayotgan","Past perfect:  I had worked — undan oldin","Past perfect continuous:  I had been working — oldin davom etib kelgan"]},
 {h:"O'tmishdagi odat", f:["used to + V1 — odat yoki holat:  I used to live here.","would + V1 — faqat takroriy harakat:  We would swim every day.","was always + V-ing — o'tmishdagi norozilik"]},
 {h:"C1: amalga oshmagan reja", f:["was / were going to + V1:  I was going to call you, but I forgot.","was about to + V1:  I was about to leave when he arrived.","meant to / intended to / had hoped to"]},
 {h:"C1: vaqt bog'lovchilari bilan inversiya", f:["No sooner had + ega + V3 + than ...","Hardly / Scarcely had + ega + V3 + when ..."]},
 {ex:[["No sooner had I sat down than the doorbell rang.","O'tirishim bilanoq eshik qo'ng'irog'i jiringladi."],["It was the first time I had seen snow.","Bu men birinchi marta qor ko'rishim edi."],["I was going to visit her, but I was too busy.","Uni ko'rgani bormoqchi edim, lekin juda band edim."]]},
 {w:["No sooner had I arrived when it rained.","No sooner had I arrived than it rained.","No sooner ... THAN; Hardly ... WHEN."]}
],
"Future time": [
 {h:"Asosdan boshlaymiz", f:["will — bashorat, qaror, va'da","be going to — niyat, dalilga asoslangan bashorat","present continuous — kelishilgan reja","present simple — jadval"]},
 {h:"Murakkab shakllar", f:["will be + V-ing — kelajakda davom etayotgan","will have + V3 — muddatgacha tugagan","will have been + V-ing — muddatgacha davom etgan"]},
 {h:"C1: rasmiy va maxsus iboralar", f:["be to + V1 — rasmiy reja / buyruq:  The President is to visit Samarkand.","be due to + V1 — jadval bo'yicha","be about to / be on the point of + V-ing — juda yaqin","be on the verge / brink of + ot — arafasida (ko'pincha salbiy)","be bound to / be sure to — albatta bo'ladi","be likely / unlikely to — ehtimoli bor / yo'q"]},
 {h:"C1: o'tmishdagi kelajak", p:"O'tmishdan qaraganda kelajak: would, was going to, was to: I knew she would be late. They were to meet again years later."},
 {ex:[["The company is on the verge of collapse.","Kompaniya qulash arafasida."],["By 2030, scientists will have found a cure.","2030 yilga kelib olimlar davosini topgan bo'ladi."],["It's bound to rain later.","Keyinroq albatta yomg'ir yog'adi."]]},
 {w:["When I will finish, I'll call you.","When I finish / have finished, I'll call you.","Vaqt bog'lovchisidan keyin will yo'q."]}
],
"Passives and causatives": [
 {h:"Asosdan boshlaymiz", p:"Passiv = be (kerakli zamonda) + V3. Bajaruvchi muhim bo'lmasa yoki noma'lum bo'lsa ishlatiladi; bajaruvchi kerak bo'lsa — by."},
 {h:"Barcha zamonlar", f:["is done / is being done / has been done","was done / was being done / had been done","will be done / will have been done","modal + be done / modal + have been done"]},
 {h:"C1: shaxssiz passiv", f:["It is said / believed / thought / reported that + gap","Ega + is said to + V1 — hozir","Ega + is said to be + V-ing — hozir davom etayotgan","Ega + is said to have + V3 — o'tmish"]},
 {ex:[["It is believed that the castle was built in 1200.","Qal'a 1200 yilda qurilgan deb hisoblanadi."],["He is thought to have left the country.","U mamlakatni tark etgan deb taxmin qilinmoqda."]]},
 {h:"Causatives", f:["have / get + narsa + V3:  I had my car repaired.","have + kishi + V1:  I had the mechanic check it.","get + kishi + to V1:  I got him to check it.","Noxush voqea:  She had her bag stolen."]},
 {h:"Ikki to'ldiruvchili fe'llar", p:"They gave me a prize → I was given a prize (ko'proq ishlatiladi) yoki A prize was given to me."},
 {w:["The bridge is reported to be damaged yesterday.","The bridge is reported to have been damaged yesterday.","O'tmishdagi voqea — perfect passive infinitive."]}
],
"Modals and semi-modals": [
 {h:"Asosdan boshlaymiz", p:"Modal fe'llar: can, could, may, might, must, shall, should, will, would. Semi-modallar: have to, need to, be able to, ought to, had better, be supposed to. Moddan keyin V1 (to'siz)."},
 {h:"Majburiyat va zarurat", f:["must / have to — majburiyat;  mustn't — taqiq","don't have to / needn't — zarurat yo'q","needn't have + V3 — keraksiz qilindi","didn't need to + V1 — kerak bo'lmadi","be supposed to — kutilgan (ko'pincha bajarilmagan)"]},
 {h:"Qobiliyat va ruxsat", f:["can / could / be able to / manage to","may / might / can / could / be allowed to"]},
 {h:"Taxmin: hozir va o'tmish", f:["must (+ have V3) — aniq","may / might / could (+ have V3) — balki","can't / couldn't (+ have V3) — mumkin emas","should (+ have V3) — kutilgan natija"]},
 {h:"Tanqid va afsus", f:["should have / ought to have + V3 — qilish kerak edi","might / could have + V3 — tanbeh:  You might have told me!"]},
 {h:"C1 iboralar", f:["may / might well — ehtimoli katta","might / may as well — boshqa iloj yo'q, yaxshisi","be bound to — albatta","I dare say — ehtimol"]},
 {ex:[["You needn't have bought milk — we had some.","Sut olishing shart emas edi."],["She can't have said that.","U buni aytgan bo'lishi mumkin emas."],["We might as well go home.","Yaxshisi, uyga ketaqolaylik."]]},
 {w:["He mustn't have seen me.","He can't have seen me.","Inkor taxminda can't ishlatiladi."]}
],
"Conditionals": [
 {h:"Asosdan boshlaymiz", f:["0:  If + present, present","1:  If + present, will + V1","2:  If + past, would + V1","3:  If + past perfect, would have + V3","Mixed:  If + past perfect, would + V1  /  If + past, would have + V3"]},
 {h:"C1: inversiya bilan shart", f:["Should you need help, ... = If you should need help","Were I in your position, ... = If I were","Were the government to raise taxes, ...","Had I known, ... = If I had known"]},
 {h:"C1: if o'rnidagi so'zlar", f:["unless, provided / providing (that), as long as, on condition that","in case — ehtiyot uchun;  otherwise — aks holda","but for / without + ot — ... bo'lmaganida","if it hadn't been for / had it not been for","suppose / supposing / imagine"]},
 {h:"if bilan will / would", p:"Iltimos va qat'iy talabda if dan keyin will/would bo'lishi mumkin: If you would wait here, please. If you will keep shouting, people will leave."},
 {ex:[["Had it not been for his help, I would have failed.","Uning yordami bo'lmaganida, yiqilgan bo'lardim."],["Should you require further information, please contact us.","Qo'shimcha ma'lumot kerak bo'lsa, biz bilan bog'laning."]]},
 {w:["If I would know, I would tell you.","If I knew, I would tell you.","Oddiy shart gapda if-qismda would yo'q."]}
],
"Unreal time": [
 {h:"Asosdan boshlaymiz", p:"Ingliz tilida 'haqiqatda bunday emas' ma'nosini zamonni orqaga surish bilan beramiz: hozir uchun — past simple, o'tmish uchun — past perfect."},
 {h:"wish va if only", f:["wish + past — hozirgi afsus:  I wish I knew.","wish + past perfect — o'tmish afsusi:  I wish I had known.","wish + would — norozilik:  I wish you would stop.","if only — wish dan kuchliroq"]},
 {h:"Boshqa iboralar", f:["It's (high / about) time + past:  It's time we left.","would rather / would sooner + kishi + past:  I'd rather you didn't.","as if / as though + past:  He talks as if he knew everything.","suppose / supposing / what if + past"]},
 {h:"C1: subjunctive", p:"Rasmiy talab va tavsiyada fe'l asos shaklda, -s siz: It is essential that he be informed. I suggest that she attend. Inglizcha British variantda should bilan ham: ...that she should attend."},
 {ex:[["If only I hadn't said that!","Qani endi buni aytmagan bo'lsam!"],["It's essential that every student attend.","Har bir talabaning qatnashishi shart."],["I'd sooner you told me the truth.","Menga rostini aytganingni afzal ko'rardim."]]},
 {w:["It's time we go.","It's time we went.","It's time + ega dan keyin past simple."]}
],
"Adjectives and adverbs": [
 {h:"Asosdan boshlaymiz", p:"Sifat otni tasvirlaydi (a fast car), ravish fe'l, sifat yoki butun gapni (he drives fast, extremely good, Fortunately, ...). Ko'pincha ravish = sifat + -ly."},
 {h:"Sifatlar tartibi", f:["fikr → o'lcham → yosh → shakl → rang → kelib chiqish → material → maqsad","a beautiful old wooden table","a lovely small round blue Italian glass vase"]},
 {h:"Gradable va ungradable", f:["Gradable: cold, good, big — very / extremely / fairly bilan","Ungradable (ekstremal): freezing, brilliant, huge — absolutely / utterly / totally bilan","really va quite ikkalasi bilan ham ishlaydi"]},
 {h:"Ikki shakli bor ravishlar", f:["hard (qattiq) / hardly (deyarli ... emas)","late (kech) / lately (yaqinda)","near (yaqin) / nearly (deyarli)","high (baland) / highly (juda, yuqori darajada)","free (bepul) / freely (erkin)"]},
 {h:"Solishtirish (C1)", f:["far / much / considerably / slightly + comparative","nowhere near as ... as;  nothing like as ... as","the + comparative, the + comparative","by far / easily + superlative","twice / three times as ... as"]},
 {ex:[["The film was absolutely brilliant.","Film mutlaqo ajoyib edi."],["She is a highly respected scientist.","U juda hurmatli olim."],["This hotel is nowhere near as good as the last one.","Bu mehmonxona oldingisiga sira teng kelmaydi."]]},
 {w:["It was very freezing.","It was absolutely freezing / very cold.","Ekstremal sifat bilan very ishlatilmaydi."]}
],
"Clauses": [
 {h:"Asosdan boshlaymiz", p:"Ergash gap — asosiy gapga bog'langan qo'shimcha gap. Bu unitda uch turi: nisbiy (relative), participle va hol ergash gaplar (vaqt, maqsad, sabab, qarama-qarshilik)."},
 {h:"1. Relative clauses", f:["who, which, that, whose, where, when, why, whom","Defining (vergulsiz) — that mumkin","Non-defining (vergulli) — that yo'q","Predlog + whom / which:  the man to whom I spoke","Miqdor + of whom / which:  both of whom, most of which","which = butun gap:  He passed, which surprised us."]},
 {h:"2. Participle clauses", f:["V-ing — aktiv:  Feeling tired, I went to bed.","V3 — passiv:  Built in 1890, the bridge ...","Having + V3 — oldin tugagan:  Having finished, he left.","Not + V-ing — inkor"]},
 {h:"3. Hol ergash gaplar", f:["Vaqt: when, while, as soon as, until, once, by the time","Maqsad: so that, in order to, so as to, in case","Sabab: because, as, since, seeing that","Qarama-qarshilik: although, even though, whereas, while, much as, however + sifat"]},
 {h:"C1: qarama-qarshilikning murakkab shakllari", f:["Much as I like him, ... — Garchi uni yaxshi ko'rsam ham","Try as he might, ... — Qanchalik urinmasin","Adj + as / though + ega + be:  Tired as he was, he kept working.","notwithstanding, nonetheless, nevertheless"]},
 {ex:[["She has two brothers, both of whom are doctors.","Uning ikki akasi bor, ikkalasi ham shifokor."],["Having finished his work, he left the office.","Ishini tugatib, u ofisdan chiqdi."],["Much as I like him, I can't agree with him.","Uni qanchalik yoqtirmay, u bilan rozi bo'la olmayman."]]},
 {w:["Walking home, the rain started.","Walking home, I got caught in the rain.","Participle va asosiy gap egasi bir xil bo'lsin."]}
],
"Complex sentences": [
 {h:"Asosdan boshlaymiz", p:"Oddiy gap tartibi: ega + fe'l + to'ldiruvchi. C1 da urg'u berish uchun bu tartib o'zgartiriladi: inversiya, cleft (bo'lingan) gaplar va urg'uli do."},
 {h:"1. Inversiya", f:["Inkor / cheklovchi so'z gap boshida → yordamchi fe'l + ega","Never have I seen ...;  Rarely / Seldom do we ...","Not only did he ..., but he also ...","Hardly had ... when;  No sooner had ... than","Only when / Only after / Not until ... did I realise","Under no circumstances / On no account should you ...","Little did she know ...;  So + sifat + was + ega + that ..."]},
 {ex:[["Never have I seen such a beautiful view.","Hech qachon bunday go'zal manzarani ko'rmaganman."],["Only when I got home did I realise I had lost my wallet.","Uyga kelgandagina hamyonimni yo'qotganimni angladim."]]},
 {h:"2. Cleft sentences", f:["It is / was + ... + that / who:  It was Ali who found it.","What + ega + fe'l + is / was:  What I need is a holiday.","All I want is ...;  The reason why ... is that ...","The thing that ... is ...;  What happened was that ..."]},
 {ex:[["What annoys me is his rudeness.","Meni uning qo'polligi g'ashimni keltiradi."],["It was not until midnight that she came home.","U faqat yarim tunda uyga keldi."]]},
 {h:"3. Urg'uli do / does / did", p:"Tasdiq gapda fe'l oldidan do qo'yilsa, kuchli urg'u beradi: I do want to help you! She did call — I saw her."},
 {w:["Never I have seen this.","Never have I seen this.","Inversiyada yordamchi fe'l egadan oldin."]}
],
"Noun phrases": [
 {h:"Asosdan boshlaymiz", p:"Ot birikmasi = artikl / determiner + sifat(lar) + ot + qo'shimcha qism. Otning turi (sanaladigan, sanalmaydigan, jamoa oti) butun birikmani belgilaydi."},
 {h:"Otlar turlari", f:["Sanalmaydigan: advice, information, news, furniture, research — a/an yo'q, fe'l birlikda","Jamoa otlari: team, family, government — BrE da fe'l ko'plikda ham","Doim ko'plik: police, people, clothes, trousers","-s bilan, lekin birlik: news, physics, mathematics, economics"]},
 {h:"Artikllar", f:["a / an — tovushga qarab: an hour, an honest man, a university","the — ma'lum, yagona, the + sifat = guruh (the rich)","Artiklsiz — umumiy ma'no, ko'p davlat, ovqat, sport","go to school / prison / hospital (vazifasi bo'yicha) va go to the prison (bino sifatida)"]},
 {h:"Miqdor so'zlari", f:["a number of + ko'plik → fe'l ko'plikda","the number of + ko'plik → fe'l birlikda","a great deal / amount of + sanalmaydigan","each / every + birlik;  neither / either of + ko'plik → fe'l birlikda"]},
 {h:"Ot + ot va 's", p:"a car door (narsa qismi), a teacup, the company's profits (egalik), a week's holiday (vaqt), a ten-minute walk (son + ot — birlikda, defis bilan)."},
 {ex:[["The number of students is increasing.","Talabalar soni ortib bormoqda."],["A number of students are absent.","Bir qancha talabalar yo'q."],["The police are investigating the crime.","Politsiya jinoyatni tergov qilmoqda."]]},
 {w:["a ten-minutes walk","a ten-minute walk","Son + ot sifat vazifasida — birlikda."]}
],
"Verbal complements": [
 {h:"Asosdan boshlaymiz", p:"Fe'ldan keyin nima keladi? Bu — fe'l to'ldiruvchisi: to + V1, V-ing, V1, that-gap yoki predlog + V-ing. Har bir fe'lning o'z tuzilmasi bor."},
 {h:"Asosiy tuzilmalar", f:["fe'l + to V1:  decide, hope, manage, refuse, seem","fe'l + V-ing:  avoid, enjoy, deny, consider, can't help","fe'l + kishi + to V1:  ask, tell, persuade, warn","fe'l + kishi + V1:  make, let, help","fe'l + predlog + V-ing:  insist on, succeed in, object to"]},
 {h:"Ma'nosi o'zgaradigan fe'llar", f:["remember / forget / regret + V-ing (o'tmish) yoki + to V1 (kelajak / xabar)","stop / try / go on / mean + V-ing yoki + to V1"]},
 {h:"C1: murakkab shakllar", f:["Perfect infinitive:  She seems to have lost weight.","Passive infinitive:  He wants to be promoted.","Passive gerund:  I hate being told what to do.","Perfect gerund:  He denied having seen it."]},
 {h:"Bog'liq predloglar", f:["sifat + predlog:  capable of, familiar with, keen on, aware of","ot + predlog:  increase in, solution to, talent for, reason for","fe'l + predlog:  depend on, succeed in, apologise for, accuse of"]},
 {ex:[["I can't help feeling sorry for him.","Unga achinmasdan iloji yo'q."],["The house is said to have been built in 1800.","Uy 1800 yilda qurilgan deyishadi."],["She succeeded in passing the exam.","U imtihondan o'tishga muvaffaq bo'ldi."]]},
 {w:["I object to be treated like this.","I object to being treated like this.","object TO — to predlog, shuning uchun -ing."]}
],
"Reporting": [
 {h:"Asosdan boshlaymiz", p:"O'zlashtirma gapda zamon odatda bir pog'ona orqaga suriladi, olmoshlar va vaqt so'zlari o'zgaradi. Savolda so'z tartibi oddiy gapdagidek bo'ladi."},
 {h:"Zamon siljishi", f:["present → past;  past / present perfect → past perfect","will → would;  can → could;  may → might;  must → had to","today → that day;  tomorrow → the next / following day;  ago → before"]},
 {h:"Siljish shart emas", p:"Fakt hali ham to'g'ri bo'lsa (He said he lives in Samarkand) yoki umumiy haqiqat bo'lsa (The Earth goes round the Sun), zamon o'zgarmasligi mumkin."},
 {h:"Reporting fe'llar tuzilmasi", f:["+ to V1:  agree, offer, promise, refuse, threaten","+ kishi + to V1:  advise, encourage, persuade, remind, warn","+ V-ing:  admit, deny, recommend, suggest","+ predlog + V-ing:  apologise for, insist on, accuse sb of, blame sb for","+ that (should) + V1:  suggest, recommend, insist"]},
 {h:"C1: shaxssiz reporting", p:"It is said / reported / claimed that ... va He is said to have ... — yangiliklar va ilmiy matnlarda."},
 {ex:[["'I'll definitely finish it.' → He promised to finish it.","U uni tugatishga va'da berdi."],["She suggested that we postpone the meeting.","U uchrashuvni qoldirishni taklif qildi."],["He denied having seen the documents.","U hujjatlarni ko'rganini inkor etdi."]]},
 {w:["She suggested me to go.","She suggested that I go / suggested going.","suggest + kishi + to V1 ishlatilmaydi."]}
]
};
