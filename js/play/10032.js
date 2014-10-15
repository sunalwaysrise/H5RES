/**
 * @author luwenbin@live.com
 */
var _={
	bt:10032,
	playName:"双色球",
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
	input:"poly",
	num:7,
	mul:1,
	bet:function(){
		var html0=[],i=1,ilen=34,j=1,jlen=17;
		html0.push('<p>红球(至少选6个)</p>');
		for(i;i<ilen;i++){
			html0.push('<a class="gb" onclick="cp2y.buy.select(this,1)">'+i.addZero()+'<code></code></a>');
		}
		html0.push('<p>蓝球(至少1个)</p>');
		for(j;j<jlen;j++){
			html0.push('<a class="gb2" onclick="cp2y.buy.select(this,2)">'+j.addZero()+'<code></code></a>');
		}
		return html0.join('');
	},
  updataYL:function(){
    $.get(WebAppUrl.FX,{lid:10002,type:4},function(data){
      var i=0,d=data.data.miss.split(','),len=d.length,o=cp2y.buy.getBall();
      for(i;i<len;i++){
        o.eq(i+33).children("code").html(d[i]);
      }
    });
    $.get(WebAppUrl.FX,{lid:10002},function(data){
      var i=0,d=data.data.miss.split(','),len=d.length,o=cp2y.buy.getBall();
      for(i;i<len;i++){
        o.eq(i).children("code").html(d[i]);
      }
    });
  },
	select:function(_this,b){
		var cls=b==1?"":"bb";
		if(b==1){
			if(!$(_this).hasClass("rb")){
				if($("#choose .rb").size()>19){
					return cp2y.dialog.alert("最多20个红球");
				}else{
					$(_this).addClass("rb");
				}
			}else{
				$(_this).removeClass("rb");
			}
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
	units:function(rb,bb){
		var su = 0,tn=1,i=7,j=2;
		if(rb<6 || bb==0){return 0;}
		if(rb==6){return bb;}
		for(i;i<=rb;i++){tn=tn*i;}
		for(j;j<=rb-6;j++){tn=tn/j;}
		su = tn * bb;
		return su;
	},
	random:function(u){
		var i=0,d,t=[],o=[],ball=[],ball2=[];
		for(var i=1;i<34;i++){
			ball.push(i.addZero());
			if(i<17){
				ball2.push(i.addZero());
			}
		}
		i=0;
		for(i;i<u;i++){
			t=ball.random({len:6}).sort();
			d=ball2.random({len:1}).sort();
			o.push('<li data_input="'+this.input+'" data_bets="1" data_code="'+t.join(' ')+'#'+d+'">');
			o.push('<div><a class="r">'+t.join('</a><a class="r">')+'</a>+<a class="b">'+d+'</a></div>');
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
				return cp2y.buy.random(1);
			}
		}
		var o='<li data_input="'+this.input+'" data_bets="'+units+'" data_code="'+d.join(' ')+'#'+t.join(' ')+'">'+
			'<div><a class="r">'+d.join('</a><a class="r">')+'</a>+<a class="b">'+t.join('</a><a class="b">')+'</a></div>'+
			'<p>'+this.playType+'：'+units+'注'+units*2+'元</p>'+
			'<i class="delI" onclick="cp2y.buy.del(this)"></i></li>';
		this.addRecord(o);
		this.clear();
	},
	hasOutGet:true,
	outGet:function(){
		var r=cp2y.util.getArgs2('r'),b=cp2y.util.getArgs2('b'),i=0,o=$('.gb');
		if(r){
			r=r.split(',');
			for(i;i<33;i++){
				if(r.indexOf(Number(o.eq(i).html()))!=-1){
					o.eq(i).addClass('rb');
				}
			}
		}
		if(b){
			b=b.split(',');
			i=0;o=$('.gb2');
			for(i;i<16;i++){
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
	hasOutGet:false,
	bet:function(){
		var html0=[],i=1,ilen=34,j=1,jlen=17;
		html0.push('<p>红球胆码(选1-5个)</p>');
		for(i;i<ilen;i++){
			html0.push('<a class="gb" onclick="cp2y.buy.select(this,1)">'+i.addZero()+'<code></code></a>');
		}
		i=1;
		html0.push('<p>红球拖码(胆+拖≥6个)</p>');
		for(i;i<ilen;i++){
			html0.push('<a class="gb3" onclick="cp2y.buy.select(this,3)">'+i.addZero()+'<code></code></a>');
		}
		html0.push('<p>蓝球(至少选1个)</p>');
		for(j;j<jlen;j++){
			html0.push('<a class="gb2" onclick="cp2y.buy.select(this,2)">'+j.addZero()+'<code></code></a>');
		}
		return html0.join('');
	},
  updataYL:function(){
    $.get(WebAppUrl.FX,{lid:10002,type:4},function(data){
      var i=0,d=data.data.miss.split(','),len=d.length,o=cp2y.buy.getBall();
      for(i;i<len;i++){
        o.eq(i+66).children("code").html(d[i]);
      }
    });
    $.get(WebAppUrl.FX,{lid:10002},function(data){
      var i=0,d=data.data.miss.split(','),len=d.length,o=cp2y.buy.getBall();
      for(i;i<len;i++){
        o.eq(i).children("code").html(d[i]);
        o.eq(i+33).children("code").html(d[i]);
      }
    });
  },
	select:function(_this,b){
		if(b==1){
			if(!$(_this).hasClass("rb")){
				if($(".rb").size()>4){
					return cp2y.dialog.alert("最多5个胆码");
				}else{
					$(_this).addClass("rb");
					dom.c.children("a").eq($(_this).index()+32).removeClass("rb2");
				}
			}else{
				$(_this).removeClass("rb");
			}
		}else if(b==3){
			$(_this).toggleClass("rb2");
			dom.c.children("a").eq($(_this).index()-35).removeClass("rb");
		}else if(b==2){
			$(_this).toggleClass("bb");
		}
		
		this.count();
	},
	count:function(){
		var a1=[],a2=[],a3=[],i=0,o=this.getBall(),len=o.length,units=0,s=1;
		for(i;i<len;i++){
			if(o.eq(i).hasClass("rb")){
				a1.push(o.eq(i).html());
			}else if(o.eq(i).hasClass("rb2")){
				a2.push(o.eq(i).html());
			}else if(o.eq(i).hasClass("bb")){
				a3.push(o.eq(i).html());
			}
		}
		units=this.units(a1.length,a2.length,a3.length);
		if(a1.length>0 || a2.length>0 || a3.length>0){s=3;}
		this.setClear(s);
		dom.CurBets.html(units);
		dom.CurMoney.html(units*2);
	},
	units : function(dn,tn,bn){
		var u = 0;
		if(dn+tn<6)return 0;
		if(dn+tn+bn<7)return 0;
		if(dn==1)u=tn*(tn-1)*(tn-2)*(tn-3)*(tn-4)/(5*4*3*2);
		else if(dn==2)u=tn*(tn-1)*(tn-2)*(tn-3)/(4*3*2);
		else if(dn==3)u=tn*(tn-1)*(tn-2)/(3*2);
		else if(dn==4)u=tn*(tn-1)/2;
		else if(dn==5)u=tn;
		return u*bn;
	},
	random:function(u){
		var i=1,d,a1=[],a2,a3,o=[],ball=[],ball2=[],ball3=[];
		for(i;i<34;i++){
			ball.push(i.addZero());
			ball2.push(i.addZero());
			if(i<17){
				ball3.push(i.addZero());
			}
		}
		i=0;
		for(i;i<u;i++){
			a1=ball.random({len:6}).sort();
			a2=a1.pop();
			a3=ball3.random({len:1});
			o.push('<li data_input="'+this.input+'" data_bets="1" data_code="'+a1.join(',')+'#'+a2+'#'+a3+'">');
			o.push('<div>(<a class="r">'+a1.join('</a><a class="r">')+'</a>)<a class="r">'+a2+'</a>+<a class="b">'+a3+'</a></div>');
			o.push('<p>'+this.playType+'：1注2元</p>');
			o.push('<i class="delI" onclick="cp2y.buy.del(this)"></i></li>');
		}
		this.addRecord(o.join(''));
	},
	addContent:function(mul){
		var a1=[],a2=[],a3=[],i=0,o=this.getBall(),len=o.length,units=0;
		for(i;i<len;i++){
			if(o.eq(i).hasClass("rb")){
				a1.push(o.eq(i).html());
			}else if(o.eq(i).hasClass("rb2")){
				a2.push(o.eq(i).html());
			}else if(o.eq(i).hasClass("bb")){
				a3.push(o.eq(i).html());
			}
		}
		units=this.units(a1.length,a2.length,a3.length);
		if(units==0){
			if(a1.length>0 || a2.length>0 || a3.length>0){
				return cp2y.dialog.alert('您选的方案不能构成一注');
			}else{
				return cp2y.buy.random(1);
			}
		}
		var o='<li data_input="'+this.input+'" data_bets="'+units+'" data_code="'+a1.join(',')+'#'+a2.join(',')+'#'+a3.join(',')+'">'+
			'<div>(<a class="r">'+a1.join('</a><a class="r">')+'</a>)<a class="r">'+a2.join('</a><a class="r">')+'</a>+<a class="b">'+a3.join('</a><a class="b">')+'</a></div>'+
			'<p>'+this.playType+'：'+units+'注'+units*2+'元</p>'+
			'<i class="delI" onclick="cp2y.buy.del(this)"></i></li>';
		this.addRecord(o);
		this.clear();
	}
};
