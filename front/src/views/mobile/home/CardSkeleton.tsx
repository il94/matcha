import { Skeleton } from "@/components/ui/skeleton"

export default function CardSkeleton() {
	return (
		<>
			<div className="mb-4 grow overflow-hidden">
				<Skeleton className="h-full w-full rounded-2xl" />
			</div>
			<div className="flex h-16 w-full shrink-0 items-center justify-center gap-4">
				<Skeleton className="size-16 shrink-0 rounded-full" />
				<Skeleton className="size-16 shrink-0 rounded-full" />
			</div>
		</>
	)
}
