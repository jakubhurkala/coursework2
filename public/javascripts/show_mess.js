function show_key1() {
  var x = document.getElementById("chosd_hash1").value;
  var key_area = document.getElementById("key1");
  var key_text = document.getElementById("key_text1");

  if (x === "CaesarCipher") {
		key_area.style.display = "block";
    key_text.style.display = "block";
} else if (x === "Morse Code") {
  key_area.style.display = "none";
  key_text.style.display = "none";
} else {
  key_area.style.display = "none";
  key_text.style.display = "none";
}
}

function show_mess() {
  var x = "MJQQT";
  var y = "how are you";
  var z = "See you later";

  var user = document.getElementById("user").textContent;
  console.log(user);
  if (user === "Mohammed") {
    document.getElementById("outputmess").innerHTML = x;
  } else if (user === "Ibr2") {
    document.getElementById("outputmess").innerHTML = y;
  }

}

function userName() {
  var username = document.getElementById("username1").text;
  alert(username)
  //document.getElementById("usertxt").innerHTML = username;
}
