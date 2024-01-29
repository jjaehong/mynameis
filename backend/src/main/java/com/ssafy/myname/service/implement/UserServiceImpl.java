package com.ssafy.myname.service.implement;

import com.ssafy.myname.db.entity.Tags;
import com.ssafy.myname.db.entity.User;
import com.ssafy.myname.db.repository.TagRepository;
import com.ssafy.myname.db.repository.UserRepository;
import com.ssafy.myname.dto.response.ResponseDto;
import com.ssafy.myname.dto.response.auth.GetUserInfoResDto;
import com.ssafy.myname.service.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

import java.security.Principal;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final Logger logger =  LoggerFactory.getLogger(this.getClass());
    private final UserRepository userRepository;
    private final TagRepository tagRepository;

    public GetUserInfoResDto getUserInfo(Principal principal) {
        logger.info("** getUserInfo ServiceImpl 실행 ");

        if (principal == null) {
            return null;
        }

        User user = userRepository.findByUserId(principal.getName());
        logger.info("user : {}", user);

        GetUserInfoResDto dto = new GetUserInfoResDto(user);
        logger.info("dto : {}", dto);

        List<Tags> tags = tagRepository.findAllByUser(user);
        logger.info("tags : {}", tags);
        dto.addTags(tags);


        return dto ;
    }

    @Override
    public ResponseEntity<?> modifyTag(String userId, List<String> tagNameList) {
        User user = userRepository.findByUserId(userId);
        logger.info("user : {} ",user);
        // 기존 태그들 전부 삭제.
        tagRepository.deleteAllByUser(user);
        logger.info(" 전부 삭제됨 ");
        for (String tagname : tagNameList) {
            tagRepository.save(new Tags(user, tagname));
        }
        return ResponseDto.ok();

    }
}