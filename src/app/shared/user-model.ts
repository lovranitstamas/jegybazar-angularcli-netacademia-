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
      id: 1,
      name: 'Pista ba',
      email: 'pistaba@pistaba.com',
      address: 'pistaba lak 12',
      dateOfBirth: '1900-01-01',
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
