import { shorten } from "../components/ticket/TicketTabs";

describe("shorten helper", () => {
  test("return same text if shorter than max", () => {
    expect(shorten("test", 10)).toBe("test");
  });

  test("shortens long text", () => {
    expect(shorten("long texts test", 10)).toBe("long texts...");
  });

  test("returns text", () => {
    expect(shorten("", 5)).toBe("");
  });

  test("handles text at exact max length", () => {
    expect(shorten("long texts", 10)).toBe("long texts");
  });
});
