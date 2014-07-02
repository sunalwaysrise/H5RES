function calc(){
	muls = [];
	var model = $('#income_model').val();
	var income_money = $('#income1').val();
	var income_rate = $('#income2').val();
	var income_issues = $('#issues_income').val();
	var income_rate1 = $('#income3').val();
	var income_rate2 = $('#income4').val();
	var betUnits = $('#betUnits').val();
	var issues = $('#selIssue').val();
	var startMultiple = $('#startMultiple').val();
	var unitsPrize = $('#unitsPrize').val();
	var totalCost = 0;
	var totalIncome = 0;
	if(betUnits=='' || betUnits<=0){
		return cp2y.dialog.alert({move:true,content:'投入注数不可为空,必须是数字。',ok:function(){$('#betUnits').focus();}});
	}
	if(issues=='' || issues<=0){
		return cp2y.dialog.alert({move:true,content:'投入期数不可为空,必须是数字。',ok:function(){$('#selIssue').focus();}});
	}
	if(issues>issueIds.length - selIndex){
		return cp2y.dialog.alert({move:true,content:'最多只能选择'+(issueIds.length - selIndex)+'期。',ok:function(){$('#selIssue').focus();}});
	}
	if(startMultiple=='' || startMultiple<=0){
		return cp2y.dialog.alert({move:true,content:'起始倍数不可为空,必须是数字。',ok:function(){$('#startMultiple').focus();}});
	}
	if(unitsPrize=='' || unitsPrize<=0){
		return cp2y.dialog.alert({move:true,content:'单注奖金不可为空,必须是数字。',ok:function(){$('#unitsPrize').focus();}});
	}

	if(model==1){
		if(income_money=='' || income_money<=0){
			return cp2y.dialog.alert({move:true,content:'收益不可为空,必须是数字。',ok:function(){$('#income1').focus();}});
		}
	}else if(model==2){
		if($('#income2').val()=='' || $('#income2').val().toInt()<=0){
			return cp2y.dialog.alert({move:true,content:'全程收益率不可为空,必须是数字。',ok:function(){$('#income2').focus();}});
		}
	}else{
		if(income_issues=='' || income_issues<=0){
			return cp2y.dialog.alert({move:true,content:'期数不可为空,必须是数字。',ok:function(){$('#issues_income').focus();}});
		}
		if(income_rate1=='' || income_rate1<=0){
			return cp2y.dialog.alert({move:true,content:'收益不可为空,必须是数字。',ok:function(){$('#income3').focus();}});
		}
		if(income_rate2=='' || income_rate2<=0){
			return cp2y.dialog.alert({move:true,content:'收益不可为空,必须是数字。',ok:function(){$('#income4').focus();}});
		}
	}
	var 投入注数=betUnits;
	var 投入期数=issues;
	var 起始倍数=startMultiple;
	var 单注奖金=unitsPrize;
	var 基本收益=income_money;

	var 当前期数=1;
	var 投注倍数=起始倍数;
	var 本期投入=投入注数*投注倍数*2;
	var 累计投入=本期投入;
	var 本期收益=投注倍数*单注奖金-本期投入;
	var 累计收益=投注倍数*单注奖金-累计投入;
	var 收益率=累计收益/累计投入*100;
	var tmp本期投入=本期投入;
	var tmpFlag;
	var tmpdata=[];
	while(当前期数<=投入期数){
		if(model==1){
			if(累计收益>=基本收益){
				tmpFlag=true;
			}else{
				tmpFlag=false;
			}
		}else if(model==2){
			if(收益率>=income_rate){
				tmpFlag=true;
			}else{
				tmpFlag=false;
			}
		}else if(model==3){
			if(当前期数<=income_issues){
				if(收益率>=income_rate1){
					tmpFlag=true;
				}else{
					tmpFlag=false;
				}
			}else{
				if(收益率>=income_rate2){
					tmpFlag=true;
				}else{
					tmpFlag=false;
				}
			}
		}
	
		if(tmpFlag){
			tmpdata.push({dqqs:当前期数,tzbs:投注倍数,bqtr:本期投入,ljtr:累计投入,bqsy:本期收益,ljsy:累计收益,syl:parseNumberFormat(收益率)})
			muls.push(投注倍数);
			当前期数++;
			投注倍数=起始倍数-1;
			tmp本期投入=0;
		}
		投注倍数++;
		if(投注倍数>100000){
			return cp2y.dialog.alert({move:true,content:'您的方案不适合倍投。'});
			break;
		}
		本期投入=投入注数*投注倍数*2;
		累计投入=累计投入-tmp本期投入+本期投入;
		tmp本期投入=本期投入;
		本期收益=投注倍数*单注奖金-本期投入;
		累计收益=投注倍数*单注奖金-累计投入;
		收益率=累计收益/累计投入*100;
	}
	var start = selIndex,end = selIndex + $('#selIssue').val().trim().toInt();
	if (selIndex >= end)return;

	cp2y.buy.sels(-2);

	for (var i = start; i < end; i++) {
		cp2y.buy.$$(i, 2, 0).val(muls[i - start]);
		cp2y.buy.$$(i, 1, 0).attr('checked', 'true');
		cp2y.buy.sel(i, 1);
	}
	cp2y.buy.showMoney();
}