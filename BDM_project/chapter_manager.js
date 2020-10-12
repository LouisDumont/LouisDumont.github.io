function ChapterManager(init_state){
    this.state = init_state;

    this.load_chapter = function(chapter_url){console.log(chapter_url);}

    this.make_choice = function(){console.log("ChapterManager.make_choice called")};
    
    this.display_content = function(){console.log("ChapterManager.display_content called")};

}

export {ChapterManager};