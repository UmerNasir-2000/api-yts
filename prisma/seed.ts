// import {getTitleDetailsByIMDBId} from 'movier';

import { Prisma, PrismaClient } from '@prisma/client';
import { Axios } from 'axios';

const axios = new Axios({ baseURL: 'https://yts.mx/api/v2/' });

async function seed() {
  const prisma = new PrismaClient();

  const { data } = await axios.get('list_movies.json?quality=3D&limit=50');

  const response = JSON.parse(data);

  for (const movie of response.data.movies) {
    const { id } = await prisma.cinematic.create({
      data: {
        referenceId: movie.id,
        title: movie.title,
        releasedYear: movie.year,
        description: movie.description_full,
        imdb: movie.imdb_code,
        language: movie.language,
        poster: movie.large_cover_image,
        background: movie.background_image_original,
        slug: movie.slug,
        runtime: movie.runtime,
        posterHash: '',
        youtubeTrailerCode:
          movie.yt_trailer_code.length !== 0 ? movie.yt_trailer_code : null,
        pictures: [movie.medium_cover_image, movie.large_cover_image],
        genres: movie.genres,
      },
    });

    const torrents: Prisma.TorrentCreateManyInput = movie.torrents.map(
      (torrent: any) => ({
        url: torrent.url,
        hash: torrent.hash,
        quality: torrent.quality,
        seeds: torrent.seeds,
        peers: torrent.peers,
        size: torrent.size,
        cinematicId: id,
        isRepack: !!Number(torrent.is_repack),
        type: torrent.type,
        videoCodec: torrent.video_codec,
        audioChannels: torrent.audio_channels,
        bitDepth: Number(torrent.bit_depth),
      }),
    );

    await prisma.torrent.createMany({ data: torrents });
  }

  console.log('Inserted successfully!!!');
}

seed();
