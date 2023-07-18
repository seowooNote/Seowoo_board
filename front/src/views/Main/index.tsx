import React, { useState , useEffect} from 'react';
import './style.css';
import Top3ListItem from 'src/components/Top3ListItem';
import { CurrentListResponseDTO, Top3ListResponseDto } from 'src/interfaces/response';
import { currentBoardListMock, popularWordListMock, top3ListMock } from 'src/mocks';
import BoardListItem from 'src/components/BoardListItem';
import { useNavigate } from 'react-router-dom';
import { COUNT_BY_PAGE, COUNT_BY_SECTION, PAGE_BY_SECTION } from 'src/constants';
import { getPagination } from 'src/utils';

export default function Main() {
  const navigator = useNavigate();

  const MainTop = () => {
    const [top3List, setTop3List] = useState<Top3ListResponseDto[]>([]);

    useEffect(() => {
      if(!top3List.length) setTop3List(top3ListMock);
    }, []);

    return(
      <div className='main-top'>
        <div className="main-top-text-container">
          <div className="main-top-text"><span>Seowoo's Board</span> 에서</div>
          <div className="main-top-text">다양한 이야기를 나눠보세요</div>
        </div>
        <div className="main-top-3-container">
          <div className="main-top-3-text">주간 TOP 3 게시글</div>
          <div className="main-top-3-list">
            {top3List.map((item) => (<Top3ListItem item={item} />))}
          </div>
        </div>
      </div>
    );
  }

  const MainBottom = () => {
    const [currentList, setCurrentList] = useState<CurrentListResponseDTO[]>([]);
    const [popularList, setPopularList] = useState<string[]>([]);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentSection, setCurrentSection] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number[]>([]);
    const [totalSection, setTotalSection] = useState<number>(1);

    const [totalPageCount, setTotalPageCount] = useState<number>(0);
    const [minPage, setMinPage] = useState<number>(0);
    const [maxPage, setMaxPage] = useState<number>(0);
    
    const onPopularClickHandler = (word: string) => {
      navigator(`/search/${word}`);
    }

    const onPageClickHandler = (page: number) => {
      setCurrentPage(page);
    }

    const onPreviousClickHandler = () => {
      // 한 페이지씩 이동
      // if(currentPage != 1) setCurrentPage(currentPage - 1);

      // 섹션 이동
      // if(currentSection != 1) setCurrentSection(currentSection - 1);

      // 한 페이지씩 이동 + 섹션 이동
      if(currentPage == 1) return;
      if(currentPage == minPage) setCurrentSection(currentSection - 1);
      setCurrentPage(currentPage - 1);
    }

    const onNextClickHandler = () => {
      // 한 페이지씩 이동
      // if(currentPage != totalPage.length) setCurrentPage(currentPage + 1);

      // 섹션 이동
      // if(currentSection != totalSection) setCurrentSection(currentSection + 1);

      // 한 페이지씩 이동 + 섹션 이동
      if(currentPage == totalPageCount) return;
      if(currentPage == maxPage) setCurrentSection(currentSection + 1);
      setCurrentPage(currentPage + 1);
    }

    useEffect(() => {
      const boardCount = 72;

      const { section, minPage, maxPage, totalPageCount } = getPagination(boardCount, currentSection);
      setTotalSection(section);
      setMinPage(minPage);
      setMaxPage(maxPage);
      setTotalPageCount(totalPageCount);

      if(!currentList.length) setCurrentList(currentBoardListMock);
      
      const pageList = [];
      for(let page = minPage; page <= maxPage; page++) pageList.push(page);
      setTotalPage(pageList);
    }, [currentSection]);

    useEffect(() => {
      if(!popularList.length) setPopularList(popularWordListMock);
    }, []);

    return(
      <div className='main-bottom'>
        <div className="main-bottom-text">최신 게시물</div>
        <div className="main-bottom-container">
          <div className="main-bottom-board-list">
            {currentList.map((item) => (<BoardListItem item={item} />))}
          </div>
          <div className="main-bottom-popular-box">
            <div className="main-bottom-popular-card">
              <div className="main-bottom-popular-text">인기 검색어</div>
              <div className="main-bottom-popular-list">
                {popularList.map((item) => (<span className='popular-chip' onClick={() => onPopularClickHandler(item)}>{item}</span>))}
              </div>
            </div>
          </div>
        </div>
        <div className="main-bottom-pagination">
          {/* 페이지네이션 */}
          {/* 1. 전체 데이터를 가지고 있을 때 */}
          {/* 2. 해당 페이지의 데이터만 가지고 있을 때 */}
          {/*    게시물 리스트(Mock) / 현재 페이지 / 전체 페이지 에 대해 알고 있어야 함 */}
          <div className='pagination-button' onClick={onPreviousClickHandler}>
            <div className='pagination-left-icon'></div>
            <div className='pagination-button-text'>이전</div>
          </div>
          <div className='pagination-text'>{`\|`}</div>
          {totalPage.map((page) => (<div className={currentPage === page ? 'pagination-page-active' : 'pagination-page'} onClick={() => onPageClickHandler(page)}>{page}</div>))}
          <div className='pagination-text'>{`\|`}</div>
          <div className='pagination-button' onClick={onNextClickHandler}>
            <div className='pagination-button-text'>다음</div>
            <div className='pagination-right-icon'></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id='main-wrapper'>
      <MainTop />
      <MainBottom />
    </div>
  );
}
