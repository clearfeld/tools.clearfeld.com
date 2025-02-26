import { useEffect, useState } from "react";

import * as stylex from "@stylexjs/stylex";

import OutputBlock from "@src/commons/components/output_block";
import TextareaBlock from "@src/commons/components/textarea_block";
import { util_styles } from "@src/utils/styles";
import { H2 } from "@controlkit/ui";

const styles = stylex.create({
	wrapper: {
		display: "flex",
		boxSizing: "border-box",
		padding: "1rem",
		gap: "1rem",
		minHeight: "100vh",
		height: "100%",
		width: "100%",
	},

	block: {
		display: "flex",
		flexDirection: "column",
		gap: "1rem",
	},
});

export default function WordCounter() {
	const [text, setText] = useState<string>("");

	const [wordCount, setWordCount] = useState<number>(0);
	const [charCount, setCharCount] = useState<number>(0);
	const [sentenceCount, setSentenceCount] = useState<number>(0);
	// const [paragraphCount, setParagraphCount] = useState<number>(0);

	const [lineCount, setLineCount] = useState<number>(0);

	useEffect(() => {
		const words = text.split(" ");

		let wordCount = 0;

		for (let i = 0; i < words.length; ++i) {
			if (words[i].trim() !== "") {
				++wordCount;
			}
		}

		const sentences = text.split(".");

		const linesz = text.split("\n");

		setWordCount(wordCount);
		setCharCount(text.length);
		setSentenceCount(sentences.length - 1);

		setLineCount(linesz.length - 1);
	}, [text]);

	function onChangeText(e: React.ChangeEvent<HTMLTextAreaElement>): void {
		setText(e.target.value);
	}

	return (
		<>
			<title>Word Counter</title>
			<meta
				name="description"
				content={
					"Copy and paste your text into the editor to count its words, characters, sentences."
				}
			/>

			<div {...stylex.props(styles.wrapper)}>
				<div {...stylex.props(util_styles.display_block_base, styles.block)}>
					<H2>Input</H2>

					<TextareaBlock
						value={text}
						setValue={setText}
						onChange={onChangeText}
					/>
				</div>

				<div {...stylex.props(util_styles.display_block_base)}>
					<H2>Information</H2>

					<br />

					<OutputBlock description={wordCount.toString()} title="Word Count" />

					<OutputBlock
						description={charCount.toString()}
						title="Character Count"
					/>

					<OutputBlock
						description={sentenceCount.toString()}
						title="Sentence Count"
					/>

					<OutputBlock description={lineCount.toString()} title="Line Count" />
				</div>
			</div>
		</>
	);
}
