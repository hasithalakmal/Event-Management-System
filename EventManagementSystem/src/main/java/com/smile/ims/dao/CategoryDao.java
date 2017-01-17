package com.smile.ims.dao;


import com.smile.ims.model.Category;
import java.util.List;

public interface CategoryDao {

    List<Category> findAllCategory();

    void createCategory(Category category);
    
    void deleteCategory(int category_id);

}
