package fr.choupiteam.menus.application.side.service;

import fr.choupiteam.menus.application.side.model.SideDish;
import fr.choupiteam.menus.infrastructure.repository.SideDishRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SideDishService {

    @Autowired
    private SideDishRepository sideDishRepository;

    public List<SideDish> getAllSideDishes() {
        return this.sideDishRepository.findAll();
    }

    public SideDish saveDish(SideDish dish) {
        return this.sideDishRepository.save(dish);
    }

    public SideDish getDish(String id) {
        return this.sideDishRepository.findById(id).orElse(null);
    }

    public void deleteSide(String id) {
        this.sideDishRepository.deleteById(id);
    }
}
