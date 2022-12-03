import React, { Component } from 'react'

export class Newsitem extends Component {
    
  render() {
    
    let {title,desc,imageUrl,newUrl,date,source}=this.props
    return (
      <div>
        <div className="card my-2">
        
            <img src={!imageUrl?"https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg":imageUrl} className="card-img-top" alt="..."/>
            <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{zIndex : "1",left:"90%"}}>{source}</span>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{desc}</p>
                <div className="container d-flex justify-content-between">
                <a href={newUrl} rel="noreferrer"  target='_blank' className="btn btn-sm btn-primary btn-dark">Read More</a>
                <p className="card-text">{new Date(date).toGMTString()}</p>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

export default Newsitem
