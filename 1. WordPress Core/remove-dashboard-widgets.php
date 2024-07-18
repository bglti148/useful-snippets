<?php

/**
 * Removes specified widgets from the WordPress admin dashboard.
 */

// Function to remove specific dashboard widgets
function remove_dashboard_widgets() {
    // Remove the "Quick Draft" widget
    remove_meta_box('dashboard_quick_press', 'dashboard', 'side');

    // Remove the "Recent Drafts" widget
    remove_meta_box('dashboard_recent_drafts', 'dashboard', 'side');

    // Remove the "WordPress News" widget
    remove_meta_box('dashboard_primary', 'dashboard', 'side');

    // Remove the "Other WordPress News" widget
    remove_meta_box('dashboard_secondary', 'dashboard', 'side');
}

// Hook the function to the dashboard setup action
add_action('wp_dashboard_setup', 'remove_dashboard_widgets');