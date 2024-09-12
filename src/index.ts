import * as cheerio from "cheerio";

import { getHtmlContent, convertRatingToNumber, sleep } from "./utils.js";
import { Film } from "./types.js";

export function formatFilm(film: Film): string {
  return `${film.name} (${film.year}) - Rating: ${film.rating}/5`;
}

export async function fetchLetterboxdFilms(
  username: string,
  maxPages: number = 5,
): Promise<{ films: Film[]; totalPages: number; fetchedPages: number }> {
  const { films: firstFilms, totalPages } =
    await fetchLetterboxdFilmsByPage(username);

  let films = [...firstFilms];
  let fetchedPages = 1;
  while (fetchedPages < Math.min(totalPages, maxPages)) {
    const { films: fetchedFilms } = await fetchLetterboxdFilmsByPage(
      username,
      fetchedPages + 1,
    );

    films = [...films, ...fetchedFilms];
    fetchedPages++;

    await sleep(1_000);
  }

  return { films, totalPages, fetchedPages };
}

export async function fetchLetterboxdFilmsByPage(
  username: string,
  page: number = 1,
): Promise<{ films: Film[]; totalPages: number }> {
  const url = `https://letterboxd.com/${username}/films/page/${page}/`;

  let html = "";
  try {
    html = await getHtmlContent(url, "ul.poster-list li.film-detail");
  } catch (error) {
    console.error(error);
    throw error;
  }

  const $ = cheerio.load(html);

  const films: Film[] = [];
  $("ul.poster-list li").each((i, elem) => {
    const poster = $(elem).find("div.poster");

    const id = String(poster.attr("data-film-id"));
    const name = String(poster.attr("data-film-name"));
    const year = String(poster.attr("data-film-release-year"));
    const posterUrl = String(poster.find("div img").attr("src"));

    const ratingString = $(elem).find("span.rating").text().trim() || "";

    let rating: number | undefined = undefined;
    if (!ratingString && $(elem).find("span.film-watch-link").length) {
      rating = undefined;
    } else {
      rating = convertRatingToNumber(ratingString);
    }

    films.push({
      id,
      name,
      year,
      posterUrl,
      rating,
    });
  });

  const totalPages = Number($(".paginate-pages li:last-child a").text()) || 1;

  return { films, totalPages };
}

export async function fetchLetterboxdReviews(
  username: string,
  maxPages: number = 5,
): Promise<{ films: Film[]; totalPages: number; fetchedPages: number }> {
  const { films: firstFilms, totalPages } =
    await fetchLetterboxdReviewsByPage(username);

  let films = [...firstFilms];
  let fetchedPages = 1;
  while (fetchedPages < Math.min(totalPages, maxPages)) {
    const { films: fetchedFilms } = await fetchLetterboxdReviewsByPage(
      username,
      fetchedPages + 1,
    );

    films = [...films, ...fetchedFilms];
    fetchedPages++;

    await sleep(1_000);
  }

  return { films, totalPages, fetchedPages };
}

export async function fetchLetterboxdReviewsByPage(
  username: string,
  page: number = 1,
): Promise<{ films: Film[]; totalPages: number }> {
  const url = `https://letterboxd.com/${username}/films/reviews/page/${page}/`;

  let html = "";
  try {
    html = await getHtmlContent(url, "ul.poster-list li.film-detail");
  } catch (error) {
    console.error(error);
    throw error;
  }

  const $ = cheerio.load(html);
  const films: Film[] = [];

  $("ul.poster-list li.film-detail").each((i, elem) => {
    const posterDiv = $(elem).find("div.film-poster");

    const id = String(posterDiv.attr("data-film-id"));
    const name = String(posterDiv.attr("data-film-name"));
    const year = String(posterDiv.attr("data-film-release-year"));

    let posterUrl = "";
    const imgElement = posterDiv.find("img");
    if (imgElement.length > 0) {
      posterUrl = imgElement.attr("src") || "";
    }

    // Get rating
    const attribution = $(elem).find("div.film-detail-content p.attribution");
    const ratingString = attribution.find("span.rating").text().trim() || "";

    let rating: number | undefined = undefined;
    if (ratingString) {
      rating = convertRatingToNumber(ratingString);
    }

    // Get action and date
    const dateSpan = attribution.find("span.date");
    const dateText = dateSpan.text().trim(); // e.g., 'Added 12 Sep 2024'

    const actionMatch = dateText.match(/^(Added|Watched|Rewatched)/);
    const action = actionMatch ? actionMatch[1] : "";

    let datetime = "";
    const timeElement = dateSpan.find("time");
    if (timeElement.length > 0) {
      datetime = String(timeElement.attr("datetime")) || "";
    } else {
      // Try to get date from the span._nobr or directly from the text
      const nobrElement = dateSpan.find("span._nobr");
      if (nobrElement.length > 0) {
        datetime = nobrElement.text().trim();
      } else {
        // Fallback: extract date from dateText
        const dateTextWithoutAction = dateText.replace(
          /^(Added|Watched|Rewatched)\s*/,
          "",
        );
        datetime = dateTextWithoutAction.trim();
      }
    }

    // Get review text
    const reviewDiv = $(elem).find("div.body-text");
    const reviewText = reviewDiv.text().trim();

    // Get likes count
    const likesP = $(elem).find("p.like-link-target");
    const likesLink = likesP.find("a");
    const likesText = likesLink.text().trim(); // e.g., '1 like', '5 likes'

    const likesMatch = likesText.match(/(\d+)\s+like/);
    const likesCount = likesMatch ? parseInt(likesMatch[1], 10) : 0;

    films.push({
      id,
      name,
      year,
      posterUrl,
      rating,
      datetime,
      action,
      reviewText,
      likesCount,
    });
  });

  const totalPages = Number($(".paginate-pages li:last-child a").text()) || 1;

  return { films, totalPages };
}
