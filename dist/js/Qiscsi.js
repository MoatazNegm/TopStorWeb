var chartsflag = 0;
var refresherprop = 2;
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
var allusersnohome = "init";
var allvolumes = "init";
var allpools = "init";
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
var stat = "used";
var selhosts = "";
var seldhosts = "";
var changedprop = {};
var modaltill = idletill - 120000;
var volumelisttable;
var dirtylog = 1;
var firstRequests = 4;

function poolsrefresh() {
	$(".select2.pool").select2({
		placeholder: "Select a state",
		ajax: {
			url: "/api/v1/volumes/poolsinfo",
			data: { 'token': hypetoken },
			dataType: "json",
			async: true,
			//timeout: 3000,
			// Additional AJAX parameters go here; see the end of this chapter for the full code of this example
			type: "GET",
			success: function (data) {
				allpools = data;
			},
		},
	});
}

poolsrefresh();

//$.post("./pump.php", { req:"VolumeCreate"+prot+".py", name:pools[thepool].name+" "+$("#volname"+prot+"").val()+" "+$("#volsize"+prot+"").val()+"G "+Groupprot, passwd:$("#Address"+prot).val().toString()+" "+$("#Subnet"+prot).val().toString()+" "+myname+" "+pools[thepool].host+" "+myname }, function (data){

$("#createvol").click(function (e) {
	e.preventDefault();
	var thepool = allpools["results"][$("#Pool2").val()]["text"];
	var owner = allpools["results"][$("#Pool2").val()]["owner"];
	var thevol;
	thevol = $("#volname").val();
	var active = "false";
	if ($("#isactive").is(":checked") == true) {
		active = "active";
	} else {
		active = "false";
	}
	var apiurl = "api/v1/volumes/create";
	var initiatorval=$("#Initiators").val();
	if(initiatorval.length == 0 ){
		initiatorval = 'This_lun_is_not_mapped';
	}
	var apidata = {
		type: prot,
		token: hypetoken,
		pool: thepool,
		name: thevol,
		active: active,
		ipaddress: $("#Address").val(),
		portalport: $("#portalport").val(),
		Subnet: $("#Subnet").val(),
		initiators: initiatorval.replaceAll("\n", ",").replaceAll(" ", ","),
		size: $("#volsize").val() + "G",
	};

	postdata(apiurl, apidata);
});
var oldt;
var newt;
function volumelistrefresh() {
	volumelisttable.ajax.reload(function () {
		var option;

		$(".changeprop").on("change", function (e) {
			var changedkey = $(this).data("key");
			var oldpropvalue = $(this)
				.data("value")
				.toString()
				.replaceAll("\n", ",")
				.replaceAll("\r", "")
				.replaceAll(" ", ",")
				.replaceAll(/,{1,}/g, ",");
			var newpropvalue = $(this)
				.val()
				.toString()
				.replaceAll("\n", ",")
				.replaceAll("\r", "")
				.replaceAll(" ", ",")
				.replaceAll(/,{1,}/g, ",");
			if (!($(this).data("name") in changedprop)) {
				changedprop[$(this).data("name")] = {};
			}

			if (oldpropvalue == "NoGroup") {
				oldpropvalue = "";
			}
			if (oldpropvalue !== newpropvalue) {
				console.log("oldnew", oldpropvalue);
				console.log("oldnew", newpropvalue);
				oldt = oldpropvalue;
				newt = newpropvalue;
				changedprop[$(this).data("name")][changedkey] = newpropvalue;
				$("#btn" + $(this).data("name")).show();
			} else {
				try {
					delete changedprop[$(this).data("name")][changedkey];
					if ($.isEmptyObject(changedprop[$(this).data("name")])) {
						$("#btn" + $(this).data("name")).hide();
						delete changedprop[$(this).data("name")];
					}
				} catch {}
			}
		});
		if ($.isEmptyObject(changedprop)) {
			$("button.volumes").hide();
		}
		try {
			if ($.isEmptyObject(changedprop[$(this).data("name")])) {
				$("#btn" + $(this).data("name")).hide();
				delete changedprop[$(this).data("name")];
			}
		} catch {}

		$(".changeprop").trigger("change");
	});
}

