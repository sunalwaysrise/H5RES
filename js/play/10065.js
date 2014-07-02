/**
 * @author luwenbin@live.com
 */
var _={
	bt:10065,
	playName:"新快三",
	playTypes:function(){
		var html=[];
		html.push('<i>普通</i>');
		html.push('<b data="a0" data2="和值">和值</b>');
		html.push('<b data="a3" class="onn" data2="3不同号">3不同号</b>');
		html.push('<b data="a1" data2="3同号通选">3同号通选</b>');
		html.push('<b data="a2" data2="3同号单选">3同号单选</b>');
		html.push('<b data="a6" data2="3连号通选">3连号通选</b>');
		html.push('<b data="a7" data2="2同号复选">2同号复选</b>');
		html.push('<b data="a8" data2="2同号单选">2同号单选</b>');
		html.push('<b data="a10" data2="2不同号">2不同号</b>');
		html.push('<i>胆拖</i>');
		html.push('<b data="a4" data2="3不同号胆拖">3不同号</b>');
		html.push('<b data="a11" data2="2不同号胆拖">2不同号</b>');
		html.push('<i>其他</i>');
		html.push('<b data="a5" class="b11" data2="3不同号跨度">3不同号跨度</b>');
		html.push('<b data="a9" class="b11" data2="2同号跨度">2同号单选跨度</b>');
		return html.join('');
	}
};
_.a0={
	playName:_.playName,
	playType:"和值",
	input:"sumPoly",
	num:1,
	bet:function(){
		var html0=[],i=4;
		html0.push('<p>至少选1个</p>');
		for(i;i<18;i++){
			html0.push('<a class="gb" onclick="cp2y.buy.select(this)">'+i+'</a>');
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
		dom.CurMoney.html('￥'+(units*2));
	},
	random:function(u){
		var i=1,o=[],ball=[],rb=[];
		for(i;i<18;i++){ball.push(i);}
		i=0;
		for(i;i<u;i++){
			rb=ball.random({len:this.num});
			o.push('<li data_input="'+this.input+'" data_bets="1" data_code="'+rb.join(',')+'">');
			o.push('<div><a class="r">'+rb.join('</a><a class="r">')+'</a></div>');
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
			'<div><a class="r">'+rb.join('</a><a class="r">')+'</a></div>'+
			'<p>'+this.playType+'：'+units+'注'+units*2+'元</p>'+
			'<i class="delI" onclick="cp2y.buy.del(this)"></i></li>';
		this.addRecord(o);
		this.clear();
	}
};
_.a1={
	playName:_.playName,
	playType:'3同号通选',
	input:'threeSameAll',
	bet:function(){
		return '<a class="lgb gb" onclick="cp2y.buy.select(this)"><em>111</em><em>222</em><em>333</em><em>444</em><em>555</em><em>666</em></a>';
	},
	select:_.a0.select,
	count:_.a0.count,
	random:function(u){
		var rb='三同号通选',i=0,o=[];
		for(i;i<u;i++){
			o.push('<li data_input="'+this.input+'" data_bets="1" data_code="'+rb+'">');
			o.push('<div><a class="r">'+rb+'</a></div>');
			o.push('<p>'+this.playType+'：1注2元</p>');
			o.push('<i class="delI" onclick="cp2y.buy.del(this)"></i></li>');
		}
		this.addRecord(o.join(''));
	},
	addContent:function(){
		var rb=[],i=0,o=this.getBall(),len=o.length;
		for(i;i<len;i++){
			if(o.eq(i).hasClass("rb")){
				rb.push('三同号通选');
			}
		}
		var units = rb.length;
		if(units==0){
			cp2y.buy.random(1);
			return false;
		}
		var o='<li data_input="'+this.input+'" data_bets="'+units+'" data_code="'+rb.join(',')+'">'+
			'<div><a class="r">'+rb.join('</a><a class="r">')+'</a></div>'+
			'<p>'+this.playType+'：'+units+'注'+units*2+'元</p>'+
			'<i class="delI" onclick="cp2y.buy.del(this)"></i></li>';
		this.addRecord(o);
		this.clear();
	}
};
_.a2={
	playName:_.playName,
	playType:'3同号单选',
	input:'threeSameAlone',
	num:1,
	bet:function(){
		var html0=[],i=1;
		html0.push('<p></p>');
		for(i;i<7;i++){
			html0.push('<a class="gb" onclick="cp2y.buy.select(this)">'+i+i+i+'</a>');
		}
		return html0.join('');
	},
	select:_.a0.select,
	count:_.a0.count,
	random:function(u){
		var i=1,o=[],ball=[],rb=[];
		for(i;i<7;i++){ball.push(i+''+i+''+i);}
		i=0;
		for(i;i<u;i++){
			rb=ball.random({len:this.num});
			o.push('<li data_input="'+this.input+'" data_bets="1" data_code="'+rb.join(',')+'">');
			o.push('<div><a class="r">'+rb.join('</a><a class="r">')+'</a></div>');
			o.push('<p>'+this.playType+'：1注2元</p>');
			o.push('<i class="delI" onclick="cp2y.buy.del(this)"></i></li>');
		}
		this.addRecord(o.join(''));
	},
	addContent:_.a0.addContent
};

_.a3={
	playName:_.playName,
	playType:'3不同号',
	input:'threeDifferentPoly',
	num:3,
	bet:function(){
		var html0=[],i=1,ilen=7;
		html0.push('<p></p>');
		for(i;i<ilen;i++){
			html0.push('<a class="gb" onclick="cp2y.buy.select(this)">'+i+'</a>');
		}
		return html0.join('');
	},
	select:_.a0.select,
	count:function(){
		var rb=[],i=0,o=this.getBall(),len=o.length,s=1;
		for(i;i<len;i++){
			if(o.eq(i).hasClass("rb")){
				rb.push(o.eq(i));
			}
		}
		if(rb.length>0){s=3;}
		this.setClear(s);
		var units = cp2y.util.comp(rb.length,this.num);
		dom.CurBets.html(units);
		dom.CurMoney.html('￥'+(units*2));
	},
	random:function(u){
		var i=1,o=[],ball=[],rb=[];
		for(i;i<7;i++){ball.push(i);}
		i=0;
		for(i;i<u;i++){
			rb=ball.random({len:this.num});
			o.push('<li data_input="'+this.input+'" data_bets="1" data_code="'+rb.join(',')+'">');
			o.push('<div><a class="r">'+rb.join('</a><a class="r">')+'</a></div>');
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
		var units = cp2y.util.comp(rb.length,this.num);
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
_.a8={
	playName:_.playName,
	playType:'2同号单选',
	input:'twoSameAlonePoly',
	num:2,
	bet:function(){
		var html0=[],i=1,ilen=7;
		html0.push('<p>选号</p>');
		for(i;i<ilen;i++){
			html0.push('<a class="gb" onclick="cp2y.buy.select(this,1)">'+i+i+'</a>');
		}
		i=1;
		html0.push('<p>选号</p>');
		for(i;i<ilen;i++){
			html0.push('<a class="gb2" onclick="cp2y.buy.select(this,2)">'+i+'</a>');
		}
		return html0.join('');
	},
	select:function(_this,b){
		if(b==1){
			if(!$(_this).hasClass("rb")){
				$(_this).addClass("rb");
				dom.c.children("a").eq($(_this).index()+5).removeClass("bb");
			}else{
				$(_this).removeClass("rb");
			}
		}else if(b==2){
			$(_this).toggleClass("bb");
			dom.c.children("a").eq($(_this).index()-8).removeClass("rb");
		}
		this.count();
	},
	getUnits: function(ball){
		var a1 = ball[0];
		var a2 = ball[1];
		if(a1.length==0 || a2.length==0)
			return 0;
		var count = 0;
		for(var a=0;a<a1.length;a++){
			for(var b=0;b<a2.length;b++){
				if(a1[a]!=a2[b])count++;
			}
		}
		return count;
	},
	random:function(u){
		var i=1,o=[],ball=[],ball2=[],t,d;
		for(i;i<7;i++){ball.push(i+""+i);ball2.push(i);}
		i=0;
		for(i;i<u;i++){
			t=ball.random({len:1});
			d=ball2.random({len:1});
			o.push('<li data_input="'+this.input+'" data_bets="1" data_code="'+t+'-'+d+'">');
			o.push('<div><a class="r">'+t+'</a><a class="b">'+d+'</a></div>');
			o.push('<p>'+this.playType+'：1注2元</p>');
			o.push('<i class="delI" onclick="cp2y.buy.del(this)"></i></li>');
		}
		this.addRecord(o.join(''));
	},
	count:function(){
		var rb=[],bb=[],i=0,o=this.getBall(),len=o.length,s=1;
		for(i;i<len;i++){
			if(o.eq(i).hasClass("rb")){
				rb.push(o.eq(i));
			}else if(o.eq(i).hasClass("bb")){
				bb.push(o.eq(i));
			}
		}
		if(rb.length>0 || bb.length>0){s=3;}
		this.setClear(s);
		var units = this.getUnits([rb,bb]);
		dom.CurBets.html(units);
		dom.CurMoney.html('￥'+(units*2));
	},
	addContent:function(){
		var d=[],t=[],i=0,o=this.getBall(),len=o.length;
		for(i;i<len;i++){
			if(o.eq(i).hasClass("rb")){
				d.push(o.eq(i).html());
			}else if(o.eq(i).hasClass("bb")){
				t.push(o.eq(i).html());
			}
		}
		this.setClear(d.length,t.length);
		var units = cp2y.util.comp(t.length,this.num-d.length);
		if(units==0){
			if(d.length>0 || t.length>0){
				return cp2y.dialog.alert('您选的方案不能构成一注');
			}else{
				return cp2y.buy.random(1);
			}
		}
		var o='<li data_input="'+this.input+'" data_bets="'+units+'" data_code="'+d.join(' ')+'-'+t.join(' ')+'">'+
			'<div><a class="r">'+d.join('</a><a class="r">')+'</a><a class="b">'+t.join('</a><a class="b">')+'</a></div>'+
			'<p>'+this.playType+'：'+units+'注'+units*2+'元</p>'+
			'<i class="delI" onclick="cp2y.buy.del(this)"></i></li>';
		this.addRecord(o);
		this.clear();
	}
};
_.a10={
	playName:_.playName,
	playType:'2不同号',
	input:'twoDifferentPoly',
	num:2,
	bet:_.a3.bet,
	select:_.a3.select,
	count:_.a3.count,
	random:function(u){
		var i=1,o=[],ball=[],rb=[];
		for(i;i<7;i++){ball.push(i);}
		i=0;
		for(i;i<u;i++){
			rb=ball.random({len:this.num});
			o.push('<li data_input="'+this.input+'" data_bets="1" data_code="'+rb.join(',')+'">');
			o.push('<div><a class="r">'+rb.join('</a><a class="r">')+'</a></div>');
			o.push('<p>'+this.playType+'：1注2元</p>');
			o.push('<i class="delI" onclick="cp2y.buy.del(this)"></i></li>');
		}
		this.addRecord(o.join(''));
	},
	addContent:_.a3.addContent
};

_.a4={
	playName:_.playName,
	playType:'3不同号胆拖',
	input:'threeDifferentDraw',
	num:3,
	bet:function(){
		var html0=[],i=1,ilen=7;
		html0.push('<p>选择胆码</p>');
		for(i;i<ilen;i++){
			html0.push('<a class="gb" onclick="cp2y.buy.select(this,1)">'+i+'</a>');
		}
		i=1;
		html0.push('<p>选择拖码</p>');
		for(i;i<ilen;i++){
			html0.push('<a class="gb2" onclick="cp2y.buy.select(this,2)">'+i+'</a>');
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
					dom.c.children("a").eq($(_this).index()+5).removeClass("bb");
				}
			}else{
				$(_this).removeClass("rb");
			}
		}else if(b==2){
			$(_this).toggleClass("bb");
			dom.c.children("a").eq($(_this).index()-8).removeClass("rb");
		}
		cp2y.buy.count();
	},
	count:function(){
		var rb=[],bb=[],i=0,o=this.getBall(),len=o.length,s=1;
		for(i;i<len;i++){
			if(o.eq(i).hasClass("rb")){
				rb.push(o.eq(i));
			}else if(o.eq(i).hasClass("bb")){
				bb.push(o.eq(i));
			}
		}
		if(rb.length>0 || bb.length>0){s=3;}
		this.setClear(s);
		var units = cp2y.util.comp(bb.length,this.num-rb.length);
		dom.CurBets.html(units);
		dom.CurMoney.html('￥'+(units*2));
	},
	random:function(u){
		var i=1,o=[],ball=[],t=[],d;
		for(i;i<7;i++){ball.push(i);}
		i=0;
		for(i;i<u;i++){
			t=ball.random({len:this.num});
			d=t.pop();
			o.push('<li data_input="'+this.input+'" data_bets="1" data_code="'+d+'#'+t.join(',')+'">');
			o.push('<div><a class="r">'+d+'</a><a class="b">'+t.join('</a><a class="b">')+'</a></div>');
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
		var units = cp2y.util.comp(t.length,this.num-d.length);
		if(units==0){
			if(d.length>0||t.length>0){
				return cp2y.dialog.alert('您选的方案不能构成一注');
			}else{
				return cp2y.buy.random(1);
			}
		}
		var o='<li data_input="'+this.input+'" data_bets="'+units+'" data_code="'+d.join(',')+'#'+t.join(',')+'">'+
			'<div><a class="r">'+d.join('</a><a class="r">')+'</a><a class="b">'+t.join('</a><a class="b">')+'</a></div>'+
			'<p>'+this.playType+'：'+units+'注'+units*2+'元</p>'+
			'<i class="delI" onclick="cp2y.buy.del(this)"></i></li>';
		this.addRecord(o);
		this.clear();
	}
};
_.a11={
	playName:_.playName,
	playType:'2不同号胆拖',
	input:'twoDifferentDraw',
	num:2,
	bet:_.a4.bet,
	select:_.a4.select,
	count:_.a4.count,
	random:_.a4.random,
	addContent:_.a4.addContent
};


_.a5={
	playName:_.playName,
	playType: '3不同号跨度',
	input: 'threeDifferentKD',
	units: [4,6,6,4],
	num:1,
	bet:function(){
		var html0=[],i=2;
		html0.push('<p></p>');
		for(i;i<6;i++){
			html0.push('<a class="gb" onclick="cp2y.buy.select(this)">'+i+'</a>');
		}
		return html0.join('');
	},
	select:_.a0.select,
	count:function(){
		var rb=[],i=0,o=this.getBall(),len=o.length;
		for(i;i<len;i++){
			if(o.eq(i).hasClass("rb")){
				rb.push(o.eq(i).html());
			}
		}
		var units = 0,i=0,len=rb.length;
		for(i;i<len;i++){
			if(rb[i]==2 || rb[i]==5){
				units+=4;
			}
			if(rb[i]==3 || rb[i]==4){
				units+=6;
			}
		}
		dom.CurBets.html(units);
		dom.CurMoney.html('￥'+(units*2));
	},
	random:function(u){
		var i=2,o=[],ball=[],rb=[],units=0;
		for(i;i<6;i++){ball.push(i);}
		i=0;
		for(i;i<u;i++){
			rb=ball.random({len:this.num});
			if(rb[0]==2 || rb[0]==5){
				units+=4;
			}else if(rb[0]==3 || rb[0]==4){
				units+=6;
			}
			o.push('<li data_input="'+this.input+'" data_bets="1" data_code="'+rb.join(',')+'">');
			o.push('<div><a class="r">'+rb.join('</a><a class="r">')+'</a></div>');
			o.push('<p>'+this.playType+'：'+units+'注'+units*2+'元</p>');
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
		var units = 0,i=0,len=rb.length;
		for(i;i<len;i++){
			if(rb[i]==2 || rb[i]==5){
				units+=4;
			}
			if(rb[i]==3 || rb[i]==4){
				units+=6;
			}
		}
		if(units==0){
			cp2y.buy.random(1);
			return false;
		}
		var o='<li data_input="'+this.input+'" data_bets="'+units+'" data_code="'+rb.join(',')+'">'+
			'<div><a class="r">'+rb.join('</a><a class="r">')+'</a></div>'+
			'<p>'+this.playType+'：'+units+'注'+units*2+'元</p>'+
			'<i class="delI" onclick="cp2y.buy.del(this)"></i></li>';
		this.addRecord(o);
		this.clear();
	}
};
_.a6={
	playName:_.playName,
	playType:'3连号通选',
	input:'threeLinkAll',
	bet:function(){
		return '<a class="lgb gb" onclick="cp2y.buy.select(this)"><em>123</em><em>234</em><em>345</em><em>456</em></a>';
	},
	select:_.a0.select,
	count:_.a0.count,
	random:function(u){
		var rb='三连号通选',i=0,o=[];
		for(i;i<u;i++){
			o.push('<li data_input="'+this.input+'" data_bets="1" data_code="'+rb+'">');
			o.push('<div><a class="r">'+rb+'</a></div>');
			o.push('<p>'+this.playType+'：1注2元</p>');
			o.push('<i class="delI" onclick="cp2y.buy.del(this)"></i></li>');
		}
		this.addRecord(o.join(''));
	},
	addContent:function(){
		var rb=[],i=0,o=this.getBall(),len=o.length;
		for(i;i<len;i++){
			if(o.eq(i).hasClass("rb")){
				rb.push('三连号通选');
			}
		}
		var units = rb.length;
		if(units==0){
			cp2y.buy.random(1);
			return false;
		}
		var o='<li data_input="'+this.input+'" data_bets="'+units+'" data_code="'+rb.join(',')+'">'+
			'<div><a class="r">'+rb.join('</a><a class="r">')+'</a></div>'+
			'<p>'+this.playType+'：'+units+'注'+units*2+'元</p>'+
			'<i class="delI" onclick="cp2y.buy.del(this)"></i></li>';
		this.addRecord(o);
		this.clear();
	}
};
_.a7={
	playName:_.playName,
	playType:'二同号复选',
	input:'twoSame',
	num:1,
	bet:function(){
		var html0=[],i=1;
		html0.push('<p></p>');
		for(i;i<7;i++){
			html0.push('<a class="gb" onclick="cp2y.buy.select(this)">'+i+i+'*</a>');
		}
		return html0.join('');
	},
	select:_.a0.select,
	count:_.a0.count,
	random:function(u){
		var i=1,o=[],ball=[],rb=[];
		for(i;i<7;i++){ball.push(i+i+"*");}
		i=0;
		for(i;i<u;i++){
			rb=ball.random({len:this.num});
			o.push('<li data_input="'+this.input+'" data_bets="1" data_code="'+rb.join(',')+'">');
			o.push('<div><a class="r">'+rb.join('</a><a class="r">')+'</a></div>');
			o.push('<p>'+this.playType+'：1注2元</p>');
			o.push('<i class="delI" onclick="cp2y.buy.del(this)"></i></li>');
		}
		this.addRecord(o.join(''));
	},
	addContent:_.a0.addContent
};

_.a9={
	playName:_.playName,
	playType: '二同号跨度',
	input: 'twoSameAloneKD',
	units: [10,8,6,4,2],
	num:1,
	bet:function(){
		var html0=[],i=1;
		html0.push('<p></p>');
		for(i;i<6;i++){
			html0.push('<a class="gb" onclick="cp2y.buy.select(this)">'+i+'</a>');
		}
		return html0.join('');
	},
	select:_.a0.select,
	count:function(){
		var rb=[],i=0,o=this.getBall(),len=o.length;
		for(i;i<len;i++){
			if(o.eq(i).hasClass("rb")){
				rb.push(o.eq(i).html());
			}
		}
		var units = 0,i=0,len=rb.length;
		for(i;i<len;i++){
			if(rb[i]==1){
				units+=10;
			}else if(rb[i]==2){
				units+=8;
			}else if(rb[i]==3){
				units+=6;
			}else if(rb[i]==4){
				units+=4;
			}else if(rb[i]==5){
				units+=2;
			}
		}
		dom.CurBets.html(units);
		dom.CurMoney.html('￥'+(units*2));
	},
	random:function(u){
		var i=2,o=[],ball=[],rb=[],units=0;
		for(i;i<6;i++){ball.push(i);}
		i=0;
		for(i;i<u;i++){
			rb=ball.random({len:this.num});
			if(rb[0]==1){
				units+=10;
			}else if(rb[0]==2){
				units+=8;
			}else if(rb[0]==3){
				units+=6;
			}else if(rb[0]==4){
				units+=4;
			}else if(rb[0]==5){
				units+=2;
			}
			o.push('<li data_input="'+this.input+'" data_bets="1" data_code="'+rb.join(',')+'">');
			o.push('<div><a class="r">'+rb.join('</a><a class="r">')+'</a></div>');
			o.push('<p>'+this.playType+'：'+units+'注'+units*2+'元</p>');
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
		var units = 0,i=0,len=rb.length;
		for(i;i<len;i++){
			if(rb[i]==1){
				units+=10;
			}else if(rb[i]==2){
				units+=8;
			}else if(rb[i]==3){
				units+=6;
			}else if(rb[i]==4){
				units+=4;
			}else if(rb[i]==5){
				units+=2;
			}
		}
		if(units==0){
			cp2y.buy.random(1);
			return false;
		}
		var o='<li data_input="'+this.input+'" data_bets="'+units+'" data_code="'+rb.join(',')+'">'+
			'<div><a class="r">'+rb.join('</a><a class="r">')+'</a></div>'+
			'<p>'+this.playType+'：'+units+'注'+units*2+'元</p>'+
			'<i class="delI" onclick="cp2y.buy.del(this)"></i></li>';
		this.addRecord(o);
		this.clear();
	}
};




