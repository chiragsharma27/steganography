function showOptions() {
    var actionType = document.getElementById("actionType").value;
    var encodeOptions = document.getElementById("encodeOptions");
    var decodeOptions = document.getElementById("decodeOptions");

    if (actionType === "encode") {
        encodeOptions.style.display = "none";
        decodeOptions.style.display = "none";
    } else {
        encodeOptions.style.display = "none";
        decodeOptions.style.display = "none";
    }
}
