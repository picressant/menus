package fr.choupiteam.menus.infrastructure.repository.custom;

import fr.choupiteam.menus.application.pager.model.Pager;
import org.springframework.data.domain.Page;

public interface PageableRepository<T> {
    Page<T> findAllByPager(Pager pager, Class<T> targetClass);
}
