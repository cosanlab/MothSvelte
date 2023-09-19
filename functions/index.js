/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
admin.initializeApp();

//----- Fetching ratings collection of sub-collection
 exports.fetchData = functions.https.onRequest(async (req, res) => {
   cors(req, res, async () => {
     const { hitId, participantID } = req.query;
    
    try {
      // const { docPath } = req.body;
      // const docPath = "/study/HIT_ID/users/TP_1MNC2G79SCJ4/attempted1/ratings";
      const docPath = `/study/${hitId}/users/${participantID}`;

      const collections = await admin.firestore().doc(docPath).listCollections();
      const collectionIds = collections.map((col) => col.id);

      // return { collections: collectionIds };

      return res.status(200).json({ success: true, collections: collectionIds });
    } catch (error) {
      console.error("Error fetching data:", error);
      logger.error(error.message)
      return res
        .status(500)
        .json({ message: "SOMETHING WENT WRONG", error: error.message });
    }
  });
     
});

// ------------ Fetching UserAttempt ----------------



