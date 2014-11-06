/**
* @author luwenbin@live.com
*/
var _={
  bt: 10058,
  playName: "竞彩篮球",
  playTypes: function(a){
    var html=[],v0='',v1='',v2='',v3='',v4='',flag=cp2y.util.getArgs2('flag'),vx='';
    if (a == "a0") {
      v0 = 'class="onn"';
    }else if (a == "a1") {
      v1 = 'class="onn"';
    }else if(a == "a2"){
      v2 = 'class="onn"';
    }else if(a == "a3"){
      v3 = 'class="onn"';
    }else if(a == "a4"){
      v4 = 'class="onn"';
    }else{
      v0 = 'class="onn"';
    }
    if(flag){
      vx="&flag=1";
    }
    html.push('<a data="a1" href="'+WebAppUrl.HOME_APP_URL+'/lottery/10058?type=a1'+vx+'" '+v1+' data2="让分胜负">让分胜负</a>');
    html.push('<a data="a0" href="'+WebAppUrl.HOME_APP_URL+'/lottery/10058?type=a0'+vx+'" '+v0+' data2="胜负">胜负</a>');
    html.push('<a data="a2" href="'+WebAppUrl.HOME_APP_URL+'/lottery/10058?type=a2'+vx+'" '+v2+' data2="大小分">大小分</a>');
    html.push('<a data="a3" href="'+WebAppUrl.HOME_APP_URL+'/lottery/10058?type=a3'+vx+'" '+v3+' data2="胜分差">胜分差</a>');
    return html.join('');
  }
};
_.a1={
  jcType:0,
  bt: _.bt,
  playName: _.playName,
  playType: "让分胜负",
  maxMatch: 8,
  url: "/lottery/basketball/rfsf",
  bet: function(){
    var jcType=this.jcType;
    $.ajax({
      url: WebAppUrl.HOME_APP_URL + this.url,
      beforeSend: function(){cp2y.dialog.loading();},
      success: function (data){
        cp2y.dialog.clearLoading();
        cp2y.buy.sels = data.sels.split(',');
        cp2y.buy.betType = data.betType;
        var leagues = data.leagues.split(','),
          data = data.data,
          html = [],
          i = 0,
          len = data.length,t;
        cp2y.buy.issue = data[0].issueId;
        for (i; i < len; i++) {
          var j = 0,
            data2 = data[i].matches,
            jlen = data2.length,sp1,sp2,tip;
          html.push("<div class='tip tip2'>"+ data[i].dayKey +"(" + data[i].dayOfWeekStr + ")<b class='fr'>比赛场次：<span>" + data[i].matchCount + "场</span></b></div><ul>");
          for(j; j < jlen; j++){
            var betCounter = data2[j].betCounter ? data2[j].betCounter.split(',') : ["-", "-", "-"];
            html.push('<li class="' + data2[j].leagueName + '"><div class="jc_line1 jc_line12 jc_line3"  data="{no:' + data2[j].matchCode + ',end:false,name:\'' + data[i].dayOfWeekStr+data2[j].matchCode.substr(8,3)+ '\',h:\'' + data2[j].hostName + '\',g:\'' + data2[j].guestName + '\',rq:\'' + data2[j].rate + '\',dw:\'' + data[i].dayOfWeekStr + '\'}">');
            html.push('<strong><em>' + data2[j].leagueName + '</em>');
            html.push('<var>' + data2[j].matchCode.substr(8,3) + '</var>');
            html.push('<time>'+data2[j].sellEndTime.substr(11, 5)+'截止</time>');
            html.push('</strong><div>');
            if(jcType==0){
              tip='(让'+data2[j].rate+')';
              sp1=data2[j].basketBallSp.rfsheng;
              sp2=data2[j].basketBallSp.rffu;
            }else{
              tip='';
              sp1=data2[j].basketBallSp.sheng;
              sp2=data2[j].basketBallSp.fu;
            }
            html.push('<i data="0" data_s="' + sp2 + '" data_class="a' + data2[j].matchCode + '_0" class="jcBet a' + data2[j].matchCode + '_0"><span>' + data2[j].guestName + '</span><b>主负' + sp2 + '</b></i>');
            html.push('<i data="3" data_s="' + sp1 + '" data_class="a' + data2[j].matchCode + '_3" class="jcBet a' + data2[j].matchCode + '_3"><span>' + data2[j].hostName +'</span><b>主胜' + sp1+tip+'</b></i>');
            html.push('</div></div>');
            html.push('</li>');
          }
          html.push("</ul>");
        }
        jcDom.choose.html(html.join(''));
        html=[];
        i=0;len=leagues.length;
        for(i;i<len;i++){html.push('<a class="on">'+leagues[i]+'</a>');}
        jcDom.lcs.html(html.join(''));
        $("#choose .jcBet").click(function(){cp2y.buy.select($(this),false);});
        cp2y.buy.showLine2();
        window.scrollTo(0,0);
      },
      error:function(){cp2y.dialog.clearLoading();}
    });
  }
};

