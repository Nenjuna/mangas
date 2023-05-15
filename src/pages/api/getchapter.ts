import { db } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from 'next';
import { ParsedUrlQuery } from 'querystring';

interface chapterQuery extends ParsedUrlQuery {
  mangaid?: string;
}
interface MyRequest extends NextApiRequest {
  query: chapterQuery
}
 
export default async function handler(
  request: MyRequest,
  response: NextApiResponse,
) {
  const { mangaid } = request.query;
  const id = Number(mangaid?.split('_')[1]) % 1 == 0 ? mangaid?.split('_')[1] + ".0" : mangaid?.split('_')[1]
  const client = await db.connect(); 
  const chapter = await client.sql`SELECT id, chapter, subtitle, pages FROM chapters WHERE mangaid = (SELECT id FROM manga WHERE title='Black Clover') AND chapter like ${id};`;
//   console.log(chapter.rows)
  if(chapter.rows.length == 0){
    return response.status(200).json({chapter: {
        chapter: id,
        subtitle: "Coming Soon",
        pages: "https://img.spoilerhat.com/img/?url=https://i.imgur.com/bUqKp0v.png",
    }
})
  }else{
    return response.status(200).json({ chapter: chapter.rows[0], });
}
  }
  