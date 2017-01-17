package com.smile.ims.dao;


import com.smile.ims.model.Event;
import java.util.List;

public interface EventDao {

    List<Event> findAllEvent();
    
    Event getEvenByID(int id);

    void createEvent(Event event);
    
    void deleteEvent(int event_id);
    
    void updateEvent(int event_id, int current_tickets);

}
