package com.smile.ims.service;


import com.smile.ims.dao.CategoryDao;
import com.smile.ims.model.Category;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("categoryService")
@Transactional
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryDao dao;

    @Override
    public List<Category> findAllCategory() {
        return  dao.findAllCategory();
    }

    @Override
    public void createCategory(Category category) {
        dao.createCategory(category);
    }

    @Override
    public void deleteCategory(int category_id) {
        dao.deleteCategory(category_id);
    }
    
   
}
