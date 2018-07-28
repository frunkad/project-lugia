"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const functions = require("firebase-functions");
admin.initializeApp(functions.config().firebase);
/**
 * Console Logging Legends:
 * [*] at the beginning - logs that are only in dev use, remove in production
 * <{functionName}-{uniqueShortCode}> - short code should have some meaning
 */
const db = admin.firestore();
const rtdb = admin.database();
exports.newUser = functions.auth.user().onCreate((user) => {
    return db.collection('users').doc(user.uid).set({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        id: user.uid,
        whatsappNumber: "",
        contactNumber: "",
        isVerified: false,
        verificationStatus: "init",
        isProfileComplete: false,
        photoVisible: true,
        whatsappNumberVisible: false,
        contactNumberVisible: false,
        photoRef: "",
        isPhotoFromStorage: false
    });
});
exports.userProfileChange = functions.firestore.document("users/{uid}").onUpdate((change, context) => {
    const newData = change.after.data();
    const publicProfile = {
        name: newData.name,
        id: newData.id,
        isProfileComplete: newData.isProfileComplete,
        isVerified: newData.isVerified,
        photo: newData.photoVisible ? newData.photo : "",
        whatsappNumber: newData.whatsappNumberVisible ? newData.whatsappNumber : "",
        contactNumber: newData.contactNumberVisible ? newData.contactNumber : "",
        email: newData.email
    };
    const protectedProfile = {
        name: newData.name,
        id: newData.id,
        isProfileComplete: newData.isProfileComplete,
        email: newData.email,
        whatsappNumber: newData.whatsappNumber,
        contactNumber: newData.contactNumber,
        photo: newData.photo,
        isVerified: newData.isVerified,
        verificationStatus: newData.verificationStatus
    };
    const addToPublic = db.collection("user_public").doc(newData.id).set(publicProfile, { merge: true });
    const addToProtected = db.collection("user_protected").doc(newData.id).set(protectedProfile, { merge: true });
    return Promise.all([addToProtected, addToPublic]);
});
//# sourceMappingURL=index.js.map