
import { NextApiRequest, NextApiResponse } from "next";

import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    await serverAuth(req, res);

    const { movieId } = req.query;

    if (typeof movieId !== 'string') {
      throw new Error('Id Khong chinh xac: [movieId]:18');
    }

    if (!movieId) {
      throw new Error('Id Khong chinh xac: [movieId]:22');
    }

    const movie = await prismadb.movie.findUnique({
      where: {
        id: movieId
      }
    });

    if (!movie) {
      throw new Error('Id Khong chinh xac: [movieId]:33');
    } 

    return res.status(200).json(movie);

  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}