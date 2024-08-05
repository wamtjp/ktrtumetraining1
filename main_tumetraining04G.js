//かなりきちんと動く
enchant();
var y,x,m,n,img;
var sptKoma = new Array(1000);  // 駒配列
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

var koma_I2N = new Array('* ','FU','KY','KE','GI','KI','KA','HI','OU','TO','NY','NK','NG','dummy','UM','RY','dummy',);
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
for (var i=1; i<=100; i++) {
	lblLbl[i].font = "24px 'MSゴシック'";
	lblLbl[i].width= 1000;
	lblLbl[i].x= 10;
	lblLbl[i].y= motigomaTop + 20*i-90;
	lblLbl[i].text = "@";
}
var labelmotigomanum = new Array(100);
for (var i=1; i<=7; i++) { labelmotigomanum[i] = new Label();}
for (var i=1; i<=7; i++) {
	labelmotigomanum[i].font = "24px 'MSゴシック'";
//	labelmotigomanum[i].color = "rgb(255,255,255)";
	labelmotigomanum[i].width= 1000;
//	labelmotigomanum[i].x= motigomaLeft + (8-i)*banW+banW/3;
	labelmotigomanum[i].x= motigomaLeft + i*banW+banW/3;
	labelmotigomanum[i].y= motigomaTop+ banH*3/4;
}

var motikomaAll = "";;
var KomaNameFrame = {};
for(var i=0; i<29; i++) { KomaNameFrame[KomaName[i]] = KomaFrame[i]; }
var okigoma = new Array(100);
var okigoma_sengo = new Array(3);
var okigoma_koma = new Array(50);

for (var m=0; m<10; m++) {
	okigoma[m] = new Array(10);
	okigoma_sengo[m] = new Array(10);
	okigoma_koma[m] = new Array(10);
}

var motigoma = new Array(8);
for (var i=0; i<8; i++) { motigoma[i] = ""; }
var motigomanum = new Array(10);
var Tmotigomanum;

var motigoma_i;
var NowTesuu = 1;
var modOki = 1;
var modMoti = 2;

var cntclick = 0;
var flgClick = 1;
var pm1;
var pm2;
var hm1;
var hn1;
var hm2;
var hn2;
var pmm1;
var pmm2;
var sprect;
var surfrect;
var rect;
var pm;

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
var sptGame;
var sptBan;

var first =  1;
var second  = -1;
var MODE12 = first;

