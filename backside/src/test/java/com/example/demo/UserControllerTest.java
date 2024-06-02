package com.example.demo;
import static org.junit.Assert.assertEquals;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;

public class UserControllerTest {

    @Mock
    private UserRepository userRepository;

    @Test
    public void testUserServiceSingleton() {
        UserService userService1 = UserService.getInstance(userRepository);
        UserService userService2 = UserService.getInstance(userRepository);

        assertEquals(userService1, userService2);
    }
}
