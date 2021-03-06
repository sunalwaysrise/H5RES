/**
* @author luwenbin@live.com
*/
var _ = {
  bt: 10059,
  playName: "竞彩足球",
  playTypes: function (a) {
    var html=[],v1='',v2='',v3='',v4='',v5='',v6='',v10='';
    if (a == "a0") {
        v1 = 'class="onn"';
    }else if (a == "a1") {
        v2 = 'class="onn"';
    }else if(a == "a5"){
        v5 = 'class="onn"';
    }else if(a == "a6"){
        v6 = 'class="onn"';
    }else if(a == "a10"){
        v10 = 'class="onn"';
    }
    html.push('<a data="a0" href="' + WebAppUrl.HOME_APP_URL + '/lottery/10059?type=a0" ' + v1 + ' data2="胜平负">胜平负</a>');
    html.push('<a data="a1" href="' + WebAppUrl.HOME_APP_URL + '/lottery/10059?type=a1" ' + v2 + ' data2="让球胜平负">让球胜平负</a>');
    html.push('<a data="a5" href="' + WebAppUrl.HOME_APP_URL + '/lottery/10059?type=a5" ' + v5 + ' data2="混合投注">混合投注</a>');
    html.push('<a data="a6" href="' + WebAppUrl.HOME_APP_URL + '/lottery/10059?type=a6" ' + v6 + ' data2="二选一">二选一</a>');
     html.push('<a data="a10" href="' + WebAppUrl.HOME_APP_URL + '/lottery/yczhisheng" ' + v10 + ' data2="一场制胜">一场制胜</a>');
    return html.join('');
  },
  discoverUtil:function(matchCode,hostRank,visitRank,historyScore,odds3,odds1,odds0,betCounter){
    var h=[],historyScore;
    h.push('<div class="jc_line2"><table class="jc_table"  onclick="cp2y.discoverUtil.init('+matchCode+');">');
    h.push('<tr><td>两队排名</td><td>'+(hostRank?hostRank:'--')+'</td><td>'+(visitRank?visitRank : '--')+'</td><td rowspan="4" style="display:none;"></td></tr>');
    if(historyScore && historyScore!='null'){
      historyScore=historyScore.split(',');
    }else{
      historyScore=['-','-','-'];
    }
    h.push('<tr><td>历史交锋</td><td colspan="2">主队'+historyScore[0]+'胜'+historyScore[1]+'平'+historyScore[2]+'负</td></tr>');
    h.push('<tr><td>平均赔率</td><td colspan="2"><table class="jc_table2"><tr><td>'+(odds3?odds3:'--')+'</td><td>' + (odds1?odds1:'--')+'</td><td>'+(odds0?odds0:'--')+'</td></tr></table></td></tr>');
    h.push('<tr><td>投注比例</td><td colspan="2"><table class="jc_table2"><tr><td>'+betCounter[0]+'</td><td>'+betCounter[1] + '</td><td>' + betCounter[2] + '</td></tr></table></td></tr>');
    h.push('<tr><td colspan="4">查看赛事详情&gt;&gt;</td></tr></table></div>');
    return h.join('');
  }
};
_.a0 = {
  jcType:0,
  bt: _.bt,
  playName: _.playName,
  playType: "胜平负",
  maxMatch: 8,
  url: "/lottery/spf/",
  bet: function () {
    $.ajax({
      url: WebAppUrl.HOME_APP_URL + this.url,
      beforeSend: function () {
        cp2y.dialog.loading();
      },
      success: function (data) {
        cp2y.dialog.clearLoading();
        cp2y.buy.sels = data.sels.split(',');
        cp2y.buy.betType = data.betType;
        var leagues = data.leagues.split(','),
          data = data.data,
          html = [],
          i = 0,
          len = data.length;
        cp2y.buy.issue = data[0].issueId;
        for (i; i < len; i++) {
          var j = 0,
            data2 = data[i].matches,
            jlen = data2.length;
          html.push("<div class='tip tip2'>"+ data[i].dayKey +"(" + data[i].dayOfWeekStr + ")<b class='fr'>比赛场次：<span>" + data[i].matchCount + "场</span></b></div><ul>");
          for (j; j < jlen; j++) {
            var betCounter = data2[j].betCounter ? data2[j].betCounter.split(',') : ["-", "-", "-"];
            html.push('<li class="' + data2[j].leagueName + '"><div class="jc_line1"  data="{no:' + data2[j].matchCode + ',end:false,name:\'' + data[i].dayOfWeekStr+data2[j].matchCode.substr(8,3)+ '\',h:\'' + data2[j].hostName + '\',g:\'' + data2[j].guestName + '\',rq:\'' + data2[j].rate + '\',dw:\'' + data[i].dayOfWeekStr + '\'}">');
            html.push('<strong><em>' + data2[j].leagueName + '</em>');
            html.push('<var>' + data2[j].matchCode.substr(8,3) + '</var>');
            html.push('<time>' + data2[j].sellEndTime.substr(11, 5) + '截止</time>');
            html.push('</strong><div>');
            html.push('<i data="3" data_s="' + data2[j].sheng + '" data_class="a' + data2[j].matchCode + '_3" class="jcBet a' + data2[j].matchCode + '_3"><span>' + data2[j].hostName + '</span><b>主胜' + data2[j].sheng + '</b></i>');

            html.push('<i data="1" data_s="' + data2[j].ping + '" data_class="a' + data2[j].matchCode + '_1" class="jcBet a' + data2[j].matchCode + '_1"><span>VS</span><b>平' + data2[j].ping + '</b></i>');
            html.push('<i data="0" data_s="' + data2[j].fu + '" data_class="a' + data2[j].matchCode + '_0" class="jcBet a' + data2[j].matchCode + '_0"><span>' + data2[j].guestName + '</span><b>主负' + data2[j].fu + '</b></i>');
            html.push('</div></div>');
            html.push(_.discoverUtil(data2[j].matchCode,data2[j].hostRank,data2[j].visitRank,data2[j].historyScore,data2[j].odds3,data2[j].odds1,data2[j].odds0,betCounter));
            html.push('</li>');
          }
          html.push("</ul>");
        }
        jcDom.choose.html(html.join(''));
        i = 0;
        len = leagues.length;
        html = [];
        for (i; i < len; i++) {
          html.push('<a class="on">' + leagues[i] + '</a>');
        }
        jcDom.lcs.html(html.join(''));
        $("#choose .jcBet").click(function () {
          cp2y.buy.select($(this), false);
        });
        cp2y.buy.showLine2();
        window.scrollTo(0,0);
      },
      error: function () {
          cp2y.dialog.clearLoading();
      }
    });
  }
};

