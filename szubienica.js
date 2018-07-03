var password = "Moja mała Amavi";
password = password.toUpperCase();

var miss = 0;
var tempPassword = "";
var yes = new Audio("yes.wav");
var no = new Audio("no.wav");

var myLength = password.length;

for(i = 0; i < myLength; i++) {
	if(password.charAt(i)==" ")tempPassword = tempPassword + " ";
	else tempPassword = tempPassword + "-";
}

function show_password() {
	document.getElementById("board").innerHTML = tempPassword;
}

window.onload = show_alphabet;
var letters = new Array(35);
letters[0] = "A";
letters[1] = "Ą";
letters[2] = "B";
letters[3] = "C";
letters[4] = "Ć";
letters[5] = "D";
letters[6] = "E";
letters[7] = "Ę";
letters[8] = "F";
letters[9] = "G";
letters[10] = "H";
letters[11] = "I";
letters[12] = "J";
letters[13] = "K";
letters[14] = "L";
letters[15] = "Ł";
letters[16] = "M";
letters[17] = "N";
letters[18] = "Ń";
letters[19] = "O";
letters[20] = "Ó";
letters[21] = "P";
letters[22] = "Q";
letters[23] = "R";
letters[24] = "S";
letters[25] = "Ś";
letters[26] = "T";
letters[27] = "U";
letters[28] = "V";
letters[29] = "W";
letters[30] = "X";
letters[31] = "Y";
letters[32] = "Z";
letters[33] = "Ż";
letters[34] = "Ź";

function show_alphabet() {
	var divContent = "";
	for(i = 0; i < 35; i++) {
		var element = "let" + i;
		divContent = divContent + '<div class="letter" onclick="check('+i+')" id="' + element + '">' + letters[i] + '</div>';
		if((1+i) % 7 == 0) divContent = divContent + '<div style="clear: both"></div>';
	}
	
	document.getElementById("alphabet").innerHTML = divContent;
	show_password();
}

String.prototype.setChar = function(location, symbol) {
	if(location > this.length-1) 
		return this.toString();
	else 
		return this.substr(0, location) + symbol + this.substr(location+1);
}

function check(num) {
	var found = false;
	for(i = 0; i < myLength; i++) {
		if(password.charAt(i) == letters[num]) {
			tempPassword = tempPassword.setChar(i, letters[num]);
			found = true;
		}
	}
	if(found == true) {
		//Found
		yes.play();
		var element = "let" + num;
		document.getElementById(element).style.background = "#003300";
		document.getElementById(element).style.color = "#00c000";
		document.getElementById(element).style.border = "3px solid #00c000";
		document.getElementById(element).style.border = "default";
		show_password();
		//Miss
	} else {
		no.play();
		var element = "let" + num;
		document.getElementById(element).style.background = "#330000";
		document.getElementById(element).style.color = "#c00000";
		document.getElementById(element).style.border = "3px solid #c00000";
		document.getElementById(element).style.border = "default";
		document.getElementById(element).setAttribute("onclick", ";");
		miss++;
		var image = "img/s"+miss+".jpg";
		document.getElementById("gallows").innerHTML = '<img src="'+image+'" alt="" />';
	}
	
	//WIN
	if(password == tempPassword) {
		document.getElementById("alphabet").innerHTML = "You Win! Password was: " + password + '<br/><br/><span class="reset" onclick="location.reload()">AGAIN?</span>';
	}
	
	//LOSE
	if(miss >= 9) {
		document.getElementById("alphabet").innerHTML = "You Lose! Password was: " + password + '<br/><br/><span class="reset" onclick="location.reload()">AGAIN?</span>';
	}
}