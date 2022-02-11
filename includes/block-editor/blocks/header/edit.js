/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import {
	useBlockProps,
	RichText,
	InspectorControls,
	ColorPalette,
	MediaUpload,
	InnerBlocks,
	BlockControls,
	AlignmentToolbar,
} from '@wordpress/block-editor';

import { PanelBody, IconButton, RangeControl } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 * @return {WPElement} Element to render.
 */

const ALLOWED_BLOCKS = [ 'core/heading' ];

export default function Edit( { attributes, setAttributes } ) {
	const { title, titleColor, titleSize, dotColor, alignment } = attributes;

	function onChangeHeading( newTitle ) {
		setAttributes( { title: newTitle } );
	}

	function onTitleColorChange( newColor ) {
		setAttributes( { titleColor: newColor } );
	}

	function onDotColorChange( newColor ) {
		setAttributes( { dotColor: newColor } );
	}

	function onChangeAlignment( newAlignment ) {
		setAttributes( {
			alignment: newAlignment === undefined ? 'none' : newAlignment,
		} );
	}

	return (
		<section { ...useBlockProps() }>
			{
				<InspectorControls style={ { marginBottom: '40px' } }>
					<PanelBody title={ 'Font Color Settings' }>
						<p>
							<strong>Select a Title Color:</strong>
						</p>
						<ColorPalette
							value={ titleColor }
							onChange={ onTitleColorChange }
						/>
						<p>
							<strong>Select a Dot Color:</strong>
						</p>
						<ColorPalette
							value={ dotColor }
							onChange={ onDotColorChange }
						/>
					</PanelBody>
				</InspectorControls>
			}
			<div className="yohdev-heading-container">
				<BlockControls>
					<AlignmentToolbar
						value={ attributes.alignment }
						onChange={ onChangeAlignment }
					/>
				</BlockControls>
				<div className="content-container">
					<RichText
						key="editable"
						tagName="h1"
						value={ title }
						placeholder="Hero Heading"
						className="yohdev-heading"
						onChange={ onChangeHeading }
						style={ { fontSize: titleSize, color: titleColor } }
					/>
					<span
						className="cool-dot"
						style={ { backgroundColor: dotColor } }
					></span>
				</div>
			</div>
		</section>
	);
}
