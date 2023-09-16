import { rule } from "../lib.ts";
import { consumableEntry } from "./common.ts";

export default rule("dah-no-progress", function () {
  const consumableEntries = this.entries().filter(consumableEntry).toArray();

  for (const entry of consumableEntries) {
    if (!("DAH_entry_progress" in entry.DAH_meta)) {
      this.warn(
        `consumable entry '${entry.id}' does not have 'DAH_entry_progress' progress indicator`
      );
    }
  }
});
