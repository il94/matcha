import { BrowserRouter, Routes, Route } from "react-router"
import MobileLayout from "./views/mobile/MobileLayout"
import { ThemeProvider } from "./providers/ThemeProvider"
import HomePage from "./views/mobile/home"
import ProfilePage from "./views/mobile/profile"
import ChatPage from "./views/mobile/chat"
import ChatIdPage from "./views/mobile/chat/:id"
import ReactQueryProvider from "./providers/ReactQueryProvider"
import LoginPage from "./views/mobile/login"
import RegisterPage from "./views/mobile/register"

/*
	TODO

	- Style des messages d'erreur de form
	- Recheck gestion d'erreur
	- Check injections SQL / XSS
	- Filtrer les champs (mail, tailles, password ect)
	
*/

function App() {
	return (
		<ThemeProvider>
			<ReactQueryProvider>
				<BrowserRouter>
					<Routes>
						<Route index element={<LoginPage />} />
						<Route path="login" element={<LoginPage />} />
						<Route path="register" element={<RegisterPage />} />
						<Route element={<MobileLayout />}>
							<Route path="home" element={<HomePage />} />
							<Route path="profile" element={<ProfilePage />} />
							<Route path="chat" element={<ChatPage />} />
							<Route path="chat/:id" element={<ChatIdPage />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</ReactQueryProvider>
		</ThemeProvider>
	)
}

export default App
