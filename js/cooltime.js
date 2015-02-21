$(document).ready(function() {
	var clock = new FlipClock($('#mainclock'), {
		clockFace: 'TwelveHourClock'
	});

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

	update();
	window.setTimeout(function() { update(); window.setInterval(update, 60*1000); }, 61*1000-d.getSeconds()*1000-d.getMilliseconds())

	if(window.location.search) {
		var testoutput = document.getElementById("test");
		testoutput.innerHTML = "Test Results<br/>";
		var test = new Date();
		test.setHours(1,0);
		var coolinfo = { type: "unknown"};
		for(var i = 0; i < 12*60; i++) {
			var hours = test.getHours();
			if(hours > 12) { hours = hours - 12; }
			var timetext = hours + ':';
			var min = test.getMinutes();
			if(min < 10) { timetext += '0';}
			timetext += min;

			var cool = checkCoolness(test, coolinfo);
			if(!cool) {
				testoutput.innerHTML += timetext + " is not cool <br/>";
			} else {
				testoutput.innerHTML += timetext + " is cool! " + cleanOutput(coolinfo.type) + "<br/>";
			}
			if(test.getMinutes() != 59) {
				test.setMinutes(test.getMinutes()+1);
			}else{
				test.setHours(test.getHours()+1, 0);
			}
		}
	}
});

function update()
{
	var d = new Date();
	var timeinfo = document.getElementById("timeinfo");

	//check same digits
	var coolinfo = { type: "unknown"};
	if(checkCoolness(d, coolinfo)) {
		timeinfo.innerHTML = "<br/>This is a cool time!  " + cleanOutput(coolinfo.type);
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
				var message =  "<br/>The next cool time is "+timetext+" in "+time_til_coolness;
				if(time_til_coolness == 1)
					message += " minute!  ";
				else
					message += " minutes!  ";
				message += cleanOutput(coolinfo.type);
				timeinfo.innerHTML = message;
				break;
			}
		}
	}

}
function cleanOutput(coolequation)
{
	var ret = coolequation;
	if(ret[0] == '0') {
		ret = ret.substr(2);
	}
	if(ret[0] == '+') {
		ret = ret.substr(2);
	}
	if(ret[0] == '-' && ret[1] == ' ') {
		ret = '-'+ret.substr(2);
	}
	return ret;
}

function checkCoolness(d, coolinfo)
{
	coolinfo.type = "";
	var hours = d.getHours();
	if(hours > 12) { hours = hours - 12; }
	var min = d.getMinutes();
	var mo = min % 10; //minutes ones digit
	var mt = Math.floor(min / 10); //minutes tens digit
	var ho = hours % 10; //hours ones digit
	var ht = Math.floor(hours / 10); //hours tens digit

	//first, establish the coolest time of all
	if(hours == 12 && min == 34) {
		coolinfo.type = "The coolest time of all";
		return true;		
	}

	//check sequential digits
	//we need ht == 0 for sequential because we already checked 1234, until we do 24 hour clock
	if(ht == 0) {
		if( ho == mt-1 && mt == mo-1 ||
			ho == mt+1 && mt == mo+1) {
			coolinfo.type = "All of the digits are in order";
			return true;
		}
	}
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

	//check mirrored
	if(ht != 0) {
		if(ht == mo && ho == mt) {
			coolinfo.type = "Hours and minutes are mirrored";
			return true;
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
