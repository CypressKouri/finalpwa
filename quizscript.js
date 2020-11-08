var currentQuestion = 0; //the question we are currently on

var score = 0; // number of correct answers

var timeleft = 10; // time left for countdown timer
var stopTimer = false;
var countdownTimer;
var showInstructions = true;
const mq = window.matchMedia("(min-width: 1000px)");
var questions = [];
var questionCounter = 0;
var allCountryData;

//register the service worker when the js loads
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
} //if

/*
fetch all country data from the api
pass the data into the createCapitalCityQuestion() function
from the data create a question that asks "what is the capital city" in html with the name of the country being pulled from the api
put  the correct capital city in a random loacation and record that as the correct answer
pull data from random capital cities to fill in the other answer slots
*/

//fetch the data from the api
function fetchData() {
  fetch("https://restcountries.eu/rest/v2/all")
    .then(response => response.json())
    .then(data => sendData(data));
} //fetchData

// send the data to create capital city question
function sendData(data) {
  //console.log("calling send data");
  allCountryData = data;
  var country;
  for (country in data) {
    //console.log("Question for counry " + country);
    createCapitalCityQuestion(data[country]);
  } //for
  //console.log(questions);
  loadQuestion();
} // sendData

function getRandomCity() {
  let randomCityNumber = Math.floor(Math.random() * 250) + 1;

  let randomCity;

  if (
    allCountryData[randomCityNumber] &&
    allCountryData[randomCityNumber].capital &&
    allCountryData[randomCityNumber].capital != ""
  ) {
    randomCity = allCountryData[randomCityNumber].capital;
  } else {
    var randomCapitals = [
      "Porto-Novo",
      "Tirana",
      "Port Moresby",
      "Palikir",
      "Banjul",
      "Gaborone",
      "Bissau",
      "Funafuti",
      "Jamestown"
    ];
    let randomNumber = Math.floor(Math.random() * randomCapitals.length) + 1;
    if (randomNumber == 1) {
      randomCity = randomCapitals[0];
    } else if (randomNumber == 2) {
      randomCity = randomCapitals[1];
    } else if (randomNumber == 3) {
      randomCity = randomCapitals[2];
    } else if (randomNumber == 4) {
      randomCity = randomCapitals[3];
    } else if (randomNumber == 5) {
      randomCity = randomCapitals[4];
    } else if (randomNumber == 6) {
      randomCity = randomCapitals[5];
    } else if (randomNumber == 7) {
      randomCity = randomCapitals[6];
    } else if (randomNumber == 8) {
      randomCity = randomCapitals[7];
    } else if (randomNumber == 9) {
      randomCity = randomCapitals[8];
    }
    //console.log(randomCity);
  }
  return randomCity;
}

//create the question by using the data sent in
function createCapitalCityQuestion(dataJSON) {
  if (dataJSON.capital && dataJSON.flag && dataJSON.name) {
    //console.log(dataJSON);
    // console.log("Creating new question" + questionCounter++);
    document.getElementById("begin").style.display = "none";
    document.getElementById("gridcontainer").style.visibility = "visible";
    // generate a random number between 1 and 4
    // correspond 1 - a, 2= b  etc
    // save "answer" in questions array accoringly
    // put the correct capital in the correct locatio
    // randomly choose 3 other cpatial citys
    // assign them to the other 3 answers
    let randomNumber = Math.floor(Math.random() * 4) + 1;
    let randomQuestion = Math.floor(Math.random() * 250) + 1;
    let answer;

    var obj = {
      question: "What is the capital city of " + dataJSON.name + "?",
      image: dataJSON.flag
    };
    //console.log("random number is " + randomNumber);

    // generate correct answer
    if (randomNumber == 1) {
      answer = "a";
      Object.assign(obj, { a: dataJSON.capital });
      Object.assign(obj, { b: getRandomCity() });
      Object.assign(obj, { c: getRandomCity() });
      Object.assign(obj, { d: getRandomCity() });
    } else if (randomNumber == 2) {
      answer = "b";
      Object.assign(obj, { b: dataJSON.capital });
      Object.assign(obj, { a: getRandomCity() });
      Object.assign(obj, { c: getRandomCity() });
      Object.assign(obj, { d: getRandomCity() });
    } else if (randomNumber == 3) {
      answer = "c";
      Object.assign(obj, { c: dataJSON.capital });
      Object.assign(obj, { a: getRandomCity() });
      Object.assign(obj, { b: getRandomCity() });
      Object.assign(obj, { d: getRandomCity() });
    } else if (randomNumber == 4) {
      answer = "d";
      Object.assign(obj, { d: dataJSON.capital });
      Object.assign(obj, { a: getRandomCity() });
      Object.assign(obj, { b: getRandomCity() });
      Object.assign(obj, { c: getRandomCity() });
    }
    Object.assign(obj, { answer: answer });
    /*
  var obj = {key1: "value1", key2: "value2"};
  Object.assign(obj, {key3: "value3"});
  */

    //var answer = randomNumber;
    //dataJSON.capital = randomNumber + ". " + dataJSON.capital;
    //console.log(dataJSON.capital)
    //console.log(questions);
    //console.log(obj);

    questions.push(obj);
  }
}

