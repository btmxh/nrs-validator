import {
  Impact,
  Matrix,
  Relation,
  ScalarMatrix,
  identityMatrix,
} from "../../deps.ts";
import { rule } from "../lib.ts";

function matrixNorm(matrix: Matrix): number {
  if (matrix instanceof ScalarMatrix) {
    return Math.abs(matrix.data);
  }

  return matrix.data.map((x) => Math.abs(x)).reduce((a, b) => a + b, 0.0);
}

export default rule("dah-sum-contain-weight", function () {
  [this.impacts(), this.relations()].forEach((irs) =>
    irs
      .map(
        (ir) =>
          [
            ir,
            [...ir.contributors.values()].reduce(
              (a, b) => a.add(b),
              identityMatrix.scale(-1)
            ),
          ] as [Impact | Relation, Matrix]
      )
      .filter(([_, remaining]) => matrixNorm(remaining) > 1e-4)
      .forEach(([impact, totalContrib]) => {
        this.warn(
          `impact/relation with total contribution weight ${totalContrib} != 1.0:\n${this.dumpIR(
            impact
          )}`
        );
      })
  );
});
