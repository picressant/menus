package fr.choupiteam.menus.resources.side;

import fr.choupiteam.menus.application.pager.model.Pager;
import fr.choupiteam.menus.application.side.model.SideDish;
import fr.choupiteam.menus.application.side.service.SideDishService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import static org.springframework.web.bind.annotation.RequestMethod.DELETE;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
@RequestMapping("/sidedish")
public class SideDishController {

    @Autowired
    private SideDishService sideDishService;

    @PostMapping(value = "/list")
    public Page<SideDish> getSideDishes(@RequestBody Pager pager) {
        return this.sideDishService.getSideDishesByPager(pager);
    }

    @RequestMapping(method = POST)
    public SideDish saveDish(@RequestBody SideDish dish) {
        dish = this.sideDishService.saveDish(dish);
        return this.sideDishService.getDish(dish.getId());
    }

    @RequestMapping(value = "/{id}", method = DELETE)
    public HttpStatus deleteSide(@PathVariable("id") String id) {
        this.sideDishService.deleteSide(id);
        return HttpStatus.OK;
    }

}
