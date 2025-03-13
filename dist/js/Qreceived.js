var allpools = "init";
var allvolumes = "init";
var allpartners = "init";
var allsnaps = "init";
var allpsnapstable = {};
var filterstable = {};
var newsnaps = "init";
var cpool = "init";
var firstRequests = 3;
var filteredsnaps = {};
function poolsrefresh() {
	$.ajax({
		url: "/api/v1/volumes/poolsinfo",
		dataType: "json",
		data: { 'token': hypetoken },
		// timeout: 3000,
		// Additional AJAX parameters go here; see the end of this chapter for the full code of this example
		type: "GET",
		async: false,
		success: function (data) {
			allpools = data;
			allpools["results"].unshift({ id: -1, owner: "Any", text: "Any" });
			firstRequests = firstRequests - 1;
		},
	});
	var newallpartners = [];
	$.each(allpools["results"], function (e, t) {
		newallpartners.push(t);
	});

	$(".select2.pool").select2({
		placeholder: "Select a pool",
		data: newallpartners,
	});

	// $(".select2.pool").select2({
	// 	placeholder: "Select a pool",
	// 	ajax: {
	// 		url: "/api/v1/volumes/poolsinfo",
	// 		dataType: "json",
	// 		// timeout: 3000,
	// 		// Additional AJAX parameters go here; see the end of this chapter for the full code of this example
	// 		type: "GET",
	// 		async: false,
	// 		success: function (data) {
	// 			allpools = data;
	// 			allpools["results"].unshift({ id: -1, owner: "Any", text: "Any" });
	// 			firstRequests = firstRequests - 1;
	// 		},
	// 	},
	// });
}
poolsrefresh();

function volumesrefresh() {
	var newallvolumes = "";
	var reload = 0;
	if ($("#Pool2").val() == "") {
		newallvolumes = "";
	} else {
		$.ajax({
			url: "/api/v1/volumes/volumelist",
			dataType: "json",
			data: { 'token': hypetoken },
			// timeout: 3000,
			// Additional AJAX parameters go here; see the end of this chapter for the full code of this example
			type: "GET",
			async: false,
			success: function (data) {
				newallvolumes = data;
				newallvolumes.unshift({
					fullname: "Any",
					id: -1,
					pool: "Any",
					text: "Any",
				});
			},
		});

		if (JSON.stringify(allvolumes) != JSON.stringify(newallvolumes)) {
			allvolumes = JSON.parse(JSON.stringify(newallvolumes));
			newallvolumes = [];
			$.each(allvolumes, function (e, t) {
				if (allvolumes[e]["pool"] == "Any") newallvolumes.push(t);
				else if (
					allvolumes[e]["pool"] == allpools["results"][parseInt($("#Pool2").val()) + 1]["text"]
				)
					newallvolumes.push(t);
			});
			reload = 1;
		}
		allvolumes = JSON.parse(JSON.stringify(newallvolumes));
		newallvolumes = [];
		$.each(allvolumes, function (e, t) {
			if (allvolumes[e]["pool"] == "Any") {
				newallvolumes.push(t);
			} else if (
				allvolumes[e]["pool"] == allpools["results"][parseInt($("#Pool2").val()) + 1]["text"]
			) {
				newallvolumes.push(t);
			}
		});
		reload = 1;
	}
	if (cpool != $("#Pool2").val()) {
		cpool = $("#Pool2").val();
		reload = 1;
	}
	$(".select2.volume").empty().trigger("change");
	$(".select2.volume").select2({
		placeholder: "Select a volume",
		data: newallvolumes,
	});
}

// function volumesrefresh() {
// 	$.ajax({
// 		url: "/api/v1/volumes/volumelist",
// 		dataType: "json",
// 		timeout: 3000,
// 		// Additional AJAX parameters go here; see the end of this chapter for the full code of this example
// 		type: "GET",
// 		async: false,
// 		success: function (data) {
// 			newallvolumes = data;
// 		},
// 	});
// 	$(".select2.volume").select2({
// 		placeholder: "Select a volume",
// 		data: newallvolumes,
// 	});
// }
// volumesrefresh();

