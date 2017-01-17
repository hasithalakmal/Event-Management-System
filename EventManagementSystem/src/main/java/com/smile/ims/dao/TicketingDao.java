package com.smile.ims.dao;

import com.smile.ims.model.Ticketing;
import java.util.List;

public interface TicketingDao {

    List<Ticketing> findAllTicketing();

    List<Ticketing> getTicketingbyEventID(int eventId);

    List<Ticketing> getTicketingbyUserID(int userId);
    
    void createeTicketing(Ticketing ticketing);
}
