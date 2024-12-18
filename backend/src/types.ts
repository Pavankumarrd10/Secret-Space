export interface Confession {
  id: string;
  content: string;
  timestamp: string;
  userId: string;
}

export interface User {
  id: string;
  username: string;
  password: string;
  isAdmin: boolean;
}

export interface TokenPayload {
  userId: string;
  iat: number;
  exp: number;
}