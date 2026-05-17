export type Role = "ADMIN" | "RECEPTIONIST" | "RESIDENT";
export type PackageStatus = "PENDING" | "DELIVERED" | "CONFIRMED";

export interface User {
  name: string;
  email: string;
  role: Role;
  password: string;
  unit?: string;
}

export interface CreateUserInput {
  name: string;
  email: string;
  role: Role;
  unit?: string;
}

export interface Package {
  description: string;
  photoUrl?: string;
  recipientId: string;
  porterId: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: string;
      };
    }
  }
}

export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}
