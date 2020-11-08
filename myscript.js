//register the service worker when the js loads
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
} //if

// initialize variables after page loads
window.onload = function() {
    var search = document.getElementById("search").value;
    document.getElementById("main").innerHTML = "";
    document.getElementById("search").value = "";

    fetch('https://restcountries.eu/rest/v2/name/canada')
        .then(response => response.json())
        .then(data => updatePage(data));
    document.getElementById("searchtwo").style.display = "none";
    document.getElementById("searchthree").style.display = "none";
    document.getElementById("searchfour").style.display = "none";
    document.getElementById("searchbarstwo").style.display = "none";
    document.getElementById("searchbarsthree").style.display = "none";
    document.getElementById("searchbarsfour").style.display = "none";
    document.getElementById("help").style.display = "none";
    document.getElementById("lightbox").style.display = "none";
    document.getElementById("btn").style.display = "none";
    document.getElementById("startup").style.display = "none";


}; // window.onload
var showSearchBars = true;

function searchbars() {


    if (showSearchBars == true) {
        showSearchBars = false;
        document.getElementById("searchtwo").style.display = "inline";
        document.getElementById("searchthree").style.display = "inline";
        document.getElementById("searchfour").style.display = "inline";
        document.getElementById("searchbarstwo").style.display = "block";
        document.getElementById("searchbarsthree").style.display = "block";
        document.getElementById("searchbarsfour").style.display = "block";
        document.getElementById("help").style.display = "block";


        document.getElementById("filter").innerHTML = "Filtered Searches <i class='fas fa-angle-up'></i>";

    } else {
        showSearchBars = true;
        document.getElementById("searchtwo").style.display = "none";
        document.getElementById("searchthree").style.display = "none";
        document.getElementById("searchfour").style.display = "none";
        document.getElementById("searchbarstwo").style.display = "none";
        document.getElementById("searchbarsthree").style.display = "none";
        document.getElementById("searchbarsfour").style.display = "none";
        document.getElementById("help").style.display = "none";

        document.getElementById("filter").innerHTML = "Filtered Searches <i class='fas fa-angle-down'></i><br><br>";
    }
}

// get data from TV Maze
function fetchData() {
    var search = document.getElementById("search").value;
    document.getElementById("main").innerHTML = "";
    document.getElementById("search").value = "";

    fetch('https://restcountries.eu/rest/v2/name/' + search)
        .then(response => response.json())
        .then(data => updatePage(data));
    document.getElementById("searchtwo").style.display = "none";
    document.getElementById("searchthree").style.display = "none";
    document.getElementById("searchfour").style.display = "none";
    document.getElementById("searchbarstwo").style.display = "none";
    document.getElementById("searchbarsthree").style.display = "none";
    document.getElementById("searchbarsfour").style.display = "none";
    document.getElementById("help").style.display = "none";
    document.getElementById("btn").style.display = "block";
    document.getElementById("filter").innerHTML = "Filtered Searches <i class='fas fa-angle-down'></i><br><br>";
} //fetchData

// get data from TV Maze
function fetchAllData() {
    document.getElementById("main").innerHTML = "";
    document.getElementById("searchall").value = "";

    fetch('https://restcountries.eu/rest/v2/all')
        .then(response => response.json())
        .then(data => updatePage(data));
    document.getElementById("searchtwo").style.display = "none";
    document.getElementById("searchthree").style.display = "none";
    document.getElementById("searchfour").style.display = "none";
    document.getElementById("searchbarstwo").style.display = "none";
    document.getElementById("searchbarsthree").style.display = "none";
    document.getElementById("searchbarsfour").style.display = "none";
    document.getElementById("help").style.display = "none";
    document.getElementById("btn").style.display = "block";
    document.getElementById("filter").innerHTML = "Filtered Searches <i class='fas fa-angle-down'></i><br><br>";
} //fetchData

function fetchRegionData() {
    var searchtwo = document.getElementById("searchtwo").value;
    document.getElementById("main").innerHTML = "";
    document.getElementById("searchtwo").value = "";

    fetch('https://restcountries.eu/rest/v2/region/' + searchtwo)
        .then(response => response.json())
        .then(data => updatePage(data));
    document.getElementById("searchtwo").style.display = "none";
    document.getElementById("searchthree").style.display = "none";
    document.getElementById("searchfour").style.display = "none";
    document.getElementById("searchbarstwo").style.display = "none";
    document.getElementById("searchbarsthree").style.display = "none";
    document.getElementById("searchbarsfour").style.display = "none";
    document.getElementById("help").style.display = "none";
    document.getElementById("btn").style.display = "block";
    document.getElementById("filter").innerHTML = "Filtered Searches <i class='fas fa-angle-down'></i><br><br>";
}


