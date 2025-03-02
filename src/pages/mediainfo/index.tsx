import { type ChangeEvent, useEffect, useRef, useState } from "react";
import * as stylex from "@stylexjs/stylex";

import mediaInfoFactory from "mediainfo.js";
import type { MediaInfo, ReadChunkFunc } from "mediainfo.js";

const page_title = "MediaInfo";

import { H1 } from "@controlkit/ui";

const styles = stylex.create({
	base: {
		boxSizing: "border-box",
		width: "100%",

		minHeight: "100vh",

		maxWidth: "1280px",

		margin: "0 auto",

		paddingTop: "2rem",
		paddingBottom: "2rem",
		paddingRight: "2rem",

		paddingLeft: "2rem",
	},

	container: {
		padding: "0 1rem",
	},

	preview_max: {
		maxWidth: "768px",
		maxHeight: "480px",
	},
});

function makeReadChunk(file: File): ReadChunkFunc {
	return async (chunkSize: number, offset: number) =>
		new Uint8Array(await file.slice(offset, offset + chunkSize).arrayBuffer());
}

export default function Mediainfo() {
	const mediaInfoRef = useRef<MediaInfo<"text">>(null);
	const [file, setFile] = useState<File | null>(null);
	const [type, setType] = useState<"IMAGE" | "VIDEO" | "AUDIO" | null>(null);
	const [result, setResult] = useState("");

	useEffect(() => {
		mediaInfoFactory({
			format: "text",
			locateFile: () =>
				"https://unpkg.com/mediainfo.js@latest/dist/MediaInfoModule.wasm",
		})
			.then((mi) => {
				mediaInfoRef.current = mi;
			})
			.catch((error: unknown) => {
				console.error("Failed to init MediaInfo - ", error);
			});

		return () => {
			if (mediaInfoRef.current) {
				mediaInfoRef.current.close();
			}
		};
	}, []);

	const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
		const file = ev.target.files?.[0];
		if (!file) {
			return;
		}
		setFile(file);
		ReadFile(file);
	};

	function ReadFile(file_arg: File) {
		if (file_arg && mediaInfoRef.current) {
			mediaInfoRef.current
				.analyzeData(file_arg.size, makeReadChunk(file_arg))
				.then(setResult)
				.catch((error: unknown) => {
					console.error("Failed to analyze file - ", error);
				});

			if (file_arg.type.includes("image")) {
				setType("IMAGE");
			} else if (file_arg.type.includes("video")) {
				setType("VIDEO");
			} else if (file_arg.type.includes("audio")) {
				setType("AUDIO");
			} else {
				// TODO: do error state for unsupported files
			}
		}
	}

	return (
		<>
			<title>{page_title}</title>
			<meta
				name="description"
				content={
					"MediaInfo is a convenient unified display of the most relevant technical and tag data for video and audio files."
				}
			/>

			<div
				{...stylex.props(styles.base)}
				onDrop={async (e) => {
					e.preventDefault();
					if (e.dataTransfer.files?.[0]) {
						// console.log("File dropped:", e.dataTransfer.files[0]);
						setFile(e.dataTransfer.files[0]);
						ReadFile(e.dataTransfer.files[0]);
					}
				}}
				onDragOver={(e) => {
					e.preventDefault();
				}}
				onDragEnter={(e) => {
					// TODO: should add a hover effect
					e.preventDefault();
				}}
			>
				<div {...stylex.props(styles.container)}>
					<H1>{page_title}</H1>

					<br />

					<input
						type="file"
						placeholder="Select file..."
						onChange={handleChange}
					/>

					<br />

					{file && (
						<div>
							<br />

							{type === "IMAGE" && (
								<img
									{...stylex.props(styles.preview_max)}
									id="preview-image"
									src={URL.createObjectURL(file)}
									alt="Preview"
								/>
							)}
							{type === "VIDEO" && (
								<video
									{...stylex.props(styles.preview_max)}
									id="preview-video"
									src={URL.createObjectURL(file)}
									controls
								/>
							)}
							{type === "AUDIO" && (
								<audio
									{...stylex.props(styles.preview_max)}
									id="preview-audio"
									src={URL.createObjectURL(file)}
									controls
								/>
							)}
						</div>
					)}

					<br />

					<pre>{result}</pre>
				</div>
			</div>
		</>
	);
}
