import {CollectionManager} from './collection_manager.js';
import {ChapterManager} from './chapter_manager.js';

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

    var collection_manager = new CollectionManager(true, this._collection_dict); //this._collection_manager

    // Add change listener on this._collection_manager._return_url
    var change_handler = {
        set: function(obj, prop, val){
            if (prop === "_return_url"){
                if (val === ""){
                    console.log("Triggering to collection_navigation");
                    this.trigger_collection_navigation();
                }
                else {
                    console.log("Triggering to chapter_navigation");
                    console.log(this.trigger_chapter_navigation);
                    this.trigger_chapter_navigation(val);
                }
            }
            obj[prop] = val;
            return true;
        }
    }
    change_handler.set = change_handler.set.bind(this);
    this._collection_manager = new Proxy(collection_manager, change_handler);


    this._chapter_manager = new ChapterManager(false); // Should be init later?

    this.trigger_collection_navigation = function(){
        this._collection_manager.is_navigation_displayed = true;
        this._collection_manager.display();
    };

    this.trigger_chapter_navigation = function(chapter_url){
        console.log("In chapter_navigation");
        this._chapter_manager.load_chapter(chapter_url);
        this._collection_manager.is_navigation_displayed = false;
        this._collection_manager.display();
    };

}

var session_manager = new SessionManager("collection_activation", COLLECTION_DICT);
session_manager.trigger_collection_navigation();