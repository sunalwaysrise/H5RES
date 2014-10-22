/**
* @author luwenbin@live.com
*/
var _={
  bt:10024,
  playName:"排列3/5",
  playTypes:function(){
    var html=[];
    html.push('<i>普通</i>');
    html.push('<b data="a0" class="onn" data2="排3-普通-组3">组3</b>');
    html.push('<b data="a1" data2="排列3-普通-组6">组6</b>');
    html.push('<b data="a2" data2="排列3-普通-直选">直选</b>');
    html.push('<i>胆拖</i>');
    html.push('<b data="a3" data2="排列3-胆拖-组3">组3</b>');
    html.push('<b data="a4" data2="排列3-胆拖-组6">组6</b>');
    html.push('<b data="a5" data2="排列3-胆拖-直选">直选</b>');
    html.push('<i>排列5</i>');
    html.push('<b data="a6" data2="排列5-直选">直选</b>');
    return html.join('');
  }
};
_.a0={
  playName:_.playName,
  playType:"排列3-普通-组3",
  input:"group3Poly",
  bet:function(){
    var html0=[],i=0;
    html0.push('<p>至少选2个号,猜对开奖号(有2位相同)即中<b>346元</b></p><p class="c8c">号码下方为该号码的当前遗漏</p><p>至少选择2个号码</p>');
    for(i;i<10;i++){
      html0.push('<a class="gb" data="'+i+'" onclick="cp2y.buy.select(this)">'+i+'<code></code></a>');
    }
    return html0.join('');
  },
  updataYL:function(){
    $.get(WebAppUrl.FX,{lid:10003},function(data){
      var data=eval("("+data+")");
      var i=0,d=data.data.miss.split(','),len=d.length,o=cp2y.buy.getBall();;
      for(i;i<len;i++){
        o.eq(i).children("code").html(d[i]);
      }
    });
  },
  select:function(_this){
      $(_this).toggleClass("rb1");
      this.count();
  },
  count:function(){
      var rb1=[],i=0,o=this.getBall(),len=o.length,units,s=1;
      for(i;i<len;i++){
          if(o.eq(i).hasClass("rb1")){rb1.push(o.eq(i));}
      }
      if(rb1.length>0){s=3;}
      this.setClear(s);
      var units = rb1.length*(rb1.length-1);
      dom.CurBets.html(units);
      dom.CurMoney.html('￥'+(units*2));
  },
  random:function(u){
      var i=0,ball=[],t=[],o=[];
      for(i;i<10;i++){
          ball.push(i);
      }
      i=0;
      for(i;i<u;i++){
          t=ball.random({len:2});
          o.push('<li data_input="'+this.input+'" data_bets="2" data_code="'+t.join('')+'">');
          o.push('<div><a class="r">'+t.join('</a><a class="r">')+'</a></div>');
          o.push('<p>'+this.playType+'：2注4元</p>');
          o.push('<i class="delI" onclick="cp2y.buy.del(this)"></i></li>');
      }
      this.addRecord(o.join(''));
  },
  addContent:function(mul){
      var rb1=[],i=0,o=this.getBall(),len=o.length,units;
      for(i;i<len;i++){
          if(o.eq(i).hasClass("rb1")){rb1.push(o.eq(i).attr("data"));}
      }
      units = rb1.length*(rb1.length-1);
      if(units==0){
          if(rb1.length>0){
              return cp2y.dialog.alert('您选的方案不能构成一注');
          }else{
              return cp2y.buy.setRandom();
          }
      }
      var o='<li data_input="'+this.input+'" data_bets="'+units+'" data_code="'+rb1.join('')+'">'+
          '<div><a class="r">'+rb1.join('</a><a class="r">')+'</a></div>'+
          '<p>'+this.playType+'：'+units+'注'+units*2+'元</p>'+
          '<i class="delI" onclick="cp2y.buy.del(this)"></i></li>';
      this.addRecord(o);
      this.clear();
  },
  setRandom:function(){
      var i=0,d,ball=[];
      for(i;i<10;i++){
          ball.push(i);
      }
      var t=ball.random({len:2});
      $('.gb').eq(t[0]).addClass('rb1');
      $('.gb').eq(t[1]).addClass('rb1');
      this.count();
  }
};
_.a1={
  playName:_.playName,
  playType:"排列3-普通-组6",
  input:"group6Poly",
  bet:function(){
      var html0=[],i=0;
      html0.push('<p>至少选3个号,猜对开奖号(顺序不限)即中<b>173元</b></p><p class="c8c">号码下方为该号码的当前遗漏</p>');
      for(i;i<10;i++){
          html0.push('<a class="gb" data="'+i+'" onclick="cp2y.buy.select(this,1)">'+i+'<code></code></a>');
      }
      return html0.join('');
  },
  updataYL:_.a0.updataYL,
  select:function(_this,b){
      $(_this).toggleClass('rb');
      this.count();
  },
  count:function(){
      var a1=[],i=0,o=this.getBall(),len=o.length,units=0,s=1;
      for(i;i<len;i++){
          if(o.eq(i).hasClass("rb")){
              a1.push(o.eq(i).html());
          }
      }
      units=(a1.length*(a1.length-1)*(a1.length-2))/6;
      if(a1.length>0){s=3;}
      this.setClear(s);
      dom.CurBets.html(units);
      dom.CurMoney.html(units*2);
  },
  random:function(u){
      var i=0,o=[],ball=[],h=[];
      for(i;i<10;i++){
          ball.push(i);
      }
      i=0;
      for(i;i<u;i++){
          o=ball.random({len:3}).sort();
          h.push('<li data_input="'+this.input+'" data_bets="1" data_code="'+o.join('')+'">');
          h.push('<div><a class="r">'+o.join('</a><a class="r">')+'</a></div>');
          h.push('<p>'+this.playType+'：2注4元</p>');
          h.push('<i class="delI" onclick="cp2y.buy.del(this)"></i></li>');
      }
      this.addRecord(h.join(''));
  },
  addContent:function(mul){
      var a1=[],i=0,o=this.getBall(),len=o.length,units=0;
      for(i;i<len;i++){
          if(o.eq(i).hasClass("rb")){
              a1.push(o.eq(i).attr("data"));
          }
      }
      units=(a1.length*(a1.length-1)*(a1.length-2))/6;
      if(units==0){
          if(a1.length>0){
              return cp2y.dialog.alert('您选的方案不能构成一注');
          }else{
              return cp2y.buy.setRandom();
          }
      }
      var o='<li data_input="'+this.input+'" data_bets="'+units+'" data_code="'+a1.join('')+'">'+
          '<div><a class="r">'+a1.join('</a><a class="r">')+'</a></div>'+
          '<p>'+this.playType+'：'+units+'注'+units*2+'元</p>'+
          '<i class="delI" onclick="cp2y.buy.del(this)"></i></li>';
      this.addRecord(o);
      this.clear();
  },
  setRandom:function(){
      var i=0,a1=[],ball=[];
      for(i;i<10;i++){
          ball.push(i);
      }
      a1=ball.random({len:3});
      $('.gb').eq(a1[0]).addClass('rb');
      $('.gb').eq(a1[1]).addClass('rb');
      $('.gb').eq(a1[2]).addClass('rb');
      this.count();
  }
};
_.a2={
  playName:_.playName,
  playType:"排列3-普通-直选",
  input:"direct",
  bet:function(){
      var html0=[],i=0;
      html0.push('<p>每位至少选1个号,按位猜对开奖号即中<b>1040元</b></p><p class="c8c">号码下方为该号码的当前遗漏</p><p>第一位</p>');
      for(i;i<10;i++){
          html0.push('<a class="gb" data="'+i+'" onclick="cp2y.buy.select(this,1)">'+i+'<code></code></a>');
      }
      i=0;
      html0.push('<p>第二位</p>');
      for(i;i<10;i++){
          html0.push('<a class="gb" data="'+i+'" onclick="cp2y.buy.select(this,2)">'+i+'<code></code></a>');
      }
      i=0;
      html0.push('<p>第三位</p>');
      for(i;i<10;i++){
          html0.push('<a class="gb" data="'+i+'" onclick="cp2y.buy.select(this,3)">'+i+'<code></code></a>');
      }
      return html0.join('');
  },
  select:function(_this,b){
      $(_this).toggleClass('rb'+b);
      this.count();
  },
  updataYL:function(){
    $.get(WebAppUrl.FX,{lid:10003,type:1,location:1},function(data){
      var data=eval("("+data+")");
      var i=0,d=data.data.miss.split(','),len=d.length,o=cp2y.buy.getBall();;
      for(i;i<len;i++){
        o.eq(i).children("code").html(d[i]);
      }
    });
    $.get(WebAppUrl.FX,{lid:10003,type:1,location:2},function(data){
      var data=eval("("+data+")");
      var i=0,d=data.data.miss.split(','),len=d.length,o=cp2y.buy.getBall();;
      for(i;i<len;i++){
        o.eq(i+10).children("code").html(d[i]);
      }
    });
    $.get(WebAppUrl.FX,{lid:10003,type:1,location:3},function(data){
      var data=eval("("+data+")");
      var i=0,d=data.data.miss.split(','),len=d.length,o=cp2y.buy.getBall();;
      for(i;i<len;i++){
        o.eq(i+20).children("code").html(d[i]);
      }
    });
  },
  count:function(){
      var a1=[],a2=[],a3=[],i=0,o=this.getBall(),len=o.length,units=0,s=1;
      for(i;i<len;i++){
          if(o.eq(i).hasClass("rb1")){
              a1.push(o.eq(i).html());
          }else if(o.eq(i).hasClass("rb2")){
              a2.push(o.eq(i).html());
          }else if(o.eq(i).hasClass("rb3")){
              a3.push(o.eq(i).html());
          }
      }
      units=a1.length*a2.length*a3.length;
      if(a1.length>0||a2.length>0||a3.length){s=3;}
      this.setClear(s);
      dom.CurBets.html(units);
      dom.CurMoney.html(units*2);
  },
  random:function(u){
      var i=0,o=[],ball=[],h=[];
      for(i;i<10;i++){
          ball.push(i);
      }
      i=0;
      for(i;i<u;i++){
          o=ball.random({len:3}).sort();
          h.push('<li data_input="'+this.input+'" data_bets="1" data_code="'+o.join('-')+'">');
          h.push('<div><a class="r">'+o.join('</a>-<a class="r">')+'</a></div>');
          h.push('<p>'+this.playType+'：1注2元</p>');
          h.push('<i class="delI" onclick="cp2y.buy.del(this)"></i></li>');
      }
      this.addRecord(h.join(''));
  },
  addContent:function(mul){
      var a1=[],a2=[],a3=[],i=0,o=this.getBall(),len=o.length,units=0;
      for(i;i<len;i++){
          if(o.eq(i).hasClass("rb1")){
              a1.push(o.eq(i).attr("data"));
          }else if(o.eq(i).hasClass("rb2")){
              a2.push(o.eq(i).attr("data"));
          }else if(o.eq(i).hasClass("rb3")){
              a3.push(o.eq(i).attr("data"));
          }
      }
      units=a1.length*a2.length*a3.length;
      if(units==0){
          if(a1.length>0||a2.length>0||a3.length){
              return cp2y.dialog.alert('您选的方案不能构成一注');
          }else{
              return cp2y.buy.setRandom();
          }
      }
      var o='<li data_input="'+this.input+'" data_bets="'+units+'" data_code="'+a1.join('')+'-'+a2.join('')+'-'+a3.join('')+'">'+
          '<div><a class="r">'+a1.join('</a><a class="r">')+'</a>-<a class="r">'+a2.join('</a><a class="r">')+'</a>-<a class="r">'+a3.join('</a><a class="r">')+'</a></div>'+
          '<p>'+this.playType+'：'+units+'注'+units*2+'元</p>'+
          '<i class="delI" onclick="cp2y.buy.del(this)"></i></li>';
      this.addRecord(o);
      this.clear();
  },
  setRandom:function(){
      var i=0,a1=[],ball=[];
      for(i;i<10;i++){
          ball.push(i);
      }
      a1=ball.random({len:3});
      $('.gb').eq(a1[0]).addClass('rb1');
      $('.gb').eq(a1[1]+10).addClass('rb2');
      $('.gb').eq(a1[2]+20).addClass('rb3');
      this.count();
  }
};
_.a3={
  playName:_.playName,
  playType:"排列3-胆拖-组三",
  input:"group3Draw",
  num:1,
  n:"组3",
  mul:2,
  bet:function(){
      var html0=[],i=0;
      html0.push('<p>至少选2个号,猜对开奖号(有2位相同)即中<b>346元</b></p><p class="c8c">号码下方为该号码的当前遗漏</p><p>胆码(选择1个)不含豹子</p>');
      for(i;i<10;i++){
          html0.push('<a class="gb" data="'+i+'" onclick="cp2y.buy.select(this,1)">'+i+'<code></code></a>');
      }
      i=0;
      html0.push('<p>拖码</p>');
      for(i;i<10;i++){
          html0.push('<a class="gb2" data="'+i+'" onclick="cp2y.buy.select(this,2)">'+i+'<code></code></a>');
      }
      return html0.join('');
  },
  updataYL:function(){
    $.get(WebAppUrl.FX,{lid:10003},function(data){
      var data=eval("("+data+")");
      var i=0,d=data.data.miss.split(','),len=d.length,o=cp2y.buy.getBall();
      for(i;i<len;i++){
        o.eq(i).children("code").html(d[i]);
        o.eq(i+10).children("code").html(d[i]);
      }
    });
  },
  select:function(_this,b){
      if(b==1){
          if(!$(_this).hasClass("rb")){
              if($(".rb").size()>this.num-1){
                  return cp2y.dialog.alert("最多"+this.num+"个胆码");
              }else{
                  $(_this).addClass("rb");
                  dom.c.children("a").eq($(_this).index()+9).removeClass("bb");
              }
          }else{
              $(_this).removeClass("rb");
          }
      }else if(b==2){
          if(!$(_this).hasClass("bb")){
              $(_this).addClass("bb");
              dom.c.children("a").eq($(_this).index()-12).removeClass("rb");
          }else{
              $(_this).removeClass("bb");
          }
      }
      this.count();
  },
  count:function(){
      var d=[],t=[],i=0,o=this.getBall(),len=o.length,units=0,s=1;
      for(i;i<len;i++){
          if(o.eq(i).hasClass("rb")){
              d.push(o.eq(i).html());
          }else if(o.eq(i).hasClass("bb")){
              t.push(o.eq(i).html());
          }
      }
      if(d.length+t.length<this.mul){
          units=0;
      }else if(d.length==0){
          units=0;
      }else{
          units=this.units(d,t,this.n);
      }
      if(d.length>0 || t.length>0){s=3;}
      this.setClear(s);
      dom.CurBets.html(units);
      dom.CurMoney.html(units*2);
  },
  units : function(dan,tuo,text){
      var arr = [];
      if(dan.length==2){
          var dan = dan.join(''),no;
          for(var i=0;i<tuo.length;i++){
              no = (dan+tuo[i]).toArray().sort(function(a,b){return a-b;}).join('');
              if(this.group(no)==text&&arr.indexOf(no)==-1)
                  arr.push(no);
          }
      }else{
          var dan = dan.join(''),no;
          for(var a=0;a<tuo.length;a++){
              for(var b=0;b<tuo.length;b++){
                  no = (dan+tuo[a]+tuo[b]).toArray().sort(function(a,b){return a-b;}).join('');
                  if(this.group(no)==text&&arr.indexOf(no)==-1)
                      arr.push(no);
              }
          }
          if(text=='组3'){
              for(var a=0;a<tuo.length;a++){
                  no = (dan+dan+tuo[a]).toArray().sort(function(a,b){return a-b;}).join('');
                  if(this.group(no)==text&&arr.indexOf(no)==-1)
                      arr.push(no);
              }
          }
      }
      return arr.length;
  },
  group:function(no){
      var a = no.toArray();
      if(a[0]==a[1] && a[1]==a[2]){
          return '豹子';
      }
      if(a[0]==a[1] || a[1]==a[2] || a[2]==a[0]){
          return '组3';
      }
      return '组6';
  },
  random:function(u){
      var i=0,d,a1=[],o=[],ball=[];
      for(i;i<10;i++){
          ball.push(i);
      }
      i=0;
      for(i;i<u;i++){
          a1=ball.random({len:3});
          d=a1.pop();
          o.push('<li data_input="'+this.input+'" data_bets="4" data_code="'+d+','+a1.join('')+'">');
          o.push('<div>(<a class="r">'+d+'</a>)<a class="r">'+a1.join('</a><a class="r">')+'</a></div>');
          o.push('<p>'+this.playType+'：4注8元</p>');
          o.push('<i class="delI" onclick="cp2y.buy.del(this)"></i></li>');
      }
      this.addRecord(o.join(''));
  },
  addContent:function(mul){
      var d=[],t=[],i=0,o=this.getBall(),len=o.length,units=0;
      for(i;i<len;i++){
          if(o.eq(i).hasClass("rb")){
              d.push(o.eq(i).attr("data"));
          }else if(o.eq(i).hasClass("bb")){
              t.push(o.eq(i).attr("data"));
          }
      }
      if(d.length+t.length<this.mul){
          units=0;
      }else{
          units=this.units(d,t,this.n);
      }
      if(units==0){
          if(d.length>0 || t.length>0 ){
              return cp2y.dialog.alert('您选的方案不能构成一注');
          }else{
              return cp2y.buy.setRandom();
          }
      }
      var o='<li data_input="'+this.input+'" data_bets="'+units+'" data_code="'+d.join('')+','+t.join('')+'">'+
          '<div>(<a class="r">'+d.join('</a><a class="r">')+'</a>)<a class="r">'+t.join('</a><a class="r">')+'</a></div>'+
          '<p>'+this.playType+'：'+units+'注'+units*2+'元</p>'+
          '<i class="delI" onclick="cp2y.buy.del(this)"></i></li>';
      this.addRecord(o);
      this.clear();
  },
  setRandom:function(){
      var i=0,a1=[],ball=[];
      for(i;i<10;i++){
          ball.push(i);
      }
      a1=ball.random({len:3});
      $('.gb').eq(a1[0]-1).addClass('rb');
      $('.gb2').eq(a1[1]-1).addClass('bb');
      $('.gb2').eq(a1[2]-1).addClass('bb');
      this.count();
  }
};
_.a4={
  playName:_.playName,
  playType:"排列3-胆拖-组六",
  input:"group6Draw",
  n:'组6',
  num:2,
  numP:'<p>至少选3个号,猜对开奖号(顺序不限)即中<b>173元</b></p>',
  mul:4,
  bet:function(){
      var html0=[],i=0;
      html0.push(cp2y.buy.numP+'<p class="c8c">号码下方为该号码的当前遗漏</p><p>胆码(选择1-2个)不含豹子</p>');
      for(i;i<10;i++){
          html0.push('<a class="gb" data="'+i+'" onclick="cp2y.buy.select(this,1)">'+i+'<code></code></a>');
      }
      i=0;
      html0.push('<p>拖码</p>');
      for(i;i<10;i++){
          html0.push('<a class="gb2" data="'+i+'" onclick="cp2y.buy.select(this,2)">'+i+'<code></code></a>');
      }
      return html0.join('');
  },
  updataYL:_.a3.updataYL,
  select:_.a3.select,
  count:_.a3.count,
  units:_.a3.units,
  group:_.a3.group,
  random:function(u){
      var i=0,d,a1=[],o=[],ball=[];
      for(i;i<10;i++){
          ball.push(i);
      }
      i=0;
      for(i;i<u;i++){
          a1=ball.random({len:4});
          d=a1.pop();
          o.push('<li data_input="'+this.input+'" data_bets="3" data_code="'+d+","+a1.join("")+'">');
          o.push('<div>(<a class="r">'+d+'</a>)<a class="r">'+a1.join('</a><a class="r">')+'</a></div>');
          o.push('<p>'+this.playType+'：3注6元</p>');
          o.push('<i class="delI" onclick="cp2y.buy.del(this)"></i></li>');
      }
      this.addRecord(o.join(''));
  },
  addContent:function(mul){
      var d=[],t=[],i=0,o=this.getBall(),len=o.length,units=0;
      for(i;i<len;i++){
          if(o.eq(i).hasClass("rb")){
              d.push(o.eq(i).attr("data"));
          }else if(o.eq(i).hasClass("bb")){
              t.push(o.eq(i).attr("data"));
          }
      }
      if(d.length+t.length<this.mul){
          units=0;
      }else{
          units=this.units(d,t,this.n);
      }
      if(units==0){
          if(d.length>0 || t.length>0 ){
              return cp2y.dialog.alert('您选的方案不能构成一注');
          }else{
              return cp2y.buy.setRandom();
          }
      }
      var o='<li data_input="'+this.input+'" data_bets="'+units+'" data_code="'+d.join('')+','+t.join('')+'">'+
          '<div>(<a class="r">'+d.join('</a><a class="r">')+'</a>)<a class="r">'+t.join('</a><a class="r">')+'</a></div>'+
          '<p>'+this.playType+'：'+units+'注'+units*2+'元</p>'+
          '<i class="delI" onclick="cp2y.buy.del(this)"></i></li>';
      this.addRecord(o);
      this.clear();
  },
  setRandom:function(){
      var i=0,a1=[],ball=[];
      for(i;i<10;i++){
          ball.push(i);
      }
      a1=ball.random({len:4});
      $('.gb').eq(a1[0]-1).addClass('rb');
      $('.gb2').eq(a1[1]-1).addClass('bb');
      $('.gb2').eq(a1[2]-1).addClass('bb');
      $('.gb2').eq(a1[3]-1).addClass('bb');
      this.count();
  }
};
_.a5={
  playName:_.playName,
  playType:"排列3-胆拖-直选",
  input:"directDraw",
  n:'组6',
  num:2,
  numP:'<p>至少选3个号,猜对开奖号(顺序不限)即中<b>1040元</b></p>',
  mul:4,
  updataYL:_.a3.updataYL,
  bet:_.a4.bet,
  select:_.a3.select,
  count:function(){
    var d=[],t=[],i=0,o=this.getBall(),len=o.length,units=0,s=1;
    for(i;i<len;i++){
        if(o.eq(i).hasClass("rb")){
            d.push(o.eq(i).html());
        }else if(o.eq(i).hasClass("bb")){
            t.push(o.eq(i).html());
        }
    }
    if(d.length+t.length<this.mul){
        units=0;
    }else{
        units=this.units(d.length,t.length);
    }
    if(d.length>0 || t.length>0){s=3;}
    this.setClear(s);
    dom.CurBets.html(units);
    dom.CurMoney.html(units*2);
  },
  units:function(dn,tn){
    var u = 0;
    if(dn+tn==3){
        u=0;
    }else if(dn==1){
        u=tn*(tn-1)/2*6;
    }else if(dn==2){
        u=tn*6;
    }else if(dn==0){
        u=0;
    }
    return u;
  },
  random:function(u){
    var i=0,d,a1=[],o=[],ball=[];
    for(i;i<10;i++){
        ball.push(i);
    }
    i=0;
    for(i;i<u;i++){
        a1=ball.random({len:4});
        d=a1.pop();
        o.push('<li data_input="'+this.input+'" data_bets="18" data_code="'+d+","+a1.join("")+'">');
        o.push('<div>(<a class="r">'+d+'</a>)<a class="r">'+a1.join('</a><a class="r">')+'</a></div>');
        o.push('<p>'+this.playType+'：18注36元</p>');
        o.push('<i class="delI" onclick="cp2y.buy.del(this)"></i></li>');
    }
    this.addRecord(o.join(''));
  },
  addContent:function(mul){
    var d=[],t=[],i=0,o=this.getBall(),len=o.length,units=0;
    for(i;i<len;i++){
        if(o.eq(i).hasClass("rb")){
            d.push(o.eq(i).attr("data"));
        }else if(o.eq(i).hasClass("bb")){
            t.push(o.eq(i).attr("data"));
        }
    }
    if(d.length+t.length<this.mul){
        units=0;
    }else{
        units=this.units(d.length,t.length);
    }
    if(units==0){
        if(d.length>0 || t.length>0 ){
            return cp2y.dialog.alert('您选的方案不能构成一注');
        }else{
            return cp2y.buy.setRandom();
        }
    }
    var o='<li data_input="'+this.input+'" data_bets="'+units+'" data_code="'+d.join('')+','+t.join('')+'">'+
        '<div>(<a class="r">'+d.join('</a><a class="r">')+'</a>)<a class="r">'+t.join('</a><a class="r">')+'</a></div>'+
        '<p>'+this.playType+'：'+units+'注'+units*2+'元</p>'+
        '<i class="delI" onclick="cp2y.buy.del(this)"></i></li>';
    this.addRecord(o);
    this.clear();
  },
  setRandom:function(){
    var i=0,a1=[],ball=[];
    for(i;i<10;i++){
        ball.push(i);
    }
    a1=ball.random({len:4});
    $('.gb').eq(a1[0]-1).addClass('rb');
    $('.gb2').eq(a1[1]-1).addClass('bb');
    $('.gb2').eq(a1[2]-1).addClass('bb');
    $('.gb2').eq(a1[3]-1).addClass('bb');
    this.count();
  }
};
_.a6={
playName:_.playName,
playType:"排列5-直选",
input:"pl5Poly",
num:5,
bet:function() {
  var html0 = [], i = 0;
  html0.push('<p>每位至少选1个号,按位猜对开奖号<b>100000元</b></p><p class="c8c">号码下方为该号码的当前遗漏</p><p>万位</p>');
  for (i; i < 10; i++) {
    html0.push('<a class="gb" data="'+i+'" onclick="cp2y.buy.select(this,5)">' + i + '<code></code></a>');
  };
  i = 0;
  html0.push('<p>千位</p>');
  for (i; i < 10; i++) {
    html0.push('<a class="gb" data="'+i+'" onclick="cp2y.buy.select(this,4)">' + i + '<code></code></a>');
  };
  i = 0;
  html0.push('<p>百位</p>');
  for (i; i < 10; i++) {
    html0.push('<a class="gb" data="'+i+'" onclick="cp2y.buy.select(this,3)">' + i + '<code></code></a>');
  };
  i = 0;
  html0.push('<p>十位</p>');
  for (i; i < 10; i++) {
    html0.push('<a class="gb" data="'+i+'" onclick="cp2y.buy.select(this,2)">' + i + '<code></code></a>');
  };
  i = 0;
  html0.push('<p>个位</p>');
  for (i; i < 10; i++) {
    html0.push('<a class="gb" data="'+i+'" onclick="cp2y.buy.select(this,1)">' + i + '<code></code></a>');
  };
  return html0.join('');
},
  updataYL:function(){
    $.get(WebAppUrl.FX,{lid:10003,type:1,location:1},function(data){var data=eval("("+data+")");
      var i=0,d=data.data.miss.split(','),len=d.length,o=cp2y.buy.getBall();
      for(i;i<len;i++){
        o.eq(i).children("code").html(d[i]);
      }
    });
    $.get(WebAppUrl.FX,{lid:10003,type:1,location:2},function(data){var data=eval("("+data+")");
      var i=0,d=data.data.miss.split(','),len=d.length,o=cp2y.buy.getBall();
      for(i;i<len;i++){
        o.eq(i+10).children("code").html(d[i]);
      }
    });
    $.get(WebAppUrl.FX,{lid:10003,type:1,location:3},function(data){var data=eval("("+data+")");
      var i=0,d=data.data.miss.split(','),len=d.length,o=cp2y.buy.getBall();
      for(i;i<len;i++){
        o.eq(i+20).children("code").html(d[i]);
      }
    });
    $.get(WebAppUrl.FX,{lid:10004,type:1,location:4},function(data){var data=eval("("+data+")");
      var i=0,d=data.data.miss.split(','),len=d.length,o=cp2y.buy.getBall();
      for(i;i<len;i++){
        o.eq(i+30).children("code").html(d[i]);
      }
    });
    $.get(WebAppUrl.FX,{lid:10004,type:1,location:5},function(data){var data=eval("("+data+")");
      var i=0,d=data.data.miss.split(','),len=d.length,o=cp2y.buy.getBall();
      for(i;i<len;i++){
        o.eq(i+40).children("code").html(d[i]);
      }
    });
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
    rb = ball.random({len : this.num});
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
      rb1.push(o.eq(i).attr("data"));
    };
    if (o.eq(i).hasClass("rb2")) {
      rb2.push(o.eq(i).attr("data"));
    };
    if (o.eq(i).hasClass("rb3")) {
      rb3.push(o.eq(i).attr("data"));
    };
    if (o.eq(i).hasClass("rb4")) {
      rb4.push(o.eq(i).attr("data"));
    };
    if (o.eq(i).hasClass("rb5")) {
      rb5.push(o.eq(i).attr("data"));
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
  var o = '<li data_input="' + this.input + '" data_bets="' + units + '" data_code="' + rb5.join('') + '-' + rb4.join('') + '-' + rb3.join('') + '-' + rb2.join('') + '-' + rb1.join('') + '">' + '<div><a class="r">' + rb5.join('</a><a class="r">') + '</a>-<a class="r">' + rb4.join('</a><a class="r">') + '</a>-<a class="r">' + rb3.join('</a><a class="r">') + '</a>-<a class="r">' + rb2.join('</a><a class="r">') + '</a>-<a class="r">' + rb1.join('</a><a class="r">') + '</a></div>' + '<p>' + this.playType + '：' + units + '注' + units * 2 + '元</p>' + '<i class="delI" onclick="cp2y.buy.del(this)"></i></li>';
  this.addRecord(o);
  this.clear();
}
};