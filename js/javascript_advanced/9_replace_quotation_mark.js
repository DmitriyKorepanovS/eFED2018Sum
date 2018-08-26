function replaceСharacter(inputText) {

    return inputText.replace(/\B'|'\B/g, '"');
}

console.log(replaceСharacter("I'm the 'hero'"));