<?php
/**
 * Plugin Name:       YohDev Gutenberg Blocks
 * Description:       A library of custom YohDev Gutenberg blocks.
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Version:           0.2.0
 * Author:            YohDev
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       yohdev-blocks
 * Domain Path:       /languages
 *
 * @package           yohdev
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // No direct access.
}

/**
 * Load translations for the plugin.
 */
function yohdev_blocks_load_textdomain() {
	load_plugin_textdomain(
		'yohdev-blocks',
		false,
		dirname( plugin_basename( __FILE__ ) ) . '/languages'
	);
}
add_action( 'init', 'yohdev_blocks_load_textdomain' );

/**
 * Register every block that ships with this plugin.
 *
 * Blocks live in their own directory under includes/block-editor/blocks/ and
 * are discovered dynamically, so adding a new block requires no changes here.
 */
function yohdev_blocks_init() {
	$blocks_dir = __DIR__ . '/includes/block-editor/blocks';

	if ( ! is_dir( $blocks_dir ) ) {
		return;
	}

	foreach ( scandir( $blocks_dir ) as $block ) {
		// Skip dotfiles such as ., .. and .DS_Store.
		if ( '' === $block || '.' === $block[0] ) {
			continue;
		}

		$block_path = $blocks_dir . '/' . $block;

		// Only register directories that actually contain a block.json.
		if ( is_dir( $block_path ) && file_exists( $block_path . '/block.json' ) ) {
			register_block_type( $block_path );
		}
	}
}
add_action( 'init', 'yohdev_blocks_init' );

/**
 * Register the custom block category used to group YohDev blocks.
 *
 * Uses the modern `block_categories_all` filter (the older `block_categories`
 * filter was deprecated in WordPress 5.8).
 *
 * @param array $categories Existing block categories.
 * @return array Filtered block categories.
 */
function yohdev_block_category( $categories ) {
	return array_merge(
		$categories,
		array(
			array(
				'slug'  => 'yohdev-blocks-category',
				'title' => __( 'YohDev Blocks', 'yohdev-blocks' ),
			),
		)
	);
}
add_filter( 'block_categories_all', 'yohdev_block_category' );

/**
 * Enqueue the editor-only script that adds helper classes to certain blocks.
 *
 * The script is built through @wordpress/scripts, so we read its generated
 * dependency and version metadata from the companion *.asset.php file.
 */
function yohdev_blocks_enqueue_editor_assets() {
	$asset_file = __DIR__ . '/build/myguten.asset.php';

	if ( ! file_exists( $asset_file ) ) {
		return;
	}

	$asset = include $asset_file;

	wp_enqueue_script(
		'yohdev-myguten',
		plugins_url( 'build/myguten.js', __FILE__ ),
		$asset['dependencies'],
		$asset['version'],
		true
	);
}
add_action( 'enqueue_block_editor_assets', 'yohdev_blocks_enqueue_editor_assets' );
