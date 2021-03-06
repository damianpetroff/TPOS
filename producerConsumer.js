let producerConsumer;
let logHistory;
let p5Canvas;
let realCanvas;

function setup() {
	// width / height are the screen size
	p5Canvas = createCanvas(WIDTH, HEIGHT);
	p5Canvas.parent("producerConsumerCanvasContainer");
	realCanvas = document.getElementById("defaultCanvas0");

	realCanvas.style.width = "100%";
	document.body.onresize = widthChange;
	widthChange();
}

function reset(nbBuffers, bufferSize, entitiesLabels, sync) {
	logHistory = new LogHistory(logHistoryDiv);
	producerConsumer = new ProducerConsumer(nbBuffers, bufferSize, entitiesLabels, sync);
    loop();
}

function widthChange() {
	let ratio = p5Canvas.width / p5Canvas.height;
	let container = document.getElementById("producerConsumerCanvasContainer");
	document.getElementById("defaultCanvas0").style.height = container.offsetWidth / ratio + "px";
}

function draw() {
	if (producerConsumer) {
		producerConsumer.update();
		producerConsumer.draw();
	}
}

function toggleFullScreen() {
	let isInFullScreen =
		(document.fullscreenElement && document.fullscreenElement !== null) ||
		(document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
		(document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
		(document.msFullscreenElement && document.msFullscreenElement !== null);

	if (!isInFullScreen) {
		if (canvas.requestFullscreen) {
			canvas.requestFullscreen();
		} else if (canvas.mozRequestFullScreen) {
			canvas.mozRequestFullScreen();
		} else if (canvas.webkitRequestFullScreen) {
			canvas.webkitRequestFullScreen();
		} else if (canvas.msRequestFullscreen) {
			canvas.msRequestFullscreen();
		}
	} else {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.msExitFullscreen) {
			document.msExitFullscreen();
		}
	}
}
