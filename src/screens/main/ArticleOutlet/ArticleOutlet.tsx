// import { useEffect, useRef, useState } from "react";
// import { Outlet } from "react-router-dom";
// import { IArticleOutletProps } from "../../../types";

// export default function ArticleOutlet({ articles }: IArticleOutletProps) {
//   const [isFavorited2, setIsFavorited] = useState<boolean[]>([]);
//   const [favoritesCount2, setFavoritesCount] = useState<number[]>([]);
//   const [trash, setTrash] = useState(0);
//   const isFirstRender = useRef(true);

//   useEffect(() => {
//     articles.forEach((article) => {
//       setIsFavorited((prev) => prev.concat(article.favorited));
//       setFavoritesCount((prev) => prev.concat(article.favoritesCount));
//     });
//     if (!isFirstRender.current) setTrash((prev) => prev + 5);
//     if (articles.length !== 0) isFirstRender.current = false;
//   }, [articles]);

//   const handleLike2 = (id: number) => {
//     setFavoritesCount((prev) => {
//       const updatedFavoritesCount = [...prev];
//       updatedFavoritesCount[id + trash] += 1;
//       return updatedFavoritesCount;
//     });
//     setIsFavorited((prev) => {
//       const updatedFavorited = [...prev];
//       updatedFavorited[id + trash] = !updatedFavorited[id + trash];
//       return updatedFavorited;
//     });

//   };

//   const handleUnlike2 = (id: number) => {
//     setFavoritesCount((prev) => {
//       const updatedFavoritesCount = [...prev];
//       updatedFavoritesCount[id + trash] -= 1;
//       return updatedFavoritesCount;
//     });
//     setIsFavorited((prev) => {
//       const updatedFavorited = [...prev];
//       updatedFavorited[id + trash] = !updatedFavorited[id + trash];
//       return updatedFavorited;
//     });
//   };

//   return (
//     <Outlet
//       context={[
//         handleLike2,
//         handleUnlike2,
//         isFavorited2,
//         favoritesCount2,
//         trash,
//       ]}
//     />
//   );
// }
