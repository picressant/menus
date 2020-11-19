package fr.choupiteam.menus.application.grocery.service;

import fr.choupiteam.menus.application.grocery.model.GroceryItem;
import fr.choupiteam.menus.application.security.model.ApplicationUser;
import fr.choupiteam.menus.application.week.service.WeekService;
import fr.choupiteam.menus.infrastructure.repository.GroceryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GroceryService {

    @Autowired
    private GroceryRepository groceryRepository;

    public List<GroceryItem> getAllGroceriesForUser(ApplicationUser user) {
        return this.groceryRepository.findAllByGroup(user.getGroup());
    }

    public List<GroceryItem> pushAllItems(ApplicationUser user, List<GroceryItem> items) {
        this.groceryRepository.deleteAllByGroup(user.getGroup());

        for (GroceryItem groceryItem : items) {
            groceryItem = this.addItem(user, groceryItem);
        }

        return items;
    }

    public GroceryItem updateItem(GroceryItem groceryItem) {
        return this.groceryRepository.save(groceryItem);
    }

    public GroceryItem addItem(ApplicationUser user, GroceryItem groceryItem) {
        groceryItem.setGroup(user.getGroup());
        return this.groceryRepository.save(groceryItem);
    }

    public void deleteItem(String id) {
        this.groceryRepository.findById(id).ifPresent(groceryItem -> this.groceryRepository.delete(groceryItem));
    }
}
