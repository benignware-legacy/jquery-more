jquery-more
===========

Easily create an ajax-button to load next pages into a container


### Basic usage

```
$(function() {
  $(".result").more();
});
```

```
<div class="result">
  <div class="panel panel-default">
    <div class="panel-heading"><h3 class="panel-title">Item #1</h3></div>
    <div class="panel-body">
      Lorem ipsum
    </div>
  </div>
  <div class="panel panel-default">
    <div class="panel-heading"><h3 class="panel-title">Item #2</h3></div>
    <div class="panel-body">
      Lorem ipsum
    </div>
  </div>
  <div class="panel panel-default">
    <div class="panel-heading"><h3 class="panel-title">Item #3</h3></div>
    <div class="panel-body">
      Lorem ipsum
    </div>
  </div>
  <a href="page2.html" class="btn btn-default" data-more>More</a>
</div>
```

jquery-more uses <cite>reverse css-selector engineering</cite> of the plugin's instance element. 
This way it's possible, to omit the explicit declaration of the container on the button itself, thus making it more convenient for the developer :-) 

However, this won't work when using partials, because the selector can only be reverse engineered from the document level.


### Using partials
When working with partials you should declare your container selector on button-markup using the 'data-more'-attribute: 

```
<a href="page2.part.html" class="btn btn-default" data-more=".result">More</a>
```

Also, in order to provide search engines with the original link, add your partial's url via data-attribute:
```
<a href="page2.html" class="btn btn-default" data-more=".result" data-href="page2.part.html">More</a>
```

### Customizing the loading state

jquery-more adds a 'loading'-class to the triggering button while getting the content.
```
<style>
*[data-more].loading {
  background: url('../images/ajax-loader.gif') no-repeat 12px center;
  padding-left: 32px;
}
</style>
```

You may customize the 'loading'-selector using the 'loadingClass'-option:
```
$(function() {
  $(".result").more({
    loadingClass: 'loading'
  });
});
```


