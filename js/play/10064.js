/**
 * @author luwenbin@live.com
 */
var _={
	bt:10064,
	playName:"快乐十分",
	playTypes:function(){
		var html=[];
		html.push('<i>普通</i>');
		html.push('<b data="a10" data2="任选2">任选2</b>');
		html.push('<b data="a12" class="onn" data2="任选3">任选3</b>');
		html.push('<b data="a14" data2="任选4">任选4</b>');
		html.push('<b data="a16" data2="任选5">任选5</b>');
		html.push('<span></span>');
		html.push('<b data="a2" data2="连2组选">连2组选</b>');
		html.push('<b data="a6" data2="前3组选">前3组选</b>');
		html.push('<span></span>');
		html.push('<b data="a4" data2="连2直选定位">连2直选</b>');
		html.push('<b data="a8" data2="前3直选定位">前3直选</b>');
		html.push('<span></span>');
		html.push('<b data="a0" data2="前1数投">前1数投</b>');
		html.push('<b data="a1" data2="前1红投">前1红投</b>');
		html.push('<i>胆拖</i>');
		html.push('<b data="a11" data2="任选2胆拖">任选2</b>');
		html.push('<b data="a13" data2="任选3胆拖">任选3</b>');
		html.push('<b data="a15" data2="任选4胆拖">任选4</b>');
		html.push('<b data="a17" data2="任选5胆拖">任选5</b>');
		html.push('<span></span>');
		html.push('<b data="a3" data2="连2组选胆拖">连2组选</b>');
		html.push('<b data="a7" data2="前3组选胆拖">前3组选</b>');
		html.push('<span></span>');
		html.push('<b data="a5" data2="连2直选胆拖">连2直选</b>');
		html.push('<b data="a9" data2="前3直选胆拖">前3直选</b>');
		return html.join('');
	}
};
_.a0={
	playName:_.playName,
	playType:"前一数投",
	input:"onePoly",
	num:1,
	bet:function(){
		var html0=[],i=1;
		html0.push('<p>至少选择1个号码</p>');
		for(i;i<19;i++){
			html0.push('<a class="gb" onclick="cp2y.buy.select(this)">'+i.addZero()+'</a>');
		}
		return html0.join('');
	},
	select:function(_this){
		$(_this).toggleClass("rb");
		cp2y.buy.count();
	},
	count:function(){
		var rb=[],i=0,o=this.getBall(),len=o.length,s=1;
		for(i;i<len;i++){
			if(o.eq(i).hasClass("rb")){
				rb.push(o.eq(i));
			}
		}
		if(rb.length>0){s=3;}
		this.setClear(s);
		var units = rb.length;
		dom.CurBets.html(units);
		dom.CurMoney.html(units*2);
	},
	random:function(u){
		var i=1,o=[],ball=[],rb=[];
		for(i;i<19;i++){
			ball.push(i.addZero());
		};i=0;
		for(i;i<u;i++){
			rb=ball.random({len:this.num});
			o.push('<li data_input="'+this.input+'" data_bets="1" data_code="'+rb.join(',')+'">');
			o.push('<div><a>'+rb.join('</a><a>')+'</a></div>');
			o.push('<p>'+this.playType+'：1注2元</p>');
			o.push('<i class="delI" onclick="cp2y.buy.del(this)"></i></li>');
		}
		this.addRecord(o.join(''));
	},
	addContent:function(){
		var rb=[],i=0,o=this.getBall(),len=o.length;
		for(i;i<len;i++){
			if(o.eq(i).hasClass("rb")){
				rb.push(o.eq(i).html());
			}
		}
		var units = rb.length;
		if(units==0){
			cp2y.buy.random(1);
			return false;
		}
		var o='<li data_input="'+this.input+'" data_bets="'+units+'" data_code="'+rb.join(',')+'">'+
			'<div><a>'+rb.join('</a><a>')+'</a></div>'+
			'<p>'+this.playType+'：'+units+'注'+units*2+'元</p>'+
			'<i class="delI" onclick="cp2y.buy.del(this)"></i></li>';
		this.addRecord(o);
		this.clear();
	}
};
_.a1={
	playName:_.playName,
	playType:"前一红投",
	input:"oneRedSingle",
	num:1,
	bet:function(){
		var html0=[],i=19;
		html0.push('<p>首位号码为19或20即中奖金5元</p>');
		for(i;i<21;i++){
			html0.push('<a class="gb" onclick="cp2y.buy.select(this)">'+i+'</a>');
		}
		return html0.join('');
	},
	select:_.a0.select,
	count:_.a0.count,
	random:function(u){
		var i=0,o=[],ball=[19,20],rb=[];
		for(i;i<u;i++){
			rb=ball.random({len:this.num});
			o.push('<li data_input="'+this.input+'" data_bets="1" data_code="'+rb.join(',')+'">');
			o.push('<div><a>'+rb.join('</a><a>')+'</a></div>');
			o.push('<p>'+this.playType+'：1注2元</p>');
			o.push('<i class="delI" onclick="cp2y.buy.del(this)"></i></li>');
		}
		this.addRecord(o.join(''));
	},
	addContent:_.a0.addContent
};
_.a2={
	playName:_.playName,
	playType:"连二组选",
	input:"twoGroupPoly",
	num:2,
	bet:function(){
		var html0=[],i=1;
		html0.push('<p>至少选择'+cp2y.buy.num+'个球</p>');
		for(i;i<21;i++){
			html0.push('<a class="gb" onclick="cp2y.buy.select(this)">'+i.addZero()+'</a>');
		}
		return html0.join('');
	},
	select:_.a0.select,
	count:function(){
		var rb=[],i=0,o=this.getBall(),len=o.length,s=1,units;
		for(i;i<len;i++){
			if(o.eq(i).hasClass("rb")){
				rb.push(o.eq(i));
			}
		}
		if(rb.length>0){s=3;}
		this.setClear(s);
		units = cp2y.util.comp(rb.length,this.num);
		dom.CurBets.html(units);
		dom.CurMoney.html(units*2);
	},
	random:function(u){
		var i=1,o=[],ball=[],rb=[];
		for(i;i<21;i++){
			ball.push(i.addZero());
		};i=0;
		for(i;i<u;i++){
			rb=ball.random({len:this.num});
			o.push('<li data_input="'+this.input+'" data_bets="1" data_code="'+rb.join(',')+'">');
			o.push('<div><a>'+rb.join('</a><a>')+'</a></div>');
			o.push('<p>'+this.playType+'：1注2元</p>');
			o.push('<i class="delI" onclick="cp2y.buy.del(this)"></i></li>');
		}
		this.addRecord(o.join(''));
	},
	addContent:function(){
		var rb=[],i=0,o=this.getBall(),len=o.length;
		for(i;i<len;i++){
			if(o.eq(i).hasClass("rb")){
				rb.push(o.eq(i).html());
			}
		}
		var units=cp2y.util.comp(rb.length,this.num);
		if(units==0){
			if(rb.length>0){
				return cp2y.dialog.alert('您选的方案不能构成一注');
			}else{
				return cp2y.buy.random(1);
			}
		}
		var o='<li data_input="'+this.input+'" data_bets="'+units+'" data_code="'+rb.join(',')+'">'+
			'<div><a>'+rb.join('</a><a>')+'</a></div>'+
			'<p>'+this.playType+'：'+units+'注'+units*2+'元</p>'+
			'<i class="delI" onclick="cp2y.buy.del(this)"></i></li>';
		this.addRecord(o);
		this.clear();
	}
};
_.a6={
	playName:_.playName,
	playType:"前三组选",
	input:"threeGroupPoly",
	num:3,
	bet:_.a2.bet,
	select:_.a2.select,
	count:_.a2.count,
	random:_.a2.random,
	addContent:_.a2.addContent
};
_.a4={
	playName:_.playName,
	playType:"连二直选定位",
	input:"twoDirect",
	num:2,
	bet:function(){
		var html0=[],i=1,ilen=21;
		html0.push('<p>前一位(每位至少选1个)</p>');
		for(i;i<ilen;i++){
			html0.push('<a class="gb" onclick="cp2y.buy.select(this,1)">'+i.addZero()+'</a>');
		}
		i=1;
		html0.push('<p>后一位</p>');
		for(i;i<ilen;i++){
			html0.push('<a class="gb2" onclick="cp2y.buy.select(this,2)">'+i.addZero()+'</a>');
		}
		return html0.join('');
	},
	select:function(_this,b){
		var cls=b==1?"":"bb";
		if(b==1){
			$(_this).toggleClass("rb");
		}else if(b==2){
			$(_this).toggleClass("bb");
		}
		this.count();
	},
	count:function(){
		var a1=[],a2=[],i=0,o=this.getBall(),len=o.length,units=0,s=1;
		for(i;i<len;i++){
			if(o.eq(i).hasClass("rb")){
				a1.push(o.eq(i).html());
			}else if(o.eq(i).hasClass("bb")){
				a2.push(o.eq(i).html());
			}
		}
		if(a1.length==0 || a2.length==0){
			units= 0;
		}else{
			i=0;
			for(i;i<a1.length;i++){
				var b=0,b2=a2.length;
				for(b;b<b2;b++){
					if(a1[i]!=a2[b]){units++;}
				}
			}
		}
		if(a1.length>0||a2.length>0){s=3;}
		this.setClear(s);
		dom.CurBets.html(units);
		dom.CurMoney.html(units*2);
	},
	random:function(u){
		var i=1,o=[],ball=[],rb=[];
		for(i;i<21;i++){
			ball.push(i.addZero());
		};i=0;
		for(i;i<u;i++){
			rb=ball.random({len:this.num});
			o.push('<li data_input="'+this.input+'" data_bets="1" data_code="'+rb.join("-")+'">');
			o.push('<div><a>'+rb.join('</a>-<a>')+'</a></div>');
			o.push('<p>'+this.playType+'：1注2元</p>');
			o.push('<i class="delI" onclick="cp2y.buy.del(this)"></i></li>');
		}
		this.addRecord(o.join(''));
	},
	addContent:function(){
		var a1=[],a2=[],i=0,o=this.getBall(),len=o.length,units=0;
		for(i;i<len;i++){
			if(o.eq(i).hasClass("rb")){
				a1.push(o.eq(i).html());
			}else if(o.eq(i).hasClass("bb")){
				a2.push(o.eq(i).html());
			}
		}
		if(a1.length==0 || a2.length==0){
			return this.random(1);
		}else{
			i=0;
			for(i;i<a1.length;i++){
				var b=0,b2=a2.length;
				for(b;b<b2;b++){
					if(a1[i]!=a2[b]){units++;}
				}
			}
		}
		var o='<li data_input="'+this.input+'" data_bets="'+units+'" data_code="'+a1.join(' ')+'-'+a2.join(' ')+'">'+
			'<div><a class="r">'+a1.join('</a><a class="r">')+'</a><a class="b">'+a2.join('</a><a class="b">')+'</a></div>'+
			'<p>'+this.playType+'：'+units+'注'+units*2+'元</p>'+
			'<i class="delI" onclick="cp2y.buy.del(this)"></i></li>';
		this.addRecord(o);
		this.clear();
	}
};
_.a8={
	playName:_.playName,
	playType:"前三直选定位",
	input:"threeDirect",
	num:3,
	bet:function(){
		var html0=[],i=1,ilen=21;
		html0.push('<p>第一位(每位至少选1个)</p>');
		for(i;i<ilen;i++){
			html0.push('<a class="gb" onclick="cp2y.buy.select(this,1)">'+i.addZero()+'</a>');
		}
		i=1;
		html0.push('<p>第二位</p>');
		for(i;i<ilen;i++){
			html0.push('<a class="gb2" onclick="cp2y.buy.select(this,2)">'+i.addZero()+'</a>');
		}
		i=1;
		html0.push('<p>第三位</p>');
		for(i;i<ilen;i++){
			html0.push('<a class="gb3" onclick="cp2y.buy.select(this,3)">'+i.addZero()+'</a>');
		}
		return html0.join('');
	},
	select:function(_this,b){
		var cls=b==1?"":"bb";
		if(b==1){
			$(_this).toggleClass("rb");
		}else if(b==2){
			$(_this).toggleClass("bb");
		}else if(b==3){
			$(_this).toggleClass("yb");
		}
		this.count();
	},
	count:function(){
		var a1=[],a2=[],a3=[],i=0,o=this.getBall(),len=o.length,units=0,s=1;
		for(i;i<len;i++){
			if(o.eq(i).hasClass("rb")){
				a1.push(o.eq(i).html());
			}else if(o.eq(i).hasClass("bb")){
				a2.push(o.eq(i).html());
			}else if(o.eq(i).hasClass("yb")){
				a3.push(o.eq(i).html());
			}
		}
		if(a1.length==0 || a2.length==0|| a3.length==0){
			units= 0;
		}else{
			var a=0,al=a1.length;
			for(a;a<al;a++){
				var b=0,bl=a2.length;
				for(b;b<bl;b++){
					var c=0,cl=a3.length;
					for(c;c<cl;c++){
						if(a1[a]!=a2[b] && a2[b]!=a3[c] && a3[c]!=a1[a]){units++;}
					}
				}
			}
		}
		if(a1.length>0||a2.length>0||a3.length>0){s=3;}
		this.setClear(s);
		dom.CurBets.html(units);
		dom.CurMoney.html(units*2);
	},
	random:_.a4.random,
	addContent:function(){
		var a1=[],a2=[],a3=[],i=0,o=this.getBall(),len=o.length,units=0;
		for(i;i<len;i++){
			if(o.eq(i).hasClass("rb")){
				a1.push(o.eq(i).html());
			}else if(o.eq(i).hasClass("bb")){
				a2.push(o.eq(i).html());
			}else if(o.eq(i).hasClass("yb")){
				a3.push(o.eq(i).html());
			}
		}
		if(a1.length==0 || a2.length==0 || a3.length==0){
			if(a1.length>0 || a2.length>0 || a3.length>0){
				return cp2y.dialog.alert("您选的方案不能构成一注");
			}else{
				return this.random(1);
			}
		}else{
			var a=0,al=a1.length;
			for(a;a<al;a++){
				var b=0,bl=a2.length;
				for(b;b<bl;b++){
					var c=0,cl=a3.length;
					for(c;c<cl;c++){
						if(a1[a]!=a2[b] && a2[b]!=a3[c] && a3[c]!=a1[a]){units++;}
					}
				}
			}
		}
		var o='<li data_input="'+this.input+'" data_bets="'+units+'" data_code="'+a1.join(' ')+'-'+a2.join(' ')+'-'+a3.join(' ')+'">'+
			'<div><a>'+a1.join('</a><a>')+'</a>-<a>'+a2.join('</a><a>')+'</a>-<a>'+a3.join('</a><a>')+'</a></div>'+
			'<p>'+this.playType+'：'+units+'注'+units*2+'元</p>'+
			'<i class="delI" onclick="cp2y.buy.del(this)"></i></li>';
		this.addRecord(o);
		this.clear();
	}
};

