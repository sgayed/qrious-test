export enum Gender {
  Male = 'male',
  Female = 'female',
}

export interface Person {
  id: number;
  name: string;
  children: number[];
  gender: Gender;
  parents: number[];
}
