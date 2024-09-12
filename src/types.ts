export interface Film {
  id: string;
  name: string;
  year: string;
  posterUrl: string;
  rating?: number;

  // TODO(michaelfromyeg): break into separate type?
  // if a film is reviewed, it also has reviewText and a datetime
  datetime?: string;
  action?: string; // one-of added, watched, re-watched
  reviewText?: string;
  likesCount?: number;
}
