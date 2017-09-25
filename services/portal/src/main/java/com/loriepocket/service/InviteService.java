package com.loriepocket.service;

import com.loriepocket.model.Invite;

import java.util.List;

/**
 * Created by cristian.colorado on 9/25/2017.
 */
public interface InviteService {
    public List<Invite> findAll();
    public Invite saveOrUpdate(Invite invite);
    public void delete(Long id);
}
