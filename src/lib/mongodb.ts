import { MongoClient, Db } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || "intel_fusion";

// ── Connection options: 5s timeout so Vercel doesn't hang on unconfigured Atlas ──
const OPTIONS = {
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 5000,
  socketTimeoutMS: 10000,
};

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function createClient(): Promise<MongoClient> {
  if (!MONGODB_URI) {
    return Promise.reject(
      new Error("MONGODB_URI is not defined. Add it to .env.local or Vercel Environment Variables.")
    );
  }
  const client = new MongoClient(MONGODB_URI, OPTIONS);
  return client.connect();
}

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // Reuse across hot-reloads in dev
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = createClient();
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = createClient();
}

/** Returns the intel_fusion database — throws if connection fails */
export async function getDb(): Promise<Db> {
  const client = await clientPromise;
  return client.db(MONGODB_DB);
}

export default clientPromise;
