// src/data/mockTrips.ts
import type { Trip, TripFormData } from '../types';

export const mockTrips: Trip[] = [
  {
    id: 1,
    name: 'Приключение в Родопите',
    destination: 'Пампорово',
    startDate: '2025-07-10',
    endDate: '2025-07-15',
    description: 'Петдневна екскурзия с планински преходи и красиви гледки.',
    organizerId: 101,
  },
  {
    id: 2,
    name: 'Морска фиеста в Гърция',
    destination: 'Тасос',
    startDate: '2025-08-20',
    endDate: '2025-08-27',
    description: 'Седемдневна почивка на гръцки остров със слънце и плаж.',
    organizerId: 102,
  },
  {
    id: 3,
    name: 'Разходка из Стария Пловдив',
    destination: 'Пловдив',
    startDate: '2025-09-05',
    endDate: '2025-09-07',
    description: 'Културно пътешествие из древните улици и исторически забележителности.',
    organizerId: 101,
  },
];