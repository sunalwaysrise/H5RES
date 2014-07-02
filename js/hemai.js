/**
 * @author luwenbin@live.com
 */
var dom={
	t:$("#Title"),
	MoreDetail:$("#MoreDetail"),
	MoreLocked:$("#MoreLocked"),
	More:$("#More"),
};
cp2y.hemai={
	lotteryId:0,
	setLottery:function(x,e){
		this.lotteryId=x;
		$(e).addClass('onn').siblings().removeClass('onn');
		dom.t.children('b').html($(e).html());
		this.index(1);
	},
	page:1,
	setPage:function(){},
	asc:false,
	setAsc:function(){
		if(this.asc){
			this.asc=false;
		}else{
			this.asc=true;
		}
		this.index(1);
	},
	sort:7,
	setSort:function(x,e){
		this.sort=x;
		$(e).addClass('onn').siblings().removeClass('onn');
		this.index(1);
	},
	reset:function(){
		dom.t.children('b').html('全部');
		this.lotteryId=0;
		this.page=1;
		this.asc=false;
		this.sort=1;
		$("#changePlayType b").removeClass("onn");
		$("#ScrTab .ScrTabC a").eq(7).addClass("onn").siblings().removeClass("onn");
	},
	setKeyword:function(){
		var v=$("#keyWord").val();
		if(v){
			this.reset();
			this.Keyword=v;
			this.index();
		}
	},
	index:function(hs){
		var d={lotteryId:this.lotteryId,page:this.page,asc:this.asc,sort:this.sort};
		if(hs){
			this.Keyword=null;
			$("#keyWord").val('');
		}
		if(this.Keyword){
			d.keyWord=this.Keyword;
		}
		$.ajax({
			url:WebAppUrl.HOME_APP_URL+"/lottery/scheme_hm",
			data:d,
			beforeSend:function(){cp2y.dialog.loading();},
			success:function(data){
				cp2y.dialog.clearLoading();
				var i=0,D,len,html=[],t,u;
				if(data.flag==1){
					D=data.datalist;
					len=D.length;
					t=data.pageSize>20?20:data.pageSize;
					cp2y.hemai.buildPages(data.page,t);
					for(i;i<len;i++){
						html.push('<li><a href="/lottery/detail#scheme='+D[i].schemeId+'&index=3">');
						html.push('<div class="hemaiT"><div class="hemaiT1">');
						if(D[i].schemeTop){html.push('<i>顶</i>');}
						pro=D[i].progress.split('+');
						if(pro[1]){
							pro=pro[1];
						}else{
							pro='';
						}
						if(D[i].userName.substr(0,2)=="m-"){
							t=D[i].userName.substr(0,9)+"****";
						}else{
							t=D[i].userName;
						}
						html.push('<section>'+pro+'</section></div>');
						html.push('<b>'+D[i].moeyProgress+'<em>%</em></b>');
						html.push('<p>'+D[i].lotteryName+'</p>');
						html.push('</div>');
						html.push('<div class="hemaiC">');
						html.push('<div class="hemaiC1"><p>'+t+'</p><p>'+D[i].level+'</p></div>');
						html.push('<div class="hemaiC2"><p>总金额<br/><var>'+D[i].schemeAmount+'元</var></p><p>剩余<br/><var>'+D[i].remainAmount+'元</var></p><p>参与<br/><var>'+D[i].personCount+'人</var></p></div>');
						html.push('</div></a></li>');
					}
					$("#hemai").html(html.join(''));
				}
			}
		});
	},
	init:function(){
		this.lotteryId=0;
		dom.t.click(function(){
			cp2y.hemai.toggleMore();
		});
		dom.MoreDetail.click(function(){
			cp2y.hemai.toggleMore();
		});
		dom.MoreLocked.click(function(){
			cp2y.hemai.toggleMore();
		});
		dom.More.click(function(){
			cp2y.hemai.toggleMore();
		});
		$('#prev').click(function(){
			if($(this).hasClass('prev')){
				var p=cp2y.hemai.page-1;
				if(p==0 || isNaN(p)){p=1;}
				cp2y.hemai.page--;
				cp2y.hemai.index();
			}
		});
		$('#next').click(function(){
			if($(this).hasClass('next')){
				var p=cp2y.hemai.page+1;
				if(isNaN(p)){p=1;}
				cp2y.hemai.page++;
				cp2y.hemai.index();
			}
		});
		$('#selectPage').change(function(){
			var p=$(this).val();
			cp2y.hemai.page=p;
			cp2y.hemai.index();
		});
		$('#BuyTab').click(function(){
			cp2y.hemai.hideBuyTab();
		});
		$('#ScrTab').click(function(){
			cp2y.hemai.hideScrTab();
		});
		var html=[],html2=[];//'10024' 排列三//'10038'老时时彩
		html.push('<b onclick="cp2y.hemai.setLottery(10059,this)">竞彩足球</b><span></span>');
		html.push('<b onclick="cp2y.hemai.setLottery(10032,this)">双色球</b><b onclick="cp2y.hemai.setLottery(10026,this)">超级大乐透</b><b onclick="cp2y.hemai.setLottery(10025,this)">福彩3D</b><span></span>');
		html.push('<b onclick="cp2y.hemai.setLottery(10046,this)">11运夺金</b><b onclick="cp2y.hemai.setLottery(10064,this)">快乐十分</b><b onclick="cp2y.hemai.setLottery(10065,this)">新快三</b><b onclick="cp2y.hemai.setLottery(10060,this)">江西11选5</b><b onclick="cp2y.hemai.setLottery(10061,this)">新时时彩</b><b onclick="cp2y.hemai.setLottery(10066,this)">11选5</b>');
		$('#changePlayType').html(html.join(''));
		html2.push('<a href="/lottery/10059?type=a0">竞彩足球</a><span></span>');
		html2.push('<a href="/lottery/10032?type=a0">双色球</a><a href="/lottery/10026?type=a0">超级大乐透</a><a href="/lottery/10025?type=a0">福彩3D</a><span></span>');
		html2.push('<a href="/lottery/10046?type=a0">11运夺金</a><a href="/lottery/10064?type=a0">快乐十分</a><a href="/lottery/10065?type=a0">新快三</a><a href="/lottery/10060?type=a0">江西11选5</a><a href="/lottery/10061?type=a0">新时时彩</a><a href="/lottery/10066?type=a0">11选5</a>');
		$('#BuyTabC').html(html2.join(''));
		this.index();
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
	showScrTab:function(){
		this.hideBuyTab();
		$("#ScrTab").show();
	},
	hideScrTab:function(){
		$("#ScrTab").hide();
	},
	showBuyTab:function(){
		this.hideScrTab();
		$("#BuyTab").show();
	},
	hideBuyTab:function(){
		$("#BuyTab").hide();
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
	}
};
cp2y.hemai.init();
$("#keyWord").click(function(){
	return false;
});