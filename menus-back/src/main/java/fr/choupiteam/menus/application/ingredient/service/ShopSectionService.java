package fr.choupiteam.menus.application.ingredient.service;

import fr.choupiteam.menus.application.ingredient.model.ShopSection;
import fr.choupiteam.menus.application.pager.model.Pager;
import fr.choupiteam.menus.infrastructure.repository.ShopSectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShopSectionService {

    @Autowired
    private ShopSectionRepository shopSectionRepository;

    public Page<ShopSection> getShopSectionsByPager(Pager pager) {
        return this.shopSectionRepository.findAllByPager(pager, ShopSection.class);
    }

    public ShopSection saveShopSection(ShopSection shopSection) {
        return this.shopSectionRepository.save(shopSection);
    }

    public ShopSection addShopSection(ShopSection ShopSection) {
        return this.shopSectionRepository.insert(ShopSection);
    }

    public ShopSection getShopSection(String id) {
        return this.shopSectionRepository.findById(id).orElse(null);
    }

    public List<ShopSection> getShopSections() {
        return this.shopSectionRepository.findAll(Sort.by("name"));
    }

    public void deleteShopSection(String id) {
        this.shopSectionRepository.deleteById(id);
    }
}
