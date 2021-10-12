let url = window.location.search;
let urlId = url.slice(4)

console.log(urlId);

/**************     Creating Title, poster and description of the movie    ***************************/

let poster = document.querySelector(".poster");
let about = document.querySelector(".about");
let description = document.querySelector(".description");

let request = new XMLHttpRequest();
request.open("GET", `http://api.tvmaze.com/shows/${urlId}`);
request.send();

request.onload = function() {
    let data = JSON.parse(request.responseText);
    console.log(data);
    let title = document.createElement("div");
    let img = document.createElement("img");
    let h1 = document.querySelector("h1");
    img.className = "show-img";
    poster.className = "col-lg-6 col-md-6 col-sm-12"
    img.setAttribute("src", data.image.original);
    h1.textContent = data.name;
    title.appendChild(img);
    poster.appendChild(title);
    description.innerHTML = data.summary;
};

/********************       Getting season information        **************************/

let season = document.querySelector("#seasons h3")
let divSeason = document.querySelector("#seasons")
console.log(season)
let ulSeason = document.createElement("ul");

let seasonsRequest = new XMLHttpRequest();
seasonsRequest.open("GET", `http://api.tvmaze.com/shows/${urlId}/seasons`);
seasonsRequest.send();

seasonsRequest.onload = function() {
    let data = JSON.parse(seasonsRequest.responseText);
    console.log(data);
    season.textContent = `Seasons (${data.length})`;
    divSeason.appendChild(ulSeason);
    for (let i = 0; i < data.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${data[i].premiereDate} - ${data[i].endDate}`;
        ulSeason.appendChild(li);
    }
};

/********************       Getting information about actors       **************************/

let cast = document.querySelector("#cast h3");
let castDiv = document.querySelector("#cast")
let ulCast = document.createElement("ul");

let castRequest = new XMLHttpRequest();
castRequest.open("GET", `http://api.tvmaze.com/shows/${urlId}/cast`);
castRequest.send();

castRequest.onload = function() {
    let data = JSON.parse(castRequest.responseText);
    console.log(data);
    cast.textContent = "Cast";
    castDiv.appendChild(ulCast);
    for (let i = 0; i < 7; i++) {
        let li = document.createElement("li");
        li.textContent = `${data[i].person.name} (${data[i].character.name})`;
        ulCast.appendChild(li);
    }
};

/********************       Getting information about crew of the movie       **************************/

let crew = document.querySelector("#crew h3");
let crewDiv = document.querySelector("#crew")
let ulCrew = document.createElement("ul");

let crewRequest = new XMLHttpRequest();
crewRequest.open("GET", `http://api.tvmaze.com/shows/${urlId}/crew`);
crewRequest.send();

crewRequest.onload = function() {
    let data = JSON.parse(crewRequest.responseText)
    console.log(data);
    crew.textContent = "Crew";
    crewDiv.appendChild(ulCrew);
    for (let i = 0; i < 5; i++) {
        let li = document.createElement("li");
        li.textContent = `${data[i].type} : ${data[i].person.name}`;
        ulCrew.appendChild(li);
    }
}

/********************       Getting information about crew of the movie       **************************/

let aka = document.querySelector("#aka h3");
let akaDiv = document.querySelector("#aka");
let ulAka = document.createElement("ul");

let akaRequest = new XMLHttpRequest();
akaRequest.open("GET", `http://api.tvmaze.com/shows/${urlId}/akas`)
akaRequest.send();

akaRequest.onload = function() {
    let data = JSON.parse(akaRequest.responseText);
    console.log(data);
    aka.textContent = "AKA's"
    akaDiv.appendChild(ulAka);
    for (let i = 0; i < 3; i++) {
        let li = document.createElement("li");
        li.textContent = `${data[i].name} (${data[i].country.name})`;
        ulAka.appendChild(li);
    }
}

/********************       Creating dropdown menu       **************************/

let input = document.querySelector(".form-control");
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
            li.textContent = data[i].show.name;
            link.appendChild(li)
            ulSearch.appendChild(link);
        }
    }
}
input.addEventListener("keyup", search);