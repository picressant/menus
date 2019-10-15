package fr.choupiteam.menus.application.pager.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.introspect.AnnotatedClass;
import com.fasterxml.jackson.databind.type.TypeFactory;
import fr.choupiteam.menus.application.pager.model.Filter;
import fr.choupiteam.menus.application.pager.model.Pager;
import fr.choupiteam.menus.infrastructure.annotation.Searchable;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Collation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PagerService {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private ObjectMapper jacksonObjectMapper;

    public Query addPagerToQuery(Query query, Pager pager) {
        return query
                .limit(pager.getItemsPerPage())
                .skip(pager.getPage() * pager.getItemsPerPage())
                .with(Sort.by(pager.getOrders()));
    }

    public void addFilterCriteria(List<Filter> filters, Criteria criteria) {
        filters.forEach(filter -> criteria.and(filter.getProperty()).is(filter.getValue()));
    }

    /**
     * Get pageable data from a generic type
     *
     * @param pager       Current pager
     * @param targetClass Class to be generated
     * @param <T>         Type of the target class
     * @return Page data
     */
    public <T> Page<T> getPageableContent(Pager pager, Class<T> targetClass) {
        Query query = this.buildQueryFromPager(pager, targetClass);
        List<T> content = this.mongoTemplate.find(query, targetClass);
        long total = this.mongoTemplate.count(query, targetClass);

        return new PageImpl<>(content, this.buildPageRequest(pager), total);
    }

    private void addExcludeIdsCriteria(Pager pager, Criteria criteria) {
        if (pager.getExcludeIds().size() > 0) {
            criteria.and("_id").not().in(pager.getExcludeIds().stream().map(ObjectId::new).collect(Collectors.toList()));
        }
    }

    private void addSearchCriteria(Pager pager, Criteria criteria, Class<?> targetClass) {
        if (pager.getSearch() != null && !pager.getSearch().equals("")) {
            List<Criteria> regex = new ArrayList<>();

            //Search all declared subtypes for searching. Use for polymorphism
            this.jacksonObjectMapper
                    .getSubtypeResolver()
                    .collectAndResolveSubtypesByClass(
                            this.jacksonObjectMapper.getDeserializationConfig(),
                            AnnotatedClass.construct(
                                    TypeFactory.defaultInstance().uncheckedSimpleType(targetClass),
                                    this.jacksonObjectMapper.getSerializationConfig())).forEach(namedType -> {
                for (Field field : namedType.getType().getDeclaredFields()) {
                    if (field.isAnnotationPresent(Searchable.class)) {
                        regex.add(new Criteria(field.getName()).regex(pager.getSearch(), "i"));
                    }
                }
            });

            if (regex.size() > 0) {
                criteria.orOperator(regex.toArray(new Criteria[regex.size()]));
            }
        }
    }

    public Query buildQueryFromPager(Pager pager, Class<?> targetClass) {
        Query query = new Query();
        query.collation(Collation.of("fr").strength(Collation.ComparisonLevel.secondary()));
        Criteria criteria = new Criteria();

        this.addFilterCriteria(pager.getFilters(), criteria);
        this.addExcludeIdsCriteria(pager, criteria);
        this.addSearchCriteria(pager, criteria, targetClass);

        query.addCriteria(criteria);

        return this.addPagerToQuery(query, pager);
    }

    public PageRequest buildPageRequest(Pager pager) {
        return PageRequest.of(pager.getPage(), pager.getItemsPerPage(), Sort.by(pager.getOrders()));
    }
}
