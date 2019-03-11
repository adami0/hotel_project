package com.promo.facilhoteserver.controller;

import com.promo.facilhoteserver.model.Client;
import com.promo.facilhoteserver.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;
import java.util.Optional;

public class ClientController {
    @Autowired
    private ClientService clientService;

    @RequestMapping("clients")
    public List<Client> getallclients() {
        return clientService.getClients();
    }

    @RequestMapping("/clients/{id}")
    public Optional<Client> getClient(@PathVariable String id) {
        return clientService.getClient(id);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/clients")
    public void addClient(@RequestBody Client client) {
        clientService.addClient(client);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/clients/{id}")
    public void updateClient(@RequestBody Client client, @PathVariable String id) {
        clientService.updateClient(client);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/clients/{id}")
    public void deleteClient(@PathVariable String id) {
        clientService.deleteClient(id);
    }
}