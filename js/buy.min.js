/**
* @author luwenbin@live.com
*/
var autoRunMark;
cp2y.issues={
hideNext:function(e){
  $(e).next().hide();
},
simpleIssues:[],
getSimpleIssues:function(p){
    dom.MainStep31.show();
    dom.MainStep32.hide();
    dom.Zhuihao.html('高级追号');
    dom.ZhihaoTi.html('普通追号');
    dom.Zhuihao.off().on('click',function(){
        $(this).html('普通追号');
        dom.ZhihaoTi.html('高级追号');
        cp2y.issues.getIssues();
    });
    if(p==1){
        dom.Issues.focus();
        dom.Issues.select();
    }else{
        dom.Muls.focus();
        dom.Muls.select();
    }
    $.ajax({
        url:WebAppUrl.HOME_APP_URL+"/lottery/commontraceIssueList",
        anysc:false,
        data:{lotteryId:_.bt,random:new Date().getTime()},
        beforeSend:function(){
            cp2y.dialog.loading();
        },
        success:function(data){
            cp2y.dialog.clearLoading();
            if(data.flag==1){
                var i=0,data,html=[],len,t;
                if(BT.lotto.indexOf(_.bt)!=-1 || BT.sz.indexOf(_.bt)!=-1){
                    data=data.dataList;len=data.length;
                    cp2y.issues.simpleIssues=data;
                    html.push('<li><input id="simpleIss1" name="simpleIssueBtn" class="radioType" onclick="cp2y.issues.setSimple3(13);" type="radio"><label for="simpleIss1">追半个月(13期)</label></li>');
                    html.push('<li><input id="simpleIss2" name="simpleIssueBtn" class="radioType" onclick="cp2y.issues.setSimple3(30);" type="radio"><label for="simpleIss2">追1个月(30期)</label></li>');
                    html.push('<li><input id="simpleIss3" name="simpleIssueBtn" class="radioType" onclick="cp2y.issues.setSimple3('+len+');" type="radio"><label for="simpleIss3">最大('+len+'期)</label></li>');
                }else{
                    data=data.dataList;len=data.length;
                    cp2y.issues.simpleIssues=data;
                    for(i;i<3;i++){
                        t=i==0?"今天":i==1?"明天":"后天";
                        html.push('<li><input id="simpleIss'+i+'" class="issueCheck simpleIssueBtn" onclick="cp2y.issues.setSimple();" type="checkbox" data="'+i+'">');
                        html.push('<label for="simpleIss'+i+'">'+t+data[i].issueList.length+'期</label></li>');
                    }
                }
                dom.SimpleIssues.html(html.join(''));

            }
        },
        error:function(){cp2y.dialog.clearLoading();}
    });
},
setSimple:function(){
    cp2y.buy.issues={};
    var data,i=0,len,ty=$("#muls").val(),simpleIssueBtn=$(".simpleIssueBtn"),datas=[];
    for(i;i<3;i++){
        if(simpleIssueBtn.eq(i).attr('checked')){
            data=this.simpleIssues[i].issueList;
            var j=0,jlen=data.length;
            for(j;j<jlen;j++){
                datas.push(data[j].issueId);
            }
        }
    };i=0;len=datas.length;
    for(i;i<len;i++){
        cp2y.buy.issues[datas[i]]=ty;
    }
},
setSimple2:function(_this){	
    $(_this).next().show();
    cp2y.buy.issues={};
    if(!$(_this).val().isInt()){
        $(_this).val(1);
    }
    if(BT.lotto.indexOf(_.bt)!=-1 || BT.sz.indexOf(_.bt)!=-1){
        if(!$(_this).val().isInt()){
            $(_this).val(1);
        }else if($(_this).val()>50){
            $(_this).val(50);
        }
        var isNum=$(_this).val(),data,i=0,len,ty=$("#muls").val();
        for(i;i<isNum;i++){
            cp2y.buy.issues[cp2y.issues.simpleIssues[i].issueId]=ty;
        }
    }else{
        var i=0,issues=[],isNum=$(_this).val(),ty=$("#muls").val();
        for(i;i<3;i++){
            var j=0,len=this.simpleIssues[i].issueList.length;
            for(j;j<len;j++){
                issues.push(this.simpleIssues[i].issueList[j].issueId);
            }
        }
        if(isNum>issues.length){
            $(_this).val(issues.length);
            isNum=issues.length;
        };i=0;
        for(i;i<isNum;i++){
            cp2y.buy.issues[issues[i]]=ty;
        }
    }
},
setSimple3:function(l){
    cp2y.buy.issues={};
    var i=0,len,ty=$("#muls").val();
    for(i;i<l;i++){
        cp2y.buy.issues[cp2y.issues.simpleIssues[i].issueId]=ty;
    }
},
setMul:function(_this){
    $(_this).next().show();
    if(!$(_this).val().isInt()){
        $(_this).val(1);
    }
    if($(_this).val()>9998){
        $(_this).val(9999);
    }
    var i=0,ty=$(_this).val();
    for(i in cp2y.buy.issues){
        cp2y.buy.issues[i]=ty;
    }
},
getIssues:function(){
    dom.MainStep31.hide();
    dom.MainStep32.show();
    dom.Zhuihao.html('普通追号');
    dom.ZhihaoTi.html('高级追号');
    dom.Zhuihao.off().on('click',function(){
        $(this).html('高级追号');
        dom.ZhihaoTi.html('普通追号');
        cp2y.issues.getSimpleIssues();
    });
    $.ajax({
        url:WebAppUrl.HOME_APP_URL+"/lottery/traceIssueList",
        anysc:false,
        data:{lotteryId:_.bt,random:new Date().getTime()},
        beforeSend:function(){
            cp2y.dialog.loading();
        },
        success:function(data){
            cp2y.dialog.clearLoading();
            if(data.flag==1){
                var issue=data.dataList,i=0,len=issue.length,html=[];
                html.push('<div class="IssuesTop"><span><input id="setIssues" class="input3" type="number" min="0" onblur="cp2y.issues.setIssues(this)"/><b>期</b></span>');
                html.push('<span><input id="selfMul" type="number" class="input3" min="0" onblur="cp2y.issues.selfMuls(this)"/><b>倍</b></span>');
                html.push('<span>累加<input id="selfMul2" type="number" class="input3 input31" min="0" onblur="cp2y.issues.selfMuls2(this)"/><b>倍</b></span></div>');
                html.push('<ul id="IssuesLists">');
                for(i;i<len;i++){
                    html.push('<li><span><input class="issueCheck" onclick="cp2y.issues.setIssue(this,-1)" type="checkbox" data="'+issue[i].issueId+'"/>'+cp2y.util.setIssue1(issue[i].issue)+'期</span>');
                    html.push('<span><input class="input2 selfMul" onblur="cp2y.issues.selfMul(this,-1)" type="number"  min="1" max="100" value="0" data="'+issue[i].issueId+'"/>倍</span><span></span></li>');
                }
                html.push('</ul>');
                dom.IssuesList.html(html.join(''));
            }
        },
        error:function(){cp2y.dialog.clearLoading();}
    });
},
setIssues:function(o){
    var len=$(o).val(),i=0,IssuesLists=$("#IssuesLists"),cur=$("#IssuesLists").children(".cur"),curlen=cur.length,totalL=IssuesLists.children('li').length;
    //清除所有
    if(len>totalL){
        len=totalL;
        $(o).val(totalL);
    }
    for(x in cp2y.buy.issues){
        delete cp2y.buy.issues[x];
    }
    for(i;i<curlen;i++){
        cur.eq(i).removeClass('cur');
        cur.eq(i).find(".issueCheck").attr('checked',null);
        cur.eq(i).find(".selfMul").val(0);
        cur.eq(i).children('span').eq(2).html("");
    }
    i=0;
    //重新计算
    for(i;i<len;i++){
        this.setIssue(IssuesLists.children("li").eq(i).find('.issueCheck'),0,i);
    }
},
setIssue:function(obj,type,i){
    var selfMul2=$("#selfMul2").val(),selfMul=$("#selfMul").val(),ty;
    if(selfMul2){
        if(!i){i=1;}
        ty=(i+1)*selfMul2;
    }else if(selfMul){
        ty=selfMul;
    }else{
        ty=1;
    }
    if(type==0){
        obj.attr('checked','checked');
        obj.parent().parent().addClass('cur');
        obj.parent().next().children("input").val(ty);
        obj.parent().next().next().html(ty*2+" 元");
        cp2y.buy.issues[obj.attr("data")]=ty;
    }else if(type==-1){
        if($(obj).attr('checked')=='checked'){
            $(obj).attr('checked', null);
            $(obj).parent().parent().removeClass('cur');
            $(obj).parent().next().children("input").val(0);
            delete cp2y.buy.issues[$(obj).attr("data")];
            $(obj).parent().next().next().html('');
        }else{
            $(obj).attr('checked','checked');
            $(obj).parent().parent().addClass('cur');
            $(obj).parent().next().children("input").val(ty);
            cp2y.buy.issues[$(obj).attr("data")]=ty;
            $(obj).parent().next().next().html(ty*2+" 元");
        }
    }
},
selfMuls:function(o){
    $("#selfMul2").val('');
    var i=0,IssuesLists=$("#IssuesLists").children(".cur"),len=IssuesLists.length,val=$(o).val();
    if(!val){val=1;$(o).val(1);}
    for(i;i<len;i++){
        this.selfMul(IssuesLists.eq(i),0,val);
    }
},
selfMul:function(obj,type,val){
    if(type==0){
        var o=obj.find(".selfMul");
        o.val(val);
        obj.children("span").eq(2).html(val*2+" 元");
        cp2y.buy.issues[o.attr("data")]=val;
    }else if(type==-1){
        var o=$(obj);
        if(o.val()>0){
            o.parent().prev().children("input").attr('checked','checked');
            cp2y.buy.issues[o.attr("data")]=o.val();
            o.parent().next().html(o.val()*2+" 元");
        }else if(o.val()==0){
            o.parent().prev().children("input").attr('checked',null);
            o.parent().parent().removeClass('cur');
            delete cp2y.buy.issues[o.attr("data")];
            o.parent().next().html('');
        }
    }
},
selfMuls2:function(o){
    $("#selfMul").val('');
    var i=0,IssuesLists=$("#IssuesLists").children(".cur"),len=IssuesLists.length,val=$(o).val(),o;
    if(!val){val=1;$(o).val(1);}
    for(i;i<len;i++){
        o=IssuesLists.eq(i).find(".selfMul");
        o.val((i+1)*val);
        cp2y.buy.issues[o.attr("data")]=(i+1)*val;
        IssuesLists.eq(i).children('span').eq(2).html((i+1)*val*2+" 元");
    }
},
setMulSimpleBox:function(){
    var b=cp2y.buy.Mul?cp2y.buy.Mul:1;
    var html='<input type="tel" id="MulBox" placeholder="输入倍数" class="input4 mt40 tc" value="'+b+'" /><a onclick="cp2y.issues.setMulSimple()" class="btn1 mt10">确认</a>',o={
        t:'倍数',
        c:html
    };
    cp2y.input.openBox(o);
},
setMulSimple:function(){
    var t=$('#MulBox');
    if(!t.val().isInt()){
        t.val(1);
    }else if(t.val()>9998){
        t.val(9999);
    }
    var i=0,ty=t.val();
    for(i in cp2y.buy.issues){
        cp2y.buy.issues[i]=ty;
    }
    cp2y.buy.Mul=ty;
    dom.Muls.html(ty);
    cp2y.input.closeBox();
    cp2y.buy.complete2();
},
setIssueSimpleBox:function(){
  var b=0,html=[],c1='',c2='',c3='';
  for(xx in cp2y.buy.issues){
    b++;
  }
  if(b>1){
    //c1='style="display:block"'
  }else if(b==0){
    b=1;
    cp2y.buy.issues[cp2y.buy.currentIssueId]=cp2y.buy.Mul;
  }
  if(cp2y.buy.burstIntoStop){
    c2='checked';
  }
  if(cp2y.buy.prizeStop){
    c3=cp2y.buy.prizeStop;
  }
  html.push('<input type="tel" onblur="cp2y.issues.setIssueSimple();" id="IssueBox" placeholder="输入期数" class="input4 mt40 tc" value="'+b+'" />');
  html.push('<div class="mt10" id="setSthSimple" '+c1+'>');
  if(BT.kk.indexOf(_.bt)!=-1){
  html.push('<div><span>追号开始前，号码开出停止追号</span><input onblur="cp2y.buy.setBurstIntoStop(this)" type="checkbox" class="input8" '+c2+' /></div>');
  }
  html.push('<div>中出<input class="input9" type="tel" onblur="cp2y.buy.setPrizeStop(this)" min="0" placeholder="多少" value="'+c3+'" />元停止追号</div>');
  html.push('</div><a onclick="cp2y.issues.closeSetIssueSimple();" class="btn1 mt10">确认</a>');
  var o={
    t:'期数',
    c:html.join('')
  };
  cp2y.input.openBox(o);
},
setIssueSimple:function(){
    var t=$('#IssueBox');
    if(!t.val().isInt()){
       t.val(1);
    }
},
closeSetIssueSimple:function(){
  $.ajax({
    url:WebAppUrl.HOME_APP_URL+"/lottery/traceIssueList",
    beforeSend:function(){cp2y.dialog.loading();},
    data:{lotteryId:_.bt,random:new Date().getTime()},
    success:function(data){
      cp2y.dialog.clearLoading();
      if(data.flag==1){
        var t=$('#IssueBox'),issue=data.dataList,i=0,len=issue.length,isNum=t.val(),data,i=0,len,ty=cp2y.buy.Mul;
        if(BT.lotto.indexOf(_.bt)!=-1 || BT.sz.indexOf(_.bt)!=-1){
          if(t.val()>50){
            t.val(50);
          }
          cp2y.buy.issues={};
          try{
            for(i;i<isNum;i++){
              cp2y.buy.issues[issue[i].issueId]=ty;
            }
          }catch(e){}
        }else{
          if(isNum>len){
            t.val(len);
            isNum=len;
          };i=0;
          cp2y.buy.issues={};
          for(i;i<isNum;i++){
            cp2y.buy.issues[issue[i].issueId]=ty;
          }
        }
        if(t.val()>1){
          $('#setSthSimple').show();						
        }else{
          $('#setSthSimple').hide();
        }
        dom.Issues.html(t.val());
        cp2y.input.closeBox();
        cp2y.buy.complete2();
      }
    },
    error:function(){cp2y.dialog.clearLoading();}
  });
}
};

