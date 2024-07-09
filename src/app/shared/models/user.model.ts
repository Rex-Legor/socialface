export interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  country: string;
  notificationPreference: string;
  profilePicture: string;
  birthDate: string;
  userGroups?: IUserGroups[];
  friends?: IUser[];
  phoneNumber?: string;
  profileVisibility?: string;
  canAccessBusiness?: boolean;
}

interface IUserGroups {
  name: string;
  icon: string;
}
