package com.loriepocket.repository;

import com.loriepocket.model.User;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * Created by cristian.colorado
 */
public interface UserRepository extends PagingAndSortingRepository<User, Long> {
    User findByUsername( String username );
}

