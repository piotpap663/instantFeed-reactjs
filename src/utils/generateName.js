export default () => {
  const random = (max) => {
    return Math.round(Math.random() * 1000) % max;
  }
  var adjectives = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive", "cheap", "expensive", "fancy"];
  var colours = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"];
  var nouns = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse", "keyboard"];
  const randomAdjective = adjectives[random(adjectives.length)];
  const randomColour = colours[random(colours.length)];
  const randomNoun = nouns[random(nouns.length)];
  return `${randomAdjective} ${randomColour} ${randomNoun}`;
}