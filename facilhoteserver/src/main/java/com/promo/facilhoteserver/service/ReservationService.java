package com.promo.facilhoteserver.service;


import com.promo.facilhoteserver.model.Reservation;
import com.promo.facilhoteserver.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class ReservationService {

    @Autowired
    private ReservationRepository repos;


    public List<Reservation> getReservations() {

        List<Reservation> reservations = new ArrayList<>();

        repos.findAll().forEach(reservations::add);

        return reservations;
    }

    public Optional<Reservation> getReservation(String id) {
        System.out.println(id);
        return repos.findById(id);
    }

    public void addReservation(Reservation reservation) {
        repos.save(reservation);
    }

    public void updateReservation(Reservation reservation) {
        repos.save(reservation);
    }

    public void deleteReservation(String id) {

        repos.deleteById(id);
    }
}
