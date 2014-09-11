WebAppUrl.zs='http://zq.cp2y.com/';
cp2y.discoverUtil={
  mid:0,
  matchCode:0,
  baseKey:0,
  toggle:function(e){
      $(e).siblings().removeClass('cur');
      $(e).addClass('cur');
      $(".lenka").hide();
      $("#lenka"+$(e).index()).show();
  },
  init:function(m){
    this.matchCode=String(m).substr(2);
    this.base();
    $("#Warp").hide();
    $("#Discover").show();
  },
  close:function(){
    $("#Warp").show();
    $("#Discover").hide();
  },
  base:function(){
    if(this.matchCode!=this.baseKey){
      this.baseKey=this.matchCode;
      cp2y.dialog.loading();
      $.getScript(WebAppUrl.zs+'match/baseinfo/'+this.matchCode+'?callback=cp2y.discoverUtil._base',function(){});
    }
  },
  _base:function(data){
    cp2y.dialog.clearLoading();
    if(data.flag==1){
      var m=data.matchdata[0];
      if(m){
        var html=[],mt=new Date(Number(String(m.mt)+"000")),len,MT;
        this.mid=m.mid;
        html.push('<div class="VSDetail"><i>主队</i><span>'+m.hn+'</span></div>');
        html.push('<div class="VSDetail"><i>客队</i><span>'+m.an+'</span></div>');
        if(m.hs=='-'){
          MT=(mt.getMonth()+1).addZero()+'-'+(mt.getDate()).addZero()+' '+(mt.getHours()).addZero()+':'+(mt.getMinutes()).addZero();
          html.push('<div class="VSDs"><p>'+MT+'</p><div>未开赛</div></div>');
        }else{
          html.push('<div class="VSDs2">'+m.hs+':'+m.as_+'</div></div>');
        }
        $("#VSDetail").html(html.join(''));
        //this.thing();
        this.saishi();//新版
      }else{
        cp2y.dialog.alert('抱歉，暂无数据');
        return this.close();
      }
    }else{
      this.close();
    }
  },
  thingKey:0,
  thing:function(){
      if(this.mid!=this.thingKey){
          this.thingKey=this.mid;
          cp2y.dialog.loading();
          $.getScript(WebAppUrl.zs+'match/thing/'+this.mid+'?callback=cp2y.discoverUtil._thing',function(){});
      }
  },
  _thing:function(data){
      cp2y.dialog.clearLoading();
      if(data.flag==1){
          var html=[],M=data.matchthinglist,i=0,len=M.length,v='';
          html.push('<table class="table5"><thead><tr><td colspan="3">比赛事件</td><tr></thead><tbody>');
          if(len>0){
              switch(M[i].la_img){
                  case '1':
                      v='进球';
                      break;
                  case '2':
                      v='点球';
                      break;
                  case '3':
                      v='乌龙';
                      break;
                  case '4':
                      v='黄牌';
                      break;
                  case '5':
                      v='红牌';
                      break;
                  case '6':
                      v='两黄变红';
                      break;
                  case '7':
                      v='换人';
                      break;
              }
              for(i;i<len;i++){
                  html.push('<tr><td>'+M[i].la+'</td><td>'+M[i].tm+'</td><td class="icon'+M[i].la_img+'">'+v+'</td></tr>');
              }
          }else{
              html.push('<tr><td colspan="3">暂无</td></tr>');
          }
          html.push('<thead><tr><td colspan="3"><i class="icon1"></i><span>进球</span><i class="icon2"></i><span>点球</span><i class="icon3"></i><span>乌龙</span><i class="icon4"></i><span>黄牌</span><i class="icon5"></i><span>红牌</span><i class="icon6"></i><span>双黄变红</span><i class="icon7"></i><span>换人</span></td><tr></thead>');
          html.push('<thead><tr><td colspan="3">技术统计</td><tr></thead>');
          var k=data.controllBallRate,s1=data.shootCount,s2=data.shootRight,d=data.dangerattack;
          if(k){k=k.split(',');}else{k=["",""];}
          if(s1){s1=k.split(',');}else{s1=["",""];}
          if(s2){s2=k.split(',');}else{s2=["",""];}
          if(d){d=k.split(',');}else{d=["",""];}
          html.push('<tr><td>'+k[0]+'</td><td>控球率</td><td class="icon'+k[1]+'">'+v+'</td></tr>');
          html.push('<tr><td>'+s1[0]+'</td><td>射门</td><td class="icon'+s1[1]+'">'+v+'</td></tr>');
          html.push('<tr><td>'+s2[0]+'</td><td>射正</td><td class="icon'+s2[1]+'">'+v+'</td></tr>');
          html.push('<tr><td>'+d[0]+'</td><td>危险进攻</td><td class="icon'+d[1]+'">'+v+'</td></tr>');
          html.push('</tbody></table>');
          $("#lenka0").html(html.join(''));
      }
  },
  aginstKey:0,
  aginst:function(){
      if(this.mid!=this.aginstKey){
          this.aginstKey=this.mid;
          cp2y.dialog.loading();
          $.getScript(WebAppUrl.zs+'match/aginst/'+this.mid+'?callback=cp2y.discoverUtil._aginst',function(){});
      }
  },
  _aginst:function(data){
      cp2y.dialog.clearLoading();
      var html=[],M,i=0,len,sf1=[],sf2=[],tb1=[],tb2=[];
      if(data.flag==1){
          html.push('<div class="lineTitle">阵容情况<span class="U_D_icon"></span></div>');
          html.push('<table class="table2 table3">');
          html.push('<thead><tr><td colspan="2" style="text-align:center;">首发</td></tr></thead><tbody>');
          M=data.hmatchAgainstlist;
          i=0;len=M.length;
          for(i;i<len;i++){
              if(M[i].pstatus=="替补"){
                  tb1.push(M[i]);
              }else if(M[i].pstatus=="先发"){
                  sf1.push(M[i]);
              }
          }
          M=data.amatchAgainstlist;
          i=0;len=M.length;
          for(i;i<len;i++){
              if(M[i].pstatus=="替补"){
                  tb2.push(M[i]);
              }else if(M[i].pstatus=="先发"){
                  sf2.push(M[i]);
              }
          }
          i=0;
          var len1=sf1.length,len2=sf2.length,s1,s2;
          len=Math.max(len1,len2);
          for(i;i<len;i++){
              if(i<sf1.length){s1=sf1[i].pname;}else{s1='';}
              if(i<sf2.length){s2=sf2[i].pname;}else{s2='';}
              html.push('<tr><td width="50%">'+s1+'</td><td>'+s2+'</td></tr>');
          }
          html.push('</tbody><thead><tr><td colspan="2" style="text-align:center;">替补</td></tr></thead><tbody>');
          i=0;
          len1=tb1.length;
          len2=tb2.length;
          len=Math.max(len1,len2);
          for(i;i<len;i++){
              if(i<tb1.length){s1=tb1[i].pname;}else{s1='';}
              if(i<tb2.length){s2=tb2[i].pname;}else{s2='';}
              html.push('<tr><td>'+s1+'</td><td>'+s2+'</td></tr>');
          }
          html.push('</tbody></table>');
          $("#lenka1").html(html.join(''));
      }
  },
  oddsKey:0,
  odds:function(){
    if(this.mid!=this.oddsKey){
      this.oddsKey=this.mid;
      cp2y.dialog.loading();
      $.getScript(WebAppUrl.zs+'odds/analysis/'+this.mid+'?callback=cp2y.discoverUtil.odds2',function(){});
    }
  },
  odds2:function(data){
      cp2y.dialog.clearLoading();
      var i=0,html=[],m=data.matchinfo,mt=new Date(Number(String(m.mt)+"000")),len,MT=mt.getFullYear()+'-'+(mt.getMonth()+1).addZero()+'-'+(mt.getDate()).addZero()+' '+(mt.getHours()).addZero()+':'+(mt.getMinutes()).addZero()+':'+(mt.getSeconds()).addZero();

      html.push('<div class="lineTitle">两队交战<span class="U_D_icon"></span></div>');
      html.push('<div class="tableWarp2"><table class="table2"><thead><tr><td>赛事</td><td>日期</td><td>对阵</td><td>盘路</td><td>半场</td><td>胜负</td><tr></thead><tbody>');
      var M=data.matchHisList,jq=0,sq=0,s=0,p=0,f=0,v='';
      len=M.length;
      for(i;i<len;i++){
          html.push('<tr><td>'+M[i].ln+'</td>');
          html.push('<td>'+M[i].mtime.split(' ')[0]+'</td>');
          html.push('<td>'+m.hn+' '+M[i].hscore+':'+M[i].ascore+' '+m.an+'</td>');
          html.push('<td>'+M[i].binfo+'</td>');
          html.push('<td>'+M[i].bc+'</td>');
          if(M[i].hscore>M[i].ascore){
              if(M[i].htid==m.hid){v="胜";}else{v="负";}
          }else if(M[i].hscore==M[i].ascore){
              v="平";
          }else{
              if(M[i].htid==m.hid){v="负";}else{v="胜";}
          }
          html.push('<td>'+v+'</td></tr>');
//			jq+=M[i].hscore;
//			sq+=M[i].ascore;
      }
      html.push('</tbody></table></div>');
      if(data.hisStatic){
      html.push('<p class="oddsLine1">'+data.hisStatic+'</p>');
      }
      html.push('<div class="lineTitle">积分榜<span class="U_D_icon"></span></div>');
      html.push('<table class="table2 table3">');
      html.push('<thead><tr><td></td><td>场次</td><td>胜</td><td>平</td><td>负</td><td>进</td><td>失</td><td>净</td><td>积</td><td>胜率</td></tr></thead><tbody>');
      html.push(this._scorestatic(data.hscorestatic));
      html.push('<tr><td colspan="11">'+m.hn+'</td></tr>');
      html.push(this._scorestatic(data.ascorestatic));
      html.push('<tr><td colspan="11">'+m.an+'</td></tr>');
      html.push('</tbody></table>');
      html.push('<div class="lineTitle">近期战绩<span class="U_D_icon"></span></div>');
      html.push('<table class="table2 table3">');
      html.push('<thead><tr><td>赛事</td><td>日期</td><td>对阵</td><td>盘路</td></tr></thead><tbody>');
      M=data.hteammatchlist;i=0;len=M.length;jq=0;sq=0;s=0;p=0;f=0;
      for(i;i<len;i++){
          html.push('<tr><td>'+M[i].ln+'</td><td>'+M[i].mtime.split(' ')[0]+'</td><td>'+M[i].hteam+' '+M[i].hscore+':'+M[i].ascore+' '+M[i].ateam+'</td><td>'+M[i].binfo+'</td></tr>');
          if(M[i].hscore>M[i].ascore){
              if(M[i].htid==m.hid){s+=1;}else{f+=1;}
          }else if(M[i].hscore==M[i].ascore){
              p+=1;
          }else{
              if(M[i].htid==m.hid){f+=1;}else{s+=1;}
          }
      }
      html.push('<tr><td colspan="4">'+m.hn+':'+s+'胜 '+p+'平 '+f+'负</td></tr>');
      M=data.ateammatchlist;i=0;len=M.length;jq=0;sq=0;s=0;p=0;f=0;
      for(i;i<len;i++){
          html.push('<tr><td>'+M[i].ln+'</td><td>'+M[i].mtime.split(' ')[0]+'</td><td>'+M[i].hteam+' '+M[i].hscore+':'+M[i].ascore+' '+M[i].ateam+'</td><td>'+M[i].binfo+'</td></tr>');
          if(M[i].hscore>M[i].ascore){
              s+=1;
          }else if(M[i].hscore==M[i].ascore){
              p+=1;
          }else{
              f+=1;
          }
      }
      html.push('<tr><td colspan="4">'+m.an+':'+s+'胜 '+p+'平 '+f+'负</td></tr>');
      html.push('</tbody></table>');
      html.push('<div class="lineTitle">未来赛事<span class="U_D_icon"></span></div>');
      M=data.hfutureScheduleList;i=0;len=M.length;
      var xg=0;
      html.push('<table class="table2 table3">');
      html.push('<thead><tr><td>赛事</td><td>日期</td><td>对阵</td><td>相隔</td></tr></thead><tbody>');
      for(i;i<len;i++){
          xg=((new Date(M[i].mtime).getTime()-new Date(Number(m.mt+'000')))/24/60/60/1000).toFixed(0);
          html.push('<tr><td>'+M[i].ln+'</td><td>'+M[i].mtime.split(' ')[0]+'</td><td>'+M[i].home+' VS '+M[i].away+'</td><td>'+xg+'天</td></tr>');
      }
      html.push('<tr><td colspan="4">'+m.hn+'</td></tr>');
      xg=0;M=data.afutureScheduleList;i=0;len=M.length;
      for(i;i<len;i++){
          xg=((new Date(M[i].mtime).getTime()-new Date(Number(m.mt+'000')))/24/60/60/1000).toFixed(0);
          html.push('<tr><td>'+M[i].ln+'</td><td>'+M[i].mtime.split(' ')[0]+'</td><td>'+M[i].home+' VS '+M[i].away+'</td><td>'+xg+'天</td></tr>');
      }
      html.push('<tr><td colspan="4">'+m.an+'</td></tr></tbody></table>');
      html.push('<div class="lineTitle">阵容情况<span class="U_D_icon"></span></div>');
      html.push('<table class="table2 table3 table4">');
      html.push('<thead><tr><td>后卫</td><td>中场</td><td>前锋</td><td>守门员</td></tr></thead>');
      if(data.hmatchAgainstlist.length>0){
          html.push(this._odds(data.hmatchAgainstlist,m.hn));
      }
      if(data.amatchAgainstlist.length>0){
          html.push(this._odds(data.amatchAgainstlist,m.an));
      }		
      html.push('<tr><td colspan="4" class="ffl" style="text-align:center"><span class="r">红色:首发球员</span><span class="b">蓝色:后备球员</span><span class="h">黑色:停赛球员</span><span class="y">灰色:伤病球员</span><span class="g">绿色:其它原因缺阵球员</span></td></tr></tbody>');
      html.push('</table>');
      html.push('<div class="lineTitle">心水推荐<span class="U_D_icon"></span></div>');
      M=data.xinshuiRecomd;
      if(!M){
          M={
              war:'-:-:-',
              text:'-',
              confidence:['-'],
              home_recent:'-',
              home_panlv:'-',
              away_recent:'-',
              away_panlv:'-'
          };
      }
      hw=M.war.split(":");
      html.push('<table class="table2 table3">');
      html.push('<tr><td>'+m.hn+'</td><td>近期走势:'+M.home_recent+'</td><td></td><td>盘路走势:'+M.home_panlv+'</td></tr>');
      html.push('<tr><td>'+m.an+'</td><td>近期走势:'+M.away_recent+'</td><td></td><td>盘路走势:'+M.away_panlv+'</td></tr>');
      html.push('</table>');
      i=0;
      var confidence=[];
      for(i;i<M.confidence;i++){
          confidence.push('★');
      }
      html.push('<p class="oddsLine1">信心指数:'+confidence.join('')+'<br/>对战成绩:<span class="r">'+hw[0]+'胜</span><span class="g">'+hw[1]+'平</span><span class="b">'+hw[2]+'负</span><br/>'+M.text+'</p>');

      $("#lenka2").html(html.join(''));
  },
  _scorestatic:function(M){
      var i=0;len=M.length,html=[];
      for(i;i<len;i++){
          html.push('<tr><td>'+(M[i].type=='host'?'主':M[i].type=='guest'?'客':'总')+'</td>');
          html.push('<td>'+M[i].enum_+'</td>');
          html.push('<td>'+M[i].w+'</td>');
          html.push('<td>'+M[i].d+'</td>');
          html.push('<td>'+M[i].l+'</td>');
          html.push('<td>'+M[i].goal+'</td>');
          html.push('<td>'+M[i].loss+'</td>');
          html.push('<td>'+M[i].jingshi+'</td>');
          html.push('<td>'+M[i].score+'</td>');
          html.push('<td>'+M[i].srate+'</td>');
      }
      return html.join('');
  },
  _odds:function(data,h){
      var hw={xf:[],tb:[],sb:[],qt:[],ts:[]},
          zc={xf:[],tb:[],sb:[],qt:[],ts:[]},
          qf={xf:[],tb:[],sb:[],qt:[],ts:[]},
          smy={xf:[],tb:[],sb:[],qt:[],ts:[]},
          M=data,
          i=0,
          len=M.length,
          html=[];
      for(i;i<len;i++){
          if(M[i].point=="前锋"){
              if(M[i].pstatus=="先发"){
                  qf.xf.push(M[i].pname);
              }else if(M[i].pstatus=="替补"){
                  qf.tb.push(M[i].pname);
              }else if(M[i].pstatus=="伤病"){
                  qf.sb.push(M[i].pname);
              }else if(M[i].pstatus=="停赛"){
                  qf.qt.push(M[i].pname);
              }else if(M[i].pstatus=="其它原因缺阵"){
                  qf.ts.push(M[i].pname);
              }
          }else if(M[i].point=="中场"){
              if(M[i].pstatus=="先发"){
                  zc.xf.push(M[i].pname);
              }else if(M[i].pstatus=="替补"){
                  zc.tb.push(M[i].pname);
              }else if(M[i].pstatus=="伤病"){
                  zc.sb.push(M[i].pname);
              }else if(M[i].pstatus=="停赛"){
                  zc.qt.push(M[i].pname);
              }else if(M[i].pstatus=="其它原因缺阵"){
                  zc.ts.push(M[i].pname);
              }
          }else if(M[i].point=="后卫"){
              if(M[i].pstatus=="先发"){
                  hw.xf.push(M[i].pname);
              }else if(M[i].pstatus=="替补"){
                  hw.tb.push(M[i].pname);
              }else if(M[i].pstatus=="伤病"){
                  hw.sb.push(M[i].pname);
              }else if(M[i].pstatus=="停赛"){
                  hw.qt.push(M[i].pname);
              }else if(M[i].pstatus=="其它原因缺阵"){
                  hw.ts.push(M[i].pname);
              }
          }else if(M[i].point=="守门员"){
              if(M[i].pstatus=="先发"){
                  smy.xf.push(M[i].pname);
              }else if(M[i].pstatus=="替补"){
                  smy.tb.push(M[i].pname);
              }else if(M[i].pstatus=="伤病"){
                  smy.sb.push(M[i].pname);
              }else if(M[i].pstatus=="停赛"){
                  smy.qt.push(M[i].pname);
              }else if(M[i].pstatus=="其它原因缺阵"){
                  smy.ts.push(M[i].pname);
              }
          }
      }
      html.push('<tbody>');
      html.push('<tr><td><span class="r">'+hw.xf.join('<br/>')+'</span>');
      html.push('<span class="b">'+hw.tb.join('<br/>')+'</span>');
      html.push('<span class="h">'+hw.ts.join('<br/>')+'</span>');
      html.push('<span class="y">'+hw.sb.join('<br/>')+'</span>');
      html.push('<span class="g">'+hw.qt.join('<br/>')+'</span></td><td>');
      html.push('<span class="r">'+zc.xf.join('<br/>')+'</span>');
      html.push('<span class="b">'+zc.tb.join('<br/>')+'</span>');
      html.push('<span class="h">'+zc.ts.join('<br/>')+'</span>');
      html.push('<span class="y">'+zc.sb.join('<br/>')+'</span>');
      html.push('<span class="g">'+zc.qt.join('<br/>')+'</span></td><td>');
      html.push('<span class="r">'+qf.xf.join('<br/>')+'</span>');
      html.push('<span class="b">'+qf.tb.join('<br/>')+'</span>');
      html.push('<span class="h">'+qf.ts.join('<br/>')+'</span>');
      html.push('<span class="y">'+qf.sb.join('<br/>')+'</span>');
      html.push('<span class="g">'+qf.qt.join('<br/>')+'</span></td><td>');
      html.push('<span class="r">'+smy.xf.join('<br/>')+'</span>');
      html.push('<span class="b">'+smy.tb.join('<br/>')+'</span>');
      html.push('<span class="h">'+smy.ts.join('<br/>')+'</span>');
      html.push('<span class="y">'+smy.sb.join('<br/>')+'</span>');
      html.push('<span class="g">'+smy.qt.join('<br/>')+'</span></td></tr>');
      html.push('<tr><td colspan="4" style="text-align:center">'+h+'(阵型:'+hw.xf.length+' '+zc.xf.length+' '+qf.xf.length+')</td></tr>');
      return html.join('');
  },
  aidKey:0,
  asiaeurope:function(){
    if(this.mid!=this.aidKey){
      this.aidKey=this.mid;
      cp2y.dialog.loading();
      $.getScript(WebAppUrl.zs+'odds/asiaeurope/'+this.mid+'?callback=cp2y.discoverUtil._asiaeurope',function(){});
    }
  },
  _asiaeurope:function(data){
    cp2y.dialog.clearLoading();
    if(data.flag==1){
      var i=0,M=data.oddslist,html=[],len,a,a0,a1,a3;
      len=M.length;
      html.push('<div class="lineTitle">欧赔<span class="U_D_icon"></span></div><table class="table2 table3"><thead>');
      html.push('<thead><tr><td>赔率公司</td><td colspan="3">即时</td><td colspan="3">初始</td></tr><thead><tbody>');
      for(i;i<len;i++){
        a=M[i].lite.split('|');
        a0=a[0].split(',');
        a1=a[1].split(',');
        if(a0.length==1){a0=['-','-','-'];}
        if(a1.length==1){a1=['-','-','-'];}
        html.push('<tr><td>'+M[i].cname+'</td><td>'+a0[0]+'</td><td>'+a0[1]+'</td><td>'+a0[2]+'</td><td>'+a1[0]+'</td><td>'+a1[1]+'</td><td>'+a1[2]+'</td></tr>');
      }
      html.push('</tbody></table>');
      html.push('<div class="lineTitle">亚盘<span class="U_D_icon"></span></div><table class="table2 table3"><thead>');
      html.push('<thead><tr><td>赔率公司</td><td>水位</td><td>盘口</td><td>水位</td></tr><thead><tbody>');
      i=0;
      M=data.yazhilist;
      len=M.length;
      for(i;i<len;i++){
        a=M[i].lite.split('|');
        a1=a[0].split(',');
        a2=a[1].split(',');
        if(a2[0]>a1[0]){
          a3=' class="up" >'+a2[0]+'↑';
        }else if(a2[0]<a1[0]){
          a3=' class="down">'+a2[0]+'↓';
        }else{
          a3='>'+a2[0];
        }
        if(a2[2]>a1[2]){
          a4=' class="up" >'+a2[2]+'↑';
        }else if(a2[2]<a1[2]){
          a4=' class="down">'+a2[2]+'↓';
        }else{
          a4='>'+a2[2];
        }
        html.push('<tr><td rowspan="2">'+M[i].cname+'</td><td '+a3+'</td><td>'+a2[1]+'</td><td'+a4+'</td></tr>');
        html.push('<tr><td>'+a1[0]+'</td><td>'+a1[1]+'</td><td>'+a1[2]+'</td></tr>');
      }
      html.push('</tbody></table>');
      $('#lenka3').html(html.join(''));
    }
  },
  //新版
  saishiKey:0,
  saishi:function(){
    if(this.mid!=this.saishiKey){
      this.saishiKey=this.mid;
      cp2y.dialog.loading();
      $.getScript(WebAppUrl.zs+'odds/analysis/'+this.mid+'?callback=cp2y.discoverUtil._saishi',function(){});
    }
  },
  _saishi:function(data){
    cp2y.dialog.clearLoading();
    var i=0,html=[],m=data.matchinfo,mt=new Date(Number(String(m.mt)+"000")),len,MT=mt.getFullYear()+'-'+(mt.getMonth()+1).addZero()+'-'+(mt.getDate()).addZero()+' '+(mt.getHours()).addZero()+':'+(mt.getMinutes()).addZero()+':'+(mt.getSeconds()).addZero();
    html.push('<div class="VSTitle"><a>历史交锋</a><span class="U_D_icon"></span></div><div>');
    if(data.hisStatic){
      html.push('<p class="VST2">'+data.hisStatic+'</p>');
    }
    html.push('<div class="tableWarp2"><table class="table2"><thead><tr><td>时间</td><td>赛事</td><td>主队</td><td>比分</td><td>客队</td><td>胜负</td><tr></thead><tbody>');
    var M=data.matchHisList,jq=0,sq=0,s=0,p=0,f=0,v='',cl1,cl2,cl3;
    len=M.length;
    for(i;i<len;i++){
      cl1='';cl2='';cl3='';
      html.push('<tr><td>'+M[i].mtime.split(' ')[0].substring(2)+'</td>');
      html.push('<td>'+M[i].ln+'</td>');
      if(M[i].hscore>M[i].ascore){
        if(M[i].htid==m.hid){
          v="胜";
          cl3='red';
          cl1='red';
        }else{
          v="负";
          cl3='green';
        }
      }else if(M[i].hscore==M[i].ascore){
        v="平";
      }else{
        if(M[i].htid==m.hid){
          v="负";
          cl3='green';
        }else{
          v="胜";
          cl3='red';
          cl2='red';
        }
      }
      html.push('<td class="'+cl1+'">'+M[i].hteam+'</td><td>'+M[i].hscore+':'+M[i].ascore+'</td><td class="'+cl2+'">'+M[i].ateam+'</td>');
      html.push('<td class="'+cl3+'">'+v+'</td></tr>');
      //jq+=M[i].hscore;
      //sq+=M[i].ascore;
    }
    html.push('</tbody></table></div></div>');
    html.push('<div class="VSTitle"><a>主客队近期战绩</a><span class="U_D_icon"></span></div><div>');
    var thtml=[];
    M=data.hteammatchlist;i=0;len=M.length;jq=0;sq=0;s=0;p=0;f=0;
    for(i;i<len;i++){
      thtml.push('<tr><td>'+M[i].mtime.split(' ')[0].substring(2)+'</td><td>'+M[i].ln+'</td><td>'+M[i].hteam+'</td><td>'+M[i].hscore+':'+M[i].ascore+'</td><td>'+M[i].ateam+'</td><td>'+M[i].binfo+'</td></tr>');
      if(M[i].hscore>M[i].ascore){
        if(M[i].htid==m.hid){s+=1;}else{f+=1;}
      }else if(M[i].hscore==M[i].ascore){
        p+=1;
      }else{
        if(M[i].htid==m.hid){f+=1;}else{s+=1;}
      }
    }
    html.push('<p class="VST2"><a class="red">主队</a> '+m.hn+':'+s+'胜 '+p+'平 '+f+'负</p>');
    html.push('<table class="table2 table3">');
    html.push('<thead><tr><td>时间</td><td>赛事</td><td>主队</td><td>比分</td><td>客队</td><td>赛果</td></tr></thead><tbody>');
    html.push(thtml.join(''));
    html.push('</tbody></table>');
    thtml=[];
    M=data.ateammatchlist;i=0;len=M.length;jq=0;sq=0;s=0;p=0;f=0;
    for(i;i<len;i++){
      thtml.push('<tr><td>'+M[i].mtime.split(' ')[0].substring(2)+'</td><td>'+M[i].ln+'</td><td>'+M[i].hteam+'</td><td>'+M[i].hscore+':'+M[i].ascore+'</td><td>'+M[i].ateam+'</td><td>'+M[i].binfo+'</td></tr>');
      if(M[i].hscore>M[i].ascore){
        s+=1;
      }else if(M[i].hscore==M[i].ascore){
        p+=1;
      }else{
        f+=1;
      }
    }
    html.push('<p class="VST2"><a class="green">客队</a> '+m.an+':'+s+'胜 '+p+'平 '+f+'负</p>');
    html.push('<table class="table2 table3">');
    html.push('<thead><tr><td>时间</td><td>赛事</td><td>主队</td><td>比分</td><td>客队</td><td>赛果</td></tr></thead><tbody>');
    html.push(thtml.join(''));
    html.push('</tbody></table></div>');
    html.push('<div class="VSTitle"><a>未来赛事</a><span class="U_D_icon"></span></div><div>');
    M=data.hfutureScheduleList;i=0;len=M.length;
    var xg=0;
    html.push('<p class="VST2"><a class="red">主队</a> '+m.hn+'</p>');
    html.push('<table class="table2 table3">');
    html.push('<thead><tr><td>日期</td><td>赛事</td><td>主队</td><td>客队</td><td>相隔</td></tr></thead><tbody>');
    for(i;i<len;i++){
      xg=((new Date(M[i].mtime).getTime()-new Date(Number(m.mt+'000')))/24/60/60/1000).toFixed(0);
      html.push('<tr><td>'+M[i].mtime.split(' ')[0].substring(2)+'</td><td>'+M[i].ln+'</td><td>'+M[i].home+'</td><td>'+M[i].away+'</td><td>'+xg+'天</td></tr>');
    }
    html.push('</tbody></table>');
    html.push('<p class="VST2"><a class="green">客队</a> '+m.an+'</p>');
    html.push('<table class="table2 table3">');
    html.push('<thead><tr><td>日期</td><td>赛事</td><td>主队</td><td>客队</td><td>相隔</td></tr></thead><tbody>');
    xg=0;M=data.afutureScheduleList;i=0;len=M.length;
    for(i;i<len;i++){
      xg=((new Date(M[i].mtime).getTime()-new Date(Number(m.mt+'000')))/24/60/60/1000).toFixed(0);
      html.push('<tr><td>'+M[i].mtime.split(' ')[0].substring(2)+'</td><td>'+M[i].ln+'</td><td>'+M[i].home+'</td><td>'+M[i].away+'</td><td>'+xg+'天</td></tr>');
    }
    html.push('</tbody></table></div>');
    $("#lenka0").html(html.join(''));
  },
  aidKey:0,
  asiaeurope:function(){
    if(this.mid!=this.aidKey){
      this.aidKey=this.mid;
      cp2y.dialog.loading();
      $.getScript(WebAppUrl.zs+'odds/asiaeurope/'+this.mid+'?callback=cp2y.discoverUtil._asiaeurope',function(){});
    }
  },
  _asiaeurope:function(data){
    cp2y.dialog.clearLoading();
    if(data.flag==1){
      var i=0,M=data.oddslist,html=[],len,a,a0,a1,a3;
      len=M.length;
      html.push('<table class="table2 table3 table6"><thead>');
      html.push('<thead><tr><td colspan="2">赔率公司</td><td>主胜</td><td>平局</td><td>客胜</td></tr><thead><tbody>');
      for(i;i<len;i++){
        a=M[i].lite.split('|');
        a0=a[0].split(',');
        a1=a[1].split(',');
        if(a0.length==1){a0=['-','-','-'];}
        if(a1.length==1){a1=['-','-','-'];}
        html.push('<tr><td rowspan="2">'+M[i].cname+'</td><td class="VST61">初盘</td><td>'+a0[0]+'</td><td>'+a0[1]+'</td><td>'+a0[2]+'</td></tr>');
        html.push('<tr><td class="VST62">现盘</td><td>'+a1[0]+'</td><td>'+a1[1]+'</td><td>'+a1[2]+'</td></tr>');
      }
      html.push('</tbody></table>');
      
      $('#lenka1').html(html.join(''));//欧赔
      
      html=[];
      html.push('<table class="table2 table3 table6"><thead>');
      html.push('<thead><tr><td colspan="2">赔率公司</td><td>主水</td><td>盘口</td><td>客水</td></tr><thead><tbody>');
      i=0;
      M=data.yazhilist;
      len=M.length;
      for(i;i<len;i++){
        a=M[i].lite.split('|');
        a1=a[0].split(',');
        a2=a[1].split(',');
        if(a2[0]>a1[0]){
          a3=' class="up" >'+a2[0]+'↑';
        }else if(a2[0]<a1[0]){
          a3=' class="down">'+a2[0]+'↓';
        }else{
          a3='>'+a2[0];
        }
        if(a2[2]>a1[2]){
          a4=' class="up" >'+a2[2]+'↑';
        }else if(a2[2]<a1[2]){
          a4=' class="down">'+a2[2]+'↓';
        }else{
          a4='>'+a2[2];
        }
        html.push('<tr><td rowspan="2">'+M[i].cname+'</td><td>初盘</td><td>'+a1[0]+'</td><td>'+a1[1]+'</td><td>'+a1[2]+'</td></tr>');
        html.push('<tr><td>现盘</td><td '+a3+'</td><td>'+a2[1]+'</td><td'+a4+'</td></tr>');
        
      }
      html.push('</tbody></table>');
      $('#lenka2').html(html.join(''));//亚盘
    }
  },
  daxiaoKey:0,
  daxiao:function(){
    if(this.mid!=this.daxiaoKey){
      this.daxiaoKey=this.mid;
      cp2y.dialog.loading();
      $.getScript(WebAppUrl.zs+'odds/daXiao/'+this.mid+'?callback=cp2y.discoverUtil._daxiao',function(){});
    }
  },
  _daxiao:function(data){
    cp2y.dialog.clearLoading();
    var html=[],i=0,M=data.daXiaoList,len=M.length;
    html.push('<table class="table2 table3 table6">');
    html.push('<thead><tr><td colspan="2">赔率公司</td><td>主水</td><td>盘口</td><td>客水</td></tr></thead><tbody>');
    for(i;i<len;i++){
      a=M[i].lite.split('|');
      a1=a[0].split(',');
      a2=a[1].split(',');
      if(a2[0]>a1[0]){
        a3=' class="up" >'+a2[0]+'↑';
      }else if(a2[0]<a1[0]){
        a3=' class="down">'+a2[0]+'↓';
      }else{
        a3='>'+a2[0];
      }
      if(a2[2]>a1[2]){
        a4=' class="up" >'+a2[2]+'↑';
      }else if(a2[2]<a1[2]){
        a4=' class="down">'+a2[2]+'↓';
      }else{
        a4='>'+a2[2];
      }
      html.push('<tr><td rowspan="2">'+M[i].cname+'</td><td>初盘</td><td>'+a1[0]+'</td><td>'+a1[1]+'</td><td>'+a1[2]+'</td></tr>');
      html.push('<tr><td>现盘</td><td '+a3+'</td><td>'+a2[1]+'</td><td'+a4+'</td></tr>');
    }
    if(!data.maxinfo){
      data.maxinfo={beginDaXiaoZhi1:"-",beginPanKou:"-",beginDaXiaoZhi2:"-",endDaXiaoZhi1:"-",endPanKou:"-",endDaXiaoZhi2:"-"};
    }
    if(!data.mininfo){
      data.mininfo={beginDaXiaoZhi1:"-",beginPanKou:"-",beginDaXiaoZhi2:"-",endDaXiaoZhi1:"-",endPanKou:"-",endDaXiaoZhi2:"-"};
    }
    html.push('<tr><td rowspan="2">最大值</td><td>初盘</td><td>'+data.maxinfo.beginDaXiaoZhi1+'</td><td>'+data.maxinfo.beginPanKou+'</td><td>'+data.maxinfo.beginDaXiaoZhi2+'</td></tr>');
    html.push('<tr><td>现盘</td><td>'+data.maxinfo.endDaXiaoZhi1+'</td><td>'+data.maxinfo.endPanKou+'</td><td>'+data.maxinfo.endDaXiaoZhi2+'</td><td></td></tr>');
    html.push('<tr><td rowspan="2">最小值</td><td>初盘</td><td>'+data.mininfo.beginDaXiaoZhi1+'</td><td>'+data.mininfo.beginPanKou+'</td><td>'+data.mininfo.beginDaXiaoZhi2+'</td></tr>');
    html.push('<tr><td>现盘</td><td>'+data.mininfo.endDaXiaoZhi1+'</td><td>'+data.mininfo.endPanKou+'</td><td>'+data.mininfo.endDaXiaoZhi2+'</td><td></td></tr>');
    html.push('</tbody></table>');
    $('#lenka3').html(html.join(''));//大小
  }
}

$(".VSTitle").live('click',function(){
  $(this).next().toggle();
  $(this).toggleClass('cur');
});