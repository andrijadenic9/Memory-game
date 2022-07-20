// ? make some html
let wrapp = document.querySelector("#wrapp");
let message = document.querySelector('.end-message');
let textWrap = '<div class="container"></div';
wrapp.innerHTML = textWrap;

// ? setup variables
let container = document.querySelector(".container");
let boxes;
let backs;
let fronts;
let clicks = 0;
let score = 0;
let twoDivs = [];

// ? make me 16 divs inside container function
makeGame(16);
function makeGame(cards) {
	let string = '';

	// ? an array with 16 elements, each of which is repeated 2 times
	let allNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];

	for (let i = 0; i < cards; i++) {
		let random = Math.floor(Math.random() * allNumbers.length);
		string += '<div class="box"><div class="back"><img src="/images/' + allNumbers[random] + '.png"></div><div class="front visible"><img src="/images/' + allNumbers[random] + '.png"></div></div>';

		// ? every time you create a div with an image, remove that image from the array so it doesn't repeat itself
		allNumbers.splice(random, 1);
	}
	container.innerHTML = string;

	boxes = document.querySelectorAll(".box");
	backs = document.querySelectorAll(".back");
	fronts = document.querySelectorAll(".front");

	// ? event listeners for all front cards
	for (let i = 0; i < boxes.length; i++) {
		fronts[i].addEventListener("click", startRotate);
	}
}

function startRotate() {

	// ? increse clicks so I can count them, and push this into an array
	clicks++;
	twoDivs.push(this);
	if (this.classList.contains("front")) {
		this.classList.remove("visible");
		this.classList.add("hidden");
	}

	// ? on second click remove events on all front cards
	if (clicks === 2) {
		for (let i = 0; i < boxes.length; i++) {
			fronts[i].removeEventListener("click", startRotate);
		}

		// ? and check if two cards user selected are same, if so, increase score
		if (twoDivs[0].innerHTML == twoDivs[1].innerHTML) {
			score++;

			// ? when score is 8, game is over, remove all events and display message
			if (score === 8) {
				message.style.display = 'block';
				for (let i = 0; i < boxes.length; i++) {
					fronts[i].removeEventListener("click", startRotate);
				}

				// ? after 4000 seconds call funciton that restart game
				setTimeout(() => resetGame(), 5000);
			}
			reset();

			// ? if two cards user selected aren't same, just toggle display view
		} else {
			setTimeout(function () {
				twoDivs[0].classList.remove("hidden");
				twoDivs[0].classList.add("visible");
				twoDivs[1].classList.remove("hidden");
				twoDivs[1].classList.add("visible");
				reset();
			}, 800);
		}
	}
}

// ? reset array and clicks after checking, and return events on front of all cards
function reset() {
	twoDivs.length = 0;
	clicks = 0;
	for (let i = 0; i < boxes.length; i++) {
		fronts[i].addEventListener("click", startRotate);
	}
}

// ? reset game from start, set score from 0 and make layout again
function resetGame() {
	reset();
	score = 0;
	container.innerHTML = '';
	message.style.display = 'none';
	makeGame(16);
}
