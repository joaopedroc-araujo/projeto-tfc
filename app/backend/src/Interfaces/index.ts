export type NewUser<T> = Omit<T, 'id' | 'username' | 'role'>;
