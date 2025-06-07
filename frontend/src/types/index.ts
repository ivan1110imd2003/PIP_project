// src/types/index.ts

export interface Trip {
  id: number;
  name: string;
  destination: string;
  startDate: string; // Може да е Date тип, ако използваш Date обекти
  endDate: string; // Същото
  description?: string;
  organizerId: number; // Или User, ако дефинираш целия обект
  // Добави други полета, ако имаш в бекенда (e.g., participants)
}

// Пример за данни за създаване/редактиране
export type TripFormData = Omit<Trip, "id" | "organizerId">;

// Добави други типове, ако са необходими (e.g., User, Participant)
export interface User {
  id: number;
  username: string;
  email: string;
}
