import mongoose from 'mongoose'

let isConnected = false;  //var to check if mongoose is connected

export async function connectToDB() {
	mongoose.set('strictQuery', true);

	if (!process.env.MONGOBD_URL) return console.log('MONGODB_URL NOT FOUND');
	if (isConnected) return console.log("Connected to MongoDB")

	try {
		await mongoose.connect(process.env.MONGODB_URL)

		isConnected = true

		console.log('Connected to MongoDB')
	} catch (error) {
		console.log(error)
	}
}