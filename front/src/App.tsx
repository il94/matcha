import { BrowserRouter, Routes, Route } from "react-router"
import MobileLayout from "./views/mobile/MobileLayout"
import Home from "./views/mobile/home"
import { ThemeProvider } from "./providers/ThemeProvider"
import Profile from "./views/mobile/profile"

function App() {
	return (
		<ThemeProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<MobileLayout />}>
						<Route index element={<Home />} />
						<Route path="profile" element={<Profile />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	)
}

export default App
