import fields from '../../meta/fields.yml'

export type FieldContent = {
  readonly slug: string
  readonly name: string
}

function generatefieldMap(): { [key: string]: FieldContent } {
  const result: { [key: string]: FieldContent } = {}
  fields.fields.forEach((f) => {
    result[f.slug] = f
  })
  return result
}

const fieldMap: { [key: string]: FieldContent } = generatefieldMap()

export function getField(slug: string) {
  return fieldMap[slug]
}

export function listFields(): FieldContent[] {
  return fields.fields
}
