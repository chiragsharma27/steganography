function showOptions() {
    var actionType = document.getElementById("actionType").value;
    //var encodeOptions = document.getElementById("encodeOptions");
    //var decodeOptions = document.getElementById("decodeOptions");

    if (actionType === "encode") {
        encodeOptions.style.display = "block";
        decodeOptions.style.display = "none";
    } else if (actionType === "decode") {
        decodeOptions.style.display = "block";
        encodeOptions.style.display = "none";
    }
}

