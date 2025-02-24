import { Route, Routes } from "react-router";
import "./App.css";

import Sidebar from "./commons/sidebar";

import URIEncoderDecoder from "./pages/uri_encode_decode";

import YoutubeThumbnailGrabber from "./pages/youtube/thumbnail_grabber";

function App() {
	return (
		<>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "320px 1fr",
					// gridTemplateColumns: "1fr",
				}}
			>
				<Sidebar />

				<Routes>
					{/* TEMP default index page */}
					<Route index element={<YoutubeThumbnailGrabber />} />

					<Route path="uri-encoder-decoder" element={<URIEncoderDecoder />} />

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
