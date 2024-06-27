import { IUser } from './user.model';

interface IPostCommon {
  id: string;
  totalComments: number;
  totalLikes: number;
  date: string;
  description: string;
  picture: string;
}

export interface IPost extends IPostCommon {
  userData: IUser;
  liked: boolean;
  comments?: IPostComment[];
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
