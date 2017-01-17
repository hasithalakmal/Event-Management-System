/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.smile.ims.controller;

import com.smile.ims.model.Category;
import com.smile.ims.service.CategoryService;
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
public class CategoryRestController {

    @Autowired
    CategoryService categoryService;

    @RequestMapping(value = "category", method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity<String> getAllSubjects() {
        List<Category> subjects = categoryService.findAllCategory();
        JSONObject responce = new JSONObject();
        responce.accumulate("state", "success");
        responce.accumulate("error", false);
        responce.accumulate("msg", "success");
        responce.accumulate("result", subjects);
        return new ResponseEntity<>(responce.toString(), HttpStatus.OK);
    }

    @RequestMapping(value = "category", method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
    public ResponseEntity<String> createSubject(@RequestBody Category category) {
        categoryService.createCategory(category);
        JSONObject responce = new JSONObject();
        responce.accumulate("state", "success");
        responce.accumulate("error", false);
        responce.accumulate("msg", "success");
        responce.accumulate("result", null);
        return new ResponseEntity<>(responce.toString(), HttpStatus.CREATED);
    }
    
    @RequestMapping(value = "category/{category_id}", method = RequestMethod.DELETE, produces = "application/json")
    public ResponseEntity<String> deleteCategory(@PathVariable int category_id) {
        categoryService.deleteCategory(category_id);
        JSONObject responce = new JSONObject();
        responce.accumulate("state", "success");
        responce.accumulate("error", false);
        responce.accumulate("result", null);
        return new ResponseEntity<>(responce.toString(), HttpStatus.OK);
    }
}
