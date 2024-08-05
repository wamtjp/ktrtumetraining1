enchant();
var y,x,m,n,img;
var sptKoma = new Array(8*6);  // 駒配列
var sptKomaall;
var imgKomaF = "komaall2.png";
var imgBanF = "ban02.jpg";
var imgGameF = "bg2.png";

var GameW = 700;
var GameH = 1000;
var BanW = 600;
var BanH = 640;
var banW = 60;
var banH = 64;
var komaW = 400/8;
var komaH = 318/6;
var banMarginLeft = 35;
var banMarginTop  = 35;
var motigomaLeft = 10 ;
var motigomaTop  = BanH + 10;

var KomaName  = new Array("+OU","+HI","+KA","+KI","+GI","+KE","+KY","+FU"
												 ,"+RY","+UM","+NG","+NK","+NY","+TO"
												 ,"-OU","-HI","-KA","-KI","-GI","-KE","-KY","-FU"
												 ,"-RY","-UM","-NG","-NK","-NY","-TO"
												 ," * ")
var KomaFrame = new Array(0,1,2,3,4,5,6,7
												 ,17,18,20,21,22,23
												 ,24,25,26,27,28,29,30,31
												 ,41,42,44,45,46,47
												 ,11)

var koma_I2N = new Array('dummy','FU','KY','KE','GI','KI','KA','HI','OU','TO','NY','NK','NG','dummy','UM','RY','dummy',);
function KomaId2Name(i) {
	return koma_I2N[i];
}
function KomaName2Id(s) {
	for(var i=0; i<=15; i++){
		if(s==koma_I2N[i]){
			return i;
		}
	}
}
//★★★汎用ラベル★★★
var lblLbl = new Array(100);
for (var i=1; i<=100; i++) { lblLbl[i] = new Label();}
for (var i=1; i<=20; i++) {
	lblLbl[i].font = "12px 'MSゴシック'";
	lblLbl[i].width= 1000;
	lblLbl[i].x= 10;
	lblLbl[i].y= motigomaTop + 10*i-20;
	lblLbl[i].text = "@";
}
var labelmotigomanum = new Array(10);
for (var i=1; i<=7; i++) { labelmotigomanum[i] = new Label();}
for (var i=1; i<=7; i++) {
	labelmotigomanum[i].font = "24px 'MSゴシック'";
//	labelmotigomanum[i].color = "rgb(255,255,255)";
	labelmotigomanum[i].width= 1000;
	labelmotigomanum[i].x= motigomaLeft + (8-i)*banW+banW/3;
	labelmotigomanum[i].y= motigomaTop+ banH*3/4;
}

var motikomaAll = "";;
var KomaNameFrame = {};
for(var i=0; i<29; i++) { KomaNameFrame[KomaName[i]] = KomaFrame[i]; }
var okigoma = new Array(10);
for (var i=0; i<10; i++) { okigoma[i] = new Array(10); }

var motigoma = new Array(8);
for (var i=0; i<8; i++) { motigoma[i] = ""; }
var motigomanum = new Array(8);
var Tmotigomanum;

var motigoma_i
var NowTesuu = 1;
var modOM;
var modOki = 1;
var modMoti = 2;

var cntclick = 0;
var flgClick = 1;
var pm1
var pm2
var hm1;
var hn1;
var hm2;
var hn2;
var pmm1
var pmm2
var sprect;
var surfrect;
var rect;

var correctstr1 = new Array(30);
var correctstr2 = new Array(30);
var correctstr3 = new Array(30);
var correctstr4 = new Array(30);
var correctstr5 = new Array(30);
var correctstr6 = new Array(30);
var correctstr = new Array(30);

var str;
var n;
var strlen;
var start;
var cntCorrect = 0;
var cntWrong = 0;
var flgAnswer;
window.onload = function() {
	game = new Game(GameW, GameH); // *r★
	game.preload("komaall2.png", "ban02.jpg", "bg2.png");

	//初期設定-持駒処理
	strlen=4;
	motikomaAll="";
	for (var i=1; i<=14; i++) {//歩香桂銀金角飛の7種類×２（先手・後手）
		if(dataMotiP[i] != "" && dataMotiP[i].substr(0, 1)=="+") {
			motikomaAll += dataMotiP[i].substr(1);
		}
	}
	for (var i=1; i<=7; i++) {motigomanum[i]=0;}
	for (var m=0; m < motikomaAll.length / strlen; m++) {
		var koma = motikomaAll.substr(m*strlen, strlen);
		koma = koma.substr(2,2);
		motigomanum[KomaName2Id(koma)]++;
	}

	game.onload = function() {
		sptKomaall = new Sprite(komaW*8,komaH*6); 
		//各持駒数表示ラベル
		for (var i=1; i<=7; i++) {
			labelmotigomanum[i].text = 0;
			game.rootScene.addChild(labelmotigomanum[i]);
		}
		init(); display();
	}
	game.start();
}

