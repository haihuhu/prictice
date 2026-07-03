// 1. import drizzle (from which path? postgres-js)
import { drizzle } from 'drizzle-orm/postgres-js';
// 2. import the postgres driver
import postgres from 'postgres';
// 3. create client from the connection string in .env
const client = postgres(process.env.DATABASE_URL!);
// 4. wrap client with drizzle, export as db
export const db = drizzle(client);
