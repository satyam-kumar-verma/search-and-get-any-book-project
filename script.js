let inputEl = document.getElementById("searchInput");
let bottomHeadingEl = document.getElementById("bottomHeading");

let resultContainerEl = document.getElementById("searchResults");

let loading = document.getElementById("spinner");

function createAndAppendResults(eachItem) {
    let bookAndTitleContainer = document.createElement("div");
    bookAndTitleContainer.classList.add("mr-auto", "ml-auto");
    resultContainerEl.appendChild(bookAndTitleContainer);

    let imageEl = document.createElement("img");
    imageEl.src = eachItem.imageLink;
    imageEl.classList.add("book-img-style");
    bookAndTitleContainer.appendChild(imageEl);

    let authorName = document.createElement("p");
    authorName.textContent = eachItem.author;
    authorName.classList.add("title-style");
    bookAndTitleContainer.appendChild(authorName);

}

function sendAllData(search_results) {
    resultContainerEl.textContent = "";

    for (let eachItem of search_results) {
        createAndAppendResults(eachItem);
    }
}

function sendNotFoundData() {
    bottomHeadingEl.textContent = "No result found";
    bottomHeadingEl.classList.add("bottom-heading-center");
}

function makeCall(event) {
    let url = "https://apis.ccbp.in/book-store?title=" + inputEl.value;

    if (event.key === "Enter") {

        if (inputEl.value === "") {
            alert("input is empty");
            return true;
        }

        loading.classList.toggle("d-none");
        resultContainerEl.textContent = "";
        bottomHeadingEl.textContent = "";
        bottomHeadingEl.classList.remove("bottom-heading-center");

        let options = {
            method: "GET"
        };

        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                console.log(jsonData);
                let {
                    search_results
                } = jsonData;

                loading.classList.toggle("d-none");

                if (search_results.length === 0) {
                    sendNotFoundData();
                } else {
                    bottomHeadingEl.textContent = "Popular Books";
                    sendAllData(search_results);
                }
            });
    }

}

inputEl.addEventListener("keydown", makeCall);