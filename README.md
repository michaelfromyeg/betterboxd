# Betterboxd

A small `npm` package to help with fetching Letterboxd data, better. Intended to be used alongside the Letterboxd API, with an even simpler interface and no attempt at authentication.

## Methods

### `fetchLetterboxdFilms(username: string, maxPages: number = 5): Promise<{ films: Film[]; totalPages: number; fetchedPages: number }>`

Fetches a user's Letterboxd films across multiple pages.

- **Parameters**:
  - `username`: Letterboxd username.
  - `maxPages`: Maximum number of pages to fetch (default: 5).
- **Returns**: A Promise that resolves to an object containing:
  - `films`: Array of films fetched.
  - `totalPages`: Total number of pages available.
  - `fetchedPages`: Number of pages fetched.

### `fetchLetterboxdFilmsByPage(username: string, page: number = 1): Promise<{ films: Film[]; totalPages: number }>`

Fetches a single page of a user's Letterboxd films.

- **Parameters**:
  - `username`: Letterboxd username.
  - `page`: Page number to fetch (default: 1).
- **Returns**: A Promise that resolves to an object containing:
  - `films`: Array of films for the page.
  - `totalPages`: Total number of pages available.

### `fetchLetterboxdDiary(username: string, maxPages: number = 5): Promise<{ films: Film[]; totalPages: number; fetchedPages: number }>`

Fetches a user's Letterboxd diary entries across multiple pages.

- **Parameters**:
  - `username`: Letterboxd username.
  - `maxPages`: Maximum number of pages to fetch (default: 5).
- **Returns**: A Promise that resolves to an object containing:
  - `films`: Array of diary entries fetched.
  - `totalPages`: Total number of pages available.
  - `fetchedPages`: Number of pages fetched.

### `fetchLetterboxdDiaryEntriesByPage(username: string, page: number = 1): Promise<{ films: Film[]; totalPages: number }>`

Fetches a single page of a user's Letterboxd diary entries.

- **Parameters**:
  - `username`: Letterboxd username.
  - `page`: Page number to fetch (default: 1).
- **Returns**: A Promise that resolves to an object containing:
  - `films`: Array of diary entries for the page.
  - `totalPages`: Total number of pages available.

### `fetchLetterboxdReviews(username: string, maxPages: number = 5): Promise<{ films: Film[]; totalPages: number; fetchedPages: number }>`

Fetches a user's Letterboxd reviews across multiple pages.

- **Parameters**:
  - `username`: Letterboxd username.
  - `maxPages`: Maximum number of pages to fetch (default: 5).
- **Returns**: A Promise that resolves to an object containing:
  - `films`: Array of reviews fetched.
  - `totalPages`: Total number of pages available.
  - `fetchedPages`: Number of pages fetched.

### `fetchLetterboxdReviewsByPage(username: string, page: number = 1): Promise<{ films: Film[]; totalPages: number }>`

Fetches a single page of a user's Letterboxd reviews.

- **Parameters**:
  - `username`: Letterboxd username.
  - `page`: Page number to fetch (default: 1).
- **Returns**: A Promise that resolves to an object containing:
  - `films`: Array of reviews for the page.
  - `totalPages`: Total number of pages available.

### `addTmdbPosterUrls(films: Film[], apiKey?: string): Promise<void>`

Adds TMDB poster URLs to the provided films by querying the TMDB API.

- **Parameters**:
  - `films`: Array of film objects to enrich with TMDB poster URLs.
  - `apiKey`: (Optional) TMDB API key. If not provided, it will use the API key set in environment variables.
- **Returns**: A Promise that resolves when TMDB data has been added.

## Types

### `Film`

Represents a film with the following structure:

- `id`: Film ID.
- `name`: Film name.
- `year`: Release year.
- `posterUrl`: Poster URL from Letterboxd.
- `rating`: Film rating.
- (optional) `datetime`: Date associated with the diary entry or review.
- (optional) `action`: Action such as "Watched", "Rewatched".
- (optional) `reviewText`: Text of the review.
- (optional) `likesCount`: Number of likes for the review.
- (optional) `tmdbPosterUrl`: Poster URL from TMDB.
