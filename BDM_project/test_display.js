alert("Test")

// var requestURL = "https://LouisDumont.github.io/BDM_project/Content/test.json";
var requestURL = "https://LouisDumont.github.io/BDM_project/Content/first_chapter.json";
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
    var content = request.response;
    alert(content[0]["id"]);
    // var test = prompt("Quel contenu afficher?");
    document.getElementById("node_text").innerText = content;
  }

/*
var age = parseInt(prompt("Quel est votre âge?"))

if (age<0){
  alert("Veuillez entrer un âge valide")
} else if (age)
*/