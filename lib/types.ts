import { Timestamp } from "firebase/firestore";

export interface Post {
    id: string;
    category: string;
    content: string;
    dislikes: number,
    likes: number;
    createdAt: Timestamp;
    user: string;
    feedback: feedback[];
    image_url: string;
    isResolved: boolean;
    location: string;
    title: string;
    user_id: string;
}

export interface feedback {
    content: string;
    user_id: string;
}

export interface Comment {
    id: number
    author: string
    content: string
    timestamp: string
}

export interface Proposal {
    id: string
    title: string
    content: string
    author: string
    createdAt: Date
    initialVotes: number
    initialComments: Comment[]
  }