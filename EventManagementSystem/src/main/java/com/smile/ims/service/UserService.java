package com.smile.ims.service;


import com.smile.ims.model.User;
import java.util.List;

public interface UserService {

    List<User> findAllUser();

    String createUser(User user);

    void deleteUser(int user_id);

    User userLoggin(String logginObject);
}
