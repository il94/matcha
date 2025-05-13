import axios from "@/lib/axios"

type UpdateUserPicturesParams = {
	principalPicture: string | Blob
	secondaryPicture1?: string | Blob
	secondaryPicture2?: string | Blob
	secondaryPicture3?: string | Blob
	secondaryPicture4?: string | Blob
}

export default async function updateUserPictures(
	picturesData: UpdateUserPicturesParams,
) {
	const formData = new FormData()

	formData.append("principalPicture", picturesData.principalPicture)
	if (picturesData.secondaryPicture1)
		formData.append("secondaryPicture1", picturesData.secondaryPicture1)
	if (picturesData.secondaryPicture2)
		formData.append("secondaryPicture2", picturesData.secondaryPicture2)
	if (picturesData.secondaryPicture3)
		formData.append("secondaryPicture3", picturesData.secondaryPicture3)
	if (picturesData.secondaryPicture4)
		formData.append("secondaryPicture4", picturesData.secondaryPicture4)

	const response = await axios.patch(`/user/pictures`, formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	})

	return response.data
}
