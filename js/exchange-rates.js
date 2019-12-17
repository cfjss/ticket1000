$.get('https://api.exchangeratesapi.io/latest?symbols=TRY,USD').then(function(data){
	eurdiff = 0.02;
	usddiff = 0.03;
	
	eurtry = data.rates.TRY;
	eurusd = data.rates.USD;
    usdtry = eurtry/eurusd;
	
	eurBuy  = Math.round((eurtry - eurdiff) * 100) / 100;
	eurSell = Math.round((eurtry + eurdiff) * 100) / 100;
	usdBuy  = Math.round((usdtry - usddiff) * 100) / 100;
	usdSell = Math.round((usdtry + usddiff) * 100) / 100;
	
    $('#eur-buy').text(eurBuy);
    $('#eur-sell').text(eurSell);
    $('#usd-buy').text(usdBuy);
    $('#usd-sell').text(usdSell);
});
