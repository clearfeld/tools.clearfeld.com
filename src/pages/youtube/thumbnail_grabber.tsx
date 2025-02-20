import { useState } from "react";
import * as stylex from "@stylexjs/stylex";

import { H1, Input, Label, H4 } from "@controlkit/ui";

const styles = stylex.create({
	base: {
		boxSizing: "border-box",
		width: "100%",

		margin: "0 auto",

		paddingTop: "2rem",
		paddingBottom: "2rem",
		paddingRight: "2rem",

		paddingLeft: "2rem",

		// paddingLeft: "calc(320px + 2rem)",
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
	default: {
		title: "Default",
		url: (id) => `https://img.youtube.com/vi/${id}/default.jpg`,
		size: "120x90",
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

	return (
		<div {...stylex.props(styles.base)}>
			<div
				style={{
					padding: "0 1rem",
				}}
			>
				<H1>Youtube Thumbnail Grabber</H1>

				<br />

				<Label>Youtube URL</Label>
				<Input
					value={url}
					onChange={(e) => {
						setUrl(e.target.value);

						if (e.target.value.includes("/shorts/")) {
							// const url = new URL(e.target.value);
							const url = e.target.value;
							const videoID = url.substring(
								url.lastIndexOf("/shorts/") + 8,
								url.length,
							);
							setType("short");

							console.log(videoID);
							if (videoID) setID(videoID);
						} else {
							const url = new URL(e.target.value);
							const searchParams = new URLSearchParams(url.search);
							const videoID = searchParams.get("v");
							setType("video");
							if (videoID) setID(videoID);
						}
					}}
					placeholder="Enter youtube url here..."
				/>

				<br />

				{id && type === "video" && (
					<div>
						{Object.values(YOUTUBE_THUMBNAIL_SIZES).map((size) => {
							return (
								<div key={size.size}>
									<div>
										<H4>{size.title}</H4>
										<img
											src={size.url(id)}
											alt=""
											style={{
												maxWidth: "100%",
											}}
										/>
									</div>
								</div>
							);
						})}
					</div>
				)}

				{id && type === "short" && (
					<div>
						{Object.values(YOUTUBE_SHORTS_THUMBNAILS).map((size) => {
							return (
								<div key={size.title}>
									<div>
										<H4>{size.title}</H4>
										<img
											src={size.url(id)}
											alt=""
											style={{
												maxWidth: "100%",
											}}
										/>
									</div>
								</div>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
}
