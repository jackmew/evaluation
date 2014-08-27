# LeanDev Evaluation

# 2014/08/20

[listview- formatted content](http://demos.jquerymobile.com/1.4.3/listview/)

##聯絡人:

![image](https://dl.dropboxusercontent.com/u/47510080/markdown/phonegap/evaluation/1.png)

![image](https://dl.dropboxusercontent.com/u/47510080/markdown/phonegap/evaluation/2.png)


##系統訊息:

![image](https://dl.dropboxusercontent.com/u/47510080/markdown/phonegap/evaluation/3.png)

![image](https://dl.dropboxusercontent.com/u/47510080/markdown/phonegap/evaluation/4.png)

![image](https://dl.dropboxusercontent.com/u/47510080/markdown/phonegap/evaluation/5.png)

## To Do

1. calender : 改成 多選 直接在calender上 標記已選日期
2. 討論室 : Q1:要怎麼指定跟誰聊天? Q2: 要不要記錄聊天訊息? Q3:還是說用ajax每次將字串傳過去就好?
3. download : Q1:需要可以搜尋repository Q2:


## datepicker

[link](http://jqueryui.com/datepicker/#show-week)


[size](http://stackoverflow.com/questions/659588/how-to-resize-the-jquery-datepicker-control)

[center](http://stackoverflow.com/questions/8842425/how-do-i-make-jquery-ui-datepicker-show-up-in-the-center-of-my-screen)




## multidatespickr

在jquery ui date picker  的基礎上 加入了其他元素 包含可以多選dates

[link](http://multidatespickr.sourceforge.net)

在body 加上background 就會在轉頁時 出現那個顏色 ? :
`body {	background: white url('images/ui-bg_fine-grain_65_654b24_60x60.png') repeat;
}`



總之 用multidatespickr 解決了 多選日期的問題

接下來想到說要將,多選的結果記錄下來才對呀 =>

![image](https://dl.dropboxusercontent.com/u/47510080/markdown/phonegap/evaluation/6.png)

![image](https://dl.dropboxusercontent.com/u/47510080/markdown/phonegap/evaluation/7.png)

但是此時無法解決 重複選擇的問題

將資料放入array , 重複的就移除

### jquery array each

[link](http://www.revillweb.com/tutorials/jquery-foreach-using-jquery-each/)

### jquery array remove one element

[link](http://stackoverflow.com/questions/11170825/in-jquery-how-do-i-remove-an-array-element-either-via-indexkey-or-value)


[splice](http://www.w3schools.com/jsref/jsref_splice.asp)


![image](https://dl.dropboxusercontent.com/u/47510080/markdown/phonegap/evaluation/8.png)


##center multidatespickr

![image](https://dl.dropboxusercontent.com/u/47510080/markdown/phonegap/evaluation/10.png)

![image](https://dl.dropboxusercontent.com/u/47510080/markdown/phonegap/evaluation/11.png)


# panel with listview prolblem

panel加上collapsible 會出現一堆 破圖的狀況


[官方提供的解法](http://demos.jquerymobile.com/1.3.0/docs/examples/panels/panel-styling.html)

因此我將官方的寫法 複製過來 並且減少code , 只需要css就可以解決此問題 

![image](https://dl.dropboxusercontent.com/u/47510080/markdown/phonegap/evaluation/9.png)



# 2014/08/21


# fake chat

[dynamic collapsible](http://demos.jquerymobile.com/1.4.3/collapsible-dynamic/)

[listview in collapsible not enhance](http://stackoverflow.com/questions/21861502/jquery-mobile-refresh-collapsible)

![image](https://dl.dropboxusercontent.com/u/47510080/markdown/phonegap/evaluation/13.png)

[Refreshing-jQuery-Mobile-listviews,-buttons,-select-dropdowns,-and-input-fields](http://andymatthews.net/read/2011/12/14/Refreshing-jQuery-Mobile-listviews,-buttons,-select-dropdowns,-and-input-fields)


![image](https://dl.dropboxusercontent.com/u/47510080/markdown/phonegap/evaluation/14.png)




# bind event 

[link](http://stackoverflow.com/questions/11402500/how-to-handle-onclick-events-from-multiple-dynamically-created-anchor-tags-using)

![image](https://dl.dropboxusercontent.com/u/47510080/markdown/phonegap/evaluation/12.png)

# textarea 換行

[link](http://easonlin.logdown.com/posts/99808-html-in-the-textarea-wrap)

![image](https://dl.dropboxusercontent.com/u/47510080/markdown/phonegap/evaluation/15.png)

![image](https://dl.dropboxusercontent.com/u/47510080/markdown/phonegap/evaluation/16.png)

# 這時候又碰到一個問題

$("#talk-textarea-content").val(discussArr);

每次要加一條句子時 必須要全部輸出才行

那還不如:

<div>
	<p></p>
</div>

每講一次話 就加一次<p> , 而且這樣子還不需要用array存起來 , 當然要存也是可以

然後把div[設成scrollable](http://paladinprogram.blogspot.tw/2010/06/div-scrollbar.html)

裝飾div[link](http://www.w3schools.com/cssref/tryit.asp?filename=trycss3_border-radius)

[div scrollTop bottom](http://stackoverflow.com/questions/3742346/use-jquery-to-scroll-to-the-bottom-of-a-div-with-lots-of-text)

# 單純的datepicker要改成 行事曆 calendar

[fullcalendar](http://arshaw.com/fullcalendar/docs/usage/)

[moment.js]([http://](http://momentjs.com/))javascript用來處理date



原本的multidatepicker的include:

![image](https://dl.dropboxusercontent.com/u/47510080/markdown/phonegap/evaluation/17.png)


# renderEvent 加一個eventObject到calender

[找到這篇才知道怎麼加](http://stackoverflow.com/questions/19603956/render-an-event-in-fullcalendar-with-custom-data-on-the-fly-when-changing-the-in)

原來`start: new Date(2014,7,2)` 要new Date() => 月份 +1 才是現在月份

`$('#calendar').fullCalendar('renderEvent', eventDate, true); // stick? = true`

可能是[挺有趣的方法](http://stackoverflow.com/questions/7918301/fullcalendar-doesnt-render-color-when-using-eventrender)

# remove event

[how-do-i-delete-this-event](http://stackoverflow.com/questions/4649357/how-do-i-delete-this-event-from-fullcalendar)

[removeEvents](http://arshaw.com/fullcalendar/docs/event_data/removeEvents/)

# 2014/08/22

jquery mobile & jquery ui 很難整合在一起 

因為他的css 名稱常常會重複 , 

但calendar太好用了 當然還是得用

所以我將自己定義的index.css 放在所有.css後面 然後override原本定義的屬性


![image](https://dl.dropboxusercontent.com/u/47510080/markdown/phonegap/evaluation/18.png)


[full calendar not displaying ](http://stackoverflow.com/questions/18195941/full-calendar-not-displaying-when-loaded-with-backbone)

`$('#calendar').fullCalendar('render');`


[testing-if-something-is-hidden-using-jquery](http://stackoverflow.com/questions/178325/testing-if-something-is-hidden-using-jquery)


# problem refresh

我發現一個問題 當calendar hide時 按下addevent 再次show calendar 這時候會沒有顯示(render) , 再按下去一次add

這次會一次加兩個,也就是表示 show calendar時 沒有render出在calender hide時加入的event

![image](https://dl.dropboxusercontent.com/u/47510080/markdown/phonegap/evaluation/19.png)


所以我讓他show時 都render一個空的eventObject

改掉 直接用

`$('#calendar').fullCalendar('rerenderEvents');` 就可以refresh  => [link](http://arshaw.com/fullcalendar/docs1/removed/refresh/)

![image](https://dl.dropboxusercontent.com/u/47510080/markdown/phonegap/evaluation/20.png)

# init & destroy

###init

	$('#inviteCalendar').fullCalendar({
	      theme: true,
	      header: {
	        left: '',
	        center: 'title',
	        right: ''
	      }
	      ,

      defaultDate: '2014-10-12',

      events: [
        {
          title: evaluationName,
          start: "2014-10-01",
          end: "2014-10-12"
        }
      ]
    });

###destroy
`$('#inviteCalendar').fullCalendar('destroy');`




# button disable

[link](http://stackoverflow.com/questions/5875025/disable-buttons-in-jquery-mobile)


[link](http://stackoverflow.com/questions/6438659/how-to-disable-a-link-button-in-jquery-mobile)

因為在jquery mobile裡面有很多種類的button 所以搞得很複雜...

1. button
2. input
3. anchor => `$( "#btnJoin" ).addClass('ui-disabled');` 

然後enable `$( "#btnJoin" ).removeClass('ui-disabled');`


# 要如何去看fullcalendar內存的eventObject

可以用來判斷現在加了幾個事件 , 會不會加入重複事件, 要不要disable 確定加入事件 button

# jquery mobile change page event

在轉頁時 最好reset頁面 [link](http://jqmtricks.wordpress.com/2014/03/26/jquery-mobile-page-events/)


`pagebeforechange` 會call兩次 => Note that pagebeforechange fires twice in jQuery-Mobile 1.4


`pagecontainerbeforechange`[link](http://jqmtricks.wordpress.com/2014/07/13/pagecontainerbeforechange/) => 經過實驗 確定只有轉頁 會觸發這個事件 就用這事件來reset page吧


	  $( document ).on( "pagecontainerbeforeshow" , function(e, data) {
	    
	  });



# problem 我不想有重複的事件

[回傳存在calender中的eventObject - clientEvents](http://arshaw.com/fullcalendar/docs/event_data/clientEvents/)





# jquery $.each returns undefined

$.each return false表示中斷迴圈

return true 表示繼續



[link](http://stackoverflow.com/questions/14441253/jquery-each-return-value-undefined)

[link](http://stackoverflow.com/questions/5847294/jquery-each-return-undefined-from-numeric-array)

![image](https://dl.dropboxusercontent.com/u/47510080/markdown/phonegap/evaluation/21.png)




# problem : fullcalendar end

fullcalendar的end 是算到00:00 就算是12號 所以線圖只會顯示到11號




# 2014/08/25



##todo
1. 未讀
2. 已讀
3. 已加入重要訊息


[Jquery parseInt - String to Integer](http://www.minihowtos.net/jquery-parseint)


[split-string-with-javascript](http://stackoverflow.com/questions/8757616/split-string-with-javascript)



# change icon color

根據這篇[jquery mobile change color](http://www.bar54.de/2014/02/jquery-mobile-change-color-of-svg-icons/) 

文章中說 `“polygon%20fill%3D%22%23FFF“ stands for a polygon filled with the color white (FFF).`

但我在`ui-icon-star:after` 竟然找不到這段 `%20fill%3D%22%23FFF` , 所以我強制在`Cpolygon` 加上那一段

![image](https://dl.dropboxusercontent.com/u/47510080/markdown/phonegap/evaluation/22.png)

就成功改變icon顏色了!!!

接下來要做 按下click 會 圖片 所以原本白色的星星 會變黃色

最後是看到[這篇](https://forum.jquery.com/topic/change-button-icon)成功的 : `$("#add_button span.ui-icon").addClass("ui-icon-minus").removeClass("ui-icon-plus")`



![image](https://dl.dropboxusercontent.com/u/47510080/markdown/phonegap/evaluation/23.png)

未按下右邊按鈕時

![image](https://dl.dropboxusercontent.com/u/47510080/markdown/phonegap/evaluation/24.png)

按下按鈕後

![image](https://dl.dropboxusercontent.com/u/47510080/markdown/phonegap/evaluation/25.png)



# 接下來我要用程式 自動產生system message 

並且分類 

1. 未讀
2. 已讀
3. 已加入重要訊息

###定義javascript中的仿class , contructor 建立物件

![image](https://dl.dropboxusercontent.com/u/47510080/markdown/phonegap/evaluation/26.png)


###要自動產生的畫面
![image](https://dl.dropboxusercontent.com/u/47510080/markdown/phonegap/evaluation/27.png)

比較困難的應該是日期date分類,時間time排序

1. date部分:先抓到日期,用日期來比對,相同的加進來,再來用時間排序 , 

2. time部分:突然想到我有include moment.js,


# javascript array sort

[link](http://www.w3school.com.cn/jsref/jsref_sort.asp)

1. arrayObject.sort(sortby) 時 ,若是沒有sortby參數 ,則按照字母順序排序,嚴格上來說是按照字符編碼排序

2. 加入sortby:

		function sortNumber(a,b)
		{
		return a - b
		}

表示從小到大排

		function sortNumber(a,b)
		{
		return a - b
		}

表示從大到小排

#從milisecond排序

[link](http://codepen.io/weedenwright/pen/gkvcL)

###workflow


![image](https://dl.dropboxusercontent.com/u/47510080/markdown/phonegap/evaluation/29.png)


首先 將div的String 借由toArray轉成很多的String 放進Array , 

`var times = $(".test-moment").toArray();`

![image](https://dl.dropboxusercontent.com/u/47510080/markdown/phonegap/evaluation/28.png)


將String : `2013-08-17 11:54:1` 轉成long : `1376711641000` 

=> `unsorted_time.milli = moment_date.valueOf();` 

放進unsorted_time 的array中 => `unsorted_times.push(unsorted_time);`

![image](https://dl.dropboxusercontent.com/u/47510080/markdown/phonegap/evaluation/30.png)

然後對unsorted_times進行milisecond的排序 `unsorted_times.sort(compareMilli);`

	function compareMilli(a,b) {
	   if(a.milli < b.milli) return -1; 
	   //若 a 小於 b，在排序後的數組中 a 應該出現在 b 之前，則返回一個小於 0 的值。
	   if(a.milli > b.milli) return 1;  
	   //若 a 大於 b，在排序後的數組中 a 應該出現在 b 之前，則返回一個小於 0 的值。
	   return 0; 
	   // 若 a 等於 b，則返回 0。
	}

最後把unsorted_times output出來就完成了

#接下來需要寫個小型演算法

需要嗎?

可能只是要做畫面？

但又想要做出來...但是花挺多時間的 , 先做畫面好了

先記下想法:

1. 根據date日期/read 分組 =>所以date:x * read:2 

2. 分成各組後 放入各自的Array中 進行milisecond排序

3. 然後一組一組分到不同的unread/read

4. 標記星號的 => important:true抓出來


5. 根據date日期 分組

6. 分成各組後 放入各自的Array中 進行milisecond排序

7. 照著時間順序 顯示在important上






#  在app上跟在server上一樣都可以發出ajax

[link](http://stackoverflow.com/questions/16648753/sending-and-receiving-json-data-phonegap-jquery-mobile-app-using-ajax)

































