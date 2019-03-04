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

    let tableEntities = document.getElementById("table_entities");
    let entitesQte = bufferQte.value+1;

    for(int i=1;i<entitesQte;i++)
    {
        // Create an empty <tr> element and add it to the 1st position of the table:
        let row = tableEntities.insertRow(i);
        // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
        let entitieCell = row.insertCell(i);
        let speedCell = row.insertCell(i+1);

        // Add some text to the new cells:
        cell1.innerHTML = "tes";
        cell2.innerHTML = "t";
    }

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
