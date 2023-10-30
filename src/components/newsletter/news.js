import React from "react";
import Nav from "./nav.js";
import "./News.css";

class News extends React.Component {
  constructor(props) {
    super(props);
    console.log("i am constructor");
    this.state = { name1: "Loading news for you..", count: 0 };
  }

  async componentDidMount() {
    console.log("i am coponentdidmount");
    let res = await fetch(
      `https://newsapi.org/v2/everything?q=${this.props.newsName}&apiKey=c2df1f736e3f4a14ab29642a9de832aa`
    );
    let data = await res.json();
    console.log(data, typeof data.articles, data.articles, typeof ar);
    let w = { width: "400px" };
    let arr = data.articles.map((p) => {
      return (
        <div class="p-8" key={p.title}>
          {/* <!--Card 1--> */}
          <div class="news-card">
            <img class="news-image" src={p.urlToImage} alt={p.title} />
            <div class="news-content">
              <div class="news-title">{p.title}</div>
              <p class="news-description">{p.description}</p>
            </div>
            <div class="news-read-more">
              <a href={p.url}>Read more</a>
            </div>
          </div>
        </div>
      );
    });
    console.log(arr);
    this.setState({ name1: arr });
  }

  render() {
    // this.setState({count:this.state.count+1})
    console.log(" i am render", this.state.count);
    return (
      <div>
        <Nav />
        <div className="news-container">{this.state.name1}</div>
      </div>
    );
  }
}

export default News;