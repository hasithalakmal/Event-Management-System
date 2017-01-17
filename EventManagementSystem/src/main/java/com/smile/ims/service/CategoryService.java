package com.smile.ims.service;


import com.smile.ims.model.Category;
import java.util.List;

public interface CategoryService {

    List<Category> findAllCategory();

    void createCategory(Category category);

    void deleteCategory(int category_id);


}
