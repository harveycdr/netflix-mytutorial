import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).end();
    }

    const { currentUser } = await serverAuth(req, res);
    if (currentUser.email !== "harvey.hau4502@gmail.com")
    {
      return res.status(400).end();
    }
    
    const {title, videoUrl, thumbnailUrl, genre, duration, description} = req.body;

    const newMovie = await prismadb.movie.create({
      data: {
        title,
        videoUrl,
        thumbnailUrl,
        genre,
        duration,
        description
      }
    });

    return res.status(200).json(newMovie);
  }
  catch (error) {
    return res.status(500).json({ error: `Something went wrong: ${error}` });
  }
}