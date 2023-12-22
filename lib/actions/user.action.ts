"use server"
import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose"

interface Params {
	userId: string,
	username: string,
	name: string,
	bio: string,
	image: string,
	path: string
}

export async function updateUser({
	userId,
	username,
	name,
	bio,
	image,
	path
}: Params): Promise<void> {
	connectToDB();

	try {
		await User.findOneAndUpdate(
			{ id: userId },
			{
				username: username.toLocaleLowerCase(),
				name,
				bio,
				image,
				path,
				onBoarded: true
			},
			{ upsert: true }
		)

		if (path === '/profile/edit') {
			revalidatePath(path)
		}
	} catch (error: any) {
		throw new Error(`Failed to create/update user: ${error.message}`)
	}
}