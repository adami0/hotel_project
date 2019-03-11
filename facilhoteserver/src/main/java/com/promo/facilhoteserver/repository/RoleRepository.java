package com.promo.facilhoteserver.repository;

import com.promo.facilhoteserver.model.Client;
import com.promo.facilhoteserver.model.Role;
import org.springframework.data.repository.CrudRepository;

public interface RoleRepository extends CrudRepository<Role, String> {
}
