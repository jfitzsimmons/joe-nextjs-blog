import categories from "../../meta/categories.yml";

export type CatContent = {
  readonly slug: string;
  readonly name: string;
};

const catMap: { [key: string]: CatContent } = generateCatMap();

function generateCatMap(): { [key: string]: CatContent } {
  let result: { [key: string]: CatContent } = {};
  for (const cat of categories.categories) {
    result[cat.slug] = cat;
  }
  return result;
}

export function getCat(slug: string) {
  return catMap[slug];
}

export function listCats(): CatContent[] {
  return categories.categories;
}
