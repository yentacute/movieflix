export const getMovieGenres = (genreList: any[], genre_ids: string) => {
  const genre_ids_arr = genre_ids?.split(",") || [];
  const genres = genreList
    .filter((genre) => genre_ids_arr.includes(genre.id.toString()))
    .map((genre) => genre.name);
  return genres.join(". ");
};
