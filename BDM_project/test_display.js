var requestURL = "https://LouisDumont.github.io/BDM_project/Content/first_chapter.json";
var request = new XMLHttpRequest();

request.open('GET', requestURL);
request.responseType = 'json';
request.send();

// request.onload = function() {
//     var content = request.response;
//     node_text = content[0]["description"];
//     choices = content[0]["choices"];
//     document.getElementById("node_text").innerText = node_text;
// }

function affect_content(some_request){
  var content = some_request.response
  return(content)
}

function print_content(content){
  node_text = content[0]["description"];
  choices = content[0]["choices"];

  document.getElementById("node_text").innerText = node_text;

  for (i=0, c=choices.length; i<c; i++){
    var new_choice_text = document.createElement('p');
    new_choice_text.innerText = choices[i]["description"];
    var new_choice = document.createElement('li');
    new_choice.appendChild(new_choice_text);
    document.getElementById("choice_list").appendChild(new_choice)
  }
}

request.onload = function(){
  print_content(affect_content(request))
}