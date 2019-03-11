package com.promo.facilhoteserver.service;

import com.promo.facilhoteserver.model.Incident;
import com.promo.facilhoteserver.repository.IncidentRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class IncidentService {

    @Autowired
    private IncidentRepository repos;


    public List<Incident> getIncidents() {

        List<Incident> incidents = new ArrayList<>();

        repos.findAll().forEach(incidents::add);

        return incidents;
    }

    public Optional<Incident> getIncident(String id) {
        System.out.println(id);
        return repos.findById(id);
    }

    public void addIncident(Incident incident) {
        repos.save(incident);
    }

    public void updateIncident(Incident incident) {
        repos.save(incident);
    }

    public void deleteIncident(String id) {

        repos.deleteById(id);
    }
}
