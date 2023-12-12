let inputEl = document.getElementById("inputEl");
let resultText = document.getElementById("resultText");

let loading = document.getElementById("spinner");

let resultContainer = document.getElementById("resultContainer");

let randomColor;

function generateRandomColor(){
    let red = Math.ceil(Math.random()*255);
    let green = Math.ceil(Math.random()*255);
    let blue = Math.ceil(Math.random()*255);
    
    randomColor = `rgb(${red},${green},${blue})`;
}


function createAndAppendBookStyle(eachItem){

    generateRandomColor();

    let detailContainer = document.createElement("div");
    detailContainer.classList.add("col-5", "book-container", "mb-3");
    detailContainer.style.backgroundColor = randomColor;
    resultContainer.appendChild(detailContainer);

    let imageEl = document.createElement("img");
    imageEl.classList.add("img-style");
    imageEl.src= eachItem.imageLink;
    detailContainer.appendChild(imageEl);

    let nameAndAuthorDetailContainer = document.createElement("div");
    nameAndAuthorDetailContainer.classList.add("detail-container");
    detailContainer.appendChild(nameAndAuthorDetailContainer);

    let authorEl = document.createElement("p");
    authorEl.textContent = "Author: ";
    nameAndAuthorDetailContainer.appendChild(authorEl);

    let authorName = document.createElement("span");
    authorName.classList.add("detail-style");
    authorName.textContent = eachItem.author;
    authorEl.appendChild(authorName);

    let bookEl = document.createElement("p");
    bookEl.textContent = "Book name: ";
    nameAndAuthorDetailContainer.appendChild(bookEl);

    let bookName = document.createElement("span");
    bookName.classList.add("detail-style");
    bookName.textContent = eachItem.title;
    bookEl.appendChild(bookName);

}

function getAllData(search_results){

    resultText.textContent = "Popular Books";

    for(let eachItem of search_results){
        createAndAppendBookStyle(eachItem);
    }
}

function printNotFound(){
    resultText.textContent = "No Book Found";
}

function fetchData(event){
    if(event.key === "Enter"){

        loading.classList.toggle("d-none");
        resultContainer.textContent = "";
        resultText.textContent = "";

        let inputValue = event.target.value;

        if(inputValue === ""){
            alert("Please write something in searchbox");
            return true;
        }

        let options = {
            method: "GET"
        };

        let url = "https://apis.ccbp.in/book-store?title=" + inputValue;

        fetch(url, options)
        .then(function(response){
            return response.json();
        })
        .then(function(jsonData){
            console.log(jsonData);

            loading.classList.toggle("d-none");

            let {search_results} = jsonData;

            if(search_results.length === 0){
                printNotFound();
                return true;
            }
            else{
                getAllData(search_results);
            }

        })
    }
}

inputEl.addEventListener("keydown",fetchData);