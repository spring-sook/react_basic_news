import styled from "styled-components";
import NewsItem from "./NewsItems";
import { useEffect, useState } from "react";
import axios from "axios";

const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3em;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1em;
    padding-right: 1em;
  }
`;

const NewsList = ({ category }) => {
  const [articles, setArticles] = useState(null);

  useEffect(() => {
    // useEffect함수 안에서 async함수를 넣으려면 이렇게 따로 만들어줘야됨.
    // 비동기로 하는 이유는 : 요청한 데이터가 언제 올지 몰라서
    // useEffect의 콜백 함수는 비동기적으로 작동할 수 없으므로, 비동기 작업을 처리하기 위해
    // 응답 두개 이상 대기 시 순서가 필요하다면 하나의 useEffect 안에 나열하면 되고, 상관없다면 useEffect 를 두개로 분리 혹은 async 2개 사용
    const fetchData = async () => {
      try {
        const query = category === "all" ? "all" : `category=${category}`;
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=us&${query}&apiKey=8fa27a481cdf4b9f8e5e99d728c3847d`
        );
        setArticles(response.data.articles); // head빼고 데이터, 그리고 객체 안에서 기사 배열만 뽑음
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [category]); // [] 의존성 배열이 비어있으면 mount 시점(즉, 컴퍼넌트 렌더링 이후)에 호출
  return (
    <NewsListBlock>
      {articles &&
        articles.map((article, index) => (
          <NewsItem key={index} article={article} />
        ))}
    </NewsListBlock>
  );
};
export default NewsList;
