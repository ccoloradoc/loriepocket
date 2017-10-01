package com.loriepocket.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

/**
 * Created by cristian.colorado on 9/25/2017.
 */
@Entity
@Table(name="INVITE")
public class Invite extends Auditable<String> {
    @NotNull
    private String email;
    private String status;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
