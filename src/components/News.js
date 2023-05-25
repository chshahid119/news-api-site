import React, { Component } from "react";
import Loader, { Spinner } from "./Spinner";
import NewsItem from "./NewsItem";
import PropTypes from 'prop-types'


export class news extends Component {
  constructor() {
    super();
  //  console.log("hello i am constructor from news component");
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
  }
  async componentDidMount() {
   // console.log("component did mount function");
    let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=business&apiKey=575351db7c2946b6aab4b83e896e1ad6
    &page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
       this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false
     })
   
    
  }

   handleNextClick = async () => {
    //console.log("Next Button is Clicked");
    if(!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)))
    {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=business&apiKey=575351db7c2946b6aab4b83e896e1ad6
      &page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true});
      let data = await fetch(url);
      let parsedData = await data.json()
      console.log(parsedData);

      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false
      })
    }

    
  }

   handlePrevClick = async () => {
    console.log("Previous Button is Clicked");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=business&apiKey=575351db7c2946b6aab4b83e896e1ad6
    &page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);

    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false
    })
  }




  render() {
   
    return (
      <div>
        <div className="container my-3">
          <h1 className="text-center " >Pakistan Times - Top Headlines</h1>
         {this.state.loading && <Spinner/>}
          <div className="row">
            {!this.state.loading && this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                  />
                </div>
              );
            })}
          </div>
          <div className="container d-flex justify-content-between mt-4">
            <button
              disabled={this.state.page <= 1}
              type="button"
              className="btn btn-dark"
              onClick={this.handlePrevClick}
            >
              &laquo; Previous
            </button>
            <button
              type="button"
              disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)}
              className="btn btn-dark "
              onClick={this.handleNextClick}
            >
              Next &raquo;
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default news;
