import { VisualType } from "../../deps.ts";
import { rule } from "../lib.ts";
import { checkIRType } from "./common.ts";

export default rule("dah-visual-checks", function () {
  const getVisualImpacts = (visualKind: VisualType) => {
    return this.impacts().filter(
      (impact) =>
        checkIRType(impact, "visual") &&
        // deno-lint-ignore no-explicit-any
        (impact.DAH_meta as any).DAH_ir_source.visualArgs.visualType === visualKind
    );
  };

  getVisualImpacts(VisualType.AlbumArt)
    .filter(
      (impact) =>
        [...impact.contributors.keys()].filter((id) => !id.startsWith("M"))
          .length > 0
    )
    .forEach((impact) => {
      this.warn(
        `visual impact with AlbumArt type has non-music contributor: \n${this.dumpIR(
          impact
        )}`
      );
    });

  getVisualImpacts(VisualType.Animated)
    .filter(
      (impact) =>
        [...impact.contributors.keys()].filter((id) => id.startsWith("M"))
          .length > 0
    )
    .forEach((impact) => {
      this.warn(
        `visual impact with Animated type has music contributor: \n${this.dumpIR(
          impact
        )}`
      );
    });
});
