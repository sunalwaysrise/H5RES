/**
 * @author luwenbin@live.com
 */
var _={
	bt:10026,
	playName:"大乐透",
	playTypes:function(){
		var html=[];
		html.push('<b data="a0" class="onn" data2="普通">普通</b>');
		html.push('<b data="a1" data2="胆拖">胆拖</b>');
		return html.join('');
	}
};
_.a0={
	playName:_.playName,
	playType:"普通",
	input:"lottoPoly",
	num:7,
	mul:1,
	bet:function(){
		var html0=[],i=1,j=1;
		html0.push('<p>前区(至少选5个)</p>');
		for(i;i<36;i++){
			html0.push('<a class="gb" onclick="cp2y.buy.select(this,1)">'+i.addZero()+'</a>');
		}
		html0.push('<p>后区(至少2个)</p>');
		for(j;j<13;j++){
			html0.push('<a class="gb2" onclick="cp2y.buy.select(this,2)">'+j.addZero()+'</a>');
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
		var units = this.units(rb.length,bb.length);
		dom.CurBets.html(units);
		dom.CurMoney.html('￥'+(units*2));
	},
	units:function(r,b){
		if(r<5){return 0;}
	    if(b<2){return 0;}
		var tempNum1=1,tempNum2=1;
		for (var i=r;i>=r-4;i--){
			tempNum1*=i;
		}
		tempNum1/=120;
		for(var j=b;j>=b-1;j--){
			tempNum2*=j;
		}
		tempNum2/=2;
		return tempNum1*tempNum2;
	},
	random:function(u){
		var i=0,d,t=[],o=[],ball=[],ball2=[];
		for(var i=1;i<36;i++){
			ball.push(i.addZero());
			if(i<13){
				ball2.push(i.addZero());
			}
		}
		i=0;
		for(i;i<u;i++){
			t=ball.random({len:5}).sort();
			d=ball2.random({len:2}).sort();
			o.push('<li data_input="'+this.input+'" data_bets="1" data_code="'+t.join(' ')+'#'+d.join(' ')+'">');
			o.push('<div><a class="r">'+t.join('</a><a class="r">')+'</a>+<a class="b">'+d.join('</a><a class="b">')+'</a></div>');
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
		var units;
		if(d.length==0){
			units=0;
		}else{
			units = this.units(d.length,t.length);
		}
		if(units==0){
			if(d.length>0 || t.length>0){
				return cp2y.dialog.alert('您选的方案不能构成一注');
			}else{
				return cp2y.buy.setRandom();
			}
		}
		var o='<li data_input="'+this.input+'" data_bets="'+units+'" data_code="'+d.join(' ')+'#'+t.join(' ')+'">'+
			'<div><a class="r">'+d.join('</a><a class="r">')+'</a>+<a class="b">'+t.join('</a><a class="b">')+'</a></div>'+
			'<p>'+this.playType+'：'+units+'注'+units*2+'元</p>'+
			'<i class="delI" onclick="cp2y.buy.del(this)"></i></li>';
		this.addRecord(o);
		this.clear();
	},
	setRandom:function(){
		var i=0,d,t=[],o=[],ball=[],ball2=[];
		for(var i=1;i<36;i++){
			ball.push(i.addZero());
			if(i<13){
				ball2.push(i.addZero());
			}
		}
		t=ball.random({len:5});
		d=ball2.random({len:2});
		$('.gb').each(function(i,v){
			if(t.indexOf($(v).html())!=-1){
				$(v).addClass('rb');
			}
		});
		$('.gb2').each(function(i,v){
			if(d.indexOf($(v).html())!=-1){
				$(v).addClass('bb');
			}
		});
		this.count();
	},
  hasOutGet:true,
	outGet:function(){
		var r=cp2y.util.getArgs2('r'),b=cp2y.util.getArgs2('b'),i=0,o=$('.gb');
		if(r){
			r=r.split(',');
			for(i;i<35;i++){
				if(r.indexOf(Number(o.eq(i).html()))!=-1){
					o.eq(i).addClass('rb');
				}
			}
		}
		if(b){
			b=b.split(',');
			i=0;o=$('.gb2');
			for(i;i<12;i++){
				if(b.indexOf(Number(o.eq(i).html()))!=-1){
					o.eq(i).addClass('bb');
				}
			}
		}
	}
};
_.a1={
	playName:_.playName,
	playType:"胆拖",
	input:"draw",
	num:7,
	mul:1,
	bet:function(){
		var html0=[],i=1,j=1;
		html0.push('<p>前区胆码(选1-4个)</p>');
		for(i;i<36;i++){
			html0.push('<a class="gb" onclick="cp2y.buy.select(this,1)">'+i.addZero()+'</a>');
		}
		i=1;
		html0.push('<p>前区拖码(胆+拖≥5个)</p>');
		for(i;i<36;i++){
			html0.push('<a class="gb3" onclick="cp2y.buy.select(this,3)">'+i.addZero()+'</a>');
		}
		html0.push('<p>后区胆码(至多选1个)</p>');
		for(j;j<13;j++){
			html0.push('<a class="gb2" onclick="cp2y.buy.select(this,2)">'+j.addZero()+'</a>');
		}
		j=1;
		html0.push('<p>后区拖码(胆+拖≥2个)</p>');
		for(j;j<13;j++){
			html0.push('<a class="gb4" onclick="cp2y.buy.select(this,4)">'+j.addZero()+'</a>');
		}
		return html0.join('');
	},
	select:function(_this,b){
		if(b==1){
			if(!$(_this).hasClass("rb")){
				if($(".rb").size()>3){
					return cp2y.dialog.alert("最多4个胆码");
				}else{
					$(_this).addClass("rb");
					dom.c.children("a").eq($(_this).index()+34).removeClass("rb2");
				}
			}else{
				$(_this).removeClass("rb");
			}
		}else if(b==3){
			$(_this).toggleClass("rb2");
			dom.c.children("a").eq($(_this).index()-37).removeClass("rb");
		}else if(b==2){
			if(!$(_this).hasClass("bb")){
				if($(".bb").size()>0){
					return cp2y.dialog.alert("最多1个胆码");
				}else{
					$(_this).addClass("bb");
					dom.c.children("a").eq($(_this).index()+9).removeClass("bb2");
				}
			}else{
				$(_this).removeClass("bb");
			}
		}else if(b==4){
			$(_this).toggleClass("bb2");
			dom.c.children("a").eq($(_this).index()-16).removeClass("bb");
		}
		this.count();
	},
	count:function(){
		var a1=[],a2=[],a3=[],a4=[],i=0,o=this.getBall(),len=o.length,units=0,s=1;
		for(i;i<len;i++){
			if(o.eq(i).hasClass("rb")){
				a1.push(o.eq(i).html());
			}else if(o.eq(i).hasClass("rb2")){
				a2.push(o.eq(i).html());
			}else if(o.eq(i).hasClass("bb")){
				a3.push(o.eq(i).html());
			}else if(o.eq(i).hasClass("bb2")){
				a4.push(o.eq(i).html());
			}
		}
		units=this.units(a1.length,a2.length,a3.length,a4.length);
		if(a1.length>0 || a2.length>0 || a3.length>0|| a4.length>0){s=3;}
		this.setClear(s);
		dom.CurBets.html(units);
		dom.CurMoney.html(units*2);
	},
	units : function(rDan,rTuo,bDan,bTuo){
		if (rDan+rTuo<5){
			return 0;
		}
		if (bDan+bTuo<2){
			return 0;
		}
		var forNums=0,aftNums=0;
		if (rDan==1){
			forNums=rTuo*(rTuo-1)*(rTuo-2)*(rTuo-3)/(4*3*2);
		}else if (rDan==2){
			forNums=rTuo*(rTuo-1)*(rTuo-2)/6;
		}else if (rDan==3){
			forNums=rTuo*(rTuo-1)/2;
		}else if (rDan==4){
			forNums=rTuo;
		}else if (rDan==0 && bDan>0){
			return 0;
		}
		if(bDan==1){
			aftNums=bTuo;
		}
		if (rDan>0 && bDan==0){
			aftNums=bTuo*(bTuo-1)/2;
		}
		return forNums*aftNums;
	},
	random:function(u){
		var i=1,d,a1=[],a2=[],a3=[],a4=[],o=[],ball=[],ball2=[],ball3=[];
		for(i;i<36;i++){
			ball.push(i.addZero());ball2.push(i.addZero());
			if(i<13){
				ball3.push(i.addZero());
			}
		}
		i=0;
		for(i;i<u;i++){
			a1=ball.random({len:5}).sort();
			a2=a1.pop();
			a3=ball3.random({len:2}).sort();
			a4=a3.pop();
			o.push('<li data_input="'+this.input+'" data_bets="1" data_code="'+a1.join(' ')+'#'+a2+'#'+a3+'#'+a4+'">');
			o.push('<div>(<a class="r">'+a1.join('</a><a class="r">')+'</a>)<a class="r">'+a2+'</a>+(<a class="b">'+a3+'</a>)<a class="b">'+a4+'</a></div>');
			o.push('<p>'+this.playType+'：1注2元</p>');
			o.push('<i class="delI" onclick="cp2y.buy.del(this)"></i></li>');
		}
		this.addRecord(o.join(''));
	},
	addContent:function(mul){
		var a1=[],a2=[],a3=[],a4=[],i=0,o=this.getBall(),len=o.length,units=0;
		for(i;i<len;i++){
			if(o.eq(i).hasClass("rb")){
				a1.push(o.eq(i).html());
			}else if(o.eq(i).hasClass("rb2")){
				a2.push(o.eq(i).html());
			}else if(o.eq(i).hasClass("bb")){
				a3.push(o.eq(i).html());
			}else if(o.eq(i).hasClass("bb2")){
				a4.push(o.eq(i).html());
			}
		}
		units=this.units(a1.length,a2.length,a3.length,a4.length);
		if(units==0){
			if(a1.length>0 || a2.length>0 || a3.length>0|| a4.length>0){
				return cp2y.dialog.alert('您选的方案不能构成一注');
			}else{
				//return cp2y.buy.random(1);
				return cp2y.buy.setRandom();
			}
		}
		var o='<li data_input="'+this.input+'" data_bets="'+units+'" data_code="'+a1.join(' ')+'#'+a2.join(' ')+'#'+a3.join(' ')+'#'+a4.join(' ')+'">'+
			'<div>(<a class="r">'+a1.join('</a><a class="r">')+'</a>)<a class="r">'+a2.join('</a><a class="r">')+'</a>+(<a class="b">'+a3.join('</a><a class="b">')+'</a>)<a class="b">'+a4.join('</a><a class="b">')+'</a></a></div>'+
			'<p>'+this.playType+'：'+units+'注'+units*2+'元</p>'+
			'<i class="delI" onclick="cp2y.buy.del(this)"></i></li>';
		this.addRecord(o);
		this.clear();
	},
	setRandom:function(){
		var i=1,d,a1=[],a2=[],a3=[],a4=[],o=[],ball=[],ball2=[];
		for(i;i<36;i++){
			ball.push(String(i.addZero()));
			if(i<13){
				ball2.push(String(i.addZero()));
			}
		}
		a1=ball.random({len:5});
		a2=a1.pop();
		a3=ball2.random({len:2});
		a4=a3.pop();
		$('.gb').each(function(i,v){
			if(a1.indexOf($(v).html())!=-1){
				$(v).addClass('rb');
			}
		});
		$('.gb3').each(function(i,v){
			if(a2.indexOf($(v).html())!=-1){
				$(v).addClass('rb2');
			}
		});		
		$('.gb2').each(function(i,v){
			if(a3.indexOf($(v).html())!=-1){
				$(v).addClass('bb');
			}
		});
		$('.gb4').each(function(i,v){
			if(a4.indexOf($(v).html())!=-1){
				$(v).addClass('bb2');
			}
		});
		this.count();
	}
};
