$(document).ready(function() {
/*		var clock = $('#mainclock').FlipClock({
			clockFace: 'TwelveHourClock'
		});
		clock.setTime(1234);
*/
	var d = new Date();
	var hours = d.getHours();
	if(hours > 12) { hours = hours - 12; }
	var timetext = hours + ':';
	var min = d.getMinutes();
	if(min < 10) { timetext += '0';}
	timetext += min;
	console.log( timetext );
	var mainclock = document.getElementById("mainclock");
	mainclock.innerHTML = timetext;

	//check same digits
	var coolinfo = { type: "unknown"};
	if(checkCoolness(d, coolinfo)) {
		mainclock.innerHTML += "<br/>This is a cool time!  " + coolinfo.type;
	} else {
		var time_til_coolness = 0;
		while(true){
			time_til_coolness++;
			d.setMinutes(d.getMinutes()+1);
			if(checkCoolness(d, coolinfo)) {
				var hours = d.getHours();
				if(hours > 12) { hours = hours - 12; }
				var timetext = hours + ':';
				var min = d.getMinutes();
				if(min < 10) { timetext += '0';}
				timetext += min;
				mainclock.innerHTML += "<br/>The next cool time is "+timetext+" in "+time_til_coolness+" minutes!  " + coolinfo.type;
				break;
			}
		}
	}
});

function checkCoolness(d, coolinfo)
{
	var hours = d.getHours();
	if(hours > 12) { hours = hours - 12; }
	var min = d.getMinutes();
	var mo = min % 10; //minutes ones digit
	var mt = Math.floor(min / 10); //minutes tens digit
	var ho = hours % 10; //hours ones digit
	var ht = Math.floor(hours / 10); //hours tens digit

	//console.log("checking "+ht+ho+mt+mo);
	//check all digits the same
	if(mo == mt) {
		//in here, we know the minutes digits are the same
		if(ho == ht || ht == 0) {
			//in here we know the hours are the same OR the hours tens digit is zero (zero is hidden so we don't care about it)
			if(mo == ho) {
				//console.log("yay");
				coolinfo.type = "All of the digits are the same";
				return true;
			}
		}
	}

	//addition/subtraction checks
	if( ht+ho+mt==mo) {coolinfo.type =     ht+" + "+ho+" + "+mt+" = "+mo; return true;}
	if( ht+ho-mt==mo) {coolinfo.type =     ht+" + "+ho+" - "+mt+" = "+mo; return true;}
	if( ht-ho+mt==mo) {coolinfo.type =     ht+" - "+ho+" + "+mt+" = "+mo; return true;}
	if( ht-ho-mt==mo) {coolinfo.type =     ht+" - "+ho+" - "+mt+" = "+mo; return true;}
	if(-ht+ho+mt==mo) {coolinfo.type = "-"+ht+" + "+ho+" + "+mt+" = "+mo; return true;}
	if(-ht+ho-mt==mo) {coolinfo.type = "-"+ht+" + "+ho+" - "+mt+" = "+mo; return true;}
	if(-ht-ho+mt==mo) {coolinfo.type = "-"+ht+" - "+ho+" + "+mt+" = "+mo; return true;}

	return false;
}
