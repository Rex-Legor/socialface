import { IUser } from './user.model';

interface IPostCommon {
  id: string;
  totalComments: number;
  totalLikes: number;
  date: string;
  description: string;
  picture: string;
  liked?: boolean;
  comments?: IPostComment[];
}

export interface IPost extends IPostCommon {
  userData: Partial<IUser>;
  isSponsored?: boolean;
}

export interface IPostComment {
  userData: IUser;
  postId: string;
  comment: string;
}

export interface IAd extends IPostCommon {
  companyName: string;
  companyPicture: string;
}

export interface IPostsResponseSuccess {
  posts: IPost[];
  totalPages: number;
}
