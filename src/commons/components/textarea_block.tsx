import * as stylex from "@stylexjs/stylex";
import { forwardRef } from "react";

const styles = stylex.create({
	base: {
		backgroundColor: "var(--background-100)",
		height: "100%",
		display: "flex",
		flexDirection: "column",
		border: "0.0625rem solid var(--border-100)",
		borderRadius: "0.25rem",
		transition: "border var(--transition-speed) ease",
		boxSizing: "border-box",

		":hover": {
			border: "0.0625rem solid var(--border-200)",
		},
	},

	btn: {
		border: "none",
		borderRadius: "0.25rem",
		padding: "0.25rem 0.5rem",
		backgroundColor: "transparent",
		color: "var(--text-100)",
		cursor: "pointer",
		outline: "none",
		transition: "background-color var(--transition-speed) ease",

		":hover": {
			backgroundColor: "var(--background-300)",
		},
	},

	textarea: {
		width: "100%",
		height: "100%",
		overflow: "auto",
		outline: "none",
		border: "none",
		color: "var(--text-100)",
		padding: "0.75rem",
		boxSizing: "border-box",
		resize: "none",
		backgroundColor: "transparent",
	},

	optionsBar: {
		boxSizing: "border-box",
		display: "flex",
		gap: "0.5rem",
		padding: "0.5rem",
		borderBottom: "0.0625rem solid var(--border-100)",
	},
});

interface I_TextareaBlockProps {
	value: string;
	setValue?: (arg: string) => void;
	onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	readOnly?: boolean;
}

const TextareaBlock = forwardRef<HTMLTextAreaElement, I_TextareaBlockProps>(
	(
		props,
		// , ref
	) => {
		return (
			<div {...stylex.props(styles.base)}>
				<div {...stylex.props(styles.optionsBar)}>
					<button
						{...stylex.props(styles.btn)}
						type="button"
						onClick={() => {
							if (props.setValue) {
								props.setValue("");
							}
						}}
					>
						Clear
					</button>
				</div>

				<div
					style={{
						height: "100%",
						position: "relative",
					}}
				>
					<textarea
						{...stylex.props(styles.textarea)}
						value={props.value}
						onChange={props.onChange}
						readOnly={props.readOnly}
					/>
				</div>
			</div>
		);
	},
);

export default TextareaBlock;
