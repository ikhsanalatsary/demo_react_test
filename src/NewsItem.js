import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";

export default class NewsItem extends React.Component {
  render() {
    const { article } = this.props;
    return (
      <Card>
        <Image
          data-testid="image-thumbnail"
          src={
            article.urlToImage ||
            "https://rawgit.com/ikhsanalatsary/xcidic-news/8db843f7684624356510c7317d231124bd3dc5fe/src/modules/news/image.png"
          }
        />
        <Card.Content>
          <Card.Header data-testid="article-title">{article.title}</Card.Header>
          <Card.Meta>
            <span className="date" data-testid="article-date">
              {new Date(article.publishedAt).toLocaleDateString()}
            </span>
          </Card.Meta>
          <Card.Description data-testid="article-description">
            {article.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra data-testid="article-author">
          <Icon name="user" />
          {article.author || "None"}
        </Card.Content>
      </Card>
    );
  }
}
