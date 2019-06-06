package fr.choupiteam.menus.application.unit.service;

import fr.choupiteam.menus.application.unit.model.Unit;
import fr.choupiteam.menus.infrastructure.repository.UnitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UnitService {

    @Autowired
    private UnitRepository unitRepository;

    public List<Unit> getUnits() {
        return this.unitRepository.findAll();
    }

    public Unit saveUnit(Unit unit) {
        return this.unitRepository.save(unit);
    }

    public void deleteUnit(String id) {
        this.unitRepository.deleteById(id);
    }
}
