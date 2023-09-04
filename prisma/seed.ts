// import {getTitleDetailsByIMDBId} from 'movier';

import { PrismaClient } from '@prisma/client';
import { Axios } from 'axios';

const axios = new Axios({ baseURL: 'https://yts.mx/api/v2/' });

async function seed() {
  const prisma = new PrismaClient();

  const { data } = await axios.get('list_movies.json?quality=3D&limit=50');

  const response = JSON.parse(data);

  for (const movie of response.data.movies) {
    const createdMovie = await prisma.cinematic.create({
      data: {
        referenceId: movie.id,
        title: movie.title,
        releasedYear: movie.year,
        description: movie.description_full,
        imdb: movie.imdb_code,
        language: movie.language,
        poster: movie.large_cover_image,
        slug: movie.slug,
        runtime: movie.runtime,
        posterHash: '',
        youtubeTrailerCode: movie.yt_trailer_code,
        pictures: [],
        genres: [],
        covers: [],
      },
    });

    console.log('createdMovie', createdMovie);
  }

  console.log('Inserted successfully!!!');
}

seed();
