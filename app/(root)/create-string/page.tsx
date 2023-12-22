import PostString from '@/components/forms/PostString'
import { fetchUser } from '@/lib/actions/user.action'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function page() {
	const user = await currentUser()

	if (!user) return null

	const userInfo = await fetchUser(user.id)

	if (!userInfo?.onboarded) redirect('/onboarding')
	return (
		<>
			<h1 className='head-text'>Create Strings</h1>
			<PostString userId={userInfo?._id} />
		</>
	)
}
