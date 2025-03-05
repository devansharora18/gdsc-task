interface User {
	id: number;
	username: string;
	fullName: string;
	email: string;
	image?: string;
  }
  
  interface Comment {
	id: number;
	body: string;
	likes: number;
	user: User;
  }
  
  interface Post {
	post: { id: any; username: any; image: any; };
	id: number;
	title: string;
	body: string;
	reactions: {
	  likes: number;
	  dislikes: number;
	};
	tags: string[];
	comments?: Comment[];
	userId: number;
	user?: User;
	views: number;
  }
  
  export type { User, Comment, Post };
  