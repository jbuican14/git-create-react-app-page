import React from 'react';

import ArticleList from '../components/ArticleList';
import articles from './article-content';
import NotFoundPage from './PageNotFound';

const ArticleSingle =({ match })=> {  // react router pass a prop called 'match' 
    // console.log(articles, match);
    const name = match.params.name; 
    const article = articles.find(ar => ar.name === name);
    if(!article) return <NotFoundPage/>
    const suggestedArticles = articles.filter( article => article.name !== name);

return (
    <>
        <h1>Welcome to {articles.title} learning path overview </h1>
        {article.content.map((paragraph, idx ) => (
            <p key={idx}>{paragraph}</p>
        ))} 
        <br /> 
        <hr/> 
        <h2>Related Articles : </h2>
        <ArticleList articles={suggestedArticles} />
    </>
    

)}

export default ArticleSingle;