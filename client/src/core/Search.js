import React, { useState, useEffect } from "react";
import { getCategories, list } from "./apiCore";
import Card from "./Card";
import { Link, withRouter } from "react-router-dom";

const Search = () => {
    const [data, setData] = useState({
        categories: [],
        category: "",
        search: "",
        results: [],
        searched: false,
        loading: false

    });

    const { category, search, results, searched,loading } = data;

    const loadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setData({ ...data, categories: data,loading: true });
            }
        });
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const searchData = () => {

        if (search) {
            list({ search: search || undefined, category: category,loading: true }).then(
                response => {
                    if (response.error) {
                        console.log(response.error);
                    } else {
                        setData({ ...data, results: response, searched: true,loading: false });
                    }
                }
            );
        }
    };

    const searchSubmit = e => {
        e.preventDefault();
        searchData();
    };


    const handleChange = name => event => {
        setData({ ...data, [name]: event.target.value, searched: false });
    };

    const searchMessage = (searched, results) => {
        if (searched && results.length > 0) {

            return(
                <h5><div className="text-dark mb-2">
                  Results
                </div></h5>

            );
        }

        if (searched && results.length < 1) {
            return(<h6><div className="text-dark">
                No Results
            </div></h6>

            );

        }
    };

    const searchedProducts = (results = []) => {
        return (
            <div>

                    <h6 className="container">
                        {searchMessage(searched, results)}
                    </h6>

                    <div className="row row row-cols-2">
                        {results.map((product, i) => (
                            <div className="col-sm-2">
                                <Card key={i} product={product} />
                            </div> ))}
                    </div>


            </div>
        );
    };

    const searchForm = () => (

        <form onSubmit={searchSubmit} className='my-1' >
            <Link to="/search">

                <input type="text"
                       style={{width:'90%',borderRadius:' 5px 0 0 5px',
                           border: '3px solid #008ECC',
                           padding: '17px',
                           height: '18px',
                           borderRight:'none',
                           outline:'none'


                       }}
                        onChange={handleChange("search")}
                        placeholder="Search" />


                </Link>

            <button type="submit"
                  style={{color:'white',
                      backgroundColor:'#008ECC',
                      width:'10%',height:'40px',
                      textAlign: 'center',
                      borderRadius: '0 5px 5px 0',
                      fontSize: '15px',
                      border: '1px solid #008ECC',

                  }} >
           <i  className="fa fa-search"></i>

                </button>





        </form>




    );

    return (
        <div className="container" >
                {searchForm()}
                {searchedProducts(results)}

            </div>





    );
};

export default Search;
