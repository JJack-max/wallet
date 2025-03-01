export type DBType = 'postgres' | 'mysql' | 'sqlite';

export interface DBConfig {
  type: DBType,
  url: string,
};

export interface User {
  id: number,
  username: string,
  password: string,
  salt: string,
}