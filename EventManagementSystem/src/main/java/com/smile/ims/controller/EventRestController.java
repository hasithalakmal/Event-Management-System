/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.smile.ims.controller;

import com.smile.ims.model.Event;
import com.smile.ims.service.EventService;
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
public class EventRestController {

    @Autowired
    EventService eventService;

    @RequestMapping(value = "event", method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity<String> getAllSubjects() {
        List<Event> subjects = eventService.findAllEvent();
        JSONObject responce = new JSONObject();
        responce.accumulate("state", "success");
        responce.accumulate("error", false);
        responce.accumulate("msg", "success");
        responce.accumulate("result", subjects);
        return new ResponseEntity<>(responce.toString(), HttpStatus.OK);
    }
    
    @RequestMapping(value = "event/{event_id}", method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity<Event> getEvent(@PathVariable int event_id) {
        Event event = eventService.getEventByID(event_id);
        return new ResponseEntity<>(event, HttpStatus.OK);
    }

    @RequestMapping(value = "event", method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
    public ResponseEntity<String> createSubject(@RequestBody Event event) {
        eventService.createEvent(event);
        JSONObject responce = new JSONObject();
        responce.accumulate("state", "success");
        responce.accumulate("error", false);
        responce.accumulate("msg", "success");
        responce.accumulate("result", null);
        return new ResponseEntity<>(responce.toString(), HttpStatus.CREATED);
    }
    
    @RequestMapping(value = "event/{event_id}", method = RequestMethod.DELETE, produces = "application/json")
    public ResponseEntity<String> deleteEvent(@PathVariable int event_id) {
        eventService.deleteEvent(event_id);
        JSONObject responce = new JSONObject();
        responce.accumulate("state", "success");
        responce.accumulate("error", false);
        responce.accumulate("result", null);
        return new ResponseEntity<>(responce.toString(), HttpStatus.OK);
    }
}
