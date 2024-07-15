<?php

function wpdashboard_custom_logo() {
    echo "<style type='text/css'>
        #wpadminbar #wp-admin-bar-wp-logo > .ab-item .ab-icon:before {
            background-image: url('" . get_bloginfo('stylesheet_directory') . "/images/cclogo.png');
			background-size: contain;
            background-position: 0 0;
            color:rgba(0, 0, 0, 0);
        }
        #wpadminbar #wp-admin-bar-wp-logo.hover > .ab-item .ab-icon {
            background-position: 0 0;
        }   
    </style>";
}
add_action('wp_before_admin_bar_render', 'wpdashboard_custom_logo');