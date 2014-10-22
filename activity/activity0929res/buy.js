/**
 * Created with JetBrains WebStorm.
 * User: luwenbin
 * Date: 14-9-29
 * Time: 上午11:08
 * To change this template use File | Settings | File Templates.
 */
var _={
  bt:10032
},autoRunMark,inApp=false;
cp2y.buy={
  init:function(){
    var h1=[],h2=[],i= 1,j=1;
    for(i;i<34;i++){
      h1.push('<a onclick="cp2y.buy.selected(this,0)">'+i.addZero()+'</a>');
    }
    $("#red").html(h1.join(''));
    for(j;j<17;j++){
      h2.push('<a onclick="cp2y.buy.selected(this,1)">'+j.addZero()+'</a>');
    }
    $("#blue").html(h2.join(''));
    this.getIssues();
  },
  countDown:function(){
    $.ajax({
      url:WebAppUrl.HOME_APP_URL+"/lottery/query_cur_issue",
      dataType:'text',
      //anysc:false,
      beforeSend:function(){},
      data:{"lotteryId":_.bt,"random":new Date().getTime(),"dabao":true},
      success : function(result) {
        if (result == "" || result.indexOf('ERROR') != -1){return false;}
        var o = eval("("+result+")");
        if(o.flag!=1){return false;}
        cp2y.buy.serverTime = parseInt(o.time);
        cp2y.buy.currentIssue = o.issue;
        cp2y.buy.currentIssueId = o.issueId;
        cp2y.buy.sellEndTime = o.sellEndTime;
        $("#curIssue").html(o.issue);
        if(cp2y.buy.serverTime>1001){
          cp2y.buy.autoRun();
        }else{
          setTimeout('cp2y.buy.countDown()',5000);
        }
      }
    });
  },
  autoRun:function(){
    cp2y.buy.serverTime -= 1000;
    if (cp2y.buy.serverTime <= 0){
      cp2y.buy.countDown();
    }else{
      var day = Math.floor(cp2y.buy.serverTime / (24 * 60 * 60 * 1000)),tmp,hour,munites,second,html='';
      tmp = cp2y.buy.serverTime - (day * 24 * 60 * 60 * 1000);
      hour = Math.floor(tmp / (60 * 60 * 1000));
      tmp = cp2y.buy.serverTime - (day * 24 * 60 * 60 * 1000) - (hour * 60 * 60 * 1000);
      munites = Math.floor(tmp / (60 * 1000));
      tmp = cp2y.buy.serverTime - (day * 24 * 60 * 60 * 1000) - (hour * 60 * 60 * 1000) - (munites * 60 * 1000);
      second = Math.floor(tmp / 1000);
      if(day){
        html+=day+"天";
      }
      if(hour){
        html+=hour+"小时";
      }
      munites=munites<10?'0'+munites:munites;
      second=second<10?'0'+second:second;
      html+=munites+':'+second;
      $("#curCountDown").html(html);
      try{clearTimeout(autoRunMark);}catch(e){}
      autoRunMark=setTimeout('cp2y.buy.autoRun()', 1000);
    }
  },
  getIssues:function(){
    $.ajax({
      url:WebAppUrl.HOME_APP_URL+"/lottery/traceIssueList",
      data:{lotteryId:_.bt,random:new Date().getTime(),dabao:true},
      beforeSend:function(){cp2y.dialog.loading();},
      success:function(data){
        cp2y.dialog.clearLoading();
        if(data.flag==1){
          var i=0,D=data.dataList,a=[],len= D.length,onSale;
          for(i;i<len;i++){
            a.push(D[i].issueId);
          }
          cp2y.buy.issues=a;
          if(len==154||len>154){
            cp2y.buy.issuesLens=154;
            cp2y.buy.max=154;
            onSale=9;
            $("#Nissue a").removeClass("cur");
            $("#Nissue a").eq(0).addClass("cur");
          }else{
            if(len<79){
              cp2y.buy.issuesLens=40;
              cp2y.buy.max=40;
              onSale=9.5
              $("#Nissue a").removeClass("cur");
              $("#Nissue a").eq(2).addClass("cur");
            }else{
              cp2y.buy.issuesLens=79;
              cp2y.buy.max=79;
              onSale=9.2
              $("#Nissue a").removeClass("cur");
              $("#Nissue a").eq(1).addClass("cur");
            }
          }
          $("#iss").html(cp2y.buy.issuesLens);
        }
      },
      error:function(){cp2y.dialog.clearLoading();cp2y.dialog.alert('正在更新最新奖期,请稍候...')}
    });
  },
  issues:[],
  issuesLens:154,
  max:0,
  red:[],
  blue:[],
  setIssuesLens:function(o,i){
    var len=this.issues.length, x,onSale;
    $("#Nissue a").removeClass("cur");
    if(len<i){
      cp2y.dialog.alert('抱歉,目前没有这么多奖期');
      i=this.max;
    }
    x=(i==154)?0:(i==79)?1:2;
    $("#Nissue a").eq(x).addClass("cur");
    this.issuesLens=i;
    //onSale=(x==0)?9:(x==1)?9.2:9.5;
    $("#iss").html(this.issuesLens);
    this.output();
  },
  reset:function(n,i){
    var j=0,len,a=[];
    if(i==0){
      len=this.red.length;
      a=this.red;
      for(j;j<len;j++){
        if(n==this.red[j]){
          a.splice(j,1);
          break;
        }
      }
      this.red=a;
    }else{
      len=this.blue.length;
      a=this.blue;
      for(j;j<len;j++){
        if(n==this.blue[j]){
          a.splice(j,1);
          break;
        }
      }
      this.blue=a;
    }
  },
  push:function(n,i){
    if(i==0){
      this.red.push(n);
    }else{
      this.blue.push(n);
    }
  },
  selected:function(o,i){
    if($(o).hasClass('on')){
      $(o).removeClass('on');
      this.reset($(o).html(),i);
    }else{
      $(o).addClass('on');
      this.push($(o).html(),i);
    };
    if($(".on").size()>0){
      $("#Nadd").show();
    }else{
      $("#Nadd").hide();
    }
    //this.output();
  },
  add:function(){
    var r=this.red.sort(),b=this.blue.sort(),m=this.count(),h=[];
    if(m==0){
      return cp2y.dialog.alert('不构成一注');
    }
    h.push('<li data="'+m+'" data1="'+r.join(" ")+'" data2="'+b.join(" ")+'"><div><a>'+this.red.join("</a><a>")+'</a><span></span><b>'+this.blue.join("</b><b>")+'</b></div>');
    h.push('<p class="Nct">复式:<span>'+m+'</span>注</p>');
    h.push('<p class="Ncl" onclick="cp2y.buy.del(this);"></p></li>');
    $("#scheme").append(h.join(''));
    this.clear();
    $("#Nadd").hide();
    this.output();
  },
  del:function(o){
    $(o).parent().remove();
    this.output();
  },
  count:function(){
    var rb=this.red.length,bb=this.blue.length,su=0,tn=1,i=7,j=2;
    if(rb<6 || bb==0){
      return 0;
    }
    if(rb==6){
      return bb;
    }
    for(i;i<=rb;i++){
      tn=tn*i;
    }
    for(j;j<=rb-6;j++){
      tn=tn/j;
    }
    su = tn * bb;
    return su;
  },
  setMulBox:function(){
    var b=this.mul?this.mul:1;
    var html='<input type="tel" id="MulBox" placeholder="输入倍数" class="input4 mt40 tc" value="'+b+'" /><a onclick="cp2y.buy.setMul()" class="btn1 mt10">确认</a>',o={
      t:'倍数',
      c:html
    };
    cp2y.input.openBox(o);
  },
  random:function(){
    //if(this.red.length>0 || this.blue.length>0){
    this.clear();
    //}
    var i=0,r=[],b=[],ball=[],ball2=[];
    for(var i=1;i<34;i++){
      ball.push(i.addZero());
      if(i<17){
        ball2.push(i.addZero());
      }
    }
    r=ball.random({len:6});
    b=ball2.random({len:1});
    i=0;
    for(i;i<6;i++){
      $('#red a').eq(Number(r[i])-1).addClass('on');
    }
    this.red=r;
    $("#blue a").eq(Number(b[0])-1).addClass("on");
    this.blue=b;
    //this.output();
    $("#Nadd").show();
  },
  output:function(){
    var s,d,i=0,D=$("#scheme li"),len=D.length,m=0;
    for(i;i<len;i++){
      m+=Number(D.eq(i).attr("data"));
    }
    this.red.sort();
    this.blue.sort();
    s=m*this.issuesLens*this.mul*2;
    if(this.issuesLens==154){
      d=Math.ceil(s*9/10);
    }else if(this.issuesLens==79){
      d=Math.ceil(s*92/100);
    }else{
      d=Math.ceil(s*95/100);
    }
    $("#bets").html(m);
    $("#p1").html(s);
    this.s=s;
    $("#p2").html(d);
    $("#mul,#mul2").html(this.mul);
  },
  clear:function(){
    cp2y.buy.red=[];
    cp2y.buy.blue=[];
    $('.on').removeClass("on");
    //cp2y.buy.output();
//    return cp2y.dialog.confirm('您要清除所选号码么？',function(){
//      cp2y.buy.red=[];
//      cp2y.buy.blue=[];
//      $('.on').removeClass("on");
//      cp2y.buy.output();
//      cp2y.dialog.closeConfirm();
//    },function(){cp2y.dialog.closeConfirm();})
  },
  mul:1,
  setMul:function(){
    var t=$('#MulBox'), v=t.val();
    if(!t.val().isInt()){
      t.val(1);
      v=1;
    }else if(t.val()>9998){
      t.val(9999);
      v=9999;
    }
    this.mul=v;
    cp2y.input.closeBox();
    this.output();
  },
  buy:function(){
    return cp2y.dialog.confirm("确认付款?",function(){
      cp2y.buy.submit();
    });
  },
  submit:function(){
    var d={
      lotteryId:10032,
      buyType:1,
      issueId:this.issues[0],
      issueIds:'',
      issueCount:this.issuesLens,
      multiple:this.mul,
      multiples:'',
      burstIntoStop:0,
      prizeStop:0,
      schemeNumber:"",
      privilege:true,
      schemeAmount:0,
      buyAmount:0,
      discount:0//折扣金额
    },i=0,m=[],iu=[],D=$("#scheme li"),len=D.length,sN=[];
    for(i;i<len;i++){
      sN.push(D.eq(i).attr('data1')+"#"+D.eq(i).attr('data2'));
    }
    d.schemeNumber="poly="+sN.join("|");
    i=0;
    for(i;i<this.issuesLens;i++){
      iu.push(this.issues[i]);
      m.push(this.mul);
    }
    d.issueIds=iu.join(',');
    d.multiples=m.join(',');
    d.buyAmount=this.s;
    d.schemeAmount=this.s;
    if(this.issuesLens==154){
      d.discount=Math.ceil(this.s*9/10);
    }else if(this.issuesLens==79){
      d.discount=Math.ceil(this.s*92/100);
    }else{
      d.discount=Math.ceil(this.s*95/100);
    }
    $.ajax({
      url:WebAppUrl.HOME_APP_URL+"/core/lottery/buy_lottery",
      data:d,
      type:"post",
      beforeSend:function(){cp2y.dialog.loading();},
      success:function(data){
        
        cp2y.dialog.clearLoading();
        if(typeof data=="string"){
          data=eval("("+data+")");
        };
        if (data.flag == -1) {
          return cp2y.quick.user.signInBox();
        } else if (data.flag == 2) {
          if(inApp){
            return cp2y.dialog.alert("余额不足，去充值？");
          }else{
            return cp2y.dialog.confirm("余额不足，去充值？", function () {
              cp2y.dialog.closeConfirm();
              location.href = WebAppUrl.HOME_APP_URL + '/recharge/index';
            });
          }
        } else if (data.flag == 1) {
          if(inApp){
            cp2y.dialog.closeConfirm();
            return cp2y.dialog.alert("购买成功，请去购彩记录中查看");
          }else{
            location.href = WebAppUrl.HOME_APP_URL + '/lottery/detail#scheme=' + data.schemeId;
          }
        } else {
          cp2y.dialog.alert(data.message);
        }
      }
    });
  },
  rule:function(){$("#s2").show();},
  closeRule:function(){$("#s2").hide();}
};
cp2y.buy.init();