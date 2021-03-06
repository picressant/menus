package fr.choupiteam.menus.application.security.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import fr.choupiteam.menus.application.group.model.Group;
import fr.choupiteam.menus.application.week.model.WeekDayEnum;
import fr.choupiteam.menus.infrastructure.annotation.Searchable;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;


@Document(collection = "user")
public class ApplicationUser implements UserDetails {

    @Id
    private String id;

    @Searchable
    private String username;

    private String password;

    @Searchable
    private String firstname;

    @Searchable
    private String lastname;

    private Role role;

    private List<Privilege> privileges;

    private String googleId;

    private List<WeekDayEnum> daysToShow;

    @DBRef
    private Group group;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @JsonIgnore
    public String getPassword() {
        return password;
    }

    @JsonProperty
    public void setPassword(String password) {
        this.password = password;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public void patch(ApplicationUser user) {
        this.setFirstname(user.getFirstname());
        this.setLastname(user.getLastname());
        this.setUsername(user.getUsername());
        this.setGoogleId(user.getGoogleId());
        this.setGroup(user.getGroup());
        this.setDaysToShow(user.getDaysToShow());
    }

    public ApplicationUser() {
        this.daysToShow = new ArrayList<>();
    }

    @JsonIgnore
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority(role.toString()));
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isEnabled() {
        return true;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getGoogleId() {
        return googleId;
    }

    public void setGoogleId(String googleId) {
        this.googleId = googleId;
    }

    public Group getGroup() {
        return group;
    }

    public void setGroup(Group group) {
        this.group = group;
    }

    public List<Privilege> getPrivileges() {
        return privileges;
    }

    public void setPrivileges(List<Privilege> privileges) {
        this.privileges = privileges;
    }

    public List<WeekDayEnum> getDaysToShow() {
        return daysToShow;
    }

    public void setDaysToShow(List<WeekDayEnum> daysToShow) {
        this.daysToShow = daysToShow;
    }
}
