package com.promo.facilhoteserver.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@Entity
public class Reservation {

    @Id
    private String id;
    private String arrival_date;
    private String departure_date;
    private int guests;
    private int phone_number;
    private int price;
    private int nights;

}
