let producerConsumer;


function setup() {
    let canvas = createCanvas(WIDTH, HEIGHT);
    canvas.parent("draw");
    producerConsumer = new ProducerConsumer(3, 1, 1);
    reset(DEFAULT_VALUE_BUFFER_QTE);
}

function reset(nbBuffers)
{
    producerConsumer = new ProducerConsumer(nbBuffers, 1, 1);
}

function draw() {
    background(42);
    producerConsumer.update();
    producerConsumer.draw();
}

function clickOn() {
	//Empty
}

function toggleFullScreen(){
	console.info("Toggle Fullscreen");
	var isInFullScreen =
		(document.fullscreenElement && document.fullscreenElement !== null) ||
	    (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
	    (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
	    (document.msFullscreenElement && document.msFullscreenElement !== null);

    if (!isInFullScreen)
    {
        if(canvas.requestFullscreen)
        {
          canvas.requestFullscreen();
        }
        else if(canvas.mozRequestFullScreen)
        {
    	  canvas.mozRequestFullScreen();
        }
        else if(canvas.webkitRequestFullScreen)
        {
          canvas.webkitRequestFullScreen();
        }
        else if(canvas.msRequestFullscreen)
        {
          canvas.msRequestFullscreen();
        }
    }
    else
    {
        if (document.exitFullscreen)
        {
            document.exitFullscreen();
        }
        else if (document.webkitExitFullscreen)
        {
            document.webkitExitFullscreen();
        }
        else if (document.mozCancelFullScreen)
        {
            document.mozCancelFullScreen();
        }
        else if (document.msExitFullscreen)
        {
            document.msExitFullscreen();
        }
    }
}
