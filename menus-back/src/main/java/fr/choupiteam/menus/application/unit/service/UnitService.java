package fr.choupiteam.menus.application.unit.service;

import fr.choupiteam.menus.application.pager.model.Pager;
import fr.choupiteam.menus.application.unit.model.Unit;
import fr.choupiteam.menus.infrastructure.repository.UnitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UnitService {

    @Autowired
    private UnitRepository unitRepository;

    public Page<Unit> getUnitsByPager(Pager pager) {
        return this.unitRepository.findAllByPager(pager, Unit.class);
    }

    public Unit createUnit(Unit unit) {
        return this.unitRepository.insert(unit);
    }

    public Unit saveUnit(Unit unit) {
        return this.unitRepository.save(unit);
    }

    public void deleteUnit(String id) {
        this.unitRepository.deleteById(id);
    }
}
