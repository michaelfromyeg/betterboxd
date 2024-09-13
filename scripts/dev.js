/* eslint-disable @typescript-eslint/no-unused-vars */
import { addTmdbPosterUrls, fetchLetterboxdDiary } from "../dist/src/index.js";

(async () => {
  console.log("Betterboxd dev script...");

  const { films, totalPages } = await fetchLetterboxdDiary("michaelfromyeg");

  await addTmdbPosterUrls(films);

  console.log(films);
  console.log(`Total pages: ${totalPages}`);

  console.log("Done!");
})();
