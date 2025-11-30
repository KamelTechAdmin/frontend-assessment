import { initialTabsAtom } from "@/atoms/TicketAtoms";
import { getDefaultStore } from "jotai";

test("adds new tab", () => {
  const store = getDefaultStore();

  const oldTabs = store.get(initialTabsAtom);

  store.set(initialTabsAtom, [
    ...oldTabs,
    { id: "1234", title: "test title", number: 200 },
  ]);

  const updated = store.get(initialTabsAtom);

  expect(updated.length).toBe(oldTabs.length + 1);
});
