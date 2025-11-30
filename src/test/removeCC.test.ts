import { removeCC } from "../utils/removeCC";

describe("removeCC", () => {
  test("removes email at index", () => {
    const list = ["a@gmail.com", "b@gmail.com"];
    const result = removeCC(0, list);
    expect(result).toEqual(["b@gmail.com"]);
  });

  test("removing last element", () => {
    const list = ["a@gmail.com"];
    const result = removeCC(0, list);
    expect(result).toEqual([]);
  });

  test("ignores out of range index", () => {
    const list = ["a@gmail.com"];
    const result = removeCC(5, list);
    expect(result).toEqual(["a@gmail.com"]);
  });
});
