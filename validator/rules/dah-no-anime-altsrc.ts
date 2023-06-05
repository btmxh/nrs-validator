import { rule } from "../lib.ts";

export default rule("dah-no-anime-altsrc", function () {
  this.entries()
    .filter((entry) => {
      // deno-lint-ignore no-explicit-any
      const altsrc = (entry.DAH_meta as any).DAH_additional_source;
      if (!entry.id.startsWith("A")) {
        return false;
      }
      if (altsrc === undefined) {
        return true;
      }
      return (
        ["id_AniDB", "id_Kitsu", "id_MyAnimeList", "id_AniList"].filter(
          (key) => altsrc[key] === undefined
        ).length > 0
      );
    })
    .forEach((entry) => {
      this.warn(`entry without all anime providers' ID: ${entry.id}`);
    });
});
