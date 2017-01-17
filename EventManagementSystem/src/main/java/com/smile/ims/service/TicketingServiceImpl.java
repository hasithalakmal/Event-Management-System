package com.smile.ims.service;

import com.smile.ims.dao.EventDao;
import com.smile.ims.dao.TicketingDao;
import com.smile.ims.model.Event;
import com.smile.ims.model.Ticketing;
import com.smile.ims.model.User;
import com.smile.ims.util.Date_Genarator;
import java.util.Date;
import java.util.List;
import org.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("ticketingService")
@Transactional
public class TicketingServiceImpl implements TicketingService {

    @Autowired
    private TicketingDao dao;
    
    @Autowired
     private EventDao eventDao;
    
    @Autowired
    Date_Genarator date_Genarator;

    @Override
    public List<Ticketing> findAllTicketing() {
        System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>>>");
        return dao.findAllTicketing();
    }

    @Override
    public List<Ticketing> getTicketingbyEventID(int eventId) {
        return dao.getTicketingbyEventID(eventId);
    }

    @Override
    public List<Ticketing> getTicketingbyUserID(int userId) {
        return dao.getTicketingbyUserID(userId);
    }

    @Override
    public String doTicketing(String ticketingJSON) {
        String msg ="Success";
        
        JSONObject ticket = new JSONObject(ticketingJSON);
        int eventId = ticket.getInt("eventId");
        int userId = ticket.getInt("userId");
        int noOfTickets = ticket.getInt("noOfTickets");
        double amountOfTicket = ticket.getDouble("amountOfTicket");
        double totalAmountOfTickets = ticket.getDouble("totalAmountOfTickets");
        Date currentDate = date_Genarator.getDate();

        Event event = new Event();
        event.setEventId(eventId);
        
        User user = new User();
        user.setUserId(userId);
        
        Ticketing ticketing = new Ticketing();
        ticketing.setEventId(event);
        ticketing.setUserId(user);
        ticketing.setAmountOfTicket(amountOfTicket);
        ticketing.setNoOfTickets(noOfTickets);
        ticketing.setTotalAmountOfTickets(totalAmountOfTickets);
        ticketing.setPurchasedOn(currentDate);
        
        Event eventDetails = eventDao.getEvenByID(eventId);
        Integer availableTicket = eventDetails.getAvailableTicket();
        if(availableTicket>= noOfTickets){
            int newAvaildbleTickets = availableTicket- noOfTickets;
            dao.createeTicketing(ticketing);
            eventDao.updateEvent(eventId, newAvaildbleTickets);
        }else{
            msg = "No Enough Tickets";
        }
        return msg;
    }

}
