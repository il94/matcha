import axios from "@/lib/axios"
import SexualOrientation from "@/data/SexualOrientation"
import Gender from "@/data/Gender"

type completeParams = {
	birthDate: string
	gender: Gender
	sexualOrientation: SexualOrientation
	tags: Tag["id"][]
	bio: string
	principalPicture: Blob
	secondaryPicture1?: Blob
	secondaryPicture2?: Blob
	secondaryPicture3?: Blob
	secondaryPicture4?: Blob
	longitude?: number
	latitude?: number
	locationLabel?: string
}

export default async function complete({
	birthDate,
	gender,
	sexualOrientation,
	tags,
	bio,
	principalPicture,
	secondaryPicture1,
	secondaryPicture2,
	secondaryPicture3,
	secondaryPicture4,
	longitude,
	latitude,
	locationLabel,
}: completeParams) {
	const formData = new FormData()

	formData.append("birthDate", birthDate)
	formData.append("gender", gender)
	formData.append("sexualOrientation", sexualOrientation)
	formData.append("tags", JSON.stringify(tags))
	formData.append("bio", bio)
	formData.append("principalPicture", principalPicture)
	if (secondaryPicture1) formData.append("secondaryPicture1", secondaryPicture1)
	if (secondaryPicture2) formData.append("secondaryPicture2", secondaryPicture2)
	if (secondaryPicture3) formData.append("secondaryPicture3", secondaryPicture3)
	if (secondaryPicture4) formData.append("secondaryPicture4", secondaryPicture4)
	if (longitude) formData.append("longitude", longitude.toString())
	if (latitude) formData.append("latitude", latitude.toString())
	if (locationLabel) formData.append("locationLabel", locationLabel)

	const response = await axios.put(`/complete`, formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	})

	return response.data
}