var dom={
  t:$("#Title"),
  cpt:$("#changePlayType"),
  c:$("#choose"),//缓存投注区域
  Muls:$("#muls"),//缓存倍数选择框
  Muls2:$("#muls2"),//缓存倍数选择框
  Issues:$("#issues"),//缓存追期框
  Issues2:$("#issues2"),//缓存追期框
  CurBets:$("#curBets"),//缓存当前注数显示区域
  CurMoney:$("#curMoney"),//缓存当期金额显示区域
  BetLists:$("#betLists"),
  BetList:$("#betList"),//缓存所有投注内容区域
  Bets:$("#bets"),//缓存所有倍数
  Money:$("#money"),//缓存总金额
  betListsTitle:$("#betListsTitle"),
  MoreIssuesBtn:$("#MoreIssuesBtn"),
  IssuesList:$("#IssuesList"),
  CountDown:$("#countDown"),//缓存倒计时区域
  curIssue:$("#curIssue"),
  curCountDown:$("#curCountDown"),
  buyBox:$("#buyBox"),
  payBox:$("#payBox"),
  MoreDetail:$("#MoreDetail"),
  MoreLocked:$("#MoreLocked"),
  complete:$("#completeZH"),
  header:$("#mainSection header"),
  ZhihaoTi:$("#ZhihaoTi"),
  QRTi:$("#QRTi"),
  GoIndex:$("#GoIndex"),//缓存 返回首页 按钮
  GoIndex1:$("#GoIndex1"),
  GoSelectArea:$("#GoSelectArea"),//返回投注区域按钮
  GoMyBets:$("#GoMyBets"),//返回我的投注区域
  More:$("#More"),//缓存更多按钮
  Edit:$("#EditBets"),//缓存编辑投注列表按钮
  Zhuihao:$("#Zhuihao"),//缓存追号按钮
  MainStep1:$("#MainStep1"),
  MainStep2:$("#MainStep2"),
  MainStep3:$("#MainStep3"),
  MainStep31:$("#MainStep31"),
  SimpleIssues:$("#simpleIssues"),
  MainStep32:$("#MainStep32"),
  setIssues:$("#setIssues"),
  selfMul:$("#selfMul"),
  selfMul2:$("#selfMul2"),
  Clear:$("#clear"),//清除按钮
  Randoms:$("#Randoms"),//机选按钮
  cancelRandoms:$("#cancelRandoms"),
  RandomList:$("#RandomList"),//机选列表
  Tools2:$("#tools2"),
  addContent:$("#addContent"),
  aPrize:$("#aboutPrize"),
  MoreNav:$("#MoreNav"),
  MoreLists:$(".MoreLists")
};

