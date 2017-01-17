package com.smile.ims.dao;


import com.smile.ims.model.Category;
import java.util.List;
import org.hibernate.Criteria;

import org.springframework.stereotype.Repository;

@Repository("categoryDao")
public class CategoryDaoImpl extends AbstractDao<Integer, Category> implements CategoryDao {

    @Override
    public List<Category> findAllCategory() {
        Criteria criteria = createEntityCriteria();
        return (List<Category>) criteria.list();
    }

    @Override
    public void createCategory(Category category) {
        persist(category);
    }

    @Override
    public void deleteCategory(int category_id) {
        Category category = new Category();
        category.setCategoryId(category_id);
        getSession().delete(category);
    }
}
