$(document).ready(function(){
	//global variable
	//messageArr = [];

	var object1 = new myObject('Charlie');
	object1.whoAmI();

	// var object2 = new myObject('Frank');
	// object2.whoAmI();

	//myObjectLiteral.init('Jack');
	// myObjectLiteral.init(j);
	// myObjectLiteral.whoAmI();
});


var j = 'jack';

var myObjectLiteral = {
	//name : '',
	init : function(name){
		this.name = name;
	},
	whoAmI : function(){
		console.log(this.name);
	}
}
function myObject(name){
	this.name = name;
	//this.iAm = 'an object';
	this.whoAmI = function(){
		console.log('I am ' + this.name);
	};
};

/*
function allReady(){
	function home(){
	
	}

	function contact(){
	
	}

	function systemMessage(){
	
	}

	function discussion(){
	
	}
}
*/

/* 模仿 phonegap 一開始sample的寫法 */
