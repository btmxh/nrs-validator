import { rule } from "../lib.ts";
import { consumableEntryID } from "./common.ts";

export default rule("dah-no-progress", function () {
  const consumableEntries = this.entries()
    .filter((entry) => consumableEntryID(entry.id))
    .toArray();

  for (const entry of consumableEntries) {
    if (!("DAH_entry_progress" in entry.DAH_meta)) {
      this.warn(
        `consumable entry '${entry.id}' does not have 'DAH_entry_progress' progress indicator`
      );
    }
  }
});
