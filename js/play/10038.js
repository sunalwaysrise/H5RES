/**
* @author luwenbin@live.com
*/
var _={
  bt:10038,
  playName:"老时时彩",
  playTypes:function() {
      var html = [];
      html.push('<b data="a0" data2="一星">一星</b>');
      //html.push('<b data="a1" data2="四星">四星</b>');
      html.push('<b data="a2" data2="五星">五星</b>');
      html.push('<b data="a3" data2="五星通选">五星通选</b>');
      html.push('<span></span>');
      html.push('<b data="a4" data2="二星组选">二星组选</b>');
      html.push('<b data="a5" data2="三星组3">三星组3</b>');
      html.push('<b data="a6" data2="三星组6">三星组6</b>');
      html.push('<span></span>');
      //html.push('<b data="a7"  data2="任选1">任选1</b>');
      //html.push('<b data="a8" data2="任选2">任选2</b>');
      html.push('<b data="a9"  data2="大小单双">大小单双</b>');
      //html.push('<span></span>');
      html.push('<b data="a10" data2="二星直选">二星直选</b>');
      html.push('<b data="a11" class="onn" data2="三星直选">三星直选</b>');
      return html.join('');
  }
};
_.a0 = {
  hasOutGet:false,
  playName : _.playName,
  playType : "一星",
  input : "oneStar",
  num : 1,
  numP:"至少选1个号，猜对开奖号码最后1位即中<b>10元</b>",
  bet : function() {
      var html0 = [], i = 0;
      html0.push('<p>'+cp2y.buy.numP+'</p><p class="c8c">号码下方为该号码的当前遗漏</p>');
      for (i; i < 10; i++) {
          html0.push('<a class="gb" data="'+i+'" onclick="cp2y.buy.select(this)">' + i + '<code></code></a>');
      };
      return html0.join('');
  },
  updataYL:function(){
    $.get(WebAppUrl.FX,{lid:10089,type:1,location:5},function(data){var data=eval("("+data+")");
      var i=0,d=data.data.miss.split(','),len=d.length,o=cp2y.buy.getBall();
      for(i;i<len;i++){
        o.eq(i).children("code").html(d[i]);
      }
    });
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
              rb.push(o.eq(i).attr("data"));
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
  hasOutGet:_.a0.hasOutGet,
  playName : _.playName,
  playType : "四星",
  input : "fourStarPoly",
  num : 4,
  bet : function() {
      var html0 = [], i = 0;
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
    $.get(WebAppUrl.FX,{lid:10089,type:1,location:1},function(data){var data=eval("("+data+")");
      var i=0,d=data.data.miss.split(','),len=d.length,o=cp2y.buy.getBall();
      for(i;i<len;i++){
        o.eq(i+30).children("code").html(d[i]);
      }
    });
    $.get(WebAppUrl.FX,{lid:10089,type:1,location:2},function(data){var data=eval("("+data+")");
      var i=0,d=data.data.miss.split(','),len=d.length,o=cp2y.buy.getBall();
      for(i;i<len;i++){
        o.eq(i+20).children("code").html(d[i]);
      }
    });
    $.get(WebAppUrl.FX,{lid:10089,type:1,location:3},function(data){var data=eval("("+data+")");
      var i=0,d=data.data.miss.split(','),len=d.length,o=cp2y.buy.getBall();
      for(i;i<len;i++){
        o.eq(i+10).children("code").html(d[i]);
      }
    });
    $.get(WebAppUrl.FX,{lid:10089,type:1,location:4},function(data){var data=eval("("+data+")");
      var i=0,d=data.data.miss.split(','),len=d.length,o=cp2y.buy.getBall();
      for(i;i<len;i++){
        o.eq(i).children("code").html(d[i]);
      }
    });
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
  hasOutGet:true,
  outGet:function(){
  var r=cp2y.util.getArgs2('w1'),r2=cp2y.util.getArgs2('w2'),r3=cp2y.util.getArgs2('w3'),r4=cp2y.util.getArgs2('w4'),r5=cp2y.util.getArgs2('w5'),i=0,o=$('.gb');
  if(r){
    r=r.split(',');
    for(i;i<10;i++){
      if(r.indexOf(Number(o.eq(i).attr('data')))!=-1){
        o.eq(i).addClass('rb5');
      }
    }
  }
  if(r2){
    r2=r2.split(',');
    i=10
    for(i;i<20;i++){
      if(r2.indexOf(Number(o.eq(i).attr('data')))!=-1){
        o.eq(i).addClass('rb4');
      }
    }
  }
  if(r3){
    r3=r3.split(',');
    i=20
    for(i;i<30;i++){
      if(r3.indexOf(Number(o.eq(i).html()))!=-1){
        o.eq(i).addClass('rb3');
      }
    }
  }
  if(r4){
    r4=r4.split(',');
    i=30
    for(i;i<40;i++){
      if(r4.indexOf(Number(o.eq(i).html()))!=-1){
        o.eq(i).addClass('rb2');
      }
    }
  }
  if(r5){
    r5=r5.split(',');
    i=40
    for(i;i<50;i++){
      if(r5.indexOf(Number(o.eq(i).html()))!=-1){
        o.eq(i).addClass('rb1');
      }
    }
  }
},
  playName : _.playName,
  playType : "五星",
  input : "fiveStarPoly",
  num : 5,
  numP:"<b>100000元</b>",
  bet : function() {
      var html0 = [], i = 0;
      html0.push('<p>每位至少选1个,按位猜对即中'+cp2y.buy.numP+'</p><p class="c8c">号码下方为该号码的当前遗漏</p><p>万位</p>');
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
    $.get(WebAppUrl.FX,{lid:10089,type:1,location:1},function(data){var data=eval("("+data+")");
      var i=0,d=data.data.miss.split(','),len=d.length,o=cp2y.buy.getBall();
      for(i;i<len;i++){
        o.eq(i).children("code").html(d[i]);
      }
    });
    $.get(WebAppUrl.FX,{lid:10089,type:1,location:2},function(data){var data=eval("("+data+")");
      var i=0,d=data.data.miss.split(','),len=d.length,o=cp2y.buy.getBall();
      for(i;i<len;i++){
        o.eq(i+10).children("code").html(d[i]);
      }
    });
    $.get(WebAppUrl.FX,{lid:10089,type:1,location:3},function(data){var data=eval("("+data+")");
      var i=0,d=data.data.miss.split(','),len=d.length,o=cp2y.buy.getBall();
      for(i;i<len;i++){
        o.eq(i+20).children("code").html(d[i]);
      }
    });
    $.get(WebAppUrl.FX,{lid:10089,type:1,location:4},function(data){var data=eval("("+data+")");
      var i=0,d=data.data.miss.split(','),len=d.length,o=cp2y.buy.getBall();
      for(i;i<len;i++){
        o.eq(i+30).children("code").html(d[i]);
      }
    });
    $.get(WebAppUrl.FX,{lid:10089,type:1,location:5},function(data){var data=eval("("+data+")");
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
      var o = '<li data_input="' + this.input + '" data_bets="' + units + '" data_code="' + rb5.join('') + '-' + rb4.join('') + '-' + rb3.join('') + '-' + rb2.join('') + '-' + rb1.join('') + '">' + '<div><a class="r">' + rb5.join('</a><a class="r">') + '</a> <a class="r">' + rb4.join('</a><a class="r">') + '</a> <a class="r">' + rb3.join('</a><a class="r">') + '</a> <a class="r">' + rb2.join('</a><a class="r">') + '</a> <a class="r">' + rb1.join('</a><a class="r">') + '</a></div>' + '<p>' + this.playType + '：' + units + '注' + units * 2 + '元</p>' + '<i class="delI" onclick="cp2y.buy.del(this)"></i></li>';
      this.addRecord(o);
      this.clear();
      this.step2();
  }
};
_.a3 = {
  hasOutGet:_.a0.hasOutGet,
  playName : _.playName,
  playType : "五星通选",
  input : "fiveStarAllPoly",
  num : 5,
  numP:'最高奖<b>20440元</b>',
  updataYL:_.a2.updataYL,
  bet : _.a2.bet,
  select : _.a2.select,
  count : _.a2.count,
  random : _.a2.random,
  addContent : _.a2.addContent
};
_.a4 = {
  hasOutGet:_.a0.hasOutGet,
  playName : _.playName,
  playType : "二星组选",
  input : "twoStarGroupPoly",
  num : 2,
  numP:'至少选2个号,猜对后2位(顺序不限)即中<b>50元</b>',
  bet : _.a0.bet,
  select : _.a0.select,
  updataYL:function(){
    $.get(WebAppUrl.FX,{lid:10089,type:3},function(data){var data=eval("("+data+")");
      var i=0,d=data.data.miss.split(','),len=d.length,o=cp2y.buy.getBall();
      for(i;i<len;i++){
        o.eq(i).children("code").html(d[i]);
      }
    });
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
      units = rb.length * (rb.length - 1) / 2;
      dom.CurBets.html(units);
      dom.CurMoney.html(units * 2);
  },
  random : _.a0.random,
  addContent : _.a0.addContent
};
_.a5 = {
  hasOutGet:_.a0.hasOutGet,
  playName : _.playName,
  playType : "三星组3",
  input : "threeStarGroup3Poly",
  num : 2,
  numP:'至少选2个号,猜对后3位(有2个号相同即中<b>320元</b>',
  bet : _.a0.bet,
  updataYL:function(){
    $.get(WebAppUrl.FX,{lid:10093},function(data){var data=eval("("+data+")");
      var i=0,d=data.data.miss.split(','),len=d.length,o=cp2y.buy.getBall();
      for(i;i<len;i++){
        o.eq(i).children("code").html(d[i]);
      }
    });
  },
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
              rb.push(o.eq(i).attr("data"));
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
  hasOutGet:_.a0.hasOutGet,
  playName : _.playName,
  playType : "三星组6",
  input : "threeStarGroup6Poly",
  num : 3,
  numP:'至少选3个号,猜对后3位(顺序不限)即中<b>160元</b>',
  bet : _.a0.bet,
  updataYL:_.a5.updataYL,
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
              rb.push(o.eq(i).attr("data"));
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
  hasOutGet:_.a0.hasOutGet,
  playName : _.playName,
  playType : "任选1",
  input : "renOne",
  num : 1,
  bet : _.a2.bet,
  select : _.a2.select,
  updataYL:function(){},
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
hasOutGet:_.a0.hasOutGet,
  playName : _.playName,
  playType : "任选2",
  input : "renTwo",
  num : 2,
  bet : _.a7.bet,
  select : _.a7.select,
  updataYL:function(){},
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
              w.push(o.eq(i).attr("data"));
          };
          if (o.eq(i).hasClass("rb4")) {
              q.push(o.eq(i).attr("data"));
          };
          if (o.eq(i).hasClass("rb3")) {
              b.push(o.eq(i).attr("data"));
          };
          if (o.eq(i).hasClass("rb2")) {
              s.push(o.eq(i).attr("data"));
          };
          if (o.eq(i).hasClass("rb1")) {
              g.push(o.eq(i).attr("data"));
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
  hasOutGet:_.a0.hasOutGet,
  playName : _.playName,
  playType : "大小单双",
  input : "dxds",
  num : 2,
  numP:'',
  updataYL:function(){},
  bet : function() {
      var html0 = [], i = 0;
      html0.push('<p>每位至少选1个号,猜对开奖最后2位属性即中<b>4元</b></p><p>十位</p>');
      html0.push('<div><a class="gb" onclick="cp2y.buy.select(this,1)">大</a><a class="gb" onclick="cp2y.buy.select(this,1)">小</a><a class="gb" onclick="cp2y.buy.select(this,1)">单</a><a class="gb" onclick="cp2y.buy.select(this,1)">双</a></div>');
      html0.push('<p>个位</p>');
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
  hasOutGet:true,
  outGet:function(){
  var r=cp2y.util.getArgs2('w1'),r2=cp2y.util.getArgs2('w2'),i=0,o=$('.gb');
  if(r){
    r=r.split(',');
    for(i;i<10;i++){
      if(r.indexOf(Number(o.eq(i).attr('data')))!=-1){
        o.eq(i).addClass('rb2');
      }
    }
  }
  if(r2){
    r2=r2.split(',');
    i=10
    for(i;i<20;i++){
      if(r2.indexOf(Number(o.eq(i).attr('data')))!=-1){
        o.eq(i).addClass('rb1');
      }
    }
  }
  },
  playName : _.playName,
  playType : "二星直选",
  input : "twoStarDirectPoly",
  num : 2,
  bet : function() {
      var html0 = [], i = 0;
      html0.push('<p>每位至少选1个,按位猜对开奖后2位即中<b>100元</b></p><p class="c8c">号码下方为该号码的当前遗漏</p><p>十位</p>');
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
    $.get(WebAppUrl.FX,{lid:10093,type:1,location:2},function(data){var data=eval("("+data+")");
      var i=0,d=data.data.miss.split(','),len=d.length,o=cp2y.buy.getBall();
      for(i;i<len;i++){
        o.eq(i).children("code").html(d[i]);
      }
    });
    $.get(WebAppUrl.FX,{lid:10093,type:1,location:3},function(data){var data=eval("("+data+")");
      var i=0,d=data.data.miss.split(','),len=d.length,o=cp2y.buy.getBall();
      for(i;i<len;i++){
        o.eq(i+10).children("code").html(d[i]);
      }
    });
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
              rb1.push(o.eq(i).attr("data"));
          };
          if (o.eq(i).hasClass("rb2")) {
              rb2.push(o.eq(i).attr("data"));
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
  hasOutGet:true,
  outGet:function(){
  var r=cp2y.util.getArgs2('w1'),r2=cp2y.util.getArgs2('w2'),r3=cp2y.util.getArgs2('w3'),i=0,o=$('.gb');
  if(r){
    r=r.split(',');
    for(i;i<10;i++){
      if(r.indexOf(Number(o.eq(i).attr('data')))!=-1){
        o.eq(i).addClass('rb3');
      }
    }
  }
  if(r2){
    r2=r2.split(',');
    i=10
    for(i;i<20;i++){
      if(r2.indexOf(Number(o.eq(i).attr('data')))!=-1){
        o.eq(i).addClass('rb2');
      }
    }
  }
  if(r3){
    r3=r3.split(',');
    i=20
    for(i;i<30;i++){
      if(r3.indexOf(Number(o.eq(i).attr('data')))!=-1){
        o.eq(i).addClass('rb1');
      }
    }
  }
  },
  playName : _.playName,
  playType : "三星直选",
  input : "threeStarDirectPoly",
  num : 3,
  bet : function() {
      var html0 = [], i = 0;
      html0.push('<p>每位至少选1个,按位猜对开奖后2位即中<b>1000元</b></p><p class="c8c">号码下方为该号码的当前遗漏</p><p>百位</p>');
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
      return html0.join('');;
  },
  updataYL:function(){
    $.get(WebAppUrl.FX,{lid:10093,type:1,location:1},function(data){var data=eval("("+data+")");
      var i=0,d=data.data.miss.split(','),len=d.length,o=cp2y.buy.getBall();
      for(i;i<len;i++){
        o.eq(i).children("code").html(d[i]);
      }
    });
    $.get(WebAppUrl.FX,{lid:10093,type:1,location:2},function(data){var data=eval("("+data+")");
      var i=0,d=data.data.miss.split(','),len=d.length,o=cp2y.buy.getBall();
      for(i;i<len;i++){
        o.eq(i+10).children("code").html(d[i]);
      }
    });
     $.get(WebAppUrl.FX,{lid:10093,type:1,location:3},function(data){var data=eval("("+data+")");
      var i=0,d=data.data.miss.split(','),len=d.length,o=cp2y.buy.getBall();
      for(i;i<len;i++){
        o.eq(i+20).children("code").html(d[i]);
      }
    });
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
              rb1.push(o.eq(i).attr("data"));
          };
          if (o.eq(i).hasClass("rb2")) {
              rb2.push(o.eq(i).attr("data"));
          };
          if (o.eq(i).hasClass("rb3")) {
              rb3.push(o.eq(i).attr("data"));
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