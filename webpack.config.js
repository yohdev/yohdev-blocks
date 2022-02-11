const defaultConfig = require("@wordpress/scripts/config/webpack.config");
module.exports = {
	...defaultConfig,
	entry: {
		"block-two": "./includes/block-editor/blocks/block-two",
		"capable-card": "./includes/block-editor/blocks/capable-card",
		"repeater-card": "./includes/block-editor/blocks/repeater-card",
		"header": "./includes/block-editor/blocks/header",
		"hero": "./includes/block-editor/blocks/hero",
		"image-with-text": "./includes/block-editor/blocks/image-with-text",
		"cta": "./includes/block-editor/blocks/cta",
		"single-card": "./includes/block-editor/blocks/single-card",
		"button": "./includes/block-editor/blocks/button",
	},
};
