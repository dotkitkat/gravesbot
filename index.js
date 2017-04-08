
    
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
87
88
89
90
91
92
93
94
95
96
97
98
99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
116
117
118
119
120
121
122
123
124
125
126
127
128
129
130
131
132
133
134
135
136
137
138
139
140
141
142
143
144
145
146
147
148
149
150
151
152
153
154
155
156
157
158
159
160
161
162
163
164
165
166
167
168
169
170
171
172
173
174
175
176
177
178
179
180
181
182
183
184
185
186
187
188
189
190
191
192
193
194
195
196
197
198
199
200
201
202
203
204
205
206
207
208
209
210
211
212
213
214
215
216
217
218
219
220
221
222
223
224
225
226
227
228
229
230
231
232
233
234
235
236
237
238
239
240
241
242
243
244
245
246
247
248
249
250
251
252
253
254
255
256
257
258
259
260
261
262
263
264
265
266
267
268
269
270
271
272
273
274
275
276
277
278
279
280
281
282
283
284
285
286
287
288
289
290
291
292
293
294
295
296
297
298
299
300
301
302
303
304
305
306
307
308
309
310
311
312
313
314
315
316
317
318
319
320
321
322
323
324
325
326
327
328
329
330
331
332
333
334
335
336
337
338
339
340
341
342
343
344
345
346
347
348
349
350
351
352
353
354
355
356
357
358
359
360
361
362
363
364
365
366
367
368
369
370
371
372
373
374
375
376
377
378
379
380
381
382
383
384
385
386
387
388
389
390
391
392
393
394
395
396
397
398
399
400
401
402
403
404
405
406
407
408
409
410
411
412
413
414
415
416
417
418
419
420
421
422
423
424
425
426
427
428
429
430
431
432
433
434
435
436
437
438
439
440
441
442
443
444
445
446
447
448
449
450
451
452
453
454
455
456
457
458
459
460
461
462
463
464
465
466
467
468
469
470
471
472
473
474
475
476
477
478
479
480
481
482
483
484
485
486
487
488
489
490
491
492
493
494
495
496
497
498
499
500
501
502
503
504
505
506
507
508
509
510
511
512
513
514
515
516
517
518
519
520
521
522
523
524
525
526
527
528
529
530
531
532
533
534
535
536
537
538
539
540
541
542
543
544
545
546
547
548
549
550
551
552
553
554
555
556
557
558
559
560
561
562
563
564
565
566
567
568
569
570
571
572
573
574
575
576
577
578
579
580
581
582
583
584
585
586
587
588
589
590
591
592
593
594
595
596
597
598
599
600
601
602
603
604
605
606
607
608
609
610
611
612
613
614
615
616
617
618
619
620
621
622
623
624
625
626
627
628
629
630
631
632
633
634
635
636
637
638
639
640
641
642
643
644
645
646
647
648
649
650
651
652
653
654
655
656
657
658
659
660
661
662
663
664
665
666
667
668
669
670
671
672
673
674
675
676
677
678
679
680
681
682
683
684
685
686
687
688
689
690
691
692
693
694
695
696
697
698
699
700
701
702
703
704
705
706
707
708
709
710
711
712
713
714
715
716
717
718
719
720
721
722
723
724
725
726
727
728
729
730
731
732
733
734
735
736
737
738
739
740
741
742
743
744
745
746
747
748
749
750
751
752
753
754
755
756
757
758
759
760
761
const Discord = require("discord.js");
const bot = new Discord.Client();
const stripIndents = require('common-tags').stripIndents;
const https = require('https');
const urlencode = require('urlencode');
const moment = require('moment');
const cheerio = require('cheerio');
const http = require('http');
const gm = require('gm');
const url = require('url');
const request = require('request')
const champion = require('champion');
const gg = 'http://api.champion.gg/champion/'
const api = ''
const riot = 'http://ddragon.leagueoflegends.com/cdn/7.5.2/data/en_US/champion/'
const phantom = require('x-ray-phantom');
const Xray = require('x-ray');
const x = Xray().driver(phantom({webSecurity:false}));


    String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

