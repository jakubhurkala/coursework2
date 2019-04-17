var ctx;

function playSound() {
	var morseCode = document.getElementById("outputmessage").value;
	ctx = new AudioContext();
	var dot = 0.1;
	var dash = 0.3;
	var speed = 0.4;

	if (morseCode === "") {
		alert("There is no Morse code to play");
	}

	var now = ctx.currentTime;

	for (var idx = 0; idx < morseCode.length; idx++) {
		now += speed;

		if (morseCode[idx] === "-") {

			console.log("dash" + morseCode[idx]);
			play(now, now + dash);

		}else if (morseCode[idx] === ".") {

			console.log("dot" + morseCode[idx]);
			play(now, now + dot);

		}
	}
}

function play(start, stop) {
	var osc = ctx.createOscillator();
    osc.connect(ctx.destination);
    osc.start(start);
    osc.stop(stop);
}
