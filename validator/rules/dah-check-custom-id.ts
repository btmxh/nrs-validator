import { assert } from "https://raw.githubusercontent.com/ngoduyanh/nrs-lib-ts/v0.1.1/mod.ts";
import { rule } from "../lib.ts";
import { optionalAsArray } from "./common.ts";
// @deno-types="npm:@types/luxon"
import { DateTime } from "npm:luxon@3.2.0";

export default rule("dah-check-custom-id", function () {
  this.entries()
    .flatMap((entry) => optionalAsArray(entry.id.split("-")[1]))
    .filter((token) => isDigit(token[0]))
    .filter((suffix) => {
      const tokens = suffix.split("T");
      return (
        tokens.length != 2 &&
        checkDateToken(tokens[0]) &&
        checkTimeToken(tokens[1])
      );
    })
    .forEach((suffix) => this.warn(`invalid custom id timestamp: ${suffix}`));
});

function isDigit(char: string): boolean {
  assert(char.length == 1);
  return "0123456789".includes(char);
}

function checkDateToken(date: string): boolean {
  return DateTime.fromFormat(date, "yyyyMMdd").isValid;
}

function checkTimeToken(time: string): boolean {
  return DateTime.fromFormat(time, "HHmmss").isValid;
}
