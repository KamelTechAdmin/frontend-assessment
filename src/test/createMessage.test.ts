import { createMessage } from "../utils/createMessage";

jest.mock("uuid", () => ({ v4: () => "fixed-id" }));

describe("createMessage", () => {
  test("creates correct message object", () => {
    const msg = createMessage({
      text: "hello",
      ccList: ["x@test.com"],
      date: "01-02-2024",
      time: "10:15",
    });

    expect(msg).toEqual({
      id: "fixed-id",
      type: "staff",
      collapsed: false,
      name: "محمد صقر",
      name2: "راشد فهد",
      date: "01-02-2024",
      time: "10:15",
      email1: "ahmed@example.com",
      email2: ["x@test.com"],
      text: "hello",
    });
  });
});
