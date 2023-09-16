import { Impact, Relation, Entry, StandardEntryType } from "../../deps.ts";

export function optionalAsArray<T>(obj: T | null | undefined): T[] {
  if (obj === null || obj === undefined) return [];
  return [obj];
}

export function checkIRType(ir: Impact | Relation, type: string): boolean {
  // deno-lint-ignore no-explicit-any
  return (ir.DAH_meta as any).DAH_ir_source?.name === type;
}

export function consumableEntry(entry: Entry): boolean {
  return [
    StandardEntryType.Anime,
    StandardEntryType.LightNovel,
    StandardEntryType.Manga,
    StandardEntryType.LightNovelGeneric,
    StandardEntryType.MusicGeneric,
    StandardEntryType.MusicAlbumTrack,
    // albums are not consumable, since it's just a collection of tracks
    StandardEntryType.MusicTrack,
  ].includes(entry.DAH_meta.DAH_entry_type as StandardEntryType);
}