_.a1 = {
  jcType:1,
  bt: _.bt,
  playName: _.playName,
  playType: "让球胜平负",
  maxMatch: 8,
  url: "/lottery/rqspf/",
  bet: function () {
    $.ajax({
      url: WebAppUrl.HOME_APP_URL + this.url,
      beforeSend: function () {
        cp2y.dialog.loading();
      },
      success: function (data) {
        cp2y.dialog.clearLoading();
        cp2y.buy.sels = data.sels.split(',');
        cp2y.buy.betType = data.betType;
        var leagues = data.leagues.split(','),
          data = data.data,
          html = [],
          i = 0,
          len = data.length;
        cp2y.buy.issue = data[0].issueId;
        for (i; i < len; i++) {
          var j = 0,
              data2 = data[i].matches,
              jlen = data2.length,rq;
          html.push("<div class='tip tip2'>"+ data[i].dayKey +"(" + data[i].dayOfWeekStr + ")<b class='fr'>比赛场次：<span>" + data[i].matchCount + "场</span></b></div><ul>");
          for (j; j < jlen; j++) {
            var betCounter = data2[j].betCounter ? data2[j].betCounter.split(',') : ["-", "-", "-"];
            html.push('<li class="' + data2[j].leagueName + '"><div class="jc_line1"  data="{no:' + data2[j].matchCode + ',end:false,name:\'' + data[i].dayOfWeekStr+data2[j].matchCode.substr(8,3)+ '\',h:\'' + data2[j].hostName + '\',g:\'' + data2[j].guestName + '\',rq:\'' + data2[j].rate + '\',dw:\'' + data[i].dayOfWeekStr + '\'}">');
            html.push('<strong><em>' + data2[j].leagueName + '</em>');
            html.push('<var>' + data2[j].matchCode.substr(8,3) + '</var>');
            html.push('<time>' + data2[j].sellEndTime.substr(11, 5) + '截止</time>');
            html.push('</strong><div>');
            rq= data2[j].rate;
            if(rq>0){
              rq="<var class='rr'>(+"+rq+")</var>";
            }else{
              rq="<var class='yy'>("+rq+")</var>";
            }
            html.push('<i data="3" data_s="' + data2[j].rqSheng + '" data_class="a' + data2[j].matchCode + '_3" class="jcBet a' + data2[j].matchCode + '_3"><span>' + data2[j].hostName +rq+ '</span><b>主胜' + data2[j].rqSheng + '</b></i>');

            html.push('<i data="1" data_s="' + data2[j].rqPing + '" data_class="a' + data2[j].matchCode + '_1" class="jcBet a' + data2[j].matchCode + '_1"><span>VS</span><b>平' + data2[j].rqPing + '</b></i>');

            html.push('<i data="0" data_s="' + data2[j].rqFu + '" data_class="a' + data2[j].matchCode + '_0" class="jcBet a' + data2[j].matchCode + '_0"><span>' + data2[j].guestName + '</span><b>主负' + data2[j].rqFu + '</b></i>');

            html.push('</div></div>');
            html.push(_.discoverUtil(data2[j].matchCode,data2[j].hostRank,data2[j].visitRank,data2[j].historyScore,data2[j].odds3,data2[j].odds1,data2[j].odds0,betCounter));
            
            html.push('</li>');
          }
          html.push("</ul>");
        }
        jcDom.choose.html(html.join(''));
        i = 0;
        len = leagues.length;
        html = [];
        for (i; i < len; i++) {
            html.push('<a class="on">' + leagues[i] + '</a>');
        }
        jcDom.lcs.html(html.join(''));
        $("#choose .jcBet").click(function () {
            cp2y.buy.select($(this), false);
        });
        cp2y.buy.showLine2();
        window.scrollTo(0,0);
      },
      error: function () {
        cp2y.dialog.clearLoading();
      }
    });
  }
};

