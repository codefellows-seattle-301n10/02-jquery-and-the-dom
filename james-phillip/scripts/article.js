'use strict';

let articles = [];

// COMMENT: What is the purpose of the following function? Why is its name capitalized? Explain the context of "this" within the function. What does "rawDataObj" represent?
// PUT YOUR RESPONSE HERE
//  It is capitalized because it is a constructor function.  It will be used to create new objects from given datasets in the functions defined below.

function Article(rawDataObj) {
  this.title = rawDataObj.title;
  this.category = rawDataObj.category;
  this.author = rawDataObj.author;
  this.authorUrl = rawDataObj.authorUrl;
  this.publishedOn = rawDataObj.publishedOn;
  this.body = rawDataObj.body;
  // TODO: Use the JS object that is passed in to complete this constructor function:
  // Save ALL the properties of `rawDataObj` into `this`
}

Article.prototype.toHtml = function () {
  // COMMENT: What is the benefit of cloning the article? (see the jQuery docs)
  // It will use the exact same information as the blog articles so we don't have to type it again.

  let $newArticle = $('article.template').clone();
  /* TODO: This cloned article still has a class of template. In our modules.css stylesheet, we should give all elements with a class of template a display of none so that our template does not display in the browser. But, we also need to make sure we're not accidentally hiding our cloned article. */
  $newArticle.removeClass('template');

  if (!this.publishedOn) $newArticle.addClass('draft');
  $newArticle.data('category', this.category);

  $newArticle.find('.byline a').html(this.author);
  $newArticle.find('.byline a').attr('href', this.authorUrl);
  $newArticle.find('h1').html(this.title);
  $newArticle.find('.article-body').html(this.body);
  $newArticle.find('time').html(this.publishedOn);
  
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn)) / 60 / 60 / 24 / 1000) + ' days ago');
  $newArticle.append('<hr>');
  return $newArticle;
};

rawData.sort(function (a, b) {
  // REVIEW: Take a look at this sort method; This may be the first time we've seen it. Look at the docs and think about how the dates would be sorted if the callback were not included in this method.
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

// TODO: Refactor these for loops using the .forEach() array method.

rawData.forEach(function (articleObject) {
  articles.push(new Article(articleObject));
});

//for(let i = 0; i < articles.length; i++) {
// un-comment when toHTML in good enough shape to avoid terrible browser hang
// $('#articles').append(articles[i].toHtml());
//}

articles.forEach(function (article) {
  $('#articles').append(article.toHtml());
});