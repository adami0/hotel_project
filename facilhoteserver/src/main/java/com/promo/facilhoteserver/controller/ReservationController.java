package com.promo.facilhoteserver.controller;

import com.promo.facilhoteserver.model.Reservation;
import com.promo.facilhoteserver.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;
import java.util.Optional;

public class ReservationController {
    @Autowired
    private ReservationService reservationService;

    @RequestMapping("reservations")
    public List<Reservation> getallreservations() {
        return reservationService.getReservations();
    }

    @RequestMapping("/reservations/{id}")
    public Optional<Reservation> getReservation(@PathVariable String id) {
        return reservationService.getReservation(id);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/reservations")
    public void addReservation(@RequestBody Reservation reservation) {
        reservationService.addReservation(reservation);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/reservations/{id}")
    public void updateReservation(@RequestBody Reservation reservation, @PathVariable String id) {
        reservationService.updateReservation(reservation);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/reservations/{id}")
    public void deleteReservation(@PathVariable String id) {
        reservationService.deleteReservation(id);
    }
}