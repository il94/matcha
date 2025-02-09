import { useParams } from "react-router"

export default function useId() {
	return useParams().id as string
}
