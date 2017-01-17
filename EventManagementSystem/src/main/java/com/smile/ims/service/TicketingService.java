package com.smile.ims.service;

import com.smile.ims.model.Ticketing;
import java.util.List;

public interface TicketingService {

    List<Ticketing> findAllTicketing();

    List<Ticketing> getTicketingbyEventID(int eventId);

    List<Ticketing> getTicketingbyUserID(int userId);

    String doTicketing(String ticketingJSON);
}
