/**
 * @author luwenbin@live.com
 */
var _ = {
	bt : 10038,
	playName : "老时时彩",
	playTypes : function() {
		var html = [];
		html.push('<b data="a0" data2="一星">一星</b>');
		html.push('<b data="a1" data2="四星">四星</b>');
		html.push('<b data="a2" data2="五星">五星</b>');
		html.push('<b data="a3" data2="五星通选">五星通选</b>');
		html.push('<span></span>');
		html.push('<b data="a4" data2="二星组选">二星组选</b>');
		html.push('<b data="a5" data2="三星组3">三星组3</b>');
		html.push('<b data="a6" data2="三星组6">三星组6</b>');
		html.push('<span></span>');
		html.push('<b data="a7"  data2="任选1">任选1</b>');
		html.push('<b data="a8" data2="任选2">任选2</b>');
		html.push('<b data="a9"  data2="大小单双">大小单双</b>');
		html.push('<span></span>');
		html.push('<b data="a10" data2="二星直选">二星直选<em>奖</em></b>');
		html.push('<b data="a11" class="onn" data2="三星直选">三星直选<em>奖</em></b>');
		return html.join('');
	}
};
_.a0 = {
	playName : _.playName,
	playType : "一星",
	input : "oneStar",
	num : 1,
	bet : function() {
		var html0 = [], i = 0;
		html0.push('<p>至少选择1个号码</p>');
		for (i; i < 10; i++) {
			html0.push('<a class="gb" onclick="cp2y.buy.select(this)">' + i + '</a>');
		};
		return html0.join('');
	},
	select : function(_this) {
		$(_this).toggleClass("rb");
		cp2y.buy.count();
	},
	count : function() {
		var rb = [], i = 0, o = this.getBall(), len = o.length, units, s = 1;
		for (i; i < len; i++) {
			if (o.eq(i).hasClass("rb")) {
				rb.push(o.eq(i));
			}
		};
		if (rb.length > 0) {
			s = 3;
		};
		this.setClear(s);
		units = rb.length;
		dom.CurBets.html(units);
		dom.CurMoney.html(units * 2);
	},
	random : function(u) {
		var i = 0, o = [], ball = [], rb = [];
		for (i; i < 10; i++) {
			ball.push(i);
		};
		i = 0;
		for (i; i < u; i++) {
			rb = ball.random({
				len : this.num
			});
			o.push('<li data_input="' + this.input + '" data_bets="1" data_code="' + rb.join('') + '">');
			o.push('<div><a class="r">' + rb.join('</a><a class="r">') + '</a></div>');
			o.push('<p>' + this.playType + '：1注2元</p>');
			o.push('<i class="delI" onclick="cp2y.buy.del(this)"></i></li>');
		};
		this.addRecord(o.join(''));
	},
	addContent : function() {
		var rb = [], i = 0, o = this.getBall(), len = o.length;
		for (i; i < len; i++) {
			if (o.eq(i).hasClass("rb")) {
				rb.push(o.eq(i).html());
			}
		};
		var units = rb.length;
		if (units == 0) {
			return cp2y.buy.random(1);
		};
		var o = '<li data_input="' + this.input + '" data_bets="' + units + '" data_code="' + rb.join('') + '">' + '<div><a class="r">' + rb.join('</a><a class="r">') + '</a></div>' + '<p>' + this.playType + '：' + units + '注' + units * 2 + '元</p>' + '<i class="delI" onclick="cp2y.buy.del(this)"></i></li>';
		this.addRecord(o);
		this.clear();
		this.step2();
	}
};
_.a1 = {
	playName : _.playName,
	playType : "四星",
	input : "fourStarPoly",
	num : 4,
	bet : function() {
		var html0 = [], i = 0;
		html0.push('<p>千位</p>');
		for (i; i < 10; i++) {
			html0.push('<a class="gb" onclick="cp2y.buy.select(this,4)">' + i + '</a>');
		};
		i = 0;
		html0.push('<p>百位</p>');
		for (i; i < 10; i++) {
			html0.push('<a class="gb" onclick="cp2y.buy.select(this,3)">' + i + '</a>');
		};
		i = 0;
		html0.push('<p>十位</p>');
		for (i; i < 10; i++) {
			html0.push('<a class="gb" onclick="cp2y.buy.select(this,2)">' + i + '</a>');
		};
		i = 0;
		html0.push('<p>个位</p>');
		for (i; i < 10; i++) {
			html0.push('<a class="gb" onclick="cp2y.buy.select(this,1)">' + i + '</a>');
		};
		return html0.join('');
	},
	select : function(_this, x) {
		$(_this).toggleClass("rb" + x);
		cp2y.buy.count();
	},
	count : function() {
		var rb1 = [], rb2 = [], rb3 = [], rb4 = [], i = 0, o = this.getBall(), len = o.length, units, s = 1;
		for (i; i < len; i++) {
			if (o.eq(i).hasClass("rb1")) {
				rb1.push(o.eq(i));
			};
			if (o.eq(i).hasClass("rb2")) {
				rb2.push(o.eq(i));
			};
			if (o.eq(i).hasClass("rb3")) {
				rb3.push(o.eq(i));
			};
			if (o.eq(i).hasClass("rb4")) {
				rb4.push(o.eq(i));
			}
		};
		if (rb1.length > 0 || rb2.length > 0 || rb3.length > 0 || rb4.length > 0) {
			s = 3;
		};
		this.setClear(s);
		units = rb1.length * rb2.length * rb3.length * rb4.length;
		dom.CurBets.html(units);
		dom.CurMoney.html(units * 2);
	},
	random : function(u) {
		var i = 0, o = [], ball = [], rb = [];
		for (i; i < 10; i++) {
			ball.push(i);
		};
		i = 0;
		for (i; i < u; i++) {
			rb = ball.random({
				len : this.num
			});
			o.push('<li data_input="' + this.input + '" data_bets="1" data_code="' + rb.join('-') + '">');
			o.push('<div><a class="r">' + rb.join('</a><a class="r">') + '</a></div>');
			o.push('<p>' + this.playType + '：1注2元</p>');
			o.push('<i class="delI" onclick="cp2y.buy.del(this)"></i></li>');
		};
		this.addRecord(o.join(''));
	},
	addContent : function() {
		var rb1 = [], rb2 = [], rb3 = [], rb4 = [], i = 0, o = this.getBall(), len = o.length;
		for (i; i < len; i++) {
			if (o.eq(i).hasClass("rb1")) {
				rb1.push(o.eq(i).html());
			};
			if (o.eq(i).hasClass("rb2")) {
				rb2.push(o.eq(i).html());
			};
			if (o.eq(i).hasClass("rb3")) {
				rb3.push(o.eq(i).html());
			};
			if (o.eq(i).hasClass("rb4")) {
				rb4.push(o.eq(i).html());
			}
		};
		var units = rb1.length * rb2.length * rb3.length * rb4.length;
		if (units == 0) {
			if (rb1.length > 0 || rb2.length > 0 || rb3.length > 0 || rb4.length > 0) {
				return cp2y.dialog.alert('您选的方案不能构成一注');
			} else {
				return cp2y.buy.random(1);
			}
		};
		var o = '<li data_input="' + this.input + '" data_bets="' + units + '" data_code="' + rb4.join('') + '-' + rb3.join('') + '-' + rb2.join('') + '-' + rb1.join('') + '">' + '<div><a class="r">' + rb4.join('</a><a class="r">') + '</a> <a class="r">' + rb3.join('</a><a class="r">') + '</a> <a class="r">' + rb2.join('</a><a class="r">') + '</a> <a class="r">' + rb1.join('</a><a class="r">') + '</a></div>' + '<p>' + this.playType + '：' + units + '注' + units * 2 + '元</p>' + '<i class="delI" onclick="cp2y.buy.del(this)"></i></li>';
		this.addRecord(o);
		this.clear();
		this.step2();
	}
};
_.a2 = {
	playName : _.playName,
	playType : "五星",
	input : "fiveStarPoly",
	num : 5,
	bet : function() {
		var html0 = [], i = 0;
		html0.push('<p>万位</p>');
		for (i; i < 10; i++) {
			html0.push('<a class="gb" onclick="cp2y.buy.select(this,5)">' + i + '</a>');
		};
		i = 0;
		html0.push('<p>千位</p>');
		for (i; i < 10; i++) {
			html0.push('<a class="gb" onclick="cp2y.buy.select(this,4)">' + i + '</a>');
		};
		i = 0;
		html0.push('<p>百位</p>');
		for (i; i < 10; i++) {
			html0.push('<a class="gb" onclick="cp2y.buy.select(this,3)">' + i + '</a>');
		};
		i = 0;
		html0.push('<p>十位</p>');
		for (i; i < 10; i++) {
			html0.push('<a class="gb" onclick="cp2y.buy.select(this,2)">' + i + '</a>');
		};
		i = 0;
		html0.push('<p>个位</p>');
		for (i; i < 10; i++) {
			html0.push('<a class="gb" onclick="cp2y.buy.select(this,1)">' + i + '</a>');
		};
		return html0.join('');
	},
	select : function(_this, x) {
		$(_this).toggleClass("rb" + x);
		cp2y.buy.count();
	},
	count : function() {
		var rb1 = [], rb2 = [], rb3 = [], rb4 = [], rb5 = [], i = 0, o = this.getBall(), len = o.length, units, s = 1;
		for (i; i < len; i++) {
			if (o.eq(i).hasClass("rb1")) {
				rb1.push(o.eq(i));
			};
			if (o.eq(i).hasClass("rb2")) {
				rb2.push(o.eq(i));
			};
			if (o.eq(i).hasClass("rb3")) {
				rb3.push(o.eq(i));
			};
			if (o.eq(i).hasClass("rb4")) {
				rb4.push(o.eq(i));
			};
			if (o.eq(i).hasClass("rb5")) {
				rb5.push(o.eq(i));
			}
		};
		if (rb1.length > 0 || rb2.length > 0 || rb3.length > 0 || rb4.length > 0 || rb5.length > 0) {
			s = 3;
		};
		this.setClear(s);
		units = rb1.length * rb2.length * rb3.length * rb4.length * rb5.length;
		dom.CurBets.html(units);
		dom.CurMoney.html(units * 2);
	},
	random : function(u) {
		var i = 0, o = [], ball = [], rb = [];
		for (i; i < 10; i++) {
			ball.push(i);
		};
		i = 0;
		for (i; i < u; i++) {
			rb = ball.random({
				len : this.num
			});
			o.push('<li data_input="' + this.input + '" data_bets="1" data_code="' + rb.join('-') + '">');
			o.push('<div><a class="r">' + rb.join('</a><a class="r">') + '</a></div>');
			o.push('<p>' + this.playType + '：1注2元</p>');
			o.push('<i class="delI" onclick="cp2y.buy.del(this)"></i></li>');
		};
		this.addRecord(o.join(''));
	},
	addContent : function() {
		var rb1 = [], rb2 = [], rb3 = [], rb4 = [], rb5 = [], i = 0, o = this.getBall(), len = o.length;
		for (i; i < len; i++) {
			if (o.eq(i).hasClass("rb1")) {
				rb1.push(o.eq(i).html());
			};
			if (o.eq(i).hasClass("rb2")) {
				rb2.push(o.eq(i).html());
			};
			if (o.eq(i).hasClass("rb3")) {
				rb3.push(o.eq(i).html());
			};
			if (o.eq(i).hasClass("rb4")) {
				rb4.push(o.eq(i).html());
			};
			if (o.eq(i).hasClass("rb5")) {
				rb5.push(o.eq(i).html());
			}
		};
		var units = rb1.length * rb2.length * rb3.length * rb4.length * rb5.length;
		if (units == 0) {
			if (rb1.length > 0 || rb2.length > 0 || rb3.length > 0 || rb4.length > 0 || rb5.length > 0) {
				return cp2y.dialog.alert('您选的方案不能构成一注');
			} else {
				return cp2y.buy.random(1);
			}
		};
		var o = '<li data_input="' + this.input + '" data_bets="' + units + '" data_code="' + rb5.join('') + '-' + rb4.join('') + '-' + rb3.join('') + '-' + rb2.join('') + '-' + rb1.join('') + '">' + '<div><a class="r">' + rb5.join('</a><a class="r">') + '</a> <a class="r">' + rb4.join('</a><a class="r">') + '</a> <a class="r">' + rb3.join('</a><a class="r">') + '</a> <a class="r">' + rb2.join('</a><a class="r">') + '</a> <a class="r">' + rb1.join('</a><a class="r">') + '</a></div>' + '<p>' + this.playType + '：' + units + '注' + units * 2 + '元</p>' + '<i class="delI" onclick="cp2y.buy.del(this)"></i></li>';
		this.addRecord(o);
		this.clear();
		this.step2();
	}
};
_.a3 = {
	playName : _.playName,
	playType : "五星通选",
	input : "fiveStarAllPoly",
	num : 5,
	bet : _.a2.bet,
	select : _.a2.select,
	count : _.a2.count,
	random : _.a2.random,
	addContent : _.a2.addContent
};
_.a4 = {
	playName : _.playName,
	playType : "二星组选",
	input : "twoStarGroupPoly",
	num : 2,
	bet : _.a0.bet,
	select : _.a0.select,
	count : function() {
		var rb = [], i = 0, o = this.getBall(), len = o.length, units, s = 1;
		for (i; i < len; i++) {
			if (o.eq(i).hasClass("rb")) {
				rb.push(o.eq(i));
			}
		};
		if (rb.length > 0) {
			s = 3;
		};
		this.setClear(s);
		units = rb.length * (rb.length - 1) / 2;
		dom.CurBets.html(units);
		dom.CurMoney.html(units * 2);
	},
	random : _.a0.random,
	addContent : _.a0.addContent
};
_.a5 = {
	playName : _.playName,
	playType : "三星组3",
	input : "threeStarGroup3Poly",
	num : 2,
	bet : _.a0.bet,
	select : _.a0.select,
	count : function() {
		var rb = [], i = 0, o = this.getBall(), len = o.length, units, s = 1;
		for (i; i < len; i++) {
			if (o.eq(i).hasClass("rb")) {
				rb.push(o.eq(i));
			}
		};
		if (rb.length > 0) {
			s = 3;
		};
		this.setClear(s);
		units = rb.length * (rb.length - 1);
		dom.CurBets.html(units);
		dom.CurMoney.html(units * 2);
	},
	random : function(u) {
		var i = 0, o = [], ball = [], rb = [];
		for (i; i < 10; i++) {
			ball.push(i);
		};
		i = 0;
		for (i; i < u; i++) {
			rb = ball.random({
				len : this.num
			});
			o.push('<li data_input="' + this.input + '" data_bets="2" data_code="' + rb.join('') + '">');
			o.push('<div><a class="r">' + rb.join('</a><a class="r">') + '</a></div>');
			o.push('<p>' + this.playType + '：2注4元</p>');
			o.push('<i class="delI" onclick="cp2y.buy.del(this)"></i></li>');
		};
		this.addRecord(o.join(''));
	},
	addContent : function() {
		var rb = [], i = 0, o = this.getBall(), len = o.length;
		for (i; i < len; i++) {
			if (o.eq(i).hasClass("rb")) {
				rb.push(o.eq(i).html());
			}
		};
		var units = rb.length * (rb.length - 1);
		if (units == 0) {
			if (rb.length > 0) {
				return cp2y.dialog.alert('您选的方案不能构成一注');
			} else {
				return cp2y.buy.random(1);
			}
		};
		var o = '<li data_input="' + this.input + '" data_bets="' + units + '" data_code="' + rb.join('') + '">' + '<div><a class="r">' + rb.join('</a><a class="r">') + '</a></div>' + '<p>' + this.playType + '：' + units + '注' + units * 2 + '元</p>' + '<i class="delI" onclick="cp2y.buy.del(this)"></i></li>';
		this.addRecord(o);
		this.clear();
		this.step2();
	}
};
_.a6 = {
	playName : _.playName,
	playType : "三星组6",
	input : "threeStarGroup6Poly",
	num : 3,
	bet : _.a0.bet,
	select : _.a0.select,
	count : function() {
		var rb = [], i = 0, o = this.getBall(), len = o.length, units, s = 1;
		for (i; i < len; i++) {
			if (o.eq(i).hasClass("rb")) {
				rb.push(o.eq(i));
			}
		};
		if (rb.length > 0) {
			s = 3;
		};
		this.setClear(s);
		units = (rb.length * (rb.length - 1) * (rb.length - 2)) / 6;
		dom.CurBets.html(units);
		dom.CurMoney.html(units * 2);
	},
	random : _.a0.random,
	addContent : function() {
		var rb = [], i = 0, o = this.getBall(), len = o.length;
		for (i; i < len; i++) {
			if (o.eq(i).hasClass("rb")) {
				rb.push(o.eq(i).html());
			}
		};
		var units = (rb.length * (rb.length - 1) * (rb.length - 2)) / 6;
		if (units == 0) {
			if (rb.length > 0) {
				return cp2y.dialog.alert('您选的方案不能构成一注');
			} else {
				return cp2y.buy.random(1);
			}
		};
		var o = '<li data_input="' + this.input + '" data_bets="' + units + '" data_code="' + rb.join('') + '">' + '<div><a class="r">' + rb.join('</a><a class="r">') + '</a></div>' + '<p>' + this.playType + '：' + units + '注' + units * 2 + '元</p>' + '<i class="delI" onclick="cp2y.buy.del(this)"></i></li>';
		this.addRecord(o);
		this.clear();
		this.step2();
	}
};
_.a7 = {
	playName : _.playName,
	playType : "任选1",
	input : "renOne",
	num : 1,
	bet : _.a2.bet,
	select : _.a2.select,
	count : function() {
		var rb1 = [], rb2 = [], rb3 = [], rb4 = [], rb5 = [], i = 0, o = this.getBall(), len = o.length, units, s = 1;
		for (i; i < len; i++) {
			if (o.eq(i).hasClass("rb1")) {
				rb1.push(o.eq(i));
			};
			if (o.eq(i).hasClass("rb2")) {
				rb2.push(o.eq(i));
			};
			if (o.eq(i).hasClass("rb3")) {
				rb3.push(o.eq(i));
			};
			if (o.eq(i).hasClass("rb4")) {
				rb4.push(o.eq(i));
			};
			if (o.eq(i).hasClass("rb5")) {
				rb5.push(o.eq(i));
			}
		};
		if (rb1.length > 0 || rb2.length > 0 || rb3.length > 0 || rb4.length > 0 || rb5.length > 0) {
			s = 3;
		};
		this.setClear(s);
		units = rb1.length + rb2.length + rb3.length + rb4.length + rb5.length;
		dom.CurBets.html(units);
		dom.CurMoney.html(units * 2);
	},
	random : function(u) {
		var i = 0, o = [], ball = [], rb = [];
		for (i; i < 10; i++) {
			ball.push(i);
		};
		i = 0;
		for (i; i < u; i++) {
			rb = ball.random({
				len : this.num
			});
			rb.unshift('-');
			rb.unshift('-');
			rb.push('-');
			rb.push('-');
			o.push('<li data_input="' + this.input + '" data_bets="1" data_code="' + rb.join(',') + '">');
			o.push('<div><a class="r">' + rb.join('</a><a class="r">') + '</a></div>');
			o.push('<p>' + this.playType + '：1注2元</p>');
			o.push('<i class="delI" onclick="cp2y.buy.del(this)"></i></li>');
		};
		this.addRecord(o.join(''));
	},
	addContent : function() {
		var rb1 = [], rb2 = [], rb3 = [], rb4 = [], rb5 = [], i = 0, o = this.getBall(), len = o.length;
		for (i; i < len; i++) {
			if (o.eq(i).hasClass("rb1")) {
				rb1.push(o.eq(i).html());
			};
			if (o.eq(i).hasClass("rb2")) {
				rb2.push(o.eq(i).html());
			};
			if (o.eq(i).hasClass("rb3")) {
				rb3.push(o.eq(i).html());
			};
			if (o.eq(i).hasClass("rb4")) {
				rb4.push(o.eq(i).html());
			};
			if (o.eq(i).hasClass("rb5")) {
				rb5.push(o.eq(i).html());
			}
		};
		var units = rb1.length + rb2.length + rb3.length + rb4.length + rb5.length;
		if (units == 0) {
			return cp2y.buy.random(1);
		};
		if (rb1.length == 0) {
			rb1.push('-');
		};
		if (rb2.length == 0) {
			rb2.push('-');
		};
		if (rb3.length == 0) {
			rb3.push('-');
		};
		if (rb4.length == 0) {
			rb4.push('-');
		};
		if (rb5.length == 0) {
			rb5.push('-');
		};
		var o = '<li data_input="' + this.input + '" data_bets="' + units + '" data_code="' + rb5.join('') + ',' + rb4.join('') + ',' + rb3.join('') + ',' + rb2.join('') + ',' + rb1.join('') + '">' + '<div><a class="r">' + rb5.join('</a><a class="r">') + '</a> <a class="r">' + rb4.join('</a><a class="r">') + '</a> <a class="r">' + rb3.join('</a><a class="r">') + '</a> <a class="r">' + rb2.join('</a><a class="r">') + '</a> <a class="r">' + rb1.join('</a><a class="r">') + '</a></div>' + '<p>' + this.playType + '：' + units + '注' + units * 2 + '元</p>' + '<i class="delI" onclick="cp2y.buy.del(this)"></i></li>';
		this.addRecord(o);
		this.clear();
		this.step2();
	}
};
_.a8 = {
	playName : _.playName,
	playType : "任选2",
	input : "renTwo",
	num : 2,
	bet : _.a7.bet,
	select : _.a7.select,
	combi : function(arr, num) {
		var r = [];
		(function f(t, a, n) {
			if (n == 0)
				return r.push(t);
			for (var i = 0, l = a.length - n; i <= l; i++) {
				f(t.concat(a[i]), a.slice(i + 1), n - 1);
			}
		})([], arr, num);
		return r;
	},
	calcUnits : function(a) {
		var b = [];
		$(a).each(function(i, v) {
			if (v.length == 0 || (v.length == 1 && v[0] == '-')) {
				return;
			}
			b.push(v);
		});
		if (b.length < 2)
			return 0;
		var pos = [];
		$(b).each(function(i, v) {
			pos.push(i);
		});
		var units = 0;
		$(this.combi(pos, 2)).each(function(i, v) {
			units += b[v[0]].length * b[v[1]].length;
		});
		return units;
	},
	getArray : function() {
		var o = this.getBall(), w = [], q = [], b = [], s = [], g = [], i = 0, len = o.length;
		for (i; i < len; i++) {
			if (o.eq(i).hasClass("rb5")) {
				w.push(o.eq(i).html());
			};
			if (o.eq(i).hasClass("rb4")) {
				q.push(o.eq(i).html());
			};
			if (o.eq(i).hasClass("rb3")) {
				b.push(o.eq(i).html());
			};
			if (o.eq(i).hasClass("rb2")) {
				s.push(o.eq(i).html());
			};
			if (o.eq(i).hasClass("rb1")) {
				g.push(o.eq(i).html());
			}
		};
		return [w, q, b, s, g];
	},
	count : function() {
		var a = this.getArray(), units, s = 1;
		if (a[0].length > 0 || a[1].length > 0 || a[2].length > 0 || a[3].length > 0 || a[4].length > 0) {
			s = 3;
		};
		this.setClear(s);
		units = this.calcUnits(a);
		dom.CurBets.html(units);
		dom.CurMoney.html(units * 2);
	},
	random : function(u) {
		var i = 0, o = [], ball = [], rb = [];
		for (i; i < 10; i++) {
			ball.push(i);
		};
		i = 0;
		for (i; i < u; i++) {
			rb = ball.random({
				len : this.num
			});
			rb.unshift('-');
			rb.push('-');
			rb.push('-');
			o.push('<li data_input="' + this.input + '" data_bets="1" data_code="' + rb.join(',') + '">');
			o.push('<div><a class="r">' + rb.join('</a><a class="r">') + '</a></div>');
			o.push('<p>' + this.playType + '：1注2元</p>');
			o.push('<i class="delI" onclick="cp2y.buy.del(this)"></i></li>');
		};
		this.addRecord(o.join(''));
	},
	addContent : function() {
		var a = this.getArray(), units = this.calcUnits(a);
		if (units == 0) {
			if (a[0].length > 0 || a[1].length > 0 || a[2].length > 0 || a[3].length > 0 || a[4].length > 0) {
				return cp2y.dialog.alert('您选的方案不能构成一注');
			} else {
				return cp2y.buy.random(1);
			}
		};
		if (a[0].length == 0) {
			a[0].push('-');
		};
		if (a[1].length == 0) {
			a[1].push('-');
		};
		if (a[2].length == 0) {
			a[2].push('-');
		};
		if (a[3].length == 0) {
			a[3].push('-');
		};
		if (a[4].length == 0) {
			a[4].push('-');
		};
		var o = '<li data_input="' + this.input + '" data_bets="' + units + '" data_code="' + a[0].join('') + ',' + a[1].join('') + ',' + a[2].join('') + ',' + a[3].join('') + ',' + a[4].join('') + '">' + '<div><a class="r">' + a[0].join('</a><a class="r">') + '</a> <a class="r">' + a[1].join('</a><a class="r">') + '</a> <a class="r">' + a[2].join('</a><a class="r">') + '</a> <a class="r">' + a[3].join('</a><a class="r">') + '</a> <a class="r">' + a[4].join('</a><a class="r">') + '</a></div>' + '<p>' + this.playType + '：' + units + '注' + units * 2 + '元</p>' + '<i class="delI" onclick="cp2y.buy.del(this)"></i></li>';
		this.addRecord(o);
		this.clear();
		this.step2();
	}
};
_.a9 = {
	playName : _.playName,
	playType : "大小单双",
	input : "dxds",
	num : 2,
	bet : function() {
		var html0 = [], i = 0;
		html0.push('<p></p>');
		html0.push('<div><a class="gb" onclick="cp2y.buy.select(this,1)">大</a><a class="gb" onclick="cp2y.buy.select(this,1)">小</a><a class="gb" onclick="cp2y.buy.select(this,1)">单</a><a class="gb" onclick="cp2y.buy.select(this,1)">双</a></div>');
		html0.push('<p></p>');
		html0.push('<div><a class="gb" onclick="cp2y.buy.select(this,2)">大</a><a class="gb" onclick="cp2y.buy.select(this,2)">小</a><a class="gb" onclick="cp2y.buy.select(this,2)">单</a><a class="gb" onclick="cp2y.buy.select(this,2)">双</a></div>');
		return html0.join('');
	},
	select : function(o, x) {
		if ($(o).hasClass("rb" + x)) {
			$(o).removeClass("rb" + x);
		} else {
			$(o).parent().children("a").removeClass("rb" + x);
			$(o).addClass("rb" + x);
		};
		this.count();
	},
	count : function() {
		var rb1 = [], rb2 = [], i = 0, o = this.getBall(), len = o.length, units = 0, s = 1;
		for (i; i < len; i++) {
			if (o.eq(i).hasClass("rb1")) {
				rb1.push(o.eq(i));
			} else if (o.eq(i).hasClass("rb2")) {
				rb2.push(o.eq(i));
			}
		};
		if (rb1.length > 0 || rb2.length > 0) {
			s = 3;
		};
		this.setClear(s);
		if (rb1.length == 1 && rb2.length == 1) {
			units = 1;
		};
		dom.CurBets.html(units);
		dom.CurMoney.html(units * 2);
	},
	random : function(u) {
		var i = 0, o = [], ball = ['大', '小', '单', '双', '大', '小', '单', '双'], rb = [];
		for (i; i < u; i++) {
			rb = ball.random({
				len : this.num
			});
			o.push('<li data_input="' + this.input + '" data_bets="1" data_code="' + rb.join('') + '">');
			o.push('<div><a class="r">' + rb.join('</a><a class="r">') + '</a></div>');
			o.push('<p>' + this.playType + '：1注2元</p>');
			o.push('<i class="delI" onclick="cp2y.buy.del(this)"></i></li>');
		};
		this.addRecord(o.join(''));
	},
	addContent : function() {
		var rb1 = [], rb2 = [], i = 0, o = this.getBall(), len = o.length, units = 0;
		for (i; i < len; i++) {
			if (o.eq(i).hasClass("rb1")) {
				rb1.push(o.eq(i).html());
			} else if (o.eq(i).hasClass("rb2")) {
				rb2.push(o.eq(i).html());
			}
		};
		if (rb1.length == 1 && rb2.length == 1) {
			units = 1;
		};
		if (units == 0) {
			if (rb1.length > 0 || rb2.length > 0) {
				return cp2y.dialog.alert('您选的方案不能构成一注');
			} else {
				return cp2y.buy.random(1);
			}
		};
		var o = '<li data_input="' + this.input + '" data_bets="' + units + '" data_code="' + rb1.join('') + '' + rb2.join('') + '">' + '<div><a class="r">' + rb1.join('</a><a class="r">') + '</a><a class="r">' + rb2.join('</a><a class="r">') + '</a></div>' + '<p>' + this.playType + '：' + units + '注' + units * 2 + '元</p>' + '<i class="delI" onclick="cp2y.buy.del(this)"></i></li>';
		this.addRecord(o);
		this.clear();
		this.step2();
	}
};
_.a10 = {
	playName : _.playName,
	playType : "二星直选",
	input : "twoStarDirectPoly",
	num : 2,
	bet : function() {
		var html0 = [], i = 0;
		html0.push('<p>十位</p>');
		for (i; i < 10; i++) {
			html0.push('<a class="gb" onclick="cp2y.buy.select(this,2)">' + i + '</a>');
		};
		i = 0;
		html0.push('<p>个位</p>');
		for (i; i < 10; i++) {
			html0.push('<a class="gb" onclick="cp2y.buy.select(this,1)">' + i + '</a>');
		};
		return html0.join('');
	},
	select : _.a2.select,
	count : function() {
		var rb1 = [], rb2 = [], i = 0, o = this.getBall(), len = o.length, units, s = 1;
		for (i; i < len; i++) {
			if (o.eq(i).hasClass("rb1")) {
				rb1.push(o.eq(i));
			};
			if (o.eq(i).hasClass("rb2")) {
				rb2.push(o.eq(i));
			}
		};
		if (rb1.length > 0 || rb2.length > 0) {
			s = 3;
		};
		this.setClear(s);
		units = rb1.length * rb2.length;
		dom.CurBets.html(units);
		dom.CurMoney.html(units * 2);
	},
	random : _.a2.random,
	addContent : function() {
		var rb1 = [], rb2 = [], i = 0, o = this.getBall(), len = o.length;
		for (i; i < len; i++) {
			if (o.eq(i).hasClass("rb1")) {
				rb1.push(o.eq(i).html());
			};
			if (o.eq(i).hasClass("rb2")) {
				rb2.push(o.eq(i).html());
			}
		};
		var units = rb1.length * rb2.length;
		if (units == 0) {
			if (rb1.length > 0 || rb2.length > 0) {
				return cp2y.dialog.alert('您选的方案不能构成一注');
			} else {
				return cp2y.buy.random(1);
			}
		};
		var o = '<li data_input="' + this.input + '" data_bets="' + units + '" data_code="' + rb2.join('') + '-' + rb1.join('') + '">' + '<div><a class="r">' + rb2.join('</a><a class="r">') + '</a> <a class="r">' + rb1.join('</a><a class="r">') + '</a></div>' + '<p>' + this.playType + '：' + units + '注' + units * 2 + '元</p>' + '<i class="delI" onclick="cp2y.buy.del(this)"></i></li>';
		this.addRecord(o);
		this.clear();
		this.step2();
	}
};
_.a11 = {
	playName : _.playName,
	playType : "三星直选",
	input : "threeStarDirectPoly",
	num : 3,
	bet : function() {
		var html0 = [], i = 0;
		html0.push('<p>百位</p>');
		for (i; i < 10; i++) {
			html0.push('<a class="gb" onclick="cp2y.buy.select(this,3)">' + i + '</a>');
		};
		i = 0;
		html0.push('<p>十位</p>');
		for (i; i < 10; i++) {
			html0.push('<a class="gb" onclick="cp2y.buy.select(this,2)">' + i + '</a>');
		};
		i = 0;
		html0.push('<p>个位</p>');
		for (i; i < 10; i++) {
			html0.push('<a class="gb" onclick="cp2y.buy.select(this,1)">' + i + '</a>');
		};
		return html0.join('');;
	},
	select : _.a2.select,
	count : function() {
		var rb1 = [], rb2 = [], rb3 = [], i = 0, o = this.getBall(), len = o.length, units, s = 1;
		for (i; i < len; i++) {
			if (o.eq(i).hasClass("rb1")) {
				rb1.push(o.eq(i));
			};
			if (o.eq(i).hasClass("rb2")) {
				rb2.push(o.eq(i));
			};
			if (o.eq(i).hasClass("rb3")) {
				rb3.push(o.eq(i));
			}
		};
		if (rb1.length > 0 || rb2.length > 0 || rb3.length > 0) {
			s = 3;
		};
		this.setClear(s);
		units = rb1.length * rb2.length * rb3.length;
		dom.CurBets.html(units);
		dom.CurMoney.html(units * 2);
	},
	random : _.a2.random,
	addContent : function() {
		var rb1 = [], rb2 = [], rb3 = [], i = 0, o = this.getBall(), len = o.length;
		for (i; i < len; i++) {
			if (o.eq(i).hasClass("rb1")) {
				rb1.push(o.eq(i).html());
			};
			if (o.eq(i).hasClass("rb2")) {
				rb2.push(o.eq(i).html());
			};
			if (o.eq(i).hasClass("rb3")) {
				rb3.push(o.eq(i).html());
			}
		};
		var units = rb1.length * rb2.length * rb3.length;
		if (units == 0) {
			if (rb1.length > 0 || rb2.length > 0 || rb3.length > 0) {
				return cp2y.dialog.alert('您选的方案不能构成一注');
			} else {
				return cp2y.buy.random(1);
			}
		};
		var o = '<li data_input="' + this.input + '" data_bets="' + units + '" data_code="' + rb3.join('') + '-' + rb2.join('') + '-' + rb1.join('') + '">' + '<div><a class="r">' + rb3.join('</a><a class="r">') + '</a> <a class="r">' + rb2.join('</a><a class="r">') + '</a> <a class="r">' + rb1.join('</a><a class="r">') + '</a></div>' + '<p>' + this.playType + '：' + units + '注' + units * 2 + '元</p>' + '<i class="delI" onclick="cp2y.buy.del(this)"></i></li>';
		this.addRecord(o);
		this.clear();
		this.step2();
	}
}; 