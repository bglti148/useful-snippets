<?php

/**
 * Add custom widget area: This snippet creates a new widget area that can be used in your theme.
 */

 // Function to register custom widget area
function register_custom_widget_area() {
    register_sidebar(array(
        'name'          => 'Custom Widget Area',
        'id'            => 'custom-widget-area',
        'description'   => 'This is a custom widget area',
        'before_widget' => '<div class="widget-item">',
        'after_widget'  => '</div>',
        'before_title'  => '<h2 class="widget-title">',
        'after_title'   => '</h2>',
    ));
}
add_action('widgets_init', 'register_custom_widget_area');