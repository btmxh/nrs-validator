import { rule } from "../lib.ts";
import { checkIRType } from "./common.ts";

export default rule("dah-lone-pads", function () {
  this.impacts()
    .filter((impact) => checkIRType(impact, "pads"))
    .forEach((impact) => {
      this.warn(`impact was a lone PADS impact:\n${this.dumpIR(impact)}`);
    });
});
