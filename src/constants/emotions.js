export let emotions = [
  "Afraid",
  "Happy",
  "Angry",
  "Uncomfortable",
  "Disgusted",
  "Surprised",
  "Sad",
  "Amused",
  "Moved",
  "Bored",
  "Anxious",
  "Proud",
  "Inspired",
  "Relieved",
  "Hopeful",
  "Frustrated",
];

// Function to shuffle the emotions array
export const shuffleEmotions = () => {
  for (let i = emotions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [emotions[i], emotions[j]] = [emotions[j], emotions[i]];
  }

  // console it for better understanding
//   console.log(`the shuffle emotions array is: ${emotions}`);
};
