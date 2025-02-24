// Using edge-runtime for better performance
import { Pool } from '@neondatabase/serverless';

const pool = new Pool({ connectionString: process.env.DATABASE_URL! });

export default pool;