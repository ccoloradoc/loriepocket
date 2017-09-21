package com.loriepocket.service;

import com.loriepocket.model.User;

import java.util.List;

/**
 * Created by cristian.colorado
 */
public interface UserService {
    public User findById(Long id);
    public User findByUsername(String username);
    public List<User> findAll ();
    public User saveOrUpdate(User user);
}
