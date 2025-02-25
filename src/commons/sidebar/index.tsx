import * as stylex from "@stylexjs/stylex";
import { NavLink } from "react-router";

const styles = stylex.create({
	base: {
		backgroundColor: "var(--background-100)",
		minHeight: "100vh",
		width: "100%",
	},

	link_restyle: {
		display: "grid",
        boxSizing: "border-box",
		color: "var(--text-100)",
		width: "100%",
		textDecoration: "none",
		padding: "0.5rem",
		transition: "background-color var(--transition-speed) ease",

		":hover": {
			backgroundColor: "var(--background-300)",
		},
	},
});

export default function Sidebar() {
	return (
		<div {...stylex.props(styles.base)}>
			<LinkBtn to={"/uri-encoder-decoder"}>URI Encoder / Decoder</LinkBtn>

			<LinkBtn to={"/word-counter"}>Word Counter</LinkBtn>

			<LinkBtn to={"/youtube/thumbnail-grabber"}>Youtube Thumbnail Grabber</LinkBtn>
		</div>
	);
}

function LinkBtn({ to, children }: { to: string; children: React.ReactNode }) {
	return (
		<NavLink
			to={to}
			{...stylex.props(styles.link_restyle)}
			style={({ isActive }) => ({
				backgroundColor: isActive ? "var(--background-300)" : undefined,
			})}
		>
			{children}
		</NavLink>
	);
}
