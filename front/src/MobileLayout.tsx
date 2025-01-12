import { Outlet } from "react-router"
import HeaderNavbar from "./components/HeaderNavbar"
import FooterNavbar from "./components/FooterNavbar"

export default function MobileLayout() {
	return (
		<main className="flex h-screen flex-col justify-between">
			<HeaderNavbar />
			<Outlet />
			<FooterNavbar />
		</main>
	)
}