_.a5 = {
jcType:5,
bt: _.bt,
playName: _.playName,
playType: "混合投注",
maxMatch: 8,
url: "/lottery/jzhh/",
bet: function () {
  $.ajax({
    url: WebAppUrl.HOME_APP_URL + this.url,
    beforeSend: function () {
      cp2y.dialog.loading();
    },
    success: function (data) {
      cp2y.dialog.clearLoading();
      cp2y.buy.sels = data.sels.split(',');
      cp2y.buy.betType = data.betType;
      var leagues = data.leagues.split(','),
          data = data.data,
          html = [],
          i = 0,
          len = data.length,classBet,pl;
      cp2y.buy.issue = data[0].issueId;
      for (i; i < len; i++) {
        var j = 0,
            data2 = data[i].matches,
            jlen = data2.length;
        html.push("<div class='tip tip2'>"+ data[i].dayKey +"(" + data[i].dayOfWeekStr + ")<b class='fr'>比赛场次：<span>" + data[i].matchCount + "场</span></b></div><ul>");
        for (j; j < jlen; j++) {
          var betCounter = data2[j].betCounter ? data2[j].betCounter.split(',') : ["-", "-", "-"];
          html.push('<li class="' + data2[j].leagueName + '"><div class="jc_line1 jc_line11"  data="{no:' + data2[j].matchCode + ',end:false,name:\'' + data[i].dayOfWeekStr + data2[j].matchCode.substr(8,3)+ '\',h:\'' + data2[j].hostName + '\',g:\'' + data2[j].guestName + '\',rq:\'' + data2[j].rate + '\',dw:\'' + data[i].dayOfWeekStr + '\'}">');
          html.push('<strong><em>' + data2[j].leagueName + '</em>');
          html.push('<var>' + data2[j].matchCode.substr(8,3)  + '</var>');
          html.push('<time>' + data2[j].sellEndTime.substr(11, 5) + '截止</time>');
          html.push('</strong>');
          /* 胜平负 开始 */
          (data2[j].sheng)?(function(){pl=data2[j].sheng;classBet='jcBet'})():(function(){pl='--';classBet=""})();
          html.push('<div class="mb10"><i data="3" data_s="' + pl + '" data_class="a' + data2[j].matchCode + '_3" class="'+classBet+' a' + data2[j].matchCode + '_3"><span>' + data2[j].hostName + '</span><b>主胜' + pl + '</b></i>');
          (data2[j].ping)?(function(){pl=data2[j].ping;classBet='jcBet'})():(function(){pl='--';classBet=""})();
          html.push('<i data="1" data_s="' + pl + '" data_class="a' + data2[j].matchCode + '_1" class="'+classBet+' a' + data2[j].matchCode + '_1"><span>VS</span><b>平' + pl + '</b></i>');
          (data2[j].fu)?(function(){pl=data2[j].fu;classBet='jcBet'})():(function(){pl='--';classBet=""})();
          html.push('<i data="0" data_s="' +pl+ '" data_class="a' + data2[j].matchCode + '_0" class="'+classBet+' a' + data2[j].matchCode + '_0"><span>' + data2[j].guestName + '</span><b>主负' + pl+ '</b></i>');
          html.push('</div>');
          /* 让球胜平负 开始 */
          var rq='';
          rq= data2[j].rate;
          if(rq>0){
              rq="<var class='rr'>(+"+rq+")</var>";
          }else{
              rq="<var class='yy'>("+rq+")</var>";
          }
          (data2[j].rqSheng)?(function(){pl=data2[j].rqSheng;classBet='jcBet'})():(function(){pl='--';classBet=""})();
          html.push('<div><i data="403" data_s="' +pl+ '" data_class="a' + data2[j].matchCode + '_403" class="'+classBet+' a' + data2[j].matchCode + '_403"><span>' + data2[j].hostName +rq+'</span><b>主胜' +pl+ '</b></i>');
          (data2[j].rqPing)?(function(){pl=data2[j].rqPing;classBet='jcBet'})():(function(){pl='--';classBet=""})();
          html.push('<i data="401" data_s="' +pl+ '" data_class="a' + data2[j].matchCode + '_401" class="'+classBet+' a' + data2[j].matchCode + '_401"><span>VS</span><b>平' +pl+ '</b></i>');
          (data2[j].rqFu)?(function(){pl=data2[j].rqFu;classBet='jcBet'})():(function(){pl='--';classBet=""})();
          html.push('<i data="400" data_s="' +pl+ '" data_class="a' + data2[j].matchCode + '_400" class="'+classBet+' a' + data2[j].matchCode + '_400"><span>' + data2[j].guestName + '</span><b>主负' +pl+ '</b></i>');
          html.push('</div>');
          /* 让球胜平负 截止 */
          html.push('</div>');
          html.push(_.discoverUtil(data2[j].matchCode,data2[j].hostRank,data2[j].visitRank,data2[j].historyScore,data2[j].odds3,data2[j].odds1,data2[j].odds0,betCounter));
          html.push('</li>');
        }
        html.push("</ul>");
      }
      jcDom.choose.html(html.join(''));
      i = 0;
      len = leagues.length;
      html = [];
      for (i; i < len; i++) {
          html.push('<a class="on">' + leagues[i] + '</a>');
      }
      jcDom.lcs.html(html.join(''));
      $("#choose .jcBet").click(function () {
          cp2y.buy.select($(this), false);
      });
      cp2y.buy.showLine2();
      window.scrollTo(0,0);
    },
    error: function () {
      cp2y.dialog.clearLoading();
    }
  });
}
};

