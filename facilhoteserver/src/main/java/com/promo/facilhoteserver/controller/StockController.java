package com.promo.facilhoteserver.controller;

import com.promo.facilhoteserver.model.Stock;
import com.promo.facilhoteserver.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;
import java.util.Optional;

public class StockController {
    @Autowired
    private StockService stockService;

    @RequestMapping("stocks")
    public List<Stock> getallstocks() {
        return stockService.getStocks();
    }

    @RequestMapping("/stocks/{id}")
    public Optional<Stock> getStock(@PathVariable String id) {
        return stockService.getStock(id);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/stocks")
    public void addStock(@RequestBody Stock stock) {
        stockService.addStock(stock);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/stocks/{id}")
    public void updateStock(@RequestBody Stock stock, @PathVariable String id) {
        stockService.updateStock(stock);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/stocks/{id}")
    public void deleteStock(@PathVariable String id) {
        stockService.deleteStock(id);
    }
}