function ChapterManager(init_state, chapter_data){
    this.state = init_state;
    this._chapter_data = chapter_data;

    this.make_choice = function(){console.log("ChapterManager.make_choice called")};
    
    this.display_content = function(){console.log("ChapterManager.display_content called")};

}