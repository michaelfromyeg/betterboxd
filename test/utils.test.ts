import { strict as assert } from 'assert';
import { convertRatingToNumber, getHtmlContent } from '../src/utils.js';

describe('convertRatingToNumber', () => {
  it('should convert "★★★★½" to 4.5', () => {
    const ratingString = '★★★★½';
    const ratingNumber = convertRatingToNumber(ratingString);
    assert.equal(ratingNumber, 4.5);
  });

  it('should convert "★★★" to 3', () => {
    const ratingString = '★★★';
    const ratingNumber = convertRatingToNumber(ratingString);
    assert.equal(ratingNumber, 3);
  });

  it('should return 0 for an empty string', () => {
    const ratingString = '';
    const ratingNumber = convertRatingToNumber(ratingString);
    assert.equal(ratingNumber, 0);
  });
});

describe("getHtmlContent", () => {
  it('should fetch HTML content', async () => {
    const html = await getHtmlContent('https://example.com');
    assert.equal(html.includes("<!DOCTYPE html>"), true)
  });  
})
