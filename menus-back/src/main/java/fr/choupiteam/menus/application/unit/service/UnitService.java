package fr.choupiteam.menus.application.unit.service;

import fr.choupiteam.menus.application.pager.model.Pager;
import fr.choupiteam.menus.application.unit.model.ConvertTo;
import fr.choupiteam.menus.application.unit.model.Unit;
import fr.choupiteam.menus.infrastructure.repository.ConvertToRepository;
import fr.choupiteam.menus.infrastructure.repository.UnitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class UnitService {

    @Autowired
    private UnitRepository unitRepository;

    @Autowired
    private ConvertToRepository convertToRepository;

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

    public Unit findUnitByName(String name) {
        return this.unitRepository.findByName(name);
    }

    public void deleteAll() {
        this.unitRepository.deleteAll();
    }

    public ConvertTo createConversion(ConvertTo convertTo) {
        if (this.convertToRepository.findByUnitFromAndUnitTo(convertTo.getUnitFrom(), convertTo.getUnitTo()).isPresent() ||
                this.convertToRepository.findByUnitFromAndUnitTo(convertTo.getUnitTo(), convertTo.getUnitFrom()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Une conversion existe déjà pour ces unités");
        }
        else {
            return this.convertToRepository.insert(convertTo);
        }
    }

    public ConvertTo saveConversion(ConvertTo convertTo) {
        if (this.convertToRepository.findByUnitFromAndUnitToAndIdNot(convertTo.getUnitFrom(), convertTo.getUnitTo(), convertTo.getId()).isPresent() ||
                this.convertToRepository.findByUnitFromAndUnitToAndIdNot(convertTo.getUnitTo(), convertTo.getUnitFrom(), convertTo.getId()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Une conversion existe déjà pour ces unités");
        }
        else {
            return this.convertToRepository.save(convertTo);
        }
    }

    public void deleteConversion(String id) {
        this.convertToRepository.findById(id).ifPresent(convertTo -> this.convertToRepository.delete(convertTo));
    }

    public List<ConvertTo> getAllConversions() {
        return this.convertToRepository.findAll();
    }
}
