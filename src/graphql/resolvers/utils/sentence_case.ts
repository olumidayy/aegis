export default function sentenceCase(string) {
  const sentence = string.toLowerCase().split(' ');
  for (let i = 0; i < sentence.length; i += 1) {
    sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
  }
  return sentence.join(' ');
}
