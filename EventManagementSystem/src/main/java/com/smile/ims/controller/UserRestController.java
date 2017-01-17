/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.smile.ims.controller;

import com.smile.ims.model.User;
import com.smile.ims.service.UserService;
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
public class UserRestController {

    @Autowired
    UserService userService;

    @RequestMapping(value = "user", method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity<String> getAllUsers() {
        List<User> subjects = userService.findAllUser();
        JSONObject responce = new JSONObject();
        responce.accumulate("state", "success");
        responce.accumulate("error", false);
        responce.accumulate("msg", "success");
        responce.accumulate("result", subjects);
        return new ResponseEntity<>(responce.toString(), HttpStatus.OK);
    }

    @RequestMapping(value = "user", method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
    public ResponseEntity<String> createUser(@RequestBody User user) {
        String result = userService.createUser(user);
        JSONObject responce = new JSONObject();
        responce.accumulate("state", "success");
        responce.accumulate("error", false);
        responce.accumulate("msg", "success");
        responce.accumulate("result", result);
        return new ResponseEntity<>(responce.toString(), HttpStatus.CREATED);
    }
    
    @RequestMapping(value = "user/{user_id}", method = RequestMethod.DELETE, produces = "application/json")
    public ResponseEntity<String> deleteUser(@PathVariable int user_id) {
        userService.deleteUser(user_id);
        JSONObject responce = new JSONObject();
        responce.accumulate("state", "success");
        responce.accumulate("error", false);
        responce.accumulate("result", null);
        return new ResponseEntity<>(responce.toString(), HttpStatus.OK);
    }
    
    @RequestMapping(value = "login", method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
    public ResponseEntity<User> loginUser(@RequestBody String user) {
        User userState = userService.userLoggin(user);
        JSONObject responce = new JSONObject();
        responce.accumulate("state", "success");
        responce.accumulate("error", false);
        responce.accumulate("msg", "success");
        responce.accumulate("result", userState);
        if(userState == null){
            User u = new User();
            userState = u;
        }
        return new ResponseEntity<>(userState, HttpStatus.OK);
    }
    
}
