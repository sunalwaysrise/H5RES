/**
* @author luwenbin@live.com
*/
var _={
  bt:10060,
  playName:"江西11选5",
  playTypes:function(){
    var html=[];
    html.push('<i>普通</i>');
    html.push('<b data="a1" data2="任选2">任选2</b>');
    html.push('<b data="a8" data2="任选3">任选3<em>奖</em></b>');
    html.push('<b data="a17" data2="任选4">任选4</b>');
    html.push('<b data="a19" data2="任选5">任选5<em>奖</em></b>');
    html.push('<b data="a21" data2="任选6">任选6</b>');
    html.push('<b data="a23" data2="任选7">任选7<em>奖</em></b>');
    html.push('<b data="a25" data2="任选8">任选8</b>');
    html.push('<span></span>');
    html.push('<b data="a0" data2="前1直选">前1直选</b>');
    //html.push('<b data="a3"  data2="前2直选">前2直选</b>');
    //html.push('<b data="a10"  data2="前3直选">前3直选</b>');
    html.push('<b data2="前2直选" data="a4">前2直选</b>');
    html.push('<b data2="前3直选" data="a11">前3直选</b>');
    html.push('<span></span>');
    html.push('<b data="a6"  data2="前2组选">前2组选</b>');
    html.push('<b data="a14" class="onn" data2="前3组选">前3组选<em>奖</em></b>');
    html.push('<i>胆拖</i>');
    html.push('<b data="a2"  data2="任选2胆拖">任选2</b>');
    html.push('<b data="a9"  data2="任选3胆拖">任选3<em>奖</em></b>');
    html.push('<b data="a18"  data2="任选4胆拖">任选4</b>');
    html.push('<b data="a20"  data2="任选5胆拖">任选5<em>奖</em></b>');
    html.push('<b data="a22"  data2="任选6胆拖">任选6</b>');
    html.push('<b data="a24"  data2="任选7胆拖">任选7<em>奖</em></b>');
    html.push('<b data="a26"  data2="任选8胆拖">任选8</b>');
    html.push('<span></span>');
    html.push('<b data="a5"  data2="前2直选胆拖">前2直选</b>');
    html.push('<b data="a12"  data2="前3直选胆拖">前3直选</b>');
    html.push('<span></span>');
    html.push('<b data="a7" data2="前2组选胆拖">前2组选</b>');
    html.push('<b data="a15" data2="前3组选胆拖">前3组选<em>奖</em></b>');
    html.push('<i>其他</i>');

    //html.push('<b class="b11" data="a13">前3直选和值</b>');
    //html.push('<b class="b11" data="a16">前3组选和值</b>');
    return html.join('');
  }
};
_.a0={
  hasOutGet:false,
  playName:_.playName,
  playType:"前1直选",
  input:"onePoly",
  num:1,
  bet:function(){
    var html0=[],i=1;
    html0.push('<p>至少选择1个号码</p>');
    for(i;i<12;i++){
      html0.push('<a class="gb" onclick="cp2y.buy.select(this)">'+i.addZero()+'<code></code></a>');
    }
    return html0.join('');
  },
  updataYL:function(){
    $.get(WebAppUrl.FX,{lid:10130,type:1,location:1},function(data){
      var i=0,d=data.data.miss.split(','),len=d.length,o=cp2y.buy.getBall();
      for(i;i<len;i++){
        o.eq(i).children("code").html(d[i]);
      }
    });
  },
  select:function(_this){
      $(_this).toggleClass("rb");
      cp2y.buy.count();
  },
  count:function(){
      var rb=[],i=0,o=this.getBall(),len=o.length,units,s=1;
      for(i;i<len;i++){
          if(o.eq(i).hasClass("rb")){
              rb.push(o.eq(i));
          }
      }
      if(rb.length>0){s=3;}
      this.setClear(s);
      units= cp2y.util.comp(rb.length,this.num);
      dom.CurBets.html(units);
      dom.CurMoney.html(units*2);
  },
  random:function(u){
      var i=1,o=[],ball=[],rb=[];
      for(i;i<12;i++){ball.push(i.addZero());}
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
      this.step2();
  }
};
_.a1={
  hasOutGet:_.a0.hasOutGet,
  playName:_.playName,
  playType:"任选2",
  input:"twoPoly",
  num:2,
  bet:function(){
    var html0=[],i=1;
    html0.push('<p>至少选择'+cp2y.buy.num+'个号码</p>');
    for(i;i<12;i++){
      html0.push('<a class="gb" onclick="cp2y.buy.select(this)">'+i.addZero()+'<code></code></a>');
    }
    return html0.join('');
  },
  updataYL:function(){
    $.get(WebAppUrl.FX,{lid:10129},function(data){
      var i=0,d=data.data.miss.split(','),len=d.length,o=cp2y.buy.getBall();
      for(i;i<len;i++){
        o.eq(i).children("code").html(d[i]);
      }
    });
  },
  select:_.a0.select,
  count:_.a0.count,
  random:_.a0.random,
  addContent:_.a0.addContent
};
_.a2={
  hasOutGet:_.a0.hasOutGet,
  playName:_.playName,
  playType:"任选2胆拖",
  input:"twoDraw",
  num:2,
  bet:function(){
    var html0=[],i=1;
    if(cp2y.buy.num==2){
      html0.push('<p>胆码(选'+(cp2y.buy.num-1)+'个)</p>');
    }else{
      html0.push('<p>胆码(选1-'+(cp2y.buy.num-1)+'个)</p>');
    }
    for(i;i<12;i++){
      html0.push('<a class="gb" onclick="cp2y.buy.select(this,1)">'+i.addZero()+'<code></code></a>');
    }
    i=1;
    html0.push('<p>拖码(胆+拖≥'+(cp2y.buy.num+1)+'个)</p>');
    for(i;i<12;i++){
      html0.push('<a class="gb2" onclick="cp2y.buy.select(this,2)">'+i.addZero()+'<code></code></a>');
    }
    return html0.join('');
  },
  updataYL:function(){
    $.get(WebAppUrl.FX,{lid:10129},function(data){
      var i=0,d=data.data.miss.split(','),len=d.length,o=cp2y.buy.getBall();
      for(i;i<len;i++){
        o.eq(i).children("code").html(d[i]);
        o.eq(i+11).children("code").html(d[i]);
      }
    });
  },
  select:function(_this,b){
    if(b==1){
      if(!$(_this).hasClass("rb")){
        if($(".rb").size()>0){
          return cp2y.dialog.alert("最多1个胆码");
        }else{
          $(_this).addClass("rb");
          dom.c.children("a").eq($(_this).index()+10).removeClass("bb");
        }
      }else{
        $(_this).removeClass("rb");
      }
    }else if(b==2){
      $(_this).toggleClass("bb");
      dom.c.children("a").eq($(_this).index()-13).removeClass("rb");
    }
    cp2y.buy.count();
  },
  count:function(){
    var rb=[],bb=[],i=0,o=this.getBall(),len=o.length,units=0,s=1;
    for(i;i<len;i++){
      if(o.eq(i).hasClass("rb")){
        rb.push(o.eq(i));
      }else if(o.eq(i).hasClass("bb")){
        bb.push(o.eq(i));
      }
    }
    if(rb.length==0 || bb.length==0){
      units=0;
    }else{
      units = cp2y.util.comp(bb.length,this.num-rb.length);
    }
    if(rb.length>0 || bb.length>0){s=3;}
    this.setClear(s);
    dom.CurBets.html(units);
    dom.CurMoney.html('￥'+(units*2));
  },
  random:function(u){
    var i=1,o=[],ball=[],t=[],d;
    for(i;i<12;i++){ball.push(i.addZero());}
    i=0;
    for(i;i<u;i++){
      t=ball.random({len:this.num});
      d=t.pop();
      o.push('<li data_input="'+this.input+'" data_bets="1" data_code="'+d+'#'+t.join(',')+'">');
      o.push('<div>(<a class="r">'+d+'</a>)<a class="b">'+t.join('</a><a class="b">')+'</a></div>');
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
          if(d.length>0 || t.length>0){
              return cp2y.dialog.alert('您选的方案不能构成一注');
          }else{
              return cp2y.buy.random(1);
          }
      }
      var o='<li data_input="'+this.input+'" data_bets="'+units+'" data_code="'+d.join(',')+'#'+t.join(',')+'">'+
          '<div>(<a class="r">'+d.join('</a><a class="r">')+'</a>)<a class="b">'+t.join('</a><a class="b">')+'</a></div>'+
          '<p>'+this.playType+'：'+units+'注'+units*2+'元</p>'+
          '<i class="delI" onclick="cp2y.buy.del(this)"></i></li>';
      this.addRecord(o);
      this.clear();
      this.step2();
  }
};
_.a3={
  hasOutGet:_.a0.hasOutGet,
  playName:_.playName,
  playType:"前2直选",
  input:"twoDirectPoly",
  num:2,
  bet:function(){
      var html0=[],i=1;
      html0.push('<p>至少选择2个号码</p>');
      for(i;i<12;i++){
          html0.push('<a class="gb" onclick="cp2y.buy.select(this)">'+i.addZero()+'<code></code></a>');
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
      if(rb.length>0 ){s=3;}
      this.setClear(s);
      var units = cp2y.util.comp(rb.length,this.num)*2;
      dom.CurBets.html(units);
      dom.CurMoney.html(units*2);
  },
  random:function(u){
      var i=1,o=[],ball=[],rb=[];
      for(i;i<12;i++){ball.push(i.addZero());}
      i=0;
      for(i;i<u;i++){
          rb=ball.random({len:this.num});
          o.push('<li data_input="'+this.input+'" data_bets="2" data_code="'+rb.join(",")+'">');
          o.push('<div><a class="r">'+rb.join('</a><a class="b">')+'</a></div>');
          o.push('<p>'+this.playType+'：2注4元</p>');
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
      var units = cp2y.util.comp(rb.length,this.num)*2;
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
      this.step2();
  },
  updataYL:function(){
    $.get(WebAppUrl.FX,{lid:10131},function(data){
      var i=0,d=data.data.miss.split(','),len=d.length,o=cp2y.buy.getBall();
      for(i;i<len;i++){
        o.eq(i).children("code").html(d[i]);
      }
    });
  }
};
_.a4={
  hasOutGet:true,
  outGet:function(){
    var r=cp2y.util.getArgs2('w1'),r2=cp2y.util.getArgs2('w2'),i=0,o=$('.gb'),o2=$('.gb2');
    if(r){
      r=r.split(',');
      for(i;i<11;i++){
        if(r.indexOf(Number(o.eq(i).html()))!=-1){
          o.eq(i).addClass('rb');
        }
      }
    }
    i=0;
    if(r2){
      r2=r2.split(',');
      for(i;i<11;i++){
        if(r2.indexOf(Number(o2.eq(i).html()))!=-1){
          o2.eq(i).addClass('bb');
        }
      }
    }
  },
  playName:_.playName,
  playType:"前2直选定位",
  input:"twoDirect",
  num:2,
  bet:function(){
      var html0=[],i=1;
      html0.push('<p>选择第一位</p>');
      for(i;i<12;i++){
          html0.push('<a class="gb" onclick="cp2y.buy.select(this,1)">'+i.addZero()+'<code></code></a>');
      }
      i=1;
      html0.push('<p>选择第二位</p>');
      for(i;i<12;i++){
          html0.push('<a class="gb2" onclick="cp2y.buy.select(this,2)">'+i.addZero()+'<code></code></a>');
      }
      return html0.join('');
  },
  select:function(_this,i){
      if(i==1){
          $(_this).toggleClass("rb");
      }else if(i==2){
          $(_this).toggleClass("bb");
      }
      cp2y.buy.count();
  },
  count:function(){
      var a1=[],a2=[],i=0,o=this.getBall(),len=o.length,units = 0,s=1;
      for(i;i<len;i++){
          if(o.eq(i).hasClass("rb")){
              a1.push(o.eq(i).html());
          }else if(o.eq(i).hasClass("bb")){
              a2.push(o.eq(i).html());
          }
      }
      if(a1.length>0 || a2.length>0){s=3;}
      this.setClear(s);
      if(a1.length==0 || a2.length==0){
          units=0;
      }else{
          for(var a=0;a<a1.length;a++){
              for(var b=0;b<a2.length;b++){
                  if(a1[a]!=a2[b]){units++};
              }
          }
      }
      dom.CurBets.html(units);
      dom.CurMoney.html(units*2);
  },
  random:function(u){
      var i=1,o=[],ball=[],t=[],d;
      for(i;i<12;i++){ball.push(i.addZero());}
      i=0;
      for(i;i<u;i++){
          t=ball.random({len:this.num});
          d=t.pop();
          o.push('<li data_input="'+this.input+'" data_bets="1" data_code="'+d+'-'+t.join(' ')+'">');
          o.push('<div>(<a class="r">'+d+'</a>)<a class="b">'+t.join('</a><a class="b">')+'</a></div>');
          o.push('<p>'+this.playType+'：1注2元</p>');
          o.push('<i class="delI" onclick="cp2y.buy.del(this)"></i></li>');
      }
      this.addRecord(o.join(''));
  },
  addContent:function(){
      var a1=[],a2=[],i=0,o=this.getBall(),len=o.length,units = 0;;
      for(i;i<len;i++){
          if(o.eq(i).hasClass("rb")){
              a1.push(o.eq(i).html());
          }else if(o.eq(i).hasClass("bb")){
              a2.push(o.eq(i).html());
          }
      }
      this.setClear(a1.length,0);
      if(a1.length==0 || a2.length==0){
          units=0;
      }else{
          var a=0,a1l=a1.length;
          for(a;a<a1l;a++){
              var b=0,a2l=a2.length;
              for(b;b<a2l;b++){
                  if(a1[a]!=a2[b]){units++;};
              }
          }
      }
      if(units==0){
          if(a1.length>0 || a2.length>0){
              return cp2y.dialog.alert('您选的方案不能构成一注');
          }else{
              return cp2y.buy.random(1);
          }
      }
      var o='<li data_input="'+this.input+'" data_bets="'+units+'" data_code="'+a1.join(' ')+'-'+a2.join(' ')+'">'+
          '<div>（<a class="r">'+a1.join('</a><a class="r">')+'</a>）<a class="b">'+a2.join('</a><a class="b">')+'</a></div>'+
          '<p>'+this.playType+'：'+units+'注'+units*2+'元</p>'+
          '<i class="delI" onclick="cp2y.buy.del(this)"></i></li>';
      this.addRecord(o);
      this.clear();
      this.step2();
  },
  updataYL:function(){
    $.get(WebAppUrl.FX,{lid:10131,type:1,location:1},function(data){
      var i=0,d=data.data.miss.split(','),len=d.length,o=cp2y.buy.getBall();
      for(i;i<len;i++){
        o.eq(i).children("code").html(d[i]);
      }
    });
    $.get(WebAppUrl.FX,{lid:10131,type:1,location:2},function(data){
      var i=0,d=data.data.miss.split(','),len=d.length,o=cp2y.buy.getBall();
      for(i;i<len;i++){
        o.eq(i+11).children("code").html(d[i]);
      }
    });

  }
};
_.a5={
  hasOutGet:_.a0.hasOutGet,
  playName:_.playName,
  playType:"前2直选胆拖",
  input:"twoDirectDraw",
  num:2,
  bet:_.a2.bet,
  select:function(_this,b){
      if(b==1){
          if(!$(_this).hasClass("rb")){
              if($(".rb").size()>0){
                  return cp2y.dialog.alert("最多1个胆码");
              }else{
                  $(_this).addClass("rb");
                  dom.c.children("a").eq($(_this).index()+10).removeClass("bb");
              }
          }else{
              $(_this).removeClass("rb");
          }
      }else if(b==2){
          $(_this).toggleClass("bb");
          dom.c.children("a").eq($(_this).index()-13).removeClass("rb");
      }
      cp2y.buy.count();
  },
  count:function(){
      var rb=[],bb=[],i=0,o=this.getBall(),len=o.length,units,s=1;
      for(i;i<len;i++){
          if(o.eq(i).hasClass("rb")){
              rb.push(o.eq(i));
          }else if(o.eq(i).hasClass("bb")){
              bb.push(o.eq(i));
          }
      }
      if(rb.length==0 || bb.length==0){
          units=0;
      }else{
          units = cp2y.util.comp(bb.length,this.num-rb.length)*2;
      }
      if(rb.length>0 || bb.length>0){s=3;}
      this.setClear(s);
      dom.CurBets.html(units);
      dom.CurMoney.html('￥'+(units*2));
  },
  random:function(u){
      var i=1,o=[],ball=[],d=[],t=[];
      for(i;i<12;i++){ball.push(i.addZero());}
      i=0;
      for(i;i<u;i++){
          t=ball.random({len:this.num});
          d=t.pop();
          o.push('<li data_input="'+this.input+'" data_bets="'+this.num+'" data_code="'+d+'#'+t.join(',')+'">');
          o.push('<div>(<a class="r">'+d+'</a>)<a class="b">'+t.join('</a><a class="b">')+'</a></div>');
          o.push('<p>'+this.playType+'：'+this.num+'注'+(this.num*2)+'元</p>');
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
      var units = cp2y.util.comp(t.length,this.num-d.length)*2;
      if(units==0){
          if(d.length>0||t.length>0){
              return cp2y.dialog.alert('您选的方案不能构成一注');
          }else{
              return cp2y.buy.random(1);
          }
      }
      var o='<li data_input="'+this.input+'" data_bets="'+units+'" data_code="'+d.join(',')+'#'+t.join(',')+'">'+
          '<div>(<a class="r">'+d.join('</a><a class="r">')+'</a>)<a class="b">'+t.join('</a><a class="b">')+'</a></div>'+
          '<p>'+this.playType+'：'+units+'注'+units*2+'元</p>'+
          '<i class="delI" onclick="cp2y.buy.del(this)"></i></li>';
      this.addRecord(o);
      this.clear();
      this.step2();
  },
  updataYL:function(){
  $.get(WebAppUrl.FX,{lid:10131},function(data){
    var i=0,d=data.data.miss.split(','),len=d.length,o=cp2y.buy.getBall();
    for(i;i<len;i++){
      o.eq(i).children("code").html(d[i]);
      o.eq(i+11).children("code").html(d[i]);
    }
  });
  }
};
_.a6={
  hasOutGet:true,
  outGet:function(){
    var r=cp2y.util.getArgs2('w1'),i=0,o=$('.gb');
    if(r){
      r=r.split(',');
      for(i;i<11;i++){
        if(r.indexOf(Number(o.eq(i).html()))!=-1){
          o.eq(i).addClass('rb');
        }
      }
    }
  },
  playName:_.playName,
  playType:"前2组选",
  input:"twoGroupPoly",
  num:2,
  bet:function(){
      var html0=[],i=1;
      html0.push('<p>至少选择2个号码</p>');
      for(i;i<12;i++){
          html0.push('<a class="gb" onclick="cp2y.buy.select(this)">'+i.addZero()+'<code></code></a>');
      }
      return html0.join('');
  },
  select:_.a1.select,
  count:_.a1.count,
  random:_.a1.random,
  addContent:_.a1.addContent,
  updataYL:_.a3.updataYL
};
_.a7={
  hasOutGet:_.a0.hasOutGet,
  playName:_.playName,
  playType:"前2组选胆拖",
  input:"twoGroupDraw",
  num:2,
  bet:_.a2.bet,
  select:_.a5.select,
  count:_.a2.count,
  random:_.a2.random,
  addContent:_.a2.addContent ,
  updataYL:_.a5.updataYL
};
_.a8={
  hasOutGet:_.a0.hasOutGet,
  playName:_.playName,
  playType:"任选3",
  input:"threePoly",
  updataYL: _.a1.updataYL,
  num:3,
  bet:_.a1.bet,
  select:_.a1.select,
  count:_.a1.count,
  random:_.a1.random,
  addContent:_.a1.addContent
};
_.a9={
  hasOutGet:_.a0.hasOutGet,
  playName:_.playName,
  playType:"任选3胆拖",
  input:"threeDraw",
  updataYL: _.a2.updataYL,
  num:3,
  bet:_.a2.bet,
  select:function(_this,b){
      if(b==1){
          if(!$(_this).hasClass("rb")){
              if($(".rb").size()>1){
                  return cp2y.dialog.alert("最多2个胆码");
              }else{
                  $(_this).addClass("rb");
                  dom.c.children("a").eq($(_this).index()+10).removeClass("bb");
              }
          }else{
              $(_this).removeClass("rb");
          }
      }else if(b==2){
          $(_this).toggleClass("bb");
          dom.c.children("a").eq($(_this).index()-13).removeClass("rb");
      }
      cp2y.buy.count();
  },
  count:_.a2.count,
  random:_.a2.random,
  addContent:_.a2.addContent
};
_.a10={
  hasOutGet:_.a0.hasOutGet,
  playName:_.playName,
  playType:"前3直选",
  input:"threeDirectPoly",
  num:3,
  updataYL: _.a1.updataYL,
  bet:function(){
      var html0=[],i=1;
      html0.push('<p>至少选择3个号码</p>');
      for(i;i<12;i++){
          html0.push('<a class="gb" onclick="cp2y.buy.select(this)">'+i.addZero()+'<code></code></a>');
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
      var units = cp2y.util.comp(rb.length,this.num)*6;
      dom.CurBets.html(units);
      dom.CurMoney.html(units*2);
  },
  random:_.a0.random,
  addContent:function(){
      var rb=[],i=0,o=this.getBall(),len=o.length;
      for(i;i<len;i++){
          if(o.eq(i).hasClass("rb")){
              rb.push(o.eq(i).html());
          }
      }
      var units = cp2y.util.comp(rb.length,this.num)*6;
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
      this.step2();
  }
};
_.a11={
  hasOutGet:true,
  outGet:function(){
    var r=cp2y.util.getArgs2('w1'),r2=cp2y.util.getArgs2('w2'),r3=cp2y.util.getArgs2('w3'),i=0,o=$('.gb'),o2=$('.gb2'),o3=$('.gb3');
    if(r){
      r=r.split(',');
      for(i;i<11;i++){
        if(r.indexOf(Number(o.eq(i).html()))!=-1){
          o.eq(i).addClass('rb');
        }
      }
    }
    i=0;
    if(r2){
      r2=r2.split(',');
      for(i;i<11;i++){
        if(r2.indexOf(Number(o2.eq(i).html()))!=-1){
          o2.eq(i).addClass('bb');
        }
      }
    }
    i=0;
    if(r3){
      r3=r3.split(',');
      for(i;i<11;i++){
        if(r3.indexOf(Number(o3.eq(i).html()))!=-1){
          o3.eq(i).addClass('yb');
        }
      }
    }
  },
  playName:_.playName,
  playType:"前3直选定位",
  input:"threeDirect",
  num:3,
  updataYL:function(){
    $.get(WebAppUrl.FX,{lid:10130,type:1,location:1},function(data){
      var i=0,d=data.data.miss.split(','),len=d.length,o=cp2y.buy.getBall();
      for(i;i<len;i++){
        o.eq(i).children("code").html(d[i]);
      }
    });
    $.get(WebAppUrl.FX,{lid:10130,type:1,location:2},function(data){
      var i=0,d=data.data.miss.split(','),len=d.length,o=cp2y.buy.getBall();
      for(i;i<len;i++){
        o.eq(i+11).children("code").html(d[i]);
      }
    });
    $.get(WebAppUrl.FX,{lid:10130,type:1,location:3},function(data){
      var i=0,d=data.data.miss.split(','),len=d.length,o=cp2y.buy.getBall();
      for(i;i<len;i++){
        o.eq(i+22).children("code").html(d[i]);
      }
    });
  },
  bet:function(){
      var html0=[],i=1,ilen=12;
      html0.push('<p>第一位</p>');
      for(i;i<ilen;i++){
          html0.push('<a class="gb" onclick="cp2y.buy.select(this,1)">'+i.addZero()+'<code></code></a>');
      }
      i=1;
      html0.push('<p>第二位</p>');
      for(i;i<ilen;i++){
          html0.push('<a class="gb2" onclick="cp2y.buy.select(this,2)">'+i.addZero()+'<code></code></a>');
      }
      i=1;
      html0.push('<p>第三位</p>');
      for(i;i<ilen;i++){
          html0.push('<a class="gb3" onclick="cp2y.buy.select(this,3)">'+i.addZero()+'<code></code></a>');
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
  random:function(u){
      var i=1,o=[],ball=[],rb=[];
      for(i;i<12;i++){
          ball.push(i.addZero());
      }
      i=0;
      for(i;i<u;i++){
          rb=ball.random({len:this.num});
          o.push('<li data_input="'+this.input+'" data_bets="1" data_code="'+rb.join('-')+'">');
          o.push('<div><a class="r">'+rb.join('</a><a class="r">')+'</a></div>');
          o.push('<p>'+this.playType+'：1注2元</p>');
          o.push('<i class="delI" onclick="cp2y.buy.del(this)"></i></li>');
      }
      this.addRecord(o.join(''));
  },
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
              return cp2y.dialog.alert('您选的方案不能构成一注');
          }else{
              return cp2y.buy.random(1);
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
          '<div>(<a class="r">'+a1.join('</a><a class="r">')+'</a>)(<a class="b">'+a2.join('</a><a class="b">')+'</a>)(<a class="y">'+a3.join('</a><a class="y">')+'</a>)</div>'+
          '<p>'+this.playType+'：'+units+'注'+units*2+'元</p>'+
          '<i class="delI" onclick="cp2y.buy.del(this)"></i></li>';
      this.addRecord(o);
      this.clear();
      this.step2();
  }
};
_.a12={
  hasOutGet:_.a0.hasOutGet,
  playName:_.playName,
  playType:"前3直选胆拖",
  updataYL:_.a2.updataYL,
  input:"threeDirectDraw",
  num:3,
  bet:_.a2.bet,
  select:function(_this,b){
      if(b==1){
          if(!$(_this).hasClass("rb")){
              if($(".rb").size()>1){
                  return cp2y.dialog.alert("最多2个胆码");
              }else{
                  $(_this).addClass("rb");
                  dom.c.children("a").eq($(_this).index()+10).removeClass("bb");
              }
          }else{
              $(_this).removeClass("rb");
          }
      }else if(b==2){
          $(_this).toggleClass("bb");
          dom.c.children("a").eq($(_this).index()-13).removeClass("rb");
      }
      cp2y.buy.count();
  },
  count:function(){
      var rb=[],bb=[],i=0,o=this.getBall(),len=o.length,units=0,s=1;
      for(i;i<len;i++){
          if(o.eq(i).hasClass("rb")){
              rb.push(o.eq(i));
          }else if(o.eq(i).hasClass("bb")){
              bb.push(o.eq(i));
          }
      }
      if(rb.length==0 || bb.length==0){
          units=0;
      }else{
          units = cp2y.util.comp(bb.length,this.num-rb.length)*6;
      }
      if(rb.length>0||bb.length>0){s=3;}
      this.setClear(s);
      dom.CurBets.html(units);
      dom.CurMoney.html('￥'+(units*2));
  },
  random:function(u){
      var i=1,o=[],ball=[],d=[],t=[];
      for(i;i<12;i++){ball.push(i.addZero());}
      i=0;
      for(i;i<u;i++){
          t=ball.random({len:this.num});
          d=t.pop();
          o.push('<li data_input="'+this.input+'" data_bets="'+(this.num*2)+'" data_code="'+d+'#'+t.join(',')+'">');
          o.push('<div>(<a class="r">'+d+'</a>)<a class="b">'+t.join('</a><a class="b">')+'</a></div>');
          o.push('<p>'+this.playType+'：'+(this.num*2)+'注'+(this.num*4)+'元</p>');
          o.push('<i class="delI" onclick="cp2y.buy.del(this)"></i></li>');
      }
      this.addRecord(o.join(''));
  },
  addContent:function(){
      var rb=[],bb=[],i=0,o=this.getBall(),len=o.length;
      for(i;i<len;i++){
          if(o.eq(i).hasClass("rb")){
              rb.push(o.eq(i).html());
          }else if(o.eq(i).hasClass("bb")){
              bb.push(o.eq(i).html());
          }
      }
      var units = cp2y.util.comp(bb.length,this.num-rb.length)*6;
      if(units==0){
          if(rb.length>0 || bb.length>0){
              return cp2y.dialog.alert('您选的方案不能构成一注');
          }else{
              return cp2y.buy.random(1);
          }
      }
      var o='<li data_input="'+this.input+'" data_bets="'+units+'" data_code="'+rb.join(',')+'#'+bb.join(',')+'">'+
          '<div>(<a class="r">'+rb.join('</a><a class="r">')+'</a>)<a class="b">'+bb.join('</a><a class="b">')+'</a></div>'+
          '<p>'+this.playType+'：'+units+'注'+units*2+'元</p>'+
          '<i class="delI" onclick="cp2y.buy.del(this)"></i></li>';
      this.addRecord(o);
      this.clear();
  }
};
_.a13={
  hasOutGet:_.a0.hasOutGet,
  playName:_.playName,
  playType:"前3直选和值",
  input:"threeDirectSum",
  num:3,
  units:[0,0,0,0,0,0,6,6,12,18,24,30,42,48,60,66,72,72,78,72,72,66,60,48,42,30,24,18,12,6,6],
  bet:function(){
      var html0=[],i=6;
      html0.push('<p></p>');
      for(i;i<31;i++){
          html0.push('<a class="gb" onclick="cp2y.buy.select(this)">'+i+'<code></code></a>');
      }
      return html0.join('');
  },
  select:function(_this){
      $(_this).toggleClass("rb");
      cp2y.buy.count();
  },
  updataYL:function(){
    $.get(WebAppUrl.FX,{url:encodeURI('http://fx.cp2y.com/call/miss_sum.jsp?lid=10130')},function(data){
      var i=0,d=data.data.miss.split(','),len=d.length,o=cp2y.buy.getBall();
      for(i;i<len;i++){
        o.eq(i).children("code").html(d[i+3]);
      }
    });
  },
  count:function(){
      var rb=[],i=0,o=this.getBall(),len=o.length,units=0,s=1;
      for(i;i<len;i++){
          if(o.eq(i).hasClass("rb")){
              rb.push(o.eq(i).html());
              units+=this.units[o.eq(i).html()];
          }
      }
      if(rb.length>0){s=3;}
      this.setClear(s);
      dom.CurBets.html(units);
      dom.CurMoney.html(units*2);
  },
  random:function(u){
      var i=1,o=[],ball=[],rb=[];
      for(i;i<12;i++){ball.push(i.addZero());}
      i=0;
      for(i;i<u;i++){
          rb=ball.random({len:this.num});
          o.push('<li data_input="'+_.a10.input+'" data_bets="1" data_code="'+rb.join(',')+'">');
          o.push('<div><a class="r">'+rb.join('</a><a class="r">')+'</a></div>');
          o.push('<p>'+_.a10.playType+'：1注2元</p>');
          o.push('<i class="delI" onclick="cp2y.buy.del(this)"></i></li>');
      }
      this.addRecord(o.join(''));
  },
  addContent:function(){
      var rb=[],i=0,o=this.getBall(),len=o.length,units=0;
      for(i;i<len;i++){
          if(o.eq(i).hasClass("rb")){
              rb.push(o.eq(i).html());
              units+=this.units[o.eq(i).html()];
          }
      }
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
_.a14={
  hasOutGet:true,
  outGet:function(){
    var r=cp2y.util.getArgs2('w1'),i=0,o=$('.gb');
    if(r){
      r=r.split(',');
      for(i;i<11;i++){
        if(r.indexOf(Number(o.eq(i).html()))!=-1){
          o.eq(i).addClass('rb');
        }
      }
    }
  },
  playName:_.playName,
  playType:"前3组选",
  input:"threeGroupPoly",
  num:3,
  bet:function(){
    var html0=[],i=1;
    html0.push('<p>至少选择3个号码</p>');
    for(i;i<12;i++){
      html0.push('<a class="gb" onclick="cp2y.buy.select(this)">'+i.addZero()+'<code></code></a>');
    }
    return html0.join('');
  },
  select:_.a0.select,
  count:_.a0.count,
  random:_.a0.random,
  addContent:_.a0.addContent,
  updataYL: function(){
    $.get(WebAppUrl.FX,{lid:10130},function(data){
      var i=0,d=data.data.miss.split(','),len=d.length,o=cp2y.buy.getBall();
      for(i;i<len;i++){
        o.eq(i).children("code").html(d[i]);
      }
    });
  }
};
_.a15={
  hasOutGet:_.a0.hasOutGet,
  playName:_.playName,
  playType:"前3组选胆拖",
  input:"threeGroupDraw",
  updataYL: function(){
    $.get(WebAppUrl.FX,{lid:10130},function(data){
      var i=0,d=data.data.miss.split(','),len=d.length,o=cp2y.buy.getBall();
      for(i;i<len;i++){
        o.eq(i).children("code").html(d[i]);
        o.eq(i+11).children("code").html(d[i]);
      }
    });
  },
  num:3,
  bet:_.a2.bet,
  select:_.a9.select,
  count:_.a2.count,
  random:_.a2.random,
  addContent:_.a2.addContent
};
_.a16={
  hasOutGet:_.a0.hasOutGet,
  playName:_.playName,
  playType:"前3组选和值",
  input:"threeGroupSum",
  updataYL: _.a13.updataYL,
  num:1,
  units:[0,0,0,0,0,0,1,1,2,3,4,5,7,8,10,11,12,12,13,12,12,11,10,8,7,5,4,3,2,1,1],
  bet:_.a13.bet,
  select:_.a13.select,
  count:_.a13.count,
  random:_.a13.random,
  addContent:_.a13.addContent
};
_.a17={
  hasOutGet:_.a0.hasOutGet,
  playName:_.playName,
  playType:"任选4",
  input:"fourPoly",
  num:4,
  updataYL: _.a1.updataYL,
  bet:_.a1.bet,
  select:_.a0.select,
  count:_.a0.count,
  random:_.a0.random,
  addContent:_.a0.addContent
};
_.a19={
  hasOutGet:true,
  outGet:function(){
    var r=cp2y.util.getArgs2('w1'),i=0,o=$('.gb');
    if(r){
        r=r.split(',');
        for(i;i<11;i++){
            if(r.indexOf(Number(o.eq(i).html()))!=-1){
                o.eq(i).addClass('rb');
            }
        }
    }
  },
  playName:_.playName,
  playType:"任选5",
  input:"fivePoly",
  num:5,
  bet:_.a1.bet,
  updataYL: _.a1.updataYL,
  select:_.a0.select,
  count:_.a0.count,
  random:_.a0.random,
  addContent:_.a0.addContent
};
_.a21={
  hasOutGet:_.a0.hasOutGet,
  playName:_.playName,
  playType:"任选6",
  input:"sixPoly",
  updataYL: _.a1.updataYL,
  num:6,
  bet:_.a1.bet,
  select:_.a0.select,
  count:_.a0.count,
  random:_.a0.random,
  addContent:_.a0.addContent
};
_.a23={
  hasOutGet:_.a0.hasOutGet,
  playName:_.playName,
  playType:"任选7",
  updataYL: _.a1.updataYL,
  input:"sevenPoly",
  num:7,
  bet:_.a1.bet,
  select:_.a0.select,
  count:_.a0.count,
  random:_.a0.random,
  addContent:_.a0.addContent
};
_.a25={
  hasOutGet:_.a0.hasOutGet,
  playName:_.playName,
  playType:"任选8",
  input:"eightPoly",
  updataYL: _.a1.updataYL,
  num:8,
  bet:_.a1.bet,
  select:_.a0.select,
  count:_.a0.count,
  random:_.a0.random,
  addContent:_.a0.addContent
};
_.a18={
hasOutGet:_.a0.hasOutGet,
  playName:_.playName,
  playType:"任选4胆拖",
  input:"fourDraw",
  num:4,
  updataYL:_.a2.updataYL,
  bet:_.a2.bet,
  select:function(_this,b){
      if(b==1){
          if(!$(_this).hasClass("rb")){
              if($(".rb").size()>this.num-2){
                  return cp2y.dialog.alert("最多"+(this.num-1)+"个胆码");
              }else{
                  $(_this).addClass("rb");
                  dom.c.children("a").eq($(_this).index()+10).removeClass("bb");
              }
          }else{
              $(_this).removeClass("rb");
          }
      }else if(b==2){
          $(_this).toggleClass("bb");
          dom.c.children("a").eq($(_this).index()-13).removeClass("rb");
      }
      cp2y.buy.count();
  },
  count:_.a2.count,
  random:_.a2.random,
  addContent:_.a2.addContent
};
_.a20={
  hasOutGet:_.a0.hasOutGet,
  playName:_.playName,
  playType:"任选5胆拖",
  input:"fiveDraw",
  updataYL:_.a2.updataYL,
  num:5,
  bet:_.a2.bet,
  select:_.a18.select,
  count:_.a2.count,
  random:_.a2.random,
  addContent:_.a2.addContent
};
_.a22={
  hasOutGet:_.a0.hasOutGet,
  playName:_.playName,
  playType:"任选6胆拖",
  input:"sixDraw",
  updataYL: _.a2.updataYL,
  num:6,
  bet:_.a2.bet,
  select:_.a18.select,
  count:_.a2.count,
  random:_.a2.random,
  addContent:_.a2.addContent
};
_.a24={
  hasOutGet:_.a0.hasOutGet,
  playName:_.playName,
  playType:"任选7胆拖",
  input:"sevenDraw",
  updataYL: _.a2.updataYL,
  num:7,
  bet:_.a2.bet,
  select:_.a18.select,
  count:_.a2.count,
  random:_.a2.random,
  addContent:_.a2.addContent
};
_.a26={
  hasOutGet:_.a0.hasOutGet,
  playName:_.playName,
  playType:"任选8胆拖",
  input:"eightDraw",
  updataYL: _.a2.updataYL,
  num:8,
  bet:_.a2.bet,
  select:_.a18.select,
  count:_.a2.count,
  random:_.a2.random,
  addContent:_.a2.addContent
};

