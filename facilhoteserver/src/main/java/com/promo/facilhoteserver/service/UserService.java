package com.promo.facilhoteserver.service;

import com.promo.facilhoteserver.model.User;
import com.promo.facilhoteserver.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class UserService {

    @Autowired
    private UserRepository repos;


    public List<User> getUsers() {

        List<User> users = new ArrayList<>();

        repos.findAll().forEach(users::add);

        return users;
    }

    public Optional<User> getUser(String id) {
        System.out.println(id);
        return repos.findById(id);
    }

    public void addUser(User user) {
        repos.save(user);
    }

    public void updateUser(User user) {
        repos.save(user);
    }

    public void deleteUser(String id) {

        repos.deleteById(id);
    }
}
