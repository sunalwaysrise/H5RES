/**
 * @author luwenbin@live.com
 */
var _={
	bt:10059,
	playName:"世界杯",
	playTypes:function(a){
		var html=[],v1='',v2='',v3='';
		if(a=="a0"){
			v1='class="onn"';
		}else if(a=="a1"){
			v2='class="onn"';
		}else if(a=="a2"){
			v3='class="onn"';
		}
		html.push('<a data="a0" href="'+WebAppUrl.HOME_APP_URL+'/caiguanya?type=a0" '+v1+' data2="冠军">冠军</a>');
		//html.push('<a data="a1" href="'+WebAppUrl.HOME_APP_URL+'/caiguanya?type=a1" '+v2+' data2="欧冠杯">欧冠杯</a>');
		//html.push('<a data="a2" href="'+WebAppUrl.HOME_APP_URL+'/caiguanya?type=a2" '+v3+' data2="冠亚军">冠亚军</a>');
		return html.join('');
	}
};
_.a0={
	playName:_.playName,
	playType:"冠军",
	pass:"冠亚军",
	input:"WC",
	bet:function(){
		$.ajax({
			url:WebAppUrl.HOME_APP_URL+"/lottery/worldcupgj",
			beforeSend:function(){cp2y.dialog.loading();},
			success:function(data){
				cp2y.dialog.clearLoading();
				var html0=[],i=0,len=data.datalist.length,len2=0,img,t=[30.91,14.19,9.06,10.69,4.53,5.04,1.65,4.00,3.45,2.75,1.33,0.45,1.02,0.45,0.73,1.03,0.46,0.45,0.45,0.45,0.22,0.17,0.20,0.20,0.17,0.44,0.17,0.76,1.29,0.51,1.54,1.24];
				for(i;i<len;i++){
					img=data.datalist[i].imgG.split('/');
					img=img[img.length-1];
					if(data.datalist[i].status == 0  && data.datalist[i].sellStatus == 0){
						html0.push('<li onclick="cp2y.buy.select(this)" data_id="'+data.datalist[i].jcId+'" data_t="'+data.datalist[i].teamNameG+'" data_sp="'+data.datalist[i].sp+'" >');
						html0.push('<i><img src="'+WebAppUrl.RESOURCE_URL+'/flag/'+img+'" /><em></em></i>');
						html0.push('<div><section><span>名称</span><b>'+data.datalist[i].teamNameG+'</b></section><section><span>当前赔率</span><b>'+data.datalist[i].sp+'</b></section><section><span>投注支持率</span><b>'+t[i]+'%</b></section></div></li>');
						len2++;
					}else{
//						var wo;
//						if(data.datalist[i].sellStatus==1){
//							wo='停售';
//						}else if(data.datalist[i].sellStatus==2){
//							wo='已出局';
//						}else if(data.datalist[i].sellStatus==3){
//							wo='冠军';
//						}else{
//							wo='';
//						}
//						html0.push('<li class="out"><i><img src="'+WebAppUrl.RESOURCE_URL+'/flag/'+img+'" /><em></em></i>');
//						html0.push('<div><section><span>名称</span><b>'+data.datalist[i].teamNameG+'</b></section><section><span>'+wo+'</span><b></b></section><section><span>投注支持率</span><b>'+t[i]+'%</b></section></div></li>');
					}
				}
				jcDom.choose.html(html0.join(''));
				cp2y.buy.betType=data.betType;
				cp2y.buy.iid=data.issues.id;
				cp2y.buy.issue=data.issues.issue;
				jcDom.jcTo.html("共"+len2+"支");
				jcDom.jcTime.html("截止:"+data.sellEndTime);
			},
			error:function(){cp2y.dialog.clearLoading();}
		});
	},
	select:function(_this){
		$(_this).toggleClass("sel");
		this.count();
	},
	count:function(){
		var b=this.units();
		var units = b.length;
		jcDom.curBets.html(units);
		jcDom.curMoney.html('￥'+(units*2));
	},
	units:function(){
		var rb=[],i=0,o=this.getBall(),len=o.length,s=1;
		for(i;i<len;i++){
			if(o.eq(i).hasClass("sel")){
				rb.push(o.eq(i));
			}
		}
		return rb;
	},
	addContent:function(){
		var b=this.units(),o=[],i=0,len=b.length,c,d,sp;
		if(len==0){return cp2y.dialog.alert('请至少选择一项');}
		for(i;i<len;i++){
			c=$(b)[i].attr('data_t');
			d=$(b)[i].attr('data_id');
			sp=$(b)[i].attr('data_sp');
			o.push('<li data_input="'+this.input+'" data_id="'+d+'" data_sp="'+sp+'" data_bets="1" data_code="'+c+'"><div>'+c+'</div><p>'+this.playType+'：1注2元</p><i class="delI" onclick="cp2y.buy.del(this)"></i></li>');
		}
		this.addRecord(o.join(''),len);
		cp2y.buy.step2();
	}
};
_.a1={
	playName:_.playName,
	playType:"欧冠杯",
	pass:"冠军",
	input:"ECC",
	bet:function(){
		$.ajax({
			url:WebAppUrl.HOME_APP_URL+"/lottery/ogbgj",
			beforeSend:function(){cp2y.dialog.loading();},
			success:function(data){
				cp2y.dialog.clearLoading();
				var html0=[],i=0,len=data.datalist.length,len2=0;
				for(i;i<len;i++){
					if(data.datalist[i].status == 0  && data.datalist[i].sellStatus == 0){
						html0.push('<li onclick="cp2y.buy.select(this)" data_id="'+data.datalist[i].jcId+'" data_t="'+data.datalist[i].teamNameG+'" data_sp="'+data.datalist[i].sp+'" ><i>'+(i+1).addZero()+'</i><div>'+data.datalist[i].teamNameG+'<span>'+data.datalist[i].sp+'</span></div></li>');
						len2++;
					}else{
						var wo;
						if(data.datalist[i].sellStatus==1){
							wo='停售';
						}else if(data.datalist[i].sellStatus==2){
							wo='已出局';
						}else if(data.datalist[i].sellStatus==3){
							wo='冠军';
						}else{
							wo='';
						}
						html0.push('<li class="out"><i>'+(i+1).addZero()+'</i><div>'+data.datalist[i].teamNameG+'<span>['+wo+']</span></div></li>');
					}
				}
				jcDom.choose.html(html0.join(''));
				cp2y.buy.betType=data.betType;
				cp2y.buy.iid=data.issues.id;
				cp2y.buy.issue=data.issues.issue;
				jcDom.jcTo.html("共"+len2+"支");
				jcDom.jcTime.html("截止:"+data.sellEndTime);
			},
			error:function(){cp2y.dialog.clearLoading();}
		});
	},
	select:_.a0.select,
	count:_.a0.count,
	units:_.a0.units,
	addContent:_.a0.addContent
};

