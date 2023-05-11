import { db } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from 'next';
// import { off } from 'process';
import { ParsedUrlQuery } from 'querystring';

interface chapterQuery extends ParsedUrlQuery {
  limit?: string;
  offset?: string
}
interface MyRequest extends NextApiRequest {
  query: chapterQuery
}
 
export default async function handler(
  request: MyRequest,
  response: NextApiResponse,
) {
  const { limit , offset } = request.query;
  console.log(limit, offset)
  const client = await db.connect(); 
  const chapters = await client.sql`SELECT id, chapter, subtitle, pages FROM chapters WHERE mangaid = (SELECT id FROM manga WHERE title='Black Clover')
ORDER BY CAST(chapter AS FLOAT) LIMIT  ${limit} OFFSET ${offset};`;
  return response.status(200).json({ chapters: chapters.rows, offset: offset, limit: limit });
}