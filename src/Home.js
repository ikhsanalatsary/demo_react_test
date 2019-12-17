import React from "react";
import axios from "axios";
import { Card, Dimmer, Image, Loader, Segment } from "semantic-ui-react";
import NewsItem from "./NewsItem";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      error: null
    };
    this.fetchNews = this.fetchNews.bind(this);
  }

  componentDidMount() {
    this.fetchNews();
  }

  fetchNews() {
    axios
      .get(
        "https://newsapi.org/v2/everything?sources=abc-news-au&sortBy=publishedAt&page=1",
        {
          headers: {
            "X-Api-Key": ""
          }
        }
      )
      .then(result => {
        console.log(result);
        this.setState({
          data: result.data.articles,
          loading: false,
          total: result.data.totalResults
        });
      })
      .catch(error => {
        this.setState({
          error: error.message,
          loading: false
        });
      });
  }

  renderNews(article, i) {
    return <NewsItem key={i} article={article} />;
  }

  render() {
    const { loading, data, error } = this.state;
    let content = null;
    if (loading) {
      content = (
        <Segment data-testid="loading">
          <Dimmer inverted active>
            <Loader>Loading</Loader>
          </Dimmer>
          <Image src="https://rawgit.com/ikhsanalatsary/xcidic-news/8db843f7684624356510c7317d231124bd3dc5fe/src/modules/news/paragraph.png" />
        </Segment>
      );
    } else if (error) {
      content = <Segment data-testid="error">{error}</Segment>;
    } else {
      // content = (
      //   <Dimmer.Dimmable
      //     as={Card.Group}
      //     dimmed={dimmed}
      //     stackable
      //     itemsPerRow={3}
      //     style={{ marginBottom: 15 }}
      //   >
      //     <Dimmer active={dimmed} inverted>
      //       <Loader>Loading</Loader>
      //     </Dimmer>
      //     {data.map(this.articleList)}
      //   </Dimmer.Dimmable>
      // );
      content = (
        <Card.Group
          stackable
          itemsPerRow={3}
          style={{ marginBottom: 15 }}
          data-testid="wrapper-news"
        >
          {data.map(this.renderNews)}
        </Card.Group>
      );
    }

    return <>{content}</>;
  }
}
