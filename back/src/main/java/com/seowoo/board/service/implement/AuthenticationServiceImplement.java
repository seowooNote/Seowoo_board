package com.seowoo.board.service.implement;

import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.seowoo.board.dto.request.authentication.SignInRequestDto;
import com.seowoo.board.dto.request.authentication.SignUpRequestDto;
import com.seowoo.board.dto.response.ResponseDto;
import com.seowoo.board.dto.response.authentication.SignInResponseDto;
import com.seowoo.board.dto.response.authentication.SignUpResponseDto;
import com.seowoo.board.entity.UserEntity;
import com.seowoo.board.repository.UserRepository;
import com.seowoo.board.service.AuthenticationService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImplement implements AuthenticationService {
     private final UserRepository userRepository;

     @Override
     // method : 로그인 메서드 //
     public ResponseEntity<? super SignInResponseDto> signIn(SignInRequestDto dto) {
          String token = null;
          String email = dto.getEmail();
          String password = dto.getPassword();

          try {
               // description : 이메일로 entity 조회 //
               UserEntity userEntity = userRepository.findByEmail(email);

               // description : 존재하지 않는 email 확인 //
               if(userEntity == null) return SignInResponseDto.signInDataMismatch();
          
               // description : 비밀번호 일치여부 확인 //               
               boolean equalPassword = userEntity.getPassword().equals(password);
               if(!equalPassword) return SignInResponseDto.signInDataMismatch();

               // todo : Security 적용 후 변경 //
               token = UUID.randomUUID().toString();

          } catch (Exception exception) {
               exception.printStackTrace();
               return ResponseDto.databaseError();
          }

          return SignInResponseDto.success(token);
     }

     @Override
     // method : 회원가입 메서드 //
     public ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto) {

          String email = dto.getEmail();
          String nickname = dto.getNickname();
          String telNumber = dto.getTelNumber();

          try {

               // description : 이메일 중복 확인 //
               boolean hasEmail = userRepository.existsById(email);
               if(hasEmail) return SignUpResponseDto.existedEmail();

               // description : 닉네임 중복 확인 //
               boolean hasNickname = userRepository.existsByNickname(nickname);
               if(hasNickname) return SignUpResponseDto.existedNickname();

               // description : 전화번호 중복 확인 //
               boolean hasTelNumber = userRepository.existsByTelNumber(telNumber);
               if(hasTelNumber) return SignUpResponseDto.existedTelNumber();

               // description : Entity 생성 //
               UserEntity userEntity = new UserEntity(dto);

               // description : 데이터베이스에 저장 //
               userRepository.save(userEntity);

          } catch (Exception exception) {
               // description : 데이버베이스 에러 //
               exception.printStackTrace();
               return ResponseDto.databaseError();
          }

          return SignUpResponseDto.success();
     }
     
}
