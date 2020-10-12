function CollectionManager(initial_state, collection_dict){
    this._collection_dict = collection_dict;
    console.log(this._collection_dict);
    console.log(this._collection_dict.chapter_1);
    this.is_navigation_displayed = initial_state;

    this.trigger_chapter = function(chapter_id){
        console.log("CollectionManager.trigger_chapter called");
        console.log(chapter_id);
    };

    this.display = function(){
        console.log("CollectionManager.display called");
        if (this.is_navigation_displayed){
            this.display_collection_navigation();
        }
        else {
            this.display_return_button();
        }
    };

    this.display_collection_navigation = function(){
        var collection_navigation_element = document.getElementById("collection_navigation");
        collection_navigation_element.innerHTML = "";

        for (var chapter in this._collection_dict){
            var chapter_button = document.createElement("button");
            chapter_button.id = this._collection_dict[chapter]._id;
            chapter_button.innerText = this._collection_dict[chapter]._name;
            
            var onClick_function = function(event){this.trigger_chapter(event.target.id)};
            var onClick_function_binded = onClick_function.bind(this);
            chapter_button.addEventListener("click", onClick_function_binded);

            collection_navigation_element.appendChild(chapter_button);
        }
    }

    this.display_return_button = function(){
        var collection_navigation_element = document.getElementById("collection_navigation");
        collection_navigation_element.innerHTML = "";

        var return_button = document.createElement("button");
        return_button.innerText = "Return";

        collection_navigation_element.appendChild(return_button);

    }
}

export {CollectionManager};