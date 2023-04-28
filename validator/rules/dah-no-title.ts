import { rule } from "../lib.ts";

export default rule("dah-no-title", function () {
  this.entries()
    .filter((entry) => !("DAH_entry_title" in entry.DAH_meta))
    .forEach((entry) => this.warn(`entry ${entry.id} does not have a title`));
});
