export interface ImageDocument {
  _id: string;
  src: string;
  name: string;
  author: string;
  likes: number;
}

export enum RoomType {
  Private = "private",
  Shared = "shared",
}

export interface UserDocument {
  _id: string;
  username: string;
  name: string;
  budget: number;
  location: string;
  preferences: {
    roomType: RoomType;
    smoking: boolean;
    pets: boolean;
  };
  images: string[];
  interests: string[];
  matches: string[]; // list of user ids
}


export interface UserCreds {
  _id: string; // Same as UserDocument._id
  username: string;
  password: string; // Hashed password
}

export interface ImageWithAuthor {
    _id: string;
    src: string;
    name: string;
    likes: number;
    author: {
        name: string;
    } | null;
}