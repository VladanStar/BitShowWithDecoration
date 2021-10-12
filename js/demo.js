/********************       Creating landing page       **************************/

let input = document.querySelector(".form-control");
let div = document.querySelector(".row");

let request = new XMLHttpRequest();
request.open("GET", "http://api.tvmaze.com/shows");
request.send();

request.onload = function() {
    let data = JSON.parse(request.responseText);
    console.log(data);
    data.sort((a, b) => {
        if (a.rating.average > b.rating.average) {
            return -1;
        } else {
            return 1;
        }
    });
    console.log(data);
    for (let i = 0; i < 50; i++) {
        let img = document.createElement("img");
        let h3 = document.createElement("h3");
        let title = document.createElement("div");
        let link = document.createElement("a");
        let imgLink = document.createElement("a");
        imgLink.setAttribute("href", `profile.html?id=${data[i].id}`)
        //imgLink.setAttribute("target", "_blank")
        link.setAttribute("href", `profile.html?id=${data[i].id}`);
        link.setAttribute("target", "_blank");
        title.className = "col-sm-12 col-md-4 col-lg-3 title";
        img.setAttribute("src", data[i].image.medium);
        img.setAttribute('class','imgborder');
        h3.textContent = data[i].name;
        link.appendChild(h3);
        imgLink.appendChild(img)
        title.appendChild(imgLink);
        title.appendChild(link);
        div.appendChild(title);
    }
};

/********************       Creating dropdown menu       **************************/

let searchDiv = document.querySelector(".form-inline");
let ulSearch = document.createElement("ul");
ulSearch.className = "searcher";

let search = function() {
    let request = new XMLHttpRequest();
    request.open("GET", `http://api.tvmaze.com/search/shows?q=${input.value}`);
    request.send();

    request.onload = function() {
        let data = JSON.parse(request.responseText);
        console.log(data);
        searchDiv.appendChild(ulSearch);
        ulSearch.innerHTML = "";
        for (let i = 0; i < data.length; i++) {
            let li = document.createElement("li");
            let link = document.createElement("a");
            link.setAttribute("href", `profile.html?id=${data[i].show.id}`)
            link.setAttribute("target", "_blank")
            li.textContent = data[i].show.name;
            link.appendChild(li)
            ulSearch.appendChild(link);
        }
    }
}
input.addEventListener("keyup", search);