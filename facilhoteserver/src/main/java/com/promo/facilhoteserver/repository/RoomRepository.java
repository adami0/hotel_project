package com.promo.facilhoteserver.repository;

import com.promo.facilhoteserver.model.Client;
import com.promo.facilhoteserver.model.Room;
import org.springframework.data.repository.CrudRepository;

public interface RoomRepository extends CrudRepository<Room, String> {
}
