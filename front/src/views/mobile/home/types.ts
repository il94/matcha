import { PanInfo } from "motion/react"

export type FramerCallback = (
	_: globalThis.MouseEvent | TouchEvent | PointerEvent,
	info: PanInfo,
) => void
