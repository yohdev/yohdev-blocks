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
	AlignmentToolbar,
	BlockControls,
	InspectorControls,
	ColorPalette,
	MediaUpload,
	InnerBlocks,
} from "@wordpress/block-editor";

import { PanelBody, IconButton, RadioControl } from "@wordpress/components";

import { addFilter } from "@wordpress/hooks";

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

import { Button } from "@wordpress/components";

const ALLOWED_BLOCKS = [
	"core/button",
	"core/heading",
	"core/paragraph",
	"yohdev/gutenberg-header",
];

const MY_TEMPLATE = [
	["core/heading", {}],
	["core/paragraph", {}],
	["core/button", { className: "btn" }],
];

export default function Edit({ attributes, setAttributes }) {
	const {
		title,
		body,
		titleColor,
		bodyColor,
		featImage,
		radio,
		backgroundColor,
	} = attributes;
	// Custom Functions

	function onChangeHeading(newTitle) {
		setAttributes({ title: newTitle });
	}

	function onTitleColorChange(newColor) {
		setAttributes({ titleColor: newColor });
	}

	function onChangeBody(newBody) {
		setAttributes({ body: newBody });
	}

	function onBodyColorChange(newColor) {
		setAttributes({ bodyColor: newColor });
	}

	function onSelectImage(newImage) {
		setAttributes({ featImage: newImage.sizes.full.url });
	}

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
					<PanelBody title={"Background Color Options"}>
						<div style={{ marginBottom: "40px" }}>
							<p>
								<strong>Background Color:</strong>
								<ColorPalette
									value={backgroundColor}
									onChange={onBackgroundColorChange}
								/>
							</p>
						</div>
					</PanelBody>
					<PanelBody title={"Featured Image Options"}>
						<p>
							<strong>Show Featured Image:</strong>
						</p>
						<RadioControl
							help="Option to choose if you want to show a featured image."
							selected={radio}
							options={[
								{ label: "Hide", value: "hide" },
								{ label: "Show", value: "show" },
							]}
							onChange={(option) => {
								setAttributes({ radio: option });
							}}
						/>
						<p>
							<strong>Select a Featured Image:</strong>
						</p>
						<MediaUpload
							onSelect={onSelectImage}
							type="image"
							value={featImage}
							render={({ open }) => (
								<IconButton
									className="editor-media-placeholder__button is-button is-default is-large"
									icon="upload"
									onClick={open}
								>
									Background Image
								</IconButton>
							)}
						/>
					</PanelBody>
					<PanelBody title={"Font Color Settings"}>
						<p>
							<strong>Select a Title Color:</strong>
						</p>
						<ColorPalette value={titleColor} onChange={onTitleColorChange} />
						<p>
							<strong>Select a Body Color:</strong>
						</p>
						<ColorPalette value={bodyColor} onChange={onBodyColorChange} />
					</PanelBody>
				</InspectorControls>
			}
			<div
				className="single-card"
				style={{ backgroundColor: `${backgroundColor}` }}
			>
				<BlockControls>
					<AlignmentToolbar
						value={attributes.alignment}
						onChange={onChangeAlignment}
					/>
				</BlockControls>
				<div className="img-container">
					{radio && radio === "show" && (
						<img className="img-fluid" src={featImage} alt="" />
					)}
				</div>
				<div
					className="card-content"
					style={{ textAlign: attributes.alignment }}
				>
					<InnerBlocks template={MY_TEMPLATE} />
				</div>
			</div>
		</section>
	);
}
