package com.promo.facilhoteserver.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@Entity
public class Incident {

    @Id
    private String id;
    private String type;
    private String description;
    private boolean resolution;
}
