/**
 * @author luwenbin@live.com
 */
$("#mainSection").show();
var jcDom={
	headerS1:$("#headerS1"),headerS2:$("#headerS2"),Title:$("#Title"),QRTi:$("#Title2"),
	changePlayType:$("#changePlayType"),jcTo:$("#jcTo"),jcTime:$("#jcTime"),choose:$("#choose"),
	MainStep1:$("#MainStep1"),MainStep2:$("#MainStep2"),curBets:$("#curBets"),curMoney:$("#curMoney"),
	betList:$("#betList"),Edit:$("#EditBets"),money:$("#money"),bets:$("#bets"),mul:$("#mul"),
	More:$("#More"),MoreDetail:$("#MoreDetail"),MoreLocked:$("#MoreLocked")
};
cp2y.buy={
	init:function(play){
		if( play in _ ){
			$.extend(cp2y.buy,_[play]);
		}else{
			$.extend(cp2y.buy,_.a0);
		}
		this.step1();
		this.bet();
		jcDom.Title.html("<span>"+this.playName+"</span>-"+_[play].playType);
		jcDom.QRTi.html("<span>"+cp2y.buy.playName+"</span>-投注");
		jcDom.changePlayType.html(_.playTypes(play));
	},
	betType:0,
	iid:0,
	issue:0,
	step1:function(){
		if(jcDom.Edit.html()=="完成"){
			return this.editScheme();
		}
		jcDom.headerS1.show();
		jcDom.headerS2.hide();
		jcDom.MainStep1.show();
		jcDom.MainStep2.hide();
	},
	step2:function(){
		jcDom.headerS1.hide();
		jcDom.headerS2.show();
		jcDom.MainStep1.hide();
		jcDom.MainStep2.show();
	},
	getBall:function(){return jcDom.choose.children('li');},
	addRecord:function(o){
		jcDom.betList.html(o);
		this.showMoney();
	},
	editScheme:function(){
		if(jcDom.Edit.html()=="编辑"){
			jcDom.Edit.html('完成');
			$(".delI").show();
		}else if(jcDom.Edit.html()=="完成"){
			jcDom.Edit.html('编辑');
			$(".delI").hide();
		}
	},
	setMul:function(o){
		var v=$(o).val(),v1;
		if(!v.isInt()){
			v1=1;
		}else if(v>9999){
			v1=9999;
		}else{
			v1=v;
		}
		this.mul=v1;
		$(o).val(v1);
		this.showMoney();
	},
	mul:1,
	showMoney:function(){
		var m=jcDom.betList.children("li").length,b=jcDom.mul.val();
		jcDom.bets.html(m*b);
		jcDom.money.html(m*b*2);
		this.money=m*b*2;
	},
	money:0,
	del:function(o){
		jcDom.choose.children("li").eq($(o).parent().attr('data_id')).removeClass('sel');
		$(o).parent().remove();
		this.count();
		this.showMoney();
	},
	toggleMore:function(){
		if(jcDom.More.hasClass('on')){
			jcDom.More.removeClass('on');
			jcDom.MoreDetail.hide();
            jcDom.MoreLocked.hide();
		}else{
			jcDom.More.addClass('on');
			jcDom.MoreDetail.show();
            jcDom.MoreLocked.show();
		}
	},
	pay:function(){
		var p = ['submitAction=submitAction','lid=10059','ajax=true'],content=[],scheme=jcDom.betList.children("li"),i=0,len=scheme.length;
        for(i;i<len;i++){
        	content.push(scheme.eq(i).attr('data_id')+"`"+scheme.eq(i).attr('data_code')+"`"+scheme.eq(i).attr('data_sp'));
        }
        p={
        	lotteryId:_.bt,
        	issueId:cp2y.buy.iid,
        	issueIds:cp2y.buy.iid,
        	issueCount:1,
        	multiple:this.mul,
        	schemeNumber:"content="+content.join("$"),
        	schemeAmount:this.money,
        	buyAmount:this.money,
        	buyType:1,
        	betType:this.betType,
        	pass:cp2y.buy.pass,
        	sels:cp2y.buy.issue,
        	cutRepeat:false
        };
        $.ajax({
			url:WebAppUrl.HOME_APP_URL+"/core/lottery/buy_lottery",
			data:p,
			type:"post",
			dataType:"json",
			beforeSend:function(){cp2y.dialog.loading();},
			success:function(data){
				cp2y.dialog.clearLoading();
				if(data.flag==-1){
					cp2y.quick.user.signInBox();
				}else if(data.flag==2){
					return cp2y.dialog.confirm("余额不足，去充值？",function(){
						cp2y.dialog.closeConfirm();cp2y.quick.user.rechargeBox();
					});
				}else if(data.flag==1){
					location.href = WebAppUrl.HOME_APP_URL + '/lottery/detail#scheme=' + data.schemeId;
				}else{
					cp2y.dialog.alert(data.message);
				}
			}
		});
	}
};