function initVolumelist() {
	volumelisttable = $("#VolumeList").DataTable({
		order: [[1, "desc"]],
		ajax: {
			url: "api/v1/volumes/" + prot + "/volumesinfo",
			data: { 'token': hypetoken },
			timeout: 3000,
			async: false,
			type: "GET",
			dataSrc: "allvolumes",
		},
		columns: [
			{
				data: "name",
				render: function (data, type, row) {
					return data.split("_")[0];
				},
			},
			{
				data: "pool",
				render: function (data, type, row) {
					return data.split("p")[2];
				},
			},
			{
				data: "used",
				render: function (data, type, row) {
					return parseFloat(data).toString().slice(0, 4);
				},
			},
			{
				data: "usedbysnapshots",
				render: function (data, type, row) {
					return parseFloat(data).toString().slice(0, 4);
				},
			},
			{
				data: null,
				render: function (data, type, row) {
					if ("refcompressratio" in row) {
						return row.refcompressratio;
					} else {
						return "n/a";
					}
				},
			},
			{
				data: "ipaddress",
				render: function (data, type, row) {
					return (
						'<input type="text" placeholder="xxx.xxx.xxx.xxx" class="form-control changeprop" ' +
						'name="s" id="ip' +
						row.name +
						'" data-value="' +
						data +
						'" value="' +
						data +
						'" data-name=' +
						row.name +
						' data-key="ipaddress" style="font-size: 99.9%;" data-inputmask="\'alias\': \'ip\'">'
					);
				},
			},
			{
				data: "portalport",
				render: function (data, type, row) {
					return (
						'<input type="number"  style="font-size: 90%;" min="3260" max="1" step="8" class="form-control changeprop"' +
						'id="sub' +
						row.name +
						'" data-key="Subnet" data-name=' +
						row.name +
						' data-value="' +
						data +
						'" value="' +
						data +
						'">'
					);
				},
			},
			{
				data: "initiators",
				render: function (data, type, row) {
					data = data.replaceAll(",", "&#13;&#10;");
					return (
						'<textarea rows=4 type="text" class=" multiple changeprop volinitiators ' +
						row.name +
						' form-control"' +
						" data-name=" +
						row.name +
						' style="font-size: 90%;" ' +
						'data-initiators="' +
						row.initiators +
						'" data-key="initiators" data-value="' +
						data +
						'" ' +
						"data-name=" +
						row.name +
						" value=" +
						data +
						' data-change="" id="sel' +
						row.name +
						'">' +
						data +
						"</textarea>"
					);
				},
			},
			{
				data: null,
				render: function (data, type, row) {
					return (
						'<button onclick="selbtnclickeduser(this)" style="font-size:99.9%;" id="btn' +
						row.name +
						'" ' +
						'type="button" data-name=' +
						row.name +
						" data-name=" +
						row.name +
						'  class="btn btn-primary volumes" > update</button>'
					);
				},
			},
			{
				data: null,
				render: function (data, type, row) {
					return (
						'<a class="UnixDelUser" val="username" href="javascript:avoldel(\'' +
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
					$(td).data("initiators", "cell-" + cellData);
				},
			},
		],
	});
	firstRequests = firstRequests - 1;
	volumelisttable.buttons().container().appendTo("#VolumeList_wrapper .col-6:eq(0)");
	//volumelistrefresh();
	volumelisttable.errMode = function (settings, helpPage, message) {
		console.log(message);
	};
	$.fn.dataTable.ext.errMode = "throw";
	$(".volumes").hide();
}
initVolumelist();

function selbtnclickeduser(ths) {
	//$.post("./pump.php", { req:"UnixChangeUser", name:x.id.replace('btnsel',''), passwd:'groups'+$("#"+x.id.replace('btn','')).val()+" "+myname });
	var apiurl = "api/v1/volumes/config";
	nam = $(ths).data("name");
	var apidata = JSON.parse(JSON.stringify(changedprop[nam]));
	apidata["volume"] = nam;
	apidata["type"] = prot;
	apidata['token'] = hypetoken;
	apidata["initiators"] = apidata["initiators"]
		.replaceAll("\n", ",")
		.replaceAll("\r", "")
		.replaceAll(" ", ",")
		.replaceAll(/,{1,}/g, ",");
	console.log("config", apidata);
	postdata(apiurl, apidata);
}

function avoldel(volname) {
	var apiurl = "api/v1/volumes/volumedel";
	var apidata = { name: volname, type: prot, user: "mezo", "token": hypetoken };
	postdata(apiurl, apidata);
}

function tocheck() {
	var vollimit = 3;
	if (prot == "HOME") {
		vollimit = 1;
	}
	$("#createvol").prop("disabled", false);
	if ($("#volname").val().length < vollimit) {
		$("#createvol").prop("disabled", "disabled");
	}
	if ($("#Pool2").val().length < 1) {
		$("#createvol").prop("disabled", "disabled");
	}
	try {
		if ($("#Pool2").val().length > 0 && $("#Address").val().length < 3) {
			$("#createvol").prop("disabled", "disabled");
		}
	} catch (err) {
		console.log("Pool2 error", $("#Pool2").val());
		console.log("Pool2 error allpools", allpools["results"]);
	}

	if ($("#volsize").val() < 0) {
		$("#createvol").prop("disabled", "disabled");
	}
}

tocheck();

$(".tocheck").click(function (e) {
	tocheck();
});
$(".tocheck").focusout(function (e) {
	tocheck();
});

function initcharts() {
	var pos = "top";
	$.each(chartcards, function (e, t) {
		if (e < 2) {
			pos = "top";
		} else {
			pos = "right";
		}

		/* ChartJS
		 * -------
		 * Here we will create a few charts using ChartJS
		 */
		//-------------
		//- PIE CHART -
		//-------------
		// Get context with jQuery - using jQuery's .get() method.
		var donutData2 = {
			labels: ["Chrome", "IE", "FireFox", "Safari", "Opera", "Navigator"],
			datasets: [
				{
					data: [700, 500, 400, 600, 300, 100],
					backgroundColor: ["#f56954", "#00a65a", "#f39c12", "#00c0ef", "#3c8dbc", "#d2d6de"],
				},
			],
		};

		var donutData = {};
		donutData["labels"] = volstats[t]["labels"];
		donutData["datasets"] = [
			{
				data: volstats[t]["stats"],
				backgroundColor: ["#0019AD", "#0023FF", "#D1D5FF", "#42F3DC"],
			},
		];

		var pieChartCanvas = $("#" + t + "Chart")
			.get(0)
			.getContext("2d");
		var pieData = donutData;
		var pieOptions = {
			maintainAspectRatio: false,
			responsive: true,
			legend: {
				display: true,
				labels: {
					color: "rgb(255, 99, 132)",
					boxWidth: 10,
					padding: 4,
				},
				position: pos,
			},
			title: {
				text: t,
				display: true,
			},
			colorschemes: {
				scheme: "brewer.Paired8",
			},
		};

		//Create pie or douhnut chart
		// You can switch between pie and douhnut using the method below.
		charts[t] = new Chart(pieChartCanvas, {
			type: "pie",
			data: pieData,
			options: pieOptions,
		});
	});
}
//initcharts()

function refreshpools(first) {
	var newallpools = "new0";
	$.ajax({
		url: "api/v1/volumes/poolsinfo",
		data: { 'token': hypetoken },
		type: "GET",
		//timeout: 3000,
		async: false,
		//beforeSend: function(xhr){xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://10.11.11.241:8080');},

		success: function (data) {
			newallpools = data;
			if (JSON.stringify(allpools) != JSON.stringify(newallpools)) {
				allpools = JSON.parse(JSON.stringify(newallpools));
				poolsrefresh();
			}
			if (first == 1) firstRequests = firstRequests - 1;
		},
	});
}

function refreshvolumes(first) {
	var newallvolumes = "new0";
	$.ajax({
		url: "api/v1/volumes/" + prot + "/volumesinfo",
		data: { 'token': hypetoken },
		type: "GET",
		//timeout: 3000,
		async: false,
		//beforeSend: function(xhr){xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://10.11.11.241:8080');},

		success: function (data) {
			newallvolumes = data["allvolumes"];
			if (JSON.stringify(allvolumes) != JSON.stringify(newallvolumes)) {
				allvolumes = JSON.parse(JSON.stringify(newallvolumes));
				console.log(prot, allvolumes);
				volumelistrefresh();
			}
			if (first == 1) firstRequests = firstRequests - 1;
		},
	});

	var newstats = "new0";
	$.ajax({
		url: "api/v1/volumes/stats",
		data: { 'token': hypetoken },
		type: "GET",
		//timeout: 3000,
		async: true,
		//beforeSend: function(xhr){xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://10.11.11.241:8080');},

		success: function (data) {
			newstats = data;
			if (JSON.stringify(volstats) != JSON.stringify(newstats)) {
				volstats = JSON.parse(JSON.stringify(newstats));
				if (chartsflag == 0) {
					initcharts();
					chartsflag = 1;
				} else {
					try {
						$.each(chartcards, function (e, t) {
							charts[t].data.datasets[0]["data"] = volstats[t]["stats"];
							charts[t].data.labels = volstats[t]["labels"];
							charts[t].update();
						});
					} catch {}
				}
			}
			if (first == 1) firstRequests = firstRequests - 1;
		},
	});
}

function refreshall(first) {
	$(".odd").css("background-color", "rgba(41,57,198,.1)");
	updatetasks();
	refreshvolumes(first);
	refreshpools(first);
}
refreshall(1);
firstRequestsInterval = setInterval(() => {
	if (firstRequests == 0) {
		$("#Loading").addClass("show_or_hide_other");
		setTimeout(() => {
			console.log("FirstRequests Done");
			clearInterval(firstRequestsInterval);
		}, 10);
	}
}, 100);
setInterval(refreshall, 2000);
//setInterval(function(){allvolumes='refresh';}, 5000);
