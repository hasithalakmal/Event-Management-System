package com.smile.ims.dao;


import com.smile.ims.model.Event;
import com.smile.ims.model.Ticketing;
import com.smile.ims.model.User;
import java.util.List;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;

import org.springframework.stereotype.Repository;

@Repository("ticketingDao")
public class TicketingDaoImpl extends AbstractDao<Integer, Ticketing> implements TicketingDao {

    @Override
    public List<Ticketing> findAllTicketing() {
        System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        Criteria criteria = createEntityCriteria();
        System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        return (List<Ticketing>) criteria.list();
    }
    
     @Override
    public List<Ticketing> getTicketingbyEventID(int eventId) {
        Event evn = new Event();
        evn.setEventId(eventId);
        Criteria criteria = createEntityCriteria();
        criteria.add(Restrictions.eq("eventId", evn));
        return (List<Ticketing>) criteria.list();
    }

    @Override
    public List<Ticketing> getTicketingbyUserID(int userId) {
        User user = new User();
        user.setUserId(userId);
        Criteria criteria = createEntityCriteria();
        criteria.add(Restrictions.eq("userId", user));
        return (List<Ticketing>) criteria.list();
    }

    @Override
    public void createeTicketing(Ticketing ticketing) {
        persist(ticketing);
    }

}
