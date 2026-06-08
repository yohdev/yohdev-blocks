/**
 * This is a dynamic block: its front-end markup is produced server-side by
 * render.php, so there is nothing to persist in post_content.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {null} Nothing is saved to post content.
 */
export default function save() {
	return null;
}
