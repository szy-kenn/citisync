import { db } from "./firebaseConfig";
import { Post } from "@/lib/types";
import {addDoc, collection, doc, getDoc, getDocs, setDoc, query, where, serverTimestamp } from "firebase/firestore";
import { Proposal } from "@/lib/types";


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

export async function getResolvedPosts() {
    try {
        const postsCollectionRef = collection(db, "Posts"); 
        const postsQuery = query(postsCollectionRef, where("isResolved", "==", true));

        const snapshot = await getDocs(postsQuery);
        const posts = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Post));

        return posts;
    }
    catch (error) {
        console.error("[getResolvedPosts() error]:", error);
        return [];
    }
}

export async function getUnresolvedPosts() {
    try {
        const postsCollectionRef = collection(db, "Posts"); 
        const postsQuery = query(postsCollectionRef, where("isResolved", "==", false));

        const snapshot = await getDocs(postsQuery);
        const posts = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Post));

        return posts;
    }
    catch (error) {
        console.error("[getUnresolvedPosts() error]:", error);
        return [];
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

interface ProposalData {
    title: string
    content: string
  }
  
  interface ProposalSubmissionResult {
    success: boolean
    error?: string
    proposalId?: string
  }
  
export async function submitProposal(
  data: ProposalData,
  currentUser: any | null,
  username: string | null
): Promise<ProposalSubmissionResult> {
  if (!currentUser) {
    return {
      success: false,
      error: 'User must be authenticated to submit a proposal'
    }
  }

  try {
    const proposalData = {
      ...data,
      authorId: currentUser.uid,
      author: username,
      initialVotes: 0,
      createdAt: Date.now(),
      initialComments: []
    }

    const proposalRef = await addDoc(
      collection(db, 'proposals'),
      proposalData
    )

    return {
      success: true,
      proposalId: proposalRef.id
    }
  } catch (error) {
    console.error('Error submitting proposal:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    }
  }
}

export async function getProposals() {
  try {
    const querySnapshot = await getDocs(collection(db, 'proposals'))

    const proposals = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    return proposals as Proposal[]
  } catch (error) {
    console.error('Error getting proposals:', error)
    return []
  }
}

