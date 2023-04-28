import {
  Impact,
  Relation,
  Id,
} from "https://raw.githubusercontent.com/ngoduyanh/nrs-lib-ts/v0.1.1/mod.ts";

export function optionalAsArray<T>(obj: T | null | undefined): T[] {
  if (obj === null || obj === undefined) return [];
  return [obj];
}

export function checkIRType(ir: Impact | Relation, type: string): boolean {
  // deno-lint-ignore no-explicit-any
  return (ir.DAH_meta as any).DAH_ir_source?.name === type;
}

export function consumableEntryID(id: Id): boolean {
  // albums are not consumable, since it's just a collection of tracks
  return "ALV".includes(id[0]) || /M-VGMDB-AL-\d+-\d+/g.test(id) || /M-\d+/.test(id);
}
