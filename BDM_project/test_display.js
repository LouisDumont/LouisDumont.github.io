var requestURL = "https://LouisDumont.github.io/BDM_project/Content/first_chapter.json";
var request = new XMLHttpRequest();

request.open('GET', requestURL);
request.responseType = 'json';
request.send();


function affect_content(some_request){
  var content = some_request.response
  return(content)
}


function make_choice(content, res_node){
  console.log("Clicked!");
  print_content(content, res_node);
}


var temp_dict = {};
temp_dict["scene_1\n"] = 1;
temp_dict["scene_2\n"] = 2;
temp_dict["scene_3\n"] = 3;
temp_dict["scene_4\n"] = 4;
temp_dict["scene_5\n"] = 5;
temp_dict["scene_6\n"] = 6;
temp_dict["scene_7\n"] = 7;
temp_dict["scene_8\n"] = 8;
temp_dict["scene_9\n"] = 9;
temp_dict["scene_10\n"] = 10;
temp_dict["scene_11\n"] = 11;
temp_dict["scene_12\n"] = 12;


function print_content(content, id){
  node_text = content[id]["description"];
  choices = content[id]["choices"];

  document.getElementById("node_text").innerText = node_text;
  document.getElementById("choice_list").innerHTML = "";

  for (i=0, c=choices.length; i<c; i++){
    var choice = choices[i]
    var new_choice_text = document.createElement('p');
    var new_choice = document.createElement('li');

    new_choice_text.innerText = choice["description"];
    new_choice.appendChild(new_choice_text);
    new_choice.node_id = temp_dict[choice["res_node"]] - 1
    new_choice.addEventListener('click', function(){console.log(this.node_id); make_choice(content, this.node_id)});
    document.getElementById("choice_list").appendChild(new_choice);

  }
}


request.onload = function(){
  print_content(affect_content(request), 0);
}