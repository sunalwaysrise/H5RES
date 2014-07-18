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
