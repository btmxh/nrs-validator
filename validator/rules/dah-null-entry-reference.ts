import { Id } from "https://raw.githubusercontent.com/ngoduyanh/nrs-lib-ts/v0.1.1/mod.ts";
import { rule } from "../lib.ts";

export default rule("dah-null-entry-reference", function () {
  const isNullReference = (id: Id) => {
    return !id.includes("null entry") && !this.data.entries.has(id);
  };

  const filterNullReferences = <T, V>(
    owner: T,
    references: Map<Id, V>
  ): [T, Id[]][] => {
    const nullReferences = [...references.keys()].filter(isNullReference);
    return nullReferences.length === 0 ? [] : [[owner, nullReferences]];
  };

  this.impacts()
    .flatMap((impact) => filterNullReferences(impact, impact.contributors))
    .forEach(([impact, nullIds]) =>
      this.warn(
        `null reference ${nullIds} found in contributor map of impact\n${this.dumpIR(
          impact
        )}`
      )
    );

  this.relations()
    .flatMap((relation) =>
      filterNullReferences(relation, relation.contributors)
    )
    .forEach(([relation, nullIds]) =>
      this.warn(
        `null reference ${nullIds} found in contributor map of relation\n${this.dumpIR(
          relation
        )}`
      )
    );

  this.relations()
    .flatMap((relation) => filterNullReferences(relation, relation.references))
    .forEach(([relation, nullIds]) =>
      this.warn(
        `null reference ${nullIds} found in reference map of relation\n${this.dumpIR(
          relation
        )}`
      )
    );
});
