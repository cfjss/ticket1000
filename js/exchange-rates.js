$.get('https://api.exchangeratesapi.io/latest?symbols=TRY,USD').then(function(data){
	tr = data.rates.TRY;
	us = data.rates.USD;
    usdtry = Math.round(tr/us * 100)/100;
    tryusd = Math.round(us/tr * 100)/100;
    $('#usdtry').text(usdtry);
    $('#tryusd').text(tryusd);
});
