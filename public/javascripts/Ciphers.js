function show_key() {
	var x = document.getElementById("chosd_hash").value;
	var key_area = document.getElementById("key");
	var key_text = document.getElementById("key_text");
	var playbt = document.getElementById("playSoundbt");
	var playtx = document.getElementById("playtext");

	if (x === "CaesarCipher") {
		key_text.style.display = "block";
		key_area.style.display = "block";
		playbt.style.display = "none";
		playtx.style.display = "none";
		key_area.focus();
	} else if (x === "Morse Code") {
		key_area.style.display = "none";
		key_text.style.display = "none";
		playbt.style.display = "block";
		playtx.style.display = "block";
	}else {
		key_area.style.display = "none";
		key_text.style.display = "none";
		playbt.style.display = "none";
		playtx.style.display = "none";
	}
}

function Encrypt() {
	var hash = document.getElementById("chosd_hash").value;
	var textarea = document.getElementById("inputmessage").value;
	if (hash === "CaesarCipher") {
		var key_area = document.getElementById("key").value;
		if (key_area === "") {
			alert("Please choose A key");
		} else if (textarea === "") {
			alert("Please insert some text");
		} else {
			EnCeaserCipher();
		}
	} else if (hash === "Morse Code") {
		if (textarea === "") {
			alert("Please insert some text");
		} else {
			EnMorseCipher();
		}

	} else if ( hash === "Choose a Cipher") {
		alert("Please choose a Cipher method");
	}

}

function Decrypt() {
	var hash = document.getElementById("chosd_hash").value;
	var textarea = document.getElementById("inputmessage").value.toUpperCase();
	var ciphetText = document.getElementById('inputmessage').value.split('x');
	var key = document.getElementById("key").value % 26;
	if (hash === "CaesarCipher") {
		var key_area = document.getElementById("key").value;
		if (key_area === "") {
			alert("Please choose A key");
		} else if (textarea === "") {
			alert("Please insert some text");
		} else {
			var x = DeCeaserCipher(textarea, key);
			document.getElementById("outputmessage").innerHTML = x;
		}
	} else if (hash === "Morse Code") {
		if (textarea === "") {
			alert("Please insert some text");
		} else {
			var y = DeMorseCipher(ciphetText);
			document.getElementById("outputmessage").innerHTML = y;
		}
	} else if ( hash === "Choose a Cipher") {
		alert("Please choose a Cipher method");
	}
}

function DecryptMess() {
	var cipher_text = document.getElementById('outputmess').value;
	var hash = document.getElementById('chosd_hash1').value;
	var key = document.getElementById("key1").value % 26;
	if (hash === 'CaesarCipher') {
		var x = DeCeaserCipher(cipher_text.toUpperCase(), key);
		document.getElementById("outputDec").style.display = 'block'
		document.getElementById("outputmessage").innerHTML = x;
	} else if (hash === "Morse Code") {
		var y = DeMorseCipher(cipher_text.split('x'));
		document.getElementById("outputDec").style.display = 'block'
		document.getElementById("outputmessage").innerHTML = y;
	} else {
		alert('Choose a cipher method to decrypt')
	}
}

function EnCeaserCipher() {
	var plain_text = document.getElementById("inputmessage").value.toUpperCase();
	var key = document.getElementById("key").value % 26;
	var cipher_text = "";
	var charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split("");

	for (var idx = 0; idx < plain_text.length; idx++) {
		var curlet = plain_text[idx];
		if (curlet === " ") {
			cipher_text += curlet;
			continue;
		}
		var chridx = charset.indexOf(curlet);
		var new_idx = chridx + parseInt(key);
		//Here is the wrapper
		if (new_idx > 25) {
			new_idx = new_idx - 26;
		}
		cipher_text += charset[new_idx];
	}
	document.getElementById("outputmessage").innerHTML = cipher_text;
}


