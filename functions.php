<?php

function twentytwentythree_child_enqueue_styles() {
    wp_enqueue_style('twentytwentythree-style', get_template_directory_uri() . '/style.css');
    wp_enqueue_style('bootstrap-style', get_stylesheet_directory_uri() . '/node_modules/bootstrap/dist/css/bootstrap.min.css', array(), '5.3.', 'all');
    wp_enqueue_style('twentytwentythree-child-style', get_stylesheet_uri(), array('twentytwentythree-style', 'bootstrap-style'));
    wp_enqueue_style('inter-font', 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap', array(), null, 'all');
    wp_enqueue_script('bootstrap-script', get_stylesheet_directory_uri() . '/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js', array('jquery'), '5.3.3', true);
}
add_action('wp_enqueue_scripts', 'twentytwentythree_child_enqueue_styles');

function mini_wizard_enqueue_assets() {
    wp_enqueue_style('mini-wizard-style', get_stylesheet_directory_uri() . '/mini-wizard/style.css');
    wp_enqueue_script('mini-wizard-script', get_stylesheet_directory_uri() . '/mini-wizard/main.js', array('jquery', 'bootstrap-script'), null, true);
}
add_action('wp_enqueue_scripts', 'mini_wizard_enqueue_assets');

function mini_wizard_shortcode($atts, $content = null) {
    $atts = shortcode_atts(
        array(
            'title' => 'My Wizard',
        ),
        $atts,
        'mini_wizard'
    );

    ob_start();
    ?>
    <div class="mini-wizard-container">
        <?php
        
        $wizard_html = file_get_contents(get_stylesheet_directory() . '/mini-wizard/index.html');
        $wizard_html = str_replace('images/', get_stylesheet_directory_uri() . '/mini-wizard/images/', $wizard_html);

        echo $wizard_html;
        ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('mini_wizard', 'mini_wizard_shortcode');

