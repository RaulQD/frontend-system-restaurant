
export type LoginDataForm = {
  username: string;
  password: string;
}

export type LoginResponse = {
  token: string;
  user: {
    id: number;
    username: string;
    role: {
      name: string;
    }
  }
}
