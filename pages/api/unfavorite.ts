import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/lib/prismadb';

import { getSession } from "next-auth/react";
import { without } from "lodash";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).end();
    }

    const session = await getSession({ req });

    if (!session?.user?.email) {
      throw new Error('Không đăng nhập');
    }

    const { movieId } = req.body;

    const existingMovie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      }
    });

    if (!existingMovie) {
      throw new Error('Id không đúng');
    }

    const user = await prismadb.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      throw new Error('Email không đúng');
    }

    const updatedFavoriteIds = without(user.favoriteIds, movieId);

    const updatedUser = await prismadb.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        favoriteIds: updatedFavoriteIds,
      }
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}