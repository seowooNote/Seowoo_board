package com.seowoo.board.controller;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seowoo.board.common.response.CustomResponse;
import com.seowoo.board.dto.request.user.PatchUserNicknameRequestDto;
import com.seowoo.board.dto.request.user.PatchUserProfileRequestDto;

// controller : 유저 컨트롤러 //
@RestController
@RequestMapping("/api/v1/user")
public class UserController {

     // API : 유저 정보 불러오기 메서드 //
     @GetMapping("/{email}")
     public ResponseEntity<?> getUser(
          @PathVariable("email") String email
     ) {
          return CustomResponse.serviceUnavailable;
     }

     // API : 로그인 유저 정보 불러오기 메서드 //
     @GetMapping("")
     public ResponseEntity<?> getSignInUser() {
          return CustomResponse.serviceUnavailable;
     }

     // API : 유저 닉네임 수정 메서드
     @PatchMapping("/{email}/nickname")
     public ResponseEntity<?> patchUserNickname(
          @PathVariable("email") String email,
          @RequestBody @Valid PatchUserNicknameRequestDto requestBody
     ) {
          return CustomResponse.serviceUnavailable;
     }

     // API : 유저 프로필 이미지 수정 메서드 //
     @PatchMapping("/{email}/profile")
     public ResponseEntity<?> patchUserProfile(
          @PathVariable("email") String email,
          @RequestBody @Valid PatchUserProfileRequestDto requestBody
     ) {
          return CustomResponse.serviceUnavailable;
     }

}