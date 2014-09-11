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
  bet:function(){
    var html0=[],i=0,A=['A,A','2,2','3,3','4,4','5,5','6,6','7,7','8,8','9,9','10,10','J,J','Q,Q','K,K'];
    html0.push('<p>与开奖任意一个号码相同（不分花色）即中88元</p>');
    for(i;i<13;i++){
      html0.push('<article data='+A[i]+' onclick="cp2y.buy.select(this)"><section class="pk1 pkf1">'+A[i]. replace(',','<br/>')+'</section></article>');
    }
    return html0.join('');
  },
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
    var i=0,o=[],ball=['A,A','2,2','3,3','4,4','5,5','6,6','7,7','8,8','9,9','10,10','J,J','Q,Q','K,K'],rb=[];
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
      if(o.eq(i).hasClass("on")){
        rb.push(o.eq(i).attr("data"));
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
  playName:_.playName,
  playType:"同花",
  input:"same",
  input2:"all",
  num:1,
  bet:function(){
    var html0=[],i=0;
    html0.push('<p>单选：所选花色和开奖的花色都一致即中奖90元</p><div id="pks1">');
    html0.push('<article data="黑桃" onclick="cp2y.buy.select(this)"><section class="pk2_1"></section></article>');
    html0.push('<article data="红桃" onclick="cp2y.buy.select(this)"><section class="pk2_2"></section></article>');
    html0.push('<article data="梅花" onclick="cp2y.buy.select(this)"><section class="pk2_3"></section></article>');
    html0.push('<article data="方块" onclick="cp2y.buy.select(this)"><section class="pk2_4"></section></article>');
    html0.push('</div><p>包选</p>');
    html0.push('<article id="pks2" onclick="cp2y.buy.select(this)"><section class="pk1 pk4_1">同花包选</section></article>');         
    html0.push('</section></article>');
    return html0.join('');
  },
  select:_.a0.select,
  count:_.a0.count,
  random:function(u){
    var i=0,o=[],ball=['黑桃','红桃','梅花','方块'],rb=[];
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
    var rb=[],i=0,o=$("#pks1 article"),len=o.length,units,O='';
    for(i;i<len;i++){
      if(o.eq(i).hasClass("on")){
        rb.push(o.eq(i).attr("data"));
      }
    }
    units = rb.length;
    var o2=$("#pks2"),rb2,units2=0;
    if(o2.hasClass('on')){
      O='<li data_input="'+this.input2+'" data_bets="1" data_code="'+this.playType+'"><div><a class="r">'+this.playType+'</a></div><p>包选：1注2元</p><i class="delI" onclick="cp2y.buy.del(this)"></i></li>';
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
        '<div><a class="r">'+rb.join('</a><a class="r">')+'</a></div>'+
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
  bet:function(){
    var html0=[],i=0;
    html0.push('<p>单选：所选花色和开奖的花色都一致即中奖90元</p><div id="pks1">');
    html0.push('<article data="黑桃" onclick="cp2y.buy.select(this)"><section class="pk3_1"></section></article>');
    html0.push('<article data="红桃" onclick="cp2y.buy.select(this)"><section class="pk3_2"></section></article>');
    html0.push('<article data="梅花" onclick="cp2y.buy.select(this)"><section class="pk3_3"></section></article>');
    html0.push('<article data="方块" onclick="cp2y.buy.select(this)"><section class="pk3_4"></section></article>')
    html0.push('</div><p>包选</p>');
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
  bet:function(){
    var html0=[],i=0,A=['A,2,3','2,3,4','3,4,5','4,5,6','5,6,7','6,7,8','7,8,9','8,9,10','9,10,J','10,J,Q','J,Q,K'];
    html0.push('<p>单选：所选花色和开奖的花色都一致即中奖90元</p><div id="pks1">');
    for(i;i<A.length;i++){
      html0.push('<article data='+A[i]+' onclick="cp2y.buy.select(this)"><section class="pk1 pkf2">'+A[i].replace(',','<br/>').replace(',','<br/>')+'</section></article>');
    }
    html0.push('</div><p>包选</p>');
    html0.push('<article id="pks2" onclick="cp2y.buy.select(this)"><section class="pk1 pk4_1">顺子包选</section></article>');
    return html0.join('');
  },
  select:_.a1.select,
  count:_.a1.count,
  random:_.a1.random,
  addContent:_.a1.addContent
};
_.a3={
  playName:_.playName,
  playType:"三条",
  input:"threeSame",
  input2:_.a1.input2,
  num:_.a1.num,
  bet:function(){
    var html0=[],i=0,A=['A,A,A','2,2,2','3,3,3','4,4,4','5,5,5','6,6,6','7,7,7','8,8,8','9,9,9','10,10,10','J,J,J','Q,Q,Q','K,K,K'];
    html0.push('<p>单选：所选花色和开奖的花色都一致即中奖90元</p><div id="pks1">');
    for(i;i<A.length;i++){
      html0.push('<article data='+A[i]+' onclick="cp2y.buy.select(this)"><section class="pk1 pkf2">'+A[i].replace(',','<br/>').replace(',','<br/>')+'</section></article>');
    }
    html0.push('</div><p>包选</p>');
    html0.push('<article id="pks2" onclick="cp2y.buy.select(this)"><section class="pk1 pk4_1">三条包选</section></article>');
    return html0.join('');
  },
  select:_.a1.select,
  count:_.a1.count,
  random:_.a1.random,
  addContent:_.a1.addContent
};
_.a5={
  playName:_.playName,
  playType:"任选一",
  input:"one",
  num:_.a1.num,
  bet:function(){
    var html0=[],i=0,A=['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
    html0.push('<p></p>');
    for(i;i<A.length;i++){
      html0.push('<article data='+A[i]+' onclick="cp2y.buy.select(this)"><section class="pk1 pkf2">'+A[i]+'</section></article>');
    }
    html0.push('</div>');
    return html0.join('');
  },
  select:_.a0.select,
  count:_.a0.count,
  random:_.a0.random,
  addContent:_.a0.addContent
};
_.a6={
  playName:_.playName,
  playType:"任选二",
  input:"two",
  num:2,
  bet:function(){
    var html0=[],i=0,A=['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
    html0.push('<p></p>');
    for(i;i<A.length;i++){
      html0.push('<article data='+A[i]+' onclick="cp2y.buy.select(this)"><section class="pk1 pkf2">'+A[i]+'</section></article>');
    }
    html0.push('</div>');
    return html0.join('');
  },
  select:_.a0.select,
  count:_.a0.count,
  random:_.a0.random,
  addContent:_.a0.addContent
};
_.a8={
  playName:_.playName,
  playType:"任选三",
  input:"three",
  num:3,
  bet:_.a6.bet,
  select:_.a0.select,
  count:_.a0.count,
  random:_.a0.random,
  addContent:_.a0.addContent
};
_.a10={
  playName:_.playName,
  playType:"任选四",
  input:"four",
  num:4,
  bet:_.a6.bet,
  select:_.a0.select,
  count:_.a0.count,
  random:_.a0.random,
  addContent:_.a0.addContent
};
_.a12={
  playName:_.playName,
  playType:"任选五",
  input:"five",
  num:5,
  bet:_.a6.bet,
  select:_.a0.select,
  count:_.a0.count,
  random:_.a0.random,
  addContent:_.a0.addContent
};
_.a14={
  playName:_.playName,
  playType:"任选六",
  input:"six",
  num:6,
  bet:_.a6.bet,
  select:_.a0.select,
  count:_.a0.count,
  random:_.a0.random,
  addContent:_.a0.addContent
};
