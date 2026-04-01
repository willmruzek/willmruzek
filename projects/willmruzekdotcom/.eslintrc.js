// Exists for eslint-plugin-import/no-unused-modules when using ESLint flat config.
// Flat config hides certain internal ESLint APIs that this rule uses for ignores.
// Keeping this legacy config (even empty) unblocks the rule.
// If you don’t need ignores here, leaving it empty is fine.

module.exports = {};
