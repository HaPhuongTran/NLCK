$(document).ready(function(){

	$(".roomDetail").load("detailroom.html");
	$(".tableDecive").load("componentroom.html", function(){
		getDeviceHome();
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
  		$(".table-room").append(
  			"<tr class = 'row"+countRoom+"'>"
  				+ "<td class = 'roomnamecol'>"
	  				+ "<input placeholder='Room Name' type='text' id='nameroom' class='form-control nameroom"+countRoom+"'>"
	  				+ "<input type='hidden' class='idroom"+countRoom+"'>"
  				+ "</td>"

  				+ "<td class = 'componentcol'>"
  					+ "<a class='trigger info-color text-white detail"+countRoom+"' data-toggle='modal' data-target='.roomDetail'>Detail<i class='fa'></i></a>"
  				+ "</td>"

  				+ "<td class = 'homenamecol'>"
  					+ "<p class = 'homename'>"+getNameHome+"</p>"
  				+ "</td>"

  				+ "<td class = 'closecol'>"
	  				+ "<a><i class='fa fa-save mx-1 save-btn"+countRoom+"'></i></a>"
	  				+ "<a><i class='fa fa-times mx-1 delete-btn"+countRoom+"'></i></a>"
  				+ "</td>"
  			+"</tr>");
  		$(".room-table").show();
	}

	function deleteRoom(deleteCountRoom){
		$(".delete-btn"+deleteCountRoom).click(function(){
			nameRoom = $(".nameroom"+ deleteCountRoom).val();
			idRoom = parseInt($(".idroom"+ deleteCountRoom).val());
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


	function roomDetail(roomDetailCount){
		$(".detail"+roomDetailCount).click(function(){
			$(".roomName").html($(".nameroom"+ roomDetailCount).val());
			upAndDown();
			
		});
	}

	function getDeviceHome(){
		$(".btn-ok").click(function(){
			if(($('.Device tr').length - 1)>0){
				addcomponent($('.Device tr').length - 1);
			}else{
				addcomponent(0);
			}
		});
	}

	function addcomponent(deviceCount){
		var componentArray = [];
		$(".component-check:checked").each(function(){
			var deviceNumber = $(("#"+$(this).val()).replace(/ /g, '')).val();
			while(deviceNumber>0){
				componentArray.push($(this).val());
				deviceNumber--;
			};
			$(".component-check").prop('checked', false);
		});
		$.each(componentArray, function(index, value){
			switch(value){
				case 'Humidity Device':
					addDevice(value, deviceCount, 0, 25 , "disabled");
					break;
				case 'Temperature Device':
					addDevice(value, deviceCount, 35, 0, "disabled");
					break;
				case 'Air-Conditioner':
					addDevice(value, deviceCount, 0, 0, "disabled");
					break;
				case 'Heating Equipment':
					addDevice(value, deviceCount, 0, 0, "disabled");
					break;
				case 'Nebulizer':
					addDevice(value, deviceCount, 0, 0, "disabled");
					break;
				case 'Dehumidifier':
					addDevice(value, deviceCount, 0, 0, "disabled");
					break;
			}
			deviceCount++;
		});
	}


	function addDevice(deviceName, deviceCount, temperature, humidity, state){
		$(".roomDetailTable").append(
  			"<tr class = 'row"+deviceCount+"'>"
  				+ "<td class = 'deviceNameCol'>"
	  				+ "<input type='text' value = '"+deviceName+"' id='devicesName' class='form-control deviceName"+deviceCount+"'>"
	  				+ "<input type='hidden' class='IPDevice"+deviceCount+"'>"
  				+ "</td>"
  				+ "<td class = 'temperatureCol'>"
  					+ "<p class = 'temperature'>"+temperature+"</p>"
  				+ "</td>"

  				+ "<td class = 'humidityCol'>"
  					+ "<p class = 'humidity'>"+humidity+"</p>"
  				+ "</td>"

  				+ "<td class = 'stateCol'>"
	  				+ "<lable class='bs-switch'>"
	  					+ "<input type = 'checkbox' "+state+">"
	  					+ "<span class = 'slider round'></span>"
	  				+ "</lable>"
  				+ "</td>"

  				+ "<td class = 'closecol'>"
	  				+ "<a><i class='fa fa-times mx-1 delete-btn"+deviceCount+"'></i></a>"
  				+ "</td>"
  			+"</tr>");
	}

	function upAndDown(){
		$("#btn-up-humidityDevice, #btn-up-temperatureDevice, #btn-up-airConditioner, #btn-up-heatingEquipment, #btn-up-nebulizer, #btn-up-dehumidifier").click(function(){
			switch($(this).attr("id")){
				case 'btn-up-humidityDevice':
					setGetValue("humidityDevice", 1);
					break;
				case 'btn-up-temperatureDevice':
					setGetValue("temperatureDevice", 1);
					break;
				case 'btn-up-airConditioner':
					setGetValue("airConditioner", 1);
					break;
				case 'btn-up-heatingEquipment':
					setGetValue("heatingEquipment", 1);
					break;
				case 'btn-up-nebulizer':
					setGetValue("nebulizer", 1);
					break;
				case 'btn-up-dehumidifier':
					setGetValue("dehumidifier", 1);
					break;
			}
		});
		$("#btn-down-humidityDevice, #btn-down-temperatureDevice, #btn-down-airConditioner, #btn-down-heatingEquipment, #btn-down-nebulizer, #btn-down-dehumidifier").click(function(){
			switch($(this).attr("id")){
				case 'btn-down-humidityDevice':
					setGetValue("humidityDevice", 0);
					break;
				case 'btn-down-temperatureDevice':
					setGetValue("temperatureDevice", 0);
					break;
				case 'btn-down-airConditioner':
					setGetValue("airConditioner", 0);
					break;
				case 'btn-down-heatingEquipment':
					setGetValue("heatingEquipment", 0);
					break;
				case 'btn-down-nebulizer':
					setGetValue("nebulizer", 0);
					break;
				case 'btn-down-dehumidifier':
					setGetValue("dehumidifier", 0);
					break;
			}
		});
	}

	function setGetValue(nameDecive, checkupdown){
		var value = $("."+nameDecive).val();
		if(checkupdown == 1){
			value++;
		}
		else if (value >1){
			value--;
		}
		$("."+nameDecive).val(value);
	}

  	$(".add-btn").click(function(){
  		appendRoom(loadRoom + 1);
 		saveRoom(loadRoom + 1);
 		deleteRoom(loadRoom + 1);
 		roomDetail(loadRoom + 1);
 		getDeviceHome();
		loadRoom++;
  	});
});