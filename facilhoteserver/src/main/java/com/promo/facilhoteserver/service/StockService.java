package com.promo.facilhoteserver.service;

import com.promo.facilhoteserver.model.Stock;
import com.promo.facilhoteserver.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class StockService {

    @Autowired
    private StockRepository repos;


    public List<Stock> getStocks() {

        List<Stock> stocks = new ArrayList<>();

        repos.findAll().forEach(stocks::add);

        return stocks;
    }

    public Optional<Stock> getStock(String id) {
        System.out.println(id);
        return repos.findById(id);
    }

    public void addStock(Stock stock) {
        repos.save(stock);
    }

    public void updateStock(Stock stock) {
        repos.save(stock);
    }

    public void deleteStock(String id) {

        repos.deleteById(id);
    }
}
