<?php

/**
 * Disable self-pingbacks: This snippet prevents WordPress from sending pingbacks to itself,
 * which can improve performance and reduce unnecessary notifications.
 */


// Function to remove self-pingbacks from the list of pingbacks
function disable_self_pingbacks(&$links) {
    foreach ($links as $l => $link)
        // Check if the pingback URL starts with the site's own URL
        if (0 === strpos($link, get_option('home')))
            unset($links[$l]); // Remove the self-pingback
}
// Hook the function to the pre_ping action
add_action('pre_ping', 'disable_self_pingbacks');