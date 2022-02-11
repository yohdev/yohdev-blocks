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
import { useBlockProps, RichText } from "@wordpress/block-editor";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function save({ attributes }) {
	const {
		title,
		titleColor,
		body,
		bodyColor,
		backgroundColor,
		radio,
		borderColor,
		posts,
		isLoaded,
	} = attributes;

	console.log(posts);

	useEffect(() => {}, [isLoaded]);

	return (
		<section {...useBlockProps.save()}>
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
