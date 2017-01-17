package com.smile.ims.service;


import com.smile.ims.model.Event;
import java.util.List;

public interface EventService {

    List<Event> findAllEvent();

    void createEvent(Event event);

    void deleteEvent(int event_id);
    
    Event getEventByID(int event_id);


}
