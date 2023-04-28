# nrs-validator

a separated implementation of the NRS validator.

this is used to prevent common mistakes in the implementation
process of NRS.

one can suppress this validator by using the
`<validatorSuppress />` xml tag in nrsml.

to run, simply run the `main.ts` script with a required parameter,
the path to the output file `bulk.json` of the NRS process.

```bash
deno run --allow-all main.ts ../nrs-impl/output/bulk.json
```
