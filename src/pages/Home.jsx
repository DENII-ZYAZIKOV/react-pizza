import React, { useContext } from "react";
import Categories from "../components/Categories";
import Sort, { list } from "../components/Sort";
import qs from "qs";
import axios from "axios";
import PizzaBlock from "../components/PizzaBlock";
import { useEffect, useState } from "react";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategoryId,
  setFilters,
  setPageCount,
} from "../redux/slices/filterSlice";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sort = useSelector((state) => state.filter.sort);
  const pageCount = useSelector((state) => state.filter.pageCount);
  const { searchValue } = useContext(SearchContext);
  const [items, setItem] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  // const [curren tPage, setCurrentPage] = useState(1);
  // const [categoryId, setCategoryId] = useState(0);
  // const [sort, setSort] = useState({
  //   name: "популярности",
  //   sort: "rating",
  // });
  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };
  const onChangePage = (number) => {
    dispatch(setPageCount(number));
  };
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sort === params.sort);
      dispatch(setFilters({ ...params, sort }));
    }
  }, []);
  useEffect(() => {
    const queryString = qs.stringify({
      sort: sort.sort,
      
      categoryId,
      pageCount,
    });
    navigate(`?${queryString}`);
  }, [categoryId, sort, pageCount, searchValue]);

  const pizzas = items
    .filter((el) =>
      el.title.toLowerCase().includes(searchValue.toLowerCase()) ? true : false
    )
    .map((item) => <PizzaBlock key={item.id} {...item} />);
  const skeletons = [...new Array(6)].map((_, i) => <Skeleton />);
  useEffect(() => {
    setIsloading(true);
    axios
      .get(
        `https://667429ec75872d0e0a955cf5.mockapi.io/items?page=${pageCount}&limit=4&${
          categoryId > 0 ? `category=${categoryId}` : ""
        }&sortBy=${sort.sort}&order=desc`
      )
      .then((res) => {
        setItem(res.data);
        setIsloading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sort, pageCount, searchValue]);
  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination value={pageCount} onChangePage={onChangePage} />
    </>
  );
}
