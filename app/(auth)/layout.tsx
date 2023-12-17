import { ReactNode } from 'react'
import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import '../globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Strings',
	description: 'My Own Threads App'
}

const inter = Inter({
	subsets: ["latin"]
})

export default function RootLayout({
	children
}: {
	children: ReactNode
}) {
	return (
		<ClerkProvider>
			<html lang='en'>
				<body className={`${inter.className} bg-dark-1`}>
					{children}

				</body>
			</html>
		</ClerkProvider>
	)
} 