_.a0={
  jcType:1,
  bt: _.bt,
  playName: _.playName,
  playType: "胜负",
  maxMatch: 8,
  url: "/lottery/basketball/sf",
  bet:_.a1.bet
};

_.a2={
  jcType:2,
  bt: _.bt,
  playName: _.playName,
  playType: "大小分",
  maxMatch: 8,
  url: "/lottery/basketball/dxf",
  bet:function(){
    $.ajax({
      url: WebAppUrl.HOME_APP_URL + this.url,
      beforeSend: function(){cp2y.dialog.loading();},
      success: function (data){
        cp2y.dialog.clearLoading();
        cp2y.buy.sels = data.sels.split(',');
        cp2y.buy.betType = data.betType;
        var leagues = data.leagues.split(','),data=data.data,html=[],i=0,len=data.length,t;
        cp2y.buy.issue = data[0].issueId;
        for (i; i < len; i++) {
          var j=0,data2=data[i].matches,jlen=data2.length,sp1,sp2,tip;
          html.push("<div class='tip tip2'>"+data[i].dayKey+"("+data[i].dayOfWeekStr+")<b class='fr'>比赛场次：<span>" + data[i].matchCount + "场</span></b></div><ul>");
          for(j; j < jlen; j++){
            html.push('<li class="' + data2[j].leagueName + '"><div class="jc_line1 jc_line12 jc_line5"  data="{no:' + data2[j].matchCode + ',end:false,name:\'' + data[i].dayOfWeekStr+data2[j].matchCode.substr(8,3)+ '\',h:\'' + data2[j].hostName + '\',g:\'' + data2[j].guestName + '\',rq:\'' + data2[j].rate + '\',dw:\'' + data[i].dayOfWeekStr + '\'}">');
            html.push('<strong><em>' + data2[j].leagueName + '</em>');
            html.push('<var>' + data2[j].matchCode.substr(8,3) + '</var>');
            html.push('<time>'+data2[j].sellEndTime.substr(11, 5)+'截止</time>');
            html.push('</strong><div><p class="dxf"><em>'+data2[j].guestName+'</em><em>'+data2[j].basePoint+'</em><em>'+data2[j].hostName+'</em></p>');
            sp1=data2[j].basketBallSp.d;
            sp2=data2[j].basketBallSp.x;
            html.push('<i data="1" data_s="'+sp2+'" data_class="a'+data2[j].matchCode+'_1" class="jcBet a'+data2[j].matchCode+'_1"><span>小分'+sp2+'</span></i>');
            html.push('<i data="0" data_s="'+sp1+'" data_class="a'+data2[j].matchCode+'_0" class="jcBet a'+data2[j].matchCode+'_0"><span>大分'+sp1+'</span></i>');
            html.push('</div></div>');
            html.push('</li>');
          }
          html.push("</ul>");
        }
        jcDom.choose.html(html.join(''));
        html=[];
        i=0;len=leagues.length;
        for(i;i<len;i++){html.push('<a class="on">'+leagues[i]+'</a>');}
        jcDom.lcs.html(html.join(''));
        $("#choose .jcBet").click(function(){cp2y.buy.select($(this),false);});
        cp2y.buy.showLine2();
        window.scrollTo(0,0);
      },
      error:function(){cp2y.dialog.clearLoading();}
    });
  }
}

