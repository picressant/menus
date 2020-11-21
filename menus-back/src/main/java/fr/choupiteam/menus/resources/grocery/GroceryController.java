package fr.choupiteam.menus.resources.grocery;

import fr.choupiteam.menus.application.grocery.model.GroceryItem;
import fr.choupiteam.menus.application.grocery.service.GroceryService;
import fr.choupiteam.menus.application.security.model.ApplicationUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/groceries")
public class GroceryController {

    @Autowired
    private GroceryService groceryService;

    @GetMapping()
    public List<GroceryItem> getGroceries(@AuthenticationPrincipal ApplicationUser user) {
        return this.groceryService.getAllGroceriesForUser(user);
    }

    @PostMapping("/all")
    public List<GroceryItem> pushAllGroceries(@AuthenticationPrincipal ApplicationUser user, @RequestBody List<GroceryItem> groceryItems) {
        return this.groceryService.pushAllItems(user, groceryItems);
    }

    @DeleteMapping("/{id}")
    public void deleteItem(@PathVariable String id) {
        this.groceryService.deleteItem(id);
    }

    @PutMapping("/{id}")
    public GroceryItem updateItem(@RequestBody GroceryItem groceryItem, @AuthenticationPrincipal ApplicationUser user) {
        groceryItem.setGroup(user.getGroup());
        return this.groceryService.updateItem(groceryItem);
    }

    @PostMapping
    public GroceryItem addItem(@AuthenticationPrincipal ApplicationUser user, @RequestBody GroceryItem groceryItem) {
        return this.groceryService.addItem(user, groceryItem);
    }
}
