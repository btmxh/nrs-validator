import { rule } from "../lib.ts";
import { checkIRType } from "./common.ts";

export default rule("dah-no-dropped-impact", function () {
  const hasDroppedImpactEntries = new Set(
    this.impacts()
      .filter((impact) => checkIRType(impact, "dropped"))
      .flatMap((impact) => impact.contributors.keys())
      .toArray()
  );

  const hasDroppedStatusEntries = new Set(
    this.entries()
      .filter(
        (entry) =>
          // deno-lint-ignore no-explicit-any
          (entry.DAH_meta as any)?.DAH_entry_progress?.status === "Dropped"
      )
      .map((entry) => entry.id)
      .toArray()
  );

  for (const entryId of hasDroppedImpactEntries) {
    if (
      !hasDroppedStatusEntries.has(entryId) &&
      this.isNotIgnored(this.getEntry(entryId)!)
    ) {
      this.warn(
        `entry '${entryId}' has a dropped impact but its status is not 'Dropped'`
      );
    } else {
      hasDroppedStatusEntries.delete(entryId);
    }
  }

  for (const entryId of hasDroppedStatusEntries) {
    this.warn(
      `entry '${entryId}' has 'Dropped' status but it does not have a dropped impact`
    );
  }
});