_.a2={
	playName:_.playName,
	playType:"冠亚军",
	pass:"冠亚军",
	input:"WC",
	bet:function(){
		$.ajax({
			url:WebAppUrl.HOME_APP_URL+"/lottery/worldcupgyj",
			beforeSend:function(){cp2y.dialog.loading();},
			success:function(data){
				cp2y.dialog.clearLoading();
				var html0=[],i=0,len=data.datalist.length,len2=0,img,img2;
				for(i;i<len;i++){
					if(i==len-1){
						img='';
						img2='';
					}else{
						img=data.datalist[i].imgG.split('/');
						img=img[img.length-1];
						img2=data.datalist[i].imgY.split('/');
						img2=img2[img2.length-1];
					}
					if(data.datalist[i].status == 0  && data.datalist[i].sellStatus == 0){
						if(i==len-1){
							html0.push('<li onclick="cp2y.buy.select(this)" data_id="'+data.datalist[i].jcId+'" data_t="'+data.datalist[i].teamNameG+'" data_sp="'+data.datalist[i].sp+'" >');
							html0.push('<div><section>');
							html0.push('<i><img src="'+WebAppUrl.RESOURCE_URL+'/flag/o.png" /><em></em></i><article>'+data.datalist[i].teamNameG+'</article>');
							html0.push('</section>');
							html0.push('<section><span>+</span><b>'+data.datalist[i].sp+'</b></section>');
							html0.push('<section><article>'+data.datalist[i].teamNameG+'</article><i><img src="'+WebAppUrl.RESOURCE_URL+'/flag/o.png" /><em></em></i></section></div></li>');
						}else{
							html0.push('<li onclick="cp2y.buy.select(this)" data_id="'+data.datalist[i].jcId+'" data_t="'+data.datalist[i].teamNameG+' VS '+data.datalist[i].teamNameY+'" data_sp="'+data.datalist[i].sp+'" >');
							html0.push('<div><section>');
							html0.push('<i><img src="'+WebAppUrl.RESOURCE_URL+'/flag/'+img+'" /><em></em></i><article>'+data.datalist[i].teamNameG+'</article>');
							html0.push('</section>');
							html0.push('<section><span>+</span><b>'+data.datalist[i].sp+'</b></section>');
							html0.push('<section><article>'+data.datalist[i].teamNameY+'</article><i><img src="'+WebAppUrl.RESOURCE_URL+'/flag/'+img2+'" /><em></em></i></section></div></li>');
						}
						len2++;
						
					}else{
//						var wo;
//						if(data.datalist[i].sellStatus==1){
//							wo='停售';
//						}else if(data.datalist[i].sellStatus==2){
//							wo='已出局';
//						}else if(data.datalist[i].sellStatus==3){
//							wo='冠军';
//						}else{
//							wo='';
//						}
//						if(i==len-1){
//							html0.push('<li class="out">');
//							html0.push('<div><section>');
//							html0.push('<i><img src="'+WebAppUrl.RESOURCE_URL+'/flag/o.png" /><em></em></i>'+data.datalist[i].teamNameG+'</section>');
//							html0.push('<section><span>+</span><b>'+data.datalist[i].sp+'</b></section>');
//							html0.push('<section>'+data.datalist[i].teamNameG+'<i><img src="'+WebAppUrl.RESOURCE_URL+'/flag/o.png" /><em></em></i></section></div></li>');
//						}else{
//							html0.push('<li class="out">');
//							html0.push('<div><section>');
//							html0.push('<i><img src="'+WebAppUrl.RESOURCE_URL+'/flag/'+img+'" /><em></em></i><article>'+data.datalist[i].teamNameG+'</article>');
//							html0.push('</section>');
//							html0.push('<section><span>+</span><b>'+data.datalist[i].sp+'</b></section>');
//							html0.push('<section><article>'+data.datalist[i].teamNameY+'</article><i><img src="'+WebAppUrl.RESOURCE_URL+'/flag/'+img2+'" /><em></em></i></section></div></li>');
//						}
					}
				}
				jcDom.choose.addClass('gyj').html(html0.join(''));
				cp2y.buy.betType=data.betType;
				cp2y.buy.iid=data.issues.id;
				cp2y.buy.issue=data.issues.issue;
				jcDom.jcTo.html("共"+len2+"支");
				jcDom.jcTime.html("截止:"+data.sellEndTime);
			},
			error:function(){cp2y.dialog.clearLoading();}
		});
	},
	select:function(_this){
		$(_this).toggleClass("sel");
		this.count();
	},
	count:function(){
		var b=this.units();
		var units = b.length;
		jcDom.curBets.html(units);
		jcDom.curMoney.html('￥'+(units*2));
	},
	units:function(){
		var rb=[],i=0,o=this.getBall(),len=o.length,s=1;
		for(i;i<len;i++){
			if(o.eq(i).hasClass("sel")){
				rb.push(o.eq(i));
			}
		}
		return rb;
	},
	addContent:function(){
		var b=this.units(),o=[],i=0,len=b.length,c,d,sp;
		if(len==0){return cp2y.dialog.alert('请至少选择一项');}
		for(i;i<len;i++){
			c=$(b)[i].attr('data_t');
			d=$(b)[i].attr('data_id');
			sp=$(b)[i].attr('data_sp');
			o.push('<li data_input="'+this.input+'" data_id="'+d+'" data_sp="'+sp+'" data_bets="1" data_code="'+c+'"><div>'+c+'</div><p>'+this.playType+'：1注2元</p><i class="delI" onclick="cp2y.buy.del(this)"></i></li>');
		}
		this.addRecord(o.join(''),len);
		cp2y.buy.step2();
	}
};