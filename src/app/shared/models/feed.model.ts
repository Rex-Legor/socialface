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
}

export interface IAd extends IPostCommon {
  companyName: string;
  companyPicture: string;
}

export interface IFeedPost extends IPostCommon {
  cardTitle: string;
  cardSubtitle: string;
  cardPicture: string;
}
