/**
 * @author luwenbin@live.com
 * 购彩记录
 */
var dom={t:$("#title"),uP:$("#capitalBox1"),m:$("#userMore"),mD:$("#userMoreDetail"),mL:$("#MoreLocked")};
cp2y.user={
	clear:function(){
		this.setPage(1);
		localStorage.setItem('logType',0);
	},
	toggleMore:function(){
		if(dom.m.hasClass('on')){
			dom.m.removeClass('on');dom.mD.hide();dom.mL.hide();
		}else{
			dom.m.addClass('on');dom.mD.show();dom.mL.show();
			window.scrollTo(0,0);
		}
	},
	setPage:function(p){
		localStorage.setItem('logPage',p);
	},
	getPage:function(){
		var p=localStorage.getItem('logPage');
		if(isNaN(p) || !p){p=1;}
		this.setPage(p);
		return p;
	},
	getType:function(){
		var t=localStorage.getItem('logType');
		if(isNaN(t) || !t){t=0;}
		return t;
	},
	totalPage:0,
	init:function(){
		dom.m.click(function(){cp2y.user.toggleMore();});
		dom.t.click(function(){cp2y.user.toggleMore();});
		dom.mL.click(function(){cp2y.user.toggleMore();});
		var t=localStorage.getItem('logType');
		if(!t){t=0;}
		this.log(t);
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
	log:function(t){
		if(!t && t!=0){var t=this.getType();}
		localStorage.setItem('logType',t);
		var p=this.getPage(),o=$("#t"+t),status=0;
		o.siblings().removeClass('on');
		o.addClass('on');
		dom.t.html("购彩记录-<span>"+o.html()+"</span>");
		if(t==6 || t==7){status=5;}
		this._log({type:t,status:status,page:p},function(data){
			if(data.flag==1){
				cp2y.user.buildPages(p,data.pageSize);
				var i=0,len=data.schemelist.length,html=[];
				for(i;i<len;i++){
					html.push('<div class="mylog userPartBox3C">');
					if(data.schemelist[i].schemeId){
						html.push('<a href="/lottery/detail#scheme='+data.schemelist[i].schemeId+'">');
					}else{
						html.push('<a>');
					}
					html.push('<p><img src="'+WebAppUrl.Icon+data.schemelist[i].lotteryId+'.png" /><span>'+data.schemelist[i].lotteryName+'</span></p>');
						html.push('<div><b>金额'+data.schemelist[i].schemeAmount+'元</b>');
						html.push('<span>'+data.schemelist[i].issue+'期</span></div>');
						html.push('<div>');
						if(data.schemelist[i].prize>0){
							html.push('<b class="has501">中'+data.schemelist[i].prize+'元</b>');
						}else{
							html.push('<b>'+data.schemelist[i].statusDesc+'</b>');
						}
					html.push('<span>'+data.schemelist[i].initiateTime+'</span></div></a></div>');
				}
				dom.uP.html(html.join(''));
			}else{
				dom.uP.html('<p class="error1">'+data.message+'</p>');
				cp2y.user.buildPages(1,1);
			}
		});
	},
	_log:function(data,fn){
		$.ajax({
			url:WebAppUrl.HOME_APP_URL+"/core/lottery/my_schemelist",
			data:data,
			beforeSend:function(){cp2y.dialog.loading();},
			success:function(data){cp2y.dialog.clearLoading();fn(data);},
			error:function(){cp2y.dialog.clearLoading();}
		});
	}
};
$('#prev').click(function(){
	if($(this).hasClass('prev')){
		var p=Number(cp2y.user.getPage())-1;
		if(p==0 || isNaN(p)){p=1;}
		cp2y.user.setPage(p);
		cp2y.user.log();
	}
});
$('#next').click(function(){
	if($(this).hasClass('next')){
		var p=Number(cp2y.user.getPage())+1;
		if(isNaN(p)){p=1;}
		cp2y.user.setPage(p);
		cp2y.user.log();
	}
});
$('#selectPage').change(function(){
	var p=$(this).val();
	cp2y.user.setPage(p);
	cp2y.user.log();
});