import filter from "./filter.js";

describe("filter()", () => {
  // --- Basic behavior ---
  test("filters truthy values correctly", () => {
    const arr = [1, 2, 3, 4];
    expect(filter(arr, (n) => n % 2 === 0)).toEqual([2, 4]);
  });

  test("returns empty array when no elements match", () => {
    const users = [
      { active: false },
      { active: false }
    ];
    expect(filter(users, (u) => u.active)).toEqual([]);
  });

  // --- E-commerce practical cases ---
  describe("ecommerce use-cases", () => {
    test("filters products that are in stock", () => {
      const products = [
        { id: 1, stock: 10 },
        { id: 2, stock: 0 },
        { id: 3, stock: 5 }
      ];

      expect(filter(products, (p) => p.stock > 0)).toEqual([
        { id: 1, stock: 10 },
        { id: 3, stock: 5 }
      ]);
    });

    test("filters products by category", () => {
      const products = [
        { id: 1, category: "shirts" },
        { id: 2, category: "pants" },
        { id: 3, category: "shirts" }
      ];

      expect(filter(products, (p) => p.category === "shirts")).toEqual([
        { id: 1, category: "shirts" },
        { id: 3, category: "shirts" }
      ]);
    });
  });

  // --- Edge cases ---
  test("works with empty array", () => {
    expect(filter([], () => true)).toEqual([]);
  });

  test("never returns nested array [[]] — (detects original bug)", () => {
    expect(filter([], () => false)).toEqual([]); 
  });

  test("target longer than array always returns empty array", () => {
    expect(filter([1], (n) => n > 10)).toEqual([]);
  });

  // --- Predicate call verification ---
  test("passes correct arguments to predicate", () => {
    const mock = vi.fn(() => true);
    const arr = ["a", "b"];

    filter(arr, mock);

    expect(mock).toHaveBeenCalledTimes(2);
    expect(mock).toHaveBeenNthCalledWith(1, "a", 0, arr);
    expect(mock).toHaveBeenNthCalledWith(2, "b", 1, arr);
  });

  // --- Handling null / undefined / invalid input ---
  describe("invalid input handling", () => {
    test("null input returns empty array", () => {
      expect(filter(null, () => true)).toEqual([]);
    });

    test("undefined input returns empty array", () => {
      expect(filter(undefined, () => true)).toEqual([]);
    });

    test("predicate always true returns clone of array", () => {
      const arr = [1, 2, 3];
      expect(filter(arr, () => true)).toEqual([1, 2, 3]);
    });
  });
});
