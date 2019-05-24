export class UserModel {
  id: string;
  name: string;
  email: string;
  address: string;
  dateOfBirth: string;
  gender: string;
  profilePictureUrl: string;

  constructor(param?: UserModel) {
    if (param) {
      Object.assign(this, param);
    }
  }

  /*
  // UserModel.exapmleUser
  static get exampleUser(): UserModel {
    return {
      id: 1,
      name: 'Pista ba',
      email: 'pistaba@pistaba.com',
      address: 'pistaba lak 12',
      dateOfBirth: '1900-01-01',
      gender: 'male',
      profilePictureUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4nBubms8tp5EDXG6LBhVyy4AES2WCqceh674hyF6rNwjYoJ4ddQ'
    };
  }

  static get emptyUser(): UserModel {
    return {
      id: 0,
      name: '',
      email: '',
      address: '',
      dateOfBirth: '',
      gender: '',
      profilePictureUrl: ''
    };
  }*/
}
