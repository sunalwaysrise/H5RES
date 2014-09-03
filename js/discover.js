var dom={t:$("#title"),m:$("#userMore"),mD:$("#userMoreDetail"),mL:$("#MoreLocked"),WARP:$("#Warp"),TEAM:$("#TEAM"),ODDS:$("#ODDS")};
dom.m.click(function(){cp2y.discover.toggleMore();});
dom.t.click(function(){cp2y.discover.toggleMore();});
dom.mL.click(function(){cp2y.discover.toggleMore();});	
WebAppUrl.zs='http://zq.cp2y.com/';
var inApp=sessionStorage.getItem('inApp');
if(inApp){
	$("#inApp").hide();
	dom.m.addClass('inApp');
	$("#userMore2").addClass('inApp');
}
cp2y.discover={
  init:function(){},
  toggleMore:function(){
      if(dom.m.hasClass('on')){
          dom.m.removeClass('on');dom.mD.hide();dom.mL.hide();
      }else{
          dom.m.addClass('on');dom.mD.show();dom.mL.show();
          window.scrollTo(0,0);
      }
  },
  leagueInit:function(a,b,t){
      this.leagueCondition.leagueName=a;//设置联赛名称
      this.leagueCondition.league=b;//设置联赛ID
      if(t){
          $(t).siblings().removeClass('on');$(t).addClass('on');
      }
      dom.t.children('b').html(a);
      cp2y.dialog.loading();
      $.getScript(WebAppUrl.zs+'league/session/'+b+'?callback=cp2y.discover.getSeason',function(){});//jsonp 获取所有赛季
  },
  getSeason:function(data){
      cp2y.dialog.clearLoading();
      if(data.flag==1){
          var i=0,data=data.scorewardlist,len=data.length,html=[];
          for(i;i<len;i++){
              html.push('<option value='+data[i].sid+'>'+data[i].name+'</option>');
          }
          $('#chooseSeason').html(html.join(''));
          this.leagueCondition.season=data[0].sid;//自动设置赛季
          $('#curSeason').html(cp2y.discover.leagueCondition.leagueName+data[0].name);
          this.setSeason();
      }
  },
  setSeason:function(o){//用户选择选择赛季
      if(o){
          $("#curSeason").html(this.leagueCondition.leagueName+o.t);
          this.leagueCondition.season=o.v;//设置赛季
      }
      cp2y.dialog.loading();
      $.getScript(WebAppUrl.zs+'league/lunci/'+this.leagueCondition.season+'?callback=cp2y.discover.getRound',function(){});//获取该赛季所有伦次
  },
  getRound:function(data){
      cp2y.dialog.clearLoading();
      if(data.flag==1){
          var i=data.lunci,html=[];
          for(i;i>0;i--){
              html.push('<option value='+i+'>第'+i+'轮</option>');
          }
          $('#chooseRound').html(html.join(''));
          this.leagueCondition.round=data.lunci;//自动设置该赛季伦次
          $('#curRound').html(cp2y.discover.leagueCondition.round);
          this.setRound();
      }
  },
  leagueCur:0,
  setRound:function(o){
      if(o){
          $("#curRound").html(o);
          this.leagueCondition.round=o;//设置伦次
      }
      if(this.leagueCur==0){
          this.league1.init();
      }else if(this.leagueCur==1){
          this.league2.init();
      }else if(this.leagueCur==2){
          this.league3.init();
      }else if(this.leagueCur==3){
          this.league4.init();
      }
  },
  leagueCondition:{
      teamId:0,
      leagueName:'',
      league:0,
      season:0,
      round:0
  },
  league:function(e){
      $("#fixBottom5 a").removeClass('cur');
      $(e).addClass('cur');
      $(".lea").hide();
      this.leagueCur=$(e).index();
      $("#lea"+($(e).index()+1)).show();
  },
  league1:{
      league:0,
      season:0,
      round:0,
      init:function(e){
          if(e){cp2y.discover.league(e);}
          var tf=false,tf2=false;
          if(this.league!=cp2y.discover.leagueCondition.league){tf=true;tf2=true;this.league=cp2y.discover.leagueCondition.league;}
          if(this.season!=cp2y.discover.leagueCondition.season){tf=true;tf2=true;this.season=cp2y.discover.leagueCondition.season;}
          if(this.round!=cp2y.discover.leagueCondition.round){tf=true;this.round=cp2y.discover.leagueCondition.round;}
          if(tf2){
              cp2y.dialog.loading();
              $.getScript(WebAppUrl.zs+'league/score/'+this.league+'/'+this.season+'?callback=cp2y.discover.jf',function(){});
          }
          if(tf){
              $.getScript(WebAppUrl.zs+'league/matchlist?sid='+this.season+'&lunci='+this.round+'&callback=cp2y.discover.matchlist',function(){});
          }
      }
  },
  jf:function(data){
      cp2y.dialog.clearLoading();
      if(data.flag==1){
          var i=0,data=data.scorewardlist,len=data.length,html=[];
          for(i;i<len;i++){
              html.push('<tr><td>'+(i+1)+'</td><td><a onclick="cp2y.discover.leagueTeam('+data[i].tid+')">'+data[i].name+'</a></td><td>'+data[i].enum_+'</td><td>'+data[i].w+'</td><td>'+data[i].d+'</td><td>'+data[i].l+'</td><td>'+data[i].goal+'</td><td>'+data[i].loss+'</td><td>'+data[i].jingshi+'</td><td>'+Number(data[i].changjin).toFixed(2)+'</td><td>'+Number(data[i].changshi).toFixed(2)+'</td><td>'+Number(data[i].srate).toFixed(1)+'</td><td>'+Number(data[i].prate).toFixed(1)+'</td><td>'+Number(data[i].frate).toFixed(1)+'</td><td>'+data[i].score+'</td></tr>');
          }
          $("#jf").html(html.join(''));
      }
  },
  matchlist:function(data){
      if(data.flag==1){
          var i=0,data=data.newscheduleList,len=data.length,html=[],tmp=[];
          for(i;i<len;i++){
              tmp=data[i].lite.split('|');
              html.push('<tr><td><a onclick="cp2y.discover.leagueTeam('+data[i].htid+')">'+data[i].home+'</a></td><td><b>'+data[i].hs+':'+data[i].as_+'</b></td><td><a onclick="cp2y.discover.leagueTeam('+data[i].atid+')">'+data[i].away+'</a></td><td>'+data[i].bc+'</td><td>'+tmp[0].split(',')[1]+'</td><td>'+data[i].mtime+'</td><td onclick="cp2y.discover.odds(1,'+data[i].mid+')"><a>综合</a></td><td onclick="cp2y.discover.odds(2,'+data[i].mid+')"><a>欧赔</a></td><td onclick="cp2y.discover.odds(3,'+data[i].mid+')"><a>亚盘</a></td></tr>');
          }
          $("#matchlist").html(html.join(''));
      }
  },
  league2:{
      league:0,
      season:0,
      round:0,
      init:function(e){
          if(e){cp2y.discover.league(e);}
          var tf=false;
          if(this.league!=cp2y.discover.leagueCondition.league){tf=true;this.league=cp2y.discover.leagueCondition.league;}
          if(this.season!=cp2y.discover.leagueCondition.season){tf=true;this.season=cp2y.discover.leagueCondition.season;}
          if(tf){
              cp2y.dialog.loading();
              $.getScript(WebAppUrl.zs+'league/qdzl/'+this.league+'/'+this.season+'?callback=cp2y.discover.qdzl',function(){});
          }
      }
  },
  qdzl:function(data){
      cp2y.dialog.clearLoading();
      if(data.flag==1){
          var i=0,data=data.teaminfolist,len=data.length,html=[];
          for(i;i<len;i++){
              html.push('<li onclick="cp2y.discover.leagueTeam('+data[i].tid+')"><div><img src="'+data[i].logo+'" /></div><h2><a class="showTeamDetail">'+data[i].name+'</a></h2></li>');
          }
          $("#qdzl").html(html.join(''));
      }
  },
  league3:{
      league:0,
      season:0,
      round:0,
      init:function(e){
          if(e){cp2y.discover.league(e);}
          var tf=false;
          if(this.league!=cp2y.discover.leagueCondition.league){tf=true;this.league=cp2y.discover.leagueCondition.league;}
          if(this.season!=cp2y.discover.leagueCondition.season){tf=true;this.season=cp2y.discover.leagueCondition.season;}
          if(tf){
              cp2y.dialog.loading();
              $.getScript(WebAppUrl.zs+'sheshou/'+this.league+'/'+this.season+'?callback=cp2y.discover.sheshou',function(){});
          }
      }
  },
  sheshou:function(data){
      cp2y.dialog.clearLoading();
      if(data.flag==1){
          var i=0,data=data.shooterlist,len=data.length,html=[],dq='';
          for(i;i<len;i++){
              dq=data[i].dq>0?'('+data[i].dq+')':'';
              html.push('<tr><td>'+(i+1)+'</td><td>'+data[i].pname+'</td><td>'+data[i].jq+dq+'</td><td onclick="cp2y.discover.leagueTeam('+data[i].tid+')"><a>'+data[i].name+'</a></td></tr>');
          }
          $("#sheshou").html(html.join(''));
      }
  },
  league4:{
      league:0,
      season:0,
      round:0,
      init:function(e){
          if(e){cp2y.discover.league(e);}
          var tf=false;
          if(this.league!=cp2y.discover.leagueCondition.league){tf=true;this.league=cp2y.discover.leagueCondition.league;}
          if(this.season!=cp2y.discover.leagueCondition.season){tf=true;this.season=cp2y.discover.leagueCondition.season;}
          if(tf){
              cp2y.dialog.loading();
              $.getScript(WebAppUrl.zs+'league/static/'+this.league+'/'+this.season+'?callback=cp2y.discover.static',function(){});
          }
      }
  },
  static:function(data2){
      cp2y.dialog.clearLoading();
      if(data2.flag==1){
          var i=0,data=data2.zjqanddxcountlist,len=data.length,html=[];
          for(i;i<len;i++){
              html.push('<tr><td>'+(i+1)+'</td><td onclick="cp2y.discover.leagueTeam('+data[i].tid+')"><a>'+data[i].name+'</a></td><td>'+data[i].one+'</td><td>'+data[i].twothree+'</td><td>'+data[i].foursix+'</td><td>'+data[i].seven+'</td><td>'+data[i].dan +'</td><td>'+data[i].shuang+'</td></tr>');
          }
          $("#zjqanddx").html(html.join(''));
          html=[];i=0;data=data2.bqcStaticList;len=data.length;
          for(i;i<len;i++){
              html.push('<tr><td>'+(i+1)+'</td><td onclick="cp2y.discover.leagueTeam('+data[i].tid+')" colspan="2"><a>'+data[i].name+'</a></td><td>'+data[i].ss+'</td><td>'+data[i].sp+'</td><td>'+data[i].sf+'</td><td>'+data[i].ps+'</td><td>'+data[i].pp+'</td><td>'+data[i].pf+'</td><td>'+data[i].fs+'</td><td>'+data[i].fp+'</td><td>'+data[i].ff+'</td></tr>');
          }
          $("#bqc").html(html.join(''));
      }
  },
  leagueTeam:function(id){
      if(!id){
          var id=this.leagueCondition.teamId;
          this.teamToggle();
      }
      if(this.leagueCondition.teamId!=id){
          this.leagueCondition.teamId=id;
          cp2y.dialog.loading();
          $.getScript(WebAppUrl.zs+'league/teaminfo/'+id+'?callback=cp2y.discover._leagueTeam',function(){});
      }else{
          this.leagueS2();
      }

  },
  _leagueTeam:function(data){
      cp2y.dialog.clearLoading();
      if(data.flag==1){
          var data=data.teaminfo,html=[];
          this.leagueS2();
          if(!data){
              data={logo:'-',name:'-',enname:'',country:'',web:'-',info:'-'};
          }
          html.push('<table class="teaminfo">');
          html.push('<tr><td rowspan="3" width="80px"><img width="80px" src="'+data.logo+'" /></td><td colspan="4">'+data.name+'</td></tr>');
          html.push('<tr><td width="50px">英文名:</td><td>'+data.enname+'</td><td width="50px">所在城市</td><td>'+data.country+'</td></tr>');
          html.push('<tr><td>官网:</td><td colspan="3"><a href="'+data.web+'" target="_blank">'+data.web+'</a></td></tr></table>');
          $("#TeamInfo").html(html.join(''));
          $("#TeamDetail").html('<div class="lineTitle">球队简介<span class="U_D_icon"></span></div><div class="oddsLine1 txl">'+data.info+'</div>');
      }
  },
  teamScId:0,
  teamSc:function(){
      if(this.leagueCondition.teamId!=this.teamScId){
          this.teamScId=this.leagueCondition.teamId;
          cp2y.dialog.loading();
          $.getScript(WebAppUrl.zs+'league/teamsc/'+this.teamScId+'?callback=cp2y.discover._teamSc',function(){});
      }
      this.teamToggle();
  },
  _teamSc:function(data){
      cp2y.dialog.clearLoading();
      var M,i=0,len,html=[],tm;
      M=data.futurematchlist;
      html.push('<div class="lineTitle">未完成比赛<span class="U_D_icon"></span></div>');
      html.push('<table class="table2 table3">');
      html.push('<thead><tr><td>对阵</td><td>比赛时间</td><td>赛事</td></tr></thead><tbody>');
      if(M){
          len=M.length;
          for(i;i<len;i++){
              tm=M[i].mtime.split(' ');
              tm=tm[0].split('-')[0].substr(2,2)+'-'+Number(tm[0].split('-')[1]).addZero()+'-'+Number(tm[0].split('-')[2]).addZero()+'<br/>'+Number(tm[1].split(':')[0]).addZero()+':'+Number(tm[1].split(':')[1]).addZero();
              html.push('<tr><td>'+M[i].home+'<br/>VS<br/>'+M[i].away+'</td><td>'+tm+'</td><td style="background:#'+M[i].cl+';color:#fff;">'+M[i].ln+'</td></tr>');
          }
      }
      html.push('</tbody></table>');
      html.push('<div class="lineTitle">已完成比赛<span class="U_D_icon"></span></div>');
      html.push('<table class="table2 table3">');
      html.push('<thead><tr><td>对阵</td><td>半场</td><td>比赛时间</td><td>赛事</td></tr></thead><tbody>');
      M=data.teamfinishmatchlist;
      if(M){
          len=M.length;
          for(i;i<len;i++){
              tm=M[i].mtime.split(' ');
              tm=tm[0].split('-')[0].substr(2,2)+'-'+Number(tm[0].split('-')[1]).addZero()+'-'+Number(tm[0].split('-')[2]).addZero()+'<br/>'+Number(tm[1].split(':')[0]).addZero()+':'+Number(tm[1].split(':')[1]).addZero();
              html.push('<tr><td>'+M[i].hteam+'<br/>'+M[i].hscore+':'+M[i].ascore+'<br/>'+M[i].ateam+'</td><td>'+M[i].bc+'</td><td>'+tm+'</td><td style="background:#'+M[i].cl+';color:#fff;">'+M[i].ln+'</td></tr>');
          }
      }
      html.push('</tbody></table>');
      $("#TeamSc").html(html.join(''));
  },
  teamPlId:0,
  teamPl:function(){
      if(this.leagueCondition.teamId!=this.teamPlId){
          this.teamPlId=this.leagueCondition.teamId;
          cp2y.dialog.loading();
          $.getScript(WebAppUrl.zs+'league/teampl/'+this.teamPlId+'?callback=cp2y.discover._teamPl',function(){});
      }
      this.teamToggle();
  },
  _teamPl:function(data){
      cp2y.dialog.clearLoading();
      var M,i=0,len,html=[],pk,tm;
      M=data.teamfinishmatchlist;
      len=M.length
      html.push('<table class="table2 table3">');
      html.push('<thead><tr><td>对阵</td><td>半场</td><td>盘录</td><td>盘口</td><td>比赛时间</td><td>赛事</td></tr></thead><tbody>');
      if(len>0){
          pk=M[i].lite.split('|')[1].split(',')[1];
          tm=M[i].mtime.split(' ');
          tm=tm[0].split('-')[0].substr(2,2)+'-'+Number(tm[0].split('-')[1]).addZero()+'-'+Number(tm[0].split('-')[2]).addZero()+'<br/>'+Number(tm[1].split(':')[0]).addZero()+':'+Number(tm[1].split(':')[1]).addZero();
          for(i;i<len;i++){
              html.push('<tr><td>'+M[i].hteam+'<br/>'+M[i].hscore+':'+M[i].ascore+'<br/>'+M[i].ateam+'</td><td>'+M[i].bc+'</td><td>'+M[i].binfo+'</td><td>'+pk+'</td><td>'+tm+'</td><td style="background:#'+M[i].cl+';color:#fff;">'+M[i].ln+'</td></tr>');
          }
      }
      html.push('</tbody></table>');
      $("#TeamPl").html(html.join(''));
  },
  toggleMore2:function(i){
      var o=$("#userMoreDetail2 a"),k=$(".leaguePage2");
      o.removeClass('on');
      o.eq(i).addClass('on');
      k.hide();
      k.eq(i).show();
      if(i==0){
          $("#title2").html('<span>球队</span>-简介');
      }else if(i==1){
          $("#title2").html('<span>球队</span>-赛程');
      }else{
          $("#title2").html('<span>球队</span>-盘路');
      }
  },
  oddsId:1,
  odds:function(t,mid){
      cp2y.dialog.loading();
      this.oddsId=t;
      var url=(t=='1'?'analysis':t==2?"europe":"asia");
      url+='/'+mid;
      $.getScript(WebAppUrl.zs+'odds/'+url+'?callback=cp2y.discover.odds'+t,function(){});
  },
  odds1:function(data){
      cp2y.dialog.clearLoading();
      this.leagueS3();
      var i=0,html=[],m=data.matchinfo,len,MT='',MD;
      if(m){
          if(m.sessionname){
              MT=" "+m.sessionname+"赛季";
          }
          if(m.oname){
              MT+=" "+m.oname;
          }else{
              MT+=" 第"+m.rid+"轮 ";
          }
          MD=new Date(Number(m.mt+"000"));
          MT+=Number(MD.getMonth()+1).addZero()+'-'+Number(MD.getDate()).addZero()+' '+Number(MD.getHours()).addZero()+':'+Number(MD.getMinutes()).addZero();
          html.push('<div class="oddsLine1">'+m.ln+MT+' 开赛</div>');
          html.push('<div class="oddsLine2"><div>'+m.hn+'</div><div>'+m.hs+':'+m.as_+'</div><div>'+m.an+'</div></div>');
      }else{
          m={hn:'-',an:'-'};
      }
      html.push('<div class="lineTitle">两队交战<span class="U_D_icon"></span></div>');
      html.push('<div class="tableWarp2"><table class="table2"><thead><tr><td>赛事</td><td>日期</td><td>对阵</td><td>盘路</td><td>半场</td><td>胜负</td><tr></thead><tbody>');
      var M=data.matchHisList,jq=0,sq=0,s=0,p=0,f=0,v='';
      if(M){
      len=M.length;
      for(i;i<len;i++){
          html.push('<tr><td>'+M[i].ln+'</td>');
          html.push('<td>'+M[i].mtime.split(' ')[0]+'</td>');
          html.push('<td>'+M[i].hteam+' '+M[i].hscore+':'+M[i].ascore+' '+M[i].ateam+'</td>');
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
      }else{
      len=0;
      }
      html.push('</tbody></table></div>');
      if(data.hisStatic){
      html.push('<p class="oddsLine1">'+data.hisStatic+'</p>');
      }
      html.push('<div class="lineTitle">积分榜<span class="U_D_icon"></span></div>');
      html.push('<table class="table2 table3">');
      html.push('<thead><tr><td></td><td>场次</td><td>胜</td><td>平</td><td>负</td><td>进</td><td>失</td><td>净</td><td>积</td><td>胜率</td></tr></thead><tbody>');
      if(data.hscorestatic){
      html.push(this._scorestatic(data.hscorestatic));
      }
      html.push('<tr><td colspan="11">'+m.hn+'</td></tr>');
      if(data.ascorestatic){
      html.push(this._scorestatic(data.ascorestatic));
      }
      html.push('<tr><td colspan="11">'+m.an+'</td></tr>');
      html.push('</tbody></table>');
      html.push('<div class="lineTitle">近期战绩<span class="U_D_icon"></span></div>');
      html.push('<table class="table2 table3">');
      html.push('<thead><tr><td>赛事</td><td>日期</td><td>对阵</td><td>盘路</td></tr></thead><tbody>');
      M=data.hteammatchlist;i=0;jq=0;sq=0;s=0;p=0;f=0;
      if(M){
      len=M.length;
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
      }
      M=data.ateammatchlist;i=0;jq=0;sq=0;s=0;p=0;f=0;
      if(M){
      len=M.length;
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
      }
      html.push('<tr><td colspan="4">'+m.an+':'+s+'胜 '+p+'平 '+f+'负</td></tr>');
      html.push('</tbody></table>');
      html.push('<div class="lineTitle">未来赛事<span class="U_D_icon"></span></div>');
      M=data.hfutureScheduleList;i=0;
      var xg=0;
      html.push('<table class="table2 table3">');
      html.push('<thead><tr><td>赛事</td><td>日期</td><td>对阵</td><td>相隔</td></tr></thead><tbody>');
  if(M){
      len=M.length;
      for(i;i<len;i++){
          xg=((new Date(M[i].mtime).getTime()-new Date(Number(m.mt+'000')))/24/60/60/1000).toFixed(0);
          html.push('<tr><td>'+M[i].ln+'</td><td>'+M[i].mtime.split(' ')[0]+'</td><td>'+M[i].home+' VS '+M[i].away+'</td><td>'+xg+'天</td></tr>');
      }
  }
      html.push('<tr><td colspan="4">'+m.hn+'</td></tr>');
      xg=0;M=data.afutureScheduleList;i=0;
  if(M){
      len=M.length;
      for(i;i<len;i++){
          xg=((new Date(M[i].mtime).getTime()-new Date(Number(m.mt+'000')))/24/60/60/1000).toFixed(0);
          html.push('<tr><td>'+M[i].ln+'</td><td>'+M[i].mtime.split(' ')[0]+'</td><td>'+M[i].home+' VS '+M[i].away+'</td><td>'+xg+'天</td></tr>');
      }
  }
      html.push('<tr><td colspan="4">'+m.an+'</td></tr></tbody></table>');
      html.push('<div class="lineTitle">阵容情况<span class="U_D_icon"></span></div>');
      html.push('<table class="table2 table3 table4">');
      html.push('<thead><tr><td>后卫</td><td>中场</td><td>前锋</td><td>守门员</td></tr></thead>');
  if(data.hmatchAgainstlist){
      html.push(this._odds1(data.hmatchAgainstlist,m.hn));
  }
  if(data.amatchAgainstlist){
      html.push(this._odds1(data.amatchAgainstlist,m.an));
  }

      html.push('<tr><td colspan="4" class="ffl" style="text-align:center"><span class="r">红色:首发球员</span><span class="b">蓝色:后备球员</span><span class="h">黑色:停赛球员</span><span class="y">灰色:伤病球员</span><span class="g">绿色:其它原因缺阵球员</span></td></tr></tbody>');
      html.push('</table>');
      html.push('<div class="lineTitle">心水推荐<span class="U_D_icon"></span></div>');
      M=data.xinshuiRecomd;
      if(M){
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
      }
      $("#title3").html('综合');
      $("#OddsDetail").html(html.join(''));
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
  _odds1:function(data,h){
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
  odds2:function(data){//欧指
      cp2y.dialog.clearLoading();
      if(data.flag==1){
          this.leagueS3();
          var i=0,d=data.oddslist,len=d.length,html=[],m=data.matchinfo,MT='',a,a1,a2;
          if(m){
          if(m.sessionname){
              MT=" "+m.sessionname+"赛季";
          }
          if(m.oname){
              MT+=" "+m.oname;
          }else{
              MT+=" 第"+m.rid+"轮";
          }
          html.push('<div class="oddsLine1">'+m.ln+MT+' 开赛</div>');
          html.push('<div class="oddsLine2"><div>'+m.hn+'</div><div>'+m.hs+':'+m.as_+'</div><div>'+m.an+'</div></div>');
          }
          if(len>0){
          html.push('<div class="tableWarp2"><table class="table2">');
          html.push('<thead><tr><td rowspan="2">赔率公司</td><td colspan="3">初始/即时欧赔</td></tr>');
          html.push('<tr><td width="20%">主胜</td><td width="20%">平局</td><td width="20%">主负</td></tr>');
          html.push('</thead>');
          for(i;i<len;i++){
              a=d[i].lite.split('|');
              a1=a[0].split(',');
              a2=a[1].split(',');
              if(a1.length==1){a1=['-','-','-']}
              if(a2.length==1){a2=['-','-','-']}
              html.push('<tr><td rowspan="2">'+d[i].cname+'</td><td>'+a1[0]+'</td><td>'+a1[1]+'</td><td>'+a1[2]+'</td></tr>');
              html.push('<tr><td>'+a2[0]+'</td><td>'+a2[1]+'</td><td>'+a2[2]+'</td></tr>');
          }
          html.push('<tr><td>平均值</td><td>'+data.avginfo.zs+'</td><td>'+data.avginfo.pj+'</td><td>'+data.avginfo.zhifu+'</td></tr>');
          html.push('<tr><td>最大值</td><td>'+data.maxinfo.zs+'</td><td>'+data.maxinfo.pj+'</td><td>'+data.maxinfo.zhifu+'</td></tr>');
          html.push('<tr><td>最小值</td><td>'+data.mininfo.zs+'</td><td>'+data.mininfo.pj+'</td><td>'+data.mininfo.zhifu+'</td></tr>');
          html.push('</table></div>');
          }
          $("#title3").html('欧赔');
          $("#OddsDetail").html(html.join(''));
      }
  },
  odds3:function(data){//亚盘
      cp2y.dialog.clearLoading();
      if(data.flag==1){
          this.leagueS3();
          var i=0,d=data.yazhilist,len=d.length,html=[],m=data.matchinfo,MT='',a,a1,a2,a3='',a4='',t1,t2;
          if(m){
          if(m.sessionname){
              MT=" "+m.sessionname+"赛季";
          }
          if(m.oname){
              MT+=" "+m.oname;
          }else{
              MT+=" 第"+m.rid+"轮";
          }
          html.push('<div class="oddsLine1">'+m.ln+MT+' 开赛</div>');
          html.push('<div class="oddsLine2"><div>'+m.hn+'</div><div>'+m.hs+':'+m.as_+'</div><div>'+m.an+'</div></div>');
          }
          html.push('<div class="tableWarp"><table class="table2">');
          html.push('<thead><tr><td rowspan="2">赔率公司</td><td colspan="3">即时亚盘</td><td width="80px" rowspan="2">记录时间</td><td colspan="3">初始亚盘</td><td width="80px" rowspan="2">记录时间</td></tr>');
          html.push('<tr><td>水位</td><td>盘口</td><td>水位</td><td>水位</td><td>盘口</td><td>水位</td></tr>');
          html.push('</thead>');
          for(i;i<len;i++){
              a=d[i].lite.split('|');
              a1=a[0].split(',');
              a2=a[1].split(',');
              var mt=new Date(Number(String(a2[3])+"000")),md=new Date(Number(String(a1[3])+"000"));
              t1=String(mt.getFullYear()).substr(2,2)+'-'+(mt.getMonth()+1).addZero()+'-'+(mt.getDate()).addZero()+' '+(mt.getHours()).addZero()+':'+(mt.getMinutes()).addZero()+':'+(mt.getSeconds()).addZero();
              t2=String(md.getFullYear()).substr(2,2)+'-'+(md.getMonth()+1).addZero()+'-'+(md.getDate()).addZero()+' '+(md.getHours()).addZero()+':'+(md.getMinutes()).addZero()+':'+(md.getSeconds()).addZero();
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
              html.push('<tr><td>'+d[i].cname+'</td><td '+a3+'</td><td>'+a2[1]+'</td><td'+a4+'</td><td>'+t1+'</td>');
              html.push('<td>'+a1[0]+'</td><td>'+a1[1]+'</td><td>'+a1[2]+'</td><td>'+t2+'</td></tr>');
          }
          if(!data.maxinfo){
              data.maxinfo={endwaterlevel1:"-",endyapan:"-",endwaterlevel2:"-",beginwaterlevel1:"-",beginyapan:"-",beginwaterlevel2:"-"};
          }
          if(!data.mininfo){
              data.mininfo={endwaterlevel1:"-",endyapan:"-",endwaterlevel2:"-",beginwaterlevel1:"-",beginyapan:"-",beginwaterlevel2:"-"};
          }
          html.push('<tr><td>最大值</td><td>'+data.maxinfo.endwaterlevel1+'</td><td>'+data.maxinfo.endyapan+'</td><td>'+data.maxinfo.endwaterlevel2+'</td><td></td><td>'+data.maxinfo.beginwaterlevel1+'</td><td>'+data.maxinfo.beginyapan+'</td><td>'+data.maxinfo.beginwaterlevel2+'</td><td></td></tr>');
          html.push('<tr><td>最小值</td><td>'+data.mininfo.endwaterlevel1+'</td><td>'+data.mininfo.endyapan+'</td><td>'+data.mininfo.endwaterlevel2+'</td><td></td><td>'+data.mininfo.beginwaterlevel1+'</td><td>'+data.mininfo.beginyapan+'</td><td>'+data.mininfo.beginwaterlevel2+'</td><td></td></tr>');
          html.push('</table></div>');

          $("#title3").html('亚盘');
          $("#OddsDetail").html(html.join(''));
      }
  },
  leagueS1:function(){
      dom.WARP.show();
      dom.TEAM.hide();
      dom.ODDS.hide();
      $(".leaguePage2").hide();
      $(".leaguePage2").eq(0).show();
      $("#userMore2").removeClass("on");
      $("#MoreLocked2").hide();
      $("#userMoreDetail2").hide();
      this.toggleMore2(0);
  },
  leagueS2:function(){
      dom.WARP.hide();
      dom.TEAM.show();
  },
  leagueS3:function(){
      dom.WARP.hide();
      dom.ODDS.show();
  },
  teamToggle:function(){
      $("#userMore2").toggleClass('on');
      $("#userMoreDetail2").toggle();
      $("#MoreLocked2").toggle();
      window.scroll(0,0);
  },
  closeSelectData:function(){
      $("#SelectData").hide();
      $("#Warp").show();
  },
  openSelectData:function(){
      $("#SelectData").show();
      $("#Warp").hide();
      cp2y.day.init(1);
  },
  setDate:function(){
      var y=cp2y.day.Y,m=cp2y.day.M,d=cp2y.day.D,TD=new Date(),TY=TD.getFullYear(),TM=TD.getMonth()+1,TD=TD.getDate();
//		if(y>=TY){
//			if(m>=TM){
//				if(d>TD){
//					return cp2y.dialog.alert('合理设置查询时间');
//				}
//			}
//		}
      sessionStorage.setItem('y',cp2y.day.Y);
      sessionStorage.setItem('m',cp2y.day.M);
      sessionStorage.setItem('d',cp2y.day.D);
      this.closeSelectData();
      this.index();
  },
  index:function(i,e){
//		if(e){
//			$(e).siblings().removeClass('on');
//			$(e).addClass('on');
//		}
//		if(!i){i=1;}
      cp2y.dialog.loading();
      var t='',D=new Date(),y,m,d;
      if(!sessionStorage.getItem('y')){
          y=D.getFullYear();
      }else{
          y=sessionStorage.getItem('y');
      }
      if(!sessionStorage.getItem('m')){
          m=D.getMonth()+1;
      }else{
          m=sessionStorage.getItem('m');
      }
      if(!sessionStorage.getItem('d')){
          d=D.getDate();
      }else{
          d=sessionStorage.getItem('d');
      }
      t=y+''+Number(m).addZero()+''+Number(d).addZero();
      $("#curD").html(t);
      $.getScript(WebAppUrl.zs+'index/first?datetime='+t+'&callback=cp2y.discover._index1',function(){});
//		if(i==1){
//			$.getScript(WebAppUrl.zs+'index/first?='+t+'&callback=cp2y.discover._index1',function(){});
//		}else if(i==2){
//			$.getScript(WebAppUrl.zs+'index/first?='+t+'&callback=cp2y.discover._index2',function(){});
//		}else if(i==3){
//			$.getScript(WebAppUrl.zs+'index/first?='+t+'&callback=cp2y.discover._index3',function(){});
//		}
  },
  _index1:function(data2){
      cp2y.dialog.clearLoading();
      if(data2.flag==1){
          var i=0,d=data2.newMatchinfo,len=d.length,html=[],leagues=data2.leagueNames.split(','),y,o,y2,w,w1,w2,wd=["日","一","二","三","四","五","六"],cname,cname2,t2,l,vs;
          for(i;i<len;i++){
              if(d[i].oyalist.length>0){
                  y=d[i].oyalist[0].zylite.split('|')[0].split(',');
                  o=d[i].oyalist[0].zolite.split('|')[0].split(',');
                  cname=d[i].oyalist[0].cname;
                  if(d[i].oyalist[1]){
                      y2=d[i].oyalist[1].zylite.split('|')[0].split(',');
                      o2=d[i].oyalist[1].zolite.split('|')[0].split(',');
                      cname2=d[i].oyalist[1].cname;
                  }else{
                      y2=0;o2=0;cname2='';
                  }
              }else{
                  y=0;o=0;y2=0;o2=0;cname='';cname2='';
              }
              w=d[i].xid;
              w1="20"+w.substr(0,2)+"-"+w.substr(2,2)+"-"+w.substr(4,2);
              w1=new Date(w1).getDay();
              t2=d[i].mt+"000";
              if(Number(t2)<new Date().getTime()){
                  vs=d[i].hs+':'+d[i].as_;
              }else{
                  vs='vs';
              }
              t2=new Date(Number(t2));
              w2=w.substr(6,3);
              l=d[i].oname;
              if(!l){
                  l='第'+d[i].rid+'轮';
              }
              html.push('<tr class="'+d[i].ln+'">');
              html.push('<td rowspan="2">');
              html.push('<a onclick="cp2y.discover.leagueTeam('+d[i].hid+')">'+d[i].hn+'</a><br/>');
              html.push('<b>'+vs+'</b><br/>');
              html.push('<a onclick="cp2y.discover.leagueTeam('+d[i].aid+')">'+d[i].an+'</a>');
              html.push('</td>');
              html.push('<td>'+cname+'</td>');
              html.push('<td><a>'+(y[0]?y[0]:'--')+'</a></td>');
              html.push('<td><a>'+(y[1]?y[1]:'--')+'</a></td>');
              html.push('<td><a>'+(y[2]?y[2]:'--')+'</a></td>')
              html.push('<td><a>'+(o[0]?o[0]:'--')+'</a></td>');
              html.push('<td><a>'+(o[1]?o[1]:'--')+'</a></td>');
              html.push('<td><a>'+(o[2]?o[2]:'--')+'</a></td>');
              html.push('<td rowspan="2" onclick="cp2y.discover.odds(1,'+d[i].mid+')"><a>综合</a></td>');
              html.push('<td rowspan="2" onclick="cp2y.discover.odds(2,'+d[i].mid+')"><a>欧赔</a></td>');
              html.push('<td rowspan="2" onclick="cp2y.discover.odds(3,'+d[i].mid+')"><a>亚盘</a></td>');
              html.push('<td rowspan="2">'+Number(t2.getMonth()+1).addZero()+'-'+Number(t2.getDate()).addZero()+' '+Number(t2.getHours()).addZero()+':'+Number(t2.getMinutes()).addZero()+'</td>');
              html.push('<td rowspan="2">'+l+'</td>');
              html.push('<td rowspan="2" style="background:#'+d[i].lc+';color:#fff;">'+d[i].ln+'</td>');
              html.push('<td rowspan="2">周'+wd[w1]+' '+w2+'</td>');
              html.push('</tr>');
              html.push('<tr class="'+d[i].ln+'">');
              html.push('<td>'+cname2+'</td>');
              html.push('<td><a>'+(y2[0]?y2[0]:'--')+'</a></td>');
              html.push('<td><a>'+(y2[1]?y2[1]:'--')+'</a></td>');
              html.push('<td><a>'+(y2[2]?y2[2]:'--')+'</a></td>')
              html.push('<td><a>'+(o2[0]?o2[0]:'--')+'</a></td>');
              html.push('<td><a>'+(o2[1]?o2[1]:'--')+'</a></td>');
              html.push('<td><a>'+(o2[2]?o2[2]:'--')+'</a></td>');
              html.push('</tr>');
          }
          $("#discoverIndex").html(html.join(''));
          i=0;len=leagues.length;html=[];
          for(i;i<len;i++){
              html.push('<a onclick="cp2y.discover.Lea3(this);" class="on">' + leagues[i] + '</a>');
          }
          $("#lcs").html(html.join(''));
      }
  },
  _index2:function(data2){
      cp2y.dialog.clearLoading();
      if(data2.flag==1){}
  },
  _index3:function(data2){
      cp2y.dialog.clearLoading();
      if(data2.flag==1){}	
  },
  openLC:function(){
      dom.WARP.hide();
      $("#leagueChoose").show();
  },
  hideLC:function(){
      dom.WARP.show();
      $("#leagueChoose").hide();
  },
  Lea: function () {
      var Lea = [],i = 0,len;
      $("#lcs .on").each(function (i, v) {
          Lea.push($(v).html());
      });
      len = Lea.length;
      $("#discoverIndex tr").each(function (i, v) {
          if (Lea.indexOf($(v).attr("class")) != -1) {
              $(v).show();
          }
          else {
              $(v).hide();
          }
      });
      this.hideLC();
  },
  Lea2:function(t,x){
      $(t).toggleClass('on');
      $(t).siblings().removeClass('on');
      if (x == 1) {
          $("#lcs a").addClass("on");
      }else if (x == 2) {
          $("#lcs a").toggleClass("on");
      }else if (x == 3) {
          $("#lcs a").removeClass("on");
      }else if (x == 4) {
          $("#lcs a").removeClass("on");
          $("#lcs a").each(function (i, v) {
              if (['意甲', '英超', '西甲', '德甲', '法甲'].indexOf($(v).html()) != -1) {
                  $(v).addClass('on');
              }
          });
      }
  },
  Lea3:function(e){
      $(e).toggleClass('on');
  },
  scoreId:0,
  scoreType:0,
  scoreIndex:function(w,type,e){
      $("#title b").html(w);
      this.scoreType=type;
      $(e).siblings().removeClass('on');
      $(e).addClass('on');
      this.scoreDivert();
  },
  scoreNav:function(i,e){
      this.scoreId=i;
      $(e).siblings().removeClass('cur');
      $(e).addClass('cur');
      this.scoreDivert();
  },
  scoreDivert:function(){
      if(this.scoreType==0){
          this.score();
      }else{
          this.score2();
      }
  },
  score:function(){
      cp2y.dialog.loading();
      $.getScript(WebAppUrl.zs+'jz/score?status='+this.scoreId+'&callback=cp2y.discover._score',function(){});
  },
  score2:function(){
      cp2y.dialog.loading();
      $.getScript(WebAppUrl.zs+'sjb/score?status='+this.scoreId+'&callback=cp2y.discover._score',function(){});
  },
  _score:function(data){
      cp2y.dialog.clearLoading();
      if(data.flag==1){
          var i=0,M,len,html=[],wd=["日","一","二","三","四","五","六"],ii,ck,kc='',vs;
          if(data.liveIssueList){
              M=data.liveIssueList;
          }else{
              M=data.sjbmatchlist;
          }
          len=M.length;
          if(this.scoreId==0){
              ck="当前";
          }else{
              ck="已结束";
          }
          for(i;i<len;i++){
              var j=0,D=M[i].list,jen=D.length;
              html.push('<div class="tip tip2">'+M[i].matchTime+' 周'+wd[new Date(M[i].matchTime).getDay()]+'<b class="fr">比赛场次：<span>'+jen+'场</span></b></div><ul class="scoreListUl">');
              for(j;j<jen;j++){
                  ii=D[j].mtime.split(' ')[1].split(':');
                  switch(D[j].state){
                      case 1:
                          kc='上半场';
                          break;
                      case 2:
                          kc='中场';
                          break;
                      case 3:
                          kc='下半场';
                          break;
                      case 4:
                      case 10:
                          kc='完场';
                          break;
                      case 5:
                          kc='中断';
                          break;
                      case 6:
                          kc='取消';
                          break;
                      case 7:
                      case 8:
                      case 9:
                          kc='加时';
                          break;
                      case 11:
                          kc='点球';
                          break;
                      case 12:
                          kc='全';
                          break;
                      case 13:
                          kc='延时';
                          break;
                      case 14:
                          kc='腰斩';
                          break;
                      case 15:
                          kc='待定';
                          break;
                      case 16:
                          kc='金球';
                          break;
                      case 17:
                          kc='未开赛';
                          break;
                  }
                  if( D[j].state ==14 || D[j].state==15 || D[j].state==17 ){

                  }else{
                      if(D[j].bc){kc+=' 半场'+D[j].bc;}
                  }
                  if(this.scoreId==1){vs=D[j].hscore+':'+D[j].ascore;}else{vs="VS";}

                  html.push('<li><div class="scoreListUl1"><b>'+D[j].ln+'</b><p><span>'+String(D[j].xid).substr(6,3)+'</span><span>'+ii[0]+':'+ii[1]+'</span></p></div><a onclick="cp2y.discover.odds(1,'+D[j].mid+')"><div class="scoreListUl2"><div><span>'+D[j].hteam+'</span><span class="y">'+vs+'</span><span>'+D[j].ateam+'</span></div><p>'+kc+'</p></div></a></li>');
              }
              html.push('</ul>');
          }
          $('#scoreList').html(html.join(''));
      }
  }
};
$('#chooseSeason').change(function(){
	cp2y.discover.setSeason({t:$("#chooseSeason option").not(function(){ return !this.selected }).html(),v:$(this).val()});
});
$('#chooseRound').change(function(){
  cp2y.discover.setRound($(this).val());
});
$(document).on('click',$(".lineTitle"),function(e){
//	if($(e.target).hasClass('cur')){
//		$(e.target).next().hide();
//		$(e.target).removeClass('cur');
//	}else{
//		$(e.target).next().show();
//		$(e.target).addClass('cur');
//	}
});
$(document).on('click',$(".tip2"),function(e){
	//$(e.target).next().toggle();
});
