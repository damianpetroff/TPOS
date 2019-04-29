let pause;

let logHistoryDiv = document.getElementById("logHistoryDiv");
let clearLogHistory = document.getElementById("clearLogHistory");

let lastModified = document.getElementById("lastModified");

let syncOnlyFaded = document.getElementsByClassName("sync-only-faded");
let syncOnlyDisabled = document.getElementsByClassName("sync-only-disabled");

let bufferSyncRange = document.getElementById("bufferSyncRange");
let bufferSyncLabel = document.getElementById("bufferSyncLabel");
let bufferASyncLabel = document.getElementById("bufferASyncLabel");

let bufferQte = document.getElementById("bufferQte");
let bufferQteLabel = document.getElementById("bufferQteLabel");
let bufferSize = document.getElementById("bufferSize");
let bufferSizeLabel = document.getElementById("bufferSizeLabel");
let producerConsumerCanvasContainer = document.getElementById("producerConsumerCanvasContainer");

//Buttons
let btnRestart = document.getElementById("btnRestart");
let btnPause = document.getElementById("btnPause");

window.addEventListener('load', function() {
	lastModified.innerHTML = getFormattedDate(new Date(document.lastModified));

	producerConsumerCanvasContainer.addEventListener("click", toggleFullScreen);

	bufferQte.min = MIN_BUFFER_QTE;
	bufferQte.max = MAX_BUFFER_QTE;
	bufferQte.value = DEFAULT_BUFFER_QTE;

	bufferSize.min = MIN_BUFFER_SIZE;
	bufferSize.max = MAX_BUFFER_SIZE;
	bufferSize.value = DEFAULT_BUFFER_SIZE;

	bufferSyncRange.value = DEFAULT_MODE_SYNC ? 0 : 1;

	bufferQte.addEventListener("input", resetFromDOM);
	bufferQte.addEventListener("input", function(e) {
		updateLabel(e.srcElement, bufferQteLabel);
	});
	bufferSize.addEventListener("input", resetFromDOM);
	bufferSize.addEventListener("input", function(e) {
		updateLabel(e.srcElement, bufferSizeLabel);
	});

	bufferSyncRange.addEventListener("input", resetFromDOM);
	btnRestart.addEventListener("click", resetFromDOM);

	btnPause.addEventListener("click", function() {
		togglePause();
	});

	clearLogHistory.addEventListener("click", function() {
		logHistory.clear();
	});

	resetFromDOM();
	togglePause(false);

}, false);

function updateLabels() {
	updateLabel(bufferQte, bufferQteLabel);
	updateLabel(bufferSize, bufferSizeLabel);
}

function resetFromDOM() {
	if (!getSync()) {
		bufferQte.value = 1;
	}
	let entitiesLabels = entitesSpeedLogic();
	reset(parseInt(bufferQte.value), parseInt(bufferSize.value), entitiesLabels, getSync());
	togglePause(false);
	updateLabels();
	updateSync();
}

function updateLabel(range, label) {
	label.innerHTML = range.value;
}

function getFormattedDate(date) {
	var monthNames = [
		"January", "February", "March",
		"April", "May", "June", "July",
		"August", "September", "October",
		"November", "December"
	];

	var day = date.getDate();
	var monthIndex = date.getMonth();
	var year = date.getFullYear();
	var hour = date.getHours();
	var min = date.getMinutes();

	return day + ' ' + monthNames[monthIndex] + ' ' + year + ' at ' + forceTwoDigits(hour) + ':' + forceTwoDigits(min);
}

function forceTwoDigits(number) {
	if (number < 10) {
		return '0' + str(number);
	}
	return number;
}

function changeEntitySpeed(element) {
	producerConsumer.entities[parseInt(element.id)].setSpeed(parseInt(element.value));
}

function entitesSpeedLogic() {
	//remove old rows
	let table_entities = document.getElementById('table_entities');
	table_entities.innerHTML = "";

	let trEntities = document.createElement("tr");
	let trSpeed = document.createElement("tr");

	table_entities.appendChild(trEntities);
	table_entities.appendChild(trSpeed);

	let thEntities = document.createElement("th");
	thEntities.innerHTML = "Entity";
	trEntities.appendChild(thEntities);

	let thSpeed = document.createElement("th");
	thSpeed.innerHTML = "Speed";
	trSpeed.appendChild(thSpeed);

	let tab = [];

	// add new rows
	let entitiesQte = parseInt(bufferQte.value) + 1;
	for (let i = 0; i < entitiesQte; i++) {
		let tdEntities = document.createElement("td");
		tdEntities.classList.add("text-center");
		let entityLabel = document.createElement("div");
		entityLabel.id = "entity_label_" + i;
		entityLabel.classList.add("text-center", "circleBase");

		tab.push(entityLabel);

		tdEntities.appendChild(entityLabel);
		trEntities.appendChild(tdEntities);

		let tdSpeed = document.createElement("td");
		let input = document.createElement("input");
		input.id = i;
		input.type = "range";
		input.classList.add("custom-range");
		input.min = MIN_SPEED_ENTITY;
		input.max = MAX_SPEED_ENTITY;
		input.value = DEFAULT_SPEED_ENTITY;
		input.addEventListener("input", function(e) {
			changeEntitySpeed(e.srcElement);
			label.innerHTML = e.srcElement.value;
		});
		let label = document.createElement("label");
		label.innerHTML = input.value;
		tdSpeed.appendChild(input);
		tdSpeed.appendChild(label);
		trSpeed.appendChild(tdSpeed);
	}
	return tab;
}

function togglePause(b = undefined) {
	pause ^= true;
	if (b != undefined)
		pause = b;
	if (pause) {
		btnPause.innerText = "Resume";
		btnPause.classList.remove("btn-danger");
		btnPause.classList.add("btn-success");
		noLoop();
	} else {
		btnPause.innerText = "Pause";
		btnPause.classList.add("btn-danger");
		btnPause.classList.remove("btn-success");
		loop();
	}
}

function updateSync() {
	if (getSync()) {
		bufferSyncLabel.classList.remove("text-danger");
		bufferASyncLabel.classList.remove("text-success");

		bufferSyncLabel.classList.add("text-success");
		bufferASyncLabel.classList.add("text-danger");
	} else {
		bufferSyncLabel.classList.remove("text-success");
		bufferASyncLabel.classList.remove("text-danger");

		bufferSyncLabel.classList.add("text-danger");
		bufferASyncLabel.classList.add("text-success");
	}
	for (let i = 0; i < syncOnlyDisabled.length; i++) {
		let s = syncOnlyDisabled[i];
		if (getSync())
			s.removeAttribute("disabled")
		else
			s.setAttribute("disabled", "true")
	}
	for (let i = 0; i < syncOnlyFaded.length; i++) {
		let s = syncOnlyFaded[i];
		if (getSync())
			s.classList.remove("text-muted");
		else
			s.classList.add("text-muted");
	}
}

function getSync() {
	return bufferSyncRange.value == 0 ? true : false;
}
