import { Outlet } from "react-router"
import HeaderNavbar from "./HeaderNavbar"
import FooterNavbar from "./FooterNavbar"
import useAuthOutletContext from "@/hooks/useAuthOutletContext"

export default function MobileLayout() {
	return (
		<main className="flex h-dvh flex-col justify-between">
			<HeaderNavbar />
			<Outlet context={useAuthOutletContext()} />
			<FooterNavbar />
		</main>
	)
}
