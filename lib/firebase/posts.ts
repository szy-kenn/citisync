import { db } from "./firebaseConfig";
import {addDoc, collection, getDocs } from "firebase/firestore";

async function getAllPosts() {
    try {
        const postsCollection = collection(db, 'Posts');  // Get a reference to the 'Posts' collection
        const snapshot = await getDocs(postsCollection);  // Get all documents in the collection

        const posts = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()  // Spread the document data
        }));

        return posts;

    } catch (error) {
        console.log("[getAllPosts() error]: error");
    }
};

// Function to add a new post to Firestore
async function addPost(postData: any) {
    try {
        // Get a reference to the 'Posts' collection
        const postsCollection = collection(db, 'Posts');

        // Add a new document to the 'Posts' collection
        const docRef = await addDoc(postsCollection, postData);
        
        console.log("Document written with ID: ", docRef.id);  // Log the document ID
        return { id: docRef.id, ...postData };  // Return the added post data along with the generated ID
    } catch (error) {
        console.error("[addPost() error]:", error);  // Log the error
    }
}