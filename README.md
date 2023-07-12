# Seowoo_board
**게시판 만들기 프로젝트입니다.**

# 폴더정리 목록 (개괄식)
|**폴더명**|**설명**|
|--|--|
|**components**|최소 단위의 기능들 모음|
|**layouts**|Header, Footer 관련 레이아웃|
|**views**|실제로 화면에 보여주는 단위 모음|
|**assets**|views 에서 보여주는 것|
|**constants**|전역에서 사용하는 상수들 모음|
|**stores**|상태관리 모음|
|**utils**|전역으로 사용하는 함수들 모음|
|**interfaces**|전역으로 사용하는 타입들 모음|
|**hooks**|hook|
|**mocks**|mock 데이터(임시 데이터들) 모음|
|**apis**|api 연결시 사용되는 함수들|

# 폴더정리 세부사항
|**components**|**세부 폴더**|**설명**|
|--|--|--|
||**BoardListItem**|메인, 검색, 마이페이지 화면 상의 최신 게시물의 관려된 기능 및 레이아웃|
||**CommentListItem**|상세페이지 화면 상의 댓글에 관련된 기능 및 레이아웃|
||**InputBox**||
||**Top3ListItem**|메인 화면 상의 주간 TOP 3 게시글에 관련된 기능 및 레이아웃|

# To-do
[] authentication 경로일 때는 안보이도록 작업<br />
[] mocks 의 commentListItem 에서 writeTime 을 실제 시간을 반영하도록 작업
