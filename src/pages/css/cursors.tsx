import { util_styles } from "@src/utils/styles";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
	base: {
		display: "flex",
		boxSizing: "border-box",
		padding: "1rem",
		gap: "1rem",
		height: "100%",
		width: "100%",
	},

	section: {
		marginBottom: "1rem",
	},

	title: {
		fontWeight: "bold",
		fontSize: "1.25rem",
		marginBottom: "1rem",
	},

	card_wrapper: {
		display: "flex",
		flexWrap: "wrap",
		gap: "1rem",
	},

	card: {
		backgroundColor: "var(--background-100)",
		padding: "1rem 2rem",
		borderRadius: "0.5rem",
		minWidth: "8rem",
		textAlign: "center",

		transition: "background-color var(--transition-speed) ease",

		":hover": {
			backgroundColor: "var(--background-300)",
		},
	},
});

interface I_SectionProps {
	title: string;
	cursors: string[];
}

function Section(props: I_SectionProps) {
	async function copyText(c: string) {
		try {
			await navigator.clipboard.writeText(c);
		} catch (err) {
			console.error("Failed to copy text: ", err);
		}
	}

	return (
		<div {...stylex.props(styles.section)}>
			<p {...stylex.props(styles.title)}>{props.title}</p>

			<div {...stylex.props(styles.card_wrapper)}>
				{props.cursors.map((cursor: string) => {
					return (
						<div
							key={cursor}
							{...stylex.props(styles.card)}
							style={{
								cursor: cursor,
							}}
							onClick={() => {
								copyText(cursor);
							}}
						>
							{cursor}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default function CSSCursors() {
	return (
		<div {...stylex.props(styles.base)}>
			<div {...stylex.props(util_styles.display_block_base)}>
				<Section title="General Purpose" cursors={["default", "none"]} />

				<br />

				<Section
					title="Status"
					cursors={[
						"help",
						"pointer",
						"progress",
						"wait",
						"context-menu",
						"not-allowed",
					]}
				/>

				<br />

				<Section
					title="Selection"
					cursors={["cell", "crosshair", "text", "vertical-text"]}
				/>

				<br />

				<Section title="Zoom" cursors={["zoom-in", "zoom-out"]} />

				<br />

				<Section
					title="Drag and Drop"
					cursors={["alias", "copy", "move", "no-drop", "grab", "grabbing"]}
				/>

				<br />

				<Section
					title="Status"
					cursors={[
						"all-scroll",
						"col-resize",
						"row-resize",
						"n-resize",
						"e-resize",
						"s-resize",
						"w-resize",
						"ns-resize",
						"ew-resize",
						"ne-resize",
						"nw-resize",
						"se-resize",
						"sw-resize",
						"nesw-resize",
						"nwse-resize",
					]}
				/>
			</div>
		</div>
	);
}
