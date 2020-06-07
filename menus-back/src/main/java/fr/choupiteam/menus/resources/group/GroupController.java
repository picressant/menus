package fr.choupiteam.menus.resources.group;

import fr.choupiteam.menus.application.group.model.Group;
import fr.choupiteam.menus.application.group.service.GroupService;
import fr.choupiteam.menus.application.pager.model.Pager;
import fr.choupiteam.menus.application.security.model.ApplicationUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/group")
public class GroupController {

    @Autowired
    private GroupService groupService;

    @GetMapping(value = "/{id}")
    public Group getGroup(@PathVariable("id") String id) {
        return this.groupService.getGroup(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Groupe inconnu"));
    }

    @PostMapping
    public Group addGroup(@RequestBody Group group) {
        group = this.groupService.createGroup(group);

        return (group != null) ? this.getGroup(group.getId()) : null;
    }

    @PutMapping
    public Group saveGroup(@RequestBody Group group) {
        return this.groupService.saveGroup(group);
    }

    @PostMapping(value = "/list")
    public Page<Group> getGroups(@RequestBody Pager pager) {
        return this.groupService.getGroupsByPager(pager);
    }

    @GetMapping(value = "/{id}/users")
    public List<ApplicationUser> getGroupUsers(@PathVariable String id) {
        return this.groupService.getGroupUsers(id);
    }
}
