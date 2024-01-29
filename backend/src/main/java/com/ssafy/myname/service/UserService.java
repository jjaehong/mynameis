package com.ssafy.myname.service;

import com.ssafy.myname.dto.response.auth.GetUserInfoResDto;
import org.springframework.http.ResponseEntity;

import java.security.Principal;
import java.util.List;

public interface UserService {
    GetUserInfoResDto getUserInfo(Principal principal);
    ResponseEntity<?> modifyTag(String userId, List<String> tagNameList);

}