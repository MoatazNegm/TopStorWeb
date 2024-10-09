var refresherprop = 2;
var newsnaps = "init";
var refresheruser = 2;
var userpass = "hi";
var proptime = "55:55:55";
var olddata = 0;
var propdata = "hi";
var oldproprdata = "dakfj";
var chartcards = ["quota", "used", "usedbysnapshots"];
var charts = {};
var proptimenew = "33:333:33";
var prop = {};
var prop2 = {};
var selprop = 0;
var hostips = {};
var DNS = 1;
var oldcurrentinfo = "dlkfajsdl;";
var redflag = "";
var mydate;
var tempvar;
var allusers = "init";
var allpartners = "init";
var allusersnohome = "init";
var allvolumes = "init";
var allgroups = "";
var allpools = "init";
var allsnaps = "init";
var selvalues = {};
var grpolddata;
var myidhash;
var mytimer;
var mymodal;
var cgrp = {};
var cuser = {};
var volumelistflag = 0;
var userdata = "dksfj";
var olduserdata = "ksksksks";
var voldata = "hihihi";
var oldvoldata = "n;nolnlnn";
var volumes = { NoHome: "NoHome" };
var idletill = 480000;
var oldhdata = "dkd";
var oldpdata = "dkedfd";
var oldddata = "dkjlf";
var oldrdata = "kfld";
var volstats = "init";
var stat = "quota";
var selhosts = "";
var seldhosts = "";
var changedprop = {};
var modaltill = idletill - 120000;
var onceinittable;
var allperiodstable = {};
var allpsnapstable = {};
var cpool = "init";
var cvolume = "init";
var cpartner = "init";
var dirtylog = 1;
var allperiods = ["Minutely", "Hourly", "Weekly"];
//var allperiods = ['Minutely', 'Minutely', 'Minutely'];
var firstRequests = 1;
function poolsrefresh() {
	$(".select2.pool").select2({
		placeholder: "Select a pool",
		ajax: {
			url: "/api/v1/volumes/poolsinfo",
			dataType: "json",
			data: { 'token': hypetoken },
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
	if ($("#Pool2").val() == "") {
		newallvolumes = "";
	} else {
		$.ajax({
			url: "/api/v1/volumes/volumelist",
			dataType: "json",
			data: { 'token': hypetoken },
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

function partnersrefresh() {
	var newallpartners = "";
	var reload = 0;
	if ($("#volname").val() == "") {
		newallpartners = "";
	} else {
		$.ajax({
			url: "/api/v1/partners/partnerlist",
			dataType: "json",
			data: { 'token': hypetoken },
			timeout: 3000,
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
				if (t["type"].includes("ceiver") > 0) {
					t["text"] = t["alias"].split("_")[0];
					t["id"] = e;
					newallpartners.push(t);
				}
			});
			reload = 1;
		}
	}
	console.log("newall", newallpartners);
	$(".select2.receiver").select2({
		placeholder: "Select a partner",
		data: newallpartners,
	});
}

function getsnaps() {
	$.ajax({
		url: "api/v1/volumes/snapshots/snapshotsinfo",
		//timeout: 3000,
		data: { 'token': hypetoken },
		async: true,
		type: "GET",
		success: function (data) {
			newsnaps = data;
			if (firstRequests == 1) firstRequests = 0;
		},
	});
}
//allsnaps = getsnaps();

function initalltables() {
	var alls = [];
	$.each(allsnaps["once"], function (e, t) {
		if (t["partnerR"].length > 2) {
			alls.push(t);
		}
	});
	onceinittable = $("#Oncetable").DataTable({
		order: [
			[0, "desc"],
			[1, "desc"],
		],
		data: alls,
		columns: [
			{ data: "date" },
			{ data: "time" },
			{ data: "name" },
			{
				data: null,
				render: function (data, type, row) {
					return row.volume.split("_")[0];
				},
			},

			{
				data: null,
				render: function (data) {
					return data["partnerR"].split("_")[0];
				},
			},
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
	onceinittable.buttons().container().appendTo("#Oncetable_wrapper .col-6:eq(0)");
	alls = [];
	$.each(allsnaps["allsnaps"], function (e, t) {
		if (t["partnerR"].length > 2) {
			alls.push(t);
		}
	});
	allpsnapstable["allsnaps"] = $("#allsnapstable").DataTable({
		order: [
			[0, "desc"],
			[1, "desc"],
		],
		data: alls,
		columns: [
			{ data: "date" },
			{ data: "time" },
			{
				data: "name",
				render: function (data, type, row) {
					return data.split(".")[0] + "." + data.split(".").pop();
				},
			},
			{
				data: null,
				render: function (data) {
					return data["partnerR"].split("_")[0];
				},
			},
			{
				data: null,
				render: function (data, type, row) {
					return row.volume.split("_")[0];
				},
			},
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
	try {
		t = "Minutely";
		alls = [];
		$.each(allsnaps[t + "period"], function (e, tt) {
			if (tt["receiver"] != "NoReceiver") {
				alls.push(tt);
			}
		});
		allperiodstable[t] = $("#" + t + "periods").DataTable({
			order: [
				[0, "desc"],
				[1, "desc"],
			],
			data: alls,
			columns: [
				{ data: "id" },
				{
					data: null,
					render: function (data, type, row) {
						return row.volume.split("_")[0];
					},
				},
				{ data: "receiver" },
				{ data: "every" },
				{ data: "keep" },
				{
					data: null,
					render: function (data, type, row) {
						return (
							'<a class="snapdelegt" val="username" href="javascript:aperioddel(\'' +
							row.id +
							"')\" >" +
							'<img  src="dist/img/delete.png" data-name=' +
							row.id +
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
		allperiodstable[t]
			.buttons()
			.container()
			.appendTo("#" + t + "periods_wrapper .col-6:eq(0)");
		t = "Hourly";
		alls = [];
		$.each(allsnaps[t + "period"], function (e, tt) {
			if (tt["receiver"] != "NoReceiver") {
				alls.push(tt);
			}
		});
		allperiodstable[t] = $("#" + t + "periods").DataTable({
			order: [
				[0, "desc"],
				[1, "desc"],
			],
			data: alls,
			columns: [
				{ data: "id" },
				{
					data: null,
					render: function (data, type, row) {
						return row.volume.split("_")[0];
					},
				},
				{ data: "receiver" },
				{ data: "every" },
				{ data: "sminute" },
				{ data: "keep" },
				{
					data: null,
					render: function (data, type, row) {
						return (
							'<a class="snapdelegt" val="username" href="javascript:aperioddel(\'' +
							row.id +
							"')\" >" +
							'<img  src="dist/img/delete.png" data-name=' +
							row.id +
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
		allperiodstable[t]
			.buttons()
			.container()
			.appendTo("#" + t + "periods_wrapper .col-6:eq(0)");
		t = "Weekly";
		alls = [];
		$.each(allsnaps[t + "period"], function (e, tt) {
			if (tt["receiver"] != "NoReceiver") {
				alls.push(tt);
			}
		});
		allperiodstable[t] = $("#" + t + "periods").DataTable({
			order: [
				[0, "desc"],
				[1, "desc"],
			],
			data: alls,
			columns: [
				{ data: "id" },
				{
					data: null,
					render: function (data, type, row) {
						return row.volume.split("_")[0];
					},
				},
				{ data: "receiver" },
				{ data: "stime" },
				{ data: "every" },
				{ data: "keep" },
				{
					data: null,
					render: function (data, type, row) {
						return (
							'<a class="snapdelegt" val="username" href="javascript:aperioddel(\'' +
							row.id +
							"')\" >" +
							'<img  src="dist/img/delete.png" data-name=' +
							row.id +
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
		allperiodstable[t]
			.buttons()
			.container()
			.appendTo("#" + t + "periods_wrapper .col-6:eq(0)");
		$.each(allperiods, function (e, t) {
			alls = [];
			$.each(allsnaps["allsnaps"], function (e, tt) {
				if (tt["partnerR"].length > 2) {
					alls.push(tt);
				}
			});
			allpsnapstable[t] = $("#" + t + "table").DataTable({
				order: [
					[0, "desc"],
					[1, "desc"],
				],
				data: alls,
				columns: [
					{ data: "date" },
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
			allpsnapstable[t]
				.buttons()
				.container()
				.appendTo("#" + t + "table_wrapper .col-6:eq(0)");
		});
	} catch {}
	$.fn.dataTable.ext.errMode = "throw";
	//volumelistrefresh();
}
initalltables();

function snapsreferesh() {
	getsnaps();
	if (JSON.stringify(allsnaps) != JSON.stringify(newsnaps)) {
		allsnaps = JSON.parse(JSON.stringify(newsnaps));
		onceinittable.clear();
		alls = [];
		$.each(allsnaps["Once"], function (e, tt) {
			if (tt["partnerR"].length > 2) {
				alls.push(tt);
			}
		});
		onceinittable.rows.add(alls);
		onceinittable.draw();
		try {
			alls = [];
			$.each(allsnaps["allsnaps"], function (e, tt) {
				if (tt["partnerR"].length > 2) {
					alls.push(tt);
				}
			});
			allpsnapstable["allsnaps"].clear();
			allpsnapstable["allsnaps"].rows.add(alls);
			allpsnapstable["allsnaps"].draw();
			$.each(allperiods, function (e, t) {
				alls = [];
				$.each(allsnaps[t], function (e, tt) {
					if (tt["partnerR"].length > 2) {
						alls.push(tt);
					}
				});
				allpsnapstable[t].clear();
				allpsnapstable[t].rows.add(alls);
				allpsnapstable[t].draw();
				alls = [];
				$.each(allsnaps[t + "period"], function (e, tt) {
					if (tt["receiver"] != "NoReceiver") {
						alls.push(tt);
					}
				});
				allperiodstable[t].clear();
				allperiodstable[t].rows.add(alls);
				allperiodstable[t].draw();
			});
		} catch {}
	}
}
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

function rollback(csnap) {
	var apiurl = "api/v1/volumes/snapshots/snaprollback";
	var apidata = { name: csnap, user: "mezo" };
	postdata(apiurl, apidata);
}

function asnapdel(csnap) {
	var apiurl = "api/v1/volumes/snapshots/snapshotdel";
	var apidata = { name: csnap, user: "mezo" , 'token': hypetoken};
	postdata(apiurl, apidata);
}

function aperioddel(cperiod) {
	var apiurl = "api/v1/volumes/snapshots/perioddelete";
	var apidata = { name: cperiod, user: "mezo", 'token': hypetoken};
	postdata(apiurl, apidata);
}

$("#oncecreate").click(function (e) {
	e.preventDefault();
	var thepool = allpools["results"][$("#Pool2").val()]["text"];
	var owner = allpools["results"][$("#Pool2").val()]["owner"];
	var thevol = allvolumes[$("#volname").val()]["fullname"];
	var thesnap = $("#Oncename").val();
	var receiver = allpartners["allpartners"][$("#receiver").val()]["alias"];
	var apiurl = "api/v1/volumes/snapshots/create";
	var apidata = {
		snapsel: "Once",
		data: { 'token': hypetoken },
		pool: thepool,
		volume: thevol,
		name: thesnap,
		receiver: receiver,
		owner: owner,
	};

	postdata(apiurl, apidata);
});

$("#Minutelycreate").click(function (e) {
	e.preventDefault();
	var thepool = allpools["results"][$("#Pool2").val()]["text"];
	var owner = allpools["results"][$("#Pool2").val()]["owner"];
	var thevol = allvolumes[$("#volname").val()]["fullname"];
	var every = $("#EveryMinutely").val();
	var keep = $("#KeepMinutely").val();
	var receiver = allpartners["allpartners"][$("#receiver").val()]["alias"];
	var apiurl = "api/v1/volumes/snapshots/create";
	var apidata = {
		snapsel: "Minutely",
		pool: thepool,
		data: { 'token': hypetoken },
		volume: thevol,
		every: every,
		receiver: receiver,
		keep: keep,
		owner: owner,
	};
	postdata(apiurl, apidata);
});

$("#Hourlycreate").click(function (e) {
	e.preventDefault();
	var thepool = allpools["results"][$("#Pool2").val()]["text"];
	var owner = allpools["results"][$("#Pool2").val()]["owner"];
	var thevol = allvolumes[$("#volname").val()]["fullname"];
	var every = $("#EveryHourly").val();
	var keep = $("#KeepHourly").val();
	var sminute = $("#Sminute").val();
	var receiver = allpartners["allpartners"][$("#receiver").val()]["alias"];
	var apiurl = "api/v1/volumes/snapshots/create";
	var apidata = {
		snapsel: "Hourly",
		pool: thepool,
		data: { 'token': hypetoken },
		volume: thevol,
		every: every,
		receiver: receiver,
		keep: keep,
		sminute: sminute,
		owner: owner,
	};
	console.log("apidata", apidata);

	postdata(apiurl, apidata);
});

$("#Weeklycreate").click(function (e) {
	e.preventDefault();
	var thepool = allpools["results"][$("#Pool2").val()]["text"];
	var owner = allpools["results"][$("#Pool2").val()]["owner"];
	var thevol = allvolumes[$("#volname").val()]["fullname"];
	var every = $("#Sday").val();
	var keep = $("#KeepWeekly").val();
	var stime = $("#Stime").val();
	var receiver = allpartners["allpartners"][$("#receiver").val()]["alias"];
	var apiurl = "api/v1/volumes/snapshots/create";
	var apidata = {
		snapsel: "Weekly",
		data: { 'token': hypetoken },
		pool: thepool,
		volume: thevol,
		every: every,
		receiver: receiver,
		keep: keep,
		stime: stime,
		owner: owner,
	};
	console.log("apidata", apidata);

	postdata(apiurl, apidata);
});
$("#Stime").focusout(function (e) {
	if ($("#Stime").val() == "") {
		$("#Stime").val("11:50 PM");
	}
});

function changeoncesubmit() {
	if ($("#Oncename").val().length < 3) {
		$("#oncecreate").attr("disabled", "disabled");
	} else {
		$("#oncecreate").attr("disabled", false);
	}
}

$("#Pool2").change(function (e) {
	volumesrefresh();
});
$("#volname").change(function (e) {
	partnersrefresh();
});
$("#receiver").change(function (e) {
	cpartner = $("#receiver").val();
	if ($("#receiver").val() == "") {
		$("#Oncename").attr("disabled", "disabled");
		$("#oncecreate").attr("disabled", "disabled");
		$(".Minute").prop("disabled", "disabled");
		$(".Hour").prop("disabled", "disabled");
		$(".Week").prop("disabled", "disabled");
	} else {
		$("#Oncename").attr("disabled", false);
		$(".Minute").prop("disabled", false);
		$(".Hour").prop("disabled", false);
		$(".Week").prop("disabled", false);
		changeoncesubmit();
	}
});
$("#Oncename").keyup(function (e) {
	changeoncesubmit();
});
