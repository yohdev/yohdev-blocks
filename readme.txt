=== Yohdev Blocks ===
Contributors:      yohdev
Tags:              block, gutenberg, blocks
Requires at least: 6.7
Requires PHP:      7.4
Tested up to:      7.0
Stable tag:        0.2.0
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

A library of custom YohDev Gutenberg blocks, written with ESNext/JSX – build step required.

== Description ==

This is the long description. No limit, and you can use Markdown (as well as in the following sections).

For backwards compatibility, if this section is missing, the full length of the short description will be used, and
Markdown parsed.

== Installation ==

This section describes how to install the plugin and get it working.

e.g.

1. Upload the plugin files to the `/wp-content/plugins/yohdev-blocks` directory, or install the plugin through the WordPress plugins screen directly.
1. Activate the plugin through the 'Plugins' screen in WordPress


== Frequently Asked Questions ==

= A question that someone might have =

An answer to that question.

= What about foo bar? =

Answer to foo bar dilemma.

== Screenshots ==

1. This screen shot description corresponds to screenshot-1.(png|jpg|jpeg|gif). Note that the screenshot is taken from
the /assets directory or the directory that contains the stable readme.txt (tags or trunk). Screenshots in the /assets
directory take precedence. For example, `/assets/screenshot-1.png` would win over `/tags/4.3/screenshot-1.png`
(or jpg, jpeg, gif).
2. This is the second screen shot

== Changelog ==

= 0.2.0 =
* Updated all blocks to Block API v3 for WordPress 7.0 compatibility.
* Raised minimum requirements to WordPress 6.7 and PHP 7.4.
* Replaced the deprecated `block_categories` filter with `block_categories_all`.
* Replaced the removed `IconButton` component with `Button`.
* Reworked the CPT Selection block as a dynamic block that reads posts from the editor data store / server-side render instead of a hardcoded REST URL.
* Modernized tooling (`@wordpress/scripts`), removed unused dependencies, and added a containerized local environment via `@wordpress/env`.

= 0.1.0 =
* Release

== Arbitrary section ==

You may provide arbitrary sections, in the same format as the ones above. This may be of use for extremely complicated
plugins where more information needs to be conveyed that doesn't fit into the categories of "description" or
"installation." Arbitrary sections will be shown below the built-in sections outlined above.
