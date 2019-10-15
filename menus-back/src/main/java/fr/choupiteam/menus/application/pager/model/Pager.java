package fr.choupiteam.menus.application.pager.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import fr.choupiteam.menus.infrastructure.rest.jackson.SortOrderArrayDeserializer;
import org.springframework.data.domain.Sort;

import java.util.ArrayList;
import java.util.List;

/**
 * Pager configuration for big data request
 */
public class Pager {

    /**
     * Current page number
     */
    private int page;

    /**
     * List of properties use to sort the request
     */
    @JsonDeserialize(using = SortOrderArrayDeserializer.class)
    private List<Sort.Order> orders;

    /**
     * List of property and value for filtering
     */
    private List<Filter> filters;

    /**
     * List of ids to exclude from the query
     */
    private List<String> excludeIds;

    /**
     * Search term
     */
    private String search;

    private int itemsPerPage;

    public Pager() {
        this.setOrders(new ArrayList<>());
        this.setFilters(new ArrayList<>());
        this.setExcludeIds(new ArrayList<>());
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public List<Sort.Order> getOrders() {
        return orders;
    }

    public void setOrders(List<Sort.Order> orders) {
        this.orders = orders;
    }

    public List<Filter> getFilters() {
        return filters;
    }

    public void setFilters(List<Filter> filters) {
        this.filters = filters;
    }

    public List<String> getExcludeIds() {
        return excludeIds;
    }

    public void setExcludeIds(List<String> excludeIds) {
        this.excludeIds = excludeIds;
    }

    public String getSearch() {
        return search;
    }

    public void setSearch(String search) {
        this.search = search;
    }

    public int getItemsPerPage() {
        return itemsPerPage;
    }

    public void setItemsPerPage(int itemsPerPage) {
        this.itemsPerPage = itemsPerPage;
    }
}
