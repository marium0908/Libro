import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import getMongoClientPromise from "./db";

// Handle build phase mock to prevent connection errors during 'next build'
const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build' || process.env.NODE_ENV === 'production' && !process.env.MONGODB_URI;

export const auth = betterAuth({
    database: (process.env.MONGODB_URI && !isBuildPhase) 
        ? mongodbAdapter(await getMongoClientPromise()) 
        : undefined, // Better Auth will handle missing DB gracefully if needed or we use it as is
    emailAndPassword: {
        enabled: true
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID || "placeholder",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "placeholder",
        }
    },
    trustedOrigins: [process.env.BETTER_AUTH_URL || "https://libro-nu-seven.vercel.app/"]
});
