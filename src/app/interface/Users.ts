export interface User {
    email: string;            // User's email address
    hashed_password: string;  // Hashed version of the user's password
    id: number;               // Unique identifier for the user
    roleName:string     // Role ID (e.g., 1 for Super Admin, 2 for Simple Admin, etc.)
    role_id: number;     
       // Human-readable role name (e.g., "Simple Admin")
  }