window.onload = function() {
	game = new Game(GameW, GameH);
	game.preload("komaall2.png", "ban02.jpg", "bg2.png");

	//初期設定-置駒処理
	strlen=3;
	for (var cm=1; cm<=9; cm++) {
		start=0;
		for (var cn=1; cn<=9; cn++) {
			str = databoardP[cm].substr(start, strlen);
			hm = 10 - cn; hn = cm;
			okigoma[hm][hn] = str; start += strlen;
			okigoma_sengo[hm][hn] = okigoma[hm][hn].substr(0,1);//"+" "-" " "
			okigoma_koma[hm][hn]  = okigoma[hm][hn].substr(1,2);// "* " "FU"
		}
	}
	//初期設定-持駒処理
	strlen=4;
	motikomaAll="";
	for (var i=1; i<=1; i++) {//歩香桂銀金角飛の7種類×２（先手・後手）
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

	sptKomaall = new Sprite(komaW*8,komaH*6); 
	sprect = new Sprite(komaW,komaH);
	surfrect = new Surface(banW,banH);

	//持駒作成
	for (var i=7; i>=1; i--) {
	}

	//置駒作成
	for (var i=0; i<81; i++) {
	}

	game.onload = function() {
		init(); display();
	}
	game.start();
}

function init(){
	readcorrectanswer();
	//背景表示
	sptGame = new Sprite(GameW,GameH); 
	sptGame.image = game.assets[imgGameF];
	sptGame.x = 0; sptGame.y = 0;
	game.rootScene.addChild(sptGame);
	//盤表示
	sptBan = new Sprite(BanW,BanH); 
	sptBan.image = game.assets[imgBanF];
	sptBan.x = 0; sptBan.y = 0;
	game.rootScene.addChild(sptBan);
	//各持駒数表示ラベル
	for (var i=1; i<=7; i++) {
		labelmotigomanum[i].text = 0;
		game.rootScene.addChild(labelmotigomanum[i]);
	}

	rect = surfrect.context;
	rect.fillStyle = "red";
	rect.fillRect(0,0,banW,banH);
	sprect.image = surfrect;
	sprect.moveTo(100, 10);
	game.rootScene.addChild(sprect);
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
	//置駒表示
	for (var hm=1; hm<=9; hm++) {
		for (var hn=1; hn<=9; hn++) {
			var pm = hn-1; pn = 9 - hm;
			i = pm * 9 + pn;
			//m = i%9; n = Math.floor(i/9);
			sptKoma[i] = new SptKoma(hm, hn);
			sptKoma[i].frame = KomaNameFrame[okigoma[hm][hn]];
			sptKoma[i].x = banMarginLeft + pn*banW;
			sptKoma[i].y = banMarginTop  + pm*banH;
			game.rootScene.addChild(sptKoma[i]);
		}
	}
	//持駒表示
	for (var hn=1; hn<=7; hn++) {
		var ii = hn + 81;//置駒が先
		sptKoma[ii] = new SptKoma(0,hn);
		sptKoma[ii].frame = (KomaNameFrame["+"+ KomaId2Name(hn)]);
		sptKoma[ii].y = motigomaTop;
		sptKoma[ii].x = motigomaLeft + hn*banW;
		game.rootScene.addChild(sptKoma[ii]);
		//各持駒数表示
		labelmotigomanum[hn].text = motigomanum[hn];
		game.rootScene.addChild(labelmotigomanum[hn]);
	}
	//正解数・間違い数 表示
	lblLbl[12].text = "正解数 = " + cntCorrect;
	lblLbl[13].text = "間違い数 = " + cntWrong;
	game.rootScene.addChild(lblLbl[12]);
	game.rootScene.addChild(lblLbl[13]);
}

//クラス SptKoma 定義
SptKoma = Class.create(Sprite,{
	initialize: function(hm, hn) {
		Sprite.call(this, komaW, komaH);
		this.image = sptKomaall.image;
		this.hm = hm; this.hn = hn;
		this.cm = hn; this.cn = 10-hm;
	},
	ontouchend: function(e) {
		//第１駒指定
		if(MODE12 == first) {
			hm1 = this.hm; hn1 = this.hn;
			cm1 = this.cm; cn1 = this.cn;

			//盤上でクリック
			if(1<=hm1 && hm1<=9 && 1<=hn1 && hn1<=9) {
				if(okigoma_sengo[hm1][hn1] == " "){
					MODE12 = first;
					return;
				}
				if(okigoma_sengo[hm1][hn1] == "-"){
					MODE12 = first;
					return;
				}
				if(okigoma_sengo[hm1][hn1] == "+"){
					//sprect red表示
					init();
					sprect.moveTo(banMarginLeft + (cn1-1)*banW,banMarginTop + (cm1-1)*banH);
					game.rootScene.addChild(sprect);
					display();
					MODE12 = second;
					return;
				}
			}
		//持駒をクリック
			if(hm1 == 0 && 0 <= hn1 && hn1 <= 7) {
				init();
				//sprect red表示
				sprect.moveTo(banMarginLeft + (cm1-1)*(banW)+32, banMarginTop+(BanH)-(banH/2) );
				game.rootScene.addChild(sprect);
				display();
				MODE12 = second;
				return;
			}
		}
		//第２駒指定
		if(MODE12 == second) {
			hm2 = this.hm; hn2 = this.hn;
			cm2 = this.cm; cn2 = this.cn;
		//持駒をクリック
			if(hm2 == 0 && 0 <= hn2 && hn2 <= 7) {
				MODE12 = first;
				//sprect 非表示
				init();
				sprect.moveTo(100,800);
				game.rootScene.addChild(sprect);
				display();
				return;
			}
			//盤上でクリック
			if(1<=hm2 && hm2<=9 && 1<=hn2 && hn2<=9) {
				if(okigoma_sengo[hm2][hn2] == "+"){
					MODE12 = first;
					//sprect 非表示
					init();
					sprect.moveTo(100,800);
					game.rootScene.addChild(sprect);
					display();
					return;
				}

				//★正解のときの処理
				//盤上駒移動
				if((hm1 == correctstr1[NowTesuu]) && (hn1 == correctstr2[NowTesuu])&& (hm2 == correctstr3[NowTesuu]) && (hn2 == correctstr4[NowTesuu])) {
					//自分の移動駒の元を「駒なし」にする
					okigoma[hm1][hn1] = " * "
					okigoma_sengo[hm1][hn1] = " "
					okigoma_koma[hm1][hn1]  = "* "
					//相手の駒が移動先にあれば、持ち駒に加える
					if(okigoma_sengo[hm2][hn2] == "-"){
						var aitekoma = okigoma_koma[hm2][hn2]
						motigomanum[KomaName2Id(aitekoma)]++;
					}
					//駒を移動する
					var idousakikoma = correctstr5[NowTesuu] + correctstr6[NowTesuu];
					okigoma_sengo[hm2][hn2] = "+";
					okigoma_koma[hm2][hn2]  = idousakikoma;
					okigoma[hm2][hn2] = okigoma_sengo[hm2][hn2]  + okigoma_koma[hm2][hn2];
					//sprect 非表示
					init();
					sprect.moveTo(100,800);
					game.rootScene.addChild(sprect);
					display();

					if(NowTesuu >= Ttesuu){
						ending();return;
					}

					//★盤上駒移動 正解→後手駒移動(後手の持駒は考慮しない)
					if(NowTesuu < Ttesuu){
						var a_hm1=correctstr1[NowTesuu+1]; var a_hn1=correctstr2[NowTesuu+1];
						var a_cm1= a_hn1; var a_cn1= 10-a_hm1;
						var a_hm2=correctstr3[NowTesuu+1]; var a_hn2=correctstr4[NowTesuu+1];
						var a_cm2= a_hn2; var a_cn2= 10-a_hm2;
						if(a_hm1!=0){
							//相手の移動駒の元を消す
							okigoma[a_hm1][a_hn1] = " * "
							okigoma_sengo[a_hm1][a_hn1] = " "
							okigoma_koma[a_hm1][a_hn1]  = "* "
							//相手の移動駒を表す
							var idousakikoma = correctstr5[NowTesuu+1] + correctstr6[NowTesuu+1];
							okigoma_sengo[a_hm2][a_hn2] = "-";
							okigoma_koma[a_hm2][a_hn2]  = idousakikoma;
							okigoma[a_hm2][a_hn2] = okigoma_sengo[a_hm2][a_hn2]  + okigoma_koma[a_hm2][a_hn2];
						}else{//a_hm1==0
							//相手の打った持駒を表す
							var aite_utikoma = correctstr5[NowTesuu+1] + correctstr6[NowTesuu+1];
							okigoma_sengo[a_hm2][a_hn2] = "-";
							okigoma_koma[a_hm2][a_hn2]  = aite_utikoma;
							okigoma[a_hm2][a_hn2] = okigoma_sengo[a_hm2][a_hn2]  + okigoma_koma[a_hm2][a_hn2];
						}
						//sprect 非表示
						init();
						sprect.moveTo(100,800);
						game.rootScene.addChild(sprect);
						display();
						cntCorrect++;
						NowTesuu += 2;
						MODE12 = first;
						return;
					}
				}
				//持駒を盤上に打つ
motigoma_i = hn1;
				//★正解
				if(correctstr1[NowTesuu]=="0" && (correctstr5[NowTesuu]+correctstr6[NowTesuu])==(KomaId2Name(motigoma_i)) && (hm2 == correctstr3[NowTesuu]) && (hn2 == correctstr4[NowTesuu])) {
					//打ち持駒を盤上に表示する
					var jibun_utikoma = KomaId2Name(motigoma_i);
					okigoma_sengo[hm2][hn2] = "+";
					okigoma_koma[hm2][hn2]  = jibun_utikoma;
					okigoma[hm2][hn2] = okigoma_sengo[hm2][hn2]  + okigoma_koma[hm2][hn2];
					//自分の持駒の持ち数を減らす
					motigomanum[motigoma_i]--;
					//sprect 非表示
					init();
					sprect.moveTo(100,800);
					game.rootScene.addChild(sprect);
					display();

					if(NowTesuu >= Ttesuu){
						ending();return;
					}

					//★持駒を盤上に打つ 正解→後手駒移動(後手の持駒は考慮しない)
					if(NowTesuu < Ttesuu){
						var a_hm1=correctstr1[NowTesuu+1]; var a_hn1=correctstr2[NowTesuu+1];
						var a_hm2=correctstr3[NowTesuu+1]; var a_hn2=correctstr4[NowTesuu+1];
						var a_cm1= a_hn1; var a_cn1= 10-a_hm1;
						var a_cm2= a_hn2; var a_cn2= 10-a_hm2;
						if(a_hm1!=0){
							//相手の移動駒の元を消す
							okigoma[a_hm1][a_hn1] = " * "
							okigoma_sengo[a_hm1][a_hn1] = " "
							okigoma_koma[a_hm1][a_hn1]  = "* "
							//相手の移動駒を表す
							var idousakikoma = correctstr5[NowTesuu+1] + correctstr6[NowTesuu+1];
							okigoma_sengo[a_hm2][a_hn2] = "-";
							okigoma_koma[a_hm2][a_hn2]  = idousakikoma;
							okigoma[a_hm2][a_hn2] = okigoma_sengo[a_hm2][a_hn2]  + okigoma_koma[a_hm2][a_hn2];
						}else{//a_hm1==0
							//相手の打った持駒を表す
							var aite_utikoma = correctstr5[NowTesuu+1] + correctstr6[NowTesuu+1];
							okigoma_sengo[a_hm2][a_hn2] = "-";
							okigoma_koma[a_hm2][a_hn2]  = aite_utikoma;
							okigoma[a_hm2][a_hn2] = okigoma_sengo[a_hm2][a_hn2]  + okigoma_koma[a_hm2][a_hn2];
						}
					}
					init();
					//sprect 非表示
					sprect.moveTo(100,800);
					game.rootScene.addChild(sprect);
					display();
					cntCorrect++;
					NowTesuu += 2;
					MODE12 = first;
					return;
				//★間違い-持駒を盤上に打つ 盤上でクリック
				}else{
					init();
					//sprect 非表示
					sprect.moveTo(100,800);
					game.rootScene.addChild(sprect);
					display();
					cntWrong++;
					MODE12 = first;
					return;
				}
			}
		}
	}
})
