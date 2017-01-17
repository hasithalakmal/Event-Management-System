package com.smile.ims.dao;


import com.smile.ims.model.User;
import java.util.List;

public interface UserDao {

    List<User> findAllUser();

    void createUser(User user);
    
    void deleteUser(int user_id);

    User isValidLoggin(String userName,String password);
    
    boolean isUsaerNameExsist(String userName);
}
