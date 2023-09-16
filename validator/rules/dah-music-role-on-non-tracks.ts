import { AtomicRoleType } from "https://raw.githubusercontent.com/ngoduyanh/nrs-lib-ts/v2.1.0/exts/DAH_entry_roles.ts";
import { StandardEntryType } from "../../deps.ts";
import { rule } from "../lib.ts";

export default rule("dah-forbid-generic-types", function () {
  this.allEntries()
    .filter(
      (e) =>
        e.DAH_meta.DAH_entry_type !== StandardEntryType.MusicTrack &&
        e.DAH_meta.DAH_entry_type !== StandardEntryType.MusicAlbumTrack
    )
    .forEach((e) => {
      const roles = e.DAH_meta.DAH_entry_roles?.roles;
      if (roles === undefined) {
        return;
      }

      const roleTypes = new Set<AtomicRoleType>(
        Object.values(roles)
          .flat()
          .map((role) => role.roleType)
      );

      const musicTrackRoleTypes: AtomicRoleType[] = [
        "arrange",
        "compose",
        "image",
        "image_feat",
        "inst_perform",
        "lyrics",
        "mv",
        "vocal",
      ];

      for (const type of musicTrackRoleTypes) {
        if (!roleTypes.has(type)) {
          continue;
        }

        this.warn(`Non-music-track entry '${e.id}' has '${type}' role`);
        return;
      }
    });
});
