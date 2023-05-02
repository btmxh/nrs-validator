import {
  Impact,
  Relation,
} from "../../deps.ts";
import { rule } from "../lib.ts";

export default rule("dah-sum-contain-weight", function () {
  [this.impacts(), this.relations()].forEach((irs) =>
    irs
      .map(
        (ir) =>
          [ir, [...ir.contributors.values()].reduce((a, b) => a + b, 0.0)] as [
            Impact | Relation,
            number
          ]
      )
      .filter(([_, totalContrib]) => Math.abs(totalContrib - 1.0) > 1e-4)
      .forEach(([impact, totalContrib]) => {
        this.warn(
          `impact/relation with total contribution weight ${totalContrib} != 1.0:\n${this.dumpIR(
            impact
          )}`
        );
      })
  );
});
