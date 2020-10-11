import React from 'react';

import ArticleList from '../components/ArticleList'; 
import articleContent from './article-content';

const ArticlesListPage =()=> (
    <>
        <h1>Welcome to the Article list page</h1>
        <div className="main-articles">
           <ArticleList articles={articleContent} />
        </div>
   
    </>
)

export default ArticlesListPage;