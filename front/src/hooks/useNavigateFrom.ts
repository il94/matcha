import { To, useNavigate } from "react-router"

export default function useNavigateFrom() {
	const navigate = useNavigate()

	return (to: To) => navigate(to, { state: { from: location.pathname } })
}
