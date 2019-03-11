package com.promo.facilhoteserver.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@Entity
public class User {

    @Id
    private String id;
    private String last_name;
    private String first_name;
    private String email;
    private int password;
    private String username;
    private String role;


}
