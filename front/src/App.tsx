import { BrowserRouter, Routes, Route } from "react-router"
import MobileLayout from "./MobileLayout"
import Home from "./Home"
import { ThemeProvider } from "./providers/ThemeProvider"

function App() {
	return (
		<ThemeProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<MobileLayout />}>
						<Route index element={<Home />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	)
}

export default App
