import { addCC } from "../utils/ccHelpers";

describe("addCC", () => {
  test("adds new email", () => {
    const list: string[] = [];
    const result = addCC("ahmed@example.com", list);
    expect(result).toContain("ahmed@example.com");
  });

  test("does not add duplicates", () => {
    const list = ["ahmed@example.com"];
    const result = addCC("ahmed@example.com", list);
    expect(result.length).toBe(1);
  });

  test("ignores empty input", () => {
    const list: string[] = [];
    const result = addCC("", list);
    expect(result.length).toBe(0);
  });
});
