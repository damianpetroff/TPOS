window.addEventListener('load', function () {

    let bufferQte = document.getElementById("bufferQte");
    let bufferQteLabel = document.getElementById("bufferQteLabel");

    bufferQte.min = MINBUFFERQTE;
    bufferQte.max = MAXBUFFERQTE;
    bufferQte.value = DEFAULTVALUEBUFFERQTE;

    bufferQte.addEventListener("input", setBufferQte);
    bufferQte.addEventListener("input", function(e) { updateLabel(e.srcElement, bufferQteLabel); });

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