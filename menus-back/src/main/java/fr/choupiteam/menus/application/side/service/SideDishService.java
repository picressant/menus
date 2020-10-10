package fr.choupiteam.menus.application.side.service;

import fr.choupiteam.menus.application.pager.model.Pager;
import fr.choupiteam.menus.application.side.model.SideDish;
import fr.choupiteam.menus.infrastructure.repository.SideDishRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SideDishService {

    @Autowired
    private SideDishRepository sideDishRepository;

    public Page<SideDish> getSideDishesByPager(Pager pager) {
        return this.sideDishRepository.findAllByPager(pager, SideDish.class);
    }

    public SideDish saveDish(SideDish dish) {
        return this.sideDishRepository.save(dish);
    }

    public SideDish addSide(SideDish dish) {
        return this.sideDishRepository.insert(dish);
    }

    public Optional<SideDish> getDish(String id) {
        return this.sideDishRepository.findById(id);
    }

    public void deleteSide(String id) {
        this.sideDishRepository.deleteById(id);
    }
}
