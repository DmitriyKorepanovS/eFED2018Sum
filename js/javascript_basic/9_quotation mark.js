function WordCensore(x) {

  var result = x.replace(/\B`|`\B/g, `"`);
  return result;
}

console.log(WordCensore("I`m the `hero`"));