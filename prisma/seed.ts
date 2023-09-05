// import { Prisma, PrismaClient } from '@prisma/client';
import { Prisma, PrismaClient } from '@prisma/client';
import { Axios } from 'axios';
import { getTitleDetailsByIMDBId } from 'movier';

const axios = new Axios({ baseURL: 'https://yts.mx/api/v2/' });

async function seed() {
  const prisma = new PrismaClient();

  const { data } = await axios.get('list_movies.json?quality=3D&limit=50');

  const response = JSON.parse(data);

  for (const movie of response.data.movies) {
    const details = await getTitleDetailsByIMDBId(movie.imdb_code);
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
        budget: details?.boxOffice?.budget?.toString() ?? '',
        director: details?.directors.map((director) => director.name) ?? [],
        tagline: details?.taglines?.at(0) ?? '',
        keywords: details.keywords.slice(0, 20),
        revenue: details?.boxOffice?.worldwide?.toString() ?? '',
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

  // const response = await getTitleDetailsByIMDBId('tt4154796');
  // console.log('response.casts', response.casts);

  // // const person = await getPersonDetailsByIMDBId('nm0424060');

  // // console.log(person.knownFor);

  console.log('Inserted successfully!!!');
}

seed();
