import { useState } from "react";
import * as stylex from "@stylexjs/stylex";

import TextareaBlock from "../commons/components/textarea_block";
import { util_styles } from "..//utils/styles";
import { H2 } from "@controlkit/ui";

const styles = stylex.create({
	base: {
		display: "flex",
		boxSizing: "border-box",
		padding: "1rem",
		gap: "1rem",
		minHeight: "100vh",
		height: "100%",
		width: "100%",
	},
});

export default function URIEncoderDecoder() {
	const [text, setText] = useState<string>("");
	const [decoded, setDecoded] = useState<string>("");

	function onChangeEncoded(e: React.ChangeEvent<HTMLTextAreaElement>): void {
		setText(e.target.value);
		const decoded = decodeURI(text);
		setDecoded(decoded);
	}

	function onChangeDecoded(e: React.ChangeEvent<HTMLTextAreaElement>): void {
		setDecoded(e.target.value);
		const encoded = encodeURI(e.target.value);
		setText(encoded);
	}

	return (
		<>
			<title>URI Encoder / Decoder</title>
			<meta name="description" content={"Decode or Encode URI strings"} />

			<div {...stylex.props(styles.base)}>
				<div
					{...stylex.props(
						util_styles.display_block_base,
						util_styles.flex_column,
					)}
				>
					<H2>Decoded</H2>
					<TextareaBlock
						value={decoded}
						setValue={setDecoded}
						onChange={onChangeDecoded}
					/>
				</div>
				<div
					{...stylex.props(
						util_styles.display_block_base,
						util_styles.flex_column,
					)}
				>
					<H2>Encoded</H2>
					<TextareaBlock
						value={text}
						setValue={setText}
						onChange={onChangeEncoded}
					/>
				</div>
			</div>
		</>
	);
}
