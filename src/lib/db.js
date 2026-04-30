import { MongoClient } from 'mongodb';

let client;
let clientPromise;

export function getMongoClientPromise() {
  if (clientPromise) return clientPromise;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    if (process.env.NODE_ENV === 'production') {
      console.warn('MONGODB_URI is missing. Database features will fail.');
      // Return a singleton promise that rejects with a clear message to avoid hangs
      clientPromise = Promise.reject(new Error('MONGODB_URI is not defined'));
      return clientPromise;
    }
    throw new Error('Please add your MONGODB_URI to .env.local');
  }

  const options = {};
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
  return clientPromise;
}

// Do not execute at module load time to avoid build-time connection attempts
export default getMongoClientPromise;
