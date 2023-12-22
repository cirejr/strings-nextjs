import mongoose from 'mongoose';

let isConnected = false;  //var to check if mongoose is connected

export async function connectToDB() {
	mongoose.set('strictQuery', true);

	const mongoDBUrl = process.env.MONGODB_URL;
	if (!mongoDBUrl) {
		throw new Error('MONGODB_URL is not defined');
	}

	if (isConnected) {
		console.log("Already connected to MongoDB");
		return;
	}

	try {
		await mongoose.connect(mongoDBUrl);
		isConnected = true;
		console.log('Connected to MongoDB');
	} catch (error) {
		console.error('Failed to connect to MongoDB', error);
	}
}
