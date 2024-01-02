import * as z from "zod"

export const StringValidation = z.object({
	string: z.string().nonempty().min(3, { message: 'Minimum 3 characters' }),
	accountId: z.string()
})

export const CommentValidation = z.object({
	string: z.string().nonempty().min(3, { message: 'Minimum 3 characters' }),
})	