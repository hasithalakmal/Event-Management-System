package com.smile.ims.service;

import com.smile.ims.dao.UserDao;
import com.smile.ims.model.User;
import com.smile.ims.util.API_keyGenarator;
import com.smile.ims.util.PasswordHasher;
import java.util.List;
import org.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("userService")
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao dao;

    @Autowired
    private API_keyGenarator API_keyGenarator;

    @Autowired
    private PasswordHasher passwordHasher;

    @Override
    public List<User> findAllUser() {
        return dao.findAllUser();
    }

    @Override
    public String createUser(User user) {
        String responce = "success";
        boolean state = dao.isUsaerNameExsist(user.getUserName());
        if (state) {
            responce = "User Name is Alredy Exsist";
        } else {
            String realPw = user.getPassword();
            String hashedPW = passwordHasher.getHashcode(realPw);
            String apiKey = API_keyGenarator.nextAPIId();
            user.setPassword(hashedPW);
            user.setAPIkey(apiKey);
            user.setuserType("public_user");
            dao.createUser(user);
        }
        return responce;
    }

    @Override
    public void deleteUser(int user_id) {
        dao.deleteUser(user_id);
    }

    @Override
    public User userLoggin(String logginObject) {
        JSONObject loginObj = new JSONObject(logginObject);
        String userName = loginObj.getString("userName");
        String password = loginObj.getString("password");
        String hashedPW = passwordHasher.getHashcode(password);
        return dao.isValidLoggin(userName, hashedPW);

    }

}