let champions = [
                       {id:1,name:'Ashe'},
                       {id:2,name:'Draven'},
                       {id:3,name:'Ekko'},
                       {id:4,name:'Fiora'},
                       {id:5,name:'Janna'},
                       {id:6,name:'Katarina'},
                       {id:7,name:'KhaZix'},
                       {id:8,name:'Lebanc'},
                       {id:9,name:'LeeSin'},
                       {id:10,name:'Leona'},
                       {id:11,name:'Lucian'},
                       {id:12,name:'Shen'},
                       {id:13,name:'Teemo'},
                       {id:14,name:'Thresh'},
                       {id:15,name:'Yasuo'},
                       {id:16,name:'MasterYi'},
                       {id:17,name:'Ziggs'},
                       {id:18,name:'Camille'},
                       {id:19,name:'Ezreal'},
                       {id:20,name:'Fizz'},
                       {id:21,name:'Garen'},
                       {id:22,name:'Graves'},
                       {id:23,name:'Jhin'},
                       {id:24,name:'Jinx'},
                       {id:25,name:'Lux'},
                       {id:26,name:'Quinn'},
                       {id:27,name:'Riven'},
                       {id:28,name:'Thresh2'},
                       {id:29,name:'Vayne'},
                       {id:30,name:'Wukong'},
                       {id:31,name:'XinZhao'},
                       {id:32,name:'Zed'},
                       {id:33,name:'Nidalee'},
                       {id:34,name:'Anivia'},
                       {id:35,name:'Annie'},
                       {id:36,name:'Ahri'},
                       {id:37,name:'Azir'},
                       {id:38,name:'Caitlyn'},
                       {id:39,name:'Corki'},
                       {id:40,name:'Darius'},
                       {id:41,name:'Diana'},
                       {id:42,name:'Ezreal2'},
                       {id:43,name:'Ezreal3'},
                       {id:44,name:'Fizz2'},
                       {id:45,name:'Gangplank'},
                       {id:46,name:'Garen2'},
                       {id:47,name:'Graves2'},
                       {id:48,name:'Jax'},
                       {id:49,name:'Jhin2'},
                       {id:50,name:'Jinx2'},
                       {id:51,name:'Jinx3'},
                       {id:52,name:'Kalista'},
                       {id:53,name:'Kled'},
                       {id:54,name:'Lissandra'},
                       {id:55,name:'Lux2'},
                       {id:56,name:'Lux3'},
                       {id:57,name:'MissFortune'},
                       {id:58,name:'Nidalee2'},
                       {id:59,name:'Poppy'},
                       {id:60,name:'Quinn2'},
                       {id:61,name:'Reksai'},
                       {id:62,name:'Rengar'},
                       {id:63,name:'Riven2'},
                       {id:64,name:'Ryze'},
                       {id:65,name:'Sivir'},
                       {id:66,name:'Sona'},
                       {id:67,name:'Talon'},
                       {id:68,name:'Tristana'},
                       {id:69,name:'Trundle'},
                       {id:70,name:'Tryndamere'},
                       {id:71,name:'TwistedFate'},
                       {id:72,name:'Vayne2'},
                       {id:73,name:'Velkoz'},
                       {id:74,name:'Vi'},
                       {id:75,name:'Volibear'},
                       {id:76,name:'Warwick'},
                       {id:77,name:'Wukong2'},
                       {id:78,name:'Xinzhao2'},
                       {id:79,name:'Zyra'},
                       {id:80,name:'Akali'},
                       {id:81,name:'Alitstar'},
                       {id:82,name:'Blitzcrank'},
                       {id:83,name:'Gnar'},
                       {id:84,name:'Jhin3'},
                       {id:85,name:'Olaf'},
                       {id:86,name:'Rumble'},
                       {id:87,name:'Talon2'},
                       {id:88,name:'Tristana2'},
                       {id:89,name:'Twitch'},
                       {id:90,name:'Udyr'},
                       {id:91,name:'Varus'},
                       {id:92,name:'Yasuo2'},
                       {id:93,name:'Riven3'},
                       {id:94,name:'Soraka'},
                       {id:95,name:'Ahri2'},
                       {id:96,name:'Akali2'},
                       {id:97,name:'Blitzcrank2'},
                       {id:98,name:'Caitlyn2'},
                       {id:99,name:'Darius2'},
                       {id:100,name:'Gangplank2'},
                       {id:101,name:'Hecarim'},
                       {id:102,name:'Kennen'},
                       {id:103,name:'Kindred'},
                       {id:104,name:'Morgana'},
                       {id:105,name:'Orianna'},
                       {id:106,name:'Renekton'},
                       {id:107,name:'Rengar2'},
                       {id:108,name:'Shaco'},
                       {id:109,name:'Shaco2'},
                       {id:110,name:'Talon3'},
                       {id:111,name:'Varus2'},
                       {id:112,name:'Veigar'},
                       {id:113,name:'Viktor'},
                       {id:114,name:'Nami'},
                       {id:115,name:'LuLu'},
                       {id:116,name:'Kassadin'},
                       {id:117,name:'Karma'},
                       {id:118,name:'Jarvan'},
                       {id:119,name:'Irelia'},
                       {id:120,name:'Camille2'},
                       {id:121,name:'Braum'},
                       {id:122,name:'Aatrox'},
               ]


bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.username}!`);
});

var prefix = "!"

bot.on('message', msg => {
    if (msg.author !== bot.user) return;
    let args = msg.content.split(' ').slice(1);
    let argresult = args.join(' ');
    if (msg.content.startsWith(prefix + "ally")) {
            http.get("http://ddragon.leagueoflegends.com/cdn/7.4.3/data/en_US/champion/"+argresult+".json", function(res){
                var body = '';
                res.on('data', function(chunk){
                    body += chunk;
                });
                res.on('end', function(){
                    var r = JSON.parse(body);
            let embed = {
                title: argresult,
                thumbnail: {
                    url: 'http://ddragon.leagueoflegends.com/cdn/7.4.3/img/champion/'+argresult+'.png'
                },
                url: "http://gameinfo.na.leagueoflegends.com/en/game-info/champions/"+argresult.toLowerCase()+"/",
                description: r.data[argresult].title,
                fields: [
                {
                    name:"Champion Tips",
                    value: "\n"
                }
                ],
            };
            for (i = 0; i < r.data[argresult].allytips.length; i++) {
						embed.fields[0].value += r.data[argresult].allytips[i]+"\n\n";
						};
            msg.delete()
            msg.channel.sendMessage('', { embed });
                });
            }).on('error', function(e){
                console.log(e);
            })
    }

    if (msg.content.startsWith(prefix + "foe")) {
            http.get("http://ddragon.leagueoflegends.com/cdn/7.4.3/data/en_US/champion/"+argresult+".json", function(res){
                var body = '';
                res.on('data', function(chunk){
                    body += chunk;
                });
                res.on('end', function(){
                    var r = JSON.parse(body);
            let embed = {
                title: argresult,
                thumbnail: {
                    url: 'http://ddragon.leagueoflegends.com/cdn/7.4.3/img/champion/'+argresult+'.png'
                },
                url: "http://gameinfo.na.leagueoflegends.com/en/game-info/champions/"+argresult.toLowerCase()+"/",
                description: r.data[argresult].title,
                fields: [
                {
                    name:"Champion Enemy Tips",
                    value: "\n"
                }
                ],
            };
            for (i = 0; i < r.data[argresult].enemytips.length; i++) {
						embed.fields[0].value += r.data[argresult].enemytips[i]+"\n\n";
						};
            msg.delete()
            msg.channel.sendMessage('', { embed });
                });
            }).on('error', function(e){
                console.log(e);
            })
    }

if(msg.content.startsWith(prefix+ "vs")){
  request('http://matchup.gg/matchup/'+args[0]+'/'+args[1], function(error, response, html) {
                if (!error && response.statusCode == 200) {
                    let data = [];
                    let opponent = [];
                    var $ = cheerio.load(html);
                    $('div.header-analysis-winrate-percentage').each((i, elem) => {
                        data.push($(elem).text());
                    });
                    data[0] = parseFloat(data[0]).toFixed(2)+"%";
                    data[1] = parseFloat(data[1]).toFixed(2)+"%";
                    console.log(data);
                    opponent[0] = (100.00 - parseFloat(data[0])).toFixed(2)+"%";
                    opponent[1] = (100.00 - parseFloat(data[1])).toFixed(2)+"%";
                    console.log(opponent);
                    let g = gm('vs.png');
                    g.font("beaufortforlol-bold.otf", 20);
                    if (parseFloat(data[0])>50){
                      g.fill('#26c281');
                    } else {
                      g.fill('#f35353');
                    }
                    g.drawText(24,194, 'Lane Winrate: '+data[0]);
                    if (parseFloat(data[1])>50){
                      g.fill('#26c281');
                    } else {
                      g.fill('#f35353');
                    }
                    g.drawText(24,219, 'Game Winrate: '+data[1]);
                    if (parseFloat(opponent[0])>50){
                      g.fill('#26c281');
                    } else {
                      g.fill('#f35353');
                    }
                    g.drawText(276,194, 'Lane Winrate: '+opponent[0]);
                    if (parseFloat(opponent[1])>50){
                      g.fill('#26c281');
                    } else {
                      g.fill('#f35353');
                    }
                    g.drawText(276,219, 'Game Winrate: '+opponent[1]);

                    g.fill('#FFFFFF');
                    g.fontSize(24)
                    g.drawText(-149,-104, args[0].toLowerCase().capitalize(), 'Center');
                    g.drawText(149,-104, args[1].toLowerCase().capitalize(), 'Center');
                    console.log(args);
                    g.draw(['image Over 41,46 120,120 "http://ddragon.leagueoflegends.com/cdn/7.5.2/img/champion/'+args[0]+'.png"']);
                    g.draw(['image Over 338,46 120,120 "http://ddragon.leagueoflegends.com/cdn/7.5.2/img/champion/'+args[1]+'.png"']);
/**                    var champ = [
                      {name:"Vel'Koz",value:"Velkoz"},
                      {name:"Cho'Gath",value:"Chogath"},
                      {name:"Kha'Zix",value:"Khazix"},
                      {name:"Rek'Sai",value:"RekSai"},
                      {name:"Kog'Maw",value:"KogMaw"},
                      {name:"LeBlanc",value:"Leblanc"},
                      {name:"Fiddlesticks",value:"FiddleSticks"},
                      {name:"Dr.Mundo", value:"DrMundo"},
                      {name:"Leesin",value:"LeeSin"},
                      {name:"Wukong", value:"MonkeyKing"}
                    ];**/
                    g.write("vsfinal.png" , function(err){if(err){console.log(err);}else{msg.delete();msg.channel.sendFile("./vsfinal.png");}});
                }
  });
}

if (msg.content.startsWith(prefix + "champsig")) {
    for (i in champions) {
        if (champions[i].name === args[0]) {
            var champ = champions[i].id
            var file = "http://data2.modskinpro.com/CoverFBLOL/"+champ+"/"+args.slice(1).join(' ')+".jpg"
        }
    }
            console.log(file)
            msg.delete()
            msg.channel.sendFile(file)

}
  if(msg.content.startsWith(prefix + "tbc")){
    var imgUrl = 'https://'+args;
    var options = url.parse(imgUrl);

    https.get(options, function (response) {
      var chunks = [];
      response.on('data', function (chunk) {
        chunks.push(chunk);
      }).on('end', function() {
        var buffer = Buffer.concat(chunks);
        gm(buffer)
        .sepia()
        .fill("#ffffff")
        .stroke('#000000')
        .strokeWidth(2)
        .font("mangatb.ttf")
        .fontSize('30%')
        .drawText(20,20, "To Be Continued", 'SouthEast')
        .write("tbcfinal.png" , function(err){if(err){console.log(err);}else{msg.delete();msg.channel.sendFile("./tbcfinal.png");}});
      });
    });

  }

if(msg.content.startsWith(prefix+ "items")){
let data = []
x('http://matchup.gg/matchup/'+args[0]+'/'+args[1]+'/', {
  items: ['#build-content .build-item@data-item'],
  situational: ['#situational-items .build-item@data-item']
})(function(err, obj){
  data.push(obj);
  request('http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/item.json', function(error, response, body){
    if (!error && response.statusCode == 200){
      let build = [];
      let sit = [];
      body = JSON.parse(body);
      console.log(data[0].items[0])
      for (i in data[0].items){
      build.push(body.data[data[0].items[i]].name);
    }
      for (i in data[0].situational){
        sit.push(body.data[data[0].situational[i]].name);
      }
      build = build.join(' -> ')
      sit = sit.join(' | ')
      let embed = {
                title: args[0].toLowerCase().capitalize()+" Item Build Against "+args[1].toLowerCase().capitalize(),
                thumbnail: {
                    url: 'http://ddragon.leagueoflegends.com/cdn/7.4.3/img/champion/'+args[0]+'.png'
                },
                url: "http://matchup.gg/matchup/"+args[0].toLocaleLowerCase()+"/"+args[1].toLocaleLowerCase()+"/",
                description: "Highest Winrate Build Based On Lane Matchup",
                fields: [
                {
                    name:"Core Build",
                    value: build,
                    inline: false
                },
                {
                  name:"Situational",
                  value: sit,
                  inline: false
                }
                ],
            };
      msg.delete()
      msg.channel.sendMessage('', { embed });
    }
  })
});
}

if(msg.content.startsWith(prefix+ "matchup")){
  request('http://matchup.gg/champion/'+args[0].toLowerCase(), function(error, response, html) {
              if (!error && response.statusCode == 200) {
                  let weak = [];
                  let strong = [];
                  var $ = cheerio.load(html);
                  $('div#strong-against-list div.champion-lookup-item-name').each((i, elem) => {
                      strong.push($(elem).text())
                  })
                  $('div#weak-against-list div.champion-lookup-item-name').each((i, elem) => {
                      weak.push($(elem).text())
                  })

                  var g = gm('./gray.png')
                  g.fill("#ffffff")
                  g.font("beaufortforlol-bold.otf", 24)
                  g.drawText(0,-330, 'Matchup', 'Center')
                  g.drawText(0,-475, args[0].toLowerCase().capitalize(), 'Center')
                  var data = [
                    {name:"Vel'Koz",value:"Velkoz"},
                    {name:"Cho'Gath",value:"Chogath"},
                    {name:"Kha'Zix",value:"Khazix"},
                    {name:"Rek'Sai",value:"RekSai"},
                    {name:"Kog'Maw",value:"KogMaw"},
                    {name:"LeBlanc",value:"Leblanc"},
                    {name:"Fiddlesticks",value:"FiddleSticks"},
                    {name:"Dr.Mundo", value:"DrMundo"},
                    {name:"Leesin",value:"LeeSin"},
                    {name:"Wukong", value:"MonkeyKing"}
                  ]
                 g.draw(['image Over 300,50 100,100 "http://ddragon.leagueoflegends.com/cdn/7.2.1/img/champion/'+args[0]+'.png"'])
                 g.draw(['image Over 200,210 50,50 "http://www.clipartkid.com/images/158/green-plus-sign-clip-art-at-clker-com-vector-clip-art-online-zkNg9t-clipart.png"'])
                 g.draw(['image Over 450,210 50,50 "http://img.clipartfest.com/77714d245faaa3eb0255c0740570c43a_plus-and-minus-sign-clipart-negative-sign-clip-art_300-300.png"'])
                  for (i = 0; i < 6; i++){
                    var y = 275+i*110;
                    for (e in data){
                      if (weak[i] === data[e].name){
                        weak[i] = data[e].value;
                      }
                    }
                      weak[i] = weak[i].replace(/\s+/g, '').replace(".",'');
                      console.log(weak[i]);
                    g.draw(['image Over 425,'+y+' 100,100 "http://ddragon.leagueoflegends.com/cdn/7.2.1/img/champion/'+weak[i]+'.png"'])
                  }
                  for (i = 0; i < 6; i++){
                    var y = 275+i*110;
                    for (e in data){
                      if (strong[i] === data[e].name){
                        strong[i] = data[e].value;
                      }
                    }
                    strong[i] = strong[i].replace(/\s+/g, '').replace(".",'');
                    console.log(strong[i]);
                    g.draw(['image Over 175,'+y+' 100,100 "http://ddragon.leagueoflegends.com/cdn/7.2.1/img/champion/'+strong[i]+'.png"'])
                  }
                  g.write("./matchup.png", function(err) {
                      if (err) {
                          console.log(err);
                      }
                      if (!err){
                        msg.delete();msg.channel.sendFile("./matchup.png")
                      };
                  });
              }
            });
}

if(msg.content.startsWith(prefix + "illness")){
  gm('./illness.png')
  .draw(['image Over 423,250 76,76 "http://images.weserv.nl/?url=ddragon.leagueoflegends.com/cdn/7.5.2/img/champion/'+args[0]+'.png&shape=circle"'])
  .write("illnessfinal.png" , function(err){if(err){console.log(err);}else{msg.delete();msg.channel.sendFile("./illnessfinal.png");}});}

if(msg.content.startsWith(prefix + "champ")){
  filter = [
    {search:"Leesin",name:"LeeSin"},
    {search:"WuKong",name:"MonkeyKing"},
    {search:"Reksai",name:"RekSai"},
    {search:"Kogmaw",name:"KogMaw"},
    {search:"Khazix",name:"KhaZix"},
    {search:"Chogath",name:"ChoGath"}

]
  var role = args[0].toLowerCase().capitalize();;
  var champ = args.slice(1).join('').toLowerCase().capitalize();
  for (i in filter){
    if(filter[i].search === champ){
      champ = filter[i].name;
    }
  }
  var winrate = ""
  var name = args.slice(1).join(' ').toLowerCase().capitalize();
  var summoner = [];
  var spells = [];
  var items = [];
  var start = [];
  var trinket = "";
  var order = [];
  var Q = [];
  var W = [];
  var E = [];
  var R = [];
  request(riot+champ+'.json', function(error, response, body){
    if (!error && response.statusCode == 200) {
      body = JSON.parse(body);
      for (i in body.data[champ].spells){
      spells[i] = body.data[champ].spells[i].image.full;
    }
    request(gg+champ+api, function(error, response, body){
      if (!error && response.statusCode == 200) {
      body = JSON.parse(body);
      if (role === "Adc"){
        role = "ADC"
      }
      if (name === "Wu kong" || name === "Wukong"){
        name = "WuKong"
      }
      if (name === "Lee sin" || name === "Leesin"){
        name = "Lee Sin"
      }
      for (i in body){
        if (body[i].role === role){
          for (e in body[i]['firstItems'].highestWinPercent.items){
            start[e] = body[i]['firstItems'].highestWinPercent.items[e];
          }
          for (e in body[i]['items'].highestWinPercent.items){
            items[e] = body[i]['items'].highestWinPercent.items[e].id;
          }
          order = body[i]['skills'].highestWinPercent.order;

          var count = {
              Q: 0,
              W: 0,
              E: 0,
              R: 0,
          };
          var o = [];
          order.forEach((elem) => {
              count[elem]++;

              if (elem !== "R" && count[elem] == 5) {
                  o.push(elem);
              }
          });
          o.unshift("R")

          winrate = body[i]['items'].highestWinPercent.winPercent;
          trinket = body[i].trinkets[0].item.id;
          summoner[0] = body[i]['summoners']['highestWinPercent']['summoner1'].name;
          summoner[1] = body[i]['summoners']['highestWinPercent']['summoner2'].name;
          for (i in summoner){
            if (summoner[i] === "Ghost"){
              summoner[i] = "Haste"
            }
            else if (summoner[i] === "Ignite"){
              summoner[i] = "Dot"
            }
          }
          Q = [475,175];
          W = [475+1*80,175];
          E = [475+2*80,175];
          R = [475+3*80,175];
          var g = gm('bg.png');
          g.draw(['image Over 0,0 844,381 "./rift.jpg"'])
          g.modulate(50,0,0)
          g.fill("#ffffff")
          g.font("beaufortforlol-bold.otf")
          g.fontSize(16)
          g.drawText(30,280, winrate+"% Win Rate")
          g.fontSize(24)
          g.drawText(30,258.5, name+" "+role)
          g.drawText(470,98.5, "Skill Order")
          g.drawText(232,218.5, "Final")
          g.drawText(232,98.5, "Start")
          var itemsMap = new Map();
          var filtered = start.filter((elem) => {
            var item = itemsMap.get(elem.id);
            if (item != null) {
                item.count++;
                return false;
            }
            elem.count = 1;
            itemsMap.set(elem.id, elem);
            return true;
          });
          for (i in filtered){
            var yl = 232+i*80;
            if (filtered[i].count > 1){
              g.draw(['image Over '+yl+',118.5 64,64 "http://ddragon.leagueoflegends.com/cdn/7.5.2/img/item/'+filtered[i].id+'.png"'])
              g.stroke('#000000', 1)
              g.drawText(235,175, filtered[i].count)
            } else {
              g.draw(['image Over '+yl+',118.5 64,64 "http://ddragon.leagueoflegends.com/cdn/7.5.2/img/item/'+filtered[i].id+'.png"'])
            }
          }

          for (i in items){
            var yl = 232+i*80;
            g.draw(['image Over '+yl+',238.5 64,64 "http://ddragon.leagueoflegends.com/cdn/7.5.2/img/item/'+items[i]+'.png"'])
          }
          for (i in spells) {
            var yl = 472+i*80;
            g.draw(['image Over '+yl+',119 64,64 "http://ddragon.leagueoflegends.com/cdn/7.5.2/img/spell/'+spells[i]+'"'])
          }
          g.draw(['image Over 710,238.5 64,64 "http://ddragon.leagueoflegends.com/cdn/7.5.2/img/item/'+trinket+'.png"'])
          g.draw(['image Over 142,119 45,45 "http://ddragon.leagueoflegends.com/cdn/7.5.2/img/spell/Summoner'+summoner[0]+'.png"'])
          g.draw(['image Over 142,172 45,45 "http://ddragon.leagueoflegends.com/cdn/7.5.2/img/spell/Summoner'+summoner[1]+'.png"'])
          g.draw(['image Over 30,119 100,100 "http://ddragon.leagueoflegends.com/cdn/7.5.2/img/champion/'+champ+'.png"'])
          g.stroke('#000000', 1)

          for (i in o){
            if (o[i] === "R"){
              g.drawText(R[0],R[1], i)
            }
            else if (o[i] === "Q"){
              g.drawText(Q[0],Q[1], i)
            }
            else if (o[i] === "W"){
              g.drawText(W[0],W[1], i)
            }
            else if (o[i] === "E"){
              g.drawText(E[0],E[1], i)
            }
          }
          g.write("./champ.png" , function(err){if(err){console.log(err);}else{msg.delete();msg.channel.sendFile("./champ.png");}})
        }
      }

    }
    });
    }
  })
}

if (msg.content.startsWith(prefix + "define")){
    var type = []
    var defenition = []
    var example = []
    var info = []
    var title = argresult.toLowerCase().capitalize();
    request('https://owlbot.info/api/v1/dictionary/'+argresult.toLowerCase()+'?format=json', function(error, response, body){
    if (!error && response.statusCode == 200) {
      data = JSON.parse(body);
      for (i in data){
      type[i] = data[i].type;
      defenition[i] = data[i].defenition;
      example[i] = data[i].example;
      if (example[i] === null) {
        example[i] = "none";
      }
      info +="\n"+"Type: "+type[i]+"\n"+"Definition: "+defenition[i]+"\n"+"Example: "+"\n"+example[i]+"\n"
    }

    msg.delete();msg.channel.sendMessage("**"+title+"**```"+info+"```")
}
    });
}

if (msg.content.startsWith(prefix + "check")) {
    var apikey = ''
    var champId = [];
    var name = args[0];
    var mastery = [];
    var division = [];
    var summonerId = [];
    var wins = [];
    var losses = [];
    var lp = [];
    var tier = [];
    var locale = [];
    var region = [];
    var location = [
        {region:"lan",locale:"LA1"},
        {region:"las",locale:"LA2"},
        {region:"na",locale:"NA1"},
        {region:"euw",locale:"EUW1"},
        {region:"eune",locale:"EUN1"},
        {region:"oce",locale:"OC1"}
    ]
    name = args.slice(1).join('').toLowerCase();
    for (i in location){
        if (location[i].region == args[0] ) {
           region = location[i].region;
           locale = location[i].locale;

        }
    }

request('https://'+region+'.api.pvp.net/api/lol/'+region+'/v1.4/summoner/by-name/'+encodeURI(name)+'?api_key='+apikey, function(error, response, body){
  if (!error && response.statusCode == 200) {
  body = JSON.parse(body);
  summonerId = body[name].id;
  summonerName = body[name].name;
  summonerLevel = body[name].summonerLevel;
  request('https://'+region+'.api.pvp.net/api/lol/'+region+'/v2.5/league/by-summoner/'+summonerId+'/entry?api_key='+apikey, function(err, response, body){
    body = JSON.parse(body);
    if (!error && response.statusCode == 200) {
      for (i = 0; i < body[summonerId].length; i++) {
          if (body[summonerId][i].queue === "RANKED_SOLO_5x5") {
            tier[0] = body[summonerId][i].tier;
            division[0] = body[summonerId][i]["entries"][0].division;
            wins[0] = body[summonerId][i]["entries"][0].wins;
            losses[0] = body[summonerId][i]["entries"][0].losses;
            lp[0] = body[summonerId][i]["entries"][0].leaguePoints;
          } else if (body[summonerId][i].queue === "RANKED_FLEX_SR") {
            tier[1] = body[summonerId][i].tier;
            division[1] = body[summonerId][i]["entries"][0].division;
            wins[1] = body[summonerId][i]["entries"][0].wins;
            losses[1] = body[summonerId][i]["entries"][0].losses;
            lp[1] = body[summonerId][i]["entries"][0].leaguePoints;
          }
      }
  request('https://'+region+'.api.pvp.net/championmastery/location/'+locale.toUpperCase()+'/player/'+summonerId+'/topchampions?count=3&api_key='+apikey, function(error, response, body){
    if (!error && response.statusCode == 200) {
      body = JSON.parse(body);
      for (i in body) {
        champId[i] = body[i].championId;
        mastery[i] = body[i].championLevel;
      }
      if (!division[0]) {
        division[0] = '';
      }
      if (!wins[0]) {
        wins[0] = '0';
      }
      if (!tier[0]) {
        tier[0] = "unranked";
      }
      if (!losses[0]){
        losses[0] = '0';
      }
      if (!lp[0]){
        lp[0] = '0';
      }
        if (!division[1]) {
          division[1] = '';
        }
        if (!wins[1]) {
          wins[1] = '0';
        }
        if (!tier[1]) {
          tier[1] = "unranked";
        }
        if (!losses[1]){
          losses[1] = '0';
        }
        if (!lp[1]){
          lp[1] = '0';
        }
        var top = champion(champId[0])
        var background = top.name
        gm('bg.png')
            .draw(['image Over -46,-61 921,518 "./champ/'+background+'_Splash_Centered_0.jpg"'])
            .sepia()
            .modulate("45,50")
            .draw(['image Over 644,104 70,70 "http://www.lolking.net/images/v2/champions/icons/size100x100/'+champId[0]+'.png"'])
            .draw(['image Over 556,187 70,70 "http://www.lolking.net/images/v2/champions/icons/size100x100/'+champId[1]+'.png"'])
            .draw(['image Over 732,187 70,70 "http://www.lolking.net/images/v2/champions/icons/size100x100/'+champId[2]+'.png"'])
            .draw(['image Over 640,93 0,0 "./champion-levels/'+mastery[0]+'.png"'])
            .draw(['image Over 552,176 0,0 "./champion-levels/'+mastery[1]+'.png"'])
            .draw(['image Over 728,176 0,0 "./champion-levels/'+mastery[2]+'.png"'])
            .fill("#ffffff")
            .font("beaufortforlol-bold.otf", 24)
            .drawText(256,-136, summonerName.toUpperCase(), 'Center')
            .font("beaufortforlol-regular.otf", 18)
            .drawText(256,-110, region.toUpperCase()+' | Level '+summonerLevel, 'Center')
            .font("beaufortforlol-bold.otf", 36)
            .drawText(62,95, "Solo Queue", 'Left')
            .drawText(302,95, "Flex Queue", 'Left')
            .font("beaufortforlol-regular.otf", 24)
            .drawText(-272,95, tier[0].toLowerCase().capitalize()+' '+division[0]+' | '+lp[0]+'LP\n'+wins[0]+' Wins '+losses[0]+' Losses', 'Center')
            .drawText(-32,95, tier[1].toLowerCase().capitalize()+' '+division[1]+' | '+lp[1]+'LP\n'+wins[1]+' Wins '+losses[1]+' Losses', 'Center')
            .draw(['image Over 56,91 0,0 "./rank-logos/'+tier[0].toLowerCase()+'.png"'])
            .draw(['image Over 307,91 0,0 "./rank-logos/'+tier[1].toLowerCase()+'.png"'])
            .write("./final.png" , function(err){if(err){console.log(err);}else{msg.delete();msg.channel.sendFile("./final.png")}});
      }
    });
  }
});
}
});
}
});

bot.login("");
