import { rule } from "../lib.ts";

export default rule("dah-no-best-girl", function () {
  this.entries()
    .filter((entry) => "ALV".includes(entry.id[0]))
    .filter((entry) => !("DAH_entry_bestGirl" in entry.DAH_meta))
    .forEach((entry) =>
      this.warn(`Entry '${entry.id}' does not have a 'DAH_entry_bestGirl'`)
    );
});
