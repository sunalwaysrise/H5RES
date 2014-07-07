/**
 * @author luwenbin@live.com
 */
var jcDom = {
	headerS1: $("#headerS1"),
	headerS2: $("#headerS2"),
	Title: $("#Title"),
	QRTi: $("#Title2"),
	changePlayType: $("#changePlayType"),
	jcTo: $("#jcTo"),
	jcTime: $("#jcTime"),
	choose: $("#choose"),
	MainStep1: $("#MainStep1"),
	MainStep2: $("#MainStep2"),
	curBets: $("#curBets"),
	curMoney: $("#curMoney"),
	betList: $("#betList"),
	Edit: $("#EditBets"),
	money: $("#money"),
	bets: $("#bets"),
	mul: $("#mul"),
	passWayBox: $("#passWayBox"),
	cc: $("#cc"),
	dd: $("#dd"),
	passWayTxt: $("#passWayTxt"),
	lC: $("#leagueChoose"),
	lcs: $("#lcs"),
	More:$("#More"),
	MoreDetail:$("#MoreDetail"),
	MoreLocked:$("#MoreLocked"),
	mainSection:$("#mainSection"),

};
cp2y.buy = {
	doInit: function () {
		this.gg = this.bt == 10059 ? {
			//'单关'  : {'单关':1},
			'2串1': {
				'2串1': 1
			
			}
			,
			'3串1': {
				'3串1': 1
			
			}
			,
			'3串3': {
				'2串1': 3
			
			}
			,
			'3串4': {
				'3串1': 1,
				'2串1': 3
			
			}
			,
			'4串1': {
				'4串1': 1
			
			}
			,
			'4串4': {
				'3串1': 4
			
			}
			,
			'4串5': {
				'4串1': 1,
				'3串1': 4
			
			}
			,
			'4串6': {
				'2串1': 6
			
			}
			,
			'4串11': {
				'4串1': 1,
				'3串1': 4,
				'2串1': 6
			
			}
			,
			'5串1': {
				'5串1': 1
			
			}
			,
			'5串5': {
				'4串1': 5
			
			}
			,
			'5串6': {
				'5串1': 1,
				'4串1': 5
			
			}
			,
			'5串10': {
				'2串1': 10
			
			}
			,
			'5串16': {
				'5串1': 1,
				'4串1': 5,
				'3串1': 10
			
			}
			,
			'5串20': {
				'2串1': 10,
				'3串1': 10
			
			}
			,
			'5串26': {
				'5串1': 1,
				'4串1': 5,
				'3串1': 10,
				'2串1': 10
			
			}
			,
			'6串1': {
				'6串1': 1
			
			}
			,
			'6串6': {
				'5串1': 6
			
			}
			,
			'6串7': {
				'6串1': 1,
				'5串1': 6
			
			}
			,
			'6串15': {
				'2串1': 15
			
			}
			,
			'6串20': {
				'3串1': 20
			
			}
			,
			'6串22': {
				'6串1': 1,
				'5串1': 6,
				'4串1': 15
			
			}
			,
			'6串35': {
				'2串1': 15,
				'3串1': 20
			
			}
			,
			'6串42': {
				'6串1': 1,
				'5串1': 6,
				'4串1': 15,
				'3串1': 20
			
			}
			,
			'6串50': {
				'2串1': 15,
				'3串1': 20,
				'4串1': 15
			
			}
			,
			'6串57': {
				'6串1': 1,
				'5串1': 6,
				'4串1': 15,
				'3串1': 20,
				'2串1': 15
			
			}
			,
			'7串1': {
				'7串1': 1
			
			}
			,
			'7串7': {
				'6串1': 7
			
			}
			,
			'7串8': {
				'6串1': 7,
				'7串1': 1
			
			}
			,
			'7串21': {
				'5串1': 21
			
			}
			,
			'7串35': {
				'4串1': 35
			
			}
			,
			'7串120': {
				'2串1': 21,
				'3串1': 35,
				'4串1': 35,
				'5串1': 21,
				'6串1': 7,
				'7串1': 1
			
			}
			,
			'8串1': {
				'8串1': 1
			
			}
			,
			'8串8': {
				'7串1': 8
			
			}
			,
			'8串9': {
				'7串1': 8,
				'8串1': 1
			
			}
			,
			'8串28': {
				'6串1': 28
			
			}
			,
			'8串56': {
				'5串1': 56
			
			}
			,
			'8串70': {
				'4串1': 70
			
			}
			,
			'8串247': {
				'2串1': 28,
				'3串1': 56,
				'4串1': 70,
				'5串1': 56,
				'6串1': 28,
				'7串1': 8,
				'8串1': 1
			
			}
		}
		: {
			'单关': {
				'单关': 1
			
			}
			,
			'2串1': {
				'2串1': 1
			
			}
			,
			'3串1': {
				'3串1': 1
			
			}
			,
			'3串3': {
				'2串1': 3
			
			}
			,
			'3串4': {
				'3串1': 1,
				'2串1': 3
			
			}
			,
			'4串1': {
				'4串1': 1
			
			}
			,
			'4串4': {
				'3串1': 4
			
			}
			,
			'4串5': {
				'4串1': 1,
				'3串1': 4
			
			}
			,
			'4串6': {
				'2串1': 6
			
			}
			,
			'4串11': {
				'4串1': 1,
				'3串1': 4,
				'2串1': 6
			
			}
			,
			'5串1': {
				'5串1': 1
			
			}
			,
			'5串5': {
				'4串1': 5
			
			}
			,
			'5串6': {
				'5串1': 1,
				'4串1': 5
			
			}
			,
			'5串10': {
				'2串1': 10
			
			}
			,
			'5串16': {
				'5串1': 1,
				'4串1': 5,
				'3串1': 10
			
			}
			,
			'5串20': {
				'2串1': 10,
				'3串1': 10
			
			}
			,
			'5串26': {
				'5串1': 1,
				'4串1': 5,
				'3串1': 10,
				'2串1': 10
			
			}
			,
			'6串1': {
				'6串1': 1
			
			}
			,
			'6串6': {
				'5串1': 6
			
			}
			,
			'6串7': {
				'6串1': 1,
				'5串1': 6
			
			}
			,
			'6串15': {
				'2串1': 15
			
			}
			,
			'6串20': {
				'3串1': 20
			
			}
			,
			'6串22': {
				'6串1': 1,
				'5串1': 6,
				'4串1': 15
			
			}
			,
			'6串35': {
				'2串1': 15,
				'3串1': 20
			
			}
			,
			'6串42': {
				'6串1': 1,
				'5串1': 6,
				'4串1': 15,
				'3串1': 20
			
			}
			,
			'6串50': {
				'2串1': 15,
				'3串1': 20,
				'4串1': 15
			
			}
			,
			'6串57': {
				'6串1': 1,
				'5串1': 6,
				'4串1': 15,
				'3串1': 20,
				'2串1': 15
			
			}
			,
			'7串1': {
				'7串1': 1
			
			}
			,
			'7串7': {
				'6串1': 7
			
			}
			,
			'7串8': {
				'6串1': 7,
				'7串1': 1
			
			}
			,
			'7串21': {
				'5串1': 21
			
			}
			,
			'7串35': {
				'4串1': 35
			
			}
			,
			'7串120': {
				'2串1': 21,
				'3串1': 35,
				'4串1': 35,
				'5串1': 21,
				'6串1': 7,
				'7串1': 1
			
			}
			,
			'8串1': {
				'8串1': 1
			
			}
			,
			'8串8': {
				'7串1': 8
			
			}
			,
			'8串9': {
				'7串1': 8,
				'8串1': 1
			
			}
			,
			'8串28': {
				'6串1': 28
			
			}
			,
			'8串56': {
				'5串1': 56
			
			}
			,
			'8串70': {
				'4串1': 70
			
			}
			,
			'8串247': {
				'2串1': 28,
				'3串1': 56,
				'4串1': 70,
				'5串1': 56,
				'6串1': 28,
				'7串1': 8,
				'8串1': 1
			
			}
		};
	}
	,
	showLine2: function () {
		$(".jc_line1 strong").click(function () {
			$(".jc_line2").hide();
			if ($(this).hasClass('show')) {
				$(".jc_line1 strong").removeClass('show');
				$(this).removeClass('show');
				$(this).parent().next().hide();
			}
			else {
				$(".jc_line1 strong").removeClass('show');
				$(this).addClass('show');
				$(this).parent().next().show();
			}
		});
		$(".tip2").click(function () {
			$(this).next().toggle();
		});
		$('#lcs a').click(function () {
			$(this).toggleClass("on");
		});
	}
	,
	openLC: function () {
		jcDom.mainSection.hide();
		jcDom.passWayBox.hide();
		jcDom.lC.show();
	}
	,
	hideLC: function () {
		jcDom.mainSection.show();
		jcDom.lC.hide();
		jcDom.passWayBox.hide();
	}
	,
	Lea: function () {
		var Lea = [],i = 0,len;
		$("#lcs .on").each(function (i, v) {
			Lea.push($(v).html());
		});
		len = Lea.length;
		$("#choose li").each(function (i, v) {
			if (Lea.indexOf($(v).attr("class")) != -1) {
				$(v).show();
			}
			else {
				$(v).hide();
			}
		});
		this.hideLC();
	}
	,
	Lea2: function (t, x) {
		$(t).toggleClass('on');
		$(t).siblings().removeClass('on');
		if (x == 1) {
			$("#lcs a").addClass("on");
		}
		else if (x == 2) {
			$("#lcs a").toggleClass("on");
		}
		else if (x == 3) {
			$("#lcs a").removeClass("on");
		}
		else if (x == 4) {
			$("#lcs a").removeClass("on");
			$("#lcs a").each(function (i, v) {
				if (['意甲', '英超', '西甲', '德甲', '法甲'].indexOf($(v).html()) != -1) {
					$(v).addClass('on');
				}
			});
		}
	}
	,
	showPassWayBox: function () {
		jcDom.mainSection.hide();
		jcDom.lC.hide();
		jcDom.passWayBox.show();
	}
	,
	hidePassWayBox: function () {
		jcDom.mainSection.show();
		jcDom.lC.hide();
		jcDom.passWayBox.hide();
	}
	,
	select: function (_this, f) {
		var size = 0, key;
		for (key in this.schemes) {
			size++;
		}
		if(size>=15){
			return cp2y.dialog.alert('最多选择15场比赛');
		}
		var p = $(_this).parent().parent(),
		d = eval('(' + p.attr('data') + ')'),
		t = p.parent();
		if (d.end) {
			return cp2y.dialog.alert('该场比赛已截止投注。');
		}
		if ($(_this).hasClass('jcSelect')) {
			$(_this).removeClass('jcSelect');
		}
		else {
			$(_this).addClass('jcSelect');
		}
		this.content(t, d);
		if (f) {
			this.showPassWay();
			//展示过关方式
			this.setPassWay();
			//过关方式 写入内存
			if ($(_this).hasClass('jcSelect')) {
				this.reSelect($(_this).attr("data_class"), true);
			}
			else {
				this.reSelect($(_this).attr("data_class"), false);
			}
		}
		this.switchDanChk();
		jcDom.curBets.html(this.selectMatchCount());
	}
	,
	addContent: function () {
		var k = 0,
		html = [],
		s = 0;
		for (k in this.schemes) {
			s++;
			html.push("<dd>" + this.schemes[k].p.html() + "<a onclick='cp2y.buy.selectDan(this)' id='d_" + this.schemes[k].no + "' class='dan'>胆</a><a onclick='cp2y.buy.del(this)' class='delI'>X</a></dd>");
		}
		if (s < 2) {
			return cp2y.dialog.alert('至少选择两场比赛');
		}
		jcDom.betList.html(html.join(''));
		$("#betList .jcBet").click(function () {
			cp2y.buy.select($(this), true);
		});
		//设置默认过关方式
		if (this.passWay.length == 0) {
			if (s > this.maxMatch) {
				s = this.maxMatch;
			}
			this.passWay.push(s + "串1");
		}
		this.showPassWay();
		//重写过关方式
		this.setPassWay();
		this.step2();
		//console.log(this.schemes);
		this.chaipiao();
	}
	,
	showPassWay: function () {
		var arr = [],dd = [],cc = [],mc = this.selectMatchCount(),sm = this.maxMatch,m, k, i = 0,len, html = [],mhtml = [],c = '';
		if (mc < 2) {
			return cp2y.dialog.alert('至少选择两场比赛');
		}
		if (mc > sm) {
			mc = sm;
		}
		for (k in this.gg) {
			m = Number(k.substring(0, k.indexOf('串')));
			if (m <= mc) {
				arr.push(k);
			}
		}
		len = arr.length;
		for (i;i < len;i++) {
			var c = arr[i].substring(arr[i].indexOf('串') + 1);
			if (c == '1') {
				cc.push(arr[i]);
			}
			else {
				dd.push(arr[i]);
			}
		}
		i = 0;
		len = dd.length;
		for (i;i < len;i++) {
			if (this.passWay.indexOf(dd[i]) != -1) {
				c = 'inPassWay';
			}
			else {
				c = '';
			}
			html.push('<a onclick="cp2y.buy.choosePassWay(this)" class="' + c + '">' + dd[i] + '</a>');
		}
		i = 0;
		len = cc.length;
		for (i;i < len;i++) {
			if (this.passWay.indexOf(cc[i]) != -1) {
				c = 'inPassWay';
			}
			else {
				c = '';
			}
			mhtml.push('<a onclick="cp2y.buy.choosePassWay(this)" class="' + c + '">' + cc[i] + '</a>');
		}
		jcDom.dd.html(html.join(''));
		jcDom.cc.html(mhtml.join(''));
	}
	,
	choosePassWay: function (o) {
		this.chkDanModem();
		if ($(o).hasClass("inPassWay")) {
			$(o).removeClass('inPassWay');
			this.passWay.del($(o).html());
		}
		else {
			$(o).addClass('inPassWay');
			this.passWay.push($(o).html());
		}
		this.setPassWay();
		// 过关方式 写入内存
	
	}
	,
	setPassWay: function () {
		var inPas = $(".inPassWay"),
		i = 0,
		len = inPas.length;
		this.passWay = [];
		for (i;i < len;i++) {
			this.passWay.push(inPas.eq(i).html());
		}
		var pWT=this.passWay.join(',');
		jcDom.passWayTxt.html(pWT?pWT:"选择过关方式");
		$(".isDan").removeClass('isDan');
		this.chkDanModem();
		this.setUnits();
	}
	,
	reSelect: function (t, f) {//重写旧文件
		if (f) {
			jcDom.choose.find("." + t).addClass('jcSelect');
		}
		else {
			jcDom.choose.find("." + t).removeClass('jcSelect');
		}
	}
	,
	canChooseDan: function () {
		if (this.passWay.length == 1 && this.passWay[0] == '单关')
		return false;
		var pass = this.getRealPass(),
		pm = 1000,
		m;
		for (var i = 0;i < pass.length;i++) {
			m = pass[i] == '单关' ? 1 : Number(pass[i].substring(0, pass[i].indexOf('串')));
			if (m < pm)
			pm = m;
		}
		if (pm == 1) {
			return false;
		}
		var sm = this.selectMatchCount();
		return sm > 2 && sm > pm;
	}
	,
	switchDanChk: function (chk) {
		this.each(this.schemes, function (s, k) {
			s.dan = false;
			$('#dan_' + k).removeClass("isDan");
		});
	}
	,
	chkDanModem: function () {
		this.switchDanChk(!this.canChooseDan());
	}
	,
	selectDan: function (obj) {
		if ($(obj).hasClass('isDan')) {
			$(obj).removeClass('isDan');
		}
		else {
			$(obj).addClass('isDan');
		}
		var f = function (msg) {
			cp2y.dialog.alert(msg);
			$(obj).removeClass('isDan');
			cp2y.buy.schemes[obj.id.replace('d_', '')].dan = false;
		};
		if (this.passWay.length == 0) {
			return f('请选择过关方式再定胆码。');
		};
		var dcMax = 10000,
		pass = this.getRealPass();
		for (var i = 0;i < pass.length;i++) {
			m = pass[i] == '单关' ? 1 : Number(pass[i].substring(0, pass[i].indexOf('串')));
			if (m < dcMax) {
				dcMax = m;
			}
		}
		if (this.danCount() == dcMax - 1 && $(obj).hasClass('isDan')) {
			return f((dcMax - 1) == 0 ? '单关不能设置胆码。' : '胆码只能设置 ' + (dcMax - 1) + ' 场。');
		}
		this.schemes[obj.id.replace('d_', '')].dan = $(obj).hasClass('isDan');
		this.setUnits();
	}
	,
	danCount: function () {/*计算胆个数*/
		var dc = 0;
		this.each(this.schemes, function (s, k) {
			if (s.dan) {
				dc++;
			}
		});
		return dc;
	}
	,
	getRealPass: function () {
		var pass = [];
		for (var i = 0;i < this.passWay.length;i++) {
			for (var k in this.gg[this.passWay[i]]) {
				pass.push(k);
			}
		}
		return pass;
	}
	,
	setUnits: function () {
		this.u = this.calcUnits();
		this.setMoney();
	}
	,
	setMulBox: function () {
		var html='<input type="tel" id="MulBox" placeholder="输入倍数" class="input4 mt40 tc" value="'+cp2y.buy.mul+'" /><a onclick="cp2y.buy.setMul();" class="btn1 mt10">确认</a>',o={
			t:'倍数',
			c:html
		
		};
		cp2y.input.openBox(o);
	}
	,
	setMul: function () {
		var t = $("#MulBox"),v=t.val();
		if (!t.val().isInt()) {
			v = 1;
		}
		else if (v > 9999) {
			v = 9999;
		}
		else if (v < 1) {
			v = 1;
		}
		else{
			v=t.val();
		}
		this.mul = v;
		$('#jcMul').html(v);
		cp2y.input.closeBox();
		this.setMoney();
		this.chaipiao();
	}
	,
	setMoney: function () {
		this.money = this.u * this.mul * 2;
		jcDom.bets.html(this.u);
		jcDom.money.html(this.money);
		//this.guessPrizeScope();//计算赔率
	
	}
	,
	apartDraw: function (dan, tuo, len) {
		var arrJoin = function (arr1, arr2) {
			var arr = [];
			for (var i = 0;i < arr1.length;i++)
			arr.push(arr1[i]);
			for (var i = 0;i < arr2.length;i++)
			arr.push(arr2[i]);
			return arr;
		}
		, combi = function (arr, num) {
			var r = [];
			(function f(t, a, n) {
				if (n == 0)
				return r.push(t);
				for (var i = 0, l = a.length - n;i <= l;i++) {
					f(t.concat(a[i]), a.slice(i + 1), n - 1);
				}
			})([], arr, num);
			return r;
		};
		var tuoLen = len - dan.length;
		var arr = combi(tuo, tuoLen);
		var bet = [];
		var l = tuo.length;
		for (var i = 0;i < arr.length;i++) {
			bet.push(arrJoin(dan, arr[i]));
		}
		return bet;
	}
	,
	calcUnits: function () {
		var hunhe = false;
		if (cp2y.buy.jcType==5) {
			hunhe = true;
		}
		return this[this.isCutRepeat ? 'calcUnitsNotRepeat' : hunhe ? 'calcUnitsRepeatHhtz' : 'calcUnitsRepeat'](cp2y.buy.hasCutSinglePlay);
	}
	,
	_calcUnitsRepeat: function (m, pass) {
		var p = [];
		for (var k in this.gg[pass]) {
			p.push(k);
		}
		var t = [],
		d = [],
		len, arr, tu = 0;
		$(m).each(function (i, o) {
			(o.dan ? d : t).push(o.v.length);
		});
		$(p).each(function (i, v) {
			len = v == '单关' ? 1 : Number(v.substring(0, v.indexOf('串')));
			arr = d.length > len ? this.comp(d, len) : this.comp(t, len - d.length);
			for (var j = 0;j < arr.length;j++) {
				tu += this.cheng(arr[j].concat(d));
			}
		}
		.bind(this));
		return tu;
	}
	,
	calcUnitsNotRepeat: function () {//不重复 //暂无用
		var pass = this.getRealPass(),
		tu = 0,
		tm = 0;
		var a = this.getRealPass(),
		pass = [];
		for (var i = 0;i < a.length;i++){
			if (pass.indexOf(a[i]) == -1){
				pass.push(a[i]);
			}
		}
		if (pass.length > 0) {
			var t = [],
			d = [];
			for (var k in this.schemes) {
				o = this.schemes[k];
				(o.dan ? d : t).push(o.v.length);
			}
			var len, arr;
			for (var i = 0;i < pass.length;i++) {
				len = pass[i] == '单关' ? 1 : Number(pass[i].substring(0, pass[i].indexOf('串')));
				arr = d.length > len ? this.comp(d, len) : this.comp(t, len - d.length);
				for (var j = 0;j < arr.length;j++) {
					tu += this.cheng(arr[j].concat(d));
				}
			}
		}
		return tu;
	}
	,
	calcUnitsRepeat: function () {//有重复
		//console.log(this.schemes);
		var pass = this.passWay,tu = 0,tm = 0;
		this.bets = [];
		if (pass.length > 0) {
			for (var i = 0;i < pass.length;i++) {
				var t = [],
				d = [],
				len = pass[i] == '单关' ? 1 : Number(pass[i].substring(0, pass[i].indexOf('串')));
				for (var k in this.schemes) {
					o = this.schemes[k];
					(o.dan ? d : t).push(o);
				}
				var bet = this.apartDraw(d, t, len);
				this.bets = this.bets.concat(bet);
				$(bet).each(function (j, v) {
					tu += this._calcUnitsRepeat(v, pass[i]);
				}
				.bind(this));
			}
		}
		// if(cp2y.buy.bt==0 || cp2y.buy.bt==4 || cp2y.buy.bt==5){
		this.chaipiao();
		// }
		return tu;
	}
	,
	calcUnitsRepeatHhtz:function(hasCutSinglePlay){
		var pass=this.passWay,tu=0;
		//把scheme拆分成子scheme,即每一种下面只包含一种玩法。
		var singleMatchs = this.getSingleMatchs();
		//以串关为主导，把scheme折成去重复，去单一玩法的票，计算出注数tu.
		//此处的串关，已经把多串多中全部拆分成了单一串关
		var realPass = this.getRealPass();
		this.bets=[];
		for(var i=0;i<realPass.length;i++){
			var multiArr = [];
			for(var j=0;j<singleMatchs.length;j++){
				var t=[],d=[],len=realPass[i]=='单关'?1:Number(realPass[i].substring(0,realPass[i].indexOf('串')));
				for(var k=0;k<singleMatchs[j].length;k++){
					o = singleMatchs[j][k];
					(o.dan?d:t).push(o);
				}
				//把所选的比赛组成票形式，即每一个bet的比赛包含其中一个玩法的多个投注项
				var bet=this.apartDraw(d,t,len);
				//把每种子串关下的scheme生成的串关组合，放到一起去，待待去重，去单一玩法。
				for(var m=0;m<bet.length;m++){
					multiArr.push(bet[m]);
				}
			}
			//去重，去单一玩法
			var betFinal = this.removeDuplicateBetAndOnePlayType(multiArr,hasCutSinglePlay);
			this.bets=this.bets.concat(betFinal);
			this.chaipiao();
			//计算每个票的注数
			$(betFinal).each(function(j,v){
				tu+=this._calcUnitsRepeat(v,realPass[i]);
			}
			.bind(this));
		}
		return tu;
	}
	,
	    getSingleMatchs:function(){
		var singleSchemes=[];
		var scheme={};// 某一场比赛的某一种玩法的scheme
		var totalOneMatchSchemes=[];//拆成单独玩法的scheme以比赛为元素放入此中。
		//循环所有的schemes ，把每一场比赛以玩法，拆分成一同的schemes，放入totalOneMatchSchemes中。
		for(k in this.schemes){
			var spf=new Array(),rqspf=new Array(),zjq=new Array(),bf=new Array(),bqc=new Array();
			var oneMatchSchemes=[];//存放同一场比赛的不同玩法的子scheme
			var choose = this.schemes[k].v;
			for(var i=0;i<choose.length;i++){
				if(Number(choose[i])<100){
					spf.push(Number(choose[i]));
				}
				else if(Number(choose[i])>=100 && Number(choose[i])<200){
					zjq.push(Number(choose[i]));
				}
				else if(Number(choose[i])>=200 && Number(choose[i])<300){
					bf.push(Number(choose[i]));
				}
				else if(Number(choose[i])>=300 && Number(choose[i])<400){
					bqc.push(Number(choose[i]));
				}
				else if(Number(choose[i])>=400 && Number(choose[i])<500){
					rqspf.push(Number(choose[i]));
				}
			}
			if(spf.length>0){
				scheme={
					no   : this.schemes[k].no,
					name : this.schemes[k].name,
					h    : this.schemes[k].h,
					g    : this.schemes[k].g,
					v    : spf,
					t    : this.schemes[k].t,
					r    : this.schemes[k].rq,
					b    : this.schemes[k].b,
					o    : this.schemes[k].o,
					dan  : this.schemes[k].dan
				
				};
				oneMatchSchemes.push(scheme);
			}
			if(rqspf.length>0){
				scheme={
					no   : this.schemes[k].no,
					name : this.schemes[k].name,
					h    : this.schemes[k].h,
					g    : this.schemes[k].g,
					v    : rqspf,
					t    : this.schemes[k].t,
					r    : this.schemes[k].rq,
					b    : this.schemes[k].b,
					o    : this.schemes[k].o,
					dan:this.schemes[k].dan
				
				};
				oneMatchSchemes.push(scheme);
			}
			if(zjq.length>0){
				scheme={
					no   : this.schemes[k].no,
					name : this.schemes[k].name,
					h    : this.schemes[k].h,
					g    : this.schemes[k].g,
					v    : zjq,
					t    : this.schemes[k].t,
					r    : this.schemes[k].rq,
					b    : this.schemes[k].b,
					o    : this.schemes[k].o,
					dan:this.schemes[k].dan
				
				};
				oneMatchSchemes.push(scheme);
			}
			if(bf.length>0){
				scheme={
					no   : this.schemes[k].no,
					name : this.schemes[k].name,
					h    : this.schemes[k].h,
					g    : this.schemes[k].g,
					v    : bf,
					t    : this.schemes[k].t,
					r    : this.schemes[k].rq,
					b    : this.schemes[k].b,
					o    : this.schemes[k].o,
					dan:this.schemes[k].dan
				
				};
				oneMatchSchemes.push(scheme);
			}
			if(bqc.length>0){
				scheme={
					no   : this.schemes[k].no,
					name : this.schemes[k].name,
					h    : this.schemes[k].h,
					g    : this.schemes[k].g,
					v    : bqc,
					t    : this.schemes[k].t,
					r    : this.schemes[k].rq,
					b    : this.schemes[k].b,
					o    : this.schemes[k].o,
					dan:this.schemes[k].dan
				
				};
				oneMatchSchemes.push(scheme);
			}
			totalOneMatchSchemes.push(oneMatchSchemes);
		}
		//把totalOneMatchSchemes,转化成多个原先单一玩法的schemes结构，此时每一个结构体中包含一所选场次的一种玩法。
		var tmp = new Array();
		this.convertMultiPlayTypeToOneType(0,totalOneMatchSchemes,singleSchemes,tmp);
		return singleSchemes;
	}
	,
	convertMultiPlayTypeToOneType : function(i,arrMulti,arrSingle,arrTmp){
		for(var j=0;j<arrMulti[i].length;j++){
			var  tt=new Array();
			for(var k=0;k<arrTmp.length;k++){
				tt.push(arrTmp[k]);
			}
			if(i+1<arrMulti.length){
				tt.push(arrMulti[i][j]);
				this.convertMultiPlayTypeToOneType(i+1,arrMulti,arrSingle,tt);
			}
			else {
				var bb=new Array();
				for(var m=0;m<arrTmp.length;m++){
					bb.push(tt[m]);
				}
				bb.push(arrMulti[i][j]);
				arrSingle.push(bb);
			}
		}
	}
	,
	removeDuplicateBetAndOnePlayType : function(bet,hasCutSinglePlay){
		var betFinal=[];
		var tmp=[];
		if(hasCutSinglePlay){//去重复和单一玩法操作
			for(var i=0;i<bet.length;i++){
				var sum = [];
				var Str ="";
				var isMultiPlayType = false;
				for(var j=0;j<bet[i].length;j++){
					var no = bet[i][j].no.substr(1);
					var v= bet[i][j].v;
					if(Number(v[0])<100){
						if(!this.contains(sum,"spf")){
							sum.push("spf");
						}
					}
					else if(Number(v[0])>=100 && Number(v[0])<200){
						if(!this.contains(sum,"zjq")){
							sum.push("zjq");
						}
					}
					else if(Number(v[0])>=200 && Number(v[0])<300){
						if(!this.contains(sum,"bf")){
							sum.push("bf");
						}
					}
					else if(Number(v[0])>=300 && Number(v[0])<400){
						if(!this.contains(sum,"bqc")){
							sum.push("bqc");
						}
					}
					else if(Number(v[0])>=400 && Number(v[0])<500){
						if(!this.contains(sum,"rqspf")){
							sum.push("rqspf");
						}
					}
					if(Str.length > 0){
						Str=Str +"$";
					}
					Str = Str+no;
					for(var k=0;k< v.length;k++){
						Str = Str +",";
						Str = Str + v[k];
					}
				}
				if(sum.length>1){
					isMultiPlayType = true;
				}
				                //非单一玩法的准备去重
				if(isMultiPlayType){
					if(!this.contains(tmp,Str)){
						tmp.push(Str);
						betFinal.push(bet[i]);
					}
				}
			}
		}
		else{//包括单一玩法，只做去重复操作
			for(var i=0;i<bet.length;i++){
				var Str ="";
				for(var j=0;j<bet[i].length;j++){
					var no = String(bet[i][j].no).substr(1);
					var v= bet[i][j].v;
					if(Str.length > 0){
						Str=Str +"$";
					}
					Str = Str+no;
					for(var k=0;k< v.length;k++){
						Str = Str +",";
						Str = Str + v[k];
					}
				}
				                //去重
				if(!this.contains(tmp,Str)){
					tmp.push(Str);
					betFinal.push(bet[i]);
				}
			}
		}
		        return betFinal;
	}
	,
	contains : function(arr,str){
		for(var i=0;i<arr.length;i++){
			if(arr[i]==str){
				return true;
			}
		}
		return false;
	}
	,
	bets: [],
	chaipiao: function () {
		if (this.passWay.length < 1) {
			return false;
		}
		var bet = this.bets,
		detail = [];
		$(bet).each(function (j, v) {
			var result = '',
			arr = [],
			x = 0,
			xlen = v.length,
			tmp2 = [];
			for (x;x < xlen;x++) {
				var y = 0;
				ylen = v[x].v.length, tmp = [];
				for (y;y < ylen;y++) {
					var o = $.extend(true, {}, v[x]);
					o.v = v[x].v[y];
					o.score = $('.a'+v[x].no+'_'+o.v).eq(0).attr('data_s');
					//o.score = $(v[x].o[y]).attr('data_s');
					o.o = '';
					tmp.push(o);
				}
				arr.push(tmp);
			}
			var newArr = [];
			function fun(tempArr,index){
				for(var i = 0;i < arr[index].length;i++){
					var t = tempArr.concat([arr[index][i]]);
					if(index == arr.length-1){
						newArr.push(t);
					}
					else{
						fun(t,index+1);
					}
				}
			}
			fun([],0);
			detail.push(newArr);
		});
		var xx = 0;
		xxlen = detail.length, piao = [];
		for (xx;xx < xxlen;xx++) {
			var yy = 0,
			yylen = detail[xx].length;
			for (yy;yy < yylen;yy++) {
				piao.push(detail[xx][yy]);
			}
		}
		//console.log("拆票结果:",piao);
		//计算最大赔率
		var maxPrizeScopeA = [],
		minPrizeScopeA = [];
		for (var sch in this.schemes) {//取出每场最高赔率的选项
			var tmp = [];
			$(this.schemes[sch].o).each(function (i, v) {
				tmp.push($(v).attr("data_s"));
			});
			maxPrizeScopeA.push([this.schemes[sch].no, tmp.max()]);
			minPrizeScopeA.push(tmp.min());
		}
		// console.log(maxPrizeScopeA);//输出每场比赛的最大赔率投注项
		// console.log(minPrizeScopeA);//输出每场比赛的最小赔率投注项
		var pI = 0;
		pLen = piao.length, finalAyy = [];
		for (pI;pI < pLen;pI++) {
			var pJ = 0,
			pJen = piao[pI].length,
			arr = [],
			xx = 0;
			for (pJ;pJ < pJen;pJ++) {
				if ( maxPrizeScopeA.inArray2([piao[pI][pJ].no, piao[pI][pJ].score]) ) {//属于最大玩法
					arr.push([piao[pI][pJ].no, piao[pI][pJ].score]);
					xx++;
				}
			}
			if (xx == pJen) {//如果全部属于最大玩法
				finalAyy.push(arr);
			}
		}
		//console.log(finalAyy);
		//console.log(piao);
		var fI = 0;
		fLen = finalAyy.length, sum = 0;
		for (fI;fI < fLen;fI++) {
			var fJ = 0,
			fJen = finalAyy[fI].length,
			tt = 2;
			for (fJ;fJ < fJen;fJ++) {
				tt *= finalAyy[fI][fJ][1];
			}
			sum += tt;
		}
		//console.log("最大奖金",sum);
		minPrizeScopeA.sort();
		//console.log(minPrizeScopeA)
		var minI = 0,minLen = piao[0].length,minPrize = 2;
		for (minI;minI < minLen;minI++) {
			minPrize *= minPrizeScopeA[minI];
		}
		//console.log("最小奖金",minPrize);
		$("#PrizeCalc").html((minPrize*this.mul).toFixed(2) + "-" + (sum*this.mul).toFixed(2) + "元");
	}
	,
	content: function (p, d) {
		var choose = [],objs = [];
		delete this.schemes[d.no];
		//删除该比赛
		p.find('.jcBet').each(function (i, v) {
			if ($(v).hasClass('jcSelect')) {
				choose.push($(v).attr('data'));
				objs.push($(v));
			}
		});
		if (choose.length > 0) {
			this.schemes[d.no] = {
				no: d.no,
				name: d.name,
				h: d.h,
				g: d.g,
				r: d.rq,
				v: choose,
				o: objs,
				dan: false,
				p: p
			
			};
		}//重写该场比赛
	
	}
	,
	each: function (a, cb) {/*对象循环*/
		for (var key in a) cb(a[key], key);
	}
	,
	cheng: function (a) {/*数组累乘*/
		var n = 1;
		for (var i = 0, l = a.length;i < l;i++)
		n *= a[i];
		return n;
	}
	,
	comp: function (arr, n) {/*组合*/
		var r = [],
		sum = 0;
		(function f(t, a, n) {
			if (n == 0)
			return r.push(t);
			for (var i = 0, l = a.length - n;i <= l;i++) {
				f(t.concat(a[i]), a.slice(i + 1), n - 1);
			}
		})([], arr, n);
		return r;
	}
	,
	selectMatchCount: function () {//选择的比赛场次
		var m = 0,
		k = 0;
		for (k in this.schemes) {
			m++;
		}
		return m;
	}
	,
	maxMatch: 4,
		//以上为竞彩私有
	init: function (play) {
		if (play in _) {
			$.extend(cp2y.buy, _[play]);
		}
		else {
			$.extend(cp2y.buy, _.a0);
		}
		this.step1();
		this.bet();
		jcDom.Title.html("<span>" + this.playName + "</span>-" + _[play].playType);
		jcDom.QRTi.html("<span>" + cp2y.buy.playName + "</span>-投注");
		jcDom.changePlayType.html(_.playTypes(play));
		this.doInit();
	}
	,
	betType: '',
	iid: 0,
	issue: 0,
	passWay: [],
	schemes: {},
	step1: function () {
		if (jcDom.Edit.html() == "完成") {
			return this.editScheme();
		}
		jcDom.headerS1.show();
		jcDom.headerS2.hide();
		jcDom.MainStep1.show();
		jcDom.MainStep2.hide();
	}
	,
	step2: function () {
		jcDom.headerS1.hide();
		jcDom.headerS2.show();
		jcDom.MainStep1.hide();
		jcDom.MainStep2.show();
	}
	,
	editScheme: function () {
		if (jcDom.Edit.html() == "编辑") {
			jcDom.Edit.html('完成');
			$(".delI").show();
			$(".dan").hide();
		}
		else if (jcDom.Edit.html() == "完成") {
			jcDom.Edit.html('编辑');
			$(".delI").hide();
			$(".dan").show();
		}
	}
	,
	isCutRepeat: false,
	mul: 1,
	money: 0,
	u: 0,
	del: function (o) {
		var data = eval("(" + $(o).prev().prev().prev().attr('data') + ")");
		delete this.schemes[data.no];
		$(o).parent().remove();
		$(".a" + data.no + "_3").removeClass('jcSelect');
		$(".a" + data.no + "_1").removeClass('jcSelect');
		$(".a" + data.no + "_0").removeClass('jcSelect');
		this.showPassWay();
		this.setPassWay();
		this.setUnits();
	}
	,
	toggleMore: function () {
		if (jcDom.More.hasClass('on')) {
			jcDom.More.removeClass('on');
			jcDom.MoreDetail.hide();
			jcDom.MoreLocked.hide();
		}
		else {
			jcDom.More.addClass('on');
			jcDom.MoreDetail.show();
			jcDom.MoreLocked.show();
		}
		window.scrollTo(0,0);
	}
	,
	buy:function(){//购买
		return cp2y.dialog.confirm("确认付款?",function(){
			cp2y.buy.saleType=1;
			cp2y.buy.submit();
		});
	},
	buy2:function(){//合买
		return cp2y.dialog.confirm("确认付款?",function(){
			cp2y.buy.saleType=0;
			cp2y.buy.submit(1);
		});
	},
	submit: function (isHemai) {
		var p = ['submitAction=submitAction', 'lid=10059', 'ajax=true'],
		content = [],
		scheme = this.schemes,
		i = 0;
		for (i in scheme) {
			content.push(i + "`" + scheme[i].name + "`" + scheme[i].h + "`" + scheme[i].g + "`" + i + "_0`" + scheme[i].dan + "`" + scheme[i].v.join(','));
		}
		p = {
			lotteryId: _.bt,
			issueId: this.issue,
			issueIds: this.sels.join(","),
			issueCount: 1,
			multiple: this.mul,
			schemeNumber: "content=" + content.join("$"),
			schemeAmount: this.money,
			buyAmount: this.money,
			buyType: this.saleType,
			betType: this.betType,
			pass: this.passWay.join(','),
			sels: this.sels.join(","),
			cutRepeat: false
		};
		if(isHemai==1){//合买
			p.buyAmount=this.RenGou;
			p.safeguardMoney=this.BaoDi;//保底
			p.minParticipant=this.ZuiDiRenGou;//最少参与
			p.remuneration=this.YongJin;//佣金
			p.open=this.openStatus;//合买方案公开情况
			p.schemeDesc=$('#schemeDesc').val()//方案描述
		}
		$.ajax({
			url: WebAppUrl.HOME_APP_URL + "/core/lottery/buy_lottery",
			data: p,
			type: "post",
			dataType: "json",
			beforeSend: function () {
				cp2y.dialog.loading();
			}
			,
			success: function (data) {
				cp2y.dialog.clearLoading();
				if (data.flag == -1) {
					return cp2y.quick.user.signInBox();
				}
				else if (data.flag == 2) {
					return cp2y.dialog.confirm("余额不足，去充值？", function () {
						cp2y.dialog.closeConfirm();
						//cp2y.quick.user.rechargeBox();
						location.href = WebAppUrl.HOME_APP_URL + '/recharge/index';
					});
				}
				else if (data.flag == 1) {
					location.href = WebAppUrl.HOME_APP_URL + '/lottery/detail#scheme=' + data.schemeId;
				}
				else {
					cp2y.dialog.alert(data.message);
				}
			}
		});
	},
	saleType:1,
	RenGou:0,
	ZuiDiRenGou:1,
	BaoDi:0,
	openStatus:1,
	hemai:function(){
		var money=jcDom.money.html(),mul=cp2y.buy.mul;
		if(money>100000000){
			return cp2y.dialog.alert('金额过大');
		}
		$("#hemaiTitle").html(cp2y.buy.playName);
		jcDom.MainStep2.hide();
		$("#hemai").show();		
		this.saleType=1;
		$('#HMmoney').html(money);
		$('#HMunits').html(money/mul/2);
		$('#HMmul').html(mul);
		var rg=Math.ceil((money*5)/100),db=Math.ceil(money/10);
		$('#HMrengou').attr({'placeholder':'最少认购5%('+rg+'元)'});
		$('#HMbaodi').attr({'placeholder':'若保底，最少保10%('+db+'元)'});
		this.RenGou=rg;
		this.ZuiDiRenGou=1;
		this.BaoDi=0;
		this.YongJin=0;
		$('#HMrengou').val('');
		$('#HMzuidirengou').val(1);
		$('#HMbaodi').val('');
		$('#HMyongjin').html('0%');
	},
	setRenGou:function(e){
		var m=$(e).val(),M=Number(jcDom.money.html()),rg;
		if(m<(M*5)/100){
			rg=Math.ceil((M*5)/100);
		}else if(m>=M){
			rg=M-1;
		}else if(isNaN(m)){
			rg=Math.ceil((M*5)/100);
		}else{
			rg=m;
		}
		this.RenGou=rg;
		$(e).val(rg);
		this.setHMPrice();
	},
	setZuiDiRenGou:function(e){
		var m=$(e).val(),M=Number(jcDom.money.html()),N=this.RenGou,rg;
		if(m<1){
			rg=1;
		}else if(m>M-N){
			rg=M-N;
		}else if(isNaN(m)){
			rg=1;
		}else{
			rg=m;
		}
		this.ZuiDiRenGou=rg;
		$(e).val(rg);
	},
	setBaoDi:function(e){
		var m=$(e).val(),M=Number(jcDom.money.html()),N=this.RenGou,db;
		if(m){
		if(N>=(M*9/10) || isNaN(m)){//认购大于等于90%;
			db=0;
		}else if(m<(M/10)){//认购小于10%
			db=Math.ceil(M/10);
		}else{
			db=m;
		}
		this.BaoDi=(db);
		$(e).val(db);
		this.setHMPrice();
		}
	},
	YongJin:0,
	setYongJin:function(e){
		var yj=$(e).val();
		$('#HMyongjin').html(yj+"%");
		this.YongJin=yj;
	},
	HMPrice:0,
	setHMPrice:function(){
		this.HMPrice=Number(this.RenGou)+Number(this.BaoDi);
		$('#HMPrice').html(this.HMPrice+"元");
	},
	closeHemai:function(){
		jcDom.MainStep2.show();
		$("#hemai").hide();
	},
	HMtype:function(e){
		$(e).addClass('cur').siblings().removeClass('cur');
		var o=[1,3,4];
		cp2y.buy.openStatus=o[$(e).index()];
	}
};