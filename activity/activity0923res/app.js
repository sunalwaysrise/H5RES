var cp2y=angular.module('cp2y',['ngRoute']);
cp2y.config(function($routeProvider,$httpProvider) {
  $routeProvider.when('/index',{
    templateUrl: '/activitytpl/activity0923tpl/index.jsp',
    controller: 'index'
  })
  .when('/get',{
    templateUrl: '/activitytpl/activity0923tpl/get.jsp',
    controller: 'get'
  })
  .when('/complete',{
    templateUrl: '/activitytpl/activity0923tpl/complete.jsp',
    controller: 'complete'
  })
  .when('/myfriend',{
    templateUrl: '/activitytpl/activity0923tpl/myfriend.jsp',
    controller: 'myfriend'
  })
  .otherwise({
    redirectTo: '/index'
  });
  // Use x-www-form-urlencoded Content-Type
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
  var param = function(obj) {
    var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
    for(name in obj) {
      value = obj[name];
      if(value instanceof Array) {
        for(i=0; i<value.length; ++i) {
          subValue = value[i];
          fullSubName = name + '[' + i + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if(value instanceof Object) {
        for(subName in value) {
          subValue = value[subName];
          fullSubName = name + '[' + subName + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if(value !== undefined && value !== null){
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
      }
    }
    return query.length ? query.substr(0, query.length - 1) : query;
  };
  $httpProvider.defaults.transformRequest = [function(data) {
    return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
  }];
}).controller('index',['$scope','$interval','$http',function($scope,$interval,$http){
  $scope.data={mobile:'',sending:false,djs:60,lock:false,lock2:false};
  $scope.getCode=function(){
    if(!isPhone($scope.data.mobile)){alert('请输入正确的手机号');return false;}
    if($scope.data.lock){return false;}
    $scope.data.lock=true;
    $http.get('/user/sendmsg',{params:{"mobile":$scope.data.mobile}}).success(function(data){
      alert(data.message);
      $scope.data.lock=false;
      if(data.flag==1){
        $scope.data.sending=true;
        var timer=$interval(function(){
          if($scope.data.djs == 0){
            $interval.cancel(timer);
            $scope.data.sending=false;
            $scope.data.djs=60;
          }else{
            updateTime();
          }
        },1000);
      }
    });
  };
  $scope.signUp=function(){
    if($scope.data.lock2){return false;}
    $scope.data.lock2=true;
    if(!isPhone($scope.data.mobile)){alert('请输入正确的手机号');return false;}
    if(!$scope.data.msgCode){alert('请输入验证码');return false;}
    if(!$scope.data.password){alert('请输入密码');return false;}
    $scope.data.superUser=getArgs("superUser");/*推广人ID*/
    $http.get('/weixin/tuiguangregister',{params:$scope.data}).success(function(data){
      $scope.data.lock2=false;
      if(data.flag==1){
        location.href="/activity/0923?superUser="+data.userId+"#/get";
      }else{
        alert(data.message);
      }
    });
  };
  function updateTime(){$scope.data.djs--;};
  function isPhone(i){
    var r = /^\+?[1-9][0-9]*$/;
    return (!r.test(i) || i.length!=11)?false:true;
  };
  function getArgs(argName){
    if(!argName){return false;}
    var args = {},query = location.search.substring(1),pairs = query.split("&");
    for(var i = 0; i < pairs.length; i++) {
      var pos = pairs[i].indexOf('=');
      if (pos == -1) continue;
      var argname = pairs[i].substring(0,pos),value = pairs[i].substring(pos+1);
      value = decodeURIComponent(value);
      if(argName==argname){
        return value;
      }
    }
  };
}])
.controller('get',['$scope','$http',function($scope,$http){
  //判断该用户领取的彩金
  $scope.data={
    completed:false,
    money:''
  };
  $http.get('/weixin/tuiguangcaijing',{params:{"_":new Date().getTime()}}).success(function(data){
    if(data.flag==1){
      $scope.data.completed=data.isling;
      $scope.data.money=data.isling?data.money:'';
    }else{
      $scope.data={
        completed:false,
        money:data.message
      };
    }
  });
  $scope.complete=function(){
    location.href="#/complete";
  }
  $scope.myfriend=function(){
    location.href="#/myfriend";
  }
}])
.controller('complete',['$scope','$http','$location',function($scope,$http,$location){
  //判断登录
  $http.get('/user/checkLogin',{params:{"_":new Date().getTime()}}).success(function(data){
    if(data.flag==0){
      location.href="#/index";
    }
  });
  $scope.data={name:'',identityNumber:'',identityNumber:''};
  $scope.complete=function(){//完善资料
    if(!$scope.data.name){alert('用户名不能为空');return false;}
    if(!$scope.data.username){alert('姓名不能为空');return false;}
    if(!$scope.data.identityNumber){alert('身份证不能为空');return false;}
    if(isID($scope.data.identityNumber)!=0){alert('身份证号码非法');return false;}
    $http.post('/weixin/detailUserInfo',$scope.data).success(function(data){
      if(data.flag==1){
        location.href="#/myfriend";
      }else{
        alert(data.message);
      }
    });
  }
  function isID(idcard){
    var errors = [0, '身份证号码位数不对!', '身份证号码出生日期超出范围或含有非法字符!', '身份证号码校验错误!', '身份证地区非法!'],
        area={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"},
        Y,
        JYM,
        S,
        M,
        idcard_array = idcard.split('');
		//地区检验
    if (!area[parseInt(idcard.substr(0, 2))]){
      return errors[4];
    }
    //身份号码位数及格式检验
    switch(idcard.length) {
      case 15:
        var ereg;
        if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 )){
          ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;
        }else{
          ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;
        }
        if (ereg.test(idcard)){
          return errors[0];
        }else{
          return errors[2];
        }
        break;
      case 18:
        if (parseInt(idcard.substr(6, 4)) % 4 == 0 || (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard.substr(6, 4)) % 4 == 0)){
          ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;
              //闰年出生日期的合
        }else{
          ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;
        }
              //平年出生日期的合法性正则表达式
        if (ereg.test(idcard)) {
          S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7 + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9 + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10 + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5 + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8 + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4 + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2 + parseInt(idcard_array[7]) * 1 + parseInt(idcard_array[8]) * 6 + parseInt(idcard_array[9]) * 3;
          Y = S % 11;
          M = "F";
          JYM = "10X98765432";
          M = JYM.substr(Y, 1);
                  //判断校验位
          if (M == idcard_array[17]){
              return errors[0];
              //检测ID的校验位
          }else{
              return errors[3];
          }
        } else{
            return errors[2];
        }
        break;
      default:
        return errors[1];
	  }
  }
}])
.controller('myfriend',['$scope','$http',function($scope,$http){
  $scope.data={on:true,items:[],n:0,m1:0,m2:0,m3:0,cur:1,total:1};
  $scope.wxshare=function(){
    if($scope.config){return false;}
    $scope.config=true;
    $http.get('/core/user/wxsharedmoney',{params:{"_":new Date().getTime()}}).success(function(data){
      $scope.config=false;
      if(data.flag==1){
        alert('领取成功');
        location.href="#/myfriend";
      }else{
        alert('领取失败');
      }
    });
  }
  $http.get('/user/sharedfriends',{params:{"_":new Date().getTime()}}).success(function(data){
    if(data.flag==1){
      var D=data.friends,i=($scope.data.cur-1)*10,len=10;
      $scope.data.n=data.self.friendsCount;/*好友数*/
      $scope.data.m1=data.self.earnMoney;/*共赚的钱*/
      $scope.data.m2=data.self.yilingMoney;/*已领的钱*/
      $scope.data.m3=data.self.leftMoney;/*未领取的钱*/
      $scope.data.total=Math.ceil(D.length/10);
      $scope.data.items=[];
      if(len>D.length-(i*10)){
        len=D.length-(i*10);
      }
      for(i;i<len;i++){
        $scope.data.items.push(D[i]);  
      }
    }else{
      location.href="#/index";//未登录
    }
  });
  $scope.change=function(i){$scope.data.on=i;}
  $scope.prev=function(){
    if($scope.data.cur>1){
      $scope.data.cur--;
    }else{
      $scope.data.cur=1;
    }
  }
  $scope.next=function(){
    if($scope.data.cur<$scope.data.total){
      $scope.data.cur++;
    }else{
      $scope.data.cur=$scope.data.total;
    }
  }
}]);