// get_json_discover();
// get_json_design("/Scripts/Design_section_generator/Design_section_gen.json", "Designs_section");

(async function(){
get_json_featured("/JSON_data/Home_featured/Section_thing.json", "scroll_hor");
get_json_normal("/JSON_data/TEMP/Home_more_apps/More_apps_gen.json", "more_games_section");
get_json_normal_count("/JSON_data/Games_games_list/Games_gen.json", "more_games_section", 3);
Populate_image_scroller.Populate_image_scroller_def("/JSON_data/Projects_vector_designs/vector_gen.json", "design_sc");
Populate_image_scroller.Populate_image_scroller_def("/JSON_data/Home_Games_list/Games_scroller_gen.json", "games_sc");
Populate_image_scroller.Populate_image_scroller_def("/JSON_data/Projects_game_assets/Game_assets.json", "assets_sc");
Populate_image_scroller.Populate_image_scroller_def("/JSON_data/Home_Apps_list/home_apps_list.json", "section_apps");
Populate_image_scroller.Populate_image_scroller_posts(await post_tag_searcher.return_found_tagged_items(Blogs_and_posts_data, 10, "3D", "Blender"), "section_3d");



news_generator(Blogs_and_posts_data, ".latest_news");

})();