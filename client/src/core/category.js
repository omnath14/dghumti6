import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getCategories, getFilteredProducts } from "./apiCore";
import Checkbox from "./Checkbox";
import Search from "./Search";
import InfiniteScroll from 'react-infinite-scroll-component';
const Category = () => {
    const [myFilters, setMyFilters,loading] = useState({ filters: { category: [],  }});

    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(30);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setCategories(data);
            }
        });
    };

    const loadFilteredResults = newFilters => {
        setIsLoading(true)
        setFilteredResults([]);
        getFilteredProducts(skip, limit, newFilters,loading).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setIsLoading(false)
                setFilteredResults(data.data);
                setSize(data.size);
                setSkip(0);
            }
        });
    };

    const loadMore = () => {
        let toSkip = skip + limit;  
        getFilteredProducts(toSkip, limit, myFilters.filters,loading).then(data => {
            if (data.error) {
                setError(data.error);
            }  else {
                setFilteredResults([...filteredResults, ...data.data]);
                setSize(data.size);
                setSkip(toSkip);

            }
        });
    };

    const loadMoreButton = () => {
        return (
            size > 0 &&
            size >= limit&& (
           loadMore()
            )
        );
    };

    useEffect(() => {
        init();
        const getCategoryProducts = {category:[localStorage.getItem('categoryID')]}
        if(localStorage.getItem('categoryID')) {
            loadFilteredResults(getCategoryProducts);
        }
    }, []);



    const showLoading = () =>
        (<div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );

    const handleFilters = (filters, filterBy) => {
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;
        loadFilteredResults(myFilters.filters);
        setMyFilters(newFilters);
    };


    
    return (
        <Layout>
            <div className="container mb-4">

                <p className="card-header " style={{padding:'10px',width:'100%',borderRadius:'5px', border:'1px solid #008ECC'}}>Shop by category</p>
                <div className="row-6 shadow-lg">

                {!categories.length? showLoading():( <Checkbox categories={categories} handleFilters={filters => handleFilters(filters, "category") }/>)}

                    <p className="card-header " style={{padding:'10px',width:'100%'}}>Products</p>
                <InfiniteScroll
                    dataLength={filteredResults}
                    next={loadMoreButton}
                    hasMore={true}
                    loader={<p style={{textAlign:'center',fontSize:'12px'}}>.....</p>}>


                    <div className='my-2 m-3'>

                        {
                            isLoading ? (showLoading()) : (!filteredResults.length? (showLoading()):(
                                    <div className="row row-cols-2">
                                        {filteredResults.map((product, i) => (
                                            <div key={i} className="col col-lg-2">
                                                <Card product={product}/>
                                            </div>
                                        ))}
                                    </div>
                                )
                            )
                        }

                    </div>
                </InfiniteScroll>
                </div>
                </div>
        </Layout>
    );
};

export default Category;
