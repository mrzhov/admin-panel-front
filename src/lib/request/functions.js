const getValue = (key, value) => {
  if (Array.isArray(value)) {
    return value.map(val => getValue(key, val)).join('&');
  }
  return `${key}=${encodeURIComponent(value)}`;
};

const getQueryParameters = obj => {
  let res = '';
  const keys = Object.keys(obj);

  for (let j = 0; j < keys.length; j += 1) {
    const i = keys[j];
    if (obj[i] !== undefined) {
      if (res === '') {
        res = getValue(i, obj[i]);
      } else {
        res += `&${getValue(i, obj[i])}`;
      }
    }
  }

  return res;
};

export default getQueryParameters;
