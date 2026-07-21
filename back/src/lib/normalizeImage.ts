import sharp from "sharp"
import { BadRequestException } from "./HttpException"

export const ALLOWED_IMAGE_FORMATS = [
	"jpeg",
	"png",
	"webp",
	"avif",
	"heif",
	"gif",
]

export const MAX_INPUT_PIXELS = parseInt(process.env.MAX_INPUT_PIXELS!)

const OUTPUT_CONTENT_TYPE = "image/webp"

export async function normalizeImage(
	file: Buffer,
): Promise<{ buffer: Buffer; contentType: string }> {
	try {
		const image = sharp(file, { limitInputPixels: MAX_INPUT_PIXELS })
		const metadata = await image.metadata()

		if (!metadata.format || !ALLOWED_IMAGE_FORMATS.includes(metadata.format)) {
			throw new BadRequestException()
		}

		const buffer = await image.rotate().webp({ quality: 80 }).toBuffer()

		return { buffer, contentType: OUTPUT_CONTENT_TYPE }
	} catch (error) {
		if (error instanceof BadRequestException) throw error
		throw new BadRequestException()
	}
}
