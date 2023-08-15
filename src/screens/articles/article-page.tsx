import styles from "./article-list.module.less";
import Article from "../article";
import { useGetArticlesQuery } from "../../store";
import { Pagination, Spin } from "antd";
import { IArticleListProps } from "../../types";
import ArticleList from "../../components/article-list";

const pageSize = 5;
const pagesCount = 5;

const [currentOffset, setCurrentOffset] = useState(0);
const [currentPage, setCurrentPage] = useState(1);

const handlePageChange = (page: number) => {
  setCurrentPage(page);
  setCurrentOffset((page - 1) * pageSize);
};

export default function ArticlePage({
  currentOffset,
  currentPage,
  handlePageChange,
  pageSize,
  pagesCount,
}: IArticleListProps) {
  const {
    data: articlesObject = { articles: [] },
    isFetching,
    // refetch,
  } = useGetArticlesQuery(currentOffset);
  const { articles } = articlesObject;

  return (
    <>
      <ArticleList />
      <Pagination />
    </>
  );
}
