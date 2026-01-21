export const getMovieGenres = (genreList: any[], genre_ids: string) => {
  const genre_ids_arr = genre_ids?.split(",") || [];
  const genres = genreList
    .filter((genre) => genre_ids_arr.includes(genre.id.toString()))
    .map((genre) => genre.name);
  return genres.join(". ");
};

export const formatDateWorldwide = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString + "T00:00:00Z");

  if (isNaN(date.getTime())) return "";

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  return `${month} ${day}, ${year} (Worldwide)`;
};
