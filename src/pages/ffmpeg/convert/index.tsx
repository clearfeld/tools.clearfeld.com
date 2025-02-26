import { useEffect, useRef, useState } from "react";
import * as stylex from "@stylexjs/stylex";

import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

// TODO: add ffprobe
// TODO: have toggle for gif or webm

const page_title = "MP4 to Webm";

import {
	H1,
	Button,
	LoadingSpinner,
	Alert,
	AlertIconDefault,
	AlertTitle,
	AlertDescription,
	AlertVariants,
	ButtonVariants,
} from "@controlkit/ui";

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

	sub_container: {
		gap: "1rem",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},

	block: {
		width: "50%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
	},

	videotag: {
		minWidth: "320px",
		minHeight: "240px",
		maxWidth: "320px",
		maxHeight: "240px",
	},
});

export default function FFMPEGConvert() {
	const [loaded, setLoaded] = useState<boolean>(false);
	const ffmpegRef = useRef(new FFmpeg());
	const videoRef = useRef<HTMLVideoElement>(null);
	const fileRef = useRef<File>(null);
	const videoTranscodeRef = useRef<HTMLVideoElement>(null);
	const messageRef = useRef<HTMLParagraphElement | null>(null);

	const [transcoding, setTranscoding] = useState<boolean>(false);

	useEffect(() => {
		load();
	}, []);

	const load = async () => {
		const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.10/dist/esm";
		const ffmpeg = ffmpegRef.current;

		// ffmpeg.on("log", ({ message }) => {
		// 	if (messageRef.current) {
		// 		messageRef.current.innerHTML = message;
		// 	}
		// 	console.log(message);
		// });

		ffmpeg.on("progress", ({ progress, time }) => {
			if (messageRef.current) {
				messageRef.current.innerHTML = `${progress * 100} % (transcoded time: ${time / 1000000} s)`;
			}
		});

		// toBlobURL is used to bypass CORS issue, urls with the same
		// domain can be used directly.
		await ffmpeg
			.load({
				coreURL: await toBlobURL(
					`${baseURL}/ffmpeg-core.js`,
					"text/javascript",
				),
				wasmURL: await toBlobURL(
					`${baseURL}/ffmpeg-core.wasm`,
					"application/wasm",
				),
				workerURL: await toBlobURL(
					`${baseURL}/ffmpeg-core.worker.js`,
					"text/javascript",
				),
			})
			.catch((err) => {
				console.error("Failed to LOAD FFMPEG", err);
			});

		setLoaded(true);
	};

	const transcode = async () => {
		const ffmpeg = ffmpegRef.current;

		if (videoRef?.current === null) return;
		if (fileRef?.current === null) return;

		setTranscoding(true);

		await ffmpeg.writeFile(
			"input.mp4",

			await fetchFile(fileRef.current),
		);

		await ffmpeg.exec([
			"-i",
			"input.mp4",
			"-fflags",
			"+genpts",
			"-preset",
			"ultrafast",
			"-c:v",
			"libvpx",
			"-c:a",
			"libvorbis",
			"-crf",
			"23",
			"-threads",
			"0",
			"output.webm",
		]);

		const data = await ffmpeg.readFile("output.webm");
		if (videoTranscodeRef.current) {
			videoTranscodeRef.current.src = URL.createObjectURL(
				new Blob([data], { type: "video/webm" }),
			);
		}
		setTranscoding(false);
	};

	function ReadFile(file_arg: File): void {
		fileRef.current = file_arg;
		if (videoRef.current) {
			videoRef.current.src = URL.createObjectURL(file_arg);
		}
	}

	return (
		<>
			<title>{page_title}</title>
			<meta name="description" content={"Convert mp4 files to webm"} />

			<div
				{...stylex.props(styles.base)}
				onDrop={async (e) => {
					e.preventDefault();
					if (e.dataTransfer.files?.[0]) {
						// console.log("File dropped:", e.dataTransfer.files[0]);
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

					{loaded ? (
						<div>
							<div {...stylex.props(styles.sub_container)}>
								<div {...stylex.props(styles.block)}>
									<video
										ref={videoRef}
										controls
										{...stylex.props(styles.videotag)}
									/>

									<br />
									<br />

									<Button
										onClick={() =>
											document.getElementById("fileInput")?.click()
										}
										fullWidth
										variant={ButtonVariants.ACTION}
									>
										<input
											type="file"
											id="fileInput"
											style={{ display: "none" }}
											accept="video/*"
											onChange={(e) => {
												if (e.target.files?.[0]) {
													console.log("File selected:", e.target.files[0]);
													ReadFile(e.target.files[0]);
													// Handle file here
												}
											}}
										/>
										Click or drag and drop a video file here
									</Button>

									<br />

									<p>&nbsp;</p>
								</div>

								<div {...stylex.props(styles.block)}>
									<video
										ref={videoTranscodeRef}
										controls
										{...stylex.props(styles.videotag)}
									/>

									<br />
									<br />

									<Button
										onClick={() => {
											if (videoTranscodeRef.current?.src && fileRef.current) {
												const a = document.createElement("a");
												a.href = videoTranscodeRef.current.src;

												a.download = `${fileRef.current.name.split(".")[0]}.webm`;
												document.body.appendChild(a);
												a.click();
												document.body.removeChild(a);
											}
										}}
										disabled={
											!videoTranscodeRef.current ||
											!videoTranscodeRef.current.src ||
											transcoding
										}
										fullWidth
									>
										Download converted video
									</Button>

									<br />

									<p ref={messageRef}>&nbsp;</p>
								</div>
							</div>

							<Button onClick={transcode} fullWidth loading={transcoding}>
								Begin Transcode
							</Button>
						</div>
					) : (
						<div>
							<p>Loading ffmpeg...</p>
							<LoadingSpinner />
						</div>
					)}

					<br />

					<Alert variant={AlertVariants.DEFAULT}>
						<AlertIconDefault />
						<AlertTitle>Heads up!</AlertTitle>
						<AlertDescription>
							Please note that this is the ffmpeg.wasm library running in the
							browser. The transcoding process is done within the browser and
							may take some time depending on the size of the video file.
						</AlertDescription>
					</Alert>
				</div>
			</div>
		</>
	);
}
