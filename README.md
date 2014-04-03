jquery-more
===========

Easily create an ajax-button to load next pages into a container


### Basic usage

```
$(function() {
  $("body").more();
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
  <a href="page2.html" class="btn btn-default" data-more=".result">More</a>
</div>
```

### Using partials

In order to provide search engines with the original link, you should add your partial's url via data-attribute:
```
<a href="page2.html" class="btn btn-default" data-more=".result" data-href="page2.part.html">More</a>
```

### Customizing the loading state

jquery-more adds a 'loading'-class to the triggering button while getting the content.

Here's an example of how one could show an animated gif:

```
<a href="page2.html" class="btn btn-default" data-more=".result"><i class="icon-progress"></i> More</a>
```

```
# css/styles.css
.icon-progress {
  display: inline-block;
  font-style: normal;
  font-weight: 400;
  line-height: 1;
  position: relative;
  top: 1px;
  margin: -2px 0;
  width: 16px;
  height: 16px;
}

.icon-progress:before, 
.icon-progress:after {
  content: "";
  display: block;
  visibility: hidden;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.icon-progress:before {
  background: url('../images/ajax-loader_FFFFFF.gif') no-repeat center;
  visibility: visible;
}

.icon-progress:after {
  background: url('../images/ajax-loader_EBEBEB.gif') no-repeat center;
  visibility: hidden;
}

a.btn .icon-progress {
  display: none;
}

a.btn:hover .icon-progress:before, 
a.btn:active .icon-progress:before, 
a.btn:focus .icon-progress:before {
  visibility: hidden;
}

a.btn:hover .icon-progress:after, 
a.btn:active .icon-progress:after, 
a.btn:focus .icon-progress:after {
  visibility: visible;
}

a.btn.loading .icon-progress {
  display: inline-block;
}
```


You may customize the name of 'loading'-class using the 'loadingClass'-option:
```
$(function() {
  $(".result").more({
    loadingClass: 'loading'
  });
});
```

#### For your convenience...
If you initialize the plugin on the result container, you can omit its declaration in the markup because jquery-more can resolve it by reverse selector engineering.
```
$(function() {
  $(".result").more();
});
```

```
<a href="page2.html" class="btn btn-default" data-more>More</a>
```
However, this won't work when using partials, because the selector can only be consistently reverse engineered by accounting for all of its ancestors.

