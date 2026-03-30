import "server-only"

import { MongoClient, type Db } from "mongodb"

const MONGODB_URI =
  process.env.MONGODB_URI 
 

const DB_NAME = "badal-agency-connection"

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

export async function getDatabase(): Promise<Db> {
  if (cachedDb) return cachedDb

  const client = new MongoClient(MONGODB_URI)
  await client.connect()

  cachedClient = client
  cachedDb = client.db(DB_NAME)

  return cachedDb
}

export { cachedClient }
