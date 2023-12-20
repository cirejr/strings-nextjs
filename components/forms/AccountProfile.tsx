'use client'
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { userValidation } from '@/lib/validations/user'
import Image from 'next/image'
import { Textarea } from '../ui/textarea'

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

export default function AccountProfile({ user, btnTitle }: Props) {

	const form = useForm<z.infer<typeof userValidation>>({
		resolver: zodResolver(userValidation),
		defaultValues: {
			profile_photo: user?.image || "",
			name: user?.name || "",
			username: user?.username || "",
			bio: user?.bio || "",
		},
	})

	function handleImage(e: React.ChangeEvent<HTMLInputElement>, fieldChange: (value: string) => void) {
		e.preventDefault();

	}

	function onSubmit(values: z.infer<typeof userValidation>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values)
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col justify-start gap-10"
			>
				<FormField
					control={form.control}
					name="profile_photo"
					render={({ field }) => (
						<FormItem className='flex items-center gap-4'>
							<FormLabel className='account-form_image-label'>
								{field.value ? (
									<Image
										src={field.value}
										alt='profile photo'
										width={96}
										height={96}
										priority
										className='rounded-full object-contain'
									/>
								) : (
									<Image
										src="/assets/profile.svg"
										alt='profile photo'
										width={24}
										height={24}
										className='object-contain'
									/>
								)}
							</FormLabel>
							<FormControl className='flex-1 text-base-semibold text-gray-200'>
								<Input
									type='file'
									accept='image*'
									placeholder="upload a photo"
									className='account-form_image-input'
									onChange={(e) => handleImage(e, field.onChange)}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem className='gap-3 w-full'>
							<FormLabel className='text-base-semibold text-light-2'>Name</FormLabel>
							<FormControl>
								<Input className='account-form_input no-focus' placeholder="shadcn" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem className='gap-3 w-full'>
							<FormLabel className='text-base-semibold text-light-2'>Username</FormLabel>
							<FormControl>
								<Input className='account-form_input no-focus' placeholder="shadcn" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="bio"
					render={({ field }) => (
						<FormItem className='gap-3 w-full'>
							<FormLabel className='text-base-semibold text-light-2'>Bio</FormLabel>
							<FormControl>
								<Textarea
									rows={10}
									className='account-form_input no-focus'
									placeholder="bio" {...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className='bg-primary-500'>Submit</Button>
			</form>
		</Form>
	)
}
