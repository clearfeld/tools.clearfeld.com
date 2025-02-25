import stylex from "@stylexjs/stylex";

export const util_styles = stylex.create({
	display_block_base: {
		backgroundColor: "var(--background-200)",
		borderRadius: "0.25rem",
		boxSizing: "border-box",
		width: "100%",
	},

	flex_column: {
		display: "flex",
		flexDirection: "column",
	},
});
