gamestates = {
	CONTINUE: 0,
	WIN: 1,
	TIE: -1,
};

function gameOverCheck() {
	// grid = [
	// (0,0) (0,1), (0,2)	
	// (1,0) (1,1), (1,2)
	// (2,0) (2,1), (2,2)
	// ]
	var grid = [ [0, 0, 0], [0, 0, 0], [0, 0, 0] ];

	// fill this grid with the values from the button text
	for (var row = 0; row < 3; row ++) {
		for (var col = 0; col < 3; col ++) {
			var button = document.getElementById("Button" + (3 * row + col + 1));
			if (button.innerHTML === "X") {
				grid[row][col] = 1;
			} else if (button.innerHTML === "O") {
				grid[row][col] = -1;
			}
		}
	}
	// access grid at (0,0) with grid[0][0], (1,2) with grid[1][2]
	for (var row = 0; row < 3; row ++) {
		//operating on row
		var sum = 0;
		// sum up value of grid in columns for this row
		for (var col = 0; col < 3; col ++) {
			sum = sum + grid[row][col];
		}
		// check if win for this row
		if (sum === -3 || sum === 3) {
			return gamestates.WIN;
		}
	}
	for (var col = 0; col < 3; col ++) {
		//operating on row
		var sum = 0;
		// sum up value of grid in columns for this row
		for (var row = 0; row < 3; row ++) {
			sum = sum + grid[row][col];
		}
		// check if win for this row
		if (sum === -3 || sum === 3) {
			return gamestates.WIN;
		}
	}
	var sumDia1 = 0;
	for (var i = 0; i < 3; i ++) {
		sumDia1 = sumDia1 + grid[i][i];
	}
	var sumDia2 = 0;
	for (var i = 0; i < 3; i ++) {
		sumDia2 = sumDia2 + grid[i][2 - i];
	}
	if (sumDia1 === -3 || sumDia2 === -3 || sumDia1 === 3 || sumDia2 === 3) {
		return gamestates.WIN;
	}
	// test if all buttons not 0 return 
	for (var row = 0; row < 3; row ++) {
		//operating on row
		for (var col = 0; col < 3; col ++) {
			if (grid[row][col] === 0) {
				return gamestates.CONTINUE;
			}
		}
	}
	// if cannot continue, it is tie game
	return gamestates.TIE;
};

function buttonClicked(buttonId) {
	// change button to current player
	var message = document.getElementById("Message")
	var player = document.getElementById("CurrentPlayer");
	var button = document.getElementById(buttonId);

	// check if button is enabled, if not, return from this function without doing anything
	if (button.innerHTML === "X" || button.innerHTML === "O") {
		return;
	}
 
	button.innerHTML = player.innerHTML;
	
	// check if it's a winning click
	var hasWinner = gameOverCheck();
	if (hasWinner === gamestates.WIN) {
		var refreshButton = document.getElementById("Refresh");
		message.innerHTML = "The winner is player " + player.innerHTML;
		refreshButton.style.visibility = "visible";
		return;
	} else if (hasWinner === gamestates.TIE) {
		var refreshButton = document.getElementById("Refresh");
		message.innerHTML = "It is a tie game";
		refreshButton.style.visibility = "visible";
		return;
	}

	// when clicked change to other player
	if (player.innerHTML === "X") {
		player.innerHTML = "O";
	} else {
		player.innerHTML = "X";
	}
};

function refreshPage() {
	window.location.reload();
};

function pageLoaded() {
	
	// All buttons are empty, player X goes first

	var player = document.getElementById("CurrentPlayer");
	player.innerHTML = "X";

	for (var i = 1; i <= 9; i++) {
		var button = document.getElementById("Button" + i);
		button.onclick = buttonClicked.bind(this, "Button" + i);
	}
	var button = document.getElementById("Refresh");
	button.onclick = refreshPage;
};

window.onload = pageLoaded;
