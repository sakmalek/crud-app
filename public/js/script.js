document.addEventListener(
    "DOMContentLoaded",
    () => {
        console.log("crud-app JS imported successfully!");
    },
    false
);


function showHide(id) {
    var element = document.getElementById(id);
    if (element.style.display === "none") {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
}

function show(id) {
    var element = document.getElementById(id);
    element.style.display = "block";
}