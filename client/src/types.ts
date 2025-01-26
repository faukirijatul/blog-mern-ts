export interface Reply {
    id: string;
    user: string;
    text: string;
    createdAt: string;
    likes: number;
  }
  
  export interface Comment {
    id: string;
    user: string;
    text: string;
    createdAt: string;
    likes: number;
    replies: Reply[];
  }
  
  export interface Blog {
    id: string;
    title: string;
    author: string;
    createdAt: string;
    thumbnail: string;
    category: string;
    content: string;
    likes: number;
    comments: Comment[];
  }