// run code when the body loads
function initialize() {
  document.getElementById("gridcontainer").style.visibility = "hidden";
  document.getElementById("inst").style.display = "none";
  document.getElementById("lightbox").style.display = "none";
  document.getElementById("startup").style.display = "none";
}

function instruction() {
  if (showInstructions == true) {
    showInstructions = false;
    document.getElementById("inst").style.display = "block";
  } else {
    showInstructions = true;
    document.getElementById("inst").style.display = "none";
  }
}

//load the current question on the page
function loadQuestion() {
  let randomizeQuestion = Math.floor(Math.random() * 250) + 1;

  //check for last question
  let message = "";
  stopTimer = false;

  if (currentQuestion == questions.length) {
    // media query event handler

    if (score >= 180) {
      message =
        "Congratulations! Your geographical knowledge is phenomenal! Your score was " +
        score +
        "/" +
        questions.length +
        ". <br><br>" +
        "Click to start again.";

      document.getElementById("lightbox").style.backgroundSize = "cover";
      document.getElementById("lightbox").style.color = "white";
    } else {
      message =
        "Your geographical knowledge still needs work! Your score was " +
        score +
        "/" +
        questions.length +
        ". <br><br>" +
        "Click to start again.";

      document.getElementById("lightbox").style.backgroundSize = "cover";
      document.getElementById("lightbox").style.color = "white";
    }

    message =
      message +
      "<br><br> Your percentage was " +
      Math.round((score / questions.length) * 100) +
      "%.";

    //show the lightbox with feedback
    document.getElementById("lightbox").style.display = "block";
    document.getElementById("message").innerHTML = message;
    currentQuestion = 0;
    score = 0;
    document.getElementById("score").innerHTML = "1/" + questions.length;

    document.getElementById("lifeline").style.display = "block";
    document.getElementById("free").style.display = "block";
  } else {
    document.getElementById("lightbox").style.backgroundImage = "";
    document.getElementById("lightbox").style.backgroundColor = "rgba(0,0,0,1)";
  }

  //preload the image
  var img = document.getElementById("image");
  var preLoadImg = new Image();

  if (
    questions[randomizeQuestion] &&
    questions[randomizeQuestion].image &&
    questions[randomizeQuestion].image != ""
  ) {
    preLoadImg.src = questions[randomizeQuestion].image;
  } else {
    preLoadImg.src = "images/planet-earth.png";
  }

  preLoadImg.onLoad = function() {
    img.width = this.width;
  };
  img.style.maxWidth = "500px";
  img.src = preLoadImg.src;
if(questions[randomizeQuestion] && questions[randomizeQuestion].question){
  //load the question
  document.getElementById("question").innerHTML =
    
    questions[randomizeQuestion].question;
  document.getElementById("a").innerHTML =
    "a) " + questions[randomizeQuestion].a;
  document.getElementById("b").innerHTML =
    "b) " + questions[randomizeQuestion].b;
  document.getElementById("c").innerHTML =
    "c) " + questions[randomizeQuestion].c;
  document.getElementById("d").innerHTML =
    "d) " + questions[randomizeQuestion].d;
} else{
  nextQuestion()
}

  startTimer();
} // loadQuestion

//start the timer
function startTimer() {
  
    timeleft = 10;
  
  countdownTimer = setInterval(function() {
    document.getElementById("countdown").innerHTML =
      timeleft + " seconds remaining <br><br>";
    timeleft -= 1;
    endTimer();
  }, 1000);
} //startTimer

