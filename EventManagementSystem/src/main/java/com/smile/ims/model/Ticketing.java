/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.smile.ims.model;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Hasitha Lakmal
 */
@Entity
@Table(catalog = "event_managenment", schema = "event_management")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Ticketing.findAll", query = "SELECT t FROM Ticketing t"),
    @NamedQuery(name = "Ticketing.findByTicketingId", query = "SELECT t FROM Ticketing t WHERE t.ticketingId = :ticketingId"),
    @NamedQuery(name = "Ticketing.findByNoOfTickets", query = "SELECT t FROM Ticketing t WHERE t.noOfTickets = :noOfTickets"),
    @NamedQuery(name = "Ticketing.findByAmountOfTicket", query = "SELECT t FROM Ticketing t WHERE t.amountOfTicket = :amountOfTicket"),
    @NamedQuery(name = "Ticketing.findByTotalAmountOfTickets", query = "SELECT t FROM Ticketing t WHERE t.totalAmountOfTickets = :totalAmountOfTickets"),
    @NamedQuery(name = "Ticketing.findByPurchasedOn", query = "SELECT t FROM Ticketing t WHERE t.purchasedOn = :purchasedOn")})
public class Ticketing implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "ticketing_id", nullable = false)
    private Integer ticketingId;
    @Column(name = "no_of_tickets")
    private Integer noOfTickets;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "amount_of_ticket", precision = 17, scale = 17)
    private Double amountOfTicket;
    @Column(name = "total_amount_of_tickets", precision = 17, scale = 17)
    private Double totalAmountOfTickets;
    @Column(name = "purchased_on")
    @Temporal(TemporalType.TIMESTAMP)
    private Date purchasedOn;
    @JoinColumn(name = "event_id", referencedColumnName = "event_id")
    @ManyToOne
    private Event eventId;
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    @ManyToOne
    private User userId;

    public Ticketing() {
    }

    public Ticketing(Integer ticketingId) {
        this.ticketingId = ticketingId;
    }

    public Integer getTicketingId() {
        return ticketingId;
    }

    public void setTicketingId(Integer ticketingId) {
        this.ticketingId = ticketingId;
    }

    public Integer getNoOfTickets() {
        return noOfTickets;
    }

    public void setNoOfTickets(Integer noOfTickets) {
        this.noOfTickets = noOfTickets;
    }

    public Double getAmountOfTicket() {
        return amountOfTicket;
    }

    public void setAmountOfTicket(Double amountOfTicket) {
        this.amountOfTicket = amountOfTicket;
    }

    public Double getTotalAmountOfTickets() {
        return totalAmountOfTickets;
    }

    public void setTotalAmountOfTickets(Double totalAmountOfTickets) {
        this.totalAmountOfTickets = totalAmountOfTickets;
    }

    public Date getPurchasedOn() {
        return purchasedOn;
    }

    public void setPurchasedOn(Date purchasedOn) {
        this.purchasedOn = purchasedOn;
    }

    public Event getEventId() {
        return eventId;
    }

    public void setEventId(Event eventId) {
        this.eventId = eventId;
    }

    public User getUserId() {
        return userId;
    }

    public void setUserId(User userId) {
        this.userId = userId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (ticketingId != null ? ticketingId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Ticketing)) {
            return false;
        }
        Ticketing other = (Ticketing) object;
        if ((this.ticketingId == null && other.ticketingId != null) || (this.ticketingId != null && !this.ticketingId.equals(other.ticketingId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.smile.ims.model.Ticketing[ ticketingId=" + ticketingId + " ]";
    }
    
}
