// frontend/src/types/Trip.ts

export type Trip = {
  id: number;
  destination: string;
  start_date: string; // MySQL DATE тип ще дойде като string във формат 'YYYY-MM-DD'
  end_date: string; // MySQL DATE тип ще дойде като string във формат 'YYYY-MM-DD'
  price: number;
  description: string;
  available_slots: number;
  image_url: string | null; // Може да е null, ако няма изображение
  created_at: string; // MySQL TIMESTAMP ще дойде като string
};
