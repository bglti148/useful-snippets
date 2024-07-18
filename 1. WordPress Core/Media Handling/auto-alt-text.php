<?php

/**
 * Automatically add alt text to images: This snippet automatically adds the post title as alt text for images
 *  if no alt text is specified, improving accessibility.
 */

function add_auto_alt_text($content) {
    global $post;
    preg_match_all('/<img (.*?)>/', $content, $images);
    
    if (!is_null($images)) {
        foreach ($images[1] as $index => $value) {
            if (!preg_match('/alt=/', $value)) {
                $new_img = str_replace('<img', '<img alt="' . esc_attr($post->post_title) . '"', $images[0][$index]);
                $content = str_replace($images[0][$index], $new_img, $content);
            }
        }
    }
    return $content;
}
add_filter('the_content', 'add_auto_alt_text');