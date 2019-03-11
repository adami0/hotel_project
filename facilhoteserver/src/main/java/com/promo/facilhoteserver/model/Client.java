package com.promo.facilhoteserver.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@Entity
public class Client {

    @Id
    private String id;
    private String last_name;
    private String first_name;
    private String address;
    private int phone_number;
    private String email;
    private String gender;


}
