<?php

/**
 * Code snippet below only targets posts, but could be adapted for any post types, or several of them
 */


// Define your custom function
function limit_post_revisions($num, $post) {
    // Set a max limit for revisions for all post types
    $max_revisions = 5;

    // Check if the post type is 'post'
    if ($post->post_type == 'post') {
        return $max_revisions;
    } else {
        return $num;
    }
}

// Hook into the 'wp_revisions_to_keep' filter
add_filter('wp_revisions_to_keep', 'limit_post_revisions', 10, 2);