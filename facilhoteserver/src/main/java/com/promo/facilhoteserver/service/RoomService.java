package com.promo.facilhoteserver.service;

import com.promo.facilhoteserver.model.Room;
import com.promo.facilhoteserver.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class RoomService {

    @Autowired
    private RoomRepository repos;


    public List<Room> getRooms() {

        List<Room> rooms = new ArrayList<>();

        repos.findAll().forEach(rooms::add);

        return rooms;
    }

    public Optional<Room> getRoom(String id) {
        System.out.println(id);
        return repos.findById(id);
    }

    public void addRoom(Room room) {
        repos.save(room);
    }

    public void updateRoom(Room room) {
        repos.save(room);
    }

    public void deleteRoom(String id) {

        repos.deleteById(id);
    }
}
