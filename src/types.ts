export type DBType = 'postgres' | 'mysql' | 'sqlite';

export interface DBConfig {
  type: DBType,
  url: string,
};