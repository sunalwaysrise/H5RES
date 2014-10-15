/**
* @author luwenbin@live.com
*/
var _={
  bt:10082,
  playName:"快乐扑克",
  playTypes:function(){
    var html=[];
    html.push('<i>普通</i>');
    html.push('<b data="a0" data2="对子" class="onn">对子</b>');
    html.push('<b data="a1" data2="同花">同花</b>');
    html.push('<b data="a16" data2="同花顺">同花顺</b>');
    html.push('<b data="a2" data2="顺子">顺子</b>');
    html.push('<b data="a3" data2="三条">三条</b>');
    html.push('<span></span>');
    html.push('<b data="a5" data2="任选一">任选一</b>');
    html.push('<b data="a6" data2="任选二">任选二</b>');
    html.push('<b data="a8" data2="任选三">任选三</b>');
    html.push('<b data="a10" data2="任选四">任选四</b>');
    html.push('<b data="a12"  data2="任选五">任选五</b>');
    html.push('<b data="a14"  data2="任选六">任选六</b>');
    return html.join('');
  }
};
cp2y.buy.getBall=function(){
  return dom.c.find('article');
}
cp2y.buy.clear=function(){
  var o=this.getBall(),i=0,len=o.length;
  for(i;i<len;i++){
    if(o.eq(i).hasClass("on")){
      o.eq(i).removeClass("on");
    }
  };
  this.count();
}
_.a0={
  playName:_.playName,
  playType:"对子",
  input:"pair",
  num:1,
  input2:"all",
  bx:'11',
  bet:function(){
    var html0=[],i=0,A=['A,A','2,2','3,3','4,4','5,5','6,6','7,7','8,8','9,9','10,10','J,J','Q,Q','K,K'];
    html0.push('<p>单选:所选的对子开出(不分花色)即中奖<b>88元</b></p><div id="pks1">');
    for(i;i<13;i++){
      html0.push('<article data='+(i+1).addZero()+' data2='+A[i]+' onclick="cp2y.buy.select(this)"><section class="pk1 pkf1">'+A[i].replace(',','<br/>')+'</section></article>');
    }
    html0.push('</div><p>包选:只要开出对子(任意数字)即中奖<b>7元</b></p>');
    html0.push('<article id="pks2" onclick="cp2y.buy.select(this)"><section class="pk1 pk4_1">对子包选</section></article>');         
    html0.push('</section></article>');
    return html0.join('');
  },
  updataYL:function(){},
  select:function(_this){
    $(_this).toggleClass("on");
    cp2y.buy.count();
  },
  count:function(){
    var rb=[],i=0,o=this.getBall(),len=o.length,units,s=1;
    for(i;i<len;i++){
      if(o.eq(i).hasClass("on")){
        rb.push(o.eq(i));
      }
    }
    if(rb.length>0){s=3;}
    this.setClear(s);
    units=cp2y.util.comp(rb.length,this.num);
    dom.CurBets.html(units);
    dom.CurMoney.html(units*2);
  },
  random:function(u){
    var i=0,o=[],
      ball=['A,A','2,2','3,3','4,4','5,5','6,6','7,7','8,8','9,9','10,10','J,J','Q,Q','K,K'],
      ball2=['01','02','03','04','05','06','07','08','09','10,10','11','12','13'],rb=[],rb2;
    for(i;i<u;i++){
      rb=ball.random({len:this.num});
      rb2=ball2[ball.indexOf(rb)];
      o.push('<li data_input="'+this.input+'" data_bets="1" data_code="'+rb2+'">');
      o.push('<div><a class="r">'+rb.join('</a><a class="r">')+'</a></div>');
      o.push('<p>'+this.playType+'：1注2元</p>');
      o.push('<i class="delI" onclick="cp2y.buy.del(this)"></i></li>');
    }
    this.addRecord(o.join(''));
  },
  addContent:function(){
    var rb=[],rb2=[],i=0,o=$("#pks1 article"),len=o.length,units,O='';
    for(i;i<len;i++){
      if(o.eq(i).hasClass("on")){
        rb.push(o.eq(i).attr("data"));
        rb2.push(o.eq(i).attr("data2"));
      }
    }
    units=cp2y.util.comp(rb.length,this.num);
    var o2=$("#pks2"),rb2,units2=0;
    if(o2.hasClass('on')){
      O+='<li data_input="'+this.input2+'" data_bets="1" data_code="'+this.bx+'"><div><a class="r">'+this.playType+'</a></div><p>包选：1注2元</p><i class="delI" onclick="cp2y.buy.del(this)"></i></li>';
      units2=1;
    }
    if( units==0 && units2==0 ){
      if(rb.length>0){
        return cp2y.dialog.alert('您选的方案不能构成一注');
      }else{
        return cp2y.buy.random(1);
      }
    }
    if(units>0){
      O+='<li data_input="'+this.input+'" data_bets="'+units+'" data_code="'+rb.join(' ')+'">'+
        '<div><a class="r">'+rb2.join('</a><a class="r">')+'</a></div>'+
        '<p>'+this.playType+'：'+units+'注'+units*2+'元</p>'+
        '<i class="delI" onclick="cp2y.buy.del(this)"></i></li>';
    }
    this.addRecord(O);
    this.clear();
    this.step2();
  }
};
_.a1={
  playName:_.playName,
  playType:"同花",
  input:"same",
  input2:"all",
  num:1,
  bx:'07',
  updataYL:function(){},
  bet:function(){
    var html0=[],i=0;
    html0.push('<p>单选:开出的三张牌都是所选的花色即中奖<b>90元</b></p><div id="pks1">');
    html0.push('<article data="01" data2="黑桃" onclick="cp2y.buy.select(this)"><section class="pk2_1"></section></article>');
    html0.push('<article data="02" data2="红桃" onclick="cp2y.buy.select(this)"><section class="pk2_2"></section></article>');
    html0.push('<article data="03" data2="梅花" onclick="cp2y.buy.select(this)"><section class="pk2_3"></section></article>');
    html0.push('<article data="04" data2="方块" onclick="cp2y.buy.select(this)"><section class="pk2_4"></section></article>');
    html0.push('</div><p>包选:任意花色,只要开出同花即中奖<b>22元</b></p>');
    html0.push('<article id="pks2" onclick="cp2y.buy.select(this)"><section class="pk1 pk4_1">同花包选</section></article>');         
    html0.push('</section></article>');
    return html0.join('');
  },
  select:_.a0.select,
  count:_.a0.count,
  random:function(u){
    var i=0,o=[],ball=['黑桃','红桃','梅花','方块'],rb=[],ball2=['01','02','03','04'],rb2;
    for(i;i<u;i++){
      rb=ball.random({len:this.num});
      rb2=ball2[ball.indexOf(rb)];
      o.push('<li data_input="'+this.input+'" data_bets="1" data_code="'+rb2+'">');
      o.push('<div><a class="r">'+rb.join('</a><a class="r">')+'</a></div>');
      o.push('<p>'+this.playType+'：1注2元</p>');
      o.push('<i class="delI" onclick="cp2y.buy.del(this)"></i></li>');
    }
    this.addRecord(o.join(''));
  },
  addContent:function(){
    var rb=[],rb2=[],i=0,o=$("#pks1 article"),len=o.length,units,O='';
    for(i;i<len;i++){
      if(o.eq(i).hasClass("on")){
        rb.push(o.eq(i).attr("data"));
        rb2.push(o.eq(i).attr("data2"));
      }
    }
    units = rb.length;
    var o2=$("#pks2"),rb2,units2=0;
    if(o2.hasClass('on')){
      O='<li data_input="'+this.input2+'" data_bets="1" data_code="'+this.bx+'"><div><a class="r">'+this.playType+'</a></div><p>包选：1注2元</p><i class="delI" onclick="cp2y.buy.del(this)"></i></li>';
      units2=1;
    }
    if( units==0 && units2==0 ){
      if(rb.length>0){
        return cp2y.dialog.alert('您选的方案不能构成一注');
      }else{
        return cp2y.buy.random(1);
      }
    }
    if(units>0){
      O+='<li data_input="'+this.input+'" data_bets="'+units+'" data_code="'+rb.join(',')+'">'+
        '<div><a class="r">'+rb2.join('</a><a class="r">')+'</a></div>'+
        '<p>'+this.playType+'：'+units+'注'+units*2+'元</p>'+
        '<i class="delI" onclick="cp2y.buy.del(this)"></i></li>';
    }
    this.addRecord(O);
    this.clear();
    this.step2();
  }
};
_.a16={
  playName:_.playName,
  playType:"同花顺",
  input:"straightSame",
  input2:_.a1.input2,
  num:_.a1.num,
  bx:'08',
  updataYL:function(){},
  bet:function(){
    var html0=[],i=0;
    html0.push('<p>单选:开出同花顺且为所选花色即中奖<b>2150元</b></p><div id="pks1">');
    html0.push('<article data2="黑桃" data="01" onclick="cp2y.buy.select(this)"><section class="pk3_1"></section></article>');
    html0.push('<article data2="红桃" data="02" onclick="cp2y.buy.select(this)"><section class="pk3_2"></section></article>');
    html0.push('<article data2="梅花" data="03" onclick="cp2y.buy.select(this)"><section class="pk3_3"></section></article>');
    html0.push('<article data2="方块" data="04" onclick="cp2y.buy.select(this)"><section class="pk3_4"></section></article>')
    html0.push('</div><p>包选:任意花色,只要开出同花顺即中奖<b>535元</b></p>');
    html0.push('<article id="pks2" onclick="cp2y.buy.select(this)"><section class="pk1 pk4_1">同花顺包选</section></article>');
    return html0.join('');
  },
  select:_.a1.select,
  count:_.a1.count,
  random:_.a1.random,
  addContent:_.a1.addContent
};
_.a2={
  playName:_.playName,
  playType:"顺子",
  input:"straight",
  input2:_.a1.input2,
  num:_.a1.num,
  bx:'09',
  updataYL:function(){},
  bet:function(){
    var html0=[],i=0,A=['A,2,3','2,3,4','3,4,5','4,5,6','5,6,7','6,7,8','7,8,9','8,9,10','9,10,J','10,J,Q','J,Q,K'];
    html0.push('<p>单选:所选的顺子开出(不分花色)即中奖<b>400元</b></p><div id="pks1">');
    for(i;i<A.length;i++){
      html0.push('<article data='+(i+1).addZero()+' data2='+A[i]+' onclick="cp2y.buy.select(this)"><section class="pk1 pkf2">'+A[i].replace(',','<br/>').replace(',','<br/>')+'</section></article>');
    }
    html0.push('</div><p>包选:任意数字,只要开出顺子即中奖<b>33元</b></p>');
    html0.push('<article id="pks2" onclick="cp2y.buy.select(this)"><section class="pk1 pk4_1">顺子包选</section></article>');
    return html0.join('');
  },
  select:_.a1.select,
  count:_.a1.count,
  random:function(u){
    var i=0,o=[],ball=['A,2,3','2,3,4','3,4,5','4,5,6','5,6,7','6,7,8','7,8,9','8,9,10','9,10,J','10,J,Q','J,Q,K'],rb=[],ball2=['01','02','03','04','05','06','07','08','09','10','11'],rb2;
    for(i;i<u;i++){
      rb=ball.random({len:this.num});
      rb2=ball2[ball.indexOf(rb)];
      o.push('<li data_input="'+this.input+'" data_bets="1" data_code="'+rb2+'">');
      o.push('<div><a class="r">'+rb.join('</a><a class="r">')+'</a></div>');
      o.push('<p>'+this.playType+'：1注2元</p>');
      o.push('<i class="delI" onclick="cp2y.buy.del(this)"></i></li>');
    }
    this.addRecord(o.join(''));
  },
  addContent:_.a1.addContent
};
_.a3={
  playName:_.playName,
  playType:"三条",
  input:"threeSame",
  input2:_.a1.input2,
  num:_.a1.num,
  bx:'10',
  updataYL:function(){},
  bet:function(){
    var html0=[],i=0,A=['A,A,A','2,2,2','3,3,3','4,4,4','5,5,5','6,6,6','7,7,7','8,8,8','9,9,9','10,10,10','J,J,J','Q,Q,Q','K,K,K'];
    html0.push('<p>单选:所选的三条开出(不分花色)即中奖<b>6400元</b></p><div id="pks1">');
    for(i;i<A.length;i++){
      html0.push('<article data='+(i+1).addZero()+' data2='+A[i]+' onclick="cp2y.buy.select(this)"><section class="pk1 pkf2">'+A[i].replace(',','<br/>').replace(',','<br/>')+'</section></article>');
    }
    html0.push('</div><p>包选:任意数字,只要开出三条即中奖<b>500元</b></p>');
    html0.push('<article id="pks2" onclick="cp2y.buy.select(this)"><section class="pk1 pk4_1">三条包选</section></article>');
    return html0.join('');
  },
  select:_.a1.select,
  count:_.a1.count,
  random:function(u){
    var i=0,o=[],ball=['A,A,A','2,2,2','3,3,3','4,4,4','5,5,5','6,6,6','7,7,7','8,8,8','9,9,9','10,10,10','J,J,J','Q,Q,Q','K,K,K'],rb=[],ball2=['01','02','03','04','05','06','07','08','09','10','11','12','13'],rb2;
    for(i;i<u;i++){
      rb=ball.random({len:this.num});
      rb2=ball2[ball.indexOf(rb)];
      o.push('<li data_input="'+this.input+'" data_bets="1" data_code="'+rb2+'">');
      o.push('<div><a class="r">'+rb.join('</a><a class="r">')+'</a></div>');
      o.push('<p>'+this.playType+'：1注2元</p>');
      o.push('<i class="delI" onclick="cp2y.buy.del(this)"></i></li>');
    }
    this.addRecord(o.join(''));
  },
  addContent:_.a1.addContent
};
_.a5={
  playName:_.playName,
  playType:"任选一",
  input:"one",
  num:_.a1.num,
  bet:function(){
    var html0=[],i=0,A=['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
    html0.push('<p>至少选1个号</p><p>猜对任意1个开奖号(不分花色)即中<b>5元</b></p>');
    for(i;i<A.length;i++){
      html0.push('<article data='+(i+1).addZero()+' data2='+A[i]+' onclick="cp2y.buy.select(this)"><section class="pk1 pkf2">'+A[i]+'</section><code></code></article>');
    }
    html0.push('</div>');
    return html0.join('');
  },
  updataYL:function(){
    $.get(WebAppUrl.FX,{lid:10167,type:3,location:0,issues:100},function(data){
      var i=0,d=data.data.miss.split(','),len=d.length,o=cp2y.buy.getBall();
      for(i;i<len;i++){
        o.eq(i).children("code").html(d[i]);
      }
    });
  },
  select:_.a0.select,
  count:function(){
    var rb=[],i=0,o=this.getBall(),len=o.length,units,s=1;
    for(i;i<len;i++){
      if(o.eq(i).hasClass("on")){
        rb.push(o.eq(i));
      }
    }
    if(rb.length>0){s=3;}
    this.setClear(s);
    units=cp2y.util.comp(rb.length,this.num);
    dom.CurBets.html(units);
    dom.CurMoney.html(units*2);
    
    if(units>0){
      if(units<2){ 
        
      }else{  
        var MaxUnits,MinUnits=1;
        if(this.num<3){
          if(units==2){
            MaxUnits=2;
          }
          if(units>=3){
            MaxUnits=3;
          }
        }else{
          var st =this.num-3;
          if(st>0){
            MinUnits=cp2y.util.comp(rb.length-3,st);
          }
          MaxUnits=cp2y.util.comp(rb.length-1,this.num-1);
        }
        console.log('最小中奖注:',MinUnits,'；最多中奖:',MaxUnits);
      }
    }
    
  },
  random:function(u){
    var i=0,o=[],
      ball=['A','2','3','4','5','6','7','8','9','10','J','Q','K'],
      ball2=['01','02','03','04','05','06','07','08','09','10','11','12','13'],rb=[],rb2=[];
    for(i;i<u;i++){
      rb=ball.random({len:this.num});
      var j=0;
      for(j;j<this.num;j++){
        rb2.push(ball2[ball.indexOf(rb[j])]);
      }
      o.push('<li data_input="'+this.input+'" data_bets="1" data_code="'+rb2.join(' ')+'">');
      o.push('<div><a class="r">'+rb.join('</a><a class="r">')+'</a></div>');
      o.push('<p>'+this.playType+'：1注2元</p>');
      o.push('<i class="delI" onclick="cp2y.buy.del(this)"></i></li>');
    }
    this.addRecord(o.join(''));
  },
  addContent:function(){
    var rb=[],rb2=[],i=0,o=this.getBall(),len=o.length,units,O='';
    for(i;i<len;i++){
      if(o.eq(i).hasClass("on")){
        rb.push(o.eq(i).attr("data"));
        rb2.push(o.eq(i).attr("data2"));
      }
    }
    units=cp2y.util.comp(rb.length,this.num);
    if( units==0){
      if(rb.length>0){
        return cp2y.dialog.alert('您选的方案不能构成一注');
      }else{
        return cp2y.buy.random(1);
      }
    }
    O='<li data_input="'+this.input+'" data_bets="'+units+'" data_code="'+rb.join(' ')+'">'+
      '<div><a class="r">'+rb2.join('</a><a class="r">')+'</a></div>'+
      '<p>'+this.playType+'：'+units+'注'+units*2+'元</p>'+
      '<i class="delI" onclick="cp2y.buy.del(this)"></i></li>';
    this.addRecord(O);
    this.clear();
    this.step2();
  }
};
_.a6={
  playName:_.playName,
  playType:"任选二",
  input:"two",
  num:2,
  bet:function(){
    var html0=[],i=0,A=['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
    html0.push('<p>至少选2个号</p><p>猜对任意2个开奖号(不分花色)即中<b>33元</b></p>');
    for(i;i<A.length;i++){
      html0.push('<article data='+(i+1).addZero()+' data2='+A[i]+' onclick="cp2y.buy.select(this)"><section class="pk1 pkf2">'+A[i]+'</section><code></code></article>');
    }
    html0.push('</div>');
    return html0.join('');
  },
  updataYL:_.a5.updataYL,
  select:_.a0.select,
  count:_.a5.count,
  random:_.a5.random,
  addContent:_.a5.addContent
};
_.a8={
  playName:_.playName,
  playType:"任选三",
  input:"three",
  num:3,
  bet:function(){
    var html0=[],i=0,A=['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
    html0.push('<p>至少选3个号</p><p>选号包含开奖号(不分花色)即中<b>116元</b></p>');
    for(i;i<A.length;i++){
      html0.push('<article data='+(i+1).addZero()+' data2='+A[i]+' onclick="cp2y.buy.select(this)"><section class="pk1 pkf2">'+A[i]+'</section><code></code></article>');
    }
    html0.push('</div>');
    return html0.join('');
  },updataYL:_.a5.updataYL,
  select:_.a0.select,
  count:_.a5.count,
  random:_.a5.random,
  addContent:_.a5.addContent
};
_.a10={
  playName:_.playName,
  playType:"任选四",
  input:"four",
  num:4,
  bet:function(){
    var html0=[],i=0,A=['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
    html0.push('<p>至少选4个号</p><p>选号包含开奖号(不分花色)即中<b>46元</b></p>');
    for(i;i<A.length;i++){
      html0.push('<article data='+(i+1).addZero()+' data2='+A[i]+' onclick="cp2y.buy.select(this)"><section class="pk1 pkf2">'+A[i]+'</section><code></code></article>');
    }
    html0.push('</div>');
    return html0.join('');
  },updataYL:_.a5.updataYL,
  select:_.a0.select,
  count:_.a5.count,
  random:_.a5.random,
  addContent:_.a5.addContent
};
_.a12={
  playName:_.playName,
  playType:"任选五",
  input:"five",
  num:5,
  bet:function(){
    var html0=[],i=0,A=['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
    html0.push('<p>至少选5个号</p><p>选号包含开奖号(不分花色)即中<b>22元</b></p>');
    for(i;i<A.length;i++){
      html0.push('<article data='+(i+1).addZero()+' data2='+A[i]+' onclick="cp2y.buy.select(this)"><section class="pk1 pkf2">'+A[i]+'</section><code></code></article>');
    }
    html0.push('</div>');
    return html0.join('');
  },updataYL:_.a5.updataYL,
  select:_.a0.select,
  count:_.a5.count,
  random:_.a5.random,
  addContent:_.a5.addContent
};
_.a14={
  playName:_.playName,
  playType:"任选六",
  input:"six",
  num:6,
  bet:function(){
    var html0=[],i=0,A=['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
    html0.push('<p>至少选6个号</p><p>选号包含开奖号(不分花色)即中<b>12元</b></p>');
    for(i;i<A.length;i++){
      html0.push('<article data='+(i+1).addZero()+' data2='+A[i]+' onclick="cp2y.buy.select(this)"><section class="pk1 pkf2">'+A[i]+'</section><code></code></article>');
    }
    html0.push('</div>');
    return html0.join('');
  },updataYL:_.a5.updataYL,
  select:_.a0.select,
  count:_.a5.count,
  random:_.a5.random,
  addContent:_.a5.addContent
};
