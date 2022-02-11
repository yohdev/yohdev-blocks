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
	RichText,
} from "@wordpress/block-editor";

import { PanelBody, RadioControl } from "@wordpress/components";

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
	const { radio, title, url, text } = attributes;

	function onChangeBtnText(newTitle) {
		setAttributes({ title: newTitle });
	}

	function onChangeBtnUrl(newUrl) {
		setAttributes({ url: newUrl });
	}
	return (
		<section {...useBlockProps()}>
			{
				<InspectorControls style={{ marginBottom: "40px" }}>
					<PanelBody title={"Button Options"}>
						<div
							style={{
								marginTop: "20px",
								marginBottom: "40px",
							}}
						>
							<div>
								<strong>Button Options:</strong>
								<RadioControl
									help="Edit the way the button looks."
									selected={radio}
									options={[{ label: "Default", value: "default" }]}
									onChange={(option) => {
										setAttributes({ radio: option });
									}}
								/>
							</div>
						</div>
					</PanelBody>
					<InspectorControls style={{ marginBottom: "40px" }}>
						<PanelBody title={"Font Color Settings"}>
							<p>
								<strong>Select a Title Color:</strong>
							</p>
						</PanelBody>
					</InspectorControls>
				</InspectorControls>
			}
			<RichText
				key="editable"
				tagName="a"
				className="btn"
				value={title}
				href={url}
				text={text}
				placeholder="Learn More"
				onChange={onChangeBtnText}
			/>
		</section>
	);
}
