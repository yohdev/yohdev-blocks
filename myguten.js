/**
 * Editor-only tweaks that add helper classes to specific blocks so they pick
 * up the plugin's front-end styles.
 */
import { addFilter } from '@wordpress/hooks';

/**
 * Append helper classes to the saved markup of specific blocks.
 *
 * - core/columns  → adds `container`
 * - yohdev/button → adds `btn`
 *
 * @param {Object} extraProps Block element's generated props.
 * @param {Object} blockType  Block type settings.
 * @return {Object} Filtered extra props.
 */
function addHelperClasses( extraProps, blockType ) {
	const extraClassByBlock = {
		'core/columns': 'container',
		'yohdev/button': 'btn',
	};

	const extraClass = extraClassByBlock[ blockType.name ];

	if ( extraClass ) {
		extraProps.className = [ extraProps.className, extraClass ]
			.filter( Boolean )
			.join( ' ' );
	}

	return extraProps;
}

addFilter(
	'blocks.getSaveContent.extraProps',
	'yohdev/add-helper-classes',
	addHelperClasses
);
