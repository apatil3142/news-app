import React, { Component } from 'react'
import Newsitem from './Newsitem'
import PropTypes from 'prop-types'
import Spinner from './Spinner'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
    
    static defaultProps ={
        country : "in",
        category : "general",
        pageSize : 6,
        heading: "Top Headlines",
        
    }

    static propTypes = {
        country : PropTypes.string,
        category : PropTypes.string,
        pageSize : PropTypes.number,
        heading : PropTypes.string
    }
    
    constructor(){
        super();
        this.state={
            articles :  [],
            loading : false,
            page:1,
            totalResults : 0
        }
    }

    updateNews = async ()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${process.env.REACT_APP_APIKEY}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data = await fetch(url);
        let parseData = await data.json();
        
        this.setState({
           articles :  parseData.articles,
           totalResults : parseData.totalResults,
           loading : false
        })
    }

    fetchMoreData = async () => {
        this.setState({
            page: this.state.page + 1
        })
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${process.env.REACT_APP_APIKEY}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data = await fetch(url);
        let parseData = await data.json();
        
        this.setState({
           articles :  this.state.articles.concat(parseData.articles),
           totalResults : parseData.totalResults,
           
        })
        
      };

    async componentDidMount(){
        this.updateNews()
    }

    // handleNextClick = async ()=>{
    //     this.setState({
    //         page: this.state.page + 1
    //     })
    //     this.updateNews()
    // }

    // handlePrevClick = async ()=>{
    //     this.setState({
    //         page: this.state.page - 1
    //     })
    //     this.updateNews()
    // }
  render() {  
    
    return (
    <>
        <h2 className='my-2 text-center'>NewsMonkey - {this.props.heading} Headlines</h2>
        {/* {this.state.loading && <Spinner/>} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
        <div className="row">
        { this.state.articles.map((element)=>{
            return  <div className="col-md-4" key={element.url}>
                        <Newsitem title={element.title} desc ={element.description}
                         imageUrl ={element.urlToImage} newUrl = {element.url} date ={element.publishedAt}source = {element.source.name}/>
                    </div>
        })}
            
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
                <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)}  type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
    </>
        
    )
  }
}

export default News
