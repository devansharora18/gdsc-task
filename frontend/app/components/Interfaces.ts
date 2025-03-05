interface Comment {
	id: number;
	body: string;
	likes: number;
	user: {
	  id: number;
	  username: string;
	  fullName: string;
	  image?: string;
	};
  }
  
  interface Post {
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
	user?: {
	  id: number;
	  username: string;
	  image: string;
	};

	views: number;
  }

export type { Comment, Post };