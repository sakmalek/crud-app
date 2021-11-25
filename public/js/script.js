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

function searchInSuggestionList() {
    var input = document.getElementById("search-sl");
    var filter = input.value.toLowerCase();
    var nodes = document.getElementsByClassName('nft-target');

    for (i = 0; i < nodes.length; i++) {
        if (nodes[i].innerText.toLowerCase().includes(filter)) {
            nodes[i].style.display = "block";
        } else {
            nodes[i].style.display = "none";
        }
    }
}