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
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Hasitha Lakmal
 */
@Entity
@Table(catalog = "event_managenment", schema = "event_management")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Event.findAll", query = "SELECT e FROM Event e"),
    @NamedQuery(name = "Event.findByEventId", query = "SELECT e FROM Event e WHERE e.eventId = :eventId"),
    @NamedQuery(name = "Event.findByEventDate", query = "SELECT e FROM Event e WHERE e.eventDate = :eventDate"),
    @NamedQuery(name = "Event.findByEventTime", query = "SELECT e FROM Event e WHERE e.eventTime = :eventTime"),
    @NamedQuery(name = "Event.findByTicketPrice", query = "SELECT e FROM Event e WHERE e.ticketPrice = :ticketPrice"),
    @NamedQuery(name = "Event.findByReleaseTicket", query = "SELECT e FROM Event e WHERE e.releaseTicket = :releaseTicket"),
    @NamedQuery(name = "Event.findByAvailableTicket", query = "SELECT e FROM Event e WHERE e.availableTicket = :availableTicket"),
    @NamedQuery(name = "Event.findByPublishedDate", query = "SELECT e FROM Event e WHERE e.publishedDate = :publishedDate"),
    @NamedQuery(name = "Event.findByEventTopic", query = "SELECT e FROM Event e WHERE e.eventTopic = :eventTopic"),
    @NamedQuery(name = "Event.findByEventVenue", query = "SELECT e FROM Event e WHERE e.eventVenue = :eventVenue"),
    @NamedQuery(name = "Event.findByEventDescription", query = "SELECT e FROM Event e WHERE e.eventDescription = :eventDescription")})
public class Event implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "event_id", nullable = false)
    private Integer eventId;
    @Column(name = "event_date")
    @Temporal(TemporalType.DATE)
    private Date eventDate;
    @Column(name = "event_time")
    @Temporal(TemporalType.TIME)
    private Date eventTime;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "ticket_price", precision = 17, scale = 17)
    private Double ticketPrice;
    @Column(name = "release_ticket")
    private Integer releaseTicket;
    @Column(name = "available_ticket")
    private Integer availableTicket;
    @Column(name = "published_date")
    @Temporal(TemporalType.DATE)
    private Date publishedDate;
    @Size(max = 2147483647)
    @Column(name = "event_topic", length = 2147483647)
    private String eventTopic;
    @Size(max = 2147483647)
    @Column(name = "event_venue", length = 2147483647)
    private String eventVenue;
    @Size(max = 2147483647)
    @Column(name = "event_description", length = 2147483647)
    private String eventDescription;
//    @OneToMany(mappedBy = "eventId")
//    private Collection<Ticketing> ticketingCollection;
    @JoinColumn(name = "category_id", referencedColumnName = "category_id")
    @ManyToOne
    private Category categoryId;

    public Event() {
    }

    public Event(Integer eventId) {
        this.eventId = eventId;
    }

    public Integer getEventId() {
        return eventId;
    }

    public void setEventId(Integer eventId) {
        this.eventId = eventId;
    }

    public Date getEventDate() {
        return eventDate;
    }

    public void setEventDate(Date eventDate) {
        this.eventDate = eventDate;
    }

    public Date getEventTime() {
        return eventTime;
    }

    public void setEventTime(Date eventTime) {
        this.eventTime = eventTime;
    }

    public Double getTicketPrice() {
        return ticketPrice;
    }

    public void setTicketPrice(Double ticketPrice) {
        this.ticketPrice = ticketPrice;
    }

    public Integer getReleaseTicket() {
        return releaseTicket;
    }

    public void setReleaseTicket(Integer releaseTicket) {
        this.releaseTicket = releaseTicket;
    }

    public Integer getAvailableTicket() {
        return availableTicket;
    }

    public void setAvailableTicket(Integer availableTicket) {
        this.availableTicket = availableTicket;
    }

    public Date getPublishedDate() {
        return publishedDate;
    }

    public void setPublishedDate(Date publishedDate) {
        this.publishedDate = publishedDate;
    }

    public String getEventTopic() {
        return eventTopic;
    }

    public void setEventTopic(String eventTopic) {
        this.eventTopic = eventTopic;
    }

    public String getEventVenue() {
        return eventVenue;
    }

    public void setEventVenue(String eventVenue) {
        this.eventVenue = eventVenue;
    }

    public String getEventDescription() {
        return eventDescription;
    }

    public void setEventDescription(String eventDescription) {
        this.eventDescription = eventDescription;
    }

//    @XmlTransient
//    @JsonIgnore
//    public Collection<Ticketing> getTicketingCollection() {
//        return ticketingCollection;
//    }
//
//    public void setTicketingCollection(Collection<Ticketing> ticketingCollection) {
//        this.ticketingCollection = ticketingCollection;
//    }

    public Category getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Category categoryId) {
        this.categoryId = categoryId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (eventId != null ? eventId.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Event)) {
            return false;
        }
        Event other = (Event) object;
        if ((this.eventId == null && other.eventId != null) || (this.eventId != null && !this.eventId.equals(other.eventId))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.smile.ims.model.Event[ eventId=" + eventId + " ]";
    }
    
}
