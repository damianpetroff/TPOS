var stop = false;

window.addEventListener('load', function () {

    let bufferQte = document.getElementById("bufferQte");
    let bufferQteLabel = document.getElementById("bufferQteLabel");

    bufferQte.min = MINBUFFERQTE;
    bufferQte.max = MAXBUFFERQTE;
    bufferQte.value = DEFAULTVALUEBUFFERQTE;

    bufferQte.addEventListener("input", setBufferQte);
    bufferQte.addEventListener("input", function(e) { updateLabel(e.srcElement, bufferQteLabel); });


    let btnSync = document.getElementById("btnSync");
    let btnRestart = document.getElementById("btnRestart");
    let btnStop = document.getElementById("btnStop");

    btnSync.addEventListener("click", function(){ synchronize(); });
    btnRestart.addEventListener("click", function(){ restart(bufferQte.value); });
    btnStop.addEventListener("click", function(){ logicStopButton(); });


    updateLabels();

}, false);

function updateLabels()
{
    updateLabel(bufferQte, bufferQteLabel);
}

function setBufferQte(e)
{
    reset(int(e.srcElement.value));
}

function updateLabel(range, label)
{
    label.innerHTML = range.value;
}

function logicStopButton()
{
    if(stop)
    {
        stop = false;
        btnStop.innerText = "Stop";
        loop();
    }
    else
    {
        stop = true;
        btnStop.innerText = "Resume";
        noLoop();
    }
}

function restart(bufferQuantity)
{
    // quantity is true, but donno why it's bugged
    reset(bufferQuantity);
}

function synchronize()
{
  // TODO
}
