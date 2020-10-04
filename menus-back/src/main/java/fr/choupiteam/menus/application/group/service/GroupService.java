package fr.choupiteam.menus.application.group.service;

import fr.choupiteam.menus.application.group.model.Group;
import fr.choupiteam.menus.application.pager.model.Pager;
import fr.choupiteam.menus.application.security.model.ApplicationUser;
import fr.choupiteam.menus.application.week.service.WeekService;
import fr.choupiteam.menus.infrastructure.repository.ApplicationUserRepository;
import fr.choupiteam.menus.infrastructure.repository.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class GroupService {
    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private ApplicationUserRepository userRepository;

    @Autowired
    private WeekService weekService;

    public Page<Group> getGroupsByPager(Pager pager) {
        return this.groupRepository.findAllByPager(pager, Group.class);
    }

    public Group saveGroup(Group group) {
        return this.groupRepository.save(group);
    }

    public Group createGroup(Group group) {
        return this.groupRepository.insert(group);
    }

    public Optional<Group> getGroup(String id) {
        return this.groupRepository.findById(id);
    }

    public void deleteGroup(String id) {
        this.getGroup(id)
                .ifPresent(group -> {
                    this.weekService.deleteWeek(group);
                    this.groupRepository.deleteById(id);
                });
    }

    public List<ApplicationUser> getGroupUsers(String id) {
        List<ApplicationUser> users = new ArrayList<>();
        this.getGroup(id).ifPresent(group -> users.addAll(userRepository.findAllByGroup(group)));
        return users;
    }
}
