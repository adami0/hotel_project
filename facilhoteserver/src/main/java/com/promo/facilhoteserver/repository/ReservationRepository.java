package com.promo.facilhoteserver.repository;

import com.promo.facilhoteserver.model.Reservation;
import org.springframework.data.repository.CrudRepository;

public interface ReservationRepository extends CrudRepository<Reservation, String> {
}
