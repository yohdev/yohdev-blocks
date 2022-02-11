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
} from "@wordpress/block-editor";

import { PanelBody } from "@wordpress/components";

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
export default function Edit({ attributes, setAttributes }) {
	const {
		title,
		titleColor,
		body,
		bodyColor,
		backgroundColor,
		borderColor,
	} = attributes;

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

	function onBackgroundColorChange(newColor) {
		setAttributes({ backgroundColor: newColor });
	}

	function onBorderColorChange(newColor) {
		setAttributes({ borderColor: newColor });
	}

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
						<div
							style={{
								marginTop: "40px",
								marginBottom: "40px",
							}}
						>
							<p>
								<strong>Border Color:</strong>
								<ColorPalette
									value={borderColor}
									onChange={onBorderColorChange}
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
			<div
				className="yohdev-capable-card"
				style={{ backgroundColor: `${backgroundColor}` }}
			>
				<div className="content-container">
					<RichText
						key="editable"
						tagName="h3"
						placeholder="Heading..."
						value={title}
						onChange={onChangeHeading}
						style={{ color: titleColor }}
					/>
					<div
						className="card-border"
						style={{ backgroundColor: `${borderColor}` }}
					></div>
					<RichText
						key="editable"
						tagName="p"
						placeholder="Body Text..."
						value={body}
						onChange={onChangeBody}
						style={{ color: bodyColor }}
					/>
				</div>
			</div>
		</section>
	);
}
