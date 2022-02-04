import toArray from './toArray';

// export const capitalize = (str: string) => {
//   return str.charAt(0).toUpperCase() + str.slice(1);
// };

const getSearchKeys = (slug: string, tags: string, category: string) => {
  const keys: string[] = [];
  slug.split('-').map((key) => {
    if (key && !keys.includes(key)) {
      keys.push(key);
    }
  });
  toArray(tags).map((key) => {
    key = key.toLowerCase();
    if (key && !keys.includes(key)) {
      keys.push(key);
    }
  });
  if (!keys.includes(category)) {
    let key = category.toLowerCase();
    keys.push(key);
  }
  return keys;
};

export default getSearchKeys;
