/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useState } from "react";
import * as stylex from "@stylexjs/stylex";

import { H1, Input, Label, H4, H3, Button } from "@controlkit/ui";

const styles = stylex.create({
	base: {
		boxSizing: "border-box",
		width: "100%",

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

	maxWidth: {
		maxWidth: "100%",
		borderRadius: "0.25rem",
		paddingBottom: "1rem",
	},

	cell_outline: {
		outline: "1px solid var(--border-100)",
		padding: "0.75rem 1rem",
	},

	content_base: {
		display: "grid",
		alignContent: "center",
		background: "var(--background-100)",
		maxWidth: "100%",
	},

	img_wrapper: {
		margin: "0 auto",
		width: "100%",
		display: "grid",
		justifyContent: "center",
		justifyItems: "center",
		padding: "1rem 0",
	},

	img_title: {
		textAlign: "center",
		paddingBottom: "0.5rem",
	},

	img: {
		objectFit: "cover",
		maxWidth: "1160px",
		width: "100%",
		height: "100%",
		borderRadius: "0.5rem",
		justifySelf: "center",
	},

	textOverflow: {
		textWrap: "nowrap",
		overflow: "hidden",
		textOverflow: "ellipsis",
	},
});

const YOUTUBE_THUMBNAIL_SIZES: Record<
	string,
	{ title: string; url: (id: string) => string; size: string }
> = {
	maxres: {
		title: "Maximum Resolution",
		url: (id) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
		size: "1280x720",
	},

	standard: {
		title: "Standard Definition",
		url: (id) => `https://img.youtube.com/vi/${id}/sddefault.jpg`,
		size: "640x480",
	},
	high: {
		title: "High Quality",
		url: (id) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
		size: "480x360",
	},
	medium: {
		title: "Medium Quality",
		url: (id) => `https://img.youtube.com/vi/${id}/mqdefault.jpg`,
		size: "320x180",
	},
	default: {
		title: "Default",
		url: (id) => `https://img.youtube.com/vi/${id}/default.jpg`,
		size: "120x90",
	},
	thumbnail1: {
		title: "Thumbnail 1",
		url: (id) => `https://img.youtube.com/vi/${id}/1.jpg`,
		size: "120x90",
	},
	thumbnail2: {
		title: "Thumbnail 2",
		url: (id) => `https://img.youtube.com/vi/${id}/2.jpg`,
		size: "120x90",
	},
	thumbnail3: {
		title: "Thumbnail 3",
		url: (id) => `https://img.youtube.com/vi/${id}/3.jpg`,
		size: "120x90",
	},
};

const YOUTUBE_SHORTS_THUMBNAILS: Record<
	string,
	{ title: string; url: (id: string) => string }
> = {
	default: {
		title: "Default",
		url: (id) => `https://img.youtube.com/vi/${id}/oardefault.jpg`,
	},
	start: {
		title: "Start Frame",
		url: (id) => `https://img.youtube.com/vi/${id}/oar1.jpg`,
	},
	middle: {
		title: "Middle Frame",
		url: (id) => `https://img.youtube.com/vi/${id}/oar2.jpg`,
	},
	end: {
		title: "End Frame",
		url: (id) => `https://img.youtube.com/vi/${id}/oar3.jpg`,
	},
};

export default function YoutubeThumbnailGrabber() {
	const [url, setUrl] = useState<string>("");
	const [id, setID] = useState<string | null>(null);

	const [type, setType] = useState<"video" | "short">("video");

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const [info, setInfo] = useState<any | null>(null);

	function getVideoInfoFromOEmbed(video_id_arg: string): void {
		fetch(
			`https://www.youtube.com/oembed?format=json&url=https://www.youtube.com/watch?v=${video_id_arg}`,
		)
			.then((response) => {
				response.json().then((data) => {
					// console.log(data);
					setInfo(data);
				});
			})
			.catch((error) => {
				console.warn("Failed to fetch video info - ", error);
			});
	}

	function downloadImage(url: string, title: string) {
		try {
			fetch(url)
				.then((response) => response.blob())
				.then((blob) => {
					const objectUrl = URL.createObjectURL(blob);
					const link = document.createElement("a");
					link.href = objectUrl;
					link.download = title;
					document.body.appendChild(link);
					link.click();
					document.body.removeChild(link);
					URL.revokeObjectURL(objectUrl);
				})
				.catch((error) => {
					console.warn("Failed to download image - ", error);
				});
		} catch (error) {
			console.warn("Failed to download image - ", error);
		}
	}

	return (
		<>
			<title>Youtube Thumbnail Grabber</title>
			<meta
				name="description"
				content={
					"A simple youtube thumbnail grabber, works for both video and shorts."
				}
			/>

			<div {...stylex.props(styles.base)}>
				<div {...stylex.props(styles.container)}>
					<H1>Youtube Thumbnail Grabber</H1>

					<br />

					<Label>Youtube URL</Label>
					<Input
						value={url}
						onChange={(e: ChangeEvent<HTMLInputElement>) => {
							setUrl(e.target.value);

							try {
								if (e.target.value.includes("/shorts/")) {
									// const url = new URL(e.target.value);
									const url = e.target.value;
									const videoID = url.substring(
										url.lastIndexOf("/shorts/") + 8,
										url.length,
									);
									setType("short");
									// console.log(videoID);
									if (videoID) {
										setID(videoID);
										getVideoInfoFromOEmbed(videoID);
									}
								} else {
									const url = new URL(e.target.value);
									const searchParams = new URLSearchParams(url.search);
									const videoID = searchParams.get("v");
									setType("video");
									if (videoID) {
										setID(videoID);
										getVideoInfoFromOEmbed(videoID);
									}
								}
							} catch (error) {
								console.warn("Failed to construct URL - ", error);
							}
						}}
						placeholder="Enter youtube url here..."
					/>

					<br />
					<br />

					<H3 extend={styles.img_title}>{info?.title}</H3>
					<H4 extend={styles.img_title}>{info?.author_name}</H4>
					{/* <H6 extend={styles.img_title}>{id}</H6> */}

					{id && type === "video" && (
						<div>
							{Object.values(YOUTUBE_THUMBNAIL_SIZES).map((size) => {
								return (
									<div key={size.title} {...stylex.props(styles.img_wrapper)}>
										<H4 extend={styles.img_title}>{size.title}</H4>
										<img
											src={size.url(id)}
											{...stylex.props(styles.maxWidth)}
											alt={`${info?.title}__${size.title}`}
										/>

										<Button
											onClick={() =>
												downloadImage(
													size.url(id),
													`${info?.title} --- ${info?.author_name} --- ${id}.jpg`,
												)
											}
										>
											Download {size.title}
										</Button>
									</div>
								);
							})}
						</div>
					)}

					{id && type === "short" && (
						<div>
							{Object.values(YOUTUBE_SHORTS_THUMBNAILS).map((size) => {
								return (
									<div key={size.title} {...stylex.props(styles.img_wrapper)}>
										<H4 extend={styles.img_title}>{size.title}</H4>
										<img
											src={size.url(id)}
											{...stylex.props(styles.maxWidth)}
											alt={`${info?.title}__${size.title}`}
										/>

										<Button
											onClick={() =>
												downloadImage(
													size.url(id),
													`${info?.title} --- ${info?.author_name} --- ${id}.jpg`,
												)
											}
										>
											Download {size.title}
										</Button>
									</div>
								);
							})}
						</div>
					)}
				</div>
			</div>
		</>
	);
}
