import { db } from "./firebaseConfig";
import { Post } from "@/lib/types";
import {addDoc, collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";


export async function getAllPosts() {
    try {
        const postsCollection = collection(db, 'Posts');  // Get a reference to the 'Posts' collection
        const snapshot = await getDocs(postsCollection);  // Get all documents in the collection

        const posts = snapshot.docs.map(doc => ({
            ...doc.data(),  // Spread the document data
            id: doc.id
        } as Post))

        return posts;

    } catch (error) {
        console.log("[getAllPosts() error]: error");
    }
};

// Function to add a new post to Firestore
export async function addPost(postData: any) {
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

export async function getPost(postId: string): Promise<Post | null> {
    try {
        const docRef = doc(db, 'Posts', postId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            console.log("No such document");
            return null;
        }
    } catch (error) {
        console.error("[getPost() error]:", error);  // Log the error
        throw error;
    }
}
// Function to update an existing post using setDoc (overwrite the entire document)
async function updatePost(userId: string, postId: string, updatedData: any) {
    try {

        const userRef = doc(db, 'Posts', userId);

        // Get a reference to the document you want to update (replace the whole document)
        const docRef = doc(db, 'Posts', postId);

        // Replace the entire document with the new data
        await setDoc(docRef, updatedData);

        console.log("Document updated with ID: ", postId);
        return { id: postId, ...updatedData };  // Return the updated data
    } catch (error) {
        console.error("[updatePost() error]:", error);
    }
}