_.a3={
  jcType:3,
  bt: _.bt,
  playName: _.playName,
  playType: "胜分差",
  maxMatch: 8,
  url: "/lottery/basketball/sfc",
  bet:function(){
    $.ajax({
      url: WebAppUrl.HOME_APP_URL + this.url,
      beforeSend: function(){cp2y.dialog.loading();},
      success: function (data){
        cp2y.dialog.clearLoading();
        $("#MoreLocked").after('<div id="BdLock"></div>');
        cp2y.buy.sels = data.sels.split(',');
        cp2y.buy.betType = data.betType;
        var leagues = data.leagues.split(','),data=data.data,html=[],i=0,len=data.length,t;
        cp2y.buy.issue = data[0].issueId;
        for(i; i < len; i++){
          var j=0,data2=data[i].matches,jlen=data2.length
          html.push("<div class='tip tip2'>"+data[i].dayKey+"("+data[i].dayOfWeekStr+")<b class='fr'>比赛场次：<span>" + data[i].matchCount + "场</span></b></div><ul>");
          for (j; j < jlen; j++) {
            html.push('<li class="' + data2[j].leagueName + '"><div class="jc_line1 jc_line12 jc_line5"  data="{no:' + data2[j].matchCode + ',end:false,name:\'' + data[i].dayOfWeekStr+data2[j].matchCode.substr(8,3)+ '\',h:\'' + data2[j].hostName + '\',g:\'' + data2[j].guestName + '\',rq:\'' + data2[j].rate + '\',dw:\'' + data[i].dayOfWeekStr + '\'}">');
            html.push('<strong><em>' + data2[j].leagueName + '</em>');
            html.push('<var>'+data2[j].matchCode.substr(8,3)+'</var>');
            html.push('<time>'+data2[j].sellEndTime.substr(11, 5)+'截止</time>');
            html.push('</strong><div class="dbStyle1" >');
            html.push('<p onclick="cp2y.buy.bdShow(this);"><span>'+data2[j].guestName+'</span><span>VS</span><span>'+data2[j].hostName+'</span></p>');
            html.push('<code></code>');
            html.push('<section class="dbContent"><h3>'+data2[j].hostName+' VS '+data2[j].guestName+'</h3><aside><main>');
            html.push('<h4>客胜</h4>');
            html.push('<ul>' +
              '<li class="jcBet a'+data2[j].matchCode+'_0" data="0" data_s="'+data2[j].basketBallSp.g15+'" data_class="a'+data2[j].matchCode+'_0">1-5<br/>'+data2[j].basketBallSp.g15+'</li>' +
              '<li class="jcBet a'+data2[j].matchCode+'_1" data="1" data_s="'+data2[j].basketBallSp.g610 +'" data_class="a'+data2[j].matchCode+'_1">6-10<br/>'+data2[j].basketBallSp.g610+'</li>' +
              '<li class="jcBet a'+data2[j].matchCode+'_2" data="2" data_s="'+data2[j].basketBallSp.g1115+'" data_class="a'+data2[j].matchCode+'_2">11-15<br/>'+data2[j].basketBallSp.g1115+'</li>' +
              '<li class="jcBet a'+data2[j].matchCode+'_3" data="3" data_s="'+data2[j].basketBallSp.g1620 +'" data_class="a'+data2[j].matchCode+'_3">16-20<br/>'+data2[j].basketBallSp.g1620+'</li>' +
              '<li class="jcBet a'+data2[j].matchCode+'_4" data="4" data_s="'+data2[j].basketBallSp.g2125+'" data_class="a'+data2[j].matchCode+'_4">21-25<br/>'+data2[j].basketBallSp.g2125 +'</li>' +
              '<li class="jcBet a'+data2[j].matchCode+'_5" data="5" data_s="'+data2[j].basketBallSp.g26+'" data_class="a'+data2[j].matchCode+'_5">26+<br/>'+data2[j].basketBallSp.g26+'</li>' +
              '</ul>');
            html.push('<h4>主胜</h4>');
            html.push('<ul>' +
              '<li class="jcBet a'+data2[j].matchCode+'_6" data="6" data_s="'+data2[j].basketBallSp.h15+'" data_class="a'+data2[j].matchCode+'_6">1-5<br/>'+data2[j].basketBallSp.h15+'</li>' +
              '<li class="jcBet a'+data2[j].matchCode+'_7" data="7" data_s="'+data2[j].basketBallSp.h610+'" data_class="a'+data2[j].matchCode+'_7">6-10<br/>'+data2[j].basketBallSp.h610+'</li>' +
              '<li class="jcBet a'+data2[j].matchCode+'_8" data="8" data_s="'+data2[j].basketBallSp.h1115+'" data_class="a'+data2[j].matchCode+'_8">11-15<br/>'+data2[j].basketBallSp.h1115+'</li>' +
              '<li class="jcBet a'+data2[j].matchCode+'_9" data="9" data_s="'+data2[j].basketBallSp.h1620+'" data_class="a'+data2[j].matchCode+'_9">16-20<br/>'+data2[j].basketBallSp.h1620+'</li>' +
              '<li class="jcBet a'+data2[j].matchCode+'_10" data="10" data_s="'+data2[j].basketBallSp.h2125+'" data_class="a'+data2[j].matchCode+'_10">21-25<br/>'+data2[j].basketBallSp.h2125+'</li>' +
              '<li class="jcBet a'+data2[j].matchCode+'_11" data="11" data_s="'+data2[j].basketBallSp.h26+'" data_class="a'+data2[j].matchCode+'_11">26+<br/>'+data2[j].basketBallSp.h26+'</li>' +
              '</ul>');
            
            html.push('</main></aside><nav><var onclick="cp2y.buy.bdUnSelect(this);">取消选择</var><var onclick="cp2y.buy.bdSelect2(this,false);">确定</var></nav></section>');
            html.push('</div></div></li>');
          }
          html.push("</ul>");
        }
        jcDom.choose.html(html.join(''));
        i=0;
        len=leagues.length;
        html=[];
        for(i;i<len;i++){html.push('<a class="on">' + leagues[i] + '</a>');}
        jcDom.lcs.html(html.join(''));
        $("#choose .jcBet").click(function(){cp2y.buy.dbSet($(this));});
        cp2y.buy.showLine2();
      },
      error:function(){cp2y.dialog.clearLoading();}
    });
  }
};