_.a6 = {
jcType:6,
bt: _.bt,
playName: _.playName,
playType: "二选一",
maxMatch: 16,
url: "/lottery/tso/",
bet: function () {
  $.ajax({
    url: WebAppUrl.HOME_APP_URL + this.url,
    beforeSend: function () {cp2y.dialog.loading();},
    success: function (data) {
      cp2y.dialog.clearLoading();
      cp2y.buy.sels = data.sels.split(',');
      cp2y.buy.betType = data.betType;
      var leagues = data.leagues.split(','),data = data.data,html = [],i = 0,len = data.length;
      cp2y.buy.issue = data[0].issueId;
      for (i; i < len; i++) {
        var j = 0,data2 = data[i].matches,jlen = data2.length,vh,vg,vhn,vgn,vhr,vgr;
        html.push("<div class='tip tip2'>"+ data[i].dayKey +"(" + data[i].dayOfWeekStr + ")<b class='fr'>比赛场次：<span>" + data[i].matchCount + "场</span></b></div><ul>");
        for (j; j < jlen; j++) {
          var betCounter = data2[j].betCounter ? data2[j].betCounter.split(',') : ["-", "-", "-"];
          html.push('<li class="' + data2[j].leagueName + '"><div class="jc_line1 jc_line3"  data="{no:' + data2[j].matchCode + ',end:false,name:\'' + data[i].dayOfWeekStr+data2[j].matchCode.substr(8,3)+ '\',h:\'' + data2[j].hostName + '\',g:\'' + data2[j].guestName + '\',rq:\'' + data2[j].rate + '\',dw:\'' + data[i].dayOfWeekStr + '\'}">');
          html.push('<strong><em>' + data2[j].leagueName + '</em>');
          html.push('<var>' + data2[j].matchCode.substr(8,3) + '</var>');
          html.push('<time>' + data2[j].sellEndTime.substr(11, 5) + '截止</time>');
          html.push('</strong><div>');
          if(data2[j].rate<0){
            vhn='主胜';vh=3;vhr=data2[j].sheng;vgn='客不败';vg=400;vgr=data2[j].rqFu;
          }else{
            vhn='主不败';vh=403;vhr=data2[j].rqSheng;vgn='客胜';vg=0;vgr=data2[j].fu;
          }
          html.push('<i data="'+vh+'" data_s="' + vhr + '" data_class="a' + data2[j].matchCode + '_'+vh+'" class="jcBet a' + data2[j].matchCode + '_'+vh+'"><span>' + data2[j].hostName + '</span><b>'+vhn+ vhr + '</b></i>');
          html.push('<i data="'+vg+'" data_s="' + vgr + '" data_class="a' + data2[j].matchCode + '_'+vg+'" class="jcBet a' + data2[j].matchCode + '_'+vg+'"><span>' + data2[j].guestName + '</span><b>'+vgn + vgr + '</b></i>');
          html.push('</div></div>');
                    html.push(_.discoverUtil(data2[j].matchCode,data2[j].hostRank,data2[j].visitRank,data2[j].historyScore,data2[j].odds3,data2[j].odds1,data2[j].odds0,betCounter));
          html.push('</li>');
        }
        html.push("</ul>");
      }
      jcDom.choose.html(html.join(''));
      i = 0;
      len = leagues.length;
      html = [];
      for (i; i < len; i++) {
          html.push('<a class="on">' + leagues[i] + '</a>');
      }
      jcDom.lcs.html(html.join(''));
      $("#choose .jcBet").click(function () {
          cp2y.buy.select($(this), false);
      });
      cp2y.buy.showLine2();
      window.scrollTo(0,0);
    },
    error: function () {cp2y.dialog.clearLoading();}
  });
}
};