cp2y.buy={
  complete:function(){
      dom.Issues2.html(cp2y.buy.getTotalMoney()[0]); //输出期数
      dom.Issues.val(cp2y.buy.getTotalMoney()[0]);
      dom.Money.html(cp2y.buy.getTotalMoney()[1]);
      cp2y.buy.step2();
  },
  complete2:function(){
      dom.Money.html(cp2y.buy.getTotalMoney()[1]);
  },
  isEdit:function(){
      if(dom.Edit.html()=="完成"){
          this.editScheme();
          return false;
      }else{
          return true;
      }
  },
  needStop:function(){
      if(!this.isEdit()){
          return false;
      }else{
          cp2y.buy.random(1);
      }
  },
  step1:function(){
      if(!this.isEdit()){return false;}
      dom.GoIndex.show();//返回大厅
      dom.GoIndex1.hide();
      dom.GoSelectArea.hide();//返回投注区
      dom.GoMyBets.hide();//返回我的选项
      dom.More.show();//选择玩法
      dom.MoreDetail.hide();
      dom.MoreLocked.hide();
      dom.Edit.hide();//修改投注区域
      dom.Zhuihao.hide();//追号类型
      dom.MainStep1.show();
      dom.MainStep2.hide();
      dom.MainStep3.hide();
      dom.ZhihaoTi.hide();
      dom.QRTi.hide();
      dom.header.removeClass('fixed');
      this.setClear(1);
  },
  step11:function(){
      if(!this.isEdit()){return false;}
      dom.GoIndex.hide();//返回大厅
      dom.GoIndex1.show();
      dom.GoSelectArea.hide();//返回投注区
      dom.GoMyBets.hide();//返回我的选项
      dom.More.show();//选择玩法
      dom.MoreDetail.hide();
      dom.MoreLocked.hide();
      dom.Edit.hide();//修改投注区域
      dom.Zhuihao.hide();//追号类型
      dom.MainStep1.show();
      dom.MainStep2.hide();
      dom.MainStep3.hide();
      dom.ZhihaoTi.hide();
      dom.QRTi.hide();
      dom.header.removeClass('fixed');
      this.setClear(1);
  },
  step2:function(){
      dom.GoIndex.hide();//返回大厅
      dom.GoIndex1.hide();
      dom.GoSelectArea.show();//返回投注区
      dom.GoMyBets.hide();//返回我的选项
      dom.More.hide();//选择玩法
      dom.MoreDetail.hide();
      dom.MoreLocked.hide();
      dom.Edit.show();//修改投注区域
      dom.Zhuihao.hide();//追号类型
      dom.MainStep1.hide();
      dom.MainStep2.show();
      dom.MainStep3.hide();
      dom.ZhihaoTi.hide();
      dom.QRTi.show();
      dom.header.removeClass('fixed');
  },
  step3:function(){
      if(!this.isEdit()){return false;}
      dom.GoIndex.hide();//返回大厅
      dom.GoIndex1.hide();
      dom.GoSelectArea.hide();//返回投注区
      dom.GoMyBets.show();//返回我的选项
      dom.More.hide();//选择玩法
      dom.MoreDetail.hide();
      dom.MoreLocked.hide();
      dom.Edit.hide();//修改投注区域
      dom.Zhuihao.show();//追号类型
      dom.MainStep1.hide();
      dom.MainStep2.hide();
      dom.MainStep3.show();
      dom.ZhihaoTi.show();
      dom.header.addClass('fixed');
      //快开特殊参数
      // if(BT.kk.indexOf(_.bt)!=-1){
      // 	dom.aPrize.addClass('kkBurst');
      // 	if($("#BurstIntoStop2").size()==0){
      // 	dom.aPrize.prepend('<div id="BurstIntoStop2"><div class="mS1"><input type="checkbox" class="input8" id="burstIntoStop" checked /></div><div class="mS21">追号开始前，号码开出停止追号</div></div>');
      // 	}
      // }else{
      // 	dom.aPrize.removeClass('kkBurst');
      // 	$("#BurstIntoStop2").remove();
      // }
  },
  setPrizeStop:function(_this){
      var prizeStop=$(_this).val();
      if(!prizeStop){prizeStop=0;}
      this.prizeStop=prizeStop;
  },
  setBurstIntoStop:function(_this){
      var burstIntoStop=$(_this).attr('checked');
      if(burstIntoStop){
          this.burstIntoStop=1;
      }else{
          this.burstIntoStop=0;
      }
  },
  burstIntoStop:1,//快开用
  prizeStop:1,
  saleType:false,
  myquota:0,
  minBuy:0,
  baodi:0,
  erm:0,
  clearData:function(){
      cp2y.dialog.closeConfirm();
      cp2y.buy.issues={};
      cp2y.buy.Mul=1;
      this.burstIntoStop=1;
      this.prizeStop=1,
      //清除期数
      //清除倍数
      dom.Bets.html(0);
      dom.Money.html(0);
      //dom.Issues2.html(1);
      dom.Issues.html(1);
      //dom.Muls2.html(1);
      dom.Muls.html(1);
      dom.BetList.html("");
      cp2y.buy.step1();
  },
  init:function(play){
      dom.GoSelectArea.click(function(){
          return cp2y.dialog.confirm("放弃已选号码?",function(){
              cp2y.buy.clearData();
          },function(){
              cp2y.buy.step1();
          });
      });
      dom.GoMyBets.click(function(){cp2y.buy.step2()});
      dom.More.click(function(){cp2y.buy.toggleMore();});
      dom.t.click(function(){cp2y.buy.toggleMore();});
      dom.QRTi.click(function(){cp2y.buy.editScheme();});
      dom.Edit.click(function(){cp2y.buy.editScheme();});
      dom.MoreLocked.click(function(){cp2y.buy.toggleMore();});
      if( play in _ ){
          $.extend(cp2y.buy,_[play]);
      }else{
          $.extend(cp2y.buy,_['a0']);
      }
      this.creatMainPage();//修改标题，填充玩法选择区域
      dom.cpt.children("b").click(function(){
          cp2y.buy.changePlayType($(this).attr("data"));
          $(this).siblings().removeClass("onn");
          $(this).addClass("onn");
          dom.t.html("<span>"+cp2y.buy.playName+"</span>-"+$(this).attr("data2"));
          dom.QRTi.html("<span>"+cp2y.buy.playName+"</span>-投注");
          dom.CurBets.html(0);
          dom.CurMoney.html(0);
          cp2y.buy.setClear(1);
          dom.More.click();
      });//预绑定 切换玩法事件。
      this.creatChooseArea();//构造投注区域
      this.step1();
      dom.BetList.html('');
      //清空数据
      this.issues={};
      dom.Bets.html(0);
      dom.Money.html(0);
      this.countDown();
      cp2y.buy.setClear(1);
  },
  changePlayType:function(play){
      $.extend(cp2y.buy,_[play]);
      this.updataYL();
      this.creatChooseArea();//切换玩法重构投注区域
  },
  editScheme:function(){
      if(dom.Edit.html()=="编辑"){
          dom.Edit.html('完成');
          $(".delI").show();
      }else if(dom.Edit.html()=="完成"){
          dom.Edit.html('编辑');
          $(".delI").hide();
      }
  },
  creatMainPage:function(){
      dom.t.html("<span>"+this.playName+"</span>-"+this.playType);
      dom.QRTi.html("<span>"+cp2y.buy.playName+"</span>-投注");
      dom.cpt.html(_.playTypes).show();
      dom.More.removeClass("on");
      dom.MoreDetail.hide();
  },
  creatChooseArea:function(){
      dom.c.html(this.bet);//构造 投注区域
      if(this.hasOutGet){
          this.outGet();
          this.count();
      }else{
          this.setClear();
      }
  },
  getBall:function(){
      return dom.c.find('a');
  },
  setClear:function(s){
      if(s==1){//默认状态：快速机选，金额，提交
          dom.Clear.hide();
          dom.Randoms.show();
          dom.cancelRandoms.hide();
          dom.RandomList.hide();
          dom.Tools2.show();
          dom.addContent.show();
      }else if(s==2){//打开机选：关闭机选，机选列表
          dom.Clear.hide();
          dom.Randoms.hide();
          dom.cancelRandoms.show();
          dom.RandomList.show();
          dom.Tools2.hide();
          dom.addContent.hide();
      }else if(s==3){//有号码的状态：清除号码，金额，提交
          dom.Clear.show();
          dom.Randoms.hide();
          dom.cancelRandoms.hide();
          dom.RandomList.hide();
          dom.Tools2.show();
          dom.addContent.show();
      }
  },
  clear:function(){
      var o=this.getBall(),i=0,len=o.length;
      for(i;i<len;i++){
          if(o.eq(i).hasClass("rb")){
              o.eq(i).removeClass("rb");
          }else if(o.eq(i).hasClass("bb")){
              o.eq(i).removeClass("bb");
          }else if(o.eq(i).hasClass("yb")){
              o.eq(i).removeClass("yb");
          }else if(o.eq(i).hasClass("rb2")){
              o.eq(i).removeClass("rb2");
          }else if(o.eq(i).hasClass("rb1")){
              o.eq(i).removeClass("rb1");
          }else if(o.eq(i).hasClass("rb2")){
              o.eq(i).removeClass("rb2");
          }else if(o.eq(i).hasClass("rb3")){
              o.eq(i).removeClass("rb3");
          }else if(o.eq(i).hasClass("rb4")){
              o.eq(i).removeClass("rb4");
          }else if(o.eq(i).hasClass("rb5")){
              o.eq(i).removeClass("rb5");
          }else if(o.eq(i).hasClass("bb2")){
              o.eq(i).removeClass("bb2");
          }
      }
      this.count();
  },
  issues:{},
  Mul:1,
  Muls:[],
  getTotalMoney:function(){
      var key,counter = 0,muls=[],money=0,bets=dom.Bets.html();
      for(key in cp2y.buy.issues){
          counter++;
          muls.push(cp2y.buy.issues[key]);
      }
      if(!counter){
          counter=1;
          muls.push(cp2y.buy.Mul);
      }
      var i=0,len=muls.length;
      if((muls.join(',')+',').replace(new RegExp(muls[0]+',','gi'),'')==''){
          dom.Muls2.html(muls[0]);
          money=bets*counter*muls[0]*2;
      }else{
          dom.Muls2.html("不同");
          for(i;i<len;i++){
              money=money+bets*muls[i]*2;
          }
      }
      if($("#additional").attr("checked")){
          money=money*1.5;
      }
      return [counter,money];
  },
  getBets:function(){
      var a=[],betlist=dom.BetList.find("li"),i=0,len=betlist.length;
      for(i;i<len;i++){
          var o={};
          o.name=this.playName;
          o.playType=this.playType;
          o.bets=betlist.eq(i).attr("data_bets");
          o.input=betlist.eq(i).attr("data_input");
          o.code=betlist.eq(i).attr("data_code");
          a.push(o);
      }
      return a;
  },
  addRecord:function(o){
      if(_.bt==10026){
          if($("#DLTOnly").length==0){
              $("#totalMsgTop").before('<div id="DLTOnly"><input onclick="cp2y.buy.showMoney()" id="additional" type="checkbox"><label for="additional">追加投注</label></div>');
          }
      }else{
          $("#DLTOnly").remove();
      }
      dom.BetList.prepend(o);
      dom.BetLists.show();
      this.step2();
      this.showMoney();
  },
  showMoney:function(){
      var i=0,getBets=this.getBets(),len=getBets.length,x=0;
      for(i;i<len;i++){
          x+=Number(getBets[i].bets);
      }
      dom.Bets.html(x);
      var tf=true;
      for(xx in cp2y.buy.issues){tf=false;break;}
      if(tf){
          dom.Money.html(x*this.Mul*2);
          if(_.bt==10026){
              if($("#additional").attr("checked")){
                  dom.Money.html(x*this.Mul*2*15/10);
              }
          }else{
              dom.Money.html(x*this.Mul*2);
          }
      }else{
          var key,money=0;
          for(key in cp2y.buy.issues){
              money+=x*cp2y.buy.issues[key]*2;
          }
          dom.Money.html(money);
          if(_.bt==10026){
              if($("#additional").attr("checked")){
                  money=Number(money)*15/10;
                  dom.Money.html(money);
              }
          }
      }
  },
  del:function(o){
      $(o).parent().remove();
      this.showMoney();
  },
  delAll:function(){
      Bets.html(0);
      Money.html(0);
      BetList.html('');
  },
  //快开倒计时
  sellEndTime:"",
  serverTime:"",
  currentIssue:"",
  currentIssueId:"",//当前奖期
  issueStatus:"",
  reCountDown:function(){//从后台切出时重计算
    if(autoRunMark){
      clearTimeout(autoRunMark);
      this.countDown();
    }
  },
  countDown:function(){
    $.ajax({
      url:WebAppUrl.HOME_APP_URL+"/lottery/query_cur_issue",
      dataType:'text',
      //anysc:false,
      beforeSend:function(){},
      data:{lotteryId:_.bt,random:new Date().getTime()},
      success : function(result) {
        if (result == "" || result.indexOf('ERROR') != -1){return false;}
        var o = eval("("+result+")");
        if(o.flag!=1){return false;}
        cp2y.buy.serverTime = parseInt(o.time);
        cp2y.buy.currentIssue = o.issue;
        cp2y.buy.currentIssueId = o.issueId;
        //cp2y.buy.issueStatus = o.flag;
        cp2y.buy.sellEndTime = o.sellEndTime;
        if(BT.kk.indexOf(_.bt)!=-1){
          dom.curIssue.html(cp2y.util.setIssue1(o.issue));
        }else{
          dom.curIssue.html(cp2y.util.setIssue2(o.issue));	
        }
        if(cp2y.buy.serverTime>1001){
          cp2y.buy.autoRun();
          cp2y.buy.updataYL();
        }else{
          setTimeout('cp2y.buy.countDown();cp2y.buy.updataYL();',5000);
        }
      }
    });
  },
  updataYL:function(){},
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
      dom.curCountDown.html(html);
      try{clearTimeout(autoRunMark);}catch(e){}
      autoRunMark=setTimeout('cp2y.buy.autoRun()', 1000);
    }
  },
  //合买相关参数
  saleType:0,//默认关闭
  RenGou:0,//认购金额
  ZuiDiRenGou:1,//最低购买金额
  BaoDi:0,//保底金额
  openStatus:1,
  pay:function(){//购买
    return cp2y.dialog.confirm("确认付款?",function(){
      cp2y.buy.saleType=1;
      cp2y.buy.submit();
    });
  },
  pay2:function(){//合买
    return cp2y.dialog.confirm("确认付款?",function(){
      cp2y.buy.saleType=0;
      cp2y.buy.submit(1);
    });
  },
  submit:function(isHemai){
    cp2y.dialog.closeConfirm();
    var getBets=this.getBets(),issueIds=[],i=0,len=getBets.length,issueCount=0,
        multiple=[],burstIntoStop=this.burstIntoStop,prizeStop=this.prizeStop,
        schemeNumber={},schemeNumbers='',money,dLen=[];
    for(i in cp2y.buy.issues){
      issueCount++;
      issueIds.push(i);
      multiple.push(this.Mul);
    }
    i=0;
    for(i;i<issueCount;i++){
      if(this.currentIssueId!=issueIds[i]){
        dLen.push(issueIds[i]);
      }else{
        break;
      }
    }
    issueIds.splice(0,dLen.length);
    multiple.splice(0,dLen.length);
    if(issueIds.length==0){
      issueCount=1;
      multiple.push(1);
      issueIds.push(this.currentIssueId);
    }//未追号选择当期
    i=0;
    for(i;i<len;i++){
      if(schemeNumber[getBets[i].input]==undefined){
        schemeNumber[getBets[i].input]=[];
      }
      schemeNumber[getBets[i].input].push(getBets[i].code);
    }
    i=0;
    for(i in schemeNumber){
      schemeNumbers+=i+"="+schemeNumber[i].join("|")+";";
    }//号码拼接
    var data={
      lotteryId:_.bt,//彩票ID
      buyType:this.saleType//方案购买类型
    };
    if(_.bt==10026){
      var additional=$("#additional").attr("checked")?1:0;
      data.additional=additional;
    }
    /*重置内存中的奖期*/
    i=0;
    for(i;i<dLen.length;i++){
      delete cp2y.buy.issues[dLen[i]]
    }
    dom.Issues.html(issueIds.length);
    /*重算金额*/
    money=issueIds.length*this.Mul*2*dom.Bets.html();
    if(data.additional){
      money*=1.5;
    }
    dom.Money.html(money);
    if(money>100000000){
      return cp2y.dialog.alert('金额过大');
    }
    if(dLen.length>0){
      return cp2y.dialog.alert(dLen[0]+'已截止，已更新至最新奖期');
    }
    data.schemeAmount=money;
    data.buyAmount=money;
    data.issueId=issueIds[0];//奖期
    data.issueIds=issueIds.join(",");//追号奖期ID
    data.issueCount=issueCount;//购买奖期数
    data.multiple=cp2y.buy.Mul;//倍数
    data.multiples=multiple.join(',');//倍数
    data.schemeNumber=schemeNumbers.substr(0,schemeNumbers.length-1);//方案号码
    data.burstIntoStop=burstIntoStop;//开出停止追号,0/1
    data.prizeStop=prizeStop;//中奖停止追号,0：不限；其他：指
    if(BT.kk.indexOf(_.bt)!=-1){
      data.burstIntoStop=cp2y.buy.burstIntoStop;
    }
    if(isHemai==1){//合买
      data.buyAmount=this.RenGou;
      data.safeguardMoney=this.BaoDi;//保底
      data.minParticipant=this.ZuiDiRenGou;//最少参与
      data.remuneration=this.YongJin;//佣金
      data.open=this.openStatus;//合买方案公开情况
      data.schemeDesc=$('#schemeDesc').val()//方案描述
    }
    $.ajax({
      url:WebAppUrl.HOME_APP_URL+"/core/lottery/buy_lottery",
      data:data,
      type:"post",
      beforeSend:function(){
        cp2y.dialog.loading();
      },
      success:function(data){
        cp2y.dialog.clearLoading();
        if(typeof data=="string"){
          data=eval("("+data+")");
        };
        if (data.flag == -1) {
          return cp2y.quick.user.signInBox();
        } else if (data.flag == 2) {
          return cp2y.dialog.confirm("余额不足，去充值？", function () {
            cp2y.dialog.closeConfirm();
            //cp2y.quick.user.rechargeBox();
            location.href = WebAppUrl.HOME_APP_URL + '/recharge/index';
          });
        } else if (data.flag == 1) {
          location.href = WebAppUrl.HOME_APP_URL + '/lottery/detail#scheme=' + data.schemeId;
        } else {
          cp2y.dialog.alert(data.message);
        }
      }
    });
  },
  hemai:function(){//合买
    var money,getBets,issueCount=0,issueIds=[]/*期数*/,multiple=[]/*倍数*/,i=0,len,units=0,mul,dLen=[];
    $("#hemaiTitle").html(cp2y.buy.playName);
    dom.MainStep2.hide();
    $("#hemai").show();
    for(i in cp2y.buy.issues){
      issueCount++;
      issueIds.push(i);
      multiple.push(cp2y.buy.issues[i]);
    }
    for(i;i<issueCount;i++){
      if(this.currentIssueId!=issueIds[i]){
        dLen.push(issueIds[i]);
      }else{
        break;
      }
    }
    issueIds.splice(0,dLen.length);
    multiple.splice(0,dLen.length);
    if(issueIds.length==0){
      issueCount=1;
      multiple.push(1);
      issueIds.push(this.currentIssueId);
    }//未追号选择当期
    getBets=this.getBets();
    len=getBets.length;i=0;
    for(i;i<len;i++){
      units+=Number(getBets[i].bets);
    }
    this.saleType=1;
    if((multiple.join(',')+',').replace(new RegExp(multiple[0]+',','gi'),'')==''){
      mul=multiple[0];
    }else{
      mul="不同";
    }
    money=units*multiple[0]*issueIds.length*2;
    if(_.bt==10026){
      var additional=$("#additional").attr("checked")?1:0;
      if(additional){
        money*=1.5;
      }
    }
    if(money>100000000){
      return cp2y.dialog.alert('金额过大');
    }
    $('#HMissue').html(issueIds.length);
    $('#HMmoney').html(money);
    $('#HMunits').html(units);
    $('#HMmul').html(mul);
    var rg=Math.ceil((money*5)/100),db=Math.ceil(money/10);
    $('#HMrengou').attr({'placeholder':'最少认购5%('+rg+'元)'});
    $('#HMbaodi').attr({'placeholder':'若保底，最少保10%('+db+'元)'});
    this.RenGou=rg;
    this.ZuiDiRenGou=1;
    this.BaoDi=0;
    this.YongJin=0;
    $('#HMrengou').val('');
    $('#HMzuidirengou').val(1);
    $('#HMbaodi').val('');
    $('#HMyongjin').html('0%');
  },
  setRenGou:function(e){
      var m=$(e).val(),M=Number(dom.Money.html()),rg;
      if(m<(M*5)/100){
          rg=Math.ceil((M*5)/100);
      }else if(m>=M){
          rg=M-1;
      }else if(isNaN(m)){
          rg=Math.ceil((M*5)/100);
      }else{
          rg=m;
      }
      this.RenGou=rg;
      $(e).val(rg);
      this.setHMPrice();
  },
  setZuiDiRenGou:function(e){
      var m=$(e).val(),M=Number(dom.Money.html()),N=this.RenGou,rg;
      if(m<1){
          rg=1;
      }else if(m>M-N){
          rg=M-N;
      }else if(isNaN(m)){
          rg=1;
      }else{
          rg=m;
      }
      this.ZuiDiRenGou=rg;
      $(e).val(rg);
  },
  setBaoDi:function(e){
      var m=$(e).val(),M=Number(dom.Money.html()),N=this.RenGou,db;
      if(m){
          if(N>=(M*9/10) || isNaN(m)){//认购大于等于90%;
              db=0;
          }else if(m<(M/10)){//认购小于10%
              db=Math.ceil(M/10);
          }else{
              db=m;
          }
          this.BaoDi=(db);
          $(e).val(db);
          this.setHMPrice();
      }
  },
  YongJin:0,
  setYongJin:function(e){
      var yj=$(e).val();
      $('#HMyongjin').html(yj+"%");
      this.YongJin=yj;
  },
  HMPrice:0,
