package com.loriepocket.rest;

import com.loriepocket.model.Invite;
import com.loriepocket.service.InviteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

/**
 * Created by cristian.colorado on 9/25/2017.
 */
@RestController
@RequestMapping( value = "/api", produces = MediaType.APPLICATION_JSON_VALUE )
public class InviteController {

    @Autowired
    public InviteService inviteService;

    @RequestMapping( method = RequestMethod.GET, value= "/invite")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Invite> loadAll() {
        return this.inviteService.findAll();
    }


    @RequestMapping(method = RequestMethod.POST, value = "/invite")
    @PreAuthorize("hasRole('ADMIN')")
    public Invite updateUser(@RequestBody Invite payload) {
        payload.setStatus("INVITE SENT");
        payload.setCreatedDate(new Date());
        return this.inviteService.saveOrUpdate(payload);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/invite/{inviteId}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteUser(@PathVariable Long inviteId) {
        this.inviteService.delete(inviteId);
    }


}
