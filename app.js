$(function () {
  var count = 6;
  var $ul = $('#ul');
  var $ul2 = $('#ul2');
  var $ul3 = $('#ul3');

  // 渲染数据函数,返回一个DOM对象
  function createLis(datas) {
    var lis = '';
    var json = datas;
    var datas = json.subjects;
//      console.log(json.start);
    for (var i = 0; i < datas.length; i++) {
      lis +=
          '<a target="_blank" href="' + datas[i].alt + '"><li>' +
          '<p class="topNum">Top.' + (json.start + i + 1) + '</p>' +
          '<h1 class="title">' + datas[i].title + '</h1>' +
          '<p class="original_title">' + datas[i].original_title + '</p>' +
          '<div class="imgBox"><img src="' + datas[i].images.large + '"></div>' +
          '<p class="average">评分：<b class="score">' + datas[i].rating.average + '</b> 分</p>' +
          '<p class="genres">类型：' + datas[i].genres + '</p>' +
          // '<p class="directors">导演：' + datas[i].directors[0].name + '</p>' +
          '<p class="year">年份：' + datas[i].year + '</p>' +
          '</li></a>';
    }

    return lis || "<div class='noResult'>啊呜...暂无结果<a href=''>返回首页</a></div>";

  }


  function showContent(params, url) {
    $.ajax({
      type: "get", //jquey是不支持post方式跨域的
      async: false,
      data: params,
      url: url, //跨域请求的URL
      dataType: "jsonp",
      //传递给请求处理程序，用以获得jsonp回调函数名的参数名(默认为:callback)
      jsonp: "callback",
      //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
      jsonpCallback: "success_jsonpCallback",
      //成功获取跨域服务器上的json数据后,会动态执行这个callback函数
      success: function (json) {
        var datas = json.collections || json.subjects;
        var page = $('#page');
        var aaa = '';

        // 生成页码
        for (var j = 0; j < Math.ceil(json.total / count); j++) {
          aaa += '<a>' + (j + 1) + '</a>';
        }
        page.html(aaa);

        // 渲染数据
        var datas = json;
        $ul.html(createLis(datas));

        // 点击页码请求对应数据
        var as = $('#page a');
        // 动态添加激活状态类名
        as.eq(0).addClass('active');
        for (var k = 0; k < as.length; k++) {
          (function (k) {
            as[k].onclick = function () {
//              this.setAttribute('class','active');
              $(this).addClass('active').siblings().removeClass('active');
              $.ajax({
                type: "get", //jquey是不支持post方式跨域的
                async: false,
                data: {
                  count: count,
                  start: k * count
                },
//                url: "https://api.douban.com/v2/book/user/119280372/collections", //跨域请求的URL
                url: url, //跨域请求的URL
                dataType: "jsonp",
                //传递给请求处理程序，用以获得jsonp回调函数名的参数名(默认为:callback)
                jsonp: "callback",
                //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
                jsonpCallback: "success_jsonpCallback",
                //成功获取跨域服务器上的json数据后,会动态执行这个callback函数
                success: function (json) {
                  var datas = json;
                  // 渲染数据
                  $ul.html(createLis(datas));
                }
              });
            }
          })(k);
//          k = 0;
        } // end of for
      }
    });
  }

  // top250
//   function showContent2() {
//     $.ajax({
//       type: "get", //jquey是不支持post方式跨域的
//       async: false,
//       data: {
//         count: count,
//         start: '0'
//       },
// //      url: "https://api.douban.com/v2/book/user/119280372/collections", //跨域请求的URL
//       url: "https://api.douban.com/v2/movie/top250?apikey=0b2bdeda43b5688921839c8ecb20399b", //跨域请求的URL
//       dataType: "jsonp",
//       //传递给请求处理程序，用以获得jsonp回调函数名的参数名(默认为:callback)
//       jsonp: "callback",
//       //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
//       jsonpCallback: "success_jsonpCallback",
//       //成功获取跨域服务器上的json数据后,会动态执行这个callback函数
//       success: function (json) {
//         var datas = json.collections;
//         var page2 = $('#page2');
//         var aaa = '';
//
//         // 生成页码
//         for (var j = 0; j < Math.ceil(json.total / count); j++) {
//           aaa += '<a>' + (j + 1) + '</a>';
//         }
//         page2.html(aaa);
//
//         // 渲染数据
//         var datas = json;
//         $ul2.html(createLis(datas));
//
//         // 点击页码请求对应数据
//         var as = $('#page2 a');
//         // 动态添加激活状态类名
//         as.eq(0).addClass('active');
//         for (var k = 0; k < as.length; k++) {
//           (function (k) {
//             as[k].onclick = function () {
// //              this.setAttribute('class','active');
//               $(this).addClass('active').siblings().removeClass('active');
//               $.ajax({
//                 type: "get", //jquey是不支持post方式跨域的
//                 async: false,
//                 data: {
//                   count: count,
//                   start: k * count
//                 },
// //                url: "https://api.douban.com/v2/book/user/119280372/collections", //跨域请求的URL
//                 url: "https://api.douban.com/v2/movie/top250?apikey=0b2bdeda43b5688921839c8ecb20399b", //跨域请求的URL
//                 dataType: "jsonp",
//                 //传递给请求处理程序，用以获得jsonp回调函数名的参数名(默认为:callback)
//                 jsonp: "callback",
//                 //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
//                 jsonpCallback: "success_jsonpCallback",
//                 //成功获取跨域服务器上的json数据后,会动态执行这个callback函数
//                 success: function (json) {
//                   var datas = json;
//                   // 渲染数据
//                   $ul2.html(createLis(datas));
//                 }
//               });
//             }
//           })(k);
// //          k = 0;
//         } // end of for
//       }
//     });
//   }

  // 搜索结果
  function searchResult(val) {
    console.log(val);
    $.ajax({
      type: "get", //jquey是不支持post方式跨域的
      async: false,
      data: {
        count: count,
        start: '0'
      },
//      url: "https://api.douban.com/v2/book/user/119280372/collections", //跨域请求的URL
      url: "https://api.douban.com/v2/movie/search?&q=" + val, //跨域请求的URL "apikey=0b2bdeda43b5688921839c8ecb20399b"
      dataType: "jsonp",
      //传递给请求处理程序，用以获得jsonp回调函数名的参数名(默认为:callback)
      jsonp: "callback",
      //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
      jsonpCallback: "success_jsonpCallback",
      //成功获取跨域服务器上的json数据后,会动态执行这个callback函数
      success: function (json) {
        var datas = json;
        var page3 = $('#page3');
        var aaa = '';

        console.log(datas);


        // 生成页码
        for (var j = 0; j < Math.ceil(json.total / count); j++) {
          aaa += '<a>' + (j + 1) + '</a>';
        }
        page3.html(aaa);

        // 渲染数据
        $ul3.html(createLis(datas));
        // 设置其他tab隐藏
        $('.content >div').eq(2).css('display', 'block').siblings().css('display', 'none');
        $('#myDiv').children().removeClass('active');

        // 点击页码请求对应数据
        var as = $('#page3 a');
        // 动态添加激活状态类名
        as.eq(0).addClass('active');
        for (var k = 0; k < as.length; k++) {
          (function (k) {
            as[k].onclick = function () {
//              this.setAttribute('class','active');
              $(this).addClass('active').siblings().removeClass('active');
              $.ajax({
                type: "get", //jquey是不支持post方式跨域的
                async: false,
                data: {
                  count: count,
                  start: k * count
                },
//                url: "https://api.douban.com/v2/book/user/119280372/collections", //跨域请求的URL
                url: "https://api.douban.com/v2/movie/search?&q=" + val, //跨域请求的URL
                dataType: "jsonp",
                //传递给请求处理程序，用以获得jsonp回调函数名的参数名(默认为:callback)
                jsonp: "callback",
                //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
                jsonpCallback: "success_jsonpCallback",
                //成功获取跨域服务器上的json数据后,会动态执行这个callback函数
                success: function (json) {
                  var datas = json;
                  // 渲染数据
                  $ul3.html(createLis(datas));
                }
              });
            }
          })(k);
//          k = 0;
        } // end of for

      }
    })
  }

  // 回车键搜索
  $('.search').on('keyup', function (event) {
    var query = $('.search').val();
    if (event.keyCode === 13) {
      var params = {count: count, start: '0', q: query};
      var url = 'https://api.douban.com/v2/movie/search?';
      showContent(params, url);
    }
  });

  // 搜索按钮搜索
  $('.submit').on('click', function () {
    var query = $('.search').val();
    var params = {count: count, start: '0', q: query};
    var url = 'https://api.douban.com/v2/movie/search?';
    showContent(params, url);
  });

  // 院线热映
  $('.in_theaters').on('click', function () {
    var params = {count: count, start: '0'};
    var url = 'https://api.douban.com/v2/movie/in_theaters?apikey=0b2bdeda43b5688921839c8ecb20399b';
    showContent(params, url);
    $(this).addClass('active').siblings().removeClass('active');
  })

  // top 250
  $('.top250').on('click', function () {
    var params = {count: count, start: '0'};
    var url = 'https://api.douban.com/v2/movie/top250?apikey=0b2bdeda43b5688921839c8ecb20399b';
    showContent(params, url);
    $(this).addClass('active').siblings().removeClass('active');
  })

  $('.in_theaters').trigger('click')

//    showContent2();


  // 顶部Tab切换
//   $('#myDiv h2').on('click', function () {
//     var index = $(this).index();
//     var tabcontent = $('.content >div');
//     var $ulLis = $('#ul').find('li').length;
//     var $ul2Lis = $('#ul2').find('li').length;
//
// //      console.log(index);
//     tabcontent.eq(index).css('display', 'block').siblings().css('display', 'none');
//     $(this).addClass('active').siblings().removeClass('active');
//
//     if (index === 0 && $ulLis === 0) {
//       showContent1();
//       console.log(index);
//     }
//
//     if (index === 1 && $ul2Lis === 0) {
//       showContent2();
//       console.log(index);
//     }
//   })

});