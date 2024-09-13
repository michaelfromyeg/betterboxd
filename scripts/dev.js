/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  addTmdbPosterUrls,
  fetchLetterboxdDiary,
  fetchLetterboxdFilms,
  fetchLetterboxdReviews,
} from "../dist/src/index.js";

(async () => {
  console.log("Betterboxd dev script...");

  const films = await fetchLetterboxdFilms("michaelfromyeg");
  await addTmdbPosterUrls(films.films);

  const diary = await fetchLetterboxdDiary("michaelfromyeg");
  const reviews = await fetchLetterboxdReviews("michaelfromyeg");

  console.log("Films", films);
  console.log("Diary", diary);
  console.log("Reviews", reviews);

  console.log("Done!");
})();