_.a10={
	playName:_.playName,
	playType:"任选2",
	input:"twoPoly",
	num:2,
	bet:function(){
		var html0=[],i=1,ilen=21;
		html0.push('<p>至少选择'+cp2y.buy.num+'个号码</p>');
		for(i;i<ilen;i++){
			html0.push('<a class="gb" onclick="cp2y.buy.select(this)">'+i.addZero()+'</a>');
		}
		return html0.join('');
	},
	select:_.a2.select,
	count:function(){
		var rb=[],i=0,o=this.getBall(),len=o.length,s=1,units;
		for(i;i<len;i++){
			if(o.eq(i).hasClass("rb")){
				rb.push(o.eq(i));
			}
		}
		if(rb.length>0){s=3;}
		this.setClear(s);
		units = cp2y.util.comp(rb.length,this.num);
		dom.CurBets.html(units);
		dom.CurMoney.html(units*2);
	},
	random:function(u){
		var i=1,o=[],ball=[],rb=[];
		for(i;i<21;i++){
			ball.push(i.addZero());
		};i=0;
		for(i;i<u;i++){
			rb=ball.random({len:this.num});
			o.push('<li data_input="'+this.input+'" data_bets="1" data_code="'+rb.join(',')+'">');
			o.push('<div><a>'+rb.join('</a><a>')+'</a></div>');
			o.push('<p>'+this.playType+'：1注2元</p>');
			o.push('<i class="delI" onclick="cp2y.buy.del(this)"></i></li>');
		}
		this.addRecord(o.join(''));
	},
	addContent:function(){
		var rb=[],i=0,o=this.getBall(),len=o.length,units;
		for(i;i<len;i++){
			if(o.eq(i).hasClass("rb")){
				rb.push(o.eq(i).html());
			}
		}
		units = cp2y.util.comp(rb.length,this.num);
		if(units==0){
			if(rb.length>0){
				return cp2y.dialog.alert('您选的方案不能构成一注');
			}else{
				return cp2y.buy.random(1);
			}
		}
		var o='<li data_input="'+this.input+'" data_bets="'+units+'" data_code="'+rb.join(',')+'">'+
			'<div><a class="r">'+rb.join('</a><a class="r">')+'</a></div>'+
			'<p>'+this.playType+'：'+units+'注'+units*2+'元</p>'+
			'<i class="delI" onclick="cp2y.buy.del(this)"></i></li>';
		this.addRecord(o);
		this.clear();
	}
};
_.a12={
	playName:_.playName,
	playType:"任选3",
	input:"threePoly",
	num:3,
	bet:_.a10.bet,
	select:_.a10.select,
	count:_.a10.count,
	random:_.a10.random,
	addContent:_.a10.addContent
};
_.a14={
	playName:_.playName,
	playType:"任选4",
	input:"fourPoly",
	num:4,
	bet:_.a10.bet,
	select:_.a10.select,
	count:_.a10.count,
	random:_.a10.random,
	addContent:_.a10.addContent
};
_.a16={
	playName:_.playName,
	playType:"任选5",
	input:"fivePoly",
	num:5,
	bet:_.a10.bet,
	select:_.a10.select,
	count:_.a10.count,
	random:_.a10.random,
	addContent:_.a10.addContent
};

