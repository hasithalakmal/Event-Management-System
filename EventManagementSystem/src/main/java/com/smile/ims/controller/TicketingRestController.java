/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.smile.ims.controller;

import com.smile.ims.model.Ticketing;
import com.smile.ims.service.TicketingService;
import java.util.List;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Hasitha Lakmal
 */
@RestController
@Component
public class TicketingRestController {

    @Autowired
    TicketingService ticketingService;

    @RequestMapping(value = "ticketing", method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity<String> getAllSubjects() {
        List<Ticketing> subjects = ticketingService.findAllTicketing();
        JSONObject responce = new JSONObject();
        responce.accumulate("state", "success");
        responce.accumulate("error", false);
        responce.accumulate("msg", "success");
        responce.accumulate("result", subjects);
        return new ResponseEntity<>(responce.toString(), HttpStatus.OK);
    }

    @RequestMapping(value = "ticketing-by-event/{eventId}", method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity<List<Ticketing>> getTicketingByEvent(@PathVariable int eventId) {
        List<Ticketing> ticketing = ticketingService.getTicketingbyEventID(eventId);
        JSONObject responce = new JSONObject();
        responce.accumulate("state", "success");
        responce.accumulate("error", false);
        responce.accumulate("result", null);
        return new ResponseEntity<>(ticketing, HttpStatus.OK);
    }
    
    @RequestMapping(value = "ticketing-by-user/{userId}", method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity<List<Ticketing>> getTicketingByUser(@PathVariable int userId) {
        List<Ticketing> ticketing = ticketingService.getTicketingbyUserID(userId);
        JSONObject responce = new JSONObject();
        responce.accumulate("state", "success");
        responce.accumulate("error", false);
        responce.accumulate("result", null);
        return new ResponseEntity<>(ticketing, HttpStatus.OK);
    }

    @RequestMapping(value = "ticketing", method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
    public ResponseEntity<String> createSubject(@RequestBody String json) {
        ticketingService.doTicketing(json);
        JSONObject responce = new JSONObject();
        responce.accumulate("state", "success");
        responce.accumulate("error", false);
        responce.accumulate("msg", "success");
        responce.accumulate("result", null);
        return new ResponseEntity<>(responce.toString(), HttpStatus.CREATED);
    }
}
