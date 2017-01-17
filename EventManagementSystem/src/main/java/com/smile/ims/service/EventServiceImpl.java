package com.smile.ims.service;


import com.smile.ims.dao.EventDao;
import com.smile.ims.model.Event;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("eventService")
@Transactional
public class EventServiceImpl implements EventService {

    @Autowired
    private EventDao dao;

    @Override
    public List<Event> findAllEvent() {
        return  dao.findAllEvent();
    }

    @Override
    public void createEvent(Event event) {
        dao.createEvent(event);
    }

    @Override
    public void deleteEvent(int event_id) {
        dao.deleteEvent(event_id);
    }

    @Override
    public Event getEventByID(int event_id) {
       return dao.getEvenByID(event_id);
    }
    
   
}