setHMPrice:function(){
  this.HMPrice=Number(this.RenGou)+Number(this.BaoDi);
  $('#HMPrice').html(this.HMPrice+"元");
},
closeHemai:function(){
  dom.MainStep2.show();
  $("#hemai").hide();
},
toggleMore:function(){
  if(dom.More.hasClass('on')){
    dom.More.removeClass('on');
    dom.MoreDetail.hide();
    dom.MoreLocked.hide();
  }else{
    dom.More.addClass('on');
    dom.MoreDetail.show();
    dom.MoreLocked.show();
  }
  window.scrollTo(0,0);
},
toggleAssistant:function(){
  $("#assistantC").toggle();
},
getST:function(t,o){
  $("#getST").show();
  $("#STT").html(t);
  $("#STC").html(o);
  $("#Warp").hide();
},
closeST:function(){
  $("#Warp").show();
  $("#getST").hide();
},
getWf:function(){
  $.ajax({
    url:WebAppUrl.HOME_APP_URL+"/help/"+_.bt+".txt",
    beforeSend:function(){cp2y.dialog.loading();},
    success:function(data){
      cp2y.dialog.clearLoading();
      cp2y.buy.getST('玩法',data);
    },
    error:function(){cp2y.dialog.clearLoading();}
  });
},
getJq:function(){
  $.ajax({
    url:WebAppUrl.HOME_APP_URL+'/',
    beforeSend:function(){cp2y.dialog.loading();},
    success:function(data){
      cp2y.dialog.clearLoading();

    },
    error:function(){}
  });
},
getKj:function(){
  $.ajax({
    url:WebAppUrl.HOME_APP_URL+"/lottery/query_his_notify?lotteryId="+_.bt,
    beforeSend:function(){cp2y.dialog.loading();},
    success:function(data){
      cp2y.dialog.clearLoading();
      var i=0,len=data.listsize,html=[];
      for(i;i<len;i++){
        var bolls=cp2y.util.setboll(data.list[i].drawNumber,_.bt);
        html.push('<div class="drawList" onclick="cp2y.buy.getKj2(this,'+_.bt+','+data.list[i].issue+')">');
        html.push('<p><span>'+data.list[i].issue+'期</span>开奖日期：'+data.list[i].drawTime+'</p>');
        html.push('<div class="getKjline2">'+bolls.join('')+'</div>');
        html.push('</div>');
      }
      cp2y.buy.getST('开奖',html.join(''));
    },
    error:function(){cp2y.dialog.clearLoading();}
  });
},
getKj2:function(t,b,i){
  if($(t).children('#getKj2').length==1){
    return $('#getKj2').remove();
  }
  $('#getKj2').remove();
  $.ajax({
    url:WebAppUrl.HOME_APP_URL+'/lottery/issue_detail?lotteryId='+b+'&issue='+i,
    beforeSend:function(){cp2y.dialog.loading();},
    success:function(data){
      cp2y.dialog.clearLoading();
      var data=data[0],html=[],i=0,len=data.items.length;
      html.push('<div id="getKj2"><table class="table1">');
      html.push('<thead><tr><td>奖项</td>');
      if(BT.kk.indexOf(data.lotteryId)==-1){
        html.push('<td>中奖数量</td>');
      }
      html.push('<td>奖金</td></tr></thead><tbody>');
      for(i;i<len;i++){
        html.push('<tr><td>'+data.items[i].prizeItem+'</td>');
        if(BT.kk.indexOf(data.lotteryId)==-1){
          html.push('<td>'+data.items[i].number+'</td>');
        }
        html.push('<td>'+data.items[i].prizeAmount+'</td></tr>');
      }
      html.push('</tbody></table></div>');
      $(t).append(html.join(''));
    },
    error:function(){cp2y.dialog.clearLoading();}
  });
}
};
$('#HMtype a').click(function(){
  $(this).addClass('cur').siblings().removeClass('cur');
  var o=[1,3,4];
  cp2y.buy.openStatus=o[$(this).index()];
});