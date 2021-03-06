$(document).ready(function(){

const categories = ["health"];

for (let i = 0; i < categories.length; i++) {
	
	let btn = $("<button>");

	btn.attr({

		"type" : "button",
		"class": "btn btn-default navbar-btn potentials",
		"data-index": categories[i]

	}); 

	btn.css("margin-right" , "20px");

	btn.text(categories[i].toUpperCase());

	btn.appendTo(".nav-bar");


} // End of For Loop Let I

let btn = $("<button>");

btn.attr({

	"class": "btn btn-default ready",
	"data-index": "health"

});

btn.text("view");

btn.appendTo(".nav-bar");


$(".nav-bar").on("click" , ".potentials" , function(){

	let user = $(this).data("index");

	$(this).removeClass("btn-default potentials");

	$(".potentials").prop("disable" , true);

	console.log(user);

	$.post("/api/selection" , {pick:user}).
	done(function(data){

		alert("Scraped");


	});


}); // End of Click Handler for Nav Btns 
/*
<button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
  Launch demo modal
</button>


*/
$(".nav-bar").on("click" , ".ready" , function(){

	$.get("/api/viewing/").
	done(function(data){

		$.each(data, function(key , value){

			let div_main = $("<div>");

			div_main.addClass("panel panel-default");

			div_main.appendTo(".main");

			let div_title = $("<div>");

			div_title.addClass("panel-heading");

			div_title.appendTo(div_main);


			let note = $("<span>");


			note.attr({

				"class": "glyphicon glyphicon-pencil note",
				"aria-hidden": "true",
				"data-toggle" : "modal",
				"data-target": "#myModal",
				"data-news": data[key].title,
				"data-index": data[key]._id

			});




			let h3 = $("<h5>");

			h3.text(data[key].title);

			h3.appendTo(div_title);

			note.appendTo(div_title)

			let div_body = $("<div>");

			div_body.attr({
				"class": "panel-body",
				"data-body": key
			});



			div_body.appendTo(div_main);

			div_body.append(data[key].note);

		
		});

	}); 

}); // End of Click Handler for View

$(".main").on("click" , ".note" , function(){


	$(".news-title").text($(this).data("news"));

	var target = $(this).data("index");

	console.log(target);

	$('#myModal').on('shown.bs.modal', function () {
	  $('#myInput').focus()
	})


	$(".modal-footer").on("click" , "#submit" , function(){

		let notes = $("#notes").val().trim();

		var info = {
			notes:notes,
			target: target
		}

		$.post("/api/noting" , info ).
		done(function(data){


		});

		$.get("/api/viewing/").
		done(function(response){

			$.each(response, function(key , value){

				let div_main = $("<div>");

				div_main.addClass("panel panel-default");

				div_main.appendTo(".main");

				let div_title = $("<div>");

				div_title.addClass("panel-heading");

				div_title.appendTo(div_main);


				let note = $("<span>");


				note.attr({

					"class": "glyphicon glyphicon-pencil note",
					"aria-hidden": "true",
					"data-toggle" : "modal",
					"data-target": "#myModal",
					"data-news": response[key].title,
					"data-index": response[key]._id

				});




				let h3 = $("<h5>");

				h3.text(response[key].title);

				h3.appendTo(div_title);

				note.appendTo(div_title)

				let div_body = $("<div>");

				div_body.attr({
					"class": "panel-body",
					"data-body": key
				});



				div_body.appendTo(div_main);

				div_body.append(response[key].note);

			
			});

		}); 



	})

});


}); // End of Document Ready


/*
<div class="panel panel-default">
  <div class="panel-heading">
    <h3 class="panel-title">Panel title</h3>
  </div>
  <div class="panel-body">
    Panel content
  </div>
</div>
*/