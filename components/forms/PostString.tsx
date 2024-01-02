'use client'
import React, { useState } from 'react'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Textarea } from '../ui/textarea'
import { usePathname, useRouter } from 'next/navigation'

import { updateUser } from '@/lib/actions/user.action'
import { StringValidation } from '@/lib/validations/string'
interface Props {
	user: {
		id: string,
		objectId: string,
		username: string,
		name: string,
		bio: string,
		image: string
	},
	btnTitle: string
}

export default function PostString({ userId }: { userId: string }) {
	const router = useRouter();
	const pathname = usePathname()

	const form = useForm<z.infer<typeof StringValidation>>({
		resolver: zodResolver(StringValidation),
		defaultValues: {
			string: '',
			accountId: userId
		},
	})

	async function onSubmit(values: z.infer<typeof StringValidation>) {
		//await createString(values)
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="mt-10 flex flex-col justify-start gap-10"
			>
				<FormField
					control={form.control}
					name="string"
					render={({ field }) => (
						<FormItem className='gap-3 w-full'>
							<FormLabel className='text-base-semibold text-light-2'>Content</FormLabel>
							<FormControl
								className='no-focus border border-dark-4 bg-dark-3 text-light-1' >
								<Textarea
									rows={15}
									placeholder="shadcn"
									{...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit' className='bg-primary-500'>
					Post String
				</Button>
			</form>
		</Form>
	);
}
