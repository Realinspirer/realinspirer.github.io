"use strict";
// get_json_discover();
// get_json_design("/Scripts/Design_section_generator/Design_section_gen.json", "Designs_section");
get_json_featured("/Scripts/Featured_section_things/Section_thing.json", "scroll_hor");
get_json_social("/Scripts/Social_section_generator/Social_section_gen.json", "socials_grid");
get_json_normal("/Scripts/More_apps_generator/More_apps_gen.json", "more_games_section");
get_json_normal_count("/Games/Scripts/Games_gen.json", "more_games_section", 3);
Populate_image_scroller("Projects/Scripts/Vector_designs/vector_gen.json", "design_sc");
Populate_image_scroller("Scripts/Image_scroller_gen_json/Games_gen.json", "games_sc");
Populate_image_scroller("Scripts/Image_scroller_gen_json/Game_assets.json", "assets_sc");
Populate_image_scroller("Scripts/Image_scroller_gen_json/UI_gen.json", "UI_sec");
