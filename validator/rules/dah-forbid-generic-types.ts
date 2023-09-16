import { StandardEntryType } from "../../deps.ts";
import { rule } from "../lib.ts";

export default rule("dah-forbid-generic-types", function () {
  this.allEntries()
    .filter(
      (entry) =>
        entry.DAH_meta.DAH_entry_type === StandardEntryType.LightNovelGeneric
    )
    .forEach((e) => this.warn(`Entry with LightNovelGeneric type: '${e.id}'`));
  this.allEntries()
    .filter(
      (entry) =>
        entry.DAH_meta.DAH_entry_type === StandardEntryType.MusicGeneric
    )
    .forEach((e) => this.warn(`Entry with MusicGeneric type: '${e.id}'`));
});
