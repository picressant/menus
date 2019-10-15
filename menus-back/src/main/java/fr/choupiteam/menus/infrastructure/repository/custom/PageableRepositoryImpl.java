package fr.choupiteam.menus.infrastructure.repository.custom;

import fr.choupiteam.menus.application.pager.model.Pager;
import fr.choupiteam.menus.application.pager.service.PagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;

public class PageableRepositoryImpl<T> implements PageableRepository<T> {

    @Autowired
    private PagerService pagerService;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public Page<T> findAllByPager(Pager pager, Class<T> targetClass) {
        Query query = this.pagerService.buildQueryFromPager(pager, targetClass);
        List<T> content = this.mongoTemplate.find(query, targetClass);
        long total = this.mongoTemplate.count(query, targetClass);

        return new PageImpl<>(content, this.pagerService.buildPageRequest(pager), total);
    }
}
