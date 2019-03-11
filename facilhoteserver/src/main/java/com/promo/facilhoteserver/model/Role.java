package com.promo.facilhoteserver.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@Entity
public class Role {

    @Id
    private String id;
    private String title;

}
