// Blank 
let blankX = 200,
	blankY = 200;
let x = 0,
	y = 0;

// For x coordinate 
let posX = [0, 100, 200, 0, 100, 200, 0, 100, 200];
// For y coordinate 
let posY = [0, 0, 0, 100, 100, 100, 200, 200, 200];

let move = 0; // Count total moves 
let tempX = 0,
	tempY = 0;
let boxes, totalMoves;
let isWin = false;

window.addEventListener('load', (event) => {
	let box1 = document.getElementById('main');
	boxes = box1.querySelectorAll('.items');
	totalMoves = document.getElementById('moveLabel');

	for (let i = 0; i < posX.length; i++) {
		Object.assign(boxes[i].style, {
			top: posY[i] + 'px',
			left: posX[i] + 'px',
		})
	}
	// Timer
	let i = 3;
	let timerDiv = document.getElementById('countDown');
	let timer = setInterval(function () {
		timerDiv.textContent = i--;
		if (i == -2) {
			clearInterval(timer);
			refresh();
			// last Box is hide. This box is show when the isWin is true
			boxes[8].style.display = 'none'

			timerDiv.textContent = '';
			timerDiv.style.zIndex = '-1';
		}
	}, 1000);

	// Show full image for hints
	document.querySelector(' .button-container #view').addEventListener('click', event => {
		document.querySelector('#full').style.display = 'block';
		setTimeout(() => {
			document.querySelector('#full').style.display = 'none';
		}, 2000);
	})

	document.querySelector('#restart').addEventListener('click',(event)=>{
		refresh();
	})
	// console.log(boxes)
	// add Event on boxes
	boxes.forEach((box) =>{
		box.addEventListener('click', function (event) {
				x = box.offsetLeft;
				y = box.offsetTop;
				tempX = blankX - x;
				tempY = blankY - y;
				if ((((tempX == -100 || tempX == 100) && tempY == 0) || ((tempY == -100 || tempY == 100) && tempX == 0)) && !isWin) {
					box.style.top = blankY + "px";
					box.style.left = blankX + "px";
					blankX = x;
					blankY = y;
					move++;
					totalMoves.textContent = "Moves : " + move;
				}
				// win function call
				win();
			}  // AddEventListener end
		)
	}) // forEach end
}) // Window end

function refresh() {
	move = 0;
	isWin = false;
	document.getElementById('msg').textContent = "";
	boxes[8].style.display = 'none';
	totalMoves.textContent = "Moves : 0";

	randomIndex();
	for (let i = 0; i < posX.length - 1; i++) {
		Object.assign(boxes[i].style, {
			top: posY[randIndex[i]] + 'px',
			left: posX[randIndex[i]] + 'px',
		})
	}
	// randIndex last index value for blank location
	blankX = posX[randIndex[8]];
	blankY = posY[randIndex[8]];
	// Again randIndex array all items contain -1 value
	randIndex = [-1, -1, -1, -1, -1, -1, -1, -1, -1]
}

//  Generates random index values
let randIndex = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
function randomIndex() {
	let m = 0;
	while (true) {
		let index = Math.floor(Math.random() * 9); // 0 to 8 value
		if (randIndex[index] == -1) {
			randIndex[index] = m;
			m++;
		}
		if (m == 9) // When randIndex array items does not contain -1 value then exit from this infinite loop
			break;
	}
}

function win() {
	let full = 1;
	for (let i = 0; i < posX.length - 1; i++) {
		if (boxes[i].offsetLeft == posX[i] && boxes[i].offsetTop == posY[i]) {
			full += 1;
		}
	}
	if (full == 8) {
		isWin = true;
		document.getElementById('msg').textContent = 'Congratulations! You won.';
		box[8].style.display = 'block'
	}
}

//  Show box number  => toggle button code
function clickButton() {
	toggle = document.getElementById('toggle');
	let num = document.getElementsByClassName("number");
	let circle = toggle.firstElementChild;
	pos1 = circle.offsetLeft;
	if (pos1 == -2) {
		circle.style.left = 12 + "px";
		toggle.style.backgroundColor = "blue";
		// show box number
		for (let i = 0; i < num.length; i++)
			num[i].style.display = "block";
	} else {
		circle.style.left = -2 + "px";
		toggle.style.backgroundColor = "gray";
		// Hide box number
		for (let i = 0; i < num.length; i++)
			num[i].style.display = "none";
	}
}