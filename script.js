let order = 3;
let numSquares = 10;
let score = 100;
let colors = generateRandomColors(numSquares);
let squares = document.querySelectorAll(".square");
let pickedColor = pickColor();
let colorDisplay = document.getElementById("colorDisplay");
let messageDisplay = document.querySelector("#message");
let points = document.getElementById("points");
let h1 = document.querySelector("h1");
let body = document.querySelector("body");
let stripe = document.querySelector("#stripe");
let resetButton = document.querySelector("#reset");
let modeButtons = document.querySelectorAll(".mode");
let scoreDisplay = document.getElementById("score");

for(let i = 0; i < modeButtons.length; i++) {
	modeButtons[i].addEventListener("click", function() {
		modeButtons[0].classList.remove("selected");
		modeButtons[1].classList.remove("selected");
		// modeButtons[2].classList.remove("selected");
		this.classList.add("selected");
		if (this.textContent === "Basic") {
			numSquares = 5;
			order = 1;
			score = 50;
		}
		// else if (this.textContent === "Medium") {
		// 	numSquares = 6;
		// 	order = 2;
		// 	score = 70;
		// }
		else {
			numSquares = 10;
			order = 3;
			score = 100;
		}
		reset();
	});
}
// let j=0;

function reset() {
	colors = generateRandomColors(numSquares);
	//pick a new random color from array
	pickedColor = pickColor();
	//change colorDisplay to match picked Color
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "New Colors";
	messageDisplay.textContent = "";
	//change colors of squares
	for(let i = 0; i < squares.length; i++){
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.background = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
	if (order === 1) {
		score = 50;
	}
	else {
		score = 100;
	}
	// h1.style.backgroundColor = "steelblue";
	h1.style.backgroundImage = "linear-gradient(90deg, rgb(0,22,14) 0%, rgb(23,215,178) 100%)";
	stripe.style.backgroundImage = "linear-gradient(90deg, rgba(15,158,130,1) 0%, rgba(0,22,14,1) 100%)";
	body.style.backgroundColor = "#232323";
	points.style.color = "#a4f5d3";
	scoreDisplay.textContent = "0";
}

resetButton.addEventListener("click", function() {
	reset();
});

colorDisplay.textContent = pickedColor;

for(let i = 0; i < squares.length; i++){
	// add initial colors to squares
	squares[i].style.backgroundColor = colors[i];

	//add click listeners to squares
	squares[i].addEventListener("click", function() {
		let clickedColor = this.style.backgroundColor;
		if(clickedColor === pickedColor) {
			if (((score > 40) && (order === 1)) || (score === 100)) {
				messageDisplay.textContent = "Hey Champ! Free tonight?!";
			}
			else if ((score === 40) && (order === 1)) {
				messageDisplay.textContent = "Nice!";
			}
			else if (((score >= 30) && (order === 1)) || (score >=80) && (order === 3)) {
				messageDisplay.textContent = "Nice Try!";
			}
			else if ((score >= 60) && (order === 3)) {
				messageDisplay.textContent = "Fullscore is not for everyone!";
			}
			else {
				messageDisplay.textContent = "Ew! Wipe your glasses bruh!";
			}
			resetButton.textContent = "Play Again?";
			changeColors(clickedColor);
			// h1.style.backgroundColor = clickedColor;
			h1.style.backgroundImage = "linear-gradient(90deg, rgb(0,0,0) 0%," + clickedColor + " 50%, rgb(255,255,255) 100%)";
			stripe.style.backgroundImage = "linear-gradient(90deg, rgb(255,255,255) 0%," + clickedColor + "50%, rgb(0,0,0) 100%)";
			body.style.backgroundColor = "white";
			points.style.color = clickedColor;
			//scoring
			scoreDisplay.textContent = score;
		} else {
            // this.style.backgroundColor = "#232323";
            $(this).slideUp(1000);
			messageDisplay.textContent = "Oops!!";
			score = score - 10;
		}
	});
}

function changeColors(color) {
	for(let i = 0; i < squares.length; i++) {
        if ( (i>4)&&(order === 1)){
            squares[i].style.display = "none";
        }
        else {
            squares[i].style.display = "block";
        }
		squares[i].style.backgroundColor = color;
	}
}

function pickColor() {
	let random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num) {
	let arr = [];
	for(var i = 0; i < num; i++) {
		arr.push(randomColor());
	}
	return arr;
}

function randomColor() {
	let r = Math.floor(Math.random() * 256);
	let g = Math.floor(Math.random() * 256);
	let b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}
