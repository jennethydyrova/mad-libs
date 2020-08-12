/**
 * Complete the implementation of parseStory.
 *
 * parseStory retrieves the story as a single string from story.txt
 * (I have written this part for you).
 *
 * In your code, you are required (please read this carefully):
 * - to return a list of objects
 * - each object should definitely have a field, `word`
 * - each object should maybe have a field, `pos` (part of speech)
 *
 * So for example, the return value of this for the example story.txt
 * will be an object that looks like so (note the comma! periods should
 * be handled in the same way).
 *
 * Input: "Louis[n] went[v] to the store[n], and it was fun[a]."
 * Output: [
 *  { word: "Louis", pos: "noun" },
 *  { word: "went", pos: "verb", },
 *  { word: "to", },
 *  { word: "the", },
 *  { word: "store", pos: "noun" }
 *  { word: "," }
 *  ....
 *
 * There are multiple ways to do this, but you may want to use regular expressions.
 * Please go through this lesson: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/regular-expressions/
 */
function parseStory(rawStory) {
  // Your code here.
  // console.log(rawStory);
  let splitArr = rawStory.split(" ");
  // console.log(splitArr);

  const wordsAndPos = /\w+\[[n|v|a]\]/i;
  const words = /\b(\w\w*)\b/i;

  const arrayOfWords = [];

  const posObj = {
    n: "noun",
    v: "verb",
    a: "adjective",
  };

  // console.log(splitArr);

  for (let i = 0; i < splitArr.length; i++) {
    if (wordsAndPos.test(splitArr[i])) {
      // console.log(splitArr[i]);
      const result = wordsAndPos.exec(splitArr[i]);
      // const checkDotAndComma = () => {} !!! do not delete. make a function later

      // checkDotAndComma();
      let pos = result[0][result[0].length - 2];
      arrayOfWords.push({
        name: result[0].slice(0, -3),
        pos: posObj[pos],
      });

      if (
        splitArr[i][splitArr[i].length - 1] === "." ||
        splitArr[i][splitArr[i].length - 1] === ","
      ) {
        // console.log(splitArr[i]);
        arrayOfWords.push({
          name: splitArr[i][splitArr[i].length - 1],
        });
      }
    } else if (words.test(splitArr[i])) {
      const result1 = words.exec(splitArr[i]);
      arrayOfWords.push({
        name: result1[0],
      });
      if (
        splitArr[i][splitArr[i].length - 1] === "." ||
        splitArr[i][splitArr[i].length - 1] === ","
      ) {
        // console.log(splitArr[i]);
        arrayOfWords.push({
          name: splitArr[i][splitArr[i].length - 1],
        });
      }
    }
  }

  return arrayOfWords;
  // console.log(arrayOfWords);
}

/**
 * All your other JavaScript code goes here, inside the function. Don't worry about
 * the `then` and `async` syntax for now.
 *
 * NOTE: You should not be writing any code in the global namespace EXCEPT
 * declaring functions. All code should either:
 * 1. Be in a function.
 * 2. Be in .then() below.
 *
 * You'll want to use the results of parseStory() to display the story on the page.
 */
getRawStory()
  .then(parseStory)
  .then((processedStory) => {
    console.log(processedStory);
    for (let word of processedStory) {
      if (word.pos) {
        const input = displayInput(word);
        const preview = displayPreview(word.pos);
        input.onkeyup = function (str) {
          let inputValue = input.value;
          preview.innerHTML = inputValue;
        };
      } else {
        displayWord(word.name);
        displayPreview(word.name);
      }
    }

    function displayInput(input) {
      let x = document.createElement("input");
      x.setAttribute("type", "text");
      x.placeholder = input.pos;
      document.querySelector(".madLibsEdit").appendChild(x);
      return x;
    }
    function displayWord(word) {
      let y = document.createElement("p");
      y.innerText = word;
      document.querySelector(".madLibsEdit").appendChild(y);
    }
    function displayPreview(word) {
      let y = document.createElement("p");
      y.innerText = word;
      document.querySelector(".madLibsPreview").appendChild(y);
      return y;
    }
  });

// Important!!!
// * In your code, you are required (please read this carefully):
// * - to return a list of objects
// * - each object should definitely have a field, `word`
// * - each object should maybe have a field, `pos` (part of speech)

//How to use regular expressions for the project

// First, preheat the oven to 180[number] degrees. Then take[verb] 4[number] chicken[noun] egg(s). With the gramm[noun] of oil[noun]. Next, add 2[number] teaspoons of baking soda and mix with egg(s) and oil[noun] until it reaches a nice[adjective] texture. Add some milky[adjective] chocolate[noun] to make your cake. Don't forget the sugar[noun]. Pour into a 2[number] x 3[number] pan and bake for 10[number] minutes or until cake is smells good[adjective].
