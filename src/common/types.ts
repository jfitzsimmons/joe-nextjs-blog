export type FilterContent = {
  readonly slug: string
  readonly name: string
  readonly color?: string
}

export type Config = {
  readonly base_url: string
  readonly site_title: string
  readonly site_description: string
  readonly site_keywords: { keyword: string }[]
  readonly posts_per_page: number
  readonly refs_per_page: number
  readonly codepen_account: string
  readonly github_account: string
}

export type TagContent = {
  readonly slug: string
  readonly name: string
  readonly parent: string
}

export type Pagination = {
  page: number | null
  current: boolean
  excerpt: boolean
}
