/**
 * @author luwenbin@live.com
 */
var countDown={
	t:60,
	init:function(){
		if(this.t>1){
			this.t--;
			$("#resendVeri span").html(this.t);
			setTimeout("countDown.init()",1000);
		}else{
			$("#resendVeri").html('没收到？<span onclick="countDown.restart();">重新发送</span>');
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
};
cp2y.user={
	signIn:function(){
		cp2y.dialog.clearTip();
		var data={
			username:$("#username").val().trim(),
			password:$("#password").val().trim()
		};
		if(!data.username || !data.password){
			cp2y.dialog.tip('信息不能为空');
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
					location.href=WebAppUrl.HOME_APP_URL+"/limit/user/index";
				}else{
					cp2y.dialog.tip(data.message);
				}
			},
			error:function(){
				cp2y.dialog.tip("login error");
				cp2y.dialog.clearLoading();
			}
		});
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
						step.s2();
						$("#mobile").html(val);
						countDown.t=60;
						setTimeout('countDown.init()',1000);
					}else{
						cp2y.dialog.tip(data.message);
					}
				},
				error:function(){
					cp2y.dialog.clearLoading();
				}
			});
		}else{
			return cp2y.dialog.tip('手机号码不正确');
		}
	},
	setPassword:function(){
		var data={mobile:$("#phone").val().trim(),validateCode:$("#veri").val()};
		if(!data.mobile || !data.validateCode){
			return cp2y.dialog.tip('不能为空');
		}else{
			$.ajax({
				url:WebAppUrl.HOME_APP_URL+"/user/checkCode",
				data:data,
				type:"post",
				beforeSend:function(){cp2y.dialog.loading();},
				success:function(data2){
					cp2y.dialog.clearLoading();
					if(data2.flag==1){
						step.s3();
						$("#signUpBtn").attr({"data_phone":data.mobile,"data_msgCode":data.validateCode});
						cp2y.dialog.tip('6-20个字符，区分大小写');
					}else{
						cp2y.dialog.tip(data2.message);
					}
				},
				error:function(){cp2y.dialog.clearLoading();}
			});
		}
	},
	signUp:function(){
		var _this=$("#signUpBtn"),data={mobile:_this.attr("data_phone"),msgCode:_this.attr("data_msgCode"),password:$("#password").val()};
		if(!data.mobile || !data.msgCode || !data.password){
			return cp2y.dialog.tip('不能为空');
		}else{
			if(data.password.length <6 || data.password.length>20){
				return cp2y.dialog.tip('6-20个字符，区分大小写');
			}else{
				$.ajax({
					url:WebAppUrl.HOME_APP_URL+"/user/register",
					data:data,
					beforeSend:function(){cp2y.dialog.loading();},
					success:function(data){
						cp2y.dialog.clearLoading();
						if(data.flag==1){
							location.href=WebAppUrl.HOME_APP_URL+"/limit/user/owninfo";
						}else{
							cp2y.dialog.tip(data.message);
						}
					},
					error:function(){cp2y.dialog.clearLoading();}
				});
			}
		}
	},
	findPassword:function(){
		cp2y.dialog.clearTip();
		var data={
			username:$("#username").val().trim(),
			mobile:$("#phone").val().trim()
		};
		if(!data.username || !data.mobile){
			return cp2y.dialog.tip("不能为空");
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
						cp2y.dialog.tip("密码已发送至"+data.mobile+"，请注意查收");
					}else{
						cp2y.dialog.tip(data2.message);
					}
				},
				error:function(){
					cp2y.dialog.clearLoading();
				}
			});
		}else{
			return cp2y.dialog.tip("手机号不合法");
		}
	}
};