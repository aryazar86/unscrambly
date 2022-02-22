export const createEnum = (values) => {
  const enumObject = {};
  for (const val of values) {
    enumObject[val] = val;
  }
  return Object.freeze(enumObject);
};

export const randomizeLetters = () => {
  return {
    consonants: [...'bcdfghjklmnpqrstvwxz'].sort(() => 0.5 - Math.random()),
    vowels: [...'aeiouy'].sort(() => 0.5 - Math.random()),
  };
};
