package com.loriepocket.service.impl;

import com.loriepocket.model.Authority;
import com.loriepocket.repository.AuthorityRepository;
import com.loriepocket.service.AuthorityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by cristian.colorado on 9/19/2017.
 */
@Service
public class AuthorityServiceImpl implements AuthorityService {
    @Autowired
    private AuthorityRepository authorityRepository;

    @Override
    public Authority findByName(String name) {
        return authorityRepository.findByName(name);
    }

    @Override
    public Authority findById(Long id) {
        return authorityRepository.findOne(id);
    }

    @Override
    public List<Authority> findAll() {
        List<Authority> result = new ArrayList<>();

        authorityRepository.findAll().forEach(result::add);

        return result;
    }
}
