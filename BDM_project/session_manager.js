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


function SessionManager(init_state, collection_dict){
    // Initialisation
    this.state = init_state;  // state should be "collection_activation" or "chapter_navigation"
    this._collection_dict = collection_dict;

    var collection_manager = new CollectionManager(true, this._collection_dict); //this._collection_manager

    // Add change listener on this._collection_manager._return_url
    var collection_change_handler = {
        set: function(obj, prop, val){
            if (prop === "_return_url"){
                if (val === ""){
                    this.trigger_collection_navigation();
                }
                else {
                    this._chapter_manager.load_chapter(val);
                }
            }
            obj[prop] = val;
            return true;
        }
    }
    collection_change_handler.set = collection_change_handler.set.bind(this);
    this._collection_manager = new Proxy(collection_manager, collection_change_handler);


    var chapter_manager = new ChapterManager(false); // Should be init later?

    // Add change listener on this._collection_manager._return_url
    var chapter_change_handler = {
        set: function(obj, prop, val){
            if (prop === "_is_content_loaded"){
                if (val === false){
                    this.trigger_collection_navigation();
                }
                else {
                    this.trigger_chapter_navigation();
                }
            }
            obj[prop] = val;
            return true;
        }
    }
    chapter_change_handler.set = chapter_change_handler.set.bind(this);
    this._chapter_manager = new Proxy(chapter_manager, chapter_change_handler)

    this.trigger_collection_navigation = function(){
        this._collection_manager.is_navigation_displayed = true;
        this._collection_manager.display();
        this._chapter_manager.display();
    };

    this.trigger_chapter_navigation = function(){
        console.log("In chapter_navigation");
        this._collection_manager.is_navigation_displayed = false;
        this._collection_manager.display();
        this._chapter_manager.display();
    };

}

var session_manager = new SessionManager("collection_activation", COLLECTION_DICT);
session_manager.trigger_collection_navigation();