function init(){
	//背景表示
	var sptGame = new Sprite(GameW,GameH); 
	sptGame.image = game.assets[imgGameF];
	sptGame.x = 0; sptGame.y = 0;
	game.rootScene.addChild(sptGame);
	//盤表示
	var sptBan = new Sprite(BanW,BanH); 
	sptBan.image = game.assets[imgBanF];
	sptBan.x = 0; sptBan.y = 0;
	game.rootScene.addChild(sptBan);
	readcorrectanswer();
	display();
}

function ending(){
	lblLbl[14].font = "48px 'MSゴシック'";
	lblLbl[14].text = "正解！";
	game.rootScene.addChild(lblLbl[14]);
}

function readcorrectanswer() {
	sptKomaall.image = game.assets[imgKomaF];
	for (var t=1; t<=Ttesuu; t++) {
		correctstr1[t] = correctanswer[t].substr(0, 1);
		correctstr2[t] = correctanswer[t].substr(1, 1);
		correctstr3[t] = correctanswer[t].substr(2, 1);
		correctstr4[t] = correctanswer[t].substr(3, 1);
		correctstr5[t] = correctanswer[t].substr(4, 1);
		correctstr6[t] = correctanswer[t].substr(5, 1);
	}
}

function display() {
	//持駒表示
	for (var i=7; i>=1; i--) {
		sptKoma[i] = new SptKoma();
		sptKoma[i].frame = (8 - KomaNameFrame["+"+ KomaId2Name(i)]);
		sptKoma[i].y = motigomaTop;
		sptKoma[i].x = motigomaLeft + i*banW;
		game.rootScene.addChild(sptKoma[i]);
		//各持駒数表示
		labelmotigomanum[i].text = motigomanum[i];
		game.rootScene.addChild(labelmotigomanum[i]);
	}

	//置駒処理
	strlen=3;
	for (var cm=1; cm<=9; cm++) {
		start=0;
		for (var cn=1; cn<=9; cn++) {
			str = databoardP[cm].substr(start, strlen);
			okigoma[cm][cn] = str; start += strlen;
		}
	}
	//置駒表示
	for (var i=0; i<81; i++) {
		m = i%9; n = Math.floor(i/9);
		sptKoma[i] = new SptKoma(m, n);
		sptKoma[i].frame = KomaNameFrame[okigoma[m+1][n+1]];
		sptKoma[i].x = banMarginLeft + n*banW;
		sptKoma[i].y = banMarginTop  + m*banH;
		game.rootScene.addChild(sptKoma[i]);
	}
}

