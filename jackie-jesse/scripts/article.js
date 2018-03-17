'use strict';

let articles = [];

// COMMENTED: What is the purpose of the following function? Why is its name capitalized? Explain the context of "this" within the function. What does "rawDataObj" represent?
// The purpose of the following function is that it is a constructor function. The name is capitalized by convention. "This" within the function refers to the JavaScript contextual "this", which is a property of the object in reference to itself. rawDataObj represents the object taken from the array in the blogArticles.js file, which is then passed as data for the constructor function.

function Article (rawDataObj) {
  // TODONE: Use the JS object that is passed in to complete this constructor function:
  // Save ALL the properties of `rawDataObj` into `this`
  this.title = rawDataObj.title;       
  this.category = rawDataObj.category;   
  this.author = rawDataObj.author;     
  this.authorUrl = rawDataObj.authorUrl;
  this.publishedOn = rawDataObj.publishedOn;
  this.body = rawDataObj.body;
}


Article.prototype.toHtml = function() {
  // COMMENTED: What is the benefit of cloning the article? (see the jQuery docs)
  // It creates a copy of the matched elements, which lives in memory.

  let $newArticle = $('article.template').clone().removeClass('template');
  /* TODONE: This cloned article still has a class of template. In our modules.css stylesheet, we should give all elements with a class of template a display of none so that our template does not display in the browser. But, we also need to make sure we're not accidentally hiding our cloned article. */

  if (!this.publishedOn) $newArticle.addClass('draft');
  $newArticle.attr('data-category', this.category);

  /* TODONE: Now use jQuery traversal and setter methods to fill in the rest of the current template clone with values of the properties of this particular Article instance.
    We need to fill in:
      1. author name,
      2. author url,
      3. article title,
      4. article body, and
      5. publication date. */

      $newArticle.find('h1').text(this.title);
      $newArticle.find('.byline a').text(this.author);
      $newArticle.find('.byline a').attr('href', this.authorURL);
      $newArticle.find('section.article-body').html(this.body);
      $newArticle.find('.byline time').html(this.publishedOn);

  // REVIEW: Display the date as a relative number of 'days ago'
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
  $newArticle.append('<hr>');
  return $newArticle;
};

rawData.sort(function(a,b) {
  // REVIEW: Take a look at this sort method; This may be the first time we've seen it. Look at the docs and think about how the dates would be sorted if the callback were not included in this method.
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

// TODONE!: Refactor these for loops using the .forEach() array method.

rawData.forEach(function(rawData){
 articles.push(new Article(rawData));
 console.log(articles);
});

articles.forEach(function(articles){
  $('#articles').append(articles.toHtml());
});