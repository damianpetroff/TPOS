let pause;
let sync;

let lastModified = document.getElementById("lastModified");

let bufferQte = document.getElementById("bufferQte");
let bufferQteLabel = document.getElementById("bufferQteLabel");
let bufferSize = document.getElementById("bufferSize");
let bufferSizeLabel = document.getElementById("bufferSizeLabel");
let producerConsumerCanvasContainer = document.getElementById("producerConsumerCanvasContainer");

//Buttons
let btnSync = document.getElementById("btnSync");
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

    bufferQte.addEventListener("input", resetFromDOM);
    bufferQte.addEventListener("input", function(e) {
        updateLabel(e.srcElement, bufferQteLabel);
    });
    bufferSize.addEventListener("input", resetFromDOM);
    bufferSize.addEventListener("input", function(e) {
        updateLabel(e.srcElement, bufferSizeLabel);
    });

    btnSync.addEventListener("click", function() {
        toggleSynchronize();
    });
    btnRestart.addEventListener("click", function() {
        resetFromDOM();
        resetFlexWrap();
    });
    btnPause.addEventListener("click", function() {
        togglePause();
    });

    resetFromDOM();
    togglePause(false);
    toggleSynchronize(false);

}, false);

function updateLabels() {
    updateLabel(bufferQte, bufferQteLabel);
    updateLabel(bufferSize, bufferSizeLabel);
    resetFlexWrap();
}

function resetFromDOM() {
    let entitiesLabels = entitesSpeedLogic();
    reset(parseInt(bufferQte.value), parseInt(bufferSize.value), entitiesLabels);
    resetFlexWrap();
    updateLabels();
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
    thEntities.innerHTML = "Entité";
    trEntities.appendChild(thEntities);

    let thSpeed = document.createElement("th");
    thSpeed.innerHTML = "Vitesse";
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
        input.type = "number";
        input.min = MIN_SPEED_ENTITY;
        input.max = MAX_SPEED_ENTITY;
        input.value = DEFAULT_SPEED_ENTITY;
        input.addEventListener("input", function(e) {
            changeEntitySpeed(e.srcElement);
        });
        tdSpeed.appendChild(input);
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

function toggleSynchronize(b = undefined) {
    sync ^= true;
    if (b != undefined)
        sync = b;
    if (sync) {
        btnSync.innerText = "Synchrone";
        btnSync.classList.add("btn-dark");
        btnSync.classList.remove("btn-secondary");
    } else {
        btnSync.innerText = "Asynchrone";
        btnSync.classList.remove("btn-dark");
        btnSync.classList.add("btn-secondary");
    }
    producerConsumer.setSync(sync);
}

function resetFlexWrap() {
    let l = document.getElementById("entitiesConsumed");
    l.innerHTML = '';
}