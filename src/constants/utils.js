import { collection, query, where, getDocs, getDoc, doc, setDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../config/firebase";


export function consoleIfDev(...items) {
  if (import.meta.env.DEV){
    console.log(...items);
  }
}
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
      platform = "MTurk";
    }

    if (userId.startsWith('debug_') && taskId.startsWith('debug_') && sessionId.startsWith('debug_')) {
      platform = "debug";
    }

    return { userId, taskId, sessionId, platform };
  } else {
    // Return default values or handle the case where window is not available
    return { userId: "", taskId: "", sessionId: "", platform: "Unknown" };
  }
}

const auth = getAuth(); 
// Authentication functions
export async function loginToDB(userId) {
  // Automatically generate the email address from the userId
  const email = userId + "@experiment.com";
  const password = "Password";
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      showLoginButton = false;
      showNewAccountButton = true;
      loginError = null;
    } else {
      loginError = error.code;
    }
  }
}

export async function createUser(userId) {
  // Automatically generate the email address from the userId
  const email = userId + "@experiment.com";
  const password = "Password";
  try {
    // Use Firebase Authentication to create a new user with email and password
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error('User creation error:', error);
  }
}

// Function to get all video parameters
export async function getVideoParams() {
  try {
    const experimentParametersDoc = doc(db, 'experimentParameters', 'videoParameters');
    const experimentParametersSnapshot = await getDoc(experimentParametersDoc);

    if (experimentParametersSnapshot.exists()) {
      const experimentParameters = experimentParametersSnapshot.data();
      return experimentParameters;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error retrieving experiment parameters:", error);
    return "Error";
  }
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
  try {
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
    consoleIfDev('Seen Stimuli:', seenStimuli);
    consoleIfDev('included stiumuli:', includedStimuli)

    // Eliminate stimlui that user already saw
    const optionalStimuli = includedStimuli.filter((stimulus) => !seenStimuli.includes(stimulus));
    consoleIfDev('Optional Stimuli:', optionalStimuli);
    if (optionalStimuli.length === 0) {
      return null;
    }
    // Randomly choose a stimuli from those they did not see
    const randomIndex = Math.floor(Math.random() * optionalStimuli.length);
    const chosenStimuli = optionalStimuli[randomIndex];
    return chosenStimuli;
  } catch (error) {
    console.error("Error choosing stimuli:", error);
    return "Error";
  }
}

// function to retrieve stim Data from stimName
export async function stimData(stimName) {
  try {
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
  } catch (error) {
    console.error("Error retrieving stimuli data:", error);
    return "Error";
  }
}

export function createBreaks(vidDuration, videoParameters) {
  const numStops = Math.ceil(vidDuration/videoParameters.sampleRate);
  const vidRange = vidDuration - videoParameters.endSpace - videoParameters.startSpace;

  let potBreaks = [];
  for (let t = 0; t < 1000; t++) {
    potBreaks = []
    let meetCriteria = true;
    
    // Sample random points from the range
    for (let i = 0; i < numStops; i++) {
      potBreaks.push(Math.floor(Math.random() * vidRange));
    }
    // Sort the array of random points
    potBreaks.sort((a,b) => a-b);
    // Check if the minimum distance is > minSpacing parameter
    for (let i = 0; i < potBreaks.length - 1; i++) {
      if (potBreaks[i + 1] - potBreaks[i] <= videoParameters.minSpacing) {
        meetCriteria = false; // Minimum difference is not greater than 5
        break
      }
    }
    if (meetCriteria) {
      consoleIfDev("solved within:", t)
      break
    }
  }
  consoleIfDev(potBreaks)
  const breaks = potBreaks.map((number) => number + videoParameters.startSpace);
  consoleIfDev(breaks)
  return breaks;
}

export async function retrieveRatingWords(fieldName) {
  try {
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
  } catch (error) {
    console.error("Error retrieving rating words:", error);
    return "Error";
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

export async function saveSessionToDB(sessionId, sessionData) {
  try {
    const docRef = doc(db, "experimentData", sessionId);
    await setDoc(docRef, sessionData);

    consoleIfDev("Data saved to the database.");
  } catch (error) {
    console.error("Error saving data to the database:", error);
  }
}