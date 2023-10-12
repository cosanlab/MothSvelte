import { collection, query, where, getDocs, getDoc, doc } from 'firebase/firestore';
import { db } from "../config/firebase";

// Generate random query string for debugging
export function generateRandomQueryString() {
  // Generate random 5-character strings
  const randomString = () => Math.random().toString(36).substring(2, 7);
  const hitId = `debug_${randomString()}`;
  const workerId = `debug_${randomString()}`;
  const assignmentId = `debug_${randomString()}`;

  // Create and return the query string
  return `hitId=${hitId}&workerId=${workerId}&assignmentId=${assignmentId}`;
}

// Infer platfrom and identify user, task, session and platform
export function parseURLParameters() {
  if (typeof window !== "undefined") {
    const searchParams = new URLSearchParams(window.location.search);
    const userId = searchParams.get("PROLIFIC_PID") || searchParams.get("workerId");
    const taskId = searchParams.get("STUDY_ID") || searchParams.get("hitId");
    const sessionId = searchParams.get("SESSION_ID") || searchParams.get("assignmentId");

    let platform = "Unknown";
    if (searchParams.has("PROLIFIC_PID")) {
      platform = "Prolific";
    } else if (searchParams.has("hitId")) {
      platform = "CloudResearch";
    }

    return { userId, taskId, sessionId, platform };
  } else {
    // Return default values or handle the case where window is not available
    return { userId: "", taskId: "", sessionId: "", platform: "Unknown" };
  }
}

// Function to get all video parameters
export async function getVideoParams() {
  const experimentParametersDoc = doc(db, 'experimentParameters', 'videoParameters');
  const experimentParametersSnapshot = await getDoc(experimentParametersDoc);

  return experimentParametersSnapshot.data()
}

// Function to get session data if exists
export async function getSessionData(sessionId) {
  try {
    const sessionDocRef = doc(db, "experimentData", sessionId);
    const sessionDocSnapshot = await getDoc(sessionDocRef);

    if (sessionDocSnapshot.exists()) {
      const sessionData = sessionDocSnapshot.data();
      return sessionData;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error retrieving session data:", error);
    return "Error";
  }
}

// Function to choose random stimuli based on all available stimuli and stim that participant already saw
export async function chooseStimuli(userId, includedStimuli){
  // Create a query to filter sessions by userId
  const sessionsQuery = query(
    collection(db, 'experimentData'),
    where('userId', '==', userId)
  );

  // Fetch sessions that match the query
  const sessionSnapshots = await getDocs(sessionsQuery);

  // Initialize an array to store all stimuli
  const seenStimuli = [];

  // Iterate through the sessions and collect stimuli
  sessionSnapshots.forEach((sessionSnapshot) => {
    const sessionData = sessionSnapshot.data();
    if (sessionData && sessionData['stimuli']) {
      // Check if the session has a 'stimuli' field
      seenStimuli.push(sessionData.stimuli);
    }
  });
  console.log('Seen Stimuli:', seenStimuli);
  console.log('included stiumuli:', includedStimuli)

  // Eliminate stimlui that user already saw
  const optionalStimuli = includedStimuli.filter((stimulus) => !seenStimuli.includes(stimulus));
  console.log('Optional Stimuli:', optionalStimuli);
  // Randomly choose a stimuli from those they did not see
  const randomIndex = Math.floor(Math.random() * optionalStimuli.length);
  const chosenStimuli = optionalStimuli[randomIndex];
  console.log('Chosen Stimuli:', chosenStimuli);
  return chosenStimuli;
}

// function to retrieve stim URL from stimName
export async function stimURL(stimName) {
  const stimuliDocRef = doc(db, 'experimentParameters', 'stimuli');
  const stimuliDocSnapshot = await getDoc(stimuliDocRef);

  if (stimuliDocSnapshot.exists()) {
    const value = stimuliDocSnapshot.data()[stimName];

    if (value !== undefined) {
      return value;
    } else {
      console.error('The curStim "${curStim}" does not match the stimuli bank');
      return null;
    }
  }
}

export async function retrieveRatingWords(fieldName) {
  const ratingWordsDocRef = doc(db, 'experimentParameters', 'ratingWords');
  const ratingWordsSnapshot = await getDoc(ratingWordsDocRef);

  if (ratingWordsSnapshot.exists()) {
    const value = ratingWordsSnapshot.data()[fieldName];

    if (value !== undefined) {
      return value;
    } else {
      console.error('Can not find emotion list in parameters');
      return null;
    }
  }
}

export function shuffleRatingWords(ratingWords) {
  const shuffledList = [...ratingWords]; // Create a copy of the original array
  for (let i = shuffledList.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Generate a random index
    [shuffledList[i], shuffledList[j]] = [shuffledList[j], shuffledList[i]]; // Swap elements
  }
  return shuffledList;
}