_.a10={
jcType:6,
bt: _.bt,
playName:"一场制胜",
playType:_.playName,
maxMatch: 16,
url: "/lottery/tso/",
bet: function () {
  $.ajax({
    url: WebAppUrl.HOME_APP_URL + this.url,
    beforeSend: function () {cp2y.dialog.loading();},
    success: function (D) {
      cp2y.dialog.clearLoading();
      cp2y.buy.sels = D.sels.split(',');
      cp2y.buy.betType = D.betType;
      var leagues = D.leagues.split(','),data = D.data,html = [],i = 0,len = data.length;
      cp2y.buy.issue = data[0].issueId;
      for(i;i<len;i++){
        var j=0,data2=data[i].matches,jlen=data2.length,vh,vg,vhn,vgn,vhr,vgr,Dgp=[],minV=[];
        html.push("<div class='tip tip2'>"+ data[i].dayKey +"(" + data[i].dayOfWeekStr + ")<b class='fr'>比赛场次：<span>" + data[i].matchCount + "场</span></b></div><ul class='dgp'>");
        for(j;j<jlen;j++){
          html.push('<li class="' + data2[j].leagueName + '"><div class="jc_line4">');
          html.push('<var>'+data2[j].matchCode.substr(9,2)+'</var>');
          html.push('<section><em>'+data2[j].leagueName+'</em>');
          html.push('<time>截止时间 ' + data2[j].sellEndTime.substr(11, 5) + '</time></section>');
          html.push('<section><span>'+data2[j].hostName+'</span><b>VS</b><span>'+data2[j].guestName+'</span></section>');
          if(data2[j].rate<0){
            vhn='主胜';vh=3;vhr=data2[j].sheng;vgn='客不败';vg=400;vgr=data2[j].rqFu;
          }else{
            vhn='主不败';vh=403;vhr=data2[j].rqSheng;vgn='客胜';vg=0;vgr=data2[j].fu;
          }
          if(vhr>vgr){
            minV=[vgr,data2[j].matchCode,data2[j].hostName,vh,vhn,vhr,data2[j].guestName,vg,vgn,vgr,data[i].dayOfWeekStr+'0'+data2[j].matchCode.substr(9,2)];
          }else{
            minV=[vhr,data2[j].matchCode,data2[j].hostName,vh,vhn,vhr,data2[j].guestName,vg,vgn,vgr,data[i].dayOfWeekStr+'0'+data2[j].matchCode.substr(9,2)];
          }
          Dgp.push(minV);
          html.push('<div data="{name:\''+data[i].dayOfWeekStr +data2[j].matchCode.substr(8,3)+'\',time:\''+data2[j].sellEndTime.substr(11, 5)+'\',matchCode:\''+data2[j].matchCode+'\',hostName:\''+data2[j].hostName+'\',hostV:\''+vh+'\',hostTitle:\''+vhn+'\',hostRate:\''+vhr+'\',guestName:\''+data2[j].guestName+'\',guestV:\''+vg+'\',guestTitle:\''+vgn+'\',guestRate:\''+vgr+'\'}" id="Y'+data2[j].matchCode+'" onclick="cp2y.buy.addContent(this);">投注</div></li>');
        }
        html.push("</ul>");
      }
      Dgp.sort(function(x, y){
        return x[0] - y[0];
      });
      cp2y.buy.Dgp=[Dgp[Dgp.length-2],Dgp[Dgp.length-1]];//预选配对比赛
      jcDom.choose.html(html.join(''));
      i = 0;
      len = leagues.length;
      html = [];
      for (i; i < len; i++) {
        html.push('<a class="on">' + leagues[i] + '</a>');
      }
      jcDom.lcs.html(html.join(''));
      $("#choose .jcBet").click(function () {
        cp2y.buy.select($(this), false);
      });
      cp2y.buy.showLine2();
      window.scrollTo(0,0);
      if(D.showMatchCodes.length>0){
        var o=$("#Y"+D.showMatchCodes[0]);
        if(o.size()==0){
          $(".jc_line4").eq(0).children('div').click();
        }else{
          o.click();
        }
      }else{
        $(".jc_line4").eq(0).children('div').click();
      }
    },
    error: function () {cp2y.dialog.clearLoading();}
  });
}
};

