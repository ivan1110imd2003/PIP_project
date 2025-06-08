import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { Trip } from "../types/Trip";

const TripsList: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await fetch("http://localhost:3000/trips");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Trip[] = await response.json();
        setTrips(data);
      } catch (e: any) {
        setError(`Грешка при зареждане на почивки: ${e.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, []);

  if (loading)
    return <p className="message message--info">Зареждане на почивки...</p>;
  if (error) return <p className="message message--error">{error}</p>;
  if (trips.length === 0)
    return <p className="message">В момента няма налични почивки.</p>;

  return (
    <div className="trips-list-page">
      <h2 className="trips-list-page__title">Налични Почивки</h2>
      <div className="trips-grid">
        {trips.map((trip) => (
          <div key={trip.id} className="trip-card">
            {trip.image_url && (
              <img
                src={trip.image_url}
                alt={trip.destination ?? ""}
                className="trip-card__image"
              />
            )}
            <div className="trip-card__content">
              <h3 className="trip-card__destination">{trip.destination}</h3>
              <p className="trip-card__dates">
                {trip.start_date
                  ? new Date(trip.start_date).toLocaleDateString()
                  : ""}{" "}
                -{" "}
                {trip.end_date
                  ? new Date(trip.end_date).toLocaleDateString()
                  : ""}
              </p>
              <p className="trip-card__price">
                Цена: $
                {trip.price?.toFixed ? trip.price.toFixed(2) : trip.price}
              </p>
              <p className="trip-card__description">{trip.description}</p>
              <p className="trip-card__slots">
                Свободни места: {trip.available_slots}
              </p>
              <Link
                to={`/trips/${trip.id}`}
                className="button button--primary button--small"
              >
                Виж повече
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripsList;
