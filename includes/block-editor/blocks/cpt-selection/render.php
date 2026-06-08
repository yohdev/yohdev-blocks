<?php
/**
 * Server-side render for the yohdev/cpt-selection block.
 *
 * @param array $attributes Block attributes.
 *
 * @package yohdev
 */

$yohdev_background_color = isset( $attributes['backgroundColor'] ) ? $attributes['backgroundColor'] : 'none';
$yohdev_radio            = isset( $attributes['radio'] ) ? $attributes['radio'] : 'default';

$yohdev_wrapper_style = ( 'none' !== $yohdev_background_color )
	? sprintf( ' style="background-color:%s"', esc_attr( $yohdev_background_color ) )
	: '';
?>
<section <?php echo get_block_wrapper_attributes(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- core helper returns pre-escaped attributes. ?>>
	<div class="yohdev-cpt-selection"<?php echo $yohdev_wrapper_style; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- pre-escaped above. ?>>
		<?php if ( 'default' === $yohdev_radio ) : ?>
			<?php
			$yohdev_query = new WP_Query(
				array(
					'post_type'           => 'post',
					'posts_per_page'      => 6,
					'ignore_sticky_posts' => true,
				)
			);
			?>
			<div class="posts-container">
				<div class="container">
					<div class="row">
						<?php if ( $yohdev_query->have_posts() ) : ?>
							<?php
							while ( $yohdev_query->have_posts() ) :
								$yohdev_query->the_post();
								?>
								<div class="col-lg-4">
									<div class="yohdev-card">
										<?php if ( has_post_thumbnail() ) : ?>
											<?php
											the_post_thumbnail(
												'large',
												array(
													'class' => 'img-fluid',
													'alt'   => the_title_attribute( array( 'echo' => false ) ),
												)
											);
											?>
										<?php endif; ?>
										<h3><?php the_title(); ?></h3>
										<div><?php the_excerpt(); ?></div>
										<a href="<?php the_permalink(); ?>">
											<?php esc_html_e( 'Read More', 'yohdev-blocks' ); ?>
										</a>
									</div>
								</div>
							<?php endwhile; ?>
							<?php wp_reset_postdata(); ?>
						<?php else : ?>
							<p><?php esc_html_e( 'No posts available.', 'yohdev-blocks' ); ?></p>
						<?php endif; ?>
					</div>
				</div>
			</div>
		<?php elseif ( 'option-two' === $yohdev_radio ) : ?>
			<h1><?php esc_html_e( 'Still Here', 'yohdev-blocks' ); ?></h1>
		<?php endif; ?>
	</div>
</section>
