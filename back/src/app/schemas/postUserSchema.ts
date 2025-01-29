export const postUserSchema = {
	schema: {
		body: {
			type: "object",
			properties: {
				firstName: { type: "string" },
				lastName: { type: "string" },
				userName: { type: "string" },
				email: { type: "string" },
				birthDate: { type: "string" },
				gender: { type: ["string", "null"] },
				sexuality: { type: ["string", "null"] },
			},
			required: ["firstName", "lastName", "userName", "email", "birthDate"],
		},
	},
}
