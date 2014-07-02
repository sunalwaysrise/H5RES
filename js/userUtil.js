/**
 * 构造user模块的用户操作
 * @author luwenbin@live.com
 */
var qCountDown={
	t:60,
	init:function(){
		if(this.t>1){
			this.t--;
			$("#resendVeri span").html(this.t);
			setTimeout("qCountDown.init()",1000);
		}else{
			$("#resendVeri").html('没收到？<span onclick="qCountDown.restart();">重新发送</span>');
		}
	},
	restart:function(){
		this.t=60;
		var val=$("#mobile").html();
		cp2y.dialog.clearTip();
		$.ajax({
			url:WebAppUrl.HOME_APP_URL+"/user/sendmsg",
			data:{mobile:val},
			beforeSend:function(){cp2y.dialog.loading();},
			success:function(data){cp2y.dialog.clearLoading();},
			error:function(){cp2y.dialog.clearLoading();}
		});
		$("#resendVeri").html('<span>'+this.t+"</span> 秒后重新发送");
		this.init();
	}
},userUtil=$("#userUtil"),Warp=$("#Warp");
cp2y.quick={
	closeBox:function(){
		userUtil.html('').hide();
		Warp.show();
	},
	user:{
		signInBox:function(){
			var html=[];
			html.push('<header class="header"><a class="GoIndex" onclick="cp2y.quick.closeBox();">关闭</a><h2>账户登录</h2></header>');
			html.push('<div class="userPartBox1"><div id="userTip31" ></div>');
			html.push('<input type="text" id="username" placeholder="用户名/手机号" class="input4 mt40" />');
			html.push('<input type="password" id="password" placeholder="密码" class="input4 nobt" />');
			html.push('<a id="login" class="btn1 mt10" onclick="cp2y.quick.user.signIn()">登录</a>');
			html.push('<p class="userTip1">');
			html.push('<a class="fl isbtn" id="goSignUp" onclick="cp2y.quick.user.signUpBox()">免费注册</a>');
			html.push('<a class="fr isbtn" onclick="cp2y.quick.user.findPasswordBox()">找回密码</a>');
			html.push('</p></div>');
			userUtil.html(html.join('')).show();
			Warp.hide();
		},
		signInSuccess:false,
		signIn:function(){
			cp2y.dialog.clearTip();
			var data={
				username:$("#username").val().trim(),
				password:$("#password").val().trim()
			};
			if(!data.username || !data.password){
				cp2y.dialog.tip1('信息不能为空');
			}
			$.ajax({
				url:WebAppUrl.HOME_APP_URL+"/user/login",
				data:data,
				type:"post",
				dataType:"json",
				beforeSend:function(){
					cp2y.dialog.loading();
				},
				success:function(data){
					cp2y.dialog.clearLoading();
					if(data.flag==1){
						if(cp2y.quick.user.signInSuccess){
							cp2y.quick.user.signInSuccess();
						}
						cp2y.quick.closeBox();
					}else{
						cp2y.dialog.tip1(data.message);
					}
				},
				error:function(){
					cp2y.dialog.clearLoading();
				}
			});
		},
		signUpBox:function(){
			var html=[];
			html.push('<header class="header"><a class="GoIndex" onclick="cp2y.quick.closeBox();">关闭</a><h2>免费注册</h2></header>');
			html.push('<div class="userPartBox1"><div id="userTip31"></div>');
			html.push('<input type="tel" id="phone" placeholder="请输入手机号" class="input4 mt40" />');
			html.push('<a id="getVerify" onclick="cp2y.quick.user.getVeri()" class="btn1 mt10">获取验证码</a></div>');
			userUtil.html(html.join('')).show();
			Warp.hide();
		},
		getVeri:function(){
			var val=$("#phone").val().trim();
			cp2y.dialog.clearTip();
			if(val.isPhone()){
				$.ajax({
					url:WebAppUrl.HOME_APP_URL+"/user/sendmsg",
					data:{mobile:val},
					beforeSend:function(){
						cp2y.dialog.loading();
					},
					success:function(data){
						cp2y.dialog.clearLoading();
						if(data.flag==1){
			var html=[];
			html.push('<header class="header"><a class="GoIndex" onclick="cp2y.quick.closeBox();">关闭</a><h2>免费注册</h2></header>');
			html.push('<div class="userPartBox1">');
			html.push('<div id="userTip31"></div>');
			html.push('<input type="text" id="veri" placeholder="请输入手机验证码" class="input4 mt40" />');
			html.push('<a onclick="cp2y.quick.user.setPassword('+val+')" class="btn1 mt10">提交验证码</a>');
			html.push('<p id="resendVeri"><span>60</span> 秒后重新发送</p></div>');
			userUtil.html(html.join('')).show();
			Warp.hide();
			qCountDown.t=60;
			setTimeout('qCountDown.init()',1000);
						}else{
			cp2y.dialog.tip1(data.message);
						}
					},
					error:function(){
						cp2y.dialog.clearLoading();
					}
				});
			}else{
				return cp2y.dialog.tip1('手机号码不正确');
			}
		},
		setPassword:function(phone){
			var data={mobile:phone,validateCode:$("#veri").val()};
			if(!data.mobile || !data.validateCode){
				return cp2y.dialog.tip1('不能为空');
			}else{
				$.ajax({
					url:WebAppUrl.HOME_APP_URL+"/user/checkCode",
					data:data,
					type:"post",
					beforeSend:function(){
						cp2y.dialog.loading();
					},
					success:function(data2){
						cp2y.dialog.clearLoading();
						if(data2.flag==1){
			var html=[];
			html.push('<header class="header"><a class="GoIndex" onclick="cp2y.quick.closeBox();">关闭</a><h2>免费注册</h2></header>');
			html.push('<div class="userPartBox1">');
			html.push('<div id="userTip31"></div>');
			html.push('<input type="password" id="password" placeholder="设置密码" class="input4 mt40" />');
			html.push('<a onclick="cp2y.quick.user.signUp(\''+data.mobile+'\',\''+data.validateCode+'\')" class="btn1 mt10">完成注册</a></div>');
			userUtil.html(html.join('')).show();
			Warp.hide();
			cp2y.dialog.tip1('6-20个字符，区分大小写');
						}else{
			cp2y.dialog.tip1(data2.message);
						}
					},
					error:function(){
						cp2y.dialog.clearLoading();
					}
				});
			}
		},
		signUpSuccess:false,
		signUp:function(phone,veri){
			var data={mobile:phone,msgCode:veri,password:$("#password").val()};
			if(!data.mobile || !data.msgCode || !data.password){
				return cp2y.dialog.tip1('不能为空');
			}else{
				if(data.password.length <6 || data.password.length>20){
					return cp2y.dialog.tip1('6-20个字符，区分大小写');
				}else{
					$.ajax({
						url:WebAppUrl.HOME_APP_URL+"/user/register",
						data:data,
						beforeSend:function(){
							cp2y.dialog.loading();
						},
						success:function(data){
							cp2y.dialog.clearLoading();
							if(data.flag==1){
								if(cp2y.quick.user.signUpSuccess){
									cp2y.quick.user.signUpSuccess();
								}
								cp2y.quick.closeBox();
							}else{
								cp2y.dialog.tip1(data.message);
							}
						},
						error:function(){
							cp2y.dialog.clearLoading();
						}
					});
				}
			}
		},
		findPasswordBox:function(){
			var html=[];
			html.push('<header class="header"><a class="GoIndex" onclick="cp2y.quick.closeBox();">关闭</a><h2>找回密码</h2></header>');
			html.push('<div class="userPartBox1">');
			html.push('<div id="userTip31"></div>');
			html.push('<input type="text" id="username" placeholder="用户名" class="input4 mt40" />');
			html.push('<input type="text" id="phone" placeholder="手机号码" class="input4 nobt" />');
			html.push('<a id="getVerify" onclick="cp2y.quick.user.findPassword()" class="btn1 mt10">确认</a>');
			html.push('</div>');
			userUtil.html(html.join('')).show();
			Warp.hide();
		},
		findPassword:function(){
			cp2y.dialog.clearTip();
			var data={
				username:$("#username").val().trim(),
				mobile:$("#phone").val().trim()
			};
			if(!data.username || !data.mobile){
				return cp2y.dialog.tip1("不能为空");
			}
			if(data.mobile.isPhone()){
				$.ajax({
					url:WebAppUrl.HOME_APP_URL+"/user/get_forget_password",
					data:data,
					beforeSend:function(){
						cp2y.dialog.loading();
					},
					success:function(data2){
						cp2y.dialog.clearLoading();
						if(data2.flag==1){
							cp2y.dialog.tip1("密码已发送至"+data.mobile+"，请注意查收");
						}else{
							cp2y.dialog.tip1(data2.message);
						}
					},
					error:function(){
						cp2y.dialog.clearLoading();
					}
				});
			}else{
				return cp2y.dialog.tip1("手机号不合法");
			}
		},
		rechargeBox:function(){
			var html=[];
			html.push('<header class="header"><a class="GoIndex" onclick="cp2y.quick.closeBox();">关闭</a><h2>充值</h2></header>');
			html.push('<div class="userPartBox3">');
			html.push('<div class="recharge userPartBox3C" onclick="cp2y.quick.user._rechargeBox(this)" data_title="储蓄卡" data_id="2"><img src="'+WebAppUrl.RESOURCE_URL+'recharge2.png"/><p>储蓄卡</p></div>');
			html.push('<div class="recharge userPartBox3C" onclick="cp2y.quick.user._rechargeBox(this)" data_title="信用卡" data_id="3"><img src="'+WebAppUrl.RESOURCE_URL+'recharge3.png"/><p>信用卡</p></div>');
			html.push('<div class="recharge userPartBox3C" onclick="cp2y.quick.user._rechargeBox(this)" data_title="支付宝" data_id="1"><img src="'+WebAppUrl.RESOURCE_URL+'recharge1.png"/><p>支付宝</p></div>');
			html.push('</div>');
			userUtil.html(html.join('')).show();
			Warp.hide();
		},
		_rechargeBox:function(o){
			var html=[],o=$(o),k=['','每日支付金额最高2000元','单卡单笔限额10000元，单卡单日限额10000元','单卡单笔限额10000元，单卡单日限额10000元'],type=o.attr('data_id');
			html.push('<header class="header"><a class="GoIndex" onclick="cp2y.quick.closeBox();">关闭</a><h2>'+o.attr('data_title')+'充值</h2></header>');
			html.push('<div class="userPartBox1"><div id="userTip31"></div>');
			html.push('<input type="tel" id="rechargeMoney" placeholder="至少1元" class="input4 mt40" />');
			html.push('<input type="hidden" id="payType" value="'+type+'" />');
			html.push('<a id="recharge" onclick="cp2y.quick.user.recharge()" class="btn1 mt10">确认</a>');
			html.push('<p>'+k[type]+'</p>');
			html.push('</div>');
			userUtil.html(html.join('')).show();
			Warp.hide();
		},
		recharge:function(){
			var Money=$("#rechargeMoney"),money=Money.val(),payType=$("#payType").val();
			if(!money.isInt()){
				//Money.val(10);money=10;
				return cp2y.dialog.tip1("必须为整数");
			}else if(Money.val()>10000){
				Money.val(10000);money=10000;
			}
			if(payType==1){
				url="/core/user/aliPay?money="+money;
			}else{
				url="/core/user/lianlianPay?money="+money+"&payType="+payType;
			}
			$.ajax({
				url:WebAppUrl.HOME_APP_URL+url,
				beforeSend:function(){
					cp2y.dialog.clearTip();
					cp2y.dialog.loading();
				},
				success:function(data){
					cp2y.dialog.clearLoading();
					if(data.flag==1){
						cp2y.quick.closeBox();
						var html=[];
			html.push('<header class="header"><a class="GoIndex" onclick="cp2y.quick.closeBox();">关闭</a><h2>充值</h2></header>');
			html.push('<div class="userPartBox3 hasiframe">');
			html.push('<iframe src='+data.payUrl+' class="iframe"></iframe>');
			html.push('</div>');
						userUtil.html(html.join('')).show();
						Warp.hide();
					}else{
						cp2y.dialog.tip1(data.message);
					}
				}
			});
		}
	}
};
