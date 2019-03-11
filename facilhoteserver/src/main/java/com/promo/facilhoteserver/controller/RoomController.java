package com.promo.facilhoteserver.controller;

import com.promo.facilhoteserver.model.Room;
import com.promo.facilhoteserver.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;
import java.util.Optional;

public class RoomController {
    @Autowired
    private RoomService roomService;

    @RequestMapping("rooms")
    public List<Room> getallrooms() {
        return roomService.getRooms();
    }

    @RequestMapping("/rooms/{id}")
    public Optional<Room> getRoom(@PathVariable String id) {
        return roomService.getRoom(id);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/rooms")
    public void addRoom(@RequestBody Room room) {
        roomService.addRoom(room);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/rooms/{id}")
    public void updateRoom(@RequestBody Room room, @PathVariable String id) {
        roomService.updateRoom(room);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/rooms/{id}")
    public void deleteRoom(@PathVariable String id) {
        roomService.deleteRoom(id);
    }
}