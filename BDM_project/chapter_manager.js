var nodeId_to_int_parser = function(nodeId){
    var aux = nodeId.split("_")[1].split("\\")[0];
    return parseInt(aux);
}

function ChapterManager(init_state){
    this.state = init_state;
    this.chapter_content = {};
    this._nodes_dict = {};
    this._is_content_loaded = false;
    this.url = "";

    this.make_nodes_dict = function(content){
        // Returns a dict mapping from node_ids to idx in the content array
        var dict = {};
        for (var i=0, c=content.length; i<c; i++){
            var node = content[i];
            var idx = nodeId_to_int_parser(node.id);
            dict[node.id] = idx;
        }
        return dict;
    }

    this.affect_content = function(some_request){
        this.chapter_content = some_request.response;
        this._nodes_dict = this.make_nodes_dict(this.chapter_content);
        this._is_content_loaded = true;
    }

    this.clean_content = function(){
        this.chapter_content = {};
        this._nodes_dict = {};
        this._is_content_loaded = false;
    }

    this.load_chapter = function(chapter_url){
        console.log(chapter_url);
        this.url = chapter_url;
        var requestURL = chapter_url;
        var request = new XMLHttpRequest();

        this._is_chapter_loaded = false;

        request.open('GET', requestURL);
        request.responseType = 'json';

        request.onload = (function(){
            this.affect_content(request);
        }).bind(this);

        request.send();

    }

    this.go_to_node = function(id){
        console.log("ChapterManager.go_to_node called");
        this.display_content(id)
    };

    this.display = function(){
        console.log("ChapterManager.display called");

        if (Array.isArray(this.chapter_content)){
            this.display_content(0);
        }
        else {
            this.empty_display();
        }
    }

    this.empty_display = function(){
        console.log("ChapterManager.empty_display called");
        document.getElementById("node_navigation").innerHTML = "";
    }
    
    this.display_content = function(id){
        console.log("ChapterManager.display_content called");

        var node_text = this.chapter_content[id]["description"];
        var choices = this.chapter_content[id]["choices"];

        var collection_navigation_element = document.getElementById("node_navigation");
        collection_navigation_element.innerHTML = "";
        var node_text_element = document.createElement("p")
        node_text_element.id = "node_text"
        var choices_list = document.createElement("ul")
        choices_list.id = "choice_list"

        node_text_element.innerText = node_text;
        choices_list.innerHTML = "";

        collection_navigation_element.appendChild(node_text_element)
        collection_navigation_element.appendChild(choices_list)

        for (var i=0, c=choices.length; i<c; i++){
            var choice = choices[i]
            var new_choice_text = document.createElement('p');
            var new_choice = document.createElement('li');

            new_choice.classList.add("choice");
            new_choice_text.classList.add("choice_text");

            new_choice_text.innerText = choice["description"];
            new_choice.appendChild(new_choice_text);
            new_choice.node_id = this._nodes_dict[choice["res_node"]] - 1
            var go_to_node_binded = this.go_to_node.bind(this);
            new_choice.addEventListener('click', function(){
                console.log(this.node_id);
                go_to_node_binded(this.node_id);  // this.chapter_content, 
            });
            document.getElementById("choice_list").appendChild(new_choice);

        }
    };

}

export {ChapterManager};