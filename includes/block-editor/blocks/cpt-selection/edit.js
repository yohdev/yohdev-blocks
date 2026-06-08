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
	InspectorControls,
	ColorPalette,
} from '@wordpress/block-editor';

import { PanelBody, RadioControl, Spinner } from '@wordpress/components';

/**
 * Pull data straight from the editor data store rather than a hardcoded REST
 * URL, so the block works on any site/environment.
 */
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { decodeEntities } from '@wordpress/html-entities';

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
export default function Edit( { attributes, setAttributes } ) {
	const { backgroundColor, radio } = attributes;

	const { posts, isResolving } = useSelect( ( select ) => {
		const query = { per_page: 6, _embed: true };

		return {
			posts: select( coreStore ).getEntityRecords(
				'postType',
				'post',
				query
			),
			isResolving: select( coreStore ).isResolving( 'getEntityRecords', [
				'postType',
				'post',
				query,
			] ),
		};
	}, [] );

	function onBackgroundColorChange( newColor ) {
		setAttributes( { backgroundColor: newColor } );
	}

	return (
		<section { ...useBlockProps() }>
			<InspectorControls style={ { marginBottom: '40px' } }>
				<PanelBody
					title={ __( 'Background Options', 'yohdev-blocks' ) }
				>
					<div style={ { marginTop: '20px', marginBottom: '40px' } }>
						<p>
							<strong>
								{ __( 'Background Color:', 'yohdev-blocks' ) }
							</strong>
							<ColorPalette
								value={ backgroundColor }
								onChange={ onBackgroundColorChange }
							/>
						</p>
					</div>
				</PanelBody>
				<PanelBody
					title={ __( 'Post Type Selection', 'yohdev-blocks' ) }
				>
					<div style={ { marginTop: '20px', marginBottom: '40px' } }>
						<p>
							<strong>
								{ __( 'Select a Post Type:', 'yohdev-blocks' ) }
							</strong>
							<RadioControl
								help={ __(
									'Choose which post type you want to show.',
									'yohdev-blocks'
								) }
								selected={ radio }
								options={ [
									{
										label: __( 'Default', 'yohdev-blocks' ),
										value: 'default',
									},
									{
										label: __(
											'Option Two',
											'yohdev-blocks'
										),
										value: 'option-two',
									},
								] }
								onChange={ ( option ) => {
									setAttributes( { radio: option } );
								} }
							/>
						</p>
					</div>
				</PanelBody>
			</InspectorControls>

			<div
				className="yohdev-cpt-selection"
				style={ { backgroundColor: `${ backgroundColor }` } }
			>
				{ radio === 'default' && (
					<div className="posts-container">
						<div className="container">
							<div className="row">
								{ isResolving && <Spinner /> }
								{ ! isResolving &&
									posts &&
									posts.length > 0 &&
									posts.map( ( post ) => {
										const featuredImage =
											post._embedded?.[
												'wp:featuredmedia'
											]?.[ 0 ]?.source_url;

										return (
											<div
												className="col-lg-4"
												key={ post.id }
											>
												<div className="yohdev-card">
													{ featuredImage && (
														<img
															className="img-fluid"
															src={
																featuredImage
															}
															alt={ decodeEntities(
																post.title
																	?.rendered ||
																	''
															) }
														/>
													) }
													<h3>
														{ decodeEntities(
															post.title
																?.rendered || ''
														) }
													</h3>
													<div
														dangerouslySetInnerHTML={ {
															__html:
																post.excerpt
																	?.rendered ||
																'',
														} }
													></div>
													<a href={ post.link }>
														{ __(
															'Read More',
															'yohdev-blocks'
														) }
													</a>
												</div>
											</div>
										);
									} ) }
								{ ! isResolving &&
									posts &&
									posts.length === 0 && (
										<p>
											{ __(
												'No posts available.',
												'yohdev-blocks'
											) }
										</p>
									) }
							</div>
						</div>
					</div>
				) }

				{ radio === 'option-two' && (
					<h1>{ __( 'Still Here', 'yohdev-blocks' ) }</h1>
				) }
			</div>
		</section>
	);
}
