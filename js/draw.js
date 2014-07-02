/**
 * @author luwenbin@live.com
 */
var dom={
	t:$('#drawTitle'),
	c:$('#drawContentBox')
};
cp2y.draw={
	bt:10032,
	clear:function(){
		this.setPage(1);
	},
	setPage:function(p){
		localStorage.setItem('drawPage',p);
	},
	getPage:function(){
		var p=localStorage.getItem('drawPage');
		if(isNaN(p) || !p){p=1;}
		this.setPage(p);
		return p;
	},
	buildPages:function(c,m){
		var i=1,html=[];
		for(i;i<=m;i++){
			html.push('<option value="'+i+'">第'+i+'页</option>');
		}
		$('#selectPage').html(html.join('')).val(c);
		if(m==1){
			$('#prev').removeClass('prev');
			$('#next').removeClass('next');
		}else{
			$('#prev').addClass('prev');
			$('#next').addClass('next');
			if(c>=m){
				$('#next').removeClass('next');
			}
			if(c==1){
				$('#prev').removeClass('prev');
			}
		}
		$('#cur').html((c)+"/"+m);
	},
	index:function(){
		$.ajax({
			url:WebAppUrl.HOME_APP_URL+'/lottery/issue_notify_all',
			beforeSend:function(){cp2y.dialog.loading();},
			success:function(data){
				cp2y.dialog.clearLoading();
				var i=0,len=data.drawList.length,html=[];
				for(i;i<len;i++){
					var bolls=cp2y.util.setboll(data.drawList[i].drawNumber,data.drawList[i].lotteryId);
					html.push('<div class="playType"><a href="/draw/'+data.drawList[i].lotteryId+'/">');
					html.push('<div class="img2">');
					html.push('<img src="'+WebAppUrl.Icon+data.drawList[i].lotteryId+'.png" /><span>'+data.drawList[i].lotteryName+'</span></div>');
					html.push('<div class="drawList">');
					html.push('<p><span>'+data.drawList[i].issue+'期</span>'+data.drawList[i].drawTime+'</p>');
					html.push('<div>'+bolls.join('')+'</div>');
					html.push('</div></a></div>');
				}
				dom.c.html(html.join(''));
			},
			error:function(){cp2y.dialog.clearLoading();}
		});
	},
	list:function(){
		var p=this.getPage(),id=this.bt;
		$.ajax({
			url:WebAppUrl.HOME_APP_URL+'/lottery/query_his_notify',
			data:{lotteryId:id,page:p},
			beforeSend:function(){cp2y.dialog.loading();},
			success:function(data){
				cp2y.dialog.clearLoading();
				dom.t.html(data.lotteryName);
				var i=0,len=data.list.length,html=[],c=data.pageSize;
				if(c>20){c=20;}
				cp2y.draw.buildPages(p,c);
				for(i;i<len;i++){
					var bolls=cp2y.util.setboll(data.list[i].drawNumber,id);
					html.push('<div class="playType"><div class="drawList"><a href="/draw/'+id+'/'+data.list[i].issue+'/">');
					html.push('<p><span>'+data.list[i].issue+'期</span>'+data.list[i].drawTime+'</p>');
					html.push('<div>'+bolls.join('')+'</div></a></div></div>');
				}
				dom.c.html(html.join(''));
			},
			error:function(){cp2y.dialog.clearLoading();}
		});
	},
	jcList:function(){
		var matchTime='',y=localStorage.getItem('y'),m=localStorage.getItem('m'),d=localStorage.getItem('d');
		if(y!=null && m!=null && d!=null){
			matchTime=y+'-'+m+'-'+d;
		}
		$.ajax({
			url:WebAppUrl.HOME_APP_URL+'/lottery/football_his?matchTime='+matchTime,
			beforeSend:function(){cp2y.dialog.loading();},
			success:function(data){
				cp2y.dialog.clearLoading();
				dom.t.html('竞彩足球');
				var data=data.data,i=0,len=data.length,html=[];
				for(i;i<len;i++){
					var j=0,data2=data[i].list,jlen=data2.length;
					html.push('<div class="tip tip2">'+data[i].matchTime+'<b class="fr">比赛场次：<span>'+jlen+'场</span></b></div><ul>');
					for(j;j<jlen;j++){
						html.push('<li class="jcDraw">');
						html.push('<p class="l1">'+data2[j].leagueName+data2[j].matchCode.substr(-3)+'<span>('+data2[j].matchTime.substr(-5)+'开赛)</span></p>');
						html.push('<div class="l2"><p>'+data2[j].hostName+'</p><p>'+data2[j].lastScore+'</p><p>'+data2[j].guestName+'</p></div>');
						html.push('<table>');
						html.push('<tr><td>胜平负：</td><td>'+(data2[j].spfResult==3?'胜':data2[j].spfResult==1?'平':'负')+'</td><td>奖金'+data2[j].spfSp +'</td></tr>');
						html.push('<tr><td>让球胜平负：</td><td>'+(data2[j].rqSpfResult==3?'胜':data2[j].rqSpfResult==1?'平':'负')+'</td><td>奖金'+data2[j].rqSpfSp+'</td></tr>');
						html.push('<tr><td>总进球：</td><td>'+data2[j].zjqResult+'</td><td>奖金'+data2[j].zjqSp+'</td></tr>');
						html.push('<tr><td>比分：</td><td>'+data2[j].lastScore+'</td><td>奖金'+data2[j].bfSp+'</td></tr>');
						var b1=data2[j].bqcResult.substr(0,1),b2=data2[j].bqcResult.substr(-1);
						html.push('<tr><td>半全场：</td><td>'+(b1==3?'胜':b1==1?'平':'负')+(b2==3?'胜':b2==1?'平':'负')+'</td><td>奖金'+data2[j].bqcSp+'</td></tr>');
						html.push('</table>');
						html.push('</li>');
					}
					html.push('</ul><a class="fixBottom" href="/lottery/10059?type=a0">购买竞彩足球</a>');
				}
				dom.c.html(html.join(''));
				$(".tip2").click(function () {
					$(this).next().toggle();
				});
			},
			error:function(){cp2y.dialog.clearLoading();}
		});
	},
	jcListInit:function(){
		localStorage.removeItem('y');
		localStorage.removeItem('m');
		localStorage.removeItem('d');
	},
	closeSelectData:function(){
		$("#SelectData").hide();
		$("#Warp").show();
	},
	openSelectData:function(){
		$("#SelectData").show();
		$("#Warp").hide();
		cp2y.day.init();
	},
	setDate:function(){
		var y=cp2y.day.Y,m=cp2y.day.M,d=cp2y.day.D,TD=new Date(),TY=TD.getFullYear(),TM=TD.getMonth()+1,TD=TD.getDate();
		if(y>=TY){
			if(m>=TM){
				if(d>TD){
					return cp2y.dialog.alert('合理设置查询时间');
				}
			}
		}
		localStorage.setItem('y',cp2y.day.Y);
		localStorage.setItem('m',cp2y.day.M);
		localStorage.setItem('d',cp2y.day.D);
		this.closeSelectData();
		this.jcList();
	},
	detail:function(id,issue){
		$.ajax({
			url:WebAppUrl.HOME_APP_URL+'/lottery/issue_detail',
			data:{lotteryId:id,issue:issue},
			beforeSend:function(){cp2y.dialog.loading();},
			success:function(data){
				cp2y.dialog.clearLoading();
				var data=data[0],html=[],i=0,len=data.items.length,bolls=cp2y.util.setboll(data.drawNumber,data.lotteryId);
				dom.t.html(data.lotteryName);
				html.push('<div class="playType" ><div class="img2"><img src="'+WebAppUrl.Icon+data.lotteryId+'.png"/><span>'+data.lotteryName+'</span></div>');
				html.push('<div class="drawList"><p><span>'+data.issue+'期</span>'+data.drawTime+'</p>');
				html.push('<div>'+bolls.join('')+'</div></div></div>');
				html.push('<table class="table1">');
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
				html.push('</tbody></table>');
				if(BT.selling.indexOf(data.lotteryId)!=-1){
				html.push('<a class="fixBottom" href="/lottery/'+data.lotteryId+'?type=a0">购买'+data.lotteryName+'</a>');
				}
				dom.c.html(html.join(''));
			},
			error:function(){cp2y.dialog.clearLoading();}
		});
	}
};
$('#prev').click(function(){
	if($(this).hasClass('prev')){
		var p=Number(cp2y.draw.getPage())-1;
		if(p==0 || isNaN(p)){p=1;}
		cp2y.draw.setPage(p);
		cp2y.draw.list();
	}
});
$('#next').click(function(){
	if($(this).hasClass('next')){
		var p=Number(cp2y.draw.getPage())+1;
		if(isNaN(p)){p=1;}
		cp2y.draw.setPage(p);
		cp2y.draw.list();
	}
});
$('#selectPage').change(function(){
	var p=$(this).val();
	cp2y.draw.setPage(p);
	cp2y.draw.list();
});
