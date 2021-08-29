import categories from "../../meta/categories.yml";

export type FilterContent = {
  readonly slug: string;
  readonly name: string;
  readonly color?: string;
};

const catMap: { [key: string]: FilterContent } = generateCatMap();

function generateCatMap(): { [key: string]: FilterContent } {
  let result: { [key: string]: FilterContent } = {};
  for (const cat of categories.categories) {
    result[cat.slug] = cat;
  }
  return result;
}

export function getCat(slug: string) {
  return catMap[slug];
}

export function listCats(): FilterContent[] {
  return categories.categories;
}
