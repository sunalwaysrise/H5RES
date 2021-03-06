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
	setbalance:function(){
		$.ajax({
			url:WebAppUrl.HOME_APP_URL+"/core/user/query_balance",
			beforeSend:function(){$("#myScoreLoading").show();},
			success:function(data){$("#myScoreLoading").hide();
				if(data.flag==1){
					$("#balance").html("<p>余额:<span>"+data.balance+"元</span></p><p>彩金:<span>"+data.hongbao+"元</span></p>");
				}
			},error:function(){$("#myScoreLoading").hide();}
		});
	},
	getScore:function(){
		$.ajax({
			url:WebAppUrl.HOME_APP_URL+"/core/user/score",
			success:function(data){
				if(data.flag==1){
					$("#myScore").html("积分:"+data.score);
				}
			}
		});
	},
	status:function(){
      $.ajax({
        url:WebAppUrl.HOME_APP_URL+"/user/checkLogin",
        anysc:false,
        type:"post",
        success:function(data){
          $("#userHeader").html(data.username);
        }
      });
	},
	home:function(){
      this.status();
      this.setbalance();
      this.getScore();
      $.ajax({
        url:WebAppUrl.HOME_APP_URL+'/activity/isshowact',
        success:function(data){
          if(data.isShow){
            $("#balance").append('<a href="/activity/songcaijin">送彩金</a>');
          }else{
            $.ajax({
              url:WebAppUrl.HOME_APP_URL+'/activity/isshowchong50song50',
              success:function(data){
                if(data.isShow){
                  $("#balance").append('<a href="/activity/songcaijin">送彩金</a>');
                }
              }
            });
          }
        }
      });
      $("#Nmore").click(function(){
        $(this).next().toggle();
      });
      $("#Nmore2").click(function(){
        $(this).parent().hide();
      });
	},
	signOut:function(){
		$.ajax({
			url:WebAppUrl.HOME_APP_URL+"/user/exit",
			beforeSend:function(){cp2y.dialog.loading();},
			success:function(data){
				cp2y.dialog.clearLoading();
				location.href=WebAppUrl.HOME_APP_URL;
			},
			error:function(){cp2y.dialog.clearLoading();}
		});
	},
	isupdateuname:0,
	bindingIdentify:0,
	detail:function(_this){
      $.ajax({
        url:WebAppUrl.HOME_APP_URL+"/core/user/my_info",
        beforeSend:function(){cp2y.dialog.loading();},
        success:function(data){
          cp2y.dialog.clearLoading();
          var html=[];
          $("#uname").html(localStorage.getItem('username'));
          $("#mobile").html(data.mobile+" <em>(重新绑定)</em>");
          if(data.isupdateuname==1){
            html.push('<div id="changeUsername" class="userLin mt40"><a class="icons2"><span id="changeUsernames0">设置账户</span><p id="changeUsernames"><input type="text" id="updataUsername" placeholder="'+data.username+'" class="input13" /></p></a></div>');
          }else{
            cp2y.user.isupdateuname=1;
            html.push('<div onclick="cp2y.dialog.alert(\'请联系客服\')" class="userLin mt40"><a class="icons2"><span>登录账户</span><p>'+data.username+'</p></a></div>');
          }
          if(data.bindingIdentify==1){
            cp2y.user.bindingIdentify=1;
            html.push('<div onclick="cp2y.dialog.alert(\'请联系客服\')" class="userLin"><a class="icons2"><span>真实姓名</span><p>'+data.name+'</p></a></div>');
            html.push('<div onclick="cp2y.dialog.alert(\'请联系客服\')" class="userLin"><a class="icons2"><span>身份证号</span><p>'+data.identify+'</p></a></div>');
          }else{
            html.push('<div class="userLin"><a class="icons2"><span>真实姓名</span><p id="nameSaved"><input type="text" id="updataNick" placeholder="填写后不可更改" class="input13" /></p></a></div>');
            html.push('<div class="userLin"><a class="icons2"><span>身份证号</span><p id="idSaved"><input type="text" id="updataId" placeholder="填写后不可更改" class="input13" /></p></a></div>');
          }
          $("#hasBinds").html(html.join(''));
          if(cp2y.util.getArgs('recharge')==1){
            var tip;
            if(cp2y.user.bindingIdentify==1 && cp2y.user.isupdateuname==1){
              tip='充50送50';
            }else{
              tip='完善资料，充50送50';
            }
            $('.userPartBox61').prepend('<span class="red">剩余彩金请到首页-活动中心领取</span><br/>');
            $('#saveOwn').html(tip).attr({'data':'2'});
          }else{
              $.ajax({
                  url:WebAppUrl.HOME_APP_URL+'/activity/isshowact',
                  success:function(data){
                      if(data.isShow){
                          $('#saveOwn').html('完善资料，领取3元彩金').attr({'data':'1'});
                      }else{
                          $.ajax({
                              url:WebAppUrl.HOME_APP_URL+'/activity/isshowchong50song50',
                              success:function(data){
                                  if(data.isShow){
                                      $('#saveOwn').html('充50送50').attr({'href':'/recharge/index'});
                                  }else{
                                      $('#saveOwn').remove();
                                  }
                              }
                          });
                      }
                  }
              });
          }
        },
        error:function(){cp2y.dialog.clearLoading();}
      });
	},
	updataPhone:function(m){
		var validateCode=$("#veri").val().trim();
		cp2y.dialog.clearTip();
		if(!validateCode){
			return cp2y.dialog.tip('验证码不能为空');
		}else{
			$.ajax({
				url:WebAppUrl.HOME_APP_URL+"/core/user/bind_mobile_validate",
				data:{validateCode:validateCode},
				beforeSend:function(){
					cp2y.dialog.loading();
				},
				success:function(data){
                  cp2y.dialog.clearLoading();
                  if(data.flag==1){
                    var l=sessionStorage.getItem('is11');
                    if(l!=null){
                      sessionStorage.removeItem('is11');
                      location.href=WebAppUrl.HOME_APP_URL+l;
                    }else{
                      location.href.reload();
                    }
                  }else{
                      cp2y.dialog.alert(data.message);
                  }
				}
			});
		}
	},
	getVeri:function(){
		var val=$("#phone").val().trim();
		cp2y.dialog.clearTip();
		if(val.isPhone()){
			$.ajax({
				url:WebAppUrl.HOME_APP_URL+"/core/user/sendMobile",
				data:{mobile:val},
				beforeSend:function(){cp2y.dialog.loading();},
				success:function(data){
					cp2y.dialog.clearLoading();
					if(data.flag==1){
						step.s31();
						$("#yourMobile").html(val);
						countDown.t=60;
						setTimeout('countDown.init()',1000);						
					}else{
						cp2y.dialog.tip(data.message);
					}
				},
				error:function(){cp2y.dialog.clearLoading();}
			});
		}else{
			return cp2y.dialog.tip('手机号码不正确');
		}
	},
	updataPassword:function(){
		var data={
			password:$("#updataPassword1").val(),
			newPassword:$("#updataPassword2").val(),
			newPassword2:$("#updataPassword3").val()
		};
		cp2y.dialog.clearTip();
		if(!data.password||!data.newPassword||!data.newPassword2){
			return cp2y.dialog.tip('以下信息均必填');
		}
		if(data.newPassword!=data.newPassword2){
			return cp2y.dialog.tip('两次输入密码不一致');
		}
		$.ajax({
			url:WebAppUrl.HOME_APP_URL+'/core/user/update_password',
			data:data,
			beforeSend:function(){cp2y.dialog.loading();},
			success:function(data){
				cp2y.dialog.clearLoading();
				if(data.flag==1){
					cp2y.dialog.tip(data.message);
					setTimeout('userDom.GoIndex3.click()',1000);
				}else{
					cp2y.dialog.tip(data.message);
				}
			},
			error:function(){cp2y.dialog.clearLoading();}
		});
	},
	saveOwn:function(e){
		var cb=$(e).attr('data'),d1={name:$("#updataNick").val(),identityNumber:$("#updataId").val()},d2={username:$("#updataUsername").val()};
		if(d2.username){d2.username=d2.username.trim();}
		if(d1.name){d1.name=d1.name.trim();}
		if(d1.identityNumber){d1.identityNumber=String(d1.identityNumber).trim();}
		if(cb==2){
			this.getS50Tip=true;
			if( !d1.name && !d2.username ){
				this.saveCallBack();
			}		 
		}
		if(d1.identityNumber && d1.identityNumber.isID()){
			cp2y.dialog.alert('身份信息填写错误');
		}else if(d1.name && !d1.identityNumber.isID()){
			this.updataId(d1);
		}
		if(d2.username){
			this.updataUsername(d2);
		}
		if(cb==1){
			this.getCjTip=true;
			if( !d1.name && !d2.username ){
				this.saveCallBack();
			}
		}
	},
	getCjTip:false,
	getS50Tip:false,
	saveCallBack:function(){
		if(this.getCjTip){
			this.getCj();
		}
		else if(this.getS50Tip){
			if(cp2y.user.bindingIdentify==1 && cp2y.user.isupdateuname==1){
				location.href='/recharge/index';
			}else{
				cp2y.dialog.alert('请先绑定信息');
			}
		}
	},
	updataId:function(data){
		$.ajax({
			url:WebAppUrl.HOME_APP_URL+"/core/user/bind_identify_name",
			data:data,
			beforeSend:function(){cp2y.dialog.loading();},
			success:function(data2){
				cp2y.dialog.clearLoading();
				if(data2.flag==1){
					cp2y.user.bindingIdentify=1;
					$('#nameSaved').html(data.name.substr(0,1)+'**');
					$('#idSaved').html(data.identityNumber.substr(0,12)+'****');
				}else{
					cp2y.dialog.alert(data2.message);
				}
				cp2y.user.saveCallBack();
			},
			error:function(){cp2y.dialog.clearLoading();}
		});
	},
	updataUsername:function(data){
      $.ajax({
          url:WebAppUrl.HOME_APP_URL+'/core/user/updateusername',
          data:data,
          beforeSend:function(){cp2y.dialog.loading();},
          success:function(data2){
              cp2y.dialog.clearLoading();
              if(data2.flag==1){
                  $('#changeUsernames').html(data.username);
                  cp2y.user.isupdateuname=1;
              }else{
                  cp2y.dialog.alert(data2.message);
              }
              cp2y.user.saveCallBack();
          },
          error:function(){cp2y.dialog.clearLoading();}
      });
	},
	_balance:function(){
		var balance=[];
		$.ajax({
			url:WebAppUrl.HOME_APP_URL+"/balance.html",
			async:false,
			success:function(data){
				balance=[1,data];
			},
			error:function(){
				balance=[0,"查询错误"];
			}
		});
		return balance;
	},
	_schemeHistory:function(firstRow,fetchSize,fn){
		$.ajax({
			url:WebAppUrl.HOME_APP_URL+"/core/lottery/mySchemeHistory",
			data:{firstRow:firstRow,fetchSize:fetchSize},
			beforeSend:function(){cp2y.dialog.loading();},
			success:function(data){
				cp2y.dialog.clearLoading();
				fn(data);
			},
			error:function(){cp2y.dialog.clearLoading();}
		});
	},
	getCj:function(){
      $.ajax({
        url:WebAppUrl.HOME_APP_URL+'/activity/zhucesongmoney',
        beforeSend:function(){cp2y.dialog.loading();},
        success:function(data){
          cp2y.dialog.clearLoading();
          if(data.flag==1){
            cp2y.dialog.alert(data.message,function(){
              location.reload();
            });
          }else{
            return cp2y.dialog.alert(data.message);
          }
        },
        error:function(){cp2y.dialog.clearLoading();}
      });
	}
};