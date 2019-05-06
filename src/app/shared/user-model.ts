export class UserModel {
  id: number;
  name: string;
  email: string;
  address: string;
  dateOfBirth: string;
  gender: string;

  constructor(param?: UserModel) {
    if (param) {
      Object.assign(this, param);
    }
  }

  // UserModel.exapmleUser
  static get exampleUser(): UserModel {
    return {
      id: 0,
      name: 'Legyek Réka Matilda',
      email: 'reka@vipmail.hu',
      address: 'Laktanya u. 7',
      dateOfBirth: '2001.11.01',
      gender: 'male'
    };
  }

  static get emptyUser(): UserModel {
    return {
      id: 0,
      name: '',
      email: '',
      address: '',
      dateOfBirth: '',
      gender: ''
    };
  }
}
