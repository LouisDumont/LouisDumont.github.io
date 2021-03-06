function CollectionManager(initial_state, collection_dict){
    this._collection_dict = collection_dict;
    this.is_navigation_displayed = initial_state;
    this._return_url = "";

    this.trigger_chapter = function(chapter_id){
        // Return the URL of the selected chapter
        this._return_url = this._collection_dict[chapter_id]._url;
    };

    this.display = function(){
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
            chapter_button.classList.add("chapter_button");
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

        var onClick_function = function(event){this._return_url = "";};
        var onClick_function_binded = onClick_function.bind(this);
        return_button.addEventListener("click", onClick_function_binded);


        collection_navigation_element.appendChild(return_button);

    }
}

export {CollectionManager};