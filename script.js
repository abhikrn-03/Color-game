let order = 2;
let numSquares = 15;
let score = 150;
let colors = generateRandomColors(numSquares);
let squares = document.querySelectorAll(".square");
let pickedColor = pickColor();
let colorDisplay = document.getElementById("colorDisplay");
let messageDisplay = document.querySelector("#message");
let h1 = document.querySelector("h1");
let body = document.querySelector("body");
let navbar = document.querySelector(".navbar");
let button = document.querySelector("button");
let resetButton = document.querySelector("#reset");
let modeButtons = document.querySelectorAll(".mode");
let theme = document.querySelector(".theme");
let scoreDisplay = document.getElementById("score");
let footer = document.querySelector(".footer");
let footerlink = document.querySelector(".footer-link");
let fb = document.querySelector("#fb");

for(let i = 0; i < modeButtons.length; i++) {
	modeButtons[i].addEventListener("click", function() {
		modeButtons[0].classList.remove("selected");
		modeButtons[1].classList.remove("selected");
		modeButtons[2].classList.remove("selected");
		this.classList.add("selected");
		if (this.textContent === "Easy") {
			numSquares = 5;
			order = 1;
			score = 50;
		}
		else if (this.textContent === "Hard") {
			numSquares = 15;
			order = 2;
			score = 150;
		}
		else {
			numSquares = 10;
			order = 3;
			score = 100;
		}
		reset();
	});
}

function reset() {
	colors = generateRandomColors(numSquares);
	//pick a new random color from array
	pickedColor = pickColor();
	//change colorDisplay to match picked Color
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "New Game";
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
	else if (order === 2) {
		score = 150;
	}
	else {
		score = 100;
	}
	h1.style.backgroundImage = "linear-gradient(90deg, rgb(0,22,14) 0%, rgb(23,215,178) 100%)";
	navbar.style.backgroundImage = "linear-gradient(90deg, rgba(15,158,130,1) 0%, rgba(0,22,14,1) 100%)";
	button.style.backgroundImage = "linear-gradient(90deg, rgb(0,22,14) 0%, rgb(23,215,178) 100%)";
	resetButton.style.backgroundImage = "linear-gradient(90deg, rgb(0,22,14) 0%, rgb(23,215,178) 100%)";
	scoreDisplay.textContent = "0";
}

resetButton.addEventListener("click", function() {
	reset();
});

theme.addEventListener("click", function(){
	body.classList.toggle("dark");
	footer.classList.toggle("grey");
	footerlink.classList.toggle("light");
	fb.classList.toggle("light");
});

colorDisplay.textContent = pickedColor;

for(let i = 0; i < squares.length; i++){
	// add initial colors to squares
	squares[i].style.backgroundColor = colors[i];

	//add click listeners to squares
	squares[i].addEventListener("click", function() {
		let clickedColor = this.style.backgroundColor;
		if(clickedColor === pickedColor) {
			if (((score > 40) && (order === 1)) || ((score === 100)&&(order === 3))||((score >= 140)&&(order === 2))) {
				messageDisplay.textContent = "Hey Champ! Free tonight?!";
			}
			else if ((score === 40) && (order === 1)) {
				messageDisplay.textContent = "Nice!";
			}
			else if (((score >= 30) && (order === 1)) || ((score >=80) && (order === 3))||((score >= 120)&&(order === 2))) {
				messageDisplay.textContent = "Nice Try!";
			}
			else if (((score >= 60) && (order === 3))||((score >= 100)&&(order === 2))) {
				messageDisplay.textContent = "Fullscore is not for everyone!";
			}
			else {
				messageDisplay.textContent = "Ew! Wipe your glasses bruh!";
			}
			resetButton.textContent = "Restart";
			changeColors(clickedColor);
			h1.style.backgroundImage = "linear-gradient(90deg, rgb(0,0,0) 0%," + clickedColor + " 50%, rgb(255,255,255) 100%)";
			navbar.style.backgroundImage = "linear-gradient(90deg, rgb(255,255,255) 0%," + clickedColor + "50%, rgb(0,0,0) 100%)";
			button.style.backgroundImage = "linear-gradient(90deg, rgb(0,0,0) 0%," + clickedColor + " 50%, rgb(255,255,255) 100%)";
			resetButton.style.backgroundImage = "linear-gradient(90deg, rgb(0,0,0) 0%," + clickedColor + " 50%, rgb(255,255,255) 100%)";
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
				else if ( (i>9)&&(order === 3)){
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

function togglenav() {
  let x = document.getElementById("topnav");
  if (x.className === "navbar") {
    x.className += " responsive";
  } else {
    x.className = "navbar";
  }
}
