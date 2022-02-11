<?php
/**
 * Plugin Name:       YohDev Gutenberg Blocks
 * Description:       Description
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            YohDev
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       yohdev-blocks
 *
 * @package           yohdev
 */

function yohdev_blocks_init() {

	// Get all block files from the directory.
	$dir    = '/includes/block-editor/blocks/';
	$blocks = scandir(__DIR__ . $dir);

	// Remove unwanted files in the array.
	$blocks = array_diff($blocks, array('.', '..','.DS_Store'));

	// Loop through and register each block dynamically.
	foreach($blocks as $block){
		register_block_type( __DIR__. '/includes/block-editor/blocks/'.  $block);
	};
}
add_action( 'init', 'yohdev_blocks_init' );

function yohdev_block_category( $categories, $post ) {
	return array_merge(
		$categories,
		array(
			array(
				'slug' => 'yohdev-blocks-category',
				'title' => __( 'YohDev Blocks', 'yohdev-blocks-category' ),
			),
		)
	);
}
add_filter( 'block_categories', 'yohdev_block_category', 10, 2);

function myguten_enqueue() {
    wp_enqueue_script(
        'myguten-script',
        plugins_url( 'myguten.js', __FILE__ )
    );
}
add_action( 'enqueue_block_editor_assets', 'myguten_enqueue' );
