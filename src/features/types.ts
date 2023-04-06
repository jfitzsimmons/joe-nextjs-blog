export type PostContent = {
  readonly date: string
  readonly title: string
  readonly slug: string
  readonly tags?: string[]
  readonly category?: string
  readonly description?: string
  readonly references?: object[]
  readonly fullPath: string
}

export type Reference = {
  index: number
  date: string
  source: string
  title: string
  url: string
}

export type Field = {
  category: string
  date: string
  tags: string[]
  title: string
  url: string
  reference: Reference
}

export type FieldContent = {
  readonly slug: string
  readonly name: string
}
