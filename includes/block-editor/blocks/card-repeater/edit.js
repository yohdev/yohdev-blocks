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
	InspectorControls,
	ColorPalette,
	InnerBlocks,
} from "@wordpress/block-editor";

import { PanelBody, RangeControl, RadioControl } from "@wordpress/components";

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

const ALLOWED_BLOCKS = [
	"core/columns",
	"core/column",
	"core/heading",
	"core/paragraph",
	"core/button",
	"core/image",
	"yohdev/header",
];

const THREEBYONE_TEMPLATE = [
	[
		"core/columns",
		{ className: "repeater-container" },
		[
			["core/column", {}],
			["core/column", {}],
			["core/column", {}],
		],
	],
];

const THREE_BY_TWO_TEMPLATE = [
	[
		"core/columns",
		{ columns: 2, className: "repeater-container" },
		[
			["core/column", {}],
			["core/column", {}],
			["core/column", {}],
		],
	],
	[
		"core/columns",
		{ columns: 2 },
		[
			["core/column", {}],
			["core/column", {}],
			["core/column", {}],
		],
	],
];

export default function Edit({ attributes, setAttributes }) {
	const { titleColor, columns, bodyColor, overlayColor, radio } = attributes;
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

	function onOverlayColorChange(newColor) {
		setAttributes({ overlayColor: newColor });
	}

	return (
		<section {...useBlockProps()}>
			{
				<InspectorControls style={{ marginBottom: "40px" }}>
					<PanelBody title={"Background Options"}>
						<div style={{ marginBottom: "40px" }}>
							<p>
								<strong>Background Color:</strong>
								<ColorPalette
									value={overlayColor}
									onChange={onOverlayColorChange}
								/>
							</p>
						</div>
					</PanelBody>
					<PanelBody title={"Grid Layout Selection"}>
						<div
							style={{
								marginTop: "20px",
								marginBottom: "40px",
							}}
						>
							<p>
								<strong>Select a Grid Layout:</strong>
								<RadioControl
									help="Choose which type of grid you want to display cards."
									selected={radio}
									options={[
										{ label: "3X1", value: "3X1" },
										{ label: "3X2", value: "3X2" },
									]}
									onChange={(option) => {
										setAttributes({ radio: option });
									}}
								/>
							</p>
						</div>
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
			{radio && radio === "3X1" && (
				<div
					className="card-repeater"
					style={{ backgroundColor: `${overlayColor}` }}
				>
					<div className="container">
						<InnerBlocks template={THREEBYONE_TEMPLATE} />
					</div>
				</div>
			)}

			{radio && radio === "3X2" && (
				<div
					className="card-repeater"
					style={{ backgroundColor: `${overlayColor}` }}
				>
					<div className="container">
						<InnerBlocks template={THREE_BY_TWO_TEMPLATE} />
					</div>
				</div>
			)}
		</section>
	);
}
