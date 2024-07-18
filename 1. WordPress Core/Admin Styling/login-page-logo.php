<?php

/**
 * Change the logo on the default WordPress login page /wp-admin
 */

 function custom_login_logo() {
    echo '<style type="text/css">
        h1 a { background-image: url(' . get_stylesheet_directory_uri() . '/images/custom-logo.png) !important; }
    </style>';
}
add_action('login_head', 'custom_login_logo');