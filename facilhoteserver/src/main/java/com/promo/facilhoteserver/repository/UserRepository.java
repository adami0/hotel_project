package com.promo.facilhoteserver.repository;

import com.promo.facilhoteserver.model.Client;
import com.promo.facilhoteserver.model.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, String> {
}
