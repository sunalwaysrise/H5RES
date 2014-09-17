/**
* @author 鲁文彬
*/
cp2y.events={
  loadEvent:function(){
    $.ajax({
      url:WebAppUrl.HOME_APP_URL+"/activity/getActivityList",
      beforeSend:function(){cp2y.dialog.loading();},
      success:function(data){
        cp2y.dialog.clearLoading();
        var data=data.list,i=0,len=data.length,html=[];
        for(i;i<len;i++){
          html.push('<div><a style="background-image:url('+data[i].pictureindexUrl+');background-color:'+data[i].color+'" class="a0 eventBanner'+i+'" href="'+data[i].link+'"></a></div>');
        }
        $("#eventList").html(html.join(''));
      },
      error:function(){cp2y.dialog.clearLoading();}
    });
  },
  hasMyEvent:function(){
    $.ajax({
      url:WebAppUrl.HOME_APP_URL+"/activity/userActivityCount",
      beforeSend:function(){cp2y.dialog.loading();},
      success:function(data){
        cp2y.dialog.clearLoading();
        if(data.myActivityCount>0){
            $("#hasMyEvent").show();
        }
      },
      error:function(){cp2y.dialog.clearLoading();}
    });
  },
  myEvent:function(){
    $.ajax({
      url:WebAppUrl.HOME_APP_URL+"/core/activity/showValidActList",
      beforeSend:function(){cp2y.dialog.loading();},
      success:function(data){
        cp2y.dialog.clearLoading();
        var data=data.activitylist,i=0,len=data.length,html=[];
        for(i;i<len;i++){
          html.push('<div><a class="eventBanner'+i+'" href="/activity/actdetail?id='+data[i].id+'">'+data[i].activityName +'</a></div>');
        }
        if(len==0){
          html.push('<p class="Etip">您尚未参与活动，去<a href="/activity/list">活动页面</a>看看</p>');
        }
        $("#eventList").html(html.join(''));
      },
      error:function(){cp2y.dialog.clearLoading();}
    });
  },
  event1:function(id){
    $.ajax({
      url:WebAppUrl.HOME_APP_URL+"/core/activity/showlingmoney?activityId="+id,
      beforeSend:function(){cp2y.dialog.clearLoading();},
      success:function(data2){
        var data=data2.currentActivity,i=0,len=data.infos.length,html=[],status=0,on='';
        html.push('<dt><p>返还总金额:<span>'+data.money+'元</span></p><p>剩余金额:<span>'+data2.remainMoney+'元</span></p></dt>');
        for(i;i<len;i++){
          switch(data.infos[i].status){
            case "0":
            status="领取";
            on='class="a0" onclick="cp2y.events.draw(this)"';
            break;
            case "1":
            status="已领";
            on='class="a1"';
            break;
            case "2":
            status="待领";
            on='class="a2"';
            break;
            case "3":
            status="弃领";
            on='class="a3"';
            break;
          }
          html.push('<dd><div><p>'+data.infos[i].money+'</p><p>领取时间:'+data.infos[i].dateDesc+'</p></div><a data="'+id+'" '+on+'>'+status+'</a></dd>');
        }
        $("#event1").html(html.join(''));
      },
      error:function(){cp2y.dialog.clearLoading();}
    });
  },
  draw:function(o){
      var o=$(o),id=o.attr("data");
      $.ajax({
          url:WebAppUrl.HOME_APP_URL+"/core/user/activityDraw?activityId="+id,
          beforeSend:function(){cp2y.dialog.clearLoading();},
          success:function(data){
              if(data.flag==1){
                  cp2y.dialog.alert(data.message);
                  cp2y.events.event1(id);
              }else{
                  cp2y.dialog.alert(data.message);
              }
          },
          error:function(){cp2y.dialog.clearLoading();}
      });
  },
  songcaijin:function(){
      $.ajax({
          url:WebAppUrl.HOME_APP_URL+'/activity/isshowact',
          success:function(data){
              if(data.isShow){
                  $("#SCJ").append('<li><div><img src="'+WebAppUrl.RESOURCE_URL+'s3y.jpg" alt=""/><a onclick="cp2y.events.getCj();">去领彩金</a></div><p><a href="/activity/zhucesong"><b>完善资料领彩金</b><span>新注册用户，完善个人资料，即可获赠3元彩金</span><em>详情》</em></a></p></li>');
              }
          }
      });
      $.ajax({
          url:WebAppUrl.HOME_APP_URL+'/activity/isshowchong50song50',
          success:function(data){
              if(data.isShow){
                  $("#SCJ").append('<li><div><img src="'+WebAppUrl.RESOURCE_URL+'s50y.jpg" alt=""/><a href="/limit/user/owninfo#recharge=1">去领彩金</a></div><p><a href="/activity/chong50song50"><b>首次充值满50送50</b><span>完善个人资料，首充50元当月领取10元，剩余分4个月领取。</span><em>详情》</em></a></p></li>');
              }
          }
      });
  },
  getCj:function(){
    $.ajax({
      url:WebAppUrl.HOME_APP_URL+'/activity/zhucesongmoney',
      beforeSend:function(){cp2y.dialog.loading();},
      success:function(data){
        cp2y.dialog.clearLoading();
        if(data.flag==1){
          $("#SCJW").hide();
          $("#cjSucc").show();
        }else{
          return cp2y.dialog.alert(data.message,function(){
            location.href='/limit/user/owninfo';
          });
        }
      },
      error:function(){cp2y.dialog.clearLoading();}
    });
  }
};
