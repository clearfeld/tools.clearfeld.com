import "./App.css";
import YoutubeThumbnailGrabber from "./pages/youtube/thumbnail_grabber";
// import PluginsSidebar from "./pages/plugins/sidebar";

function App() {
	return (
		<>
			<div
				style={{
					display: "grid",
					// gridTemplateColumns: "320px 1fr",
					gridTemplateColumns: "1fr",
				}}
			>
				{/* <PluginsSidebar /> */}
				<YoutubeThumbnailGrabber />
			</div>
		</>
	);
}

export default App;
