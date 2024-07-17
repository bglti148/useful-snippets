<?php

/**
 * Removes the WP version number from front-end markup to help with security.
 */

 function remove_wp_version() {
    return '';
}
add_filter('the_generator', 'remove_wp_version');