package com.smile.ims.dao;

import com.smile.ims.model.Event;
import java.util.List;
import org.hibernate.Criteria;
import org.hibernate.Query;

import org.springframework.stereotype.Repository;

@Repository("eventDao")
public class EventDaoImpl extends AbstractDao<Integer, Event> implements EventDao {

    @Override
    public List<Event> findAllEvent() {
        Criteria criteria = createEntityCriteria();
        return (List<Event>) criteria.list();
    }

    @Override
    public void createEvent(Event event) {
        persist(event);
    }

    @Override
    public void deleteEvent(int event_id) {
        Event event = new Event();
        event.setEventId(event_id);
        getSession().delete(event);
    }

    @Override
    public void updateEvent(int event_id, int current_tickets) {
        Event event = new Event();
        event.setEventId(event_id);
        Query query = getSession().createSQLQuery("update event_management.Event set available_ticket = :current_tickets where event_id = :event_id");
        query.setInteger("current_tickets", current_tickets);
        query.setEntity("event_id", event);
        query.executeUpdate();
    }

    @Override
    public Event getEvenByID(int id) {
        return getByKey(id);
    }

}
