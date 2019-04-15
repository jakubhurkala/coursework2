function magic() {
	var cipher_text = document.getElementById("inputmessage").value.toUpperCase();
	var charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split("");
	var nplain_text = ''
	
	if (cipher_text === "") {
		alert("please enter a ciphetext")
	}else {
		for (var key = 0; key < 26; key++) {
			var plain_text = ''
			for (var idx = 0; idx < cipher_text.length; idx++) {
				var curlet = cipher_text[idx];
				if (curlet === " ") {
					plain_text += curlet;
					continue;
				}
				var chridx = charset.indexOf(curlet);
				var new_idx = chridx - key;
				//Here is the wrapper
				if (new_idx < 0) {
					new_idx = new_idx + 26;
				}
			
				plain_text += charset[new_idx];
			
			
			}
			nplain_text += " [*] Key: [" + key + "] Result: " + plain_text + '<br />' + '<br />';
			console.log(key);
			console.log(plain_text);	
			document.getElementById("outputmessage").innerHTML = nplain_text;
		}
	}
}

// When the user scroll down, show the top button
	window.onscroll = function() {
	if (document.documentElement.scrollTop > 20) {
		document.getElementById("top").style.display = "block";
	} else {
		document.getElementById("top").style.display = "none";
	}
	};
			
	// When the top button clicked, go to the top of the page
	function goTop() {
		document.documentElement.scrollTop = 0;
	}