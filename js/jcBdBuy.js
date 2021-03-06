var bd={
  doInit:function(){
    this.gg={
      '单关'  : {'单关':1},
      '2串1'  : {'2串1':1},
      '2串3'  : {'2串1':1,'单关':2},
      '3串1'  : {'3串1':1},
      '3串4'  : {'3串1':1,'2串1':3},
      '3串7'  : {'3串1':1,'2串1':3,'单关':3},
      '4串1'  : {'4串1':1},
      '4串5'  : {'4串1':1,'3串1':4},
      '4串11' : {'4串1':1,'3串1':4,'2串1':6},
      '4串15' : {'4串1':1,'3串1':4,'2串1':6,'单关':4},
      '5串1'  : {'5串1':1},
      '5串6'  : {'5串1':1,'4串1':5},
      '5串16' : {'5串1':1,'4串1':5,'3串1':10},
      '5串26' : {'5串1':1,'4串1':5,'3串1':10,'2串1':10},
      '5串31' : {'5串1':1,'4串1':5,'3串1':10,'2串1':10,'单关':5},
      '6串1'  : {'6串1':1},
      '6串7'  : {'6串1':1,'5串1':6},
      '6串22' : {'6串1':1,'5串1':6,'4串1':15},
      '6串42' : {'6串1':1,'5串1':6,'4串1':15,'3串1':20},
      '6串57' : {'6串1':1,'5串1':6,'4串1':15,'3串1':20,'2串1':15},
      '6串63' : {'6串1':1,'5串1':6,'4串1':15,'3串1':20,'2串1':15,'单关':6},
      '7串1'  : {'7串1':1},
      '8串1'  : {'8串1':1},
      '9串1'  : {'9串1':1},
      '10串1'  : {'10串1':1},
      '11串1'  : {'11串1':1},
      '12串1'  : {'12串1':1},
      '13串1'  : {'13串1':1},
      '14串1'  : {'14串1':1},
      '15串1'  : {'15串1':1}
    };
  },
  showPassWay:function(){
    var arr = [],dd = [],cc = [],mc = this.selectMatchCount(),sm = this.maxMatch,m, k, i = 0,len, html = [],mhtml = [],c = '';
    if (mc > sm) {mc = sm;}
    for (k in this.gg) {
      m = Number(k.substring(0, k.indexOf('串')));
      if (m <= mc) {arr.push(k);}
    }
    len = arr.length;
    for (i;i < len;i++) {
      var c = arr[i].substring(arr[i].indexOf('串') + 1);
      if (c == '1') {
        cc.push(arr[i]);
      }
      else {
        dd.push(arr[i]);
      }
    }
    i = 0;
    len = dd.length;
    for (i;i < len;i++) {
      if (this.passWay.indexOf(dd[i]) != -1) {
        c = 'inPassWay';
      }
      else {
        c = '';
      }
      html.push('<a onclick="cp2y.buy.choosePassWay(this)" class="' + c + '">' + dd[i] + '</a>');
    }
    i = 0;
    len = cc.length;
    for (i;i < len;i++) {
      if (this.passWay.indexOf(cc[i]) != -1) {
        c = 'inPassWay';
      }
      else {
        c = '';
      }
      mhtml.push('<a onclick="cp2y.buy.choosePassWay(this)" class="' + c + '">' + cc[i] + '</a>');
    }
    jcDom.dd.html(html.join(''));
    jcDom.cc.html(mhtml.join(''));
  },
  addContent:function(){
    var k = 0,
      html = [],
      s = 0;
    for (k in this.schemes) {
      s++;
      html.push("<dd>" + this.schemes[k].p.html() + "<a onclick='cp2y.buy.selectDan(this)' id='d_" + this.schemes[k].no + "' class='dan'>胆</a><a onclick='cp2y.buy.del(this)' class='delI'>X</a></dd>");
    }
    jcDom.betList.html(html.join(''));
    if(this.jcType==0){
      $("#betList .jcBet").click(function () {
        cp2y.buy.select($(this), true);
      });
    }
    if (this.passWay.length == 0) {
      if (s > this.maxMatch) {s = this.maxMatch;}
      this.passWay.push(s + "串1");
    }
    this.showPassWay();
    this.setPassWay();
    this.step2();
    this.chaipiao();
  },
  calcUnits:function(){
    var pass = this.getRealPass(),tu = 0,tm = 0;
    this.bets = [];
    if (pass.length > 0) {
      for (var i = 0;i < pass.length;i++) {
        var t = [],
          d = [],
          len = pass[i] == '单关' ? 1 : Number(pass[i].substring(0, pass[i].indexOf('串')));
        for (var k in this.schemes) {
          o = this.schemes[k];
          (o.dan ? d : t).push(o);
        }
        var bet = this.apartDraw(d, t, len);
        this.bets = this.bets.concat(bet);
        $(bet).each(function (j, v) {
          tu += this._calcUnitsRepeat(v, pass[i]);
        }.bind(this));
      }
    }
    this.chaipiao();
    return tu;
  },
  chaipiao: function () {
    if (this.passWay.length < 1) {
      return false;
    }
    var bet = this.bets,
      detail = [];
    $(bet).each(function (j, v){
      var result = '',
        arr = [],
        x = 0,
        xlen = v.length,
        tmp2 = [];
      for (x;x < xlen;x++) {
        var y = 0,
          ylen = v[x].v.length, tmp = [];
        for (y;y < ylen;y++) {
          var o = $.extend(true, {}, v[x]);
          o.v = v[x].v[y];
          o.score = $('.a'+v[x].no+'_'+o.v).eq(0).attr('data_s');
          o.o = '';
          tmp.push(o);
        }
        arr.push(tmp);
      }
      var newArr = [];
      function fun(tempArr,index){
        for(var i = 0;i < arr[index].length;i++){
          var t = tempArr.concat([arr[index][i]]);
          if(index == arr.length-1){
            newArr.push(t);
          }
          else{
            fun(t,index+1);
          }
        }
      }
      fun([],0);
      detail.push(newArr);
    });
    var xx = 0,xxlen = detail.length, piao = [];
    for (xx;xx < xxlen;xx++) {
      var yy = 0,yylen = detail[xx].length;
      for (yy;yy < yylen;yy++) {
        piao.push(detail[xx][yy]);
      }
    }
    var maxPrizeScopeA = [],minPrizeScopeA = [];
    for (var sch in this.schemes) {
      var tmp = [];
      $(this.schemes[sch].o).each(function (i, v) {
        tmp.push($(v).attr("data_s"));
      });
      maxPrizeScopeA.push([this.schemes[sch].no, tmp.max()]);
      minPrizeScopeA.push(tmp.min());
    }
    minPrizeScopeA.sort();
    var li= 0,llen=cp2y.buy.passWay.length,ldata=[];
    for(li;li<llen;li++){
      var kli=Number(cp2y.buy.passWay[li].substring(0,1));
      if(!kli){
        kli=1;
      }
      if(ldata.indexOf(kli)==-1){
        ldata.push(kli);
      }
    }
    minPrizeScopeA=minPrizeScopeA.slice(0,ldata.sort()[0]);
    var pI = 0,pLen = piao.length, finalAyy = [];
    for (pI;pI < pLen;pI++) {
      var pJ = 0,pJen = piao[pI].length,arr = [],xx = 0;
      for (pJ;pJ < pJen;pJ++) {
        if ( maxPrizeScopeA.inArray2([piao[pI][pJ].no, piao[pI][pJ].score]) ) {
          arr.push([piao[pI][pJ].no, piao[pI][pJ].score]);
          xx++;
        }
      }
      if (xx == pJen) {
        finalAyy.push(arr);
      }
    }
    var fI = 0,fLen = finalAyy.length, sum = 0;
    for (fI;fI < fLen;fI++) {
      var fJ = 0,fJen = finalAyy[fI].length,tt = 2;
      for (fJ;fJ < fJen;fJ++) {
        tt *= finalAyy[fI][fJ][1];
      }
      sum += tt;
    }
    minPrizeScopeA.sort();
    var minI = 0,minLen = piao[0].length,minPrize = 2;
    for (minI;minI < minLen;minI++) {
      minPrize *= minPrizeScopeA[minI];
    }
    $("#PrizeCalc").html((minPrize*this.mul*.65).toFixed(2) + "-" + (sum*this.mul*.65).toFixed(2) + "元");
  },
  del:function (o) {
    var data = eval("(" + $(o).prev().prev().attr('data') + ")");
    delete this.schemes[data.no];
    $(o).parent().remove();
    $(".a" + data.no + "_3").removeClass('jcSelect');
    $(".a" + data.no + "_1").removeClass('jcSelect');
    $(".a" + data.no + "_0").removeClass('jcSelect');
    this.showPassWay();
    this.setPassWay();
    this.setUnits();
  },
  submit:function(isHemai){
    var p,content = [],
      scheme = this.schemes,
      i = 0;
    for (i in scheme) {
      content.push(i.split("_")[1]+"`"+i.split("_")[1]+"`"+scheme[i].h+"`"+scheme[i].g+"`"+scheme[i].dan + "`" + scheme[i].v.join(','));
    }
    p = {
      lotteryId: _.bt,
      issue: this.sels,
      issueId: this.sels,
      issueCount: 1,
      multiple: this.mul,
      schemeAmount: this.money,
      buyAmount: this.money,
      buyType: this.saleType,
      betType: this.betType,
      pass: this.passWay.join(','),
      cutRepeat: true,
      submitAction:'submitAction',
      ajax:true,
      nw:'2011',
      submitWay: 0,
      schemeNumber: "content=" + content.join("$")
    };
    if(isHemai==1){//合买
      p.buyAmount=this.RenGou;
      p.safeguardMoney=this.BaoDi;//保底
      p.minParticipant=this.ZuiDiRenGou;//最少参与
      p.remuneration=this.YongJin;//佣金
      p.open=this.openStatus;//合买方案公开情况
      p.schemeDesc=$('#schemeDesc').val()//方案描述
    }
    $.ajax({
      url: WebAppUrl.HOME_APP_URL + "/core/lottery/buy_lottery",
      data: p,
      type: "post",
      dataType: "json",
      beforeSend: function () {
        cp2y.dialog.loading();
      },
      success: function (data) {
        cp2y.dialog.clearLoading();
        if (data.flag == -1) {
          return cp2y.quick.user.signInBox();
        }
        else if (data.flag == 2) {
          return cp2y.dialog.confirm("余额不足，去充值？", function () {
            cp2y.dialog.closeConfirm();
            location.href = WebAppUrl.HOME_APP_URL + '/recharge/index';
          });
        }
        else if (data.flag == 1) {
          location.href = WebAppUrl.HOME_APP_URL + '/lottery/detail#scheme=' + data.schemeId;
        }
        else {
          cp2y.dialog.alert(data.message);
        }
      }
    });
  }
};
$.extend(cp2y.buy,bd);