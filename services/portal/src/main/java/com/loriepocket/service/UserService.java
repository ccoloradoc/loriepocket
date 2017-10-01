package com.loriepocket.service;

import com.loriepocket.model.Meal;
import com.loriepocket.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Created by cristian.colorado
 */
public interface UserService {
    public Optional<User> findById(Long id);
    public Optional<User> findByUsername(String username);
    public Page<User> findAll(Pageable pageable);
    public User saveOrUpdate(User user);
    public void delete(User user);
}
