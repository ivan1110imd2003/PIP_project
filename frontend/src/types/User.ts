export type User = {
  id: number;
  username: string;
  email: string;
  created_at?: string; // Опционално, ако не винаги е налично
};
