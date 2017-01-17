package com.smile.ims.dao;

import com.smile.ims.model.Ticketing;
import com.smile.ims.model.User;
import java.util.List;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;

import org.springframework.stereotype.Repository;

@Repository("userDao")
public class UserDaoImpl extends AbstractDao<Integer, User> implements UserDao {

    @Override
    public List<User> findAllUser() {
        Criteria criteria = createEntityCriteria();
        return (List<User>) criteria.list();
    }

    @Override
    public void createUser(User user) {
        persist(user);
    }

    @Override
    public void deleteUser(int user_id) {
        User user = new User();
        user.setUserId(user_id);
        getSession().delete(user);
    }

    @Override
    public User isValidLoggin(String userName,String password) {
        Criteria criteria = createEntityCriteria();
        criteria.add(Restrictions.and(Restrictions.eq("userName", userName),Restrictions.eq("password", password)));
        return (User) criteria.uniqueResult();

    }

    @Override
    public boolean isUsaerNameExsist(String userName) {
        Criteria criteria = createEntityCriteria();
        criteria.add(Restrictions.eq("userName", userName));
        
        List<User> res = (List<User>) criteria.list();
        if(res.size()>0){
            return true;
        }else{
            return false;
        }
    }
}
