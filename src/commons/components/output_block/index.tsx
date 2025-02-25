import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
	outputUnstyle: {
		color: "var(--text-100)",
		flexGrow: 1,
		flexBasis: 0,
		marginBottom: "-1rem",
	},

	wrapper: {
		backgroundColor: "var(--background-100)",
		padding: "1rem 1rem",
		borderRadius: "0.5rem",
		transition: "background-color var(--transition-speed) ease",
	},

	description: {
		margin: 0,
		fontSize: "1.5rem",
		color: "var(--text-100)",
	},

	title: {
		color: "var(--text-300)",
		marginBottom: "0.5rem",
		textWrap: "nowrap",
	},

	imgWrap: {
		display: "flex",
		alignSelf: "start",
	},
});

interface I_OutputBlockProps {
	title: string;
	description: string;
}

function OutputBlock(props: I_OutputBlockProps) {
	return (
		<div {...stylex.props(styles.outputUnstyle)}>
			<div {...stylex.props(styles.wrapper)}>
				<div>
					<div>
						<p {...stylex.props(styles.title)}>{props.title}</p>
						<h2 {...stylex.props(styles.description)}>{props.description}</h2>
					</div>
				</div>
			</div>
		</div>
	);
}

export default OutputBlock;
