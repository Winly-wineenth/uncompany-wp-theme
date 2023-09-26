<?php

/**
 * This file will make sure styles are loaded for the theme
*/

function uncompany_enqueue_scripts() {
  wp_enqueue_style('uncompany-styles', get_template_directory_uri() . '/style.css', array(), '1.0.0', 'all');
  wp_enqueue_script('uncompany-scripts', get_template_directory_uri() . '/script.js', array(), '1.0.0', 'all');

  wp_enqueue_style('uncompany-styles-navigation', get_template_directory_uri() . '/navigation.css', array(), '1.0.0', 'all');
  wp_enqueue_script('uncompany-scripts-navigation', get_template_directory_uri() . '/navigation.js', array(), '1.0.0', 'all');

  wp_enqueue_style('uncompany-styles-expander', get_template_directory_uri() . '/expander.css', array(), '1.0.0', 'all');
}


add_action('wp_enqueue_scripts', 'uncompany_enqueue_scripts');

// Add the styles to editor
function uncompany_enqueue_editor() {
  add_editor_style('style.css');
  add_editor_style('navigation.css');
}
add_action('after_setup_theme', 'uncompany_enqueue_editor');