import { rule } from "../lib.ts";
import { checkIRType, consumableEntry } from "./common.ts";

export default rule("dah-entry-no-consumed", function () {
  const consumableEntries = this.entries()
    .filter(consumableEntry)
    .toArray();

  const consumedEntries = new Set(
    this.impacts()
      .filter(
        (impact) =>
          checkIRType(impact, "consumed") ||
          checkIRType(impact, "animeConsumed")
      )
      .flatMap((impact) => impact.contributors.keys())
      .toArray()
  );

  for (const entry of consumableEntries) {
    if (!consumedEntries.has(entry.id)) {
      this.warn(
        `consumable entry '${entry.id}' does not have a consumed impact`
      );
    }
  }
});
