let stop = false;

window.addEventListener('load', function() {

    let bufferQte = document.getElementById("bufferQte");
    let bufferQteLabel = document.getElementById("bufferQteLabel");

    bufferQte.min = MIN_BUFFER_QTE;
    bufferQte.max = MAX_BUFFER_QTE;
    bufferQte.value = DEFAULT_VALUE_BUFFER_QTE;

    bufferQte.addEventListener("input", setBufferQte);
    bufferQte.addEventListener("input", function(e) {
        updateLabel(e.srcElement, bufferQteLabel);
    });

    let btnSync = document.getElementById("btnSync");
    let btnRestart = document.getElementById("btnRestart");
    let btnStop = document.getElementById("btnStop");

    btnSync.addEventListener("click", function() {
        synchronize();
    });
    btnRestart.addEventListener("click", function() {
        restart(bufferQte.value);
    });
    btnStop.addEventListener("click", function() {
        logicStopButton();
    });

    updateLabels();

}, false);

function updateLabels() {
    updateLabel(bufferQte, bufferQteLabel);
    entitesSpeedLogic();
}

function setBufferQte(e) {
    reset(int(e.srcElement.value));
    entitesSpeedLogic();
}

function updateLabel(range, label) {
    label.innerHTML = range.value;
}

function changeEntitieSpeed(element) {
    producerConsumer.entities[parseInt(element.id)].speed = parseInt(element.value);
}

function entitesSpeedLogic() {
    //remove old rows
    let elmtTable = document.getElementById('table_entities');
    let tableRows = elmtTable.getElementsByTagName('tr');
    let rowCount = tableRows.length;

    for (let x = rowCount - 1; x > 0; x--) {
        elmtTable.removeChild(tableRows[x]);
    }

    // add new rows
    let entitiesQte = int(bufferQte.value) + 1;
    for (let i = 0; i < entitiesQte; i++) {
        let tr = document.createElement("tr");
        let tdEntities = document.createElement("td");
        tdEntities.style = "text-align:center";
        tdEntities.innerHTML = i;
        let tdSpeed = document.createElement("td");
        tdSpeed.style = "text-align:center";
        let input = document.createElement("input");
        input.id = i;
        input.type = "number";
        input.min = MIN_SPEED_ENTITY;
        input.max = MAX_SPEED_ENTITY;
        input.value = producerConsumer.entities[i].speed;
        input.addEventListener("change", function(e) {
            changeEntitieSpeed(e.srcElement);
        });
        tdSpeed.appendChild(input);

        tr.appendChild(tdEntities);
        tr.appendChild(tdSpeed);

        elmtTable.appendChild(tr);
    }
}

function logicStopButton() {
    if (stop) {
        btnStop.innerText = "Stop";
        loop();
    } else {
        btnStop.innerText = "Resume";
        noLoop();
    }
    stop ^= true;
}

function restart(bufferQuantity) {
    // quantity is true, but donno why it's bugged
    reset(bufferQuantity);
}

function synchronize() {
    // TODO
}