// function partnersrefresh() {
// 	var newallpartners = "";
// 	var reload = 0;
// 	if ($("#volname").val() == "") {
// 		newallpartners = "";
// 	} else {
// 		$.ajax({
// 			url: "/api/v1/partners/partnerlist",
// 			dataType: "json",
// 			timeout: 3000,
// 			// Additional AJAX parameters go here; see the end of this chapter for the full code of this example
// 			type: "GET",
// 			async: false,
// 			success: function (data) {
// 				newallpartners = data;
// 			},
// 		});
// 		if (JSON.stringify(allvolumes) != JSON.stringify(newallpartners)) {
// 			allpartners = JSON.parse(JSON.stringify(newallpartners));
// 			newallpartners = [];
// 			$.each(allpartners["allpartners"], function (e, t) {
// 				if (t["type"].includes("ender") > 0) {
// 					t["text"] = t["alias"].split("_")[0];
// 					t["id"] = e;
// 					newallpartners.push(t);
// 				}
// 			});
// 			reload = 1;
// 		}
// 	}
// 	$(".select2.Sender").select2({
// 		placeholder: "Select a partner",
// 		data: newallpartners,
// 	});
// }

function partnersrefresh() {
	$.ajax({
		url: "/api/v1/partners/partnerlist",
		dataType: "json",
		data: { 'token': hypetoken },
		// timeout: 3000,
		// Additional AJAX parameters go here; see the end of this chapter for the full code of this example
		type: "GET",
		async: false,
		success: function (data) {
			newallpartners = data;
			firstRequests = firstRequests - 1;
		},
	});

	if (JSON.stringify(allvolumes) != JSON.stringify(newallpartners)) {
		allpartners = JSON.parse(JSON.stringify(newallpartners));
		allpartners["allpartners"].unshift({
			alias: "Any",
			ip: "Any",
			port: "Any",
			type: "Sender",
		});
		newallpartners = [];
		$.each(allpartners["allpartners"], function (e, t) {
			if (t["type"].includes("ender") > 0) {
				t["text"] = t["alias"].split("_")[0];
				t["id"] = e;
				newallpartners.push(t);
			}
		});
		reload = 1;
	}
	$(".select2.Sender").select2({
		placeholder: "Select a partner",
		data: newallpartners,
	});
}
partnersrefresh();

function getsnaps() {
	$.ajax({
		url: "api/v1/volumes/snapshots/snapshotsinfo",
		//timeout: 3000,
		data: { 'token': hypetoken },
		async: true,
		type: "GET",
		success: function (data) {
			newsnaps = data;
		},
	});
}

function snapsreferesh() {
	getsnaps();
	if (JSON.stringify(allsnaps) != JSON.stringify(newsnaps)) {
		allsnaps = JSON.parse(JSON.stringify(newsnaps));
		allpsnapstable["allsnaps"].clear();
		allpsnapstable["allsnaps"].rows.add(allsnaps["allsnaps"]);
		allpsnapstable["allsnaps"].draw();
		filterstable["allsnaps"].clear();
		filterstable["allsnaps"].rows.add(allsnaps["allsnaps"]);
		filterstable["allsnaps"].draw();
	}
}

