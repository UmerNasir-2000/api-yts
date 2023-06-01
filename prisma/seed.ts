import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const axiosInstance = axios.create({ baseURL: 'https://yts.mx/api/v2' });

async function seed() {
  const prismaClient = new PrismaClient();

  for (let i = 1; i <= 100; i++) {
    const { data: response } = await axiosInstance.get(
      `/list_movies.json?limit=50&sort_by=rating&page=${i}`,
    );
    for (const movie of response.data.movies) {
      try {
        await prismaClient.movie.create({
          data: {
            slug: movie.slug,
            language: movie.language,
            rating: movie.rating,
            title: movie.title,
            imdb: movie.imdb_code,
            youtubeTrailerCode:
              movie.yt_trailer_code.length === 0 ? null : movie.yt_trailer_code,
            runtime: movie.runtime === 0 ? null : movie.runtime,
            summary: movie.summary.length === 0 ? null : movie.summary,
            year: movie.year,
            genres:
              movie.genres && movie.genres?.length !== 0 ? movie.genres : null,
            poster: {
              create: {
                background: movie.background_image,
                large: movie.large_cover_image,
                small: movie.small_cover_image,
                medium: movie.medium_cover_image,
              },
            },
            torrents: {
              createMany: {
                data: movie.torrents.map((torrent: any) => ({
                  hash: torrent.hash,
                  quality: torrent.quality,
                  type: torrent.type,
                  seeds: torrent.seeds,
                  peers: torrent.peers,
                  size: torrent.size_bytes,
                })),
              },
            },
          },
          include: { poster: true, torrents: true },
        });
      } catch (error) {
        console.log(
          `Error occurred at iteration ${i} with movie ${JSON.stringify(
            movie,
          )}`,
        );
        console.log('error >> ', error);
      }
    }
  }
}

seed();
