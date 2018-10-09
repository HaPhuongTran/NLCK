$(document).ready(function(){
	$(".roomDetail").load("detailroom.html");
	$(".tableDecive").load("componentroom.html", function(){
		saveDeviceHome();
	});
	var getNameHome = localStorage.getItem("storageNameHome");
	var dataHome;
	var status_create;
	var loadRoom = 0;
	var dataRoomGet;
	var listRoom;
	var nameRoom;
	var idRoom;
	$(".room-table").hide();

	//Begin get home
	$.ajax({
			async : false,
			method: "get",
			contentType: "application/json",
			url: "http://localhost:8080/smarthome/gethome/"+getNameHome,
	}).done(function(data, textStatus, xhr){
		dataHome = data;
	});
	//End get Home


	//Begin list room
	$.ajax({
			async : false,
			method: "get",
			contentType: "application/json",
			url: "http://localhost:8080/smarthome/getlistrooms/"+ getNameHome,
	}).done(function(data, textStatus, xhr){
		listRoom = data;
	});
	//End get list room


	for(loadRoom; loadRoom < listRoom.length; loadRoom++){
		appendRoom(loadRoom);
		$(".nameroom"+loadRoom).val(listRoom[loadRoom].nameRoom);
		$(".idroom"+loadRoom).val(listRoom[loadRoom].id);
		saveRoom(loadRoom);
		deleteRoom(loadRoom);
		roomDetail(loadRoom);
	}


	function appendRoom(countRoom){
  		$("tbody").append(
  			"<tr class = 'row"+countRoom+"'>"
  				+ "<td class = 'roomnamecol"+countRoom+"'>"
	  				+ "<input placeholder='Room Name' type='text' id='nameroom' class='form-control nameroom"+countRoom+"'>"
	  				+ "<input type='hidden' class='form-control idroom"+countRoom+"'>"
  				+ "</td>"

  				// + "<td class = 'componentcol"+countRoom+"'>"
  				// 	+ "<a class='trigger info-color text-white addDevice"+countRoom+"' data-toggle='modal' data-target='.tableDecive'>Add<i class='fa fa-plus ml-2'></i></a>"
  				// + "</td>"

  				+ "<td class = 'componentcol"+countRoom+"'>"
  					+ "<a class='trigger info-color text-white detail"+countRoom+"' data-toggle='modal' data-target='.roomDetail'>Detail<i class='fa'></i></a>"
  				+ "</td>"

  				+ "<td class = 'homenamecol"+countRoom+"'>"
  					+ "<p class = 'homename'>"+getNameHome+"</p>"
  				+ "</td>"

  				+ "<td class = 'closecol"+countRoom+"'>"
	  				+ "<a><i class='fa fa-save mx-1 save-btn"+countRoom+"'></i></a>"
	  				+ "<a><i class='fa fa-times mx-1 delete-btn"+countRoom+"'></i></a>"
  				+ "</td>"
  			+"</tr>");
  		$(".room-table").show();
	}

	function deleteRoom(deleteCountRoom){
		$(".delete-btn"+deleteCountRoom).click(function(){
			nameRoom = $(".nameroom"+ deleteCountRoom).val();
			idRoom = idRoom = parseInt($(".idroom"+ deleteCountRoom).val());
			$(".row"+deleteCountRoom).remove();
			

			//Begin delete room
		    $.ajax({
				async : false,
				method: "post",
				data: JSON.stringify({id: idRoom, nameRoom:nameRoom }),
				contentType: "application/json",
				url: "http://localhost:8080/smarthome/deleteroom"
			}).done(function(data, textStatus, xhr){
				status_create = xhr.status;
			});
		// //End delete room
		});
	}


	function saveRoom(saveCount){
		$(".save-btn"+saveCount).click(function(){
  			nameRoom = $(".nameroom"+ saveCount).val();
  			idRoom = parseInt($(".idroom"+ saveCount).val());
  			if(isNaN(idRoom)|| idRoom == null){
  				idRoom = 0;
  			}
  			//Begin create room
		    $.ajax({
				async : false,
				method: "post",
				data: JSON.stringify({ id: idRoom, homeId:dataHome, nameRoom:nameRoom }),
				contentType: "application/json",
				url: "http://localhost:8080/smarthome/createroom"
			}).done(function(data, textStatus, xhr){
				status_create = xhr.status;
			});
			//End create room
			getRoom(saveCount);
		});
	}


	function getRoom(getRoomCount){
	    $.ajax({
		async : false,
		method: "get",
		contentType: "application/json",
		url: "http://localhost:8080/smarthome/getroom/"+ nameRoom,
		}).done(function(data, textStatus, xhr){
			dataRoomGet = data;
		});
		
		// Set value for fields value 
		$(".nameroom"+getRoomCount).val(dataRoomGet.nameRoom);
		$(".idroom"+getRoomCount).val(dataRoomGet.id);
	}

	function addcomponent(){
		var chkArray = [];
		$(".component-check:checked").each(function(){
			chkArray.push($(this).val());
		});
		// alert(chkArray);
		var selected;
		selected = chkArray.join(',') ;
		alert(selected);
	}

	function roomDetail(roomDetailCount){
		$(".detail"+roomDetailCount).click(function(){
			$(".roomName").html($(".nameroom"+ roomDetailCount).val());
			upAndDown();
			
		});
	}

	function saveDeviceHome(){
		$(".btn-ok").click(function(){
			addcomponent();
		});
	}

	function upAndDown(){
		$("#btn-up2, #btn-up3, #btn-up4, #btn-up5, #btn-up6, #btn-up7").click(function(){
			
			var btnid = $(this).attr("id");
			// alert(testid);
			if(btnid == "btn-up2"){
				setGetValue("HD", 1);
			}
			else if(btnid == "btn-up3") {
				setGetValue("TD", 1);
			}
			else if(btnid == "btn-up4") {
				setGetValue("AC", 1);
			}
			else if(btnid == "btn-up5") {
				setGetValue("HE", 1);
			}
			else if(btnid == "btn-up6") {
				setGetValue("Ne", 1);
			}
			else if(btnid == "btn-up7") {
				setGetValue("De", 1);
			}
			
		});

		$("#btn-down2, #btn-down3, #btn-down4, #btn-down5, #btn-down6, #btn-down7").click(function(){
			
			var btnid = $(this).attr("id");
			// alert(testid);
			if(btnid == "btn-down2"){
				setGetValue("HD", 0);
			}
			else if(btnid == "btn-down3") {
				setGetValue("TD", 0);
			}
			else if(btnid == "btn-down4") {
				setGetValue("AC", 0);
			}
			else if(btnid == "btn-down5") {
				setGetValue("HE", 0);
			}
			else if(btnid == "btn-down6") {
				setGetValue("Ne", 0);
			}
			else if(btnid == "btn-down7") {
				setGetValue("De", 0);
			}
			
		});

	}

	function setGetValue(nametag, number){
		var value = $("."+nametag).val();
		if(number == 1){
			value++;
		}
		else if (value >1){
			value--;
				
		}
		$("."+nametag).val(value);
	}

  	$(".add-btn").click(function(){
  		appendRoom(loadRoom + 1);
 		saveRoom(loadRoom + 1);
 		deleteRoom(loadRoom + 1);
 		roomDetail(loadRoom + 1);
 		saveDeviceHome();
		loadRoom++;
  	});
});