function initalltables() {
	allpsnapstable["allsnaps"] = $("#allsnapstable").DataTable({
		order: [
			[0, "desc"],
			[1, "desc"],
		],
		data: allsnaps["allsnaps"],
		columns: [
			{ data: "date" },
			{ data: "time" },
			{
				data: "name",
				render: function (data, type, row) {
					return data.split(".")[0] + "." + data.split(".").pop();
				},
			},
			{ data: "pool" },
			{
				data: null,
				render: function (data, type, row) {
					return row.volume.split("_")[0];
				},
			},

			{ data: "partnerS" },
			{ data: "snaptype" },
			{ data: "used" },
			{ data: "refcompressratio" },
			{
				data: null,
				render: function (data, type, row) {
					return (
						'<a class="snapdelegt" val="username" href="javascript:rollback(\'' +
						row.name +
						"')\" >" +
						'<img  src="dist/img/return.png" data-name=' +
						row.name +
						' alt="cannott upload delete icon">' +
						"</a>"
					);
				},
			},
			{
				data: null,
				render: function (data, type, row) {
					return (
						'<a class="snapdelegt" val="username" href="javascript:asnapdel(\'' +
						row.name +
						"')\" >" +
						'<img  src="dist/img/delete.png" data-name=' +
						row.name +
						' alt="cannott upload delete icon">' +
						"</a>"
					);
				},
			},
		],
		columnDefs: [
			{
				createdCell: function (td, cellData, rowData, row, col) {
					$(td).data("grps", "cell-" + cellData);
				},
			},
			{
				targets: 0,
				render: function (data, type, row) {
					if (type === 'display') {
						return fixDate(row); 
					} else if (type === 'sort') {
						return row.name.split('.')[1];
					}
					return data;
				}
			},
			{
				targets: 1,
				"orderable": false,
			},
		],
	});
	allpsnapstable["allsnaps"].buttons().container().appendTo("#allsnapstable_wrapper .col-6:eq(0)");
	filterstable["allsnaps"] = $("#filterstable").DataTable({
		order: [
			[0, "desc"],
			[1, "desc"],
		],
		data: filteredsnaps,
		columns: [
			{ data: "date" },
			{ data: "time" },
			{
				data: "name",
				render: function (data, type, row) {
					return data.split(".")[0] + "." + data.split(".").pop();
				},
			},
			{ data: "pool" },
			{
				data: null,
				render: function (data, type, row) {
					return row.volume.split("_")[0];
				},
			},
			{ data: "partnerS" },
			{ data: "snaptype" },
			{ data: "used" },
			{ data: "refcompressratio" },
			{
				data: null,
				render: function (data, type, row) {
					return (
						'<a class="snapdelegt" val="username" href="javascript:rollback(\'' +
						row.name +
						"')\" >" +
						'<img  src="dist/img/return.png" data-name=' +
						row.name +
						' alt="cannott upload delete icon">' +
						"</a>"
					);
				},
			},
			{
				data: null,
				render: function (data, type, row) {
					return (
						'<a class="snapdelegt" val="username" href="javascript:asnapdel(\'' +
						row.name +
						"')\" >" +
						'<img  src="dist/img/delete.png" data-name=' +
						row.name +
						' alt="cannott upload delete icon">' +
						"</a>"
					);
				},
			},
		],
		columnDefs: [
			{
				createdCell: function (td, cellData, rowData, row, col) {
					$(td).data("grps", "cell-" + cellData);
				},
			},
			{
				targets: 0,
				render: function (data, type, row) {
					if (type === 'display') {
						return fixDate(row); 
					} else if (type === 'sort') {
						return row.name.split('.')[1];
					}
					return data;
				}
			},
			{
				targets: 1,
				"orderable": false,
			},
		],
	});
	filterstable["allsnaps"].buttons().container().appendTo("#allsnapstable_wrapper .col-6:eq(0)");
	$.fn.dataTable.ext.search.push(function(settings,data,dataIndex){
		if(settings.nTable.id === 'filterstable'){
			if(data[5].length == 1 )
				return false;
		}
		return true;
	});
	$.ajax({
		url: "api/v1/volumes/snapshots/snapshotsinfo",
		//timeout: 3000,
		data: { 'token': hypetoken },
		async: false,
		type: "GET",
		success: function (data) {
			newsnaps = data;
			firstRequests = firstRequests - 1;
		},
	});
	if (JSON.stringify(allsnaps) != JSON.stringify(newsnaps)) {
		allsnaps = JSON.parse(JSON.stringify(newsnaps));
		filteredsnaps = allsnaps['allsnaps'].filter(function(el){  return el['partnerS'] !== '-'; })
		allpsnapstable["allsnaps"].clear();
		allpsnapstable["allsnaps"].rows.add(allsnaps["allsnaps"]);
		allpsnapstable["allsnaps"].draw();
		filterstable["allsnaps"].clear();
		console.log('allsnap',filteredsnaps)
		filterstable["allsnaps"].rows.add(filteredsnaps);
		filterstable["allsnaps"].draw();
	}
}
initalltables();

function refreshall() {
	updatetasks();
	$(".odd").css("background-color", "rgba(41,57,198,.1)");
	snapsreferesh();
}
$("table").css("width", "100%");
setInterval(refreshall, 2000);
firstRequestsInterval = setInterval(() => {
	if (firstRequests == 0) {
		$("#Loading").addClass("show_or_hide_other");
		setTimeout(() => {
			console.log("FirstRequests Done");
			clearInterval(firstRequestsInterval);
		}, 10);
	}
}, 100);

$("#Pool2").change(function (e) {
	var volumeFilter = $("#Pool2 :selected").text();
	var filteredtable = $("#filterstable").DataTable();
	if (volumeFilter == "Any" || volumeFilter == "")
		filteredtable.columns(3).search("", true, false).draw();
	else
		filteredtable
			.columns(3)
			.search("^" + volumeFilter + "$", true, false)
			.draw();
	volumesrefresh();
});

$("#volname").change(function (e) {
	var volumeFilter = $("#volname :selected").text();
	var filteredtable = $("#filterstable").DataTable();
	if (volumeFilter == "Any" || volumeFilter == "")
		filteredtable.columns(4).search("", true, false).draw();
	else
		filteredtable
			.columns(4)
			.search("^" + volumeFilter + "$", true, false)
			.draw();
});

$("#Sender").change(function (e) {
	var volumeFilter = $("#Sender :selected").text();
	var filteredtable = $("#filterstable").DataTable();
	if (volumeFilter == "Any" || volumeFilter == "")
		filteredtable.columns(5).search("", true, false).draw();
	else
		filteredtable
			.columns(5)
			.search("^" + volumeFilter + "$", true, false)
			.draw();
});
