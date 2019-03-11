package com.promo.facilhoteserver.repository;

import com.promo.facilhoteserver.model.Client;
import com.promo.facilhoteserver.model.Incident;
import org.springframework.data.repository.CrudRepository;

public interface IncidentRepository extends CrudRepository<Incident, String> {
}
