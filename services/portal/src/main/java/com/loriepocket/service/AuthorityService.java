package com.loriepocket.service;

import com.loriepocket.model.Authority;

import java.util.List;

/**
 * Created by cristian.colorado on 9/19/2017.
 */
public interface AuthorityService  {
    public Authority findById(Long id);
    public Authority findByName(String name);
    public List<Authority> findAll();
}
