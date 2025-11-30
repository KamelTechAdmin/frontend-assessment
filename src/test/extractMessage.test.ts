import { extractMessage } from "../utils/extractMessage";

describe("extractMessage", () => {
  test("returns text correctly", () => {
    const reply = [{ children: [{ text: "hello" }] }];
    expect(extractMessage(reply)).toBe("hello");
  });

  test("returns empty string on invalid structure", () => {
    expect(extractMessage(null)).toBe("");
    expect(extractMessage([])).toBe("");
    expect(extractMessage([{}])).toBe("");
  });
});
