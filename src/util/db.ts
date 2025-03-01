import Database from '@tauri-apps/plugin-sql';
import { DBConfig, DBType } from '../types';
import { load } from '@tauri-apps/plugin-store';


const DB_KEY = 'db';
const DB_FILE = 'db.json';

const init = async (type: DBType, url: string) => {
  setConfig({ type, url });
  const db = await Database.load(url);
  const response = await fetch(url);

  // 检查响应是否成功
  if (!response.ok) {
    throw new Error('获取sql脚本失败');
  }

  const sql = await response.text();

  await db.execute(sql);
}

const getConfig = async (): Promise<DBConfig | undefined> => {
  const store = await load(DB_FILE, { autoSave: true });
  const config = await store.get<DBConfig>(DB_KEY);
  return config;
}

const setConfig = async (config: DBConfig) => {
  const store = await load(DB_FILE, { autoSave: true });
  await store.set(DB_KEY, config);
}

export { init, getConfig, setConfig }