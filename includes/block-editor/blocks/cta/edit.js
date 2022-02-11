/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

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
	AlignmentToolbar,
	BlockControls,
} from "@wordpress/block-editor";

import { PanelBody, IconButton, RangeControl } from "@wordpress/components";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 * @return {WPElement} Element to render.
 */

const ALLOWED_BLOCKS = ["core/heading", "core/button", "core/paragraph"];

const MY_TEMPLATE = [
	[
		"core/heading",
		{ className: "cta-header", placeholder: "Enter Heading..." },
	],
	[
		"core/paragraph",
		{ className: "cta-body", placeholder: "Enter Body Content..." },
	],
	["core/button", {}],
];

export default function Edit({ attributes, setAttributes }) {
	const { backgroundColor } = attributes;
	// Custom Functions

	function onBackgroundColorChange(newColor) {
		setAttributes({ backgroundColor: newColor });
	}

	const onChangeAlignment = (newAlignment) => {
		setAttributes({
			alignment: newAlignment === undefined ? "none" : newAlignment,
		});
	};

	return (
		<section {...useBlockProps()}>
			{
				<InspectorControls style={{ marginBottom: "40px" }}>
					<PanelBody title={"Background Options"}>
						<div
							style={{
								marginTop: "20px",
								marginBottom: "40px",
							}}
						>
							<p>
								<strong>Background Color:</strong>
								<ColorPalette
									value={backgroundColor}
									onChange={onBackgroundColorChange}
								/>
							</p>
						</div>
					</PanelBody>
				</InspectorControls>
			}
			<div
				className="yohdev-cta"
				style={{ backgroundColor: `${backgroundColor}` }}
			>
				<BlockControls>
					<AlignmentToolbar
						value={attributes.alignment}
						onChange={onChangeAlignment}
					/>
				</BlockControls>
				<div className="container" style={{ textAlign: attributes.alignment }}>
					<InnerBlocks allowedBlocks={ALLOWED_BLOCKS} template={MY_TEMPLATE} />
				</div>
			</div>
		</section>
	);
}
