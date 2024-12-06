// get_json_discover();
// get_json_design("/Scripts/Design_section_generator/Design_section_gen.json", "Designs_section");
get_json_featured("/JSON_data/Home_featured/Section_thing.json", "scroll_hor");
get_json_normal("/JSON_data/TEMP/Home_more_apps/More_apps_gen.json", "more_games_section");
get_json_normal_count("/JSON_data/Games_games_list/Games_gen.json", "more_games_section", 3);
Populate_image_scroller.Populate_image_scroller_def("/JSON_data/Projects_vector_designs/vector_gen.json", "design_sc");
Populate_image_scroller.Populate_image_scroller_def("/JSON_data/Home_Games_list/Games_scroller_gen.json", "games_sc");
Populate_image_scroller.Populate_image_scroller_def("/JSON_data/Projects_game_assets/Game_assets.json", "assets_sc");
Populate_image_scroller.Populate_image_scroller_posts(projects_3d_posts_data, "section_3d");



combine_all_known_posts_to_blogs();
news_generator(Blogs_and_posts_data, ".latest_news")