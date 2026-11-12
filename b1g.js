// B1 grammatika — boshlovchilar uchun batafsil tushuntirish
// Bloklar: {h,p} — sarlavha va matn; {f:[...]} — formula; {ex:[[en,uz],...]} — misollar; {w:[xato, to'g'ri, izoh]} — ko'p uchraydigan xato
window.B1G = {
"Present simple va continuous": [
 {h:"Bu mavzu nima haqida?", p:"Ingliz tilida hozirgi zamonning ikki asosiy shakli bor. Present simple — doim, odatda bo'ladigan ishlar. Present continuous — aynan hozir, shu paytda bo'layotgan ish."},
 {h:"Present simple: formula", f:["✅ I / you / we / they + V1","✅ he / she / it + V1 + s/es","❌ I don't + V1  |  he doesn't + V1","❓ Do you + V1?  |  Does he + V1?"]},
 {h:"Qachon ishlatiladi?", p:"Odatlar (har kuni nima qilasiz), doimiy holatlar (qayerda yashaysiz), ilmiy faktlar va jadvallar. Belgi so'zlar: always, usually, often, sometimes, never, every day."},
 {ex:[["I drink tea every morning.","Men har kuni ertalab choy ichaman."],["She works in a bank.","U bankda ishlaydi."],["Water boils at 100°C.","Suv 100°C da qaynaydi."],["Does he speak English?","U inglizcha gapiradimi?"]]},
 {h:"Present continuous: formula", f:["✅ I am + V-ing","✅ he / she / it is + V-ing","✅ you / we / they are + V-ing","❌ I'm not / he isn't / they aren't + V-ing","❓ Are you + V-ing?  |  Is she + V-ing?"]},
 {h:"Qachon ishlatiladi?", p:"Aynan hozir bo'layotgan ish, vaqtinchalik holat (shu hafta, shu oy) va o'zgarib borayotgan jarayon. Belgi so'zlar: now, right now, at the moment, today, this week, Look!, Listen!"},
 {ex:[["I am reading a book now.","Men hozir kitob o'qiyapman."],["Look! It's raining.","Qara! Yomg'ir yog'yapti."],["She is living with her aunt this month.","U bu oy xolasinikida yashayapti (vaqtincha)."]]},
 {h:"Stative fe'llar", p:"Ba'zi fe'llar harakatni emas, holatni bildiradi: know, like, love, want, need, believe, understand, have (egalik). Ular odatda -ing olmaydi."},
 {w:["I am knowing the answer.","I know the answer.","know — holat fe'li, continuous'da kelmaydi."]},
 {w:["He work in a shop.","He works in a shop.","he/she/it bilan fe'lga -s qo'shiladi."]}
],
"Past simple, past continuous": [
 {h:"Bu mavzu nima haqida?", p:"O'tgan zamonda ham ikki shakl bor: past simple — o'tmishda bo'lib, tugagan ish; past continuous — o'tmishning ma'lum bir paytida davom etib turgan ish."},
 {h:"Past simple: formula", f:["✅ Ega + V2 (to'g'ri fe'l: + ed)","   work → worked, play → played","   noto'g'ri fe'l: go → went, see → saw","❌ Ega + didn't + V1","❓ Did + ega + V1?"]},
 {h:"Qachon ishlatiladi?", p:"O'tmishda tugagan ish, ketma-ket bo'lgan voqealar. Belgi so'zlar: yesterday, last week, last year, two days ago, in 2010, when I was a child."},
 {ex:[["I visited Bukhara last year.","O'tgan yili Buxoroga bordim."],["She didn't come to the party.","U ziyofatga kelmadi."],["Did you watch the match?","O'yinni ko'rdingmi?"]]},
 {w:["Did you went there?","Did you go there?","did dan keyin fe'l doim V1 (birinchi shakl) bo'ladi."]},
 {h:"Past continuous: formula", f:["✅ I / he / she / it was + V-ing","✅ you / we / they were + V-ing","❌ wasn't / weren't + V-ing","❓ Was he + V-ing?  |  Were they + V-ing?"]},
 {h:"Qachon ishlatiladi?", p:"O'tmishning aniq bir paytida davom etayotgan ish: At 8 pm yesterday I was cooking. Ko'pincha uzun ish (continuous) qisqa ish (simple) bilan bo'linadi."},
 {ex:[["I was cooking when the phone rang.","Telefon jiringlaganda men ovqat pishirayotgan edim."],["While we were walking, it started to rain.","Biz sayr qilayotganimizda yomg'ir boshlandi."]]},
 {h:"used to + V1", p:"O'tmishda odat bo'lgan, lekin hozir yo'q narsa: I used to play football (ilgari futbol o'ynardim, hozir o'ynamayman). Inkor va so'roqda: didn't use to, Did you use to...?"},
 {ex:[["I used to live in a village.","Ilgari qishloqda yashardim."],["Did you use to have long hair?","Ilgari sochingiz uzun edimi?"]]}
],
"Future time": [
 {h:"Bu mavzu nima haqida?", p:"Ingliz tilida kelajakni aytishning bir nechta yo'li bor. Qaysi birini tanlash — qaror qachon qabul qilinganiga va qanchalik aniq ekaniga bog'liq."},
 {h:"1. will + V1", f:["✅ I / you / he ... will ('ll) + V1","❌ won't (will not) + V1","❓ Will you + V1?"]},
 {p:"Shu zahoti qabul qilingan qaror, va'da, taklif va fikrga asoslangan bashorat (I think, probably)."},
 {ex:[["The phone is ringing. — I'll answer it.","Telefon jiringlayapti. — Men olaman (hozir qaror qildim)."],["I promise I'll help you.","Va'da beraman, yordam beraman."],["I think it will be cold tomorrow.","Menimcha, ertaga sovuq bo'ladi."]]},
 {h:"2. be going to + V1", f:["✅ I am / he is / they are going to + V1"]},
 {p:"Oldindan o'ylab qo'yilgan reja-niyat va ko'z oldimizdagi dalilga asoslangan bashorat."},
 {ex:[["I'm going to study medicine.","Men tibbiyotni o'qimoqchiman (oldindan rejam)."],["Look at the clouds! It's going to rain.","Bulutlarga qara! Yomg'ir yog'adi (dalil bor)."]]},
 {h:"3. Present continuous", p:"Aniq kelishilgan uchrashuv va reja (vaqt, joy belgilangan): I'm meeting Anna at 5 tomorrow."},
 {h:"4. Present simple", p:"Jadval va dastur bo'yicha voqealar: The train leaves at 7:15. The film starts at 8."},
 {h:"5. Future continuous", f:["✅ will be + V-ing"]},
 {p:"Kelajakning aniq bir paytida davom etayotgan ish: This time tomorrow I'll be flying to London."},
 {w:["I will to go.","I will go.","will dan keyin to qo'yilmaydi."]},
 {w:["When I will arrive, I'll call you.","When I arrive, I'll call you.","when, if, as soon as dan keyin kelasi zamon o'rniga present simple ishlatiladi."]}
],
"Present perfect simple": [
 {h:"Bu mavzu nima haqida?", p:"Present perfect — o'tmish bilan hozirni bog'laydigan zamon. O'zbek tilida bunday alohida zamon yo'q, shuning uchun uni yaxshilab tushunib olish muhim."},
 {h:"Formula", f:["✅ I / you / we / they have ('ve) + V3","✅ he / she / it has ('s) + V3","❌ haven't / hasn't + V3","❓ Have you + V3?  |  Has she + V3?"]},
 {h:"V3 nima?", p:"Fe'lning uchinchi shakli. To'g'ri fe'llarda -ed (worked, played), noto'g'ri fe'llarda yod olinadi: go – went – gone, see – saw – seen, do – did – done."},
 {h:"1-holat: hayotiy tajriba", p:"Qachonligi muhim emas, faqat bo'lgan-bo'lmagani muhim. ever, never so'zlari bilan."},
 {ex:[["Have you ever been to London?","Hech London'da bo'lganmisiz?"],["I have never eaten sushi.","Men hech qachon sushi yemaganman."]]},
 {h:"2-holat: natijasi hozir ko'rinib turibdi", p:"just (hozirgina), already (allaqachon), yet (hali; inkor va so'roqda)."},
 {ex:[["I have lost my keys.","Kalitlarimni yo'qotib qo'ydim (hozir ham yo'q)."],["She has just left.","U hozirgina chiqib ketdi."],["Have you finished yet?","Hali tugatdingmi?"]]},
 {h:"3-holat: o'tmishda boshlanib, hozirgacha davom etayotgan holat", p:"for — davomiylik (for 10 years, for a week), since — boshlanish nuqtasi (since 2015, since Monday)."},
 {ex:[["I have lived here for ten years.","Men bu yerda o'n yildan beri yashayman."],["We have known each other since 2015.","Biz bir-birimizni 2015 yildan beri bilamiz."]]},
 {h:"Present perfect continuous", f:["✅ have / has been + V-ing"]},
 {p:"Hozirgacha davom etib kelayotgan ish, davomiyligiga urg'u: I have been waiting for an hour (bir soatdan beri kutyapman)."},
 {w:["I have seen him yesterday.","I saw him yesterday.","Aniq o'tgan vaqt (yesterday, last year, ago) bo'lsa — past simple ishlatiladi."]}
],
"Past perfect simple": [
 {h:"Bu mavzu nima haqida?", p:"Past perfect — 'o'tmishdan ham oldingi o'tmish'. O'tmishda ikkita voqea bo'lsa, qaysi biri oldinroq bo'lganini ko'rsatadi."},
 {h:"Formula", f:["✅ Ega + had + V3 (barcha shaxslar uchun bir xil)","❌ Ega + hadn't + V3","❓ Had + ega + V3?"]},
 {h:"Qanday tushunish kerak?", p:"Vaqt chizig'ini tasavvur qiling: 1) poyezd jo'nab ketdi → 2) men vokzalga keldim. Ikkalasi o'tmishda, lekin 1-voqea oldinroq. Oldingisi — past perfect, keyingisi — past simple."},
 {ex:[["When I arrived, the train had left.","Men kelganimda, poyezd allaqachon ketib bo'lgan edi."],["She was sad because she had lost her bag.","U xafa edi, chunki sumkasini yo'qotib qo'ygan edi."],["I had never seen the sea before 2020.","2020 yilgacha men hech dengizni ko'rmagan edim."]]},
 {h:"Belgi so'zlar", p:"by the time (... paytga kelib), before, after, already, just, never ... before, when."},
 {h:"Past perfect continuous", f:["✅ had been + V-ing"]},
 {p:"O'tmishdagi biror paytgacha davom etib kelgan ish: Her eyes were red because she had been crying (yig'lab o'tirgan edi)."},
 {ex:[["We had been waiting for an hour when the bus came.","Avtobus kelganda biz bir soatdan beri kutayotgan edik."]]},
 {w:["When I arrived, the film started.","When I arrived, the film had started.","Film men kelishimdan oldin boshlangan bo'lsa — had started."]}
],
"Questions va question tags": [
 {h:"Bu mavzu nima haqida?", p:"Inglizcha savol tuzishning asosiy qoidasi: yordamchi fe'l egadan OLDIN keladi. O'zbek tilida esa savol -mi qo'shimchasi bilan yasaladi, so'z tartibi o'zgarmaydi."},
 {h:"Savol formulasi", f:["(So'roq so'zi) + yordamchi fe'l + ega + asosiy fe'l?","Where do you live?","What are you doing?","When did she arrive?","Have you finished?"]},
 {h:"So'roq so'zlari", p:"what — nima, where — qayerda, when — qachon, why — nega, who — kim, which — qaysi, how — qanday, how much / how many — qancha, how often — qanchalik tez-tez."},
 {h:"Ega haqida savol", p:"Agar who yoki what egani so'rasa, yordamchi fe'l (do/did) kerak emas: Who broke the window? (Derazani kim sindirdi?) — Who did break emas!"},
 {h:"Question tags — 'shunday emasmi?'", f:["Tasdiq gap → inkor teg:  You're tired, aren't you?","Inkor gap → tasdiq teg:  She can't swim, can she?","Yordamchi fe'l bo'lmasa → do/does/did:  He works here, doesn't he?"]},
 {ex:[["It's cold today, isn't it?","Bugun sovuq, shunday emasmi?"],["You didn't call me, did you?","Sen menga qo'ng'iroq qilmading, to'g'rimi?"],["I'm right, aren't I?","Men haqman, shunday emasmi? (am I not emas, aren't I)"]]},
 {h:"Indirect questions — muloyim savol", p:"Can you tell me...? / Do you know...? dan keyin oddiy gap tartibi ishlatiladi: Can you tell me where the station is? (where is the station emas)."},
 {w:["Where you live?","Where do you live?","Savolda yordamchi fe'l (do/does/did) tushib qolmasin."]}
],
"Articles": [
 {h:"Bu mavzu nima haqida?", p:"Artikllar — otdan oldin keladigan kichik so'zlar: a, an, the. O'zbek tilida ular yo'q, shuning uchun boshlovchilar ko'p xato qiladi. Qoidani 3 ta savol bilan tekshiring."},
 {h:"1. a / an — 'bitta, qandaydir'", p:"Sanaladigan birlikdagi ot birinchi marta tilga olinganda. an — unli TOVUSH oldidan: an apple, an hour (h o'qilmaydi). a — undosh tovush oldidan: a book, a university (yu tovushi)."},
 {ex:[["I saw a dog in the street.","Ko'chada bir it ko'rdim."],["She is an engineer.","U muhandis (kasb oldidan a/an)."]]},
 {h:"2. the — 'o'sha, ma'lum'", p:"Gaplashayotganlar ikkalasi ham qaysi narsa haqida gap ketayotganini biladi; avval tilga olingan; dunyoda yagona narsa (the sun, the moon); orttirma daraja (the best)."},
 {ex:[["I saw a dog. The dog was very big.","Bir it ko'rdim. O'sha it juda katta edi."],["Close the door, please.","Eshikni yoping (qaysi eshik — ma'lum)."],["He is the best student.","U eng yaxshi talaba."]]},
 {h:"3. Artikl qo'yilmaydi (—)", p:"Umumiy ma'nodagi ko'plik va sanalmaydigan otlar (Cats are cute. Water is important.), ovqatlar (have breakfast), sport (play football), ko'p davlat va shaharlar (Uzbekistan, Samarkand)."},
 {h:"the bilan keladigan nomlar", f:["Daryo, dengiz, okean: the Amu Darya, the Black Sea","Ko'plikdagi davlatlar: the USA, the UK, the Netherlands","Cholg'u asboblari: play the piano, play the guitar"]},
 {w:["He is doctor.","He is a doctor.","Kasb oldidan a/an tushib qolmasin."]},
 {w:["I like the music.","I like music.","Umumiy ma'noda (har qanday musiqa) — artiklsiz."]}
],
"Countable / uncountable": [
 {h:"Bu mavzu nima haqida?", p:"Otlar ikki turga bo'linadi: sanaladigan (bir olma, ikki olma) va sanalmaydigan (suv, pul, maslahat). Qaysi turdaligi — qaysi so'zlarni ishlatishni belgilaydi."},
 {h:"Sanaladigan otlar", p:"Birlik va ko'plik shakli bor: a book – two books, a child – children. Birlikda a/an oladi."},
 {h:"Sanalmaydigan otlar", p:"Ko'plik shakli yo'q, a/an olmaydi, fe'l birlikda: water, milk, money, time, information, advice, news, furniture, luggage, homework, bread."},
 {w:["She gave me an advice.","She gave me some advice / a piece of advice.","advice — sanalmaydi."]},
 {w:["The news are bad.","The news is bad.","news — sanalmaydi, fe'l birlikda."]},
 {h:"Miqdor so'zlari", f:["many, a few, few + sanaladigan:  many books, a few friends","much, a little, little + sanalmaydigan:  much money, a little time","a lot of, some, any + ikkalasi ham"]},
 {h:"a few / a little va few / little farqi", p:"a few / a little — oz, lekin yetarli (ijobiy). few / little — juda oz, yetmaydi (salbiy)."},
 {ex:[["I have a few friends here.","Bu yerda bir nechta do'stim bor (yaxshi)."],["I have few friends here.","Bu yerda do'stim juda kam (achinarli)."]]},
 {h:"some va any", p:"some — tasdiq gap va taklifda (Would you like some tea?). any — inkor va so'roqda (Have you got any money? I don't have any time)."},
 {h:"Sanash usullari", p:"a piece of advice / cake / furniture, a glass of water, a loaf of bread, a cup of tea, a bottle of milk."}
],
"Modals 1": [
 {h:"Bu mavzu nima haqida?", p:"Modal fe'llar — fe'lga qo'shimcha ma'no beradi: qila olish, ruxsat, maslahat. Asosiy qoida: modaldan keyin fe'l doim V1, to'siz, -s siz keladi."},
 {h:"Modal formula", f:["✅ Ega + modal + V1:  She can swim.","❌ Ega + modal + not + V1:  You shouldn't go.","❓ Modal + ega + V1?:  Can you help me?"]},
 {h:"Qobiliyat: can / could / be able to", p:"can — hozir qila olaman; could — o'tmishda qila olardim (umuman). Boshqa zamonlarda be able to: I will be able to drive. I have been able to... O'tmishda bir martalik qiyin ishni uddalash: was able to / managed to."},
 {ex:[["I can speak two languages.","Men ikki tilda gapira olaman."],["When I was five, I could swim.","Besh yoshimda suza olardim."],["After hours of trying, he was able to open the door.","Soatlab urinib, u eshikni ocha oldi."]]},
 {h:"Ruxsat: can / could / may", p:"Can I...? — oddiy; Could I...? — muloyimroq; May I...? — eng rasmiy."},
 {ex:[["Could I use your phone, please?","Telefoningizdan foydalansam maylimi?"],["May I come in?","Kirsam maylimi?"]]},
 {h:"Maslahat: should / ought to / had better", p:"should = ought to — 'kerak, yaxshi bo'lardi'. had better ('d better) — kuchliroq, aks holda yomon natija bo'ladi."},
 {ex:[["You should see a doctor.","Shifokorga ko'rinishingiz kerak."],["You'd better hurry or you'll miss the bus.","Shoshilganingiz ma'qul, aks holda avtobusga ulgurmaysiz."]]},
 {w:["She cans swim.","She can swim.","Modalga -s qo'shilmaydi."]},
 {w:["You should to go.","You should go.","Modaldan keyin to qo'yilmaydi (ought to bundan mustasno)."]}
],
"Modals 2": [
 {h:"Bu mavzu nima haqida?", p:"Bu unitda modallarning ikki vazifasi: majburiyat (qilish shart / shart emas) va taxmin (aniq shunday / balki / bo'lishi mumkin emas)."},
 {h:"Majburiyat", f:["must + V1 — so'zlovchining o'zi zarur deb bilgani","have to + V1 — qoida, qonun talab qiladi","mustn't + V1 — TAQIQ (qilish mumkin emas!)","don't have to / needn't + V1 — SHART EMAS (xohlasang qil)"]},
 {ex:[["I must study harder.","Men ko'proq o'qishim kerak (o'zim shunday deb hisoblayman)."],["Drivers have to wear seat belts.","Haydovchilar xavfsizlik kamarini taqishi shart (qoida)."],["You mustn't smoke here.","Bu yerda chekish mumkin emas."],["You don't have to come.","Kelishing shart emas."]]},
 {w:["You mustn't come tomorrow (= shart emas ma'nosida).","You don't have to come tomorrow.","mustn't — taqiq; don't have to — zarurat yo'q. Ma'nolari butunlay farq qiladi!"]},
 {h:"O'tmishda", p:"must ning o'tmish shakli yo'q, had to ishlatiladi: Yesterday I had to work late (Kecha kechgacha ishlashimga to'g'ri keldi)."},
 {h:"Taxmin (deduction)", f:["must + V1 — 90% ishonch: 'aniq shunday'","might / may / could + V1 — 50%: 'balki'","can't + V1 — 90% ishonch: 'bo'lishi mumkin emas'"]},
 {ex:[["The lights are on. They must be at home.","Chiroqlar yoniq. Ular uyda bo'lsa kerak (aniq)."],["She might be in the library.","U kutubxonada bo'lishi mumkin."],["That can't be Ali; he's in London.","Bu Ali bo'lishi mumkin emas, u Londonda."]]}
],
"Conditionals 1": [
 {h:"Bu mavzu nima haqida?", p:"Shart gaplar — 'agar ... bo'lsa, ... bo'ladi' turidagi gaplar. Ikki qismdan iborat: if-qism (shart) va asosiy qism (natija). Bu unitda real shartlar: zero va first conditional."},
 {h:"Zero conditional", f:["If + present simple, present simple"]},
 {p:"Doim to'g'ri bo'ladigan narsalar, ilmiy faktlar: shart bajarilsa, natija har doim bir xil."},
 {ex:[["If you heat ice, it melts.","Muzni qizdirsangiz, u eriydi."],["If plants don't get water, they die.","O'simliklar suv olmasa, nobud bo'ladi."]]},
 {h:"First conditional", f:["If + present simple, will + V1"]},
 {p:"Kelajakda haqiqatan bo'lishi mumkin bo'lgan holat va uning natijasi."},
 {ex:[["If it rains tomorrow, we'll stay at home.","Ertaga yomg'ir yog'sa, uyda qolamiz."],["If you study hard, you will pass the exam.","Yaxshi o'qisang, imtihondan o'tasan."]]},
 {w:["If it will rain, we'll stay at home.","If it rains, we'll stay at home.","if-qismda will ishlatilmaydi!"]},
 {h:"unless, when, as soon as, as long as", p:"unless = if ... not (agar ... bo'lmasa): Unless you hurry, you'll be late. Bu so'zlardan keyin ham present simple keladi: I'll call you when I get home."},
 {h:"Vergul qoidasi", p:"If-qism birinchi kelsa, vergul qo'yiladi: If it rains, we'll stay. Asosiy qism birinchi kelsa, vergul shart emas: We'll stay if it rains."}
],
"Conditionals 2": [
 {h:"Bu mavzu nima haqida?", p:"Bu unitda noreal (xayoliy) shartlar: hozir yoki o'tmishda haqiqatda bo'lmagan holatlar. Ingliz tilida noreal ma'no zamonni bir pog'ona orqaga surish orqali beriladi."},
 {h:"Second conditional — hozirgi xayol", f:["If + past simple, would + V1"]},
 {p:"Hozir haqiqatda bo'lmagan yoki bo'lishi qiyin bo'lgan holat. Shakli o'tgan zamon, lekin ma'nosi hozir/kelajak."},
 {ex:[["If I had more money, I would buy a car.","Pulim ko'proq bo'lganda, mashina sotib olardim (hozir yo'q)."],["If I were you, I would apologise.","Men sening o'rningda bo'lganimda, uzr so'rardim."]]},
 {h:"were — barcha shaxslar uchun", p:"Second conditional'da be fe'li odatda hamma uchun were: If I were rich..., If she were here..."},
 {h:"Third conditional — o'tmishdagi afsus", f:["If + had + V3, would have + V3"]},
 {p:"O'tmishda bo'lmagan holat va uning bo'lmagan natijasi. Endi uni o'zgartirib bo'lmaydi."},
 {ex:[["If you had studied, you would have passed.","Agar o'qiganingda, imtihondan o'tgan bo'larding (lekin o'qimading)."],["If we had left earlier, we wouldn't have missed the train.","Ertaroq chiqqanimizda, poyezdga kechikmagan bo'lardik."]]},
 {h:"wish — 'qani endi...'", f:["wish + past simple — hozirgi holatdan afsus","wish + could + V1 — qila olmasligimdan afsus","wish + had + V3 — o'tmishdagi afsus"]},
 {ex:[["I wish I had a car.","Qani endi mashinam bo'lsa."],["I wish I could speak French.","Qani endi fransuzcha gapira olsam."]]},
 {w:["If I would have money, I would buy it.","If I had money, I would buy it.","if-qismda would ishlatilmaydi."]}
],
"Passive voice": [
 {h:"Bu mavzu nima haqida?", p:"Majhul nisbat (passive) — ishni kim bajargani emas, ishning o'zi muhim bo'lganda ishlatiladi. O'zbek tilida -il, -in qo'shimchalari bilan yasaladi: qurildi, yozildi."},
 {h:"Aktiv va passiv", ex:[["Workers built this bridge in 1890. (aktiv)","Ishchilar bu ko'prikni 1890 yilda qurishdi."],["This bridge was built in 1890. (passiv)","Bu ko'prik 1890 yilda qurilgan."]]},
 {h:"Asosiy formula", f:["be + V3","Faqat be fe'li zamonga qarab o'zgaradi, V3 doim bir xil."]},
 {h:"Zamonlar bo'yicha", f:["Present simple:  is / are + V3  →  English is spoken here.","Past simple:  was / were + V3  →  It was built in 1890.","Present perfect:  has / have been + V3  →  My car has been stolen.","Future:  will be + V3  →  The results will be announced.","Modal:  can / must be + V3  →  It can be done."]},
 {h:"by — kim tomonidan", p:"Bajaruvchini ko'rsatish kerak bo'lsa, by ishlatiladi: The Mona Lisa was painted by Leonardo da Vinci. Bajaruvchi noma'lum yoki muhim bo'lmasa, by qo'yilmaydi."},
 {ex:[["Paper is made from wood.","Qog'oz yog'ochdan tayyorlanadi."],["The thief was caught yesterday.","O'g'ri kecha qo'lga olindi."]]},
 {w:["The bridge built in 1890.","The bridge was built in 1890.","be fe'li tushib qolmasin."]}
],
"Causative": [
 {h:"Bu mavzu nima haqida?", p:"Causative — ishni o'zimiz emas, boshqa birovga (usta, sartarosh) qildirganimizda ishlatiladi. O'zbek tilidagi 'qildirmoq, oldirmoq' ga o'xshaydi."},
 {h:"Formula", f:["have + narsa + V3","get + narsa + V3 (og'zaki nutqda)"]},
 {h:"Farqni ko'ring", ex:[["I cut my hair.","Sochimni o'zim oldim."],["I had my hair cut.","Sochimni oldirdim (sartaroshda)."]]},
 {h:"Zamonlar 'have' orqali o'zgaradi", f:["I have my car washed every week.","I'm having my car repaired now.","I had my house painted last year.","I've just had my phone fixed.","I'm going to have my eyes tested."]},
 {ex:[["We're having our kitchen painted.","Oshxonamizni bo'yatyapmiz."],["You should get your eyes tested.","Ko'zingizni tekshirtirishingiz kerak."]]},
 {h:"Noxush voqealar", p:"Xuddi shu tuzilma bilan boshimizga tushgan noxush voqeani aytamiz: She had her bag stolen (Uning sumkasini o'g'irlab ketishdi)."},
 {w:["I had cut my hair at the barber's.","I had my hair cut at the barber's.","Tartib: have + NARSA + V3."]}
],
"Reported speech": [
 {h:"Bu mavzu nima haqida?", p:"O'zlashtirma gap — birovning so'zlarini o'z tilimiz bilan yetkazish: Ali 'Men charchadim' dedi → Ali charchaganini aytdi."},
 {h:"Asosiy qoida: zamon bir pog'ona orqaga", f:["am / is → was;  are → were","present simple → past simple","present continuous → past continuous","past simple / present perfect → past perfect","will → would;  can → could"]},
 {ex:[["'I am tired.' → She said (that) she was tired.","'Charchadim' → U charchaganini aytdi."],["'I will call you.' → He said he would call me.","'Senga qo'ng'iroq qilaman' → U menga qo'ng'iroq qilishini aytdi."]]},
 {h:"Vaqt va joy so'zlari ham o'zgaradi", f:["today → that day;  now → then","tomorrow → the next day","yesterday → the day before","here → there;  this → that"]},
 {h:"say va tell", p:"say + gap: He said that... tell + KISHI + gap: He told me that... (He said me emas!)."},
 {h:"Savollar", p:"Ha/yo'q savollar: ask + if: 'Are you hungry?' → She asked if I was hungry. So'roq so'zli savollar: 'Where do you live?' → She asked where I lived. Gap tartibi oddiy, do/did yo'q."},
 {h:"Buyruq va iltimos", p:"tell / ask + kishi + (not) to + V1: 'Don't touch it!' → He told me not to touch it."},
 {w:["She asked me where did I live.","She asked me where I lived.","O'zlashtirma savolda so'roq tartibi bo'lmaydi."]}
],
"Relative clauses": [
 {h:"Bu mavzu nima haqida?", p:"Nisbiy gaplar — otni aniqlab, u haqida qo'shimcha ma'lumot beradi: 'Qo'shni uyda yashaydigan ayol' → The woman who lives next door. Ikki gapni bitta qilib bog'laydi."},
 {h:"Nisbiy olmoshlar", f:["who — odamlar uchun","which — narsalar va hayvonlar uchun","that — odam ham, narsa ham (vergulsiz gaplarda)","whose — kimning (egalik)","where — joy;  when — vaqt"]},
 {ex:[["The woman who lives next door is a doctor.","Qo'shnimizda yashaydigan ayol shifokor."],["The book which you gave me is interesting.","Sen bergan kitob qiziqarli."],["That's the boy whose father is a pilot.","Bu otasi uchuvchi bo'lgan bola."],["This is the house where I was born.","Bu men tug'ilgan uy."]]},
 {h:"Ikki xil nisbiy gap", p:"1) Aniqlovchi (vergulsiz) — qaysi biri ekanini aniqlaydi, usiz ma'no to'liq emas. 2) Qo'shimcha (vergulli) — ortiqcha ma'lumot, olib tashlansa ham gap tushunarli. Vergulli gapda that ishlatilmaydi."},
 {ex:[["My phone, which I bought last year, is broken.","Telefonim — uni o'tgan yili olganman — buzildi."]]},
 {h:"Olmoshni tushirib qoldirish", p:"Agar nisbiy olmosh fe'lning to'ldiruvchisi bo'lsa (ega emas), uni tushirish mumkin: The book (that) you gave me..."},
 {w:["The man which lives here...","The man who lives here...","Odam uchun who ishlatiladi."]}
],
"Gerunds and infinitives": [
 {h:"Bu mavzu nima haqida?", p:"Ba'zi fe'llardan keyin ikkinchi fe'l -ing shaklida (gerund), ba'zilaridan keyin to + V1 (infinitive) shaklida keladi. Buni har bir fe'l bilan birga yodlash kerak."},
 {h:"-ing talab qiladigan fe'llar", f:["enjoy, like, love, hate, mind, avoid, finish,","give up, keep, suggest, consider, can't stand","look forward to, be interested in, be good at"]},
 {ex:[["I enjoy listening to music.","Musiqa tinglashni yaxshi ko'raman."],["Would you mind closing the window?","Derazani yopib qo'ya olasizmi?"]]},
 {h:"Predlogdan keyin doim -ing", p:"interested in learning, good at swimming, afraid of flying, look forward to seeing you."},
 {h:"to + V1 talab qiladigan fe'llar", f:["want, decide, hope, plan, promise, agree,","refuse, manage, afford, learn, need, would like"]},
 {ex:[["We decided to buy a new car.","Biz yangi mashina sotib olishga qaror qildik."],["I can't afford to go on holiday.","Ta'tilga borishga pulim yetmaydi."]]},
 {h:"Gap boshida -ing, sifatdan keyin to", p:"Swimming is my favourite sport. It's important to drink water. It's easy to learn."},
 {h:"Ma'nosi o'zgaradigan fe'llar", f:["stop smoking — chekishni tashlamoq","stop to smoke — chekish uchun to'xtamoq","remember doing — qilganini eslamoq","remember to do — qilishni unutmaslik"]},
 {w:["I look forward to see you.","I look forward to seeing you.","look forward TO — bu yerda to predlog, shuning uchun -ing."]}
],
"Comparatives": [
 {h:"Bu mavzu nima haqida?", p:"Narsalarni solishtirish: qiyosiy daraja (kattaroq), orttirma daraja (eng katta), shuningdek too/enough va so/such."},
 {h:"Qiyosiy va orttirma daraja", f:["Qisqa sifat:  tall → taller → the tallest","-y bilan:  easy → easier → the easiest","Uzun sifat:  interesting → more interesting → the most interesting","Noto'g'ri:  good → better → the best;  bad → worse → the worst;  far → further → the furthest"]},
 {ex:[["My brother is taller than me.","Akam mendan balandroq."],["This is the most interesting book I've read.","Bu men o'qigan eng qiziq kitob."]]},
 {h:"Boshqa solishtirishlar", p:"as ... as — xuddi shunday: She is as tall as me. not as ... as — unchalik emas. much / far + qiyosiy — ancha: much easier. The more..., the better — qancha ko'p..., shuncha yaxshi."},
 {h:"too va enough", f:["too + sifat (+ to V1) — haddan tashqari, salbiy","sifat + enough (+ to V1) — yetarli"]},
 {ex:[["The tea is too hot to drink.","Choy ichish uchun juda issiq."],["He isn't old enough to drive.","U mashina haydash uchun yoshi yetmaydi."]]},
 {h:"so va such", f:["so + sifat:  It was so cold.","such (a) + sifat + ot:  It was such a cold day."]},
 {w:["He is more taller than me.","He is taller than me.","-er va more birga ishlatilmaydi."]}
],
"Pronouns": [
 {h:"Bu mavzu nima haqida?", p:"Olmoshlar otning o'rnida keladi. Bu unitda: o'zlik olmoshlari (myself), egalik olmoshlari (mine), bir-birini (each other) va noaniq olmoshlar (someone, anything)."},
 {h:"Olmoshlar jadvali", f:["Ega:     I    you    he    she    we    they","Egalik:  mine yours  his   hers   ours  theirs","O'zlik:  myself yourself himself herself ourselves themselves"]},
 {h:"O'zlik olmoshlari", p:"Harakat bajaruvchining o'ziga qaytganda: I cut myself (o'zimni kesib oldim). by myself — yolg'iz, hech kimning yordamisiz."},
 {ex:[["Be careful! Don't hurt yourself.","Ehtiyot bo'l! O'zingni jarohatlab olma."],["I made this cake by myself.","Bu tortni o'zim (yordamsiz) pishirdim."]]},
 {h:"each other — bir-birini", p:"They love each other (Ular bir-birini sevadi). themselves bilan adashtirmang: they looked at themselves — har biri o'zini ko'rdi."},
 {h:"Egalik olmoshlari", p:"Otsiz ishlatiladi: This book is mine (my book). Is this bag yours? — Yes, it's mine."},
 {h:"Noaniq olmoshlar", f:["some- (tasdiq):  someone, something, somewhere","any- (inkor, so'roq):  anyone, anything, anywhere","no- (fe'l tasdiq, ma'no inkor):  nobody, nothing, nowhere","every-:  everyone, everything, everywhere"]},
 {ex:[["There's someone at the door.","Eshik oldida kimdir bor."],["I didn't see anybody.","Hech kimni ko'rmadim."],["Nobody knows the answer.","Javobni hech kim bilmaydi."]]},
 {w:["I didn't see nobody.","I didn't see anybody.","Ingliz tilida ikki inkor birga kelmaydi."]}
],
"Prepositions of time": [
 {h:"Bu mavzu nima haqida?", p:"Predloglar — o'zbek tilidagi -da, -ga, -dan kabi qo'shimchalar vazifasini bajaradi. Eng ko'p ishlatiladiganlari: at, on, in."},
 {h:"Vaqt predloglari", f:["at — aniq vaqt:  at 5 o'clock, at night, at the weekend","on — kun va sana:  on Monday, on 5 May, on my birthday","in — oy, yil, fasl, kun qismi:  in July, in 2020, in winter, in the morning"]},
 {ex:[["The lesson starts at 9 o'clock.","Dars soat 9 da boshlanadi."],["My birthday is on 23 February.","Tug'ilgan kunim 23-fevralda."],["I was born in 1995.","Men 1995 yilda tug'ilganman."]]},
 {h:"Joy predloglari", f:["at — nuqta:  at the bus stop, at home, at work, at school","on — sirt ustida:  on the wall, on the table, on the second floor","in — ichida:  in the box, in the room, in Samarkand"]},
 {ex:[["There's a picture on the wall.","Devorda rasm bor."],["I'll wait for you at the bus stop.","Seni bekatda kutaman."]]},
 {h:"Harakat predloglari", f:["into — ichiga;  out of — ichidan tashqariga","across — ko'ndalangiga (yo'ldan o'tmoq)","through — ichidan o'tib (parkdan o'tmoq)","along — bo'ylab;  over — ustidan;  past — yonidan o'tib","up / down — yuqoriga / pastga;  towards — tomon"]},
 {w:["I was born in 23 February.","I was born on 23 February.","Aniq sana — on."]}
],
"Linking words": [
 {h:"Bu mavzu nima haqida?", p:"Bog'lovchilar gaplarni mantiqan bog'laydi: qarama-qarshilik, sabab, natija, maqsad. CEFR Writing va Speaking'da ular yuqori ball olish uchun juda muhim."},
 {h:"Qarama-qarshilik", f:["but — lekin (gap ichida)","although / even though + GAP — garchi ... bo'lsa ham","despite / in spite of + OT yoki -ing — ... ga qaramay","However, — Biroq, (yangi gap boshida, vergul bilan)"]},
 {ex:[["Although it was raining, we went out.","Yomg'ir yog'ayotgan bo'lsa ham, chiqdik."],["Despite the rain, we went out.","Yomg'irga qaramay, chiqdik."],["She studied hard. However, she failed.","U qattiq o'qidi. Biroq, yiqildi."]]},
 {w:["Despite it was raining...","Although it was raining... / Despite the rain...","despite dan keyin to'liq gap kelmaydi."]},
 {h:"Sabab va natija", f:["because + gap — chunki:  because it was late","because of + ot — ... sababli:  because of the rain","so — shuning uchun;  therefore — shu sababli (rasmiy)"]},
 {h:"Maqsad", f:["to / in order to + V1 — ... uchun:  I went out to buy bread.","so that + gap — ... sin deb:  I'm saving so that I can buy a car."]},
 {h:"Qo'shimcha", p:"also, too, as well (ham), in addition, moreover, what's more (bundan tashqari)."},
 {ex:[["He was tired, so he went to bed.","U charchagan edi, shuning uchun uxlagani yotdi."],["I went to the shop to buy some bread.","Non olish uchun do'konga bordim."]]}
]
};
