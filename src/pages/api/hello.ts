import { db } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from 'next';
 
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const client = await db.connect(); 
  const pets = await client.sql`SELECT id, chapter, subtitle, pages FROM chapters WHERE mangaid = (SELECT id FROM manga WHERE title='Black Clover')
ORDER BY CAST(chapter AS FLOAT);`;
  return response.status(200).json({ pets });
}