<?php

/**
 * Add custom admin color scheme: This snippet allows you to add a custom color scheme to the WordPress admin panel, 
 * giving your clients or users more personalization options.
 */

function add_custom_admin_color_scheme() {
    wp_admin_css_color(
        'custom_scheme',           // Unique identifier for the scheme
        __('Custom Scheme'),       // Name displayed in the admin
        admin_url("css/colors/custom_scheme.css"), // Path to your custom CSS file
        array('#07273E', '#14568A', '#D54E21', '#2E9FCC') // Color array
    );
}
// Hook the function to the admin_init action
add_action('admin_init', 'add_custom_admin_color_scheme');