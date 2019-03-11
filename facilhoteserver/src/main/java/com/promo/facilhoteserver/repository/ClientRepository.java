package com.promo.facilhoteserver.repository;

import com.promo.facilhoteserver.model.Client;
import org.springframework.data.repository.CrudRepository;

public interface ClientRepository extends CrudRepository<Client, String> {
}
