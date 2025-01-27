import { BrowserRouter, Routes, Route } from "react-router"
import MobileLayout from "./views/mobile/MobileLayout"
import { ThemeProvider } from "./providers/ThemeProvider"
import HomePage from "./views/mobile/home"
import ProfilePage from "./views/mobile/profile"
import ChatPage from "./views/mobile/chat"
import ChatIdPage from "./views/mobile/chat/:id"

function App() {
	return (
		<ThemeProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<MobileLayout />}>
						<Route index element={<HomePage />} />
						<Route path="profile" element={<ProfilePage />} />
						<Route path="chat" element={<ChatPage />} />
						<Route path="chat/:id" element={<ChatIdPage />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	)
}

export default App
