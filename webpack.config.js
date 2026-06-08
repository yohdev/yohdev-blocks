const path = require( 'path' );
const fs = require( 'fs' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

const blocksDir = path.resolve( __dirname, 'includes/block-editor/blocks' );

/**
 * Build the webpack entry map automatically.
 *
 * Every directory under includes/block-editor/blocks/ becomes an entry keyed
 * by its name, so new blocks are picked up without editing this file. The
 * editor-only `myguten` helper script is added on top.
 */
const blockEntries = fs
	.readdirSync( blocksDir )
	.filter( ( name ) =>
		fs.statSync( path.join( blocksDir, name ) ).isDirectory()
	)
	.reduce( ( entries, name ) => {
		entries[ name ] = path.join( blocksDir, name );
		return entries;
	}, {} );

module.exports = {
	...defaultConfig,
	entry: {
		...blockEntries,
		myguten: path.resolve( __dirname, 'myguten.js' ),
	},
};
