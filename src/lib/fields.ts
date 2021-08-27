import fields from "../../meta/fields.yml";

export type FieldContent = {
  readonly slug: string;
  readonly name: string;
};

const fieldMap: { [key: string]: FieldContent } = generatefieldMap();

function generatefieldMap(): { [key: string]: FieldContent } {
  let result: { [key: string]: FieldContent } = {};
  for (const field of fields.fields) {
    result[field.slug] = field;
  }
  return result;
}

export function getField(slug: string) {
  return fieldMap[slug];
}

export function listFields(): FieldContent[] {
  return fields.fields;
}
