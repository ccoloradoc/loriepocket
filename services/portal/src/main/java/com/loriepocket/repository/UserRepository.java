package com.loriepocket.repository;

import com.loriepocket.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by cristian.colorado
 */
public interface UserRepository extends CrudRepository<User, Long> {
    User findByUsername( String username );
}

