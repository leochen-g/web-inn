# 瀑布流插件Masonry中文文档【翻译】

> 转自：[https://segmentfault.com/a/1190000013675077](https://segmentfault.com/a/1190000013675077)

## 安装Install


### 下载

下载压缩或未压缩的masonry

* masonry.pkgd.min.js （压缩）
* masonry.pkgd.js （未压缩）

### CDN

在unpkg直接饮用Masonry文件。

    <script src="https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js"></script>
    <!-- or -->
    <script src="https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.js"></script>

### 包管理

使用Bower安装

    bower install masonry --save

使用npm安装

    npm install masonry-layout

入门Getting started
-----------------

### HTML

在你的项目中引入Masonry.js

    <script src="/path/to/masonry.pkgd.min.js"></script>

Masonry的运行需要一个包含一些列子组件的grid容器标签

    <div class="grid">
      <div class="grid-item">...</div>
      <div class="grid-item grid-item--width2">...</div>
      <div class="grid-item">...</div>
      ...
    </div>

### CSS

你可以通过CSS控制所有组件的尺寸

    .grid-item { width: 200px; }
    .grid-item--width2 { width: 400px; }

### 通过jQuery初始化

你可以将Masonry作为一个jQuery插件来使用`$('selector').masonry()`

    $('.grid').masonry({
      // options
      itemSelector: '.grid-item',
      columnWidth: 200
    });

### 通过原生JavaScript初始化

你可以通过原生JS使用Masonry：`new Masonry( elem, options )`。构造函数`Masonry()`接收两个参数：容器标签和配置对象。

    var elem = document.querySelector('.grid');
    var msnry = new Masonry( elem, {
      // options
      itemSelector: '.grid-item',
      columnWidth: 200
    });
    // element argument can be a selector string
    //   for an individual element
    var msnry = new Masonry( '.grid', {
      // options
    });

### 在HTML中初始化

你也可以在HTML中初始化Masonry，这样不需要书写任何JavaScript。在容器标签中增加`data-masonry`属性，其值则是Masonry组件的配置

    <div class="grid" data-masonry='{ "itemSelector": ".grid-item", "columnWidth": 200 }'>

_注意：在HTML中必须以JSON格式配置，key必须带引号，例如：`"itemSelector":`。 `data-masonry`的值使用单引号，JSON使用双引号。_  
在Masonry v3版本，HTML初始化需要使用特定的class： `js-masonry` ，设置配置需要属性`data-masonry-options`，在Masonry v4之后版本中，这种写法也是兼容的。

    <div class="grid js-masonry"
      data-masonry-options='{ "itemSelector": ".grid-item", "columnWidth": 200 }'>

布局Layout
--------

### 组件尺寸

你可以通过CSS控制组件的尺寸

    div class="grid">
      <div class="grid-item"></div>
      <div class="grid-item grid-item--width2"></div>
      <div class="grid-item grid-item--height2"></div>
      ...
    </div>

    .grid-item {
      float: left;
      width: 80px;
      height: 60px;
      border: 2px solid hsla(0, 0%, 0%, 0.5);
    }
    
    .grid-item--width2 { width: 160px; }
    .grid-item--height2 { height: 140px; }

### 响应式布局

组件的尺寸可设置成百分比从而适应响应式的布局，在设置masonry布局模式时，将`columnWidth`设置为指定组件的尺寸，设置`percentPosition: true` 。组件的位置将不再改变，window改变大小事，组件将以百分比的形式响应式布局。

    <div class="grid">
      <!-- width of .grid-sizer used for columnWidth -->
      <div class="grid-sizer"></div>
      <div class="grid-item"></div>
      <div class="grid-item grid-item--width2"></div>
      ...
    </div>

    /* fluid 5 columns */
    .grid-sizer,
    .grid-item { width: 20%; }
    /* 2 columns */
    .grid-item--width2 { width: 40%; }

    $('.grid').masonry({
      // set itemSelector so .grid-sizer is not used in layout
      itemSelector: '.grid-item',
      // use element for option
      columnWidth: '.grid-sizer',
      percentPosition: true
    })

### imagesLoaded

Masonry排列未加载完成的图片时会导致元素的重叠，imagesLoaded可以解决这个问题。imagesLoaded是一个独立的脚本插件，你可以在imagesloaded.desandro.com下载。  
初始化Masonry，在每一张图片加载完成后触发布局。

    // init Masonry
    var $grid = $('.grid').masonry({
      // options...
    });
    // layout Masonry after each image loads
    $grid.imagesLoaded().progress( function() {
      $grid.masonry('layout');
    });

或者在所有图片都加载完成后初始化Masonry

    var $grid = $('.grid').imagesLoaded( function() {
      // init Masonry after all images have loaded
      $grid.masonry({
        // options...
      });
    });

配置项Options
----------

除了`columnWidth`和`itemSelector`以外，所有的配置项都是可以选择的。

    // jQuery
    $('.grid').masonry({
      columnWidth: 200,
      itemSelector: '.grid-item'
    });

    // vanilla JS （原生JS）
    var msnry = new Masonry( '.grid', {
      columnWidth: 200,
      itemSelector: '.grid-item'
    });

    <!-- in HTML -->
    <div class="grid" data-masonry='{ "columnWidth": 200, "itemSelector": ".grid-item" }'>

### 必选配置项Recommended

**itemSelector**  
用于指定参与布局的子组件。  
我们建议始终设置项，用于区分参组件元素是否参与布局。

    itemSelector: '.grid-item'

    <div class="grid">
      <!-- do not use banner in Masonry layout -->
      <!—在Masonry布局时忽略 banner
      <div class="static-banner">Static banner</div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      ...
    </div>

**columnWidth**  
用于在水平网格上对齐组件

_我们建议设置columnWidth，如果没有设置columnWidth，Masonry将使用第一个组件的外宽作为默认值。_

    columnWidth: 80

使用组件尺寸，在响应式布局中奖组件的宽度设置成百分比，设置`columnWidth`时，将值设置为指定组件选择器的字符串，即使用该组件的外宽。

    div class="grid">
      <!-- .grid-sizer empty element, only used for element sizing -->
      <div class="grid-sizer"></div>
      <div class="grid-item"></div>
      <div class="grid-item grid-item--width2"></div>
      ...
    </div>

    /* fluid 5 columns */
    .grid-sizer,
    .grid-item { width: 20%; }
    /* 2 columns wide */
    .grid-item--width2 { width: 40%; }

    // use outer width of grid-sizer for columnWidth
    columnWidth: '.grid-sizer',
    itemSelector: '.grid-item',
    percentPosition: true

### 布局Layout

**组件尺寸Element sizing**  
尺寸配置项`columnWidth`和`gutter`可以可以设置组件的列宽和间距。

    <div class="grid">
      <!-- .grid-sizer empty element, only used for element sizing -->
      <div class="grid-sizer"></div>
      <div class="grid-item"></div>
      <div class="grid-item grid-item--width2"></div>
      ...
    </div>

    /* fluid 5 columns */
    .grid-sizer,
    .grid-item { width: 20%; }
    /* 2 columns wide */
    .grid-item--width2 { width: 40%; }

    // use outer width of grid-sizer for columnWidth
    columnWidth: '.grid-sizer',
    // do not use .grid-sizer in layout
    itemSelector: '.grid-item',
    percentPosition: true

该配置项可以设置为一个选择器的字符串或一个元素

    // set to a selector string
    // first matching element within container element will be used
    columnWidth: '.grid-sizer'
    
    // set to an element
    columnWidth: $grid.find('.grid-sizer')[0]

组件尺寸允许你使用CSS控制Masonry的布局。这在响应式布局和媒体查询中非常有用。

    /* 3 columns by default */
    .grid-sizer { width: 33.333%; }
    
    @media screen and (min-width: 768px) {
      /* 5 columns for larger screens */
      .grid-sizer { width: 20%; }
    }

**Gutter（间距）**

        gutter: 10

在js配置项gutter可以设置组件的横向间距，使用CSS margin可设置组件的纵向间距。

    gutter: 10

css:

    .grid-item {
      margin-bottom: 10px;
    }

在响应式布局中使用组件尺寸将宽度设置为百分比时，可以将gutter的值设置为选择器字符串或者一个元素。

    <div class="grid">
      <div class="grid-sizer"></div>
      <div class="gutter-sizer"></div>
      <div class="grid-item"></div>
      <div class="grid-item grid-item--width2"></div>
      ...
    </div>

    .grid-sizer,
    .grid-item { width: 22%; }
    .gutter-sizer { width: 4%; }
    .grid-item--width2 { width: 48%; }

    columnWidth: '.grid-sizer',
    gutter: '.gutter-sizer',
    itemSelector: '.grid-item',
    percentPosition: true

**horizontalOrder**  
使组件按照从左到右排列。（对比组件们在第二排的排列）

    horizontalOrder: true

![clipboard.png](/img/bV5wjf/view "clipboard.png")  
![clipboard.png](/img/bV5wjg/view "clipboard.png")

**percentPosition**  
设置组件的位置（尺寸）为百分比而非像素数。`percentPosition: true`可以使宽度为百分比的组件不改变他们原本的位置。

    // set positions with percent values
    percentPosition: true,
    columnWidth: '.grid-sizer',
    itemSelector: '.grid-item'

    /* fluid 5 columns */
    .grid-sizer,
    .grid-item { width: 20%; }

**Stamp**  
指定组件为`stamp`。Masonry在布局时会避开这些组件。  
配置项stamp只在Masonry实例第一次初始化完成后黏贴指定组件，但你可以通过`stamp method`更改后续的stamp布局。

    <div class="grid">
      <div class="stamp stamp1"></div>
      <div class="stamp stamp2"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      ....
    </div>

    // specify itemSelector so stamps do get laid out
    itemSelector: '.grid-item',
    // stamp elements
    stamp: '.stamp'

    /* position stamp elements with CSS */
    .stamp {
      position: absolute;
      background: orange;
      border: 4px dotted black;
    }
    .stamp1 {
      left: 30%;
      top: 10px;
      width: 20%;
      height: 100px;
    }
    .stamp2 {
      right: 10%;
      top: 20px;
      width: 70%;
      height: 30px;
    }

**fitWidth**

根据父级容器的尺寸，设置容器的宽，以适应可用的列数。启用之后将容器grid居中

    fitWidth: true

    /* center container with CSS */
    .grid {
      margin: 0 auto;
    }

**originLeft**  
控制水平布局，默认状态下`originLeft: true`控件从左到右布局，设置`originLeft: false`后，控件从右向左布局。  
`originLeft`Masonry v3使用`isOriginLeft`，在Masonry v4之后`isOriginLeft`也是被兼容的。

    originLeft: false

**originTop**  
类似originLeft，开启`originTop: false`后，自下而上布局

### 设置（Setup）

**containerStyle**  
设置父级容器grid的css样式。默认状态下为position:’relative’，禁用grid容器的所有样式：containerStyle:null

    // default
    // containerStyle: { position: 'relative' }
    
    // disable any styles being set on container
    // useful if using absolute position on container
    containerStyle: null

**transitionDuration**  
控件改变位置或重排的缓动时间。默认为0.4s

    // fast transitions
    transitionDuration: '0.2s'
    
    // slow transitions
    transitionDuration: '0.8s'
    
    // no transitions
    transitionDuration: 0

**stagger**  
控件重排的时间。当一个控件改变了位置，其他控件逐次的改变位置进行重排，stagger属性即为每个控件发生重排的缓动时间。，默认为值30（毫秒）

    stagger: 30

**resize**  
当窗口大小改变时控件重排以适应父级容器大小。默认为允许重排`resize: true`，在v3版本中使用`isResizeBound`，并在v4版本下兼容。

    // disable window resize behavior
    resize: false

    
    /* grid has fixed width */
    .grid {
      width: 320px;
    }

**initLayout**  
允许初始化布局，默认开启。  
设置为`initLayout: false`，可以禁止初始化布局，你可以通过methods或者增加event事件的方法开启布局。V3版本使用`isInitLayout`。

    var $grid = $('.grid').masonry({
      // disable initial layout
      initLayout: false,
      //...
    });
    // bind event
    $grid.masonry( 'on', 'layoutComplete', function() {
      console.log('layout is complete');
    });
    // trigger initial layout
    $grid.masonry();

方法（Methods）
-----------

Methods是Masonry实例的行为  
使用jQuery时，methods遵从jQuery格式`.masonry( 'methodName' /* arguments */ )`

    $grid.masonry()
      .append( elem )
      .masonry( 'appended', elem )
      // layout
      .masonry();

原生JS的method使用类似：`masonry.methodName( /* arguments */ )`，与jQuery不同，原生JS不能使用链（chaining）.

    // vanilla JS
    var msnry = new Masonry( '.grid', {...});
    gridElement.appendChild( elem );
    msnry.appended( elem );
    msnry.layout();

### 布局（Layout）

**layout / .masonry()**  
将所有组件布局。`layout`用于当一个组件改变了尺寸后所有的控件需要重新布局。

    // jQuery
    $grid.masonry()
    // vanilla JS
    msnry.layout()

    var $grid = $('.grid').masonry({
      columnWidth: 80
    });
    // change size of item by toggling gigante class
    $grid.on( 'click', '.grid-item', function() {
      $(this).toggleClass('gigante');
      // trigger layout after item size changes
      $grid.masonry('layout');
    });

**layoutItems**  
布局指定控件

    // jQuery
    $grid.masonry( 'layoutItems', items, isStill )
    // vanilla JS
    msnry.layoutItems( items, isStill )

`items Masonry`控件的数组  
`isStill`布尔型，禁止变换  
**stamp**  
在排列中黏贴指定控件，Masonry会围绕被黏贴的元素进行排列

    // jQuery
    $grid.masonry( 'stamp', elements )
    // vanilla JS
    msnry.stamp( elements )

`elements` element,jQuery对象，节点，或数组  
设置不参与瀑布流布局的对象，以选择器形式给出。

    var $grid = $('.grid').masonry({
      // specify itemSelector so stamps do get laid out
      itemSelector: '.grid-item',
      columnWidth: 80
    });
    var $stamp = $grid.find('.stamp');
    var isStamped = false;
    
    $('.stamp-button').on( 'click', function() {
      // stamp or unstamp element
      if ( isStamped ) {
        $grid.masonry( 'unstamp', $stamp );
      } else {
        $grid.masonry( 'stamp', $stamp );
      }
      // trigger layout
      $grid.masonry('layout');
      // set flag
      isStamped = !isStamped;
    });

**unstamp**  
解除指定元素的stamp 状态。

### 增加&移除控件

**Appended**  
在瀑布流末尾增加新控件并重排。

    // jQuery
    $grid.masonry( 'appended', elements )
    // vanilla JS
    msnry.appended( elements )

`elements element`,jQuery对象，节点，或数组

    $('.append-button').on( 'click', function() {
      // create new item elements
      var $items = $('<div class="grid-item">...</div>');
      // append items to grid
      $grid.append( $items )
        // add and lay out newly appended items
        .masonry( 'appended', $items );
    });

*（注意链chaining的使用，此处为先增加节点，再讲节点重排）  
jQuery可以使用，增加字符串结构的HTML节点，但是masonry不行，所以当时用jQuery ajax动态加载节点时要将HTML节点转化成jQuery对象。

    // does not work
    $.get( 'page2', function( content ) {
      // HTML string added, but items not added to Masonry
      $grid.append( content ).masonry( 'appended', content );
    });
    
    // does work
    $.get( 'page2', function( content ) {
      // wrap content in jQuery object
      var $content = $( content );
      // add jQuery object
      $grid.append( $content ).masonry( 'appended', $content );
    });

**prepended**  
类似append，在顶部增加新节点并重排。  
**addItems**  
项Masonry实例中增加控件元素，addItems不能像append和prepended重排新增加的元素

    // jQuery
    $grid.masonry( 'addItems', elements )
    // vanilla JS
    msnry.addItems( elements )

**remove**  
从Masonry实例和DOM中移除元素

    // jQuery
    $grid.masonry( 'remove', elements )
    // vanilla JS
    msnry.remove( elements )

    $grid.on( 'click', '.grid-item', function() {
      // remove clicked element
      $grid.masonry( 'remove', this )
        // layout remaining item elements
        .masonry('layout');
    });

### 事件（Events）

**on**  
增加一个Masonry事件监听。

    // jQuery
    var msnry = $grid.masonry( 'on', eventName, listener )
    // vanilla JS
    msnry.on( eventName, listener )

`eventName` 字符串，Masonry事件名称  
`listener` 方法  
**off**  
移除Masonry事件

    // jQuery
    var msnry = $grid.masonry( 'off', eventName, listener )
    // vanilla JS
    msnry.off( eventName, listener )

`eventName` 字符串，Masonry事件名称  
`listener` 方法  
**once**  
增加一个Masonry事件，只触发一次。

    // jQuery
    var msnry = $grid.masonry( 'once', eventName, listener )
    // vanilla JS
    msnry.once( eventName, listener )

`eventName` 字符串，Masonry事件名称  
`listener` 方法

    $grid.masonry( 'once', 'layoutComplete', function() {
      console.log('layout is complete, just once');
    })

### Utilities

**reloadItems**  
Recollects all item elements.  
For frameworks like Angular and React, reloadItems may be useful to apply changes to the DOM to Masonry.

    // jQuery
    $grid.masonry('reloadItems')
    // vanilla JS
    msnry.reloadItems()

**destroy**  
移除所有的Masonry功能，`destroy`将恢复元素预加载之前的状态。

    // jQuery
    $grid.masonry('destroy')
    // vanilla JS
    msnry.destroy()

    var masonryOptions = {
      itemSelector: '.grid-item',
      columnWidth: 80
    };
    // initialize Masonry
    var $grid = $('.grid').masonry( masonryOptions );
    var isActive = true;
    
    $('.toggle-button').on( 'click', function() {
      if ( isActive ) {
        $grid.masonry('destroy'); // destroy
      } else {
        $grid.masonry( masonryOptions ); // re-initialize
      }
      // set flag
      isActive = !isActive;
    });

**getItemElements**  
返回一个组件元素的数组

    // jQuery
    var elems = $grid.masonry('getItemElements')
    // vanilla JS
    var elems = msnry.getItemElements()

`elems` 数组  
**jQuery.fn.data('masonry')**  
从jQuery对象中取出Masonry实例，以便读取Masonry的属性。

    var msnry = $('.grid').data('masonry')
    // access Masonry properties
    console.log( msnry.items.length + ' filtered items'  )

**Masonry.data**  
通过元素取出Masonry实例，`Masonry.data()`用于从HTML初始化的Masonry实例中取出Masonry属性。

    var msnry = Masonry.data( element )

`element` 控件或选择器的字符串  
`msnry` Masonry

    <!-- init Masonry in HTML -->
    <div class="grid" data-masonry='{...}'>...</div>

    // jQuery
    // pass in the element, $element[0], not the jQuery object
    var msnry = Masonry.data( $('.grid')[0] )
    
    // vanilla JS
    // using an element
    var grid = document.querySelector('.grid')
    var msnry = Masonry.data( grid )
    // using a selector string
    var msnry = Masonry.data('.grid')

事件
--

### 事件绑定（event binding）

**jQuery事件绑定**  
使用jQuery标准的事件方法绑定，如`.on()`，`.off()`和`.one()`。

    // jQuery
    var $grid = $('.grid').masonry({...});
    
    function onLayout() {
      console.log('layout done');
    }
    // bind event listener
    $grid.on( 'layoutComplete', onLayout );
    // un-bind event listener
    $grid.off( 'layoutComplete', onLayout );
    // bind event listener to be triggered just once. note ONE not ON
    $grid.one( 'layoutComplete', function() {
      console.log('layout done, just this one time');
    });

jQuery事件监听器需要一个`event`argument参数，原生的JS不需要。

    // jQuery, has event argument
    $grid.on( 'layoutComplete', function( event, items ) {
      console.log( items.length );
    });
    
    // vanilla JS, no event argument
    msnry.on( 'layoutComplete', function( items ) {
      console.log( items.length );
    });

**原生JS事件绑定**  
使用原生JS方法绑定。on()，.off()，.once()。

    // vanilla JS
    var msnry = new Masonry( '.grid', {...});
    
    function onLayout() {
      console.log('layout done');
    }
    // bind event listener
    msnry.on( 'layoutComplete', onLayout );
    // un-bind event listener
    msnry.off( 'layoutComplete', onLayout );
    // bind event listener to be triggered just once
    msnry.once( 'layoutComplete', function() {
      console.log('layout done, just this one time');
    });

### Masonry 事件

**layoutComplete**  
在布局和所有位置变化完成后触发。

    // jQuery
    $grid.on( 'layoutComplete', function( event, laidOutItems ) {...} )
    // vanilla JS
    msnry.on( 'layoutComplete', function( laidOutItems ) {...} )

`laidOutItems` Masonry控件数组，已完成排列的控件

    $grid.on( 'layoutComplete',
      function( event, laidOutItems ) {
        console.log( 'Masonry layout completed on ' +
          laidOutItems.length + ' items' );
      }
    );

**removeComplete**  
元素移除后触发

    // jQuery
    $grid.on( 'removeComplete', function( event, removedItems ) {...} )
    // vanilla JS
    msnry.on( 'removeComplete', function( removedItems ) {...} )

`removedItems`Masonry控件数组，被移除的控件

    $grid.on( 'removeComplete',
      function( event, removedItems ) {
        notify( 'Removed ' + removedItems.length + ' items' );
      }
    );
