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
	BlockControls,
	AlignmentToolbar,
} from "@wordpress/block-editor";

import { RadioControl } from "@wordpress/components";

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

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Edit({ attributes, setAttributes }) {
	const { backgroundColor, radio, body } = attributes;

	const [posts, setPosts] = useState([]);

	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		async function loadPosts() {
			const response = await fetch(
				"http://localhost:8080/wp-json/wp/v2/posts/?_embed"
			);
			if (!response.ok) {
				// oups! something went wrong
				return;
			}

			const posts = await response.json();
			console.log(posts);
			setPosts(posts);

			setIsLoaded(true);
			setAttributes({ posts: posts, isLoaded: isLoaded });
		}

		loadPosts();
	}, [isLoaded]);

	// Custom Functions

	function onBackgroundColorChange(newColor) {
		setAttributes({ backgroundColor: newColor });
	}

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
					<PanelBody title={"Post Type Selection"}>
						<div
							style={{
								marginTop: "20px",
								marginBottom: "40px",
							}}
						>
							<p>
								<strong>Select a Post Type:</strong>
								<RadioControl
									help="Choose which post type you want to show."
									selected={radio}
									options={[
										{ label: "Default", value: "default" },
										{ label: "Option Two", value: "option-two" },
									]}
									onChange={(option) => {
										setAttributes({ radio: option });
									}}
								/>
							</p>
						</div>
					</PanelBody>
				</InspectorControls>
			}
			<div
				className="yohdev-cpt-selection"
				style={{ backgroundColor: `${backgroundColor}` }}
			>
				{radio && radio === "default" && (
					<div className="posts-container">
						<div className="container">
							<div className="row">
								{isLoaded
									? posts.map((post, index) => (
											<div className="col-lg-4" key={index}>
												<div className="yohdev-card">
													<img
														className="img-fluid"
														src={
															post._embedded["wp:featuredmedia"][0].source_url
														}
													/>
													<h3>{post.title.rendered}</h3>
													<p
														dangerouslySetInnerHTML={{
															__html: post.content.rendered,
														}}
													></p>
													<a href={post.id}>Read More</a>
												</div>
											</div>
									  ))
									: "No posts available"}
							</div>
						</div>
					</div>
				)}

				{radio && radio === "option-two" && <h1>Still Here</h1>}
			</div>
		</section>
	);
}
