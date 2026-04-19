import { MongoClient, Db } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI as string;
const MONGODB_DB = process.env.MONGODB_DB || "intel_fusion";

if (!MONGODB_URI) {
  throw new Error(
    "Please define MONGODB_URI in .env.local or Vercel Environment Variables."
  );
}

// Global singleton to prevent too many connections in dev (hot reload)
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    const client = new MongoClient(MONGODB_URI);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, always create a fresh connection per cold start
  const client = new MongoClient(MONGODB_URI);
  clientPromise = client.connect();
}

/** Returns the intel_fusion database */
export async function getDb(): Promise<Db> {
  const client = await clientPromise;
  return client.db(MONGODB_DB);
}

export default clientPromise;
