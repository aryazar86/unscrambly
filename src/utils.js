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

export const getCookie = (name) => {
  const v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return v ? v[2] : null;
};

export const setCookie = (name, value, days = 10000) => {
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
  document.cookie = name + '=' + value + ';path=/;expires=' + d.toGMTString();
};

export const deleteCookie = (name) => {
  setCookie(name, '', -1);
};
