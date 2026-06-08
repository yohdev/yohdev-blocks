/**
 * Project ESLint config.
 *
 * Reuses the @wordpress/scripts defaults (including the Babel parser options
 * needed for ESNext/JSX) and relaxes a few rules that are noisy for block
 * code: missing JSDoc params and the scaffolded `@return {WPElement}` type are
 * downgraded/disabled, and unused variables are reported as warnings rather
 * than hard errors so they surface without failing the build.
 */
const wpScriptsConfig = require( '@wordpress/scripts/config/.eslintrc.js' );

module.exports = {
	...wpScriptsConfig,
	rules: {
		...( wpScriptsConfig.rules || {} ),
		'no-unused-vars': 'warn',
		'jsdoc/require-param': 'off',
		'jsdoc/no-undefined-types': 'off',
	},
};
