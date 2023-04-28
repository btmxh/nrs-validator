import { rule } from "../lib.ts";

export default rule("dah-invalid-id", function () {
  this.allEntries()
    .map((entry) => entry.id)
    .filter((id) => !/[A-Za-z0-9/-]+/.test(id))
    .forEach((id) => this.warn(`Invalid custom ID: '${id}'`));
});
