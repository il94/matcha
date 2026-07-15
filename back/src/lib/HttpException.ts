export class HttpException {
	code: number
	message: string
	constructor(code: number, message: string) {
		this.code = code
		this.message = message
	}
}

export class BadRequestException extends HttpException {
	constructor(message?: string) {
		super(400, message ?? "BAD_REQUEST")
	}
}

export class UnauthorizedException extends HttpException {
	constructor(message?: string) {
		super(401, message ?? "UNAUTHORIZED")
	}
}

export class ForbiddenException extends HttpException {
	constructor(message?: string) {
		super(403, message ?? "FORBIDDEN")
	}
}

export class NotFoundException extends HttpException {
	constructor(message?: string) {
		super(404, message ?? "NOT_FOUND")
	}
}

export class PayloadTooLargeException extends HttpException {
	constructor(message?: string) {
		super(413, message ?? "PAYLOAD_TOO_LARGE")
	}
}

export class InternalServerError extends HttpException {
	constructor(message?: string) {
		super(500, message ?? "INTERNAL_SERVER_ERROR")
	}
}

export class BadGatewayException extends HttpException {
	constructor(message?: string) {
		super(502, message ?? "BAD_GATEWAY")
	}
}
