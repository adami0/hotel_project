package com.promo.facilhoteserver.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@Entity
public class Stock {

    @Id
    private String id;
    private int reference;
    private String category;
    private String name;
    private int price;
    private int quantity;
    private int min_quantity;

}