//end the timer
function endTimer() {
  if (timeleft < 0 || stopTimer) {
    clearInterval(countdownTimer);
    currentQuestion++; //add 1 to currentQuestion
    loadQuestion();
  }
} //endTimer

//make the next question button work -- everything is the same as loadQuestion() except for stopTimer
function nextQuestion() {
  let randomizeQuestion = Math.floor(Math.random() * 250) + 1;
  //check for last question
  let message = "";
  stopTimer = true;

  if (currentQuestion == questions.length) {
    if (score >= 5) {
      message =
        "Congratulations! Your geographical knowledge is phenomenal! Your score was " +
        score +
        "/" +
        questions.length +
        ". <br><br>" +
        "Click to start again.";

      document.getElementById("lightbox").style.backgroundSize = "cover";
      document.getElementById("lightbox").style.color = "white";
    } else if (score <= 4) {
      message =
        "Your geographical knowledge still needs work! Your score was " +
        score +
        "/" +
        questions.length +
        ". <br><br>" +
        "Click to start again.";

      document.getElementById("lightbox").style.backgroundSize = "cover";
      document.getElementById("lightbox").style.color = "white";
    }
  } else {
    document.getElementById("lightbox").style.backgroundImage = "";
    document.getElementById("lightbox").style.backgroundColor =
      "rgba(0,0,0,0.99)";
  }

  //preload the image
  var img = document.getElementById("image");
  var preLoadImg = new Image();
  if (
    questions[randomizeQuestion] &&
    questions[randomizeQuestion].image &&
    questions[randomizeQuestion].image != ""
  ) {
    preLoadImg.src = questions[randomizeQuestion].image;
  } else {
    preLoadImg.src = "images/planet-earth.png";
  }

  preLoadImg.onLoad = function() {
    img.width = this.width;
  };
  img.style.maxWidth = "500px";
  img.src = preLoadImg.src;

  if(questions[randomizeQuestion] && questions[randomizeQuestion].question){
  //load the question
  document.getElementById("question").innerHTML =
    
    questions[randomizeQuestion].question;
  document.getElementById("a").innerHTML =
    "a) " + questions[randomizeQuestion].a;
  document.getElementById("b").innerHTML =
    "b) " + questions[randomizeQuestion].b;
  document.getElementById("c").innerHTML =
    "c) " + questions[randomizeQuestion].c;
  document.getElementById("d").innerHTML =
    "d) " + questions[randomizeQuestion].d;
} else{
  nextQuestion()
}
  if (currentQuestion + 2 <= questions.length) {
    document.getElementById("score").innerHTML =
      currentQuestion + 2 + "/" + questions.length;
  } else {
    document.getElementById("score").innerHTML =
      questions.length + "/" + questions.length;
  }
}

//mark the current question
function markIt(ans) {
  let message = "";

  //if the answer is correct
  if (ans == questions[currentQuestion].answer) {
    // alert("Correct"); //don't use this in real web design

    //add to score and move to next question
    score++; // or score +1 or score += 1
    document.getElementById("score").innerHTML =
      currentQuestion + 2 + "/" + questions.length;

    message =
      "Correct answer! Your score is " +
      score +
      "/" +
      (currentQuestion + 1) +
      ".";
    message =
      message +
      "<br><br> Your percentage is " +
      Math.round((score / (currentQuestion + 1)) * 100) +
      "%.";
  } //if

  //otherwise notify user the answer is incorrect
  else {
    if (currentQuestion + 2 <= questions.length) {
      document.getElementById("score").innerHTML =
        currentQuestion + 2 + "/" + questions.length;
    } else {
      document.getElementById("score").innerHTML =
        questions.length + "/" + questions.length;
    }
    message =
      "Incorrect answer! Your score is " +
      score +
      "/" +
      (currentQuestion + 1) +
      ".";
    message =
      message +
      "<br><br> Your percentage is " +
      Math.round((score / (currentQuestion + 1)) * 100) +
      "%.";
  } //else

  //show the lightbox with feedback
  document.getElementById("lightbox").style.display = "block";
  document.getElementById("message").innerHTML = message;
  /*
  	 //move to the next quesiton
  	 currentQuestion++; //add 1 to currentQuestion
  	 loadQuestion();*/
  stopTimer = true;
  endTimer();
} // markIt

// close the lightbox
function closeLightBox() {
  document.getElementById("lightbox").style.display = "none";
} //closeLightBox
