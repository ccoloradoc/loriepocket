package com.loriepocket.service.impl;

import com.loriepocket.model.Invite;
import com.loriepocket.repository.InviteRepository;
import com.loriepocket.service.InviteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by cristian.colorado on 9/25/2017.
 */
@Service
public class InviteServiceImpl implements InviteService {

    @Autowired
    private InviteRepository inviteRepository;

    @Override
    public List<Invite> findAll() {
        List<Invite> inviteList = new ArrayList<>();
        inviteRepository.findAll().forEach(inviteList::add);
        return inviteList;
    }

    @Override
    public Invite saveOrUpdate(Invite invite) {
        return inviteRepository.save(invite);
    }

    @Override
    public void delete(Long id) {
        this.inviteRepository.delete(id);
    }
}
