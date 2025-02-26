import { Route, Routes } from "react-router";
import "./App.css";

import Sidebar from "./commons/sidebar";

import URIEncoderDecoder from "./pages/uri_encode_decode";

import YoutubeThumbnailGrabber from "./pages/youtube/thumbnail_grabber";
import WordCounter from "./pages/strings/word_count";
import CSSCursors from "./pages/css/cursors";
import FFMPEGConvert from "./pages/ffmpeg/convert";

function App() {
	return (
		<>
			<Sidebar />

			<div
				style={{
					display: "grid",
					gridTemplateColumns: "320px 1fr",
					// gridTemplateColumns: "1fr",
				}}
			>
				<div />

				<Routes>
					{/* TEMP default index page */}
					<Route index element={<YoutubeThumbnailGrabber />} />

					<Route path="css/cursors" element={<CSSCursors />} />

					<Route path="uri-encoder-decoder" element={<URIEncoderDecoder />} />

					<Route path="word-counter" element={<WordCounter />} />

					<Route path="ffmpeg">
						<Route
							index
							element={<FFMPEGConvert />}
							path="convert"
						/>
					</Route>

					<Route path="youtube">
						<Route
							index
							element={<YoutubeThumbnailGrabber />}
							path="thumbnail-grabber"
						/>
					</Route>
				</Routes>
			</div>
		</>
	);
}

export default App;
