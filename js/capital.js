/**
 * @author luwenbin@live.com
 * 资金明细
 */
var dom={t:$("#title"),uP:$("#capitalBox1"),m:$("#userMore"),mD:$("#userMoreDetail"),mL:$("#MoreLocked")};
cp2y.user={
	clear:function(){
		this.setPage(1);
		localStorage.setItem('capitalType',0);
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
		localStorage.setItem('capitalPage',p);
	},
	getPage:function(){
		var p=localStorage.getItem('capitalPage');
		if(isNaN(p) || !p){p=1;}
		this.setPage(p);
		return p;
	},
	getType:function(){
		var t=localStorage.getItem('capitalType');
		if(isNaN(t) || !t){t=0;}
		return t;
	},
	totalPage:0,
	init:function(){
		dom.m.click(function(){cp2y.user.toggleMore();});
		dom.t.click(function(){cp2y.user.toggleMore();});
		dom.mL.click(function(){cp2y.user.toggleMore();});
		var t=localStorage.getItem('capitalType');
		if(!t){t=0;}
		this.capital(t);
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
	capital:function(t){
		if(!t && t!=0){var t=this.getType();}
		localStorage.setItem('capitalType',t);
		var p=this.getPage(),o=$("#t"+t),status=0;
		o.siblings().removeClass('on');
		o.addClass('on');
		dom.t.html("资金明细-<span>"+o.html()+"</span>");
		if(t==4){
			this._capital({optionType:t,page:p},function(data){
				if(data.flag==1){
					cp2y.user.buildPages(p,data.pageSize);
					var data=data.list,html=[],i=0,len=data.length,has="";
					for(i;i<len;i++){
						html.push('<div class="capital userPartBox3C">');
						html.push('<div><b>'+data[i].type+'</b><span>'+data[i].typeDesc+'</span></div>');
						html.push('<div>提款金额：'+data[i].money+'元<span>'+data[i].stateDesc+'</span></div></div>');
					}
					dom.uP.html(html.join(''));
				}else{
					dom.uP.html('<p class="error1">'+data.message+'</p>');
					cp2y.user.buildPages(1,1);
				}
			},4);
		}else{
			this._capital({optionType:t,page:p},function(data){
				if(data.flag==1){
					cp2y.user.buildPages(p,data.pageSize);
					var data=data.list,html=[],i=0,len=data.length,has="";
					for(i;i<len;i++){
						if(data[i].payOut){
							has='<b class="has501">-'+data[i].payOut+'元</b>';
						}else{
							has='<b>+'+data[i].inCome+'元</b>';
						}
						html.push('<div class="capital userPartBox3C">');
						if(data[i].schemeId){
							html.push('<a href="/lottery/detail#scheme='+data[i].schemeId+'&index=2">');
						}else{
							html.push('<a>');
						}
						html.push('<div><b>'+data[i].type+'</b><span>'+data[i].createTime+'</span></div>');
						html.push('<div>'+has+'<span>余额：'+data[i].balance+'</span></div></a></div>');
					}
					dom.uP.html(html.join(''));
				}else{
					dom.uP.html('<p class="error1">'+data.message+'</p>');
					cp2y.user.buildPages(1,1);
				}
			},1);
		}
	},
	_capital:function(data,fn,tf){
		var url=tf==4?'/core/user/capitalInOut_detail':'/core/user/capital_detail';
		$.ajax({
			url:WebAppUrl.HOME_APP_URL+url,
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
		cp2y.user.capital();
	}
});
$('#next').click(function(){
	if($(this).hasClass('next')){
		var p=Number(cp2y.user.getPage())+1;
		if(isNaN(p)){p=1;}
		cp2y.user.setPage(p);
		cp2y.user.capital();
	}
});
$('#selectPage').change(function(){
	var p=$(this).val();
	cp2y.user.setPage(p);
	cp2y.user.capital();
});