$(function(){

	var fruits = ["Banana", "Orange", "Apple", "Mango"];
	fruits.sort();
	//console.log(fruits);
  fruits.reverse();
  //console.log(fruits);

	var points = [40, 100, 1, 5, 25, 10];
	points.sort(function(a, b){return b-a});
	//console.log(points);
	points.sort(function(a, b){return a-b});
	//console.log(points);


	var arr = new Array();
	function Person(name,age){
		this.name = name;
		this.age = age;
	};
	var jack = new Person('Jack',20);
	var frank = new Person('Frank',22);
	var charlie = new Person('Charlie',21);
  var may = new Person('May',23);
  var jason = new Person('Jason',24);


	arr.push(jack);
	arr.push(charlie);
	arr.push(frank);
  arr.push(may);
  arr.push(jason);
  /** sort by name **/
	// arr.sort(compareName);
	// console.log("sort by name :");
	// console.log(arr);
  /** sort by age **/
	// arr.sort(compareAge);
	// console.log("sort by age :");
	// console.log(arr);

	function compareAge(a,b) {
      if(a.age < b.age) return -1; 
      if(a.age > b.age) return 1; 
      return 0; 
      //return b.age - a.age;
  }
  function compareName(a,b) {
      if(a.name < b.name) return 1; 
      if(a.name > b.name) return -1; 
      return 0; 
  }

/////////////////////////////////////////////////////////////////////////////////////////
// jquery each
/*
$.each(arr,function(index,value){
  console.log(index+' : '+value.name+" , "+value.age);
});

var findName = getNameByAge();
console.log(findName);

function getNameByAge(){
  var name ;
    $.each(arr,function(index,value){ //在$.each中 return false表示中斷迴圈 
      if(value.age === 20){      //, return true(有值 ,not null ,not undefined) 表示迴圈繼續
         name = value.name;
         return false;
      }
    });
  return name;
}
*/
/////////////////////////////////////////////////////////////////////////////////////////
/*
1. 將字串讀進去 變成一筆一筆的存進array
2. 將每一筆讀出來 存成Object(html , datetime , milisecond)
3. 每一筆Object 集合存進去Array
4. Array.sort(根據milisecond大小排序)
5. 照順序印出來
*/
  var times = $(".test-moment").toArray();
  //console.log("times:"+times);
  var unsorted_times = new Array();
  //console.log("Converting");
  $.each(times,function(index,value){
     var dateTime = value.innerHTML;
     var moment_date = moment(dateTime);

     var unsorted_time = new Object();

     unsorted_time.html = value.outerHTML;
     unsorted_time.time = value.innerHTML;
     unsorted_time.milli = moment_date.valueOf();

     unsorted_times.push(unsorted_time);
  });
  
  // Sort the times:
  unsorted_times.sort(compareMilli);
  //console.log(unsorted_times);
  // add to html
  var sorted_html = "";
  $.each(unsorted_times,function(index,value){
    sorted_html = sorted_html + value.html;
  });

  $("#sorted-times").html(sorted_html);
  // Compare dates to sort
  function compareMilli(a,b) {
      if(a.milli < b.milli) return -1; //若 a 小於 b，在排序後的數組中 a 應該出現在 b 之前，則返回一個小於 0 的值。
      if(a.milli > b.milli) return 1;  //若 a 大於 b，在排序後的數組中 a 應該出現在 b 之前，則返回一個小於 0 的值。
      return 0; // 若 a 等於 b，則返回 0。
  }
/////////////////////////////////////////////////////////////////////////////////////////


});




