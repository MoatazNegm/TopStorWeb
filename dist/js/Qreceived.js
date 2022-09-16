var allpools = "init";
var allvolumes = "init";
var allpartners = "init";
var allsnaps = "init";
var allpsnapstable = {};
var filterstable = {};
var newsnaps = "init";
var cpool = "init";

function poolsrefresh() {
	$(".select2.pool").select2({
		placeholder: "Select a pool",
		ajax: {
			url: "/api/v1/volumes/poolsinfo",
			dataType: "json",
			timeout: 3000,
			// Additional AJAX parameters go here; see the end of this chapter for the full code of this example
			type: "GET",
			async: false,
			success: function (data) {
				allpools = data;
			},
		},
	});
}
poolsrefresh();

function volumesrefresh() {
	var newallvolumes = "";
	var reload = 0;
	console.log($("#Pool2").val());
	if ($("#Pool2").val() == "") {
		newallvolumes = "";
	} else {
		$.ajax({
			url: "/api/v1/volumes/volumelist",
			dataType: "json",
			timeout: 3000,
			// Additional AJAX parameters go here; see the end of this chapter for the full code of this example
			type: "GET",
			async: false,
			success: function (data) {
				newallvolumes = data;
			},
		});
		if (JSON.stringify(allvolumes) != JSON.stringify(newallvolumes)) {
			allvolumes = JSON.parse(JSON.stringify(newallvolumes));
			newallvolumes = [];
			$.each(allvolumes, function (e, t) {
				if (allvolumes[e]["pool"] == allpools["results"][$("#Pool2").val()]["text"]) {
					newallvolumes.push(t);
				}
			});
			reload = 1;
		}
	}
	if (cpool != $("#Pool2").val()) {
		cpool = $("#Pool2").val();
		reload = 1;
	}
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
		// timeout: 3000,
		// Additional AJAX parameters go here; see the end of this chapter for the full code of this example
		type: "GET",
		async: false,
		success: function (data) {
			newallpartners = data;
		},
	});
	if (JSON.stringify(allvolumes) != JSON.stringify(newallpartners)) {
		allpartners = JSON.parse(JSON.stringify(newallpartners));
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
		async: true,
		type: "GET",
		success: function (data) {
			newsnaps = data;
			// if (firstRequests == 1) firstRequests = 0;
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
			{
				data: null,
				render: function (data, type, row) {
					return fixDate(row);
				},
			},
			{ data: "time" },
			{
				data: "name",
				render: function (data, type, row) {
					return data.split(".")[0] + "." + data.split(".").pop();
				},
			},
			{
				data: null,
				render: function (data, type, row) {
					return row.volume.split("_")[0];
				},
			},
			{ data: "partnerR" },
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
		],
	});
	allpsnapstable["allsnaps"].buttons().container().appendTo("#allsnapstable_wrapper .col-6:eq(0)");
	filterstable["allsnaps"] = $("#filterstable").DataTable({
		order: [
			[0, "desc"],
			[1, "desc"],
		],
		data: allsnaps["allsnaps"],
		columns: [
			{
				data: null,
				render: function (data, type, row) {
					return fixDate(row);
				},
			},
			{ data: "time" },
			{
				data: "name",
				render: function (data, type, row) {
					return data.split(".")[0] + "." + data.split(".").pop();
				},
			},
			{
				data: null,
				render: function (data, type, row) {
					return row.volume.split("_")[0];
				},
			},
			{ data: "partnerR" },
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
		],
	});
	filterstable["allsnaps"].buttons().container().appendTo("#allsnapstable_wrapper .col-6:eq(0)");
	$.ajax({
		url: "api/v1/volumes/snapshots/snapshotsinfo",
		//timeout: 3000,
		async: false,
		type: "GET",
		success: function (data) {
			newsnaps = data;
		},
	});
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
initalltables();

function refreshall() {
	updatetasks();
	$(".odd").css("background-color", "rgba(41,57,198,.1)");
	snapsreferesh();
}
$("table").css("width", "100%");
// refreshall();
setInterval(refreshall, 2000);
$("#Pool2").change(function (e) {
	console.log(e.target.innerText);
	volumesrefresh();
});

$("#volname").change(function (e) {
	console.log(e.target.innerText);
	// partnersrefresh();
});

$("#Sender").change(function (e) {
	console.log(e.target.innerText);
	// partnersrefresh();
});
