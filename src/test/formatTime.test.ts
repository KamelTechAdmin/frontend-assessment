import { formatTimeFromDate } from "../utils/formatTime";

test("formats time correctly", () => {
  const fake = new Date("2024-01-01T05:07:00");
  expect(formatTimeFromDate(fake)).toBe("05:07");
});
