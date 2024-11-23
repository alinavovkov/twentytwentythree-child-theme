<?php
// Підключення стилів батьківської теми
function twentytwentythree_child_enqueue_styles() {
    // Підключаємо стиль батьківської теми
    wp_enqueue_style('twentytwentythree-style', get_template_directory_uri() . '/style.css');
    // Підключаємо стиль дочірньої теми
    wp_enqueue_style('twentytwentythree-child-style', get_stylesheet_uri(), array('twentytwentythree-style'));
}
add_action('wp_enqueue_scripts', 'twentytwentythree_child_enqueue_styles');