import {
  Data,
  Entry,
  HasMeta,
  Id,
  Impact,
  Relation,
  WrappedIterator,
  wrapIterator,
} from "../deps.ts";

export type ValidationCallback = (this: ValidationContext) => void;

export interface ValidationRule {
  callback: ValidationCallback;
  name: string;
}

export class ValidationContext {
  failed = false;

  constructor(public rule: ValidationRule, public data: Data) {}

  run(): boolean {
    this.rule.callback.apply(this);
    return this.failed;
  }

  warn(message: string, fail = true) {
    this.failed ||= fail;
    console.warn(`${this.rule.name}: ${message}`);
  }

  allEntries(): WrappedIterator<Entry> {
    return wrapIterator(this.data.entries.values());
  }

  allImpacts(): WrappedIterator<Impact> {
    return wrapIterator(this.data.impacts.values());
  }

  allRelations(): WrappedIterator<Relation> {
    return wrapIterator(this.data.relations.values());
  }

  getEntry(key: Id): Entry | undefined {
    return this.data.entries.get(key);
  }

  entries(): WrappedIterator<Entry> {
    return this.allEntries().filter(e => this.isNotIgnored(e));
  }

  impacts(): WrappedIterator<Impact> {
    return this.allImpacts().filter(e => this.isNotIgnored(e));
  }

  relations(): WrappedIterator<Relation> {
    return this.allRelations().filter(e => this.isNotIgnored(e));
  }

  isNotIgnored(obj: HasMeta): boolean {
    const rules = obj.DAH_meta.DAH_validator_suppress;
    return !(rules instanceof Array && rules.includes(this.rule.name));
  }

  dumpIR(ir: Impact | Relation): string {
    // deno-lint-ignore no-explicit-any
    const json: any = {
      contributors: Object.fromEntries(ir.contributors),
      DAH_meta: ir.DAH_meta,
    };

    if ("references" in ir) {
      json.references = {};
      for (const [id, _] of ir.references) {
        json.references[id] = "[...]";
      }
    } else if ("score" in ir) {
      json.score = "[...]";
    }

    return JSON.stringify(json, null, 2);
  }
}

export function rule(
  name: string,
  callback: ValidationCallback
): ValidationRule {
  return { name, callback };
}
