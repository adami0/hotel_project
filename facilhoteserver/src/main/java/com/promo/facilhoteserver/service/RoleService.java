package com.promo.facilhoteserver.service;

import com.promo.facilhoteserver.model.Role;
import com.promo.facilhoteserver.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class RoleService {

    @Autowired
    private RoleRepository repos;


    public List<Role> getRoles() {

        List<Role> roles = new ArrayList<>();

        repos.findAll().forEach(roles::add);

        return roles;
    }

    public Optional<Role> getRole(String id) {
        System.out.println(id);
        return repos.findById(id);
    }

    public void addRole(Role role) {
        repos.save(role);
    }

    public void updateRole(Role role) {
        repos.save(role);
    }

    public void deleteRole(String id) {

        repos.deleteById(id);
    }
}