//クラス SptKoma 定義
SptKoma = Class.create(Sprite,{
	initialize: function(pm, pn) {
		Sprite.call(this, komaW, komaH);
		this.image = sptKomaall.image
		this.pm = pm; this.pn = pn;
		this.cm = pm+1; this.cn = pn+1;
		this.hm = 9-pn; this.hn = pm+1;
	},
	ontouchend: function(e) {
		sprect = new Sprite(komaW,komaH);
		surfrect = new Surface(banW,banH);
		rect = surfrect.context;
		rect.fillStyle = "red";
		rect.fillRect(0,0,banW,banH);
		sprect.image = surfrect;
		sprect.moveTo(-100, -100);
		game.rootScene.addChild(sprect);

		//クリック奇数回目
		if(flgClick==1) {
			cntclick++;
			//盤上でクリック
			if(0<=e.x && e.x<=BanW && 0<=e.y && e.y<=BanH) {
				modOM = modOki;
				pm1 = this.pm; pn1 = this.pn;
				cm1 = this.cm; cn1 = this.cn;
				hm1 = this.hm; hn1 = this.hn;
				//置駒があれば
				if(okigoma[cm1][cn1] != " * ") {
					//sprect red表示
					init();
					sprect.moveTo(banMarginLeft + pn1*banW,banMarginTop + pm1*banH);
					game.rootScene.addChild(sprect);
					display();
				} else {
					//置駒がなければ、何もしない
				}
			} else {
				//持駒をクリック
				if(motigomaTop<=e.y && e.y<=motigomaTop+komaH && motigomaLeft<=e.x && e.x<=motigomaLeft + 8*banW) {
					modOM = modMoti;
					pmm1 = Math.floor( (e.x - motigomaLeft) / banW );
					motigoma_i = 8- pmm1
					init();
					//sprect red表示
					sprect.moveTo(motigomaLeft + pmm1 * banW, motigomaTop );
					game.rootScene.addChild(sprect);
					display();
				}
			}
		}
		//クリック偶数回目
		if(flgClick==-1) {
			cntclick++;
			flgAnswer = 1;
			//盤上でクリック
			if(0<=e.x && e.x<=BanW && 0<=e.y && e.y<=BanH) {
				//ラベルlabelsecond 表示
				pm2 = this.pm; pn2 = this.pn;
				cm2 = this.cm; cn2 = this.cn;
				hm2 = this.hm; hn2 = this.hn;
				//★正解のチェック
				//盤上駒移動
				if((hm1 == correctstr1[NowTesuu]) && (hn1 == correctstr2[NowTesuu]) && (hm2 == correctstr3[NowTesuu]) && (hn2 == correctstr4[NowTesuu])) {
					init();
					//自分の移動駒の元を消す
					strlen=3;
					var left1 = databoardP[cm1].substr(0, (cn1-1) * strlen);
					var right1  = databoardP[cm1].substr(cn1 * strlen);
					databoardP[cm1] = left1 + " * "+ right1;
					init();
					//相手の駒があれば、持ち駒に加える //function KomaId2Name(i) //function KomaName2Id(s)
					var aitekoma = databoardP[cm2].substr((cn2-1) * strlen +1, strlen-1);
					motigomanum[KomaName2Id(aitekoma)]++;
					init();
					//移動盤上駒を表示する
					var jibun_idoukoma = correctstr5[NowTesuu] + correctstr6[NowTesuu] 
					var left2 = databoardP[cm2].substr(0, (cn2-1) * strlen);
					var right2  = databoardP[cm2].substr(cn2 * strlen);
					databoardP[cm2] = left2 + "+" + jibun_idoukoma + right2;
					display();

					//★正解→後手駒移動(後手の持駒は考慮しない)
					if(NowTesuu < Ttesuu){
						var a_hm1=correctstr1[NowTesuu+1]; var a_hn1=correctstr2[NowTesuu+1];
						var a_cm1= a_hn1; var a_cn1= 10-a_hm1;
						var a_hm2=correctstr3[NowTesuu+1]; var a_hn2=correctstr4[NowTesuu+1];
						var a_cm2= a_hn2; var a_cn2= 10-a_hm2;
						if(a_hm1!=0){
							//相手の移動駒の元を消す
							strlen=3;
							var left1 = databoardP[a_cm1].substr(0, (a_cn1-1) * strlen);
							var right1  = databoardP[a_cm1].substr(a_cn1 * strlen);
							databoardP[a_cm1] = left1 + " * "+ right1;
							//相手の移動駒を表す
							var aite_idoukoma = correctstr5[NowTesuu+1] + correctstr6[NowTesuu+1];
							var left2 = databoardP[a_cm2].substr(0, (a_cn2-1) * strlen);
							var right2  = databoardP[a_cm2].substr(a_cn2 * strlen);
							databoardP[a_cm2] = left2 + "-" + aite_idoukoma + right2;
						}else{//a_hm1==0
							//相手の打った持駒を表す
							var aite_utikoma = correctstr5[NowTesuu+1] + correctstr6[NowTesuu+1];
							var left2 = databoardP[a_cm2].substr(0, (a_cn2-1) * strlen);
							var right2  = databoardP[a_cm2].substr(a_cn2 * strlen);
							databoardP[a_cm2] = left2 + "-" + aite_utikoma + right2;
						}
					}
					init();
					//sprect 非表示
					sprect.moveTo(-100,-100);
					game.rootScene.addChild(sprect);
					display();
					if(modOM == modOki && flgAnswer == 1){
						cntCorrect++;
						lblLbl[9].text = ("正解数 = " + cntCorrect);
						game.rootScene.addChild(lblLbl[9]);
						flgAnswer = -1;
					}
					if(NowTesuu >= Ttesuu){
						lblLbl[13].text = ("ending 1");
						game.rootScene.addChild(lblLbl[13]);
						ending();return;
					}
					NowTesuu += 2;
				}else{
					//★間違い-盤上でクリック
					//sprect 非表示
					init();
					sprect.moveTo(-100,-100);
					game.rootScene.addChild(sprect);
					display();
					if(modOM == modOki && flgAnswer == 1){
						cntWrong++;
						lblLbl[10].text = ("間違い数 = " + cntWrong);
						game.rootScene.addChild(lblLbl[10]);
						flgAnswer = -1;
					}
				}

				//持駒を盤上に打つ
				//★正解
				if(correctstr1[NowTesuu]=="0" && correctstr2[NowTesuu]=="0" && (correctstr5[NowTesuu]+correctstr6[NowTesuu])==(KomaId2Name(motigoma_i)) && (hm2 == correctstr3[NowTesuu]) && (hn2 == correctstr4[NowTesuu])) {
					var a_hm2=correctstr3[NowTesuu]; var a_hn2=correctstr4[NowTesuu];
					var a_cm2= a_hn2; var a_cn2= 10-a_hm2;
					//打ち持駒を盤上に表示する
					var jibun_utikoma = KomaId2Name(motigoma_i);
					var left2 = databoardP[cm2].substr(0, (cn2-1) * strlen);
					var right2  = databoardP[cm2].substr(cn2 * strlen);
					databoardP[cm2] = left2 + "+" + jibun_utikoma + right2;
					motigomanum[motigoma_i]--;
					init();
					sprect.moveTo(sprect);
					display();

					//★正解→後手駒移動(後手の持駒は考慮しない)
					if(NowTesuu < Ttesuu){
						var a_hm1=correctstr1[NowTesuu+1]; var a_hn1=correctstr2[NowTesuu+1];
						var a_cm1= a_hn1; var a_cn1= 10-a_hm1;
						var a_hm2=correctstr3[NowTesuu+1]; var a_hn2=correctstr4[NowTesuu+1];
						var a_cm2= a_hn2; var a_cn2= 10-a_hm2;
						if(a_hm1!=0){
							//相手の移動駒の元を消す
							strlen=3;
							var left1 = databoardP[a_cm1].substr(0, (a_cn1-1) * strlen);
							var right1  = databoardP[a_cm1].substr(a_cn1 * strlen);
							databoardP[a_cm1] = left1 + " * "+ right1;
							//相手の移動駒を表す
							var aite_idoukoma = correctstr5[NowTesuu+1] + correctstr6[NowTesuu+1];
							var left2 = databoardP[a_cm2].substr(0, (a_cn2-1) * strlen);
							var right2  = databoardP[a_cm2].substr(a_cn2 * strlen);
							databoardP[a_cm2] = left2 + "-" + aite_idoukoma + right2;
						}else{//a_hm1==0
							//相手の打った持駒を表す
							var aite_utikoma = correctstr5[NowTesuu+1] + correctstr6[NowTesuu+1];
							var left2 = databoardP[a_cm2].substr(0, (a_cn2-1) * strlen);
							var right2  = databoardP[a_cm2].substr(a_cn2 * strlen);
							databoardP[a_cm2] = left2 + "-" + aite_utikoma + right2;
						}
					}
					init();
					//sprect 非表示
					sprect.moveTo(-100,-100);
					game.rootScene.addChild(sprect);
					display();
					if(modOM == modMoti && flgAnswer == 1){
						cntCorrect++;
						lblLbl[9].text = ("正解数 = " + cntCorrect);
						game.rootScene.addChild(lblLbl[9]);
						flgAnswer = -1;
						if(NowTesuu >= Ttesuu){
							ending();return;
						}
					}
					if(NowTesuu+1 >= Ttesuu){
						ending();return;
					}
					NowTesuu += 2;
				//★間違い-持駒を盤上に打つ 盤上でクリック
				}else{
					init();
					//sprect 非表示
					sprect.moveTo(-100,-100);
					game.rootScene.addChild(sprect);
					display();
					if(modOM == modMoti && flgAnswer == 1){
						cntWrong++;
						lblLbl[10].text = ("間違い数 = " + cntWrong);
						game.rootScene.addChild(lblLbl[10]);
						flgAnswer = -1;
					}
				}
			}
		}
		flgClick *= -1;
	}
})
