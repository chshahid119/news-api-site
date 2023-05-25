import React, { Component } from 'react'

export class NewsItem extends Component {
   

    render() {
        let {title,description,imageUrl,newsUrl}=this.props;
        return (
            <div className="my-3">
                <div className="card" style={{width: "18rem"}}>
                    <img src={!imageUrl?"https://image.stern.de/33219432/t/H1/v1/w1440/r1.7778/-/21--urnnewsmldpacom2009010123022199685927v2w800h600l598t399r1798b1198jpeg---a40446c27954742c.jpg":imageUrl} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}</p>
                            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Go somewhere</a>
                        </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