function DeCeaserCipher(cipher_text, key) {
	//var cipher_text = document.getElementById('outputmess').value.toUpperCase();
	//var cipher_text = document.getElementById("inputmessage").value.toUpperCase();
	//var key = document.getElementById("key").value % 26;
	var plain_text = "";
	var charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split("");

	for (var idx = 0; idx < cipher_text.length; idx++) {
		var curlet = cipher_text[idx];
		if (curlet === " ") {
			plain_text += curlet;
			continue;
		}
		var chridx = charset.indexOf(curlet);
		var new_idx = chridx - parseInt(key);
		//Here is the wrapper
		if (new_idx < 0) {
			new_idx = new_idx + 26;
		}
		plain_text += charset[new_idx];
	}
	return plain_text;

}


function EnMorseCipher() {
	var morse = {
		//here is the letters with its matching morseCode
		a: ".-", b: "-...", c: "-.-.", d: "-..", e: ".", f: "..-.", g: "--.", h: "....", i: "..", j: ".---", k: "-.-", l: ".-..",
		m: "--", n: "-.", o: "---", p: ".--.", q: "--.-", r: ".-.", s: "...", t: "-", u: "..-", v: "...-", w: ".--", x: "-..-", y: "-.--",
		z: "--..",

		//here is the numbers with its matching morseCode
		0: "-----", 1: ".----", 2: "..---", 3: "...--", 4: "....-",
		5: ".....", 6: "-....", 7: "--...", 8: "---..", 9: "----.",

		//here is the spaces with its matching morseCode
		" ": "  ",

		//here is the signes with its matching morseCode
		".": ".-.-.-", ",": "--..--", ":": "---...", "?": "..--..", "'": ".----.", "-": "-....-",
		"/": "-..-.", "(": "-.--.-", ")": "-.--.-", "@": ".-.-.", "=": "-...-", "&": ".-...", ";": "-.-.-.",
		"+": ".-.-.", "_": "..-.-", "$": "...-..-", "!": "-.-.-"
		};
	var plain_text = document.getElementById("inputmessage").value.toLowerCase();
	var cipher_text = "";

	for (var idx = 0; idx < plain_text.length; idx++) {
		var curlet = plain_text[idx];
		var morse_code = morse[curlet];
		cipher_text += morse_code + "x";
	}
	document.getElementById("outputmessage").innerHTML = cipher_text;
}

function DeMorseCipher (cipher_text) {
	var morse = {
		//here is the morseCode with its matching letter
		".-":"a", "-...":"b", "-.-.":"c", "-..":"d", ".":"e", "..-.":"f", "--.":"g", "....":"h", "..":"i", ".---":"j", "-.-":"k", ".-..":"l",
		"--":"m", "-.":"n", "---":"o", ".--.":"p", "--.-":"q", ".-.":"r", "...":"s", "-":"t", "..-":"u", "...-":"v", ".--":"w", "-..-":"x", "-.--":"y",
		"--..":"z",

		//here is the morseCode with its matching numbers
		"-----":"0", ".----":"1", "..---":"2", "...--":"3", "....-":"4",
		".....":"5", "-....":"6", "--...":"7", "---..":"8", "----.":"9",

		//here is the morseCode with its mathcing spaces
		"  ": " ", "" : "",

		//here is the morseCode with its matching signes
		".-.-.-":".", "--..--":",", "---...":":", "..--..":"?", ".----.":"'", "-....-":"-",
		"-..-.":"/", "-.--.-":"(", "-.--.-":")", ".-.-.":"@", "-...-":"=", ".-...":"&", "-.-.-.":";",
		".-.-.":"+", "..-.-":"_", "...-..-":"$", "-.-.-":"!"
	};
	//var cipher_text = document.getElementById("inputmessage").value.split("x");
	var plain_text = "";

	for (var idx = 0; idx < cipher_text.length; idx++) {
		var curCode = cipher_text[idx];
		var newlet = morse[curCode];
		plain_text += newlet;
	}
	return plain_text;
}
