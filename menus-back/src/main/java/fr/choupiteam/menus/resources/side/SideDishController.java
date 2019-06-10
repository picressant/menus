package fr.choupiteam.menus.resources.side;

import fr.choupiteam.menus.application.side.model.SideDish;
import fr.choupiteam.menus.application.side.service.SideDishService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@RestController
@RequestMapping("/sidedish")
public class SideDishController {

    @Autowired
    private SideDishService sideDishService;

    @RequestMapping(method = GET)
    public List<SideDish> getSideDishes() {
        return this.sideDishService.getAllSideDishes();
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
