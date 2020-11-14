package fr.choupiteam.menus.resources.ingredient;

import fr.choupiteam.menus.application.ingredient.model.ShopSection;
import fr.choupiteam.menus.application.ingredient.service.ShopSectionService;
import fr.choupiteam.menus.application.pager.model.Pager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/shop-section")
public class ShopSectionController {

    @Autowired
    private ShopSectionService shopSectionService;


    @PostMapping
    public ShopSection addShopSection(@RequestBody ShopSection shopSection) {
        return this.shopSectionService.addShopSection(shopSection);
    }

    @PutMapping
    public ShopSection saveShopSection(@RequestBody ShopSection shopSection) {
        return this.shopSectionService.saveShopSection(shopSection);
    }

    @DeleteMapping(value = "/{id}")
    public HttpStatus deleteShopSection(@PathVariable("id") String id) {
        this.shopSectionService.deleteShopSection(id);
        return HttpStatus.OK;
    }

    @PostMapping(value = "/list")
    public Page<ShopSection> getShopSections(@RequestBody Pager pager) {
        return this.shopSectionService.getShopSectionsByPager(pager);
    }

    @GetMapping(value = "/list")
    public List<ShopSection> getShopSections() {
        return this.shopSectionService.getShopSections();
    }
}
