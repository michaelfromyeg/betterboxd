import { formatFilm, fetchLetterboxdReviews } from '../dist/index.js';

const myMovie = {
  name: 'Inception',
  year: "2010",
  rating: 4.5
};

console.log(formatFilm(myMovie));

(async () => {
  const { films, totalPages } = await fetchLetterboxdReviews('michaelfromyeg');
  console.log(films);
  console.log(`Total pages: ${totalPages}`);
})();
