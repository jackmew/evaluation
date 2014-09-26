/* http://demos.jquerymobile.com/1.4.1/datepicker/ */
$(function(){
	app.init();
});
var app = {
	init : function(){
		datepicker.init();
		calendar.init();
	}
}

var datepicker = {
	init : function(){
		$( "#datepicker" ).datepicker({
			// changeMonth: true,
	        // changeYear: true,
	        // showButtonPanel: true,
		    onSelect: function(date) {
		        alert(date);
		    }
		});
	}
}

var calendar = {
	eventWrapper : {
		id: 2156,
        title: "2156(L1)", 
        start: "2014-09-18",
        end: "2014-09-25",
        color: "#3a87ad"
	},
	init : function(){
		//alert(this.eventWrapper.id);
		this.instantiate();
		this.addEvent();
	},
	instantiate : function(){
		$('#calendar').fullCalendar({
		    theme: true,
		    contentHeight: 400,
		    header: {
		      left: 'prev,today,next ',
		      center: 'title',
		      right: 'month,agendaWeek,agendaDay'
		    },
		    defaultDate: '2014-09-12',
		    editable: true,
		    eventLimit: true,
		    events: [
		      {
		          id : this.eventWrapper.id,
		          title  : this.eventWrapper.title,
		          start  : this.eventWrapper.start,
		          end : this.eventWrapper.end
		      }
		    ]
		    
		});
		this.render();
	},
	//最困擾的地方
	render : function(){
		setTimeout(function(){
		    /* render calender */
		    $('#calendar').fullCalendar('render');		  
		  }, 100);
	},
	addEvent : function (){
		$("#addCalendarEvent").on("click",this.addCalendarEventClick);
		$("#removeCalendarEvent").on("click",this.removeCalendarEvent);

	},
	addCalendarEventClick : function (){
		var eventDate = {
		    title: 'jackho',
		    id: 1,
		    start: new Date(2014,9,2), //月份 +1 才是現在月份
		    end: new Date(2014,9,14),
		    color: "pink"
		    // ,
		    // textColor: "black",
		    // backgroundColor: "green",
		    // borderColor: "purple"
		  }
		 $('#calendar').fullCalendar('renderEvent', eventDate, true); // stick? = true
	},
	removeCalendarEvent : function (){
		$("#calendar").fullCalendar('removeEvents',1); // 1 => id
	}
}


