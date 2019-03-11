package com.promo.facilhoteserver.controller;

import com.promo.facilhoteserver.model.Incident;
import com.promo.facilhoteserver.service.IncidentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;
import java.util.Optional;

public class IncidentController {
    @Autowired
    private IncidentService incidentService;

    @RequestMapping("incidents")
    public List<Incident> getallincidents() {
        return incidentService.getIncidents();
    }

    @RequestMapping("/incidents/{id}")
    public Optional<Incident> getIncident(@PathVariable String id) {
        return incidentService.getIncident(id);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/incidents")
    public void addIncident(@RequestBody Incident incident) {
        incidentService.addIncident(incident);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/incidents/{id}")
    public void updateIncident(@RequestBody Incident incident, @PathVariable String id) {
        incidentService.updateIncident(incident);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/incidents/{id}")
    public void deleteIncident(@PathVariable String id) {
        incidentService.deleteIncident(id);
    }
}