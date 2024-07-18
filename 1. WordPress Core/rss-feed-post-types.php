<?php

/**
 * Add custom post types to main RSS feed: This snippet includes custom post types in the main RSS feed, 
 * which is useful if you want to syndicate custom content types alongside regular posts.
 */


// Function to modify the main query for feeds
function add_custom_post_types_to_feed($query) {
    if ($query->is_feed() && $query->is_main_query()) {
        // Set the post types to include in the feed
        $query->set('post_type', array('post', 'custom_post_type'));
    }
    return $query;
}
// Hook the function to the pre_get_posts filter
add_filter('pre_get_posts', 'add_custom_post_types_to_feed');