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
import PublicRoute from "./PublicRoute"
import PrivateRoute from "./PrivateRoute"
import CompletePage from "./views/mobile/complete"
import ResetPage from "./views/mobile/reset"
import ProtectedRoute from "./ProtectedRoute"
import SettingsPage from "./views/mobile/settings"
import { Toaster } from "@/components/ui/sonner"
import ProfileViewsPage from "./views/mobile/profile/views"
import ProfileLikesPage from "./views/mobile/profile/likes"
import PreviewPage from "./views/mobile/preview"
import NotFoundPage from "./views/mobile/notFound"

/*
	TODO

	- Style des messages d'erreur de form
	- Recheck gestion d'erreur
	- Check injections SQL / XSS
	- Filtrer les champs (mail, tailles, password ect)
	
*/

function App() {
	return (
		<ThemeProvider defaultTheme="dark">
			<ReactQueryProvider>
				<BrowserRouter>
					<Routes>
						<Route element={<PublicRoute />}>
							<Route path="login" element={<LoginPage />} />
							<Route path="register" element={<RegisterPage />} />
							<Route index element={<LoginPage />} />
						</Route>
						<Route element={<ProtectedRoute />}>
							<Route path="reset" element={<ResetPage />} />
							<Route path="complete" element={<CompletePage />} />
						</Route>
						<Route element={<PrivateRoute />}>
							<Route element={<MobileLayout />}>
								<Route path="home" element={<HomePage />} />
								<Route path="profile" element={<ProfilePage />} />
								<Route path="profile/views" element={<ProfileViewsPage />} />
								<Route path="profile/likes" element={<ProfileLikesPage />} />
								<Route path="chat" element={<ChatPage />} />
								<Route path="chat/:id" element={<ChatIdPage />} />
								<Route path="settings" element={<SettingsPage />} />
								<Route path="preview" element={<PreviewPage />} />
								<Route path="preview/:userId" element={<PreviewPage />} />
							</Route>
						</Route>
						<Route path="*" element={<NotFoundPage />} />
					</Routes>
				</BrowserRouter>
				<Toaster />
			</ReactQueryProvider>
		</ThemeProvider>
	)
}

export default App
