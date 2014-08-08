var _ = {
  bt: 10057,
  playName: "北京单场",
  playTypes: function (a) {
    var html=[],v1='',v2='',v3='',v4='',v5='';
    switch(a){
      case 'a0':
        v1='class="onn"';
        break;
      case 'a1':
        v2='class="onn"';
        break;
      case 'a2':
        v3='class="onn"';
        break;
      case 'a3':
        v4='class="onn"';
        break;
      case 'a4':
        v5='class="onn"';
        break;
    }
    html.push('<a data="a0" href="' + WebAppUrl.HOME_APP_URL + '/lottery/10057?type=a0" ' + v1 + ' data2="让球胜平负">让球胜平负</a>');
//    html.push('<a data="a1" href="' + WebAppUrl.HOME_APP_URL + '/lottery/10057?type=a1" ' + v2 + ' data2="半全场">半全场</a>');
//    html.push('<a data="a2" href="' + WebAppUrl.HOME_APP_URL + '/lottery/10057?type=a2" ' + v3 + ' data2="比分">比分</a>');
//    html.push('<a data="a3" href="' + WebAppUrl.HOME_APP_URL + '/lottery/10057?type=a3" ' + v4 + ' data2="总进球">总进球</a>');
//    html.push('<a data="a4" href="' + WebAppUrl.HOME_APP_URL + '/lottery/10057?type=a4" ' + v5 + ' data2="上下单双">上下单双</a>');
    return html.join('');
  }
};
_.a0={
  jcType:0,
  bt: _.bt,
  playName: _.playName,
  playType: "让球胜平负",
  maxMatch: 15,
  url: "/lottery/bdrqspf/",
  bet: function () {
      $.ajax({
          url: WebAppUrl.HOME_APP_URL + this.url,
          beforeSend: function () {
              cp2y.dialog.loading();
          },
          success: function (data) {
              cp2y.dialog.clearLoading();
              cp2y.buy.sels = data.issueId;
              cp2y.buy.betType = data.betType;
              var leagues = data.leagues.split(','),
                  data = data.datalist ,
                  html = [],
                  i = 0,
                  len = data.length;
              cp2y.buy.issue = data[0].issueId;
              for (i; i < len; i++) {
                  var j = 0,
                      data2 = data[i].list ,
                      jlen = data2.length;
                  html.push("<div class='tip tip2'>"+ data[i].matchTime +"<b class='fr'>比赛场次：<span>" + jlen + "场</span></b></div><ul>");
                  for (j; j < jlen; j++) {
                      var betCounter = data2[j].betCounter ? data2[j].betCounter.split(',') : ["-", "-", "-"],d='',rq=data2[j].bjdcMatch.rate;
                    d=new Date(data2[j].bjdcMatchSellEndTime);
                    d=d.getHours().addZero()+':'+d.getMinutes().addZero();
                      html.push('<li class="' + data2[j].bjdcMatch.leagueName + '"><div class="jc_line1 jc_line12"  data="{no:\'' + data2[j].matchKey + '\',end:false,h:\'' + data2[j].bjdcMatch.hostName + '\',g:\'' + data2[j].bjdcMatch.guestName + '\',rq:\'' + data2[j].bjdcMatch.rate + '\'}">');
                      html.push('<strong><em>' + data2[j].bjdcMatch.leagueName + '</em>');
                      html.push('<var>场次:'+ data2[j].matchKey.split('_')[1]+'</var>');
                      html.push('<time>' + d + '截止</time>');
                      html.push('</strong><div>');
                      if(rq>0){
                          rq="<var class='rr'>(+"+rq+")</var>";
                      }else{
                          rq="<var class='yy'>("+rq+")</var>";
                      }
                      html.push('<i data="3" data_s="'+data2[j].bjdcSp.rqSheng+'" data_class="a' + data2[j].matchKey + '_3" class="jcBet a' + data2[j].matchKey + '_3"><span>' + data2[j].bjdcMatch.hostName +rq+ '</span><b>主胜'+data2[j].bjdcSp.rqSheng+'</b></i>');

                      html.push('<i data="1" data_s="'+data2[j].bjdcSp.rqPing+'" data_class="a' + data2[j].matchKey + '_1" class="jcBet a' + data2[j].matchKey + '_1"><span>VS</span><b>平' + data2[j].bjdcSp.rqPing+ '</b></i>');
                      html.push('<i data="0" data_s="'+data2[j].bjdcSp.rqFu+'" data_class="a' + data2[j].matchCode + '_0" class="jcBet a' + data2[j].matchKey + '_0"><span>' + data2[j].bjdcMatch.guestName + '</span><b>主负' + data2[j].bjdcSp.rqFu+'</b></i>');
                      html.push('</div></div></li>');
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
          },
          error: function () {
              cp2y.dialog.clearLoading();
          }
      });
  }
};

_.a1={
  jcType:1,
  bt: _.bt,
  playName: _.playName,
  playType: "半全场",
  maxMatch: 6,
  url: "/lottery/bdbqc/",
  bet: function () {
    $.ajax({
      url: WebAppUrl.HOME_APP_URL + this.url,
      beforeSend: function () {
        cp2y.dialog.loading();
      },
      success: function (data) {
        cp2y.dialog.clearLoading();
        cp2y.buy.sels = data.issueId;
        cp2y.buy.betType = data.betType;
        $("#MoreLocked").after('<div id="BdLock"></div>');
        var leagues = data.leagues.split(','),
          data = data.datalist ,
          html = [],
          i = 0,
          len = data.length;
        cp2y.buy.issue = data[0].issueId;
        for (i; i < len; i++) {
          var j = 0,
            data2 = data[i].list ,
            jlen = data2.length;
          html.push("<div class='tip tip2'>"+ data[i].matchTime +"<b class='fr'>比赛场次：<span>" + jlen + "场</span></b></div><ul>");
            for (j; j < jlen; j++) {
              var betCounter = data2[j].betCounter ? data2[j].betCounter.split(',') : ["-", "-", "-"],d='';
              d=new Date(data2[j].bjdcMatchSellEndTime);
              d=d.getHours().addZero()+':'+d.getMinutes().addZero();
              html.push('<li class="' + data2[j].bjdcMatch.leagueName + '"><div class="jc_line1 jc_line12"  data="{no:\'' + data2[j].matchKey + '\',end:false,h:\'' + data2[j].bjdcMatch.hostName + '\',g:\'' + data2[j].bjdcMatch.guestName + '\',rq:\'' + data2[j].bjdcMatch.rate + '\'}">');
              html.push('<strong><em>' + data2[j].bjdcMatch.leagueName + '</em>');
              html.push('<var>场次:'+ data2[j].matchKey.split('_')[1]+'</var>');
              html.push('<time>' + d + '截止</time>');
              html.push('</strong><div class="dbStyle1" >');
              html.push('<p onclick="cp2y.buy.bdShow(this);"><span>'+data2[j].bjdcMatch.hostName+'</span><span>VS</span><span>'+data2[j].bjdcMatch.guestName+'</span></p>');
              html.push('<code></code>');
              html.push('<article class="dbContent"><h3>'+data2[j].bjdcMatch.hostName+' VS '+data2[j].bjdcMatch.guestName+'</h3>');
              html.push('<ul>' +
                '<li class="jcBet a'+data2[j].matchKey+'_0" data="0" data_s="'+data2[j].bjdcSp.ss+'" data_class="a'+data2[j].matchKey+'_0">胜胜<br/>'+data2[j].bjdcSp.ss+'</li>' +
                '<li class="jcBet a'+data2[j].matchKey+'_1" data="1" data_s="'+data2[j].bjdcSp.sp+'" data_class="a'+data2[j].matchKey+'_1">胜平<br/>'+data2[j].bjdcSp.sp+'</li>' +
                '<li class="jcBet a'+data2[j].matchKey+'_2" data="2" data_s="'+data2[j].bjdcSp.sf+'" data_class="a'+data2[j].matchKey+'_2">胜负<br/>'+data2[j].bjdcSp.sf+'</li>' +
                '<li class="jcBet a'+data2[j].matchKey+'_3" data="3" data_s="'+data2[j].bjdcSp.ps+'" data_class="a'+data2[j].matchKey+'_3">平胜<br/>'+data2[j].bjdcSp.ps+'</li>' +
                '<li class="jcBet a'+data2[j].matchKey+'_4" data="4" data_s="'+data2[j].bjdcSp.pp+'" data_class="a'+data2[j].matchKey+'_4">平平<br/>'+data2[j].bjdcSp.pp+'</li>' +
                '<li class="jcBet a'+data2[j].matchKey+'_5" data="5" data_s="'+data2[j].bjdcSp.pf+'" data_class="a'+data2[j].matchKey+'_5">平负<br/>'+data2[j].bjdcSp.pf+'</li>' +
                '<li class="jcBet a'+data2[j].matchKey+'_6" data="6" data_s="'+data2[j].bjdcSp.fs+'" data_class="a'+data2[j].matchKey+'_6">负胜<br/>'+data2[j].bjdcSp.fs+'</li>' +
                '<li class="jcBet a'+data2[j].matchKey+'_7" data="7" data_s="'+data2[j].bjdcSp.fp+'" data_class="a'+data2[j].matchKey+'_7">负平<br/>'+data2[j].bjdcSp.fp+'</li>' +
                '<li class="jcBet a'+data2[j].matchKey+'_8" data="8" data_s="'+data2[j].bjdcSp.ff+'" data_class="a'+data2[j].matchKey+'_8">负负<br/>'+data2[j].bjdcSp.ff+'</li>' +
                '</ul>');
              html.push('<nav><var onclick="cp2y.buy.bdUnSelect(this);">取消选择</var><var onclick="cp2y.buy.bdSelect2(this,false);">确定</var></nav></article>');
              html.push('</div></div></li>');
            }
            html.push("</ul>");
          }
          jcDom.choose.html(html.join(''));
          i=0;
          len=leagues.length;
          html=[];
          for(i;i<len;i++){
            html.push('<a class="on">' + leagues[i] + '</a>');
          }
          jcDom.lcs.html(html.join(''));
          $("#choose .jcBet").click(function(){
            cp2y.buy.dbSet($(this));
          });
          cp2y.buy.showLine2();
        },
        error: function () {
            cp2y.dialog.clearLoading();
        }
      });
    }
};

_.a2={
  jcType:2,
  bt: _.bt,
  playName: _.playName,
  playType: "比分",
  maxMatch: 3,
  url: "/lottery/bdbf/",
  bet:function(){
    $.ajax({
      url: WebAppUrl.HOME_APP_URL + this.url,
      beforeSend: function () {
        cp2y.dialog.loading();
      },
      success: function (data) {
        cp2y.dialog.clearLoading();
        cp2y.buy.sels = data.issueId;
        cp2y.buy.betType = data.betType;
        $("#MoreLocked").after('<div id="BdLock"></div>');
        var leagues = data.leagues.split(','),
          data = data.datalist ,
          html = [],
          i = 0,
          len = data.length;
        cp2y.buy.issue = data[0].issueId;
        for (i; i < len; i++) {
          var j = 0,
            data2 = data[i].list ,
            jlen = data2.length;
          html.push("<div class='tip tip2'>"+ data[i].matchTime +"<b class='fr'>比赛场次：<span>" + jlen + "场</span></b></div><ul>");
          for (j; j < jlen; j++) {
            var betCounter = data2[j].betCounter ? data2[j].betCounter.split(',') : ["-", "-", "-"],d='';
            d=new Date(data2[j].bjdcMatchSellEndTime);
            d=d.getHours().addZero()+':'+d.getMinutes().addZero();
            html.push('<li class="' + data2[j].bjdcMatch.leagueName + '"><div class="jc_line1 jc_line12"  data="{no:\'' + data2[j].matchKey + '\',end:false,h:\'' + data2[j].bjdcMatch.hostName + '\',g:\'' + data2[j].bjdcMatch.guestName + '\',rq:\'' + data2[j].bjdcMatch.rate + '\'}">');
            html.push('<strong><em>' + data2[j].bjdcMatch.leagueName + '</em>');
            html.push('<var>场次:'+ data2[j].matchKey.split('_')[1]+'</var>');
            html.push('<time>' + d + '截止</time>');
            html.push('</strong><div class="dbStyle1" >');
            html.push('<p onclick="cp2y.buy.bdShow(this);"><span>'+data2[j].bjdcMatch.hostName+'</span><span>VS</span><span>'+data2[j].bjdcMatch.guestName+'</span></p>');
            html.push('<code></code>');
            html.push('<article class="dbContent"><h3>'+data2[j].bjdcMatch.hostName+' VS '+data2[j].bjdcMatch.guestName+'</h3><aside><main>');
            html.push('<h4>主胜</h4>');
            html.push('<ul>' +
              '<li class="jcBet a'+data2[j].matchKey+'_0" data="0" data_s="'+data2[j].bjdcSp.s10+'" data_class="a'+data2[j].matchKey+'_0">1:0<br/>'+data2[j].bjdcSp.s10+'</li>' +
              '<li class="jcBet a'+data2[j].matchKey+'_1" data="1" data_s="'+data2[j].bjdcSp.s20+'" data_class="a'+data2[j].matchKey+'_1">2:0<br/>'+data2[j].bjdcSp.s20+'</li>' +
              '<li class="jcBet a'+data2[j].matchKey+'_2" data="2" data_s="'+data2[j].bjdcSp.s30+'" data_class="a'+data2[j].matchKey+'_2">3:0<br/>'+data2[j].bjdcSp.s30+'</li>' +
              '<li class="jcBet a'+data2[j].matchKey+'_3" data="3" data_s="'+data2[j].bjdcSp.s40+'" data_class="a'+data2[j].matchKey+'_3">4:0<br/>'+data2[j].bjdcSp.s40+'</li>' +
              '<li class="jcBet a'+data2[j].matchKey+'_4" data="4" data_s="'+data2[j].bjdcSp.s21+'" data_class="a'+data2[j].matchKey+'_4">2:1<br/>'+data2[j].bjdcSp.s21+'</li>' +
              '<li class="jcBet a'+data2[j].matchKey+'_5" data="5" data_s="'+data2[j].bjdcSp.s31+'" data_class="a'+data2[j].matchKey+'_5">3:1<br/>'+data2[j].bjdcSp.s31+'</li>' +
              '<li class="jcBet a'+data2[j].matchKey+'_6" data="6" data_s="'+data2[j].bjdcSp.s41+'" data_class="a'+data2[j].matchKey+'_6">4:1<br/>'+data2[j].bjdcSp.s41+'</li>' +
              '<li class="jcBet a'+data2[j].matchKey+'_7" data="7" data_s="'+data2[j].bjdcSp.s32+'" data_class="a'+data2[j].matchKey+'_7">3:2<br/>'+data2[j].bjdcSp.s32+'</li>' +
              '<li class="jcBet a'+data2[j].matchKey+'_8" data="8" data_s="'+data2[j].bjdcSp.s42+'" data_class="a'+data2[j].matchKey+'_8">4:2<br/>'+data2[j].bjdcSp.s42+'</li>' +
              '<li class="jcBet a'+data2[j].matchKey+'_9" data="9" data_s="'+data2[j].bjdcSp.sother+'" data_class="a'+data2[j].matchKey+'_9">胜其他<br/>'+data2[j].bjdcSp.sother+'</li>' +
              '</ul>');
            html.push('<h4>平</h4>');
            html.push('<ul>' +
              '<li class="jcBet a'+data2[j].matchKey+'_10" data="10" data_s="'+data2[j].bjdcSp.p00+'" data_class="a'+data2[j].matchKey+'_10">0:0<br/>'+data2[j].bjdcSp.p00+'</li>' +
              '<li class="jcBet a'+data2[j].matchKey+'_11" data="11" data_s="'+data2[j].bjdcSp.p11+'" data_class="a'+data2[j].matchKey+'_11">1:1<br/>'+data2[j].bjdcSp.p11+'</li>' +
              '<li class="jcBet a'+data2[j].matchKey+'_12" data="12" data_s="'+data2[j].bjdcSp.p22+'" data_class="a'+data2[j].matchKey+'_12">2:2<br/>'+data2[j].bjdcSp.p22+'</li>' +
              '<li class="jcBet a'+data2[j].matchKey+'_13" data="13" data_s="'+data2[j].bjdcSp.p33+'" data_class="a'+data2[j].matchKey+'_13">3:3<br/>'+data2[j].bjdcSp.p33+'</li>' +
              '<li class="jcBet a'+data2[j].matchKey+'_14" data="14" data_s="'+data2[j].bjdcSp.pother+'" data_class="a'+data2[j].matchKey+'_14">平其他<br/>'+data2[j].bjdcSp.pother+'</li>' +
              '</ul>');
            html.push('<h4>主负</h4>');
            html.push('<ul>' +
              '<li class="jcBet a'+data2[j].matchKey+'_15" data="15" data_s="'+data2[j].bjdcSp.f01+'" data_class="a'+data2[j].matchKey+'_15">0:1<br/>'+data2[j].bjdcSp.f01+'</li>' +
              '<li class="jcBet a'+data2[j].matchKey+'_16" data="16" data_s="'+data2[j].bjdcSp.f02+'" data_class="a'+data2[j].matchKey+'_16">0:2<br/>'+data2[j].bjdcSp.f02+'</li>' +
              '<li class="jcBet a'+data2[j].matchKey+'_17" data="17" data_s="'+data2[j].bjdcSp.f03+'" data_class="a'+data2[j].matchKey+'_17">0:3<br/>'+data2[j].bjdcSp.f03+'</li>' +
              '<li class="jcBet a'+data2[j].matchKey+'_18" data="18" data_s="'+data2[j].bjdcSp.f04+'" data_class="a'+data2[j].matchKey+'_18">0:4<br/>'+data2[j].bjdcSp.f04+'</li>' +
              '<li class="jcBet a'+data2[j].matchKey+'_19" data="19" data_s="'+data2[j].bjdcSp.f12+'" data_class="a'+data2[j].matchKey+'_19">1:2<br/>'+data2[j].bjdcSp.f12+'</li>' +
              '<li class="jcBet a'+data2[j].matchKey+'_20" data="20" data_s="'+data2[j].bjdcSp.f13+'" data_class="a'+data2[j].matchKey+'_20">1:3<br/>'+data2[j].bjdcSp.f13+'</li>' +
              '<li class="jcBet a'+data2[j].matchKey+'_21" data="21" data_s="'+data2[j].bjdcSp.f14+'" data_class="a'+data2[j].matchKey+'_21">1:4<br/>'+data2[j].bjdcSp.f14+'</li>' +
              '<li class="jcBet a'+data2[j].matchKey+'_22" data="22" data_s="'+data2[j].bjdcSp.f23+'" data_class="a'+data2[j].matchKey+'_22">2:3<br/>'+data2[j].bjdcSp.f23+'</li>' +
              '<li class="jcBet a'+data2[j].matchKey+'_23" data="23" data_s="'+data2[j].bjdcSp.f24+'" data_class="a'+data2[j].matchKey+'_23">2:4<br/>'+data2[j].bjdcSp.f24+'</li>' +
              '<li class="jcBet a'+data2[j].matchKey+'_24" data="24" data_s="'+data2[j].bjdcSp.fother+'" data_class="a'+data2[j].matchKey+'_24">负其他<br/>'+data2[j].bjdcSp.fother+'</li>' +
              '</ul></main></aside>');
            html.push('<nav><var onclick="cp2y.buy.bdUnSelect(this);">取消选择</var><var onclick="cp2y.buy.bdSelect2(this,false);">确定</var></nav></article>');
            html.push('</div></div></li>');
          }
          html.push("</ul>");
        }
        jcDom.choose.html(html.join(''));
        i=0;
        len=leagues.length;
        html=[];
        for(i;i<len;i++){
          html.push('<a class="on">' + leagues[i] + '</a>');
        }
        jcDom.lcs.html(html.join(''));
        $("#choose .jcBet").click(function(){
          cp2y.buy.dbSet($(this));
        });
        cp2y.buy.showLine2();
      },
      error: function () {
        cp2y.dialog.clearLoading();
      }
    });
  }
};

_.a3={
  jcType:3,
  bt: _.bt,
  playName: _.playName,
  playType: "总进球",
  maxMatch: 6,
  url: "/lottery/bdzjqs/",
  bet:function(){
    $.ajax({
      url: WebAppUrl.HOME_APP_URL + this.url,
      beforeSend: function () {
        cp2y.dialog.loading();
      },
      success: function (data) {
        cp2y.dialog.clearLoading();
        cp2y.buy.sels = data.issueId;
        cp2y.buy.betType = data.betType;
        $("#MoreLocked").after('<div id="BdLock"></div>');
        var leagues = data.leagues.split(','),
          data = data.datalist ,
          html = [],
          i = 0,
          len = data.length;
        cp2y.buy.issue = data[0].issueId;
        for (i; i < len; i++) {
          var j = 0,
            data2 = data[i].list ,
            jlen = data2.length;
          html.push("<div class='tip tip2'>"+ data[i].matchTime +"<b class='fr'>比赛场次：<span>" + jlen + "场</span></b></div><ul>");
          for (j; j < jlen; j++) {
            var betCounter = data2[j].betCounter ? data2[j].betCounter.split(',') : ["-", "-", "-"],d='';
            d=new Date(data2[j].bjdcMatchSellEndTime);
            d=d.getHours().addZero()+':'+d.getMinutes().addZero();
            html.push('<li class="' + data2[j].bjdcMatch.leagueName + '"><div class="jc_line1 jc_line12"  data="{no:\'' + data2[j].matchKey + '\',end:false,h:\'' + data2[j].bjdcMatch.hostName + '\',g:\'' + data2[j].bjdcMatch.guestName + '\',rq:\'' + data2[j].bjdcMatch.rate + '\'}">');
            html.push('<strong><em>' + data2[j].bjdcMatch.leagueName + '</em>');
            html.push('<var>场次:'+ data2[j].matchKey.split('_')[1]+'</var>');
            html.push('<time>' + d + '截止</time>');
            html.push('</strong><div class="dbStyle1" >');
            html.push('<p onclick="cp2y.buy.bdShow(this);"><span>'+data2[j].bjdcMatch.hostName+'</span><span>VS</span><span>'+data2[j].bjdcMatch.guestName+'</span></p>');
            html.push('<code></code>');
            html.push('<article class="dbContent"><h3>'+data2[j].bjdcMatch.hostName+' VS '+data2[j].bjdcMatch.guestName+'</h3>');
            html.push('<ul>' +
              '<li class="jcBet a'+data2[j].matchKey+'_0" data="0" data_s="'+data2[j].bjdcSp.t0+'" data_class="a'+data2[j].matchKey+'_0">0<br/>'+data2[j].bjdcSp.t0+'</li>' +
              '<li class="jcBet a'+data2[j].matchKey+'_1" data="1" data_s="'+data2[j].bjdcSp.t1+'" data_class="a'+data2[j].matchKey+'_1">1<br/>'+data2[j].bjdcSp.t1+'</li>' +
              '<li class="jcBet a'+data2[j].matchKey+'_2" data="2" data_s="'+data2[j].bjdcSp.t2+'" data_class="a'+data2[j].matchKey+'_2">2<br/>'+data2[j].bjdcSp.t2+'</li>' +
              '<li class="jcBet a'+data2[j].matchKey+'_3" data="3" data_s="'+data2[j].bjdcSp.t3+'" data_class="a'+data2[j].matchKey+'_3">3<br/>'+data2[j].bjdcSp.t3+'</li>' +
              '<li class="jcBet a'+data2[j].matchKey+'_4" data="4" data_s="'+data2[j].bjdcSp.t4+'" data_class="a'+data2[j].matchKey+'_4">4<br/>'+data2[j].bjdcSp.t4+'</li>' +
              '<li class="jcBet a'+data2[j].matchKey+'_5" data="5" data_s="'+data2[j].bjdcSp.t5+'" data_class="a'+data2[j].matchKey+'_5">5<br/>'+data2[j].bjdcSp.t5+'</li>' +
              '<li class="jcBet a'+data2[j].matchKey+'_6" data="6" data_s="'+data2[j].bjdcSp.t6+'" data_class="a'+data2[j].matchKey+'_6">6<br/>'+data2[j].bjdcSp.t6+'</li>' +
              '<li class="jcBet a'+data2[j].matchKey+'_7" data="7" data_s="'+data2[j].bjdcSp.t7+'" data_class="a'+data2[j].matchKey+'_7">7+<br/>'+data2[j].bjdcSp.t7+'</li>' +
              '</ul>');
            html.push('<nav><var onclick="cp2y.buy.bdUnSelect(this);">取消选择</var><var onclick="cp2y.buy.bdSelect2(this,false);">确定</var></nav></article>');
            html.push('</div></div></li>');
          }
          html.push("</ul>");
        }
        jcDom.choose.html(html.join(''));
        i=0;
        len=leagues.length;
        html=[];
        for(i;i<len;i++){
          html.push('<a class="on">' + leagues[i] + '</a>');
        }
        jcDom.lcs.html(html.join(''));
        $("#choose .jcBet").click(function(){
          cp2y.buy.dbSet($(this));
        });
        cp2y.buy.showLine2();
      },
      error: function () {
        cp2y.dialog.clearLoading();
      }
    });
  }
};

_.a4={
  jcType:4,
  bt: _.bt,
  playName: _.playName,
  playType: "上下单双",
  maxMatch: 6,
  url: "/lottery/bdsxds/",
  bet:function(){
    $.ajax({
      url: WebAppUrl.HOME_APP_URL + this.url,
      beforeSend: function () {
        cp2y.dialog.loading();
      },
      success: function (data) {
        cp2y.dialog.clearLoading();
        cp2y.buy.sels = data.issueId;
        cp2y.buy.betType = data.betType;
        $("#MoreLocked").after('<div id="BdLock"></div>');
        var leagues = data.leagues.split(','),
          data = data.datalist ,
          html = [],
          i = 0,
          len = data.length;
        cp2y.buy.issue = data[0].issueId;
        for (i; i < len; i++) {
          var j = 0,
            data2 = data[i].list ,
            jlen = data2.length;
          html.push("<div class='tip tip2'>"+ data[i].matchTime +"<b class='fr'>比赛场次：<span>" + jlen + "场</span></b></div><ul>");
          for (j; j < jlen; j++) {
            var betCounter = data2[j].betCounter ? data2[j].betCounter.split(',') : ["-", "-", "-"],d='';
            d=new Date(data2[j].bjdcMatchSellEndTime);
            d=d.getHours().addZero()+':'+d.getMinutes().addZero();
            html.push('<li class="' + data2[j].bjdcMatch.leagueName + '"><div class="jc_line1 jc_line12"  data="{no:\'' + data2[j].matchKey + '\',end:false,h:\'' + data2[j].bjdcMatch.hostName + '\',g:\'' + data2[j].bjdcMatch.guestName + '\',rq:\'' + data2[j].bjdcMatch.rate + '\'}">');
            html.push('<strong><em>' + data2[j].bjdcMatch.leagueName + '</em>');
            html.push('<var>场次:'+ data2[j].matchKey.split('_')[1]+'</var>');
            html.push('<time>' + d + '截止</time>');
            html.push('</strong><div class="dbStyle1" >');
            html.push('<p onclick="cp2y.buy.bdShow(this);"><span>'+data2[j].bjdcMatch.hostName+'</span><span>VS</span><span>'+data2[j].bjdcMatch.guestName+'</span></p>');
            html.push('<code></code>');
            html.push('<article class="dbContent"><h3>'+data2[j].bjdcMatch.hostName+' VS '+data2[j].bjdcMatch.guestName+'</h3>');
            html.push('<ul>' +
              '<li class="jcBet a'+data2[j].matchKey+'_0" data="0" data_s="'+data2[j].bjdcSp.shangD+'" data_class="a'+data2[j].matchKey+'_0">上单<br/>'+data2[j].bjdcSp.t0+'</li>' +
              '<li class="jcBet a'+data2[j].matchKey+'_1" data="1" data_s="'+data2[j].bjdcSp.shangS+'" data_class="a'+data2[j].matchKey+'_1">上双<br/>'+data2[j].bjdcSp.t1+'</li>' +
              '<li class="jcBet a'+data2[j].matchKey+'_2" data="2" data_s="'+data2[j].bjdcSp.xiaD+'" data_class="a'+data2[j].matchKey+'_2">下单<br/>'+data2[j].bjdcSp.t2+'</li>' +
              '<li class="jcBet a'+data2[j].matchKey+'_3" data="3" data_s="'+data2[j].bjdcSp.xiaS+'" data_class="a'+data2[j].matchKey+'_3">下双<br/>'+data2[j].bjdcSp.t3+'</li>' +
              '</ul>');
            html.push('<nav><var onclick="cp2y.buy.bdUnSelect(this);">取消选择</var><var onclick="cp2y.buy.bdSelect2(this,false);">确定</var></nav></article>');
            html.push('</div></div></li>');
          }
          html.push("</ul>");
        }
        jcDom.choose.html(html.join(''));
        i=0;
        len=leagues.length;
        html=[];
        for(i;i<len;i++){
          html.push('<a class="on">' + leagues[i] + '</a>');
        }
        jcDom.lcs.html(html.join(''));
        $("#choose .jcBet").click(function(){
          cp2y.buy.dbSet($(this));
        });
        cp2y.buy.showLine2();
      },
      error: function () {
        cp2y.dialog.clearLoading();
      }
    });
  }
};