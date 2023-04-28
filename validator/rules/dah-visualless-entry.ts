import { rule } from "../lib.ts";
import { checkIRType } from "./common.ts";

export default rule("dah-visualless-entry", function () {
  const entries = new Set(
    this.entries()
      .map((entry) => entry.id)
      .toArray()
  );
  
  this.impacts()
    .filter((impact) => checkIRType(impact, "visual"))
    .flatMap((impact) => [...impact.contributors.keys()])
    .forEach((id) => entries.delete(id));


  [...entries]
    .filter((id) => "ALVG".includes(id[0]) && /M-VGMDB-AL-\d+/.test(id))
    .forEach((id) => this.warn(`entry '${id}' doesn't have any visual impact`));
});
