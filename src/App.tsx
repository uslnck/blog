import { useEffect, useState } from "react";
import "./App.less";
import Header from "./components/header";
import Main from "./screens/main";
import { useGetArticlesQuery } from "./store";

const pageSize = 5;
const token = localStorage.getItem("token") as string;

export default function Blog() {
  const [currentOffset, setCurrentOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isInside, setIsInside] = useState([{ slug: "", inside: false }]);
  const [target, setTarget] = useState(0);

  const handlePseudoInside = (slug: string) => {
    const target = isInside.indexOf(
      isInside.find((article) => article.slug === slug) || {
        slug: "",
        inside: false,
      }
    );
    setTarget(target);

    setIsInside((prev) => {
      return prev.map((item, i) => {
        if (i === target) return { ...item, inside: !item.inside };

        return item;
      });
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setCurrentOffset((page - 1) * pageSize);
  };

  const {
    data: articlesObject = { articles: [], articlesCount: 0 },
    isFetching,
  } = useGetArticlesQuery({ currentOffset, token });
  const { articles, articlesCount } = articlesObject;

  useEffect(() => {
    if (articles.length !== 0) {
      const newArticles = articles.map((article) => ({
        slug: article.slug,
        inside: false,
      }));

      setIsInside(newArticles);
    }
  }, [articles]);

  console.log("isInside", isInside);
  // console.log("articles", articles);

  return (
    <>
      <Header isInside={isInside} handlePseudoInside={handlePseudoInside} />
      <Main
        isInside={isInside}
        handlePseudoInside={handlePseudoInside}
        handlePageChange={handlePageChange}
        isFetching={isFetching}
        articles={articles}
        articlesCount={articlesCount}
        currentPage={currentPage}
        pageSize={pageSize}
        target={target}
      />
    </>
  );
}
