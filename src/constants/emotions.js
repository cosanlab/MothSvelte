export let emotions = [];
export let DummyEmotions = {};

// Function to shuffle the emotions array
export const shuffleEmotions = (emotionList) => {
  emotions = emotionList;

  for (let i = emotions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [emotions[i], emotions[j]] = [emotions[j], emotions[i]];
  }
  // console it for better understanding
  console.log("Emotions List after shuffling is:", emotions);
};