function fetchLanguageData() {
    var searchthree = document.getElementById("searchthree").value;
    document.getElementById("main").innerHTML = "";
    document.getElementById("searchthree").value = "";

    fetch('https://restcountries.eu/rest/v2/lang/' + searchthree)
        .then(response => response.json())
        .then(data => updatePage(data));
    document.getElementById("searchtwo").style.display = "none";
    document.getElementById("searchthree").style.display = "none";
    document.getElementById("searchfour").style.display = "none";
    document.getElementById("searchbarstwo").style.display = "none";
    document.getElementById("searchbarsthree").style.display = "none";
    document.getElementById("searchbarsfour").style.display = "none";
    document.getElementById("help").style.display = "none";
    document.getElementById("btn").style.display = "block";
    document.getElementById("filter").innerHTML = "Filtered Searches <i class='fas fa-angle-down'></i><br><br>";
}

function fetchCapitalData() {
    var searchfour = document.getElementById("searchfour").value;
    document.getElementById("main").innerHTML = "";
    document.getElementById("searchfour").value = "";

    fetch('https://restcountries.eu/rest/v2/capital/' + searchfour)
        .then(response => response.json())
        .then(data => updatePage(data));
    document.getElementById("searchtwo").style.display = "none";
    document.getElementById("searchthree").style.display = "none";
    document.getElementById("searchfour").style.display = "none";
    document.getElementById("searchbarstwo").style.display = "none";
    document.getElementById("searchbarsthree").style.display = "none";
    document.getElementById("searchbarsfour").style.display = "none";
    document.getElementById("help").style.display = "none";
    document.getElementById("btn").style.display = "block";
    document.getElementById("filter").innerHTML = "Filtered Searches <i class='fas fa-angle-down'></i><br><br>";
}


// change the data displayed 
function updatePage(data) {
    var country;

    for (country in data) {
        createCountryProfile(data[country]);
    } //for
    document.getElementById("header").style.backgroundImage = "none";

} // updatePage

function showBorders(borders) {
    var b;

    var output = "";
    //var output = "<ul>";

    for (b in borders) {
        if (b != borders.length - 1) {
            output += borders[b] + ", ";
        } else {
            output += borders[b];
        }
    } //for
    //output += "</ul>"
    return output;

} //showGenres

function showCurrencies(currencies) {
    var c;

    var output = "";
    //var output = "<ul>";

    for (c in currencies) {
        if (c != currencies.length - 1) {
            output += currencies[c].name + ", ";
        } else {
            output += currencies[c].name;
        }
    } //for
    //output += "</ul>"
    return output;

} //showLanguages

function showLanguages(languages) {
    var l;

    var output = "";
    //var output = "<ul>";

    for (l in languages) {
        if (l != languages.length - 1) {
            output += languages[l].name + ", ";
        } else {
            output += languages[l].name;
        }
    } //for
    //output += "</ul>"
    return output;

} //showLanguages

