import { strict as assert } from 'assert';
import { formatFilm } from "../src/index.js";
import { Film } from "../src/types.js";

describe("formatFilm", () => {
  it("should format the movie details correctly", () => {
    const film: Film = {
      id: "1",
      name: "Inception",
      year: "2010",
      posterUrl: "https://example.com/inception.jpg",
      rating: 4.5,
    };

    const result = formatFilm(film);
    assert.equal(result, "Inception (2010) - Rating: 4.5/5");
  });
});
