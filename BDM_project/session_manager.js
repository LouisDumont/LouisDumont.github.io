import {CollectionManager} from './collection_manager.js';

var COLLECTION_DICT = {};
var content_url = "https://LouisDumont.github.io/BDM_project/Content/";

function ChapterInfo(id, name, url){
    this._id = id;
    this._name = name;
    this._url = url;
}

var chapter_1 = new ChapterInfo("chapter_1", "Chapter 1", content_url + "first_chapter.json");
var chapter_2 = new ChapterInfo("chapter_2", "Chapter 2", content_url + "second_chapter.json");

COLLECTION_DICT[chapter_1._id] = chapter_1
COLLECTION_DICT[chapter_2._id] = chapter_2

// COLLECTION_DICT["Chapter 1"] = "https://LouisDumont.github.io/BDM_project/Content/first_chapter.json";
// COLLECTION_DICT["Chapter 2"] = "https://LouisDumont.github.io/BDM_project/Content/second_chapter.json";

function SessionManager(init_state, collection_dict){
    // Initialisation
    this.state = init_state;  // state should be "collection_activation" or "chapter_navigation"
    this._collection_dict = collection_dict;
    console.log(this._collection_dict)
    this._collection_manager = new CollectionManager(this.state==="collection_activation", this._collection_dict)
    this._chapter_manager = {}; // Should be init later?

    this.trigger_collection_navigation = function(){
        console.log("SessionManager.trigger_collection_navigation called");
        this._collection_manager.display();
    };

    this.trigger_chapter_navigation = function(){};

}

var session_manager = new SessionManager("collection_activation", COLLECTION_DICT);
session_manager.trigger_collection_navigation();