//constructs one TV show entry on homepage
function createCountryProfile(countryJSON) {
    var elemMain = document.getElementById("main");

    var elemDiv = document.createElement("div");


    var elemCountryName = document.createElement("h2");
    var elemCountryNativeName = document.createElement("h3");
    elemCountryNativeName.classList.add("countrynativename"); //add a class to apply css to
    var elemFlag = document.createElement("img");
    elemFlag.alt = "country flag"
    elemFlag.classList.add("flag"); //add a class to apply css to
    var elemCapitalCityName = document.createElement("div");
    var elemPopulation = document.createElement("div");

    var elemContinentName = document.createElement("div");
    var elemSubRegionName = document.createElement("div");
    var elemBorders = document.createElement("div");
    var elemLanguages = document.createElement("div");
    var elemCurrency = document.createElement("div");



    //add JSON data to elements
    elemCountryName.innerHTML = countryJSON.name;

    if (countryJSON.nativeName == "") {
        elemCountryNativeName.innerHTML = "<br><br>";
    } else {
        elemCountryNativeName.innerHTML = " (" + countryJSON.nativeName + ")<br><br>";
    }

    elemFlag.src = countryJSON.flag;

    if (countryJSON.capital == "") {
        elemCapitalCityName.innerHTML = "<br>";
    } else {
        elemCapitalCityName.innerHTML = "<br><b class='subtitle'>Capital City: </b><p class='info'>" + countryJSON.capital + "</p>";
    }
  

  
    if (countryJSON.region == "") {
        elemContinentName.innerHTML = "";
    } else {
        elemContinentName.innerHTML = "<b class='subtitle'>Continent/Region: </b> <p class='info'>" + countryJSON.region + "</p>";
    }
    if (countryJSON.subregion == "") {
        elemSubRegionName.innerHTML = "";
    } else {
        elemSubRegionName.innerHTML = "<b class='subtitle'>Subregion: </b> <p class='info'>" + countryJSON.subregion + "</p>";
    }
    var nf = new Intl.NumberFormat();

    if (countryJSON.population == "") {
        elemPopulation.innerHTML = "";
    } else {
        elemPopulation.innerHTML = "<b class='subtitle'>Population: </b> <p class='info'>" + nf.format(countryJSON.population) + " people" + "</p>";
    }

    if (countryJSON.borders == "") {
        elemBorders.innerHTML = "";
    } else {
        elemBorders.innerHTML = "<b class='subtitle'>Bordering Countries: </b> <p class='info'>" + showBorders(countryJSON.borders) + "</p>";
    }




    if(countryJSON.currencies.name == ""){
	elemCurrency.innerHTML = "";
	}else{
     elemCurrency.innerHTML = "<b class='subtitle'>Currencies: </b> <p class='info'>" + showCurrencies(countryJSON.currencies) + "</p>";
	}
	
	if(countryJSON.languages.name == ""){
	elemLanguages.innerHTML = "<br><br><br>";
	}else{
		console.log = "showLanguages";
     elemLanguages.innerHTML = "<b class='subtitle'>Languages: </b> <p class='info'>" + showLanguages(countryJSON.languages) + "</p><br><br><br>";
	}

    //translations



    //add 5 elements to the div tag
    elemDiv.appendChild(elemCountryName);
    elemDiv.appendChild(elemCountryNativeName);
    elemDiv.appendChild(elemFlag);
    elemDiv.appendChild(elemCapitalCityName);
    elemDiv.appendChild(elemContinentName);
    elemDiv.appendChild(elemSubRegionName);
    elemDiv.appendChild(elemPopulation);
    elemDiv.appendChild(elemBorders);
	elemDiv.appendChild(elemCurrency);
    elemDiv.appendChild(elemLanguages);


    //get id of show and add id list
    var countryId = countryJSON.callingCode;


    //add this entry to main
    elemMain.appendChild(elemDiv);



} //createTVShow

function showLightBox() {
    var message = "";

    document.getElementById("lightbox").style.display = "block";
    document.getElementById("message").innerHTML = message += "<b>Search by Country</b><p>In the country searchbar, you may include a country's full name, its native name (e.g. Eesti for Estonia), or a partial name (e.g. United for United States of America).</p>";
    document.getElementById("message").innerHTML = message += "<br><b>Search by Region</b><p>In the region searchbar, the input options are &quot;Americas,&quot; &quot;Europe,&quot; &quot;Asia&quot; &quot;Africa,&quot; &quot;Polar,&quot; or &quot;Oceania.&quot; This will return a list of all the countries in this region.</p>";
    document.getElementById("message").innerHTML = message += "<br><b>Search by ISO 639-1 language code</b><p>In the language searchbar, you must input the language code for the language you are looking for, and not the language itself. For common languages, the code will be the first two letters of the language in said language (e.g. es for Spanish), however this is not always the case. For a complete list of language codes, please visit <a href='https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes'>Wikipedia's List.</a> This will return a list of all the countries in that use said language.</p>";
    document.getElementById("message").innerHTML = message += "<br><b>Search by Capital City</b><p>In the capital city searchbar, simply input the capital city of the country in which you are searching.</p>";
}

// close the lightbox
function closeLightBox() {
    document.getElementById("lightbox").style.display = "none";
} // closeLightBox 