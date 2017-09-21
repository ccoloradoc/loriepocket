package com.loriepocket.repository;

import com.loriepocket.model.Authority;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by cristian.colorado on 9/19/2017.
 */
public interface AuthorityRepository extends CrudRepository<Authority, Long> {
    Authority findByName( String name );
}
