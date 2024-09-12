import { convertRatingToNumber } from "./utils.js"; // Adjust this path according to your project structure

describe("convertRatingToNumber", () => {
  it('should return 5 for a rating of "★★★★★"', () => {
    expect(convertRatingToNumber("★★★★★")).toBe(5);
  });

  it('should return 4 for a rating of "★★★★"', () => {
    expect(convertRatingToNumber("★★★★")).toBe(4);
  });

  it('should return 3.5 for a rating of "★★★½"', () => {
    expect(convertRatingToNumber("★★★½")).toBe(3.5);
  });

  it('should return 1.5 for a rating of "★½"', () => {
    expect(convertRatingToNumber("★½")).toBe(1.5);
  });

  it('should return 0.5 for a rating of "½"', () => {
    expect(convertRatingToNumber("½")).toBe(0.5);
  });

  it("should return 0 for an empty string rating", () => {
    expect(convertRatingToNumber("")).toBe(0);
  });
});
