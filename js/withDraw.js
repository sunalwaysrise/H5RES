/**
 * @author luwenbin@live.com
 */
var selectCitys=[
  { name: "北京", cities: ["西城", "东城", "崇文", "宣武", "朝阳", "海淀", "丰台", "石景山", "门头沟", "房山", "通州", "顺义", "大兴", "昌平", "平谷", "怀柔", "密云", "延庆"] },
  { name: "天津", cities: ["青羊", "河东", "河西", "南开", "河北", "红桥", "塘沽", "汉沽", "大港", "东丽", "西青", "北辰", "津南", "武清", "宝坻", "静海", "宁河", "蓟县", "开发区"] },
  { name: "河北", cities: ["石家庄", "秦皇岛", "廊坊", "保定", "邯郸", "唐山", "邢台", "衡水", "张家口", "承德", "沧州", "衡水"] },
  { name: "山西", cities: ["太原", "大同", "长治", "晋中", "阳泉", "朔州", "运城", "临汾"] },
  { name: "内蒙古", cities: ["呼和浩特", "赤峰", "通辽", "锡林郭勒", "兴安"] },
  { name: "辽宁", cities: ["大连", "沈阳", "鞍山", "抚顺", "营口", "锦州", "丹东", "朝阳", "辽阳", "阜新", "铁岭", "盘锦", "本溪", "葫芦岛"] },
  { name: "吉林", cities: ["长春", "吉林", "四平", "辽源", "通化", "延吉", "白城", "辽源", "松原", "临江", "珲春"] },
  { name: "黑龙江", cities: ["哈尔滨", "齐齐哈尔", "大庆", "牡丹江", "鹤岗", "佳木斯", "绥化"] },
  { name: "上海", cities: ["浦东", "杨浦", "徐汇", "静安", "卢湾", "黄浦", "普陀", "闸北", "虹口", "长宁", "宝山", "闵行", "嘉定", "金山", "松江", "青浦", "崇明", "奉贤", "南汇"] },
  { name: "江苏", cities: ["南京", "苏州", "无锡", "常州", "扬州", "徐州", "南通", "镇江", "泰州", "淮安", "连云港", "宿迁", "盐城", "淮阴", "沐阳", "张家港"] },
  { name: "浙江", cities: ["杭州", "金华", "宁波", "温州", "嘉兴", "绍兴", "丽水", "湖州", "台州", "舟山", "衢州"] },
  { name: "安徽", cities: ["合肥", "马鞍山", "蚌埠", "黄山", "芜湖", "淮南", "铜陵", "阜阳", "宣城", "安庆"] },
  { name: "福建", cities: ["福州", "厦门", "泉州", "漳州", "南平", "龙岩", "莆田", "三明", "宁德"] },
  { name: "江西", cities: ["南昌", "景德镇", "上饶", "萍乡", "九江", "吉安", "宜春", "鹰潭", "新余", "赣州"] },
  { name: "山东", cities: ["青岛", "济南", "淄博", "烟台", "泰安", "临沂", "日照", "德州", "威海", "东营", "荷泽", "济宁", "潍坊", "枣庄", "聊城"] },
  { name: "河南", cities: ["郑州", "洛阳", "开封", "平顶山", "濮阳", "安阳", "许昌", "南阳", "信阳", "周口", "新乡", "焦作", "三门峡", "商丘"] },
  { name: "湖北", cities: ["武汉", "襄樊", "孝感", "十堰", "荆州", "黄石", "宜昌", "黄冈", "恩施", "鄂州", "江汉", "随枣", "荆沙", "咸宁"] },
  { name: "湖南", cities: ["长沙", "湘潭", "岳阳", "株洲", "怀化", "永州", "益阳", "张家界", "常德", "衡阳", "湘西", "邵阳", "娄底", "郴州"] },
  { name: "广东", cities: ["广州", "深圳", "东莞", "佛山", "珠海", "汕头", "韶关", "江门", "梅州", "揭阳", "中山", "河源", "惠州", "茂名", "湛江", "阳江", "潮州", "云浮", "汕尾", "潮阳", "肇庆", "顺德", "清远"] },
  { name: "广西", cities: ["南宁", "桂林", "柳州", "梧州", "来宾", "贵港", "玉林", "贺州"] },
  { name: "海南", cities: ["海口", "三亚"] },
  { name: "重庆", cities: ["渝中", "大渡口", "江北", "沙坪坝", "九龙坡", "南岸", "北碚", "万盛", "双桥", "渝北", "巴南", "万州", "涪陵", "黔江", "长寿"] },
  { name: "四川", cities: ["成都", "达州", "南充", "乐山", "绵阳", "德阳", "内江", "遂宁", "宜宾", "巴中", "自贡", "康定", "攀枝花"] },
  { name: "贵州", cities: ["贵阳", "遵义", "安顺", "黔西南", "都匀"] },
  { name: "云南", cities: ["昆明", "丽江", "昭通", "玉溪", "临沧", "文山", "红河", "楚雄", "大理"] },
  { name: "西藏", cities: ["拉萨", "林芝", "日喀则", "昌都"] },
  { name: "陕西", cities: ["西安", "咸阳", "延安", "汉中", "榆林", "商南", "略阳", "宜君", "麟游", "白河"] },
  { name: "甘肃", cities: ["兰州", "金昌", "天水", "武威", "张掖", "平凉", "酒泉"] },
  { name: "青海", cities: ["黄南", "海南", "西宁", "海东", "海西", "海北", "果洛", "玉树"] },
  { name: "宁夏", cities: ["银川", "吴忠"] },
  { name: "新疆", cities: ["乌鲁木齐", "哈密", "喀什", "巴音郭楞", "昌吉", "伊犁", "阿勒泰", "克拉玛依", "博尔塔拉"] },
  { name: "香港", cities: ["中西区", "湾仔区", "东区", "南区", "九龙-油尖旺区", "九龙-深水埗区", "九龙-九龙城区", "九龙-黄大仙区", "九龙-观塘区", "新界-北区", "新界-大埔区", "新界-沙田区", "新界-西贡区", "新界-荃湾区", "新界-屯门区", "新界-元朗区", "新界-葵青区", "新界-离岛区"] },
  { name: "澳门", cities: ["花地玛堂区", "圣安多尼堂区", "大堂区", "望德堂区", "风顺堂区", "嘉模堂区", "圣方济各堂区", "路氹城"]}
];
cp2y.user={
	getBanks:function(){
		var html=[];
		html.push('<option value="工商银行" >工商银行(推荐)</option>');
		html.push('<option value="中国农业银行" >中国农业银行(推荐)</option>');
		html.push('<option value="中国建设银行" >中国建设银行(推荐)</option>');
		html.push('<option value="招商银行" >招商银行(推荐)</option>');
		html.push('<option value="交通银行" >交通银行</option>');
		html.push('<option value="中国银行" >中国银行</option>');
		html.push('<option value="中国邮政储蓄银行" >中国邮政储蓄银行</option>');
		html.push('<option value="中国民生银行" >中国民生银行</option>');
		html.push('<option value="兴业银行" >兴业银行</option>');
		html.push('<option value="华夏银行" >华夏银行</option>');
		html.push('<option value="中国光大银行" >中国光大银行</option>');
		html.push('<option value="宁波银行" >宁波银行</option>');
		html.push('<option value="上海浦东发展银行" >上海浦东发展银行</option>');
		html.push('<option value="广东发展银行" >广东发展银行</option>');
		html.push('<option value="深圳发展银行" >深圳发展银行</option>');
		html.push('<option value="中信实业银行" >中信实业银行</option>');
		$("#banks").html(html.join(''));
	},
	getAreas:function(){
		var i=0,len=selectCitys.length,html=[],html2=[];
		for(i;i<len;i++){
			html.push('<option value="'+i+'">'+selectCitys[i].name+'</option>');
		}
		$("#provinces").html(html.join('')).change(function(){
			cp2y.user.setCity($('#provinces').val());
		});
		this.setCity($('#provinces').val());
	},
	setCity:function(i){
		var data=selectCitys[i].cities,i=0,len=data.length,html=[];
		for(i;i<len;i++){
			html.push('<option value="'+data[i]+'">'+data[i]+'</option>');
		}
		$("#city").html(html.join(''));
	},
	init:function(){
		$.ajax({
			url:WebAppUrl.HOME_APP_URL+"/core/user/query_bank_card",
			beforeSend:function(){cp2y.dialog.loading();},
			success:function(data){
				cp2y.dialog.clearLoading();
				var html=[];
				if(data.bindingBank==1){
					html.push('<ul class="userPartBox6 mt40"><li><label>银行：</label><p>'+data.bank+'</p></li>');
					html.push('<li><label>卡号：</label><p>'+data.bankAccount+'</p></li>');
					html.push('<li><label>开户行所在地：</label><p>'+data.bankProvince+data.bankCity+'</p></li>');
					html.push('<li><label>开户人姓名：</label><p>'+data.name+'</p></li>');
					html.push('<li><label>开户人证件号：</label><p>'+data.identify+'</p></li></ul>');
					html.push('<p class="userPartBox61">绑定修改，需联系客服<a href="tel:4006667575">400-666-7575</a></p>');
					html.push('<p class="userPartBox62">可提款余额：<span id="wdV"></span>元</p>');
					html.push('<div class="fixBottom2"><div class="userPartBox1" ><input type="number" id="withdrawals" class="input7" placeholder="每次至少5元，每天可提现3次"/></div><a onclick="cp2y.user.withdrawals()">提款</a></div>');
				}else{
					html.push('<a class="userPartBox5 input4 mt40"><label>银行:</label><select id="banks" class="input5"></select></a>');
					html.push('<a class="userPartBox5 input4 nobt"><label>卡号:</label><input type="number" id="card" class="input6" /></a>');
					html.push('<a class="userPartBox5 input4 nobt"><label>开户行所在地:</label><select id="provinces" class="input5"></select><select id="city" class="input5"></select></a>');
					html.push('<a class="userPartBox5 input4 nobt"><label>开户人姓名:</label><input type="text" id="userName" class="input6" /></a>');
					html.push('<a class="userPartBox5 input4 nobt"><label>开户人证件号:</label><input type="text" id="userId" class="input6" /></a>');
					html.push('<div class="fixBottom" onclick="cp2y.user.saveBank()">绑定</div>');
				}
				$("#withDrawContent").html(html.join(''));
				cp2y.user.withdrawalsView();
				if(data.bindingBank==1){
				}else{
					cp2y.user.getBanks();
					cp2y.user.getAreas();
				}
			}
		});
	},
	saveBank:function(){
		var data={
			name:$("#userName").val().trim(),
			identityNumber:$("#userId").val().trim(),
			bankAccount:$("#card").val().trim(),
			bank:$("#banks").val(),
			province:selectCitys[$("#provinces").val()].name,
			city:$("#city").val()
		};
		cp2y.dialog.clearTip();
		if(!data.bankAccount.isInt()){
			return cp2y.dialog.tip('卡号不对');
		}
		if(data.identityNumber.isID()){
			return cp2y.dialog.tip(data.identityNumber.isID());
		}
		if(!data.name||!data.identityNumber||!data.bankAccount||!data.bank||!data.province||!data.city){
			return cp2y.dialog.tip('信息不能为空');
		}
		$.ajax({
			url:WebAppUrl.HOME_APP_URL+"/core/user/bind_bank_card",
			data:data,
			beforeSend:function(){
				cp2y.dialog.loading();
			},
			success:function(data){
				cp2y.dialog.clearLoading();
				if(data.flag==1){
					cp2y.user.init();
				}else{
					return cp2y.dialog.tip(data.message);
				}
			}
		});
	},
	withdrawalsView:function(){
		$.ajax({
			url:WebAppUrl.HOME_APP_URL+"/core/user/withdraw_view",
			success:function(data){
				$("#wdV").html(data.balance);
			}
		});
	},
	withdrawals:function(){
		var money=$("#withdrawals").val().trim();
		cp2y.dialog.clearTip();
		if(!money.isInt()){
			return cp2y.dialog.tip("请输入数字");
		}
		if(money<5){
			return cp2y.dialog.tip("每次至少5元");
		}
		$.ajax({
			url:WebAppUrl.HOME_APP_URL+"/core/user/withdraw",
			data:{money:money},
			beforeSend:function(){
				cp2y.dialog.loading();
			},
			success:function(data){
				$("#withdrawals").val('');
				cp2y.dialog.clearLoading();
				cp2y.dialog.tip(data.message);
			}
		});
	}
};