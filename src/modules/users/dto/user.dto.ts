export class UserDto {
  constructor(
    public name: string,
    public email: string,
    public password?: string,
  ) {}

  static toJSON(user: UserDto) {
    return { name: user.name, email: user.email };
  }

  static parse(user: string) {
    return JSON.parse(user) as UserDto;
  }
}

export type CreateUserDto = Required<UserDto> & {
  passwordConfirmation: string;
};

export type UpdateUserDto = { name?: string };
