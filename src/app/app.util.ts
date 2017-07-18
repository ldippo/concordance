/**
 * UTILITY FUNCTIONS FOR CREATION OF CONCORDANCE PROGRAM
 */

/**
 * Split body text in JSON format by line breaks
 */
export const splitBodyByLine = jsonBody => jsonBody.split('\\n');

/**
 * Split body text by spaces
 */
export const sepBodyBySpace = (body) => body.split(' ');

/**
 * Tests if word by checking for group of chars inside bounds without numbers or special chars
 */
export const isWord = (str) => {
    const regEx: RegExp = /\b[^\d\W]+\b/g;
    const res = regEx.test(str);
    return res;
};

/**
 * Gets words from body text
 * A word is designated as a group of chars without numbers or special chars
 */
export const getWords = (body) =>
    sepBodyBySpace(body)
        .reduce((acc, cur) => isWord(cur) ? acc.concat(cur) : acc, []);

/**
 * Flattens Arrays
 */
export const flattenArr = arr => arr.reduce((acc, cur) => Array.isArray(cur) ? acc.concat(flattenArr(cur)) : acc.concat(cur), []);

/**
 * Removes special chars from a string
 */
export const replaceSpecialChars = str => str.replace(/[^\w\s]/gi, '');

/**
 * Creates a concordance from an array of WordLinePair objects
 */
export const createConcordance = arr => arr.reduce((acc, cur) => {
    const word = replaceSpecialChars(cur.word);
    const line = cur.line;
    const lines = acc[word] ? acc[word].line.concat(line) : [line];
    const count = acc[word] ? acc[word].count + 1 : 1;
    acc[word] = { word: word, count: count, line: lines };
    return acc;
}, {});
