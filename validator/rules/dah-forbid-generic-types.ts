import { StandardEntryType } from "../../deps.ts";
import { rule } from "../lib.ts";

export default rule("dah-forbid-generic-types", function () {
  this.allEntries()
    .filter(
      (entry) =>
        entry.DAH_meta.DAH_entry_type === StandardEntryType.LightNovelGeneric
    )
    .forEach((id) => this.warn(`Entry with LightNovelGeneric type: '${id}'`));
  this.allEntries()
    .filter(
      (entry) =>
        entry.DAH_meta.DAH_entry_type === StandardEntryType.MusicGeneric
    )
    .forEach((id) => this.warn(`Entry with MusicGeneric type: '${id}'`));
});