_.a3={
	playName:_.playName,
	playType:"连二组选胆拖",
	input:"twoGroupDraw",
	num:2,
	mul:1,
	bet:function(){
		var html0=[],i=1,ilen=21;
		html0.push('<p>胆码(选'+(cp2y.buy.num-1)+'个)</p>');
		for(i;i<ilen;i++){
			html0.push('<a class="gb" onclick="cp2y.buy.select(this,1)">'+i.addZero()+'</a>');
		}
		i=1;
		html0.push('<p>拖码(胆+拖≥'+(cp2y.buy.num+1)+'个)</p>');
		for(i;i<ilen;i++){
			html0.push('<a class="gb2" onclick="cp2y.buy.select(this,2)">'+i.addZero()+'</a>');
		}
		return html0.join('');
	},
	select:function(_this,b){
		var cls=b==1?"":"bb";
		if(b==1){
			if(!$(_this).hasClass("rb")){
				if($(".rb").size()>(cp2y.buy.num-2)){
					return cp2y.dialog.alert("最多"+(cp2y.buy.num-1)+"个胆码");
				}else{
					$(_this).addClass("rb");
					dom.c.children("a").eq($(_this).index()+19).removeClass("bb");
				}
			}else{
				$(_this).removeClass("rb");
			}
		}else if(b==2){
			$(_this).toggleClass("bb");
			dom.c.children("a").eq($(_this).index()-22).removeClass("rb");
		}
		cp2y.buy.count();
	},
	count:function(){
		var d=[],t=[],i=0,o=this.getBall(),len=o.length,s=1,units;
		for(i;i<len;i++){
			if(o.eq(i).hasClass("rb")){
				d.push(o.eq(i));
			}else if(o.eq(i).hasClass("bb")){
				t.push(o.eq(i));
			}
		}
		if(d.length>0||t.length>0){s=3;}
		this.setClear(s);
		if(d.length==0){
			units=0;
		}else{
			units = cp2y.util.comp(t.length,this.num-d.length)*this.mul;
		}
		dom.CurBets.html(units);
		dom.CurMoney.html(units*2);
	},
	random:function(u){
		var i=1,d,t=[],o=[],ball=[];
		for(i;i<19;i++){
			ball.push(i.addZero());
		};i=0;
		for(i;i<u;i++){
			t=ball.random({len:this.num});
			d=t.pop();
			o.push('<li data_input="'+this.input+'" data_bets="1" data_code="'+d+'#'+t.join(',')+'">');
			o.push('<div>(<a>'+d+'</a>)<a>'+t.join('</a><a>')+'</a></div>');
			o.push('<p>'+this.playType+'：1注2元</p>');
			o.push('<i class="delI" onclick="cp2y.buy.del(this)"></i></li>');
		}
		this.addRecord(o.join(''));
	},
	addContent:function(mul){
		var d=[],t=[],i=0,o=this.getBall(),len=o.length,units;
		for(i;i<len;i++){
			if(o.eq(i).hasClass("rb")){
				d.push(o.eq(i).html());
			}else if(o.eq(i).hasClass("bb")){
				t.push(o.eq(i).html());
			}
		}
		if(d.length==0){
			units=0;
		}else{
			units = cp2y.util.comp(t.length,this.num-d.length)*this.mul;
		}
		if(units==0){
			if(t.length>0 || d.length>0){
				return cp2y.dialog.alert('您选的方案不能构成一注');
			}else{
				return cp2y.buy.random(1);
			}
		}
		var o='<li data_input="'+this.input+'" data_bets="'+units+'" data_code="'+d.join(',')+'#'+t.join(',')+'">'+
			'<div>(<a>'+d.join('</a><a>')+'</a>)<a>'+t.join('</a><a>')+'</a></div>'+
			'<p>'+this.playType+'：'+units+'注'+units*2+'元</p>'+
			'<i class="delI" onclick="cp2y.buy.del(this)"></i></li>';
		this.addRecord(o);
		this.clear();
	}
};
_.a5={
	playName:_.playName,
	playType:"连二直选胆拖",
	input:"twoGroupDraw",
	num:2,
	mul:2,
	bet:_.a3.bet,
	select:_.a3.select,
	count:_.a3.count,
	random:function(u){
		var i=1,d,t=[],o=[],ball=[];
		for(i;i<19;i++){
			ball.push(i.addZero());
		};i=0;
		for(i;i<u;i++){
			t=ball.random({len:this.num});
			d=t.pop();
			o.push('<li data_input="'+this.input+'" data_bets="'+this.mul+'" data_code="'+d+'#'+t.join(',')+'">');
			o.push('<div>(<a>'+d+'</a>)<a>'+t.join('</a><a>')+'</a></div>');
			o.push('<p>'+this.playType+'：'+this.mul+'注'+(this.mul*2)+'元</p>');
			o.push('<i class="delI" onclick="cp2y.buy.del(this)"></i></li>');
		}
		this.addRecord(o.join(''));
	},
	addContent:_.a3.addContent
};
_.a7={
	playName:_.playName,
	playType:"连三组选胆拖",
	input:"threeGroupDraw",
	num:3,
	mul:1,
	bet:_.a3.bet,
	select:_.a3.select,
	count:_.a3.count,
	random:_.a3.random,
	addContent:_.a3.addContent
};
_.a9={
	playName:_.playName,
	playType:"前三直选胆拖",
	input:"threeDirectDraw",
	num:3,
	mul:6,
	bet:_.a3.bet,
	select:_.a3.select,
	count:_.a3.count,
	random:_.a5.random,
	addContent:_.a3.addContent
};
_.a11={
	playName:_.playName,
	playType:"任选二胆拖",
	input:"twoDraw",
	num:2,
	mul:1,
	bet:function(){
		var html0=[],i=1;
		html0.push('<p>选择胆码</p>');
		for(i;i<21;i++){
			html0.push('<a class="gb" onclick="cp2y.buy.select(this,1)">'+i.addZero()+'</a>');
		}
		i=1;
		html0.push('<p>选择拖码</p>');
		for(i;i<21;i++){
			html0.push('<a class="gb2" onclick="cp2y.buy.select(this,2)">'+i.addZero()+'</a>');
		}
		return html0.join('');
	},
	select:function(_this,b){
		var cls=b==1?"":"bb";
		if(b==1){
			if(!$(_this).hasClass("rb")){
				if($(".rb").size()>(this.num-2)){
					return cp2y.dialog.alert("最多"+(this.num-1)+"个胆码");
				}else{
					$(_this).addClass("rb");
					dom.c.children("a").eq($(_this).index()+19).removeClass("bb");
				}
			}else{
				$(_this).removeClass("rb");
			}
		}else if(b==2){
			$(_this).toggleClass("bb");
			dom.c.children("a").eq($(_this).index()-22).removeClass("rb");
		}
		cp2y.buy.count();
	},
	count:function(){
		var d=[],t=[],i=0,o=this.getBall(),len=o.length,s=1;
		for(i;i<len;i++){
			if(o.eq(i).hasClass("rb")){
				d.push(o.eq(i));
			}else if(o.eq(i).hasClass("bb")){
				t.push(o.eq(i));
			}
		}
		if(d.length>0||t.length>0){s=3;}
		this.setClear(s);
		var units;
		if(d.length==0){
			units=0;
		}else{
			units = cp2y.util.comp(t.length,this.num-d.length)*this.mul;
		}
		dom.CurBets.html(units);
		dom.CurMoney.html(units*2);
	},
	random:function(u){
		var i=1,d,t=[],o=[],ball=[];
		for(i;i<21;i++){
			ball.push(i.addZero());
		};i=0;
		for(i;i<u;i++){
			t=ball.random({len:this.num});
			d=t.pop();
			o.push('<li data_input="'+this.input+'" data_bets="1" data_code="'+d+'#'+t.join(',')+'">');
			o.push('<div>(<a>'+d+'</a>)<a>'+t.join('</a><a>')+'</a></div>');
			o.push('<p>'+this.playType+'：1注2元</p>');
			o.push('<i class="delI" onclick="cp2y.buy.del(this)"></i></li>');
		}
		this.addRecord(o.join(''));
	},
	addContent:function(mul){
		var d=[],t=[],i=0,o=this.getBall(),len=o.length;
		for(i;i<len;i++){
			if(o.eq(i).hasClass("rb")){
				d.push(o.eq(i).html());
			}else if(o.eq(i).hasClass("bb")){
				t.push(o.eq(i).html());
			}
		}
		this.setClear(d.length,t.length);
		var units;
		if(d.length==0){
			units=0;
		}else{
			units = cp2y.util.comp(t.length,this.num-d.length)*this.mul;
		}
		if(units==0){
			if(t.length>0 || d.length>0){
				return cp2y.dialog.alert('您选的方案不能构成一注');
			}else{
				return cp2y.buy.random(1);
			}
		}
		var o='<li data_input="'+this.input+'" data_bets="'+units+'" data_code="'+d.join(',')+'#'+t.join(',')+'">'+
			'<div>(<a>'+d.join('</a><a>')+'</a>)<a>'+t.join('</a><a>')+'</a></div>'+
			'<p>'+this.playType+'：'+units+'注'+units*2+'元</p>'+
			'<i class="delI" onclick="cp2y.buy.del(this)"></i></li>';
		this.addRecord(o);
		this.clear();
	}
};
_.a13={
	playName:_.playName,
	playType:"任选三胆拖",
	input:"threeDraw",
	num:3,
	mul:1,
	bet:_.a11.bet,
	select:_.a11.select,
	count:_.a11.count,
	random:_.a11.random,
	addContent:_.a11.addContent
};
_.a15={
	playName:_.playName,
	playType:"任选四胆拖",
	input:"fourDraw",
	num:4,
	mul:1,
	bet:_.a11.bet,
	select:_.a11.select,
	count:_.a11.count,
	random:_.a11.random,
	addContent:_.a11.addContent
};
_.a17={
	playName:_.playName,
	playType:"任选五胆拖",
	input:"fiveDraw",
	num:5,
	mul:1,
	bet:_.a11.bet,
	select:_.a11.select,
	count:_.a11.count,
	random:_.a11.random,
	addContent:_.a11.addContent
};
