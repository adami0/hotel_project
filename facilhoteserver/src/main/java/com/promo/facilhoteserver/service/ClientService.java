package com.promo.facilhoteserver.service;

import com.promo.facilhoteserver.model.Client;
import com.promo.facilhoteserver.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class ClientService {

    @Autowired
    private ClientRepository repos;


    public List<Client> getClients() {

        List<Client> clients = new ArrayList<>();

        repos.findAll().forEach(clients::add);

        return clients;
    }

    public Optional<Client> getClient(String id) {
        System.out.println(id);
        return repos.findById(id);
    }

    public void addClient(Client client) {
        repos.save(client);
    }

    public void updateClient(Client client) {
        repos.save(client);
    }

    public void deleteClient(String id) {

        repos.deleteById(id);
    }
}
