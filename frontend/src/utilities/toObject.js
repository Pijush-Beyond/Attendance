export default function (form) {
  const obj = {};
  for (let i of [...form].filter(tag => tag.tagName !=='BUTTON'))
    obj[i.name] = i.value;
  return obj;
}