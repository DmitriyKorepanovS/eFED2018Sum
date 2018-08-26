function countСharacter(inputText, inputSymbol) {
    var lowerInputText = inputText.toLowerCase();
    var lowerSymbol = inputSymbol.toLowerCase();
    var position = lowerInputText.indexOf(lowerSymbol);
    var count = 0;

    while (position !== -1) {
        count++;
        position = lowerInputText.indexOf(lowerSymbol, position + 1);
    }
    return count;
}

console.log(countСharacter('MyRandomString', 'm'));