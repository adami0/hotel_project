package com.promo.facilhoteserver.repository;

import com.promo.facilhoteserver.model.Client;
import com.promo.facilhoteserver.model.Stock;
import org.springframework.data.repository.CrudRepository;

public interface StockRepository extends CrudRepository<Stock, String> {
}
