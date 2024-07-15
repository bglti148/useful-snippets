<?php

/**
 * Removes the WP version number from front-end markup to help with security.
 */

 add_filter('the_generator', '__return_empty_string');