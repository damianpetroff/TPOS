window.addEventListener('load', function () {
    document.getElementById("lastModified").innerHTML = getFormattedDate(new Date(document.lastModified));

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

function forceTwoDigits(number)
{
    if(number<10)
    {
        return '0'+str(number);
    }
    return number;
}