/**
* @author luwenbin@live.com
* 方案详情
*/
var schemeDom={
  t:$("#schemeTitle")
};
cp2y.user={
  init:function(){
    var i=cp2y.util.getArgs('scheme'),p=cp2y.util.getArgs('index'),Btn=$('#closeBtn'),href='/limit/user/';
    if(p==1){
        href+='index';
    }else if (p==2){
        href+='withdrawlist';
    }else if (p==3){
        href='/hemai/';
    }else{
        href+='betRecords';
    }
    Btn.attr({"href":href});
    if(i){this.scheme(i);}
  },
  schemeStatus:function(data){
    var logStep=1,k1,k2="出票成功",k3="兑奖",isT='追号中';
    switch(data.schemeStatus){
      case 101://认购中
      logStep=1;k1="认购中";
      break;
      case 201://委托中
      logStep=1;k1="委托中";
      break;
      case 301://出票成功
      logStep=3;k1="待出票";
      break;
      case 401://追号中
      logStep=4;k1="待出票";
      break;
      case 501://中奖
      logStep=5;k1="待出票";k3="中"+data.schemeData.schemePrize+"元";
      break;
      case 601://未中奖
      logStep=6;k1="待出票";k3="未中奖";
      break;
      case 701://撤单
      isT="撤单";
      logStep=7;k1="待出票";k3="撤单";
      break;
    }
    return ('<div class="logStep logStep'+logStep+'"><span></span><span></span><span></span><i></i><i></i><i></i><a>'+k1+'</a><a>'+k2+'</a><a>'+k3+'</a><code>'+isT+'</code></div>');
  },
  jcScheme:function(data){
    var html=[],i=0;
    html.push('<p class="jcScheme1">'+data.schemeData.schemeType+data.traceData[0].issue+'期,'+data.schemeData.numberType+',');
    try{
      if(data.schemeData.schemeContent[0].matchCount){
        html.push(data.schemeData.schemeContent[0].matchCount+'场，');
      }
      html.push(data.schemeData.schemeContent[0].pass+',');
    }catch(e){}
    html.push(data.traceData[0].multiple+'倍，共'+data.traceData[0].money+'元</p>');
    var tf=false;
    if(data.schemeData.open==4 ){
      if(data.schemeStatus==501 || data.schemeStatus==701){
        tf=true;
      }
    }
    if(data.schemeData.open==1 || tf){
      if(data.isJingCai==1){
        html.push('<table class="jcScheme2"><thead><tr><td>投注球队</td><td>赔率</td><td>是否中奖</td></tr></thead><tbody>');
        var i=0,td=data.schemeData.schemeContent[0].matches,len=td.length,dd='';
        for(i;i<len;i++){
          if(!td[i].matchResult){
            dd="";
          }else{
            dd=td[i].matchResult;
          }
          html.push('<tr><td>'+td[i].hostName+'</td><td>'+td[i].rate+'</td><td>'+dd+'</td></tr>');
        }
        html.push('</body></table>');
      }
      else{
        html.push('<table class="jcScheme2"><thead><tr><td>场次</td><td>对阵</td><td>投注</td><td>彩果</td>');
        var i=0,td=data.schemeData.schemeContent[0].matches,len,ss='--',dd='',hasDan=false;
        if(data.lotteryId == 10057){
          td=data.schemeData.schemeContent[0].matches.matches;
        }
        len=td.length;
        if(data.lotteryId == 10057){
          for(i;i<len;i++){   
            if(td[i].match.dan){hasDan=true;break;}
          }
        }else{
          for(i;i<len;i++){
            if(td[i].dan){hasDan=true;break;}
          }
        }
        if(hasDan){
          html.push('<td>定胆</td>');
        }
        html.push('</tr></thead><tbody>');
        i=0;
        if(data.lotteryId == 10057){
          var msg,matchResult;
          for(i;i<len;i++){
            dc=data.schemeData.schemeContent[0].matches.matches[i].dc;
            switch(data.schemeData.schemeContent[0].betType){
              case 274:// 让球胜平负复式
              case 275:// 让球胜平负单式
                if(dc.rate>0){
                  dd="<span class='red'>+"+dc.rate+"</span>";
                }else if(dc.rate<0){
                  dd="<span class='green'>"+dc.rate+"</span>";
                }else{
                  dd="";
                }
                var tmparr=['负','平','','胜'];
                matchResult=dc.rqSpfResult?dc.rqSpfResult:'--';
                break;
              case 276:// 总进球数复式
              case 277:// 总进球数单式
                var tmparr=['0','1','2','3','4','5','6','7+'];
                matchResult=dc.zjqResult?dc.zjqResult:'--';
                break;
              case 278:// 上下单双复式
              case 279:// 上下单双单式
                var tmparr=['上+单','上+双','下+单','下+双'];
                matchResult=dc.sxdsResult?dc.sxdsResult:'--';
                break;
              case 280:// 比分复式
              case 281:// 比分单式
                var tmparr=['1:0','2:0','2:1','3:0','3:1','3:2','4:0','4:1','4:2','胜其他','0:0','1:1','2:2','3:3','平其他','0:1','0:2','1:2','0:3','1:3','2:3','0:4','1:4','2:4','负其他'];
                matchResult=dc.bfResult?dc.bfResult:'--';
                break;
              case 282:// 半全场复式
              case 283:// 半全场单式
                var tmparr=['胜胜','胜平','胜负','平胜','平平','平负','负胜','负平','负负'];
                matchResult=dc.bqcResult?dc.bqcResult:'--';
                break;
            }
            var dcData=td[i].match.choose,dcI=0,dcLen=dcData.length;
            msg=[];
            for(dcI;dcI<dcLen;dcI++){
              msg.push([tmparr[dcData[dcI]]]);
            }
            msg=msg.join(',');
            html.push('<tr><td>'+td[i].match.title+'</td><td><a>'+td[i].match.host+dd+'<br/>'+(td[i].dc.lastScore?td[i].dc.lastScore:'--')+'<br/>'+td[i].match.guest+'</a></td><td>'+msg+'</td><td>'+matchResult+'</td>');
            if(hasDan){
              html.push('<td>'+(td[i].match.dan?"√":"×")+'</td>');
            }
            html.push('</tr>');
          }
        }
        else{
          var ww=['周日','周一','周二','周三','周四','周五','周六'],mc;
          for(i;i<len;i++){
            if(data.schemeData.numberType!='胜平负复式'){
              if(td[i].rate>0){
                dd="<span class='red'>+"+td[i].rate+"</span>";
              }else{
                dd="<span class='green'>"+td[i].rate+"</span>";
              }
            }
            var matchResult=td[i].matchResult,w='';
            if(matchResult){
              matchResult=matchResult.split('/').join('<br/>');
            }else{
              matchResult='待定';
            }
            mc=td[i].matchCode.substr(0,8);
            mc=mc.substr(0,4)+'-'+mc.substr(4,2)+'-'+mc.substr(6,2);
            w=new Date(mc).getDay();
            html.push('<tr><td>'+ww[w]+'<br/>'+td[i].matchCode.substr(8,3)+'</td><td onclick="cp2y.discoverUtil.init('+td[i].matchCode+');"><a>'+td[i].hostName+dd+'<br/>'+(td[i].lastScore?td[i].lastScore:'--')+'<br/>'+td[i].guestName+'</a></td><td>'+td[i].msg+'</td><td>'+matchResult+'</td>');
            if(hasDan){
              html.push('<td>'+(td[i].dan?"√":"×")+'</td>');
            }
            html.push('</tr>');
          }
        }
        html.push('</body></table>');
      }
      if(data.schemeData.schemeContent[0].betType==430 ){
        var S=data.schemeData.schemeContent[0].schemeItems['2串1'],o1,o2;
        i=0;len=S.length;
        html.push('<p class="jcScheme1">配对明细</p><table class="jcScheme2"><tbody>');
        for(i;i<len;i++){
          o1=S[i].matchodds[0]?S[i].matchodds[0]:'--';
          o2=S[i].matchodds[1]?S[i].matchodds[1]:'--';
          html.push('<tr><td class="txcl"><i>'+(i+1)+'</i>'+S[i].match[0]+'('+S[i].matchbet[0]+o1+') X '+S[i].match[1]+'('+S[i].matchbet[1]+o2+')</td><td></td></tr>');
        }
        html.push('</body></table>');
      }
    }else{
      html.push('<div class="userTip4">该方案未公开</div>');
    }
    return html.join('');
  },
  jclqScheme:function(data){
    var html=[],i=0,len;
    html.push('<p class="jcScheme1">'+data.schemeData.schemeType+data.traceData[0].issue+'期,'+data.schemeData.numberType+',');
    html.push(data.schemeData.schemeContent[0].pass+',');
    html.push(data.traceData[0].multiple+'倍，共'+data.traceData[0].money+'元</p>');
    var tf=false;
    if(data.schemeData.open==4 ){
      if(data.schemeStatus==501 || data.schemeStatus==701){
        tf=true;
      }
    }
    if(data.schemeData.open==1 || tf){
      html.push('<table class="jcScheme2"><thead><tr><td>场次</td><td>对阵</td><td>投注</td><td>彩果</td>');
      var td=data.schemeData.schemeContent[0].matches.matches,
          ss='--',
          hasDan=false;
      len=td.length;
      for(i;i<len;i++){
        if(td[i].dan){hasDan=true;break;}
      }
      if(hasDan){
        html.push('<td>定胆</td>');
      }
      html.push('</tr></thead><tbody>');
      i=0;
      for(i;i<len;i++){
        var matchResult=td[i].matchResult,w='';
        if(matchResult){
          matchResult=matchResult.split('/').join('<br/>');
        }else{
          matchResult='待定';
        }
        html.push('<tr><td>'+td[i].basketball.name+'</td><td><a>'+td[i].basketball.host+'<br/>'+(td[i].lastScore?td[i].lastScore:'--')+'<br/>'+td[i].basketball.guest+'</a></td><td>'+td[i].msgs+'</td><td>'+matchResult+'</td>');
        if(hasDan){
          html.push('<td>'+(td[i].dan?"√":"×")+'</td>');
        }
        html.push('</tr>');
      }
      html.push('</body></table>');
    }else{
      html.push('<div class="userTip4">该方案未公开</div>');
    }
    return html.join('');
  },
  numScheme:function(data){
    var html=[];
    html.push('<div class="userTip4">投'+data.schemeData.schemeNumberUnit+'注，共'+data.schemeData.schemeAmount+'元</div>');
    if(data.schemeData.schemeContent){
      var i=0,len=data.schemeData.schemeContent.length;
      html.push('<div class="schemeDetail mt10">');
      if(len>3){
        for(i;i<3;i++){
          html.push(data.schemeData.schemeContent[i].content);
        }
        html.push('</div><div class="schemeDetail oHidden" id="hiddenScheme">');
        for(i;i<len;i++){
          html.push(data.schemeData.schemeContent[i].content);
        }
        html.push('</div><p class="toggleScheme" onclick="cp2y.util.toggle(this,$(\'#hiddenScheme\'),\'展开全部方案\')" data="0">&gt;&gt;展开全部方案</p>');
      }else{
        for(i;i<len;i++){
          html.push(data.schemeData.schemeContent[i].content);
        }
        html.push('</div>');
      }
    }else{
      var openLevel=['未上传方案','','','方案内容,参与后公开','方案内容,截止后公开'];
      html.push('<div class="schemeDetail mt10">'+openLevel[data.schemeData.open]+'</div>');
    }
    //方案内容展示End
    //追号列表展示Start
    i=0;len=data.traceData.length;
    if(data.schemeData.issueCount==1){
      html.push('<div class="userTip4 mt10">期号详情');	
    }else{
      html.push('<div class="userTip4 mt10">追'+data.schemeData.issueCount+'期');
    }
    if(data.prizeStop){
      html.push('，累计中奖≥'+data.prizeStop+'元，停止追号');
    }
    html.push('</div>');
    html.push('<div class="traceDetail">');
    if(len>1){
      var len2=len,klpk;
      if(len2>3){len2=3;}
      for(i;i<len2;i++){
        if(data.lotteryId==10082){
          if(data.traceData[i].drawNumber=="未开奖"){
            klpk=data.traceData[i].drawNumber;
          }else{
            klpk=cp2y.util.setboll(data.traceData[i].drawNumber,10082);
          }
          //klpk=cp2y.util.setboll(data.traceData[i].drawNumber,10082);
        }else{
          klpk=data.traceData[i].drawNumber;
        }
        html.push('<div class="traceDetailL"><div><p>'+data.traceData[i].issue+'期：'+data.traceData[i].multiple+'倍，'+data.traceData[i].money+'元</p><p>开奖号码：'+klpk+'</p></div><div>');
        if(data.traceData[i].prize){
            html.push('<p>'+data.traceData[i].status+'</p><p class="has501">'+data.traceData[i].prize+'元</p>');
        }else{
            html.push('<p class="spanRow1">'+data.traceData[i].status+'</p>');
        }
        html.push('</div></div>');
      }
      if(len==3){
        html.push('</div><div class="traceDetail oHidden" id="hiddenTrace"></div>');
        html.push('<p class="toggleScheme" onclick="cp2y.user.hiddenTrace('+data.schemeData.schemeId+','+data.schemeData.type+');cp2y.util.toggle(this,$(\'#hiddenTrace\'),\'查看更多\')" data="0">&gt;&gt;查看更多</p>');
      }
    }else{
      //未追号
      var klpk;
      for(i;i<len;i++){
        if(data.lotteryId==10082){
          if(data.traceData[i].drawNumber=="未开奖"){
            klpk=data.traceData[i].drawNumber;
          }else{
            klpk=cp2y.util.setboll(data.traceData[i].drawNumber,10082);
          }
          //klpk=cp2y.util.setboll(data.traceData[i].drawNumber,10082);
        }else{
          klpk=data.traceData[i].drawNumber;
        }
        html.push('<div class="traceDetailL"><div><p>'+data.traceData[i].issue+'期：'+data.traceData[i].multiple+'倍，'+data.traceData[i].money+'元</p><p>开奖号码：'+klpk+'</p></div><div>');
        if(data.traceData[i].prize){
          html.push('<p>'+data.traceData[i].status+'</p><p class="has501">'+data.traceData[i].prize+'元</p>');
        }else{
          html.push('<p class="spanRow1">'+data.traceData[i].status+'</p>');
        }
        html.push('</div></div>');
      }
      html.push('</div>');
    }
    return html.join('');
    //追号列表展示End
  },
  hemai:function(data){
    var html=[],i=0;
    if(data.schemeData.type==200 ||data.schemeData.type==201||data.schemeData.type==202||data.schemeData.type==203){
    html.push('<div class="userTip4 mt10">'+data.schemeParticipantData.totalCount+'人参与合买</div>');
      i=0;len=data.schemeParticipantData.listData.length;
      var tlen=len,userNames;
      if(len>3){
        tlen=3;
      }
      for(i;i<tlen;i++){
        cp2y.user.participantId.push(data.schemeParticipantData.listData[i].participantId);
        if(data.schemeParticipantData.listData[i].userName.substr(0,2)=="m-"){
          userNames=data.schemeParticipantData.listData[i].userName.substr(0,9)+"****";
        }else{
          userNames=data.schemeParticipantData.listData[i].userName;
        }
        html.push('<div class="Participant"><span>'+userNames+'</span>');
        html.push('<p>认购'+data.schemeParticipantData.listData[i].money+'元</p>');
        html.push('<span>占股'+data.schemeParticipantData.listData[i].proportion+'%</span></div>');
      }
      if(len>2){
        html.push('<div class="traceDetail oHidden" id="Participant"></div>');
        html.push('<p class="toggleScheme" onclick="cp2y.user.Participant('+data.schemeData.schemeId+','+data.lotteryId+');cp2y.util.toggle(this,$(\'#Participant\'),\'查看更多\')" data="0">&gt;&gt;查看更多</p>');
      }
    }
    return html.join('');
  },
  detail:function(data){
    var html=[],i=0;
    html.push('<div class="userTip4 mt10">方案详情</div>');
    if(data.schemeData.remuneration){
      html.push('<div class="schemeD1"><span>盈利佣金：</span><p>'+data.schemeData.remuneration+'%</p></div>');
    }
    var userName;
    if(data.schemeData.userName.substr(0,2)=="m-"){
      userName=data.schemeData.userName.substr(0,9)+"****";
    }else{
      userName=data.schemeData.userName;
    }
    html.push('<div class="schemeD1"><span>发起人：</span><p>'+userName+'</p></div>');
    html.push('<div class="schemeD1"><span>发起时间：</span><p>'+data.schemeData.initiateTime+'</p></div>');
    if(data.schemeData.schemeDesc){
      html.push('<div class="schemeD1"><span>方案描述：</span><p>'+data.schemeData.schemeDesc+'</p></div>');
    }
    html.push('<div class="schemeD1 pb40"><span>方案编号：</span><p>'+data.schemeData.schemeNumber+'</p></div>');
    return html.join('');
  },
  btnStatus:function(data){
    var html=[],i=0;
    if(data.schemeData.canCancel==1){//可撤单
//      var isH=1;
//      if(data.schemeData.type==200 ||data.schemeData.type==201 ||data.schemeData.type==202 ||data.schemeData.type==203){
//          isH=2;
//      }
      if(BT.selling.indexOf(data.lotteryId)!=-1){
        html.push('<div class="fixBottom schemeBtns"><a class="scB1" onclick="cp2y.user.cancelScheme('+data.schemeData.schemeId+')">撤单</a>');
        if(data.lotteryId==10059){
          if(data.isJingCai==1){
            html.push('<a class="scB1" href="/caiguanya">继续购买</a></div>');
          }else{
            html.push('<a class="scB1" href="/lottery/10059?type=a0">继续购买</a></div>');
          }
        }else{
          html.push('<a class="scB1" href="/lottery/'+data.lotteryId+'?type=a0">继续购买</a></div>');
        }
      }
    }else if(data.schemeData.type==200 ||data.schemeData.type==201||data.schemeData.type==202||data.schemeData.type==203){//合买
      if(data.ownPrize && data.ownPrize>0){//中奖
        html.push('<div class="fixBottom schemeBtns schemeBtns2">');
        html.push('<a>我中了'+data.ownPrize+'元</a>');
        html.push('<a href="/">去大厅</a>');
        html.push('</div>');
      }else if(BT.selling.indexOf(data.lotteryId)!=-1){//未中奖
        html.push('<div class="fixBottom schemeBtns schemeBtns3">');
        html.push('<input type="tel" id="buyMoney" placeholder="最低认购'+data.schemeData.minParticipant+'元" class="input12" />');
        html.push('<a onclick="cp2y.user.buy();">参与合买</a></div>');
        cp2y.user.min=data.schemeData.minParticipant;
        cp2y.user.remainAmount=Number(data.schemeData.remainAmount);
      }
    }else{
      if(BT.selling.indexOf(data.lotteryId)!=-1){
        if(data.lotteryId==10059){
          if(data.isJingCai==1){
            html.push('<div class="fixBottom schemeBtns"><a href="/caiguanya">继续购买</a></div>');
          }else{
            html.push('<div class="fixBottom schemeBtns"><a href="/lottery/10059?type=a0">继续购买</a></div>');
          }
        }else{
          html.push('<div class="fixBottom schemeBtns"><a href="/lottery/'+data.lotteryId+'?type=a0">继续购买</a></div>');
        }
      }
    }
    return html.join('');
  },
  scheme:function(sId){
    if(!sId){return false;}
    var that=this;
    $.ajax({
      url:WebAppUrl.HOME_APP_URL+"/lottery/scheme_detail",
      data:{schemeId:sId},
      beforeSend:function(){cp2y.dialog.loading();},
      success:function(data){
        cp2y.user.sId=sId;
        cp2y.dialog.clearLoading();
        cp2y.user.lotteryId=data.lotteryId;
        var html=[];
        schemeDom.t.html(data.lotteryName+"-方案");
        html.push(cp2y.user.schemeStatus(data));
        if(data.lotteryId == 10057 || data.lotteryId==10059){
          html.push(that.jcScheme(data));/* 竞彩足球 */
        }else if(data.lotteryId==10058){
          html.push(that.jclqScheme(data));/*竞彩篮球*/
        }else{
          html.push(that.numScheme(data));/* 非竞彩 */ 
        }
        html.push(that.hemai(data));/*合买列表*/
        html.push(that.detail(data));/*方案详情*/
        html.push(that.btnStatus(data));/*底部状态*/
        $("#schemeDetail").html(html.join(''));
      }
    });
  },
  cancelScheme:function(s){
    var url=WebAppUrl.HOME_APP_URL,data={schemeId:s};
    $.ajax({
      url:'/core/lottery/scheme_cancel',
      data:data,
      beforeSend:function(){cp2y.dialog.loading();},
      success:function(data){
        cp2y.dialog.clearLoading();
        cp2y.dialog.alert(data.message);
        if(data.flag==1){
          setTimeout('location.reload()',1000);
        }
      }
    });
  },
  hiddenTrace:function(id,t){
    var hT=$("#hiddenTrace");
    if(hT.children("div").size()>0){
      return false;
    }
    $.ajax({
      url:WebAppUrl.HOME_APP_URL+"/lottery/scheme_join_trace_detail",
      data:{"schemeId":id,"type":t},
      success:function(data){
        var i=3,len=data.traceData.length,html=[],klpk;
        for(i;i<len;i++){
          if(cp2y.user.lotteryId==10082){
            if(data.traceData[i].drawNumber=="未开奖"){
              klpk=data.traceData[i].drawNumber;
            }else{
              klpk=cp2y.util.setboll(data.traceData[i].drawNumber,10082);
            }
          }else{
            klpk=data.traceData[i].drawNumber;
          }
          html.push('<div class="traceDetailL"><div><p>'+data.traceData[i].issue+'期：'+data.traceData[i].multiple+'倍，'+data.traceData[i].money+'元</p><p>开奖号码：'+klpk+'</p></div><div>');
          if(data.traceData[i].prize){
            html.push('<p>'+data.traceData[i].status+'</p><p class="has501">'+data.traceData[i].prize+'元</p>');
          }else{
            html.push('<p class="spanRow1">'+data.traceData[i].status+'</p>');
          }
          html.push('</div></div>');
        }
        hT.html(html.join(''));
      }
    });
  },
  participantId:[],
  Participant:function(id,t){
    var hT=$("#Participant");
    if(hT.children("div").size()>0){
        return false;
    }
    $.ajax({
      url:WebAppUrl.HOME_APP_URL+"/lottery/scheme_join_Participant_detail",
      data:{"schemeId":id,"lotteryId":t},
      success:function(data){
        var i=0,len=data.schemeParticipantData.listData.length,html=[];
        for(i;i<len;i++){
          if(cp2y.user.participantId.indexOf(data.schemeParticipantData.listData[i].participantId)==-1){
            var userName;
            if(data.schemeParticipantData.listData[i].userName.substr(0,2)=="m-"){
              userName=data.schemeParticipantData.listData[i].userName.substr(0,9)+"****";
            }else{
              userName=data.schemeParticipantData.listData[i].userName;
            }
            html.push('<div class="Participant"><span>'+userName+'</span>');
            html.push('<p>认购'+data.schemeParticipantData.listData[i].money+'元</p>');
            html.push('<span>占股'+data.schemeParticipantData.listData[i].proportion+'%</span></div>');
          }
        }
        hT.html(html.join(''));
      }
    });
  },
  buy:function(){
    var m=$('#buyMoney').val(),min=this.min,max='',buyMoney,data={schemeId:this.sId};
    if(isNaN(m) || m<min){
      return cp2y.dialog.alert('认购金额不能少于'+min+'元');
      buyMoney=min;
    }else if(m>this.remainAmount){
      buyMoney=this.remainAmount
    }else{
      buyMoney=m;
    }
    $('#buyMoney').val(buyMoney);
    data.buyMoney=buyMoney;
    $.ajax({
      url:WebAppUrl.HOME_APP_URL+"/core/lottery/join_buy",
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
              location.href = WebAppUrl.HOME_APP_URL + '/recharge/index';
          });
        } else if (data.flag == 1) {
          return cp2y.dialog.alert(data.message, function () {
            location.reload();
          });
        } else {
          cp2y.dialog.alert(data.message);
        }
      }
    });
  }
};