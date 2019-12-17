$.get('https://api.exchangeratesapi.io/latest?symbols=TRY,USD').then(function(data){
	eurdiff = 0.02;
	usddiff = 0.03;
	eurtry = data.rates.TRY;
	eurusd = data.rates.USD;
    usdtry = Math.round(eurtry/eurusd * 100)/100;
	eurBuy  = eurtry - eurdiff;
	eurSell = eurtry + eurdiff;
	usdBuy  = usdtry - usddiff;
	usdSell = usdtry + usddiff;
    $('#eur-buy').text(eurBuy);
    $('#eur-sell').text(eurSell);
    $('#usd-buy').text(usdBuy);
    $('#usd-sell').text(usdSell);
});
