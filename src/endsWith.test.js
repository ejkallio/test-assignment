import endsWith from "./endsWith";

describe("endsWith()", () => {
  // --- Basic cases ---
  describe("basic usage", () => {
    test('image.jpg ends with ".jpg"', () => {
      expect(endsWith("image.jpg", ".jpg")).toBe(true);
    });

    test('document.pdf does NOT end with ".jpg"', () => {
      expect(endsWith("document.pdf", ".jpg")).toBe(false);
    });

    test("'test' ends with 't'", () => {
      expect(endsWith("test", "t")).toBe(true);
    });

    test("'test10' ends with '10'", () => {
      expect(endsWith("test10", "10")).toBe(true);
    });
  });

  // --- Unicode / special characters ---
  describe("unicode and multibyte characters", () => {
    test("'testÄ' ends with 'Ä'", () => {
      expect(endsWith("testÄ", "Ä")).toBe(true);
    });

    test("'emoji 😀😃😄' ends with '😄'", () => {
      expect(endsWith("😀😃😄", "😄")).toBe(true);
    });
  });

  // --- Empty strings ---
  describe("empty strings", () => {
    test("empty string ends with empty target", () => {
      expect(endsWith("", "")).toBe(true);
    });

    test("non-empty string ends with empty target", () => {
      expect(endsWith("abc", "")).toBe(true);
    });

    test("empty string does not end with non-empty target", () => {
      expect(endsWith("", "a")).toBe(false);
    });
  });

  // --- Target longer than string ---
  describe("target longer than string", () => {
    test("target longer → always false", () => {
      expect(endsWith("abc", "abcd")).toBe(false);
      expect(endsWith("a", "abc")).toBe(false);
    });
  });

  // --- Position parameter ---
  describe("position parameter behavior", () => {
    test("'abc' ends with 'b' when position = 2", () => {
      expect(endsWith("abc", "b", 2)).toBe(true); // slice up to index 2
    });

    test("'abc' does not end with 'c' when position = 2", () => {
      expect(endsWith("abc", "c", 2)).toBe(false);
    });

    test("position greater than length is clamped to length", () => {
      expect(endsWith("abc", "c", 999)).toBe(true);
    });

    test("position negative becomes 0", () => {
      expect(endsWith("abc", "a", -5)).toBe(false);
    });
  });

  // --- NaN / weird positions ---
  describe("invalid or weird position values", () => {
    test("position = NaN → becomes 0 → should be false", () => {
      expect(endsWith("abc", "c", NaN)).toBe(false);
    });

    test("position = '2' (string number), coerces to number", () => {
      expect(endsWith("abc", "b", "2")).toBe(true);
    });

    test("position = null → becomes 0", () => {
      expect(endsWith("abc", "a", null)).toBe(false);
    });

    test("position = undefined → defaults to full string", () => {
      expect(endsWith("abc", "c", undefined)).toBe(true);
    });
  });
});