// const delay = ms => new Promise(res => setTimeout(res, ms));

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
  

function ChapterManager(init_state){
    this.state = init_state;
    this.chapter_content = {};
    this.url = "";

    this.affect_content = function(some_request){
        this.chapter_content = some_request.response;
        this._is_content_loaded = true;
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
            console.log("HERE");
            console.log(this.chapter_content);
        }).bind(this);

        request.send();

    }

    this.make_choice = function(){console.log("ChapterManager.make_choice called")};

    this.display = function(){
        console.log("ChapterManager.display called");
        console.log(this.chapter_content);

        if (this.chapter_content !== {}){
            this.display_content();
        }
        else {
            this.empty_display();
        }
    }

    this.empty_display = function(){
        var collection_navigation_element = document.getElementById("node_navigation");
        collection_navigation_element.innerHTML = "<p id=\"node_text\"></p><ul id=\"choice_list\"></ul>";
    }
    
    this.display_content = function(){
        console.log("ChapterManager.display_content called")
    };

}

export {ChapterManager};