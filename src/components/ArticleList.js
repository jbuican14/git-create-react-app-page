import React from 'react'; 
import { Link } from 'react-router-dom';

const ArticleList = ({articles}) => (
    <>
        {articles.map( (article,idx) => (
            <div key={idx}>
                <Link to={`/article/${article.name}`}>
                <h3 >{article.title}</h3>
                </Link>
                <p> {article.content[0].substring(0, 150)} ... 
                    <Link  to={`/article/${article.name}`}>
                        <span>Read More</span>
                    </Link>
                </p>
                <hr/>
            </div>
        ))}
    </>
)

export default ArticleList;