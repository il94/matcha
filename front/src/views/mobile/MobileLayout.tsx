import { Outlet } from "react-router"
import HeaderNavbar from "./HeaderNavbar"
import FooterNavbar from "./FooterNavbar"
import useAuthOutletContext from "@/hooks/useAuthOutletContext"

export default function MobileLayout() {
	const authOutletContext = useAuthOutletContext()

	return (
		<main className="flex h-dvh flex-col justify-between">
			<HeaderNavbar />
			{!authOutletContext.isReady ? (
				<p>Connecting ...</p> // TODO
			) : (
				<Outlet context={authOutletContext} />
			)}
			<FooterNavbar />
		</main>
	)
}
