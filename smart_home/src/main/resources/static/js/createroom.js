
 $(document).ready(function(){

	$(".roomDetail").load("detailroom.html");
	$(".tableDevice").load("componentroom.html", function(){
		addDeviceHome();
	});

	var getNameHome = localStorage.getItem("storageNameHome");
	var dataHome;
	var status_create;
	var loadRoom = 0;
	var dataRoomGet;
	var listRoom;
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
	  				+ "<a><i class='fa fa-save mx-1 btn-saveRoom"+countRoom+"'></i></a>"
	  				+ "<a><i class='fa fa-times mx-1 delete-btn"+countRoom+"'></i></a>"
  				+ "</td>"
  			+"</tr>");
  		$(".room-table").show();
	}

	function deleteRoom(deleteCountRoom){
		$(".delete-btn"+deleteCountRoom).click(function(){
			var nameRoom = $(".nameroom"+ deleteCountRoom).val();
			idRoom = parseInt($(".idroom"+ deleteCountRoom).val());
			
			//Begin delete room
		    $.ajax({
				method: "delete",
				data: JSON.stringify({id: idRoom, nameRoom:nameRoom }),
				contentType: "application/json",
				url: "http://localhost:8080/smarthome/deleteroom"
			}).done(function(data, textStatus, xhr){
				status_create = xhr.status;
			});
			if(status_create == 200){
			idRoom = parseInt($(".idroom"+ deleteCountRoom).val());
			}
		// //End delete room
		});
	}

	function saveRoom(saveCount){
		$(".btn-saveRoom"+saveCount).click(function(){
			var nameRoom = $(".nameroom"+saveCount).val();
  			idRoom = parseInt($(".idroom"+ saveCount).val());
  			if(isNaN(idRoom)|| idRoom == null){
  				idRoom = 0;
  			}
  			//Begin create room
		    $.ajax({
				method: "post",
				data: JSON.stringify({ id: idRoom, homeId:dataHome, nameRoom:nameRoom }),
				contentType: "application/json",
				url: "http://localhost:8080/smarthome/createroom"
			}).done(function(data, textStatus, xhr){
				status_create = xhr.status;
			});
			//End create room
			// getRoom(saveCount, nameRoom);
		});
	}

	function saveDevice(){
		$(".btn-saveDevice").click(function(){
			$.ajax({
				method: "post",
				contentType: "application/json",
				url:"http://localhost:8080/smarthome/savedevice",
				data: JSON.stringify(getDeviceSave()) 
			}).done(function(){

			})
		});
	}

	function getDeviceSave(){
		var listDevice = [];
		var deviceCount = $(".Device tr").length -2;
		while(deviceCount>=0){
			var tempListDevice = {ip:$(".IPDevice"+deviceCount).val(), nameDevice:$(".deviceName"+ deviceCount).val(),roomId: dataRoomGet};
			listDevice.push(tempListDevice);
			deviceCount--;
		}
		return listDevice;
	}

	function deleteDevice(deviceCount){
		$(".deletedevice-btn"+deviceCount).click(function(){
			$.ajax({
				url:"",
				method:"delete"
			});
			$("#device"+deviceCount).remove();
		});
	}

	function getRoom(getRoomCount, nameroom){
	    $.ajax({
		async : false,
		method: "get",
		contentType: "application/json",
		url: "http://localhost:8080/smarthome/getroom/"+ nameroom
	    }).done(function(data, textStatus, xhr){
			dataRoomGet = data;
		});
		// Set value for fields value 
		$(".nameroom"+getRoomCount).val(dataRoomGet.nameRoom);
		$(".idroom"+getRoomCount).val(dataRoomGet.id);
	}


	function roomDetail(roomDetailCount){
		$(".detail"+roomDetailCount).click(function(){
			getRoom(roomDetailCount, $(".nameroom"+roomDetailCount).val());
			$(".roomName").html(dataRoomGet.nameRoom);
		});
	}

	function addDeviceHome(){
		$(".btn-ok").click(function(){
			if(($('.Device tr').length - 1)>0){
				addcomponent($('.Device tr').length - 1);
			}else{
				addcomponent(0);
			}
			saveDevice();
		});
		upAndDown();
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
		var test = getTempatureHumidity();
		$.each(componentArray, function(index, value){
			switch(value){
				case 'Humidity Device':
					addDevice(value, deviceCount, 0, test[0].temperature , "");
					controlDevice(deviceCount);
					deleteDevice(deviceCount);
					break;
				case 'Temperature Device':
					addDevice(value, deviceCount, test[1].humidity, 0, "");
					controlDevice(deviceCount);
					deleteDevice(deviceCount);
					break;
				case 'Air-Conditioner':
					addDevice(value, deviceCount, 0, 0, "");
					controlDevice(deviceCount);
					deleteDevice(deviceCount);
					break;
				case 'Heating Equipment':
					addDevice(value, deviceCount, 0, 0, "");
					controlDevice(deviceCount);
					deleteDevice(deviceCount);
					break;
				case 'Nebulizer':
					addDevice(value, deviceCount, 0, 0, "");
					controlDevice(deviceCount);
					deleteDevice(deviceCount);
					break;
				case 'Dehumidifier':
					addDevice(value, deviceCount, 0, 0, "");
					controlDevice(deviceCount);
					deleteDevice(deviceCount);               
					break;
			}
			deviceCount++;
		});
	}


	function addDevice(deviceName, deviceCount, temperature, humidity, state){
		$(".roomDetailTable").append(
  			"<tr class = 'row"+deviceCount+"' id = 'device"+deviceCount+"'>"
  				+ "<td class = 'ipDevice'>"
  					+ "<input type='text' placeholder ='0.0.0.0' class='form-control IPDevice"+deviceCount+"'>"
  				+ "</td>"

  				+ "<td class = 'deviceNameCol'>"
	  				+ "<input type='text' placeholder = '"+deviceName+"' ' class='form-control deviceName"+deviceCount+"'>"
  				+ "</td>"

  				+ "<td class = 'temperatureCol'>"
  					+ "<p class = 'temperature'>"+temperature+"°C</p>"
  				+ "</td>"

  				+ "<td class = 'humidityCol'>"
  					+ "<p class = 'humidity'>"+humidity+"%</p>"
  				+ "</td>"

  				+ "<td class = 'stateCol'>"
	  				+ "<lable class='bs-switch sm-switch"+deviceCount+"'>"
	  					+ "<input type = 'checkbox' class = 'switch"+deviceCount+"' "+state+">"
	  					+ "<span class = 'slider round'></span>"
	  				+ "</lable>"
  				+ "</td>"

  				+ "<td class = 'closecol'>"
	  				+ "<a><i class='fa fa-times mx-1 deletedevice-btn"+deviceCount+"'></i></a>"
  				+ "</td>"
  			+"</tr>");
	}

	function controlDevice(deviceCount){
		$(".sm-switch"+deviceCount).click(function(){
			if($(".switch"+deviceCount).is(':checked'))
				$(".switch"+deviceCount).attr("checked", false);
			else
				$(".switch"+deviceCount).attr("checked", true);
		});
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

	function getTempatureHumidity(){
		var temperture_humidity;
		$.ajax({
			async:false,
			url: "https://api.openweathermap.org/data/2.5/weather?q=Ho%20Chi%20Minh%20City,VN&APPID=efe6e214a09caa3cd0319cef3384a9fd&units=metric"
		}).done(function(data, textStatus, xhr){
			var temperHumi = '[{"temperature":"'+data.main.temp+'"}, {"humidity": "'+data.main.humidity+'"}]';
			temperture_humidity = JSON.parse(temperHumi);
		});
		return temperture_humidity;
	}

  	$(".add-btn").click(function(){
  		appendRoom(loadRoom + 1);
 		saveRoom(loadRoom + 1);
 		deleteRoom(loadRoom + 1);
 		roomDetail(loadRoom + 1);
 		addDeviceHome();
		loadRoom++;
  	});
});