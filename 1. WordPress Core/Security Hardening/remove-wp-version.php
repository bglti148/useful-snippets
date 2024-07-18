<?php

/**
 * Removes the WP version number form the header
 */

 function remove_wp_version() {
    return '';
}
add_filter('the_generator', 'remove_wp_version');