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
var allgroups = "";
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
var stat = "quota";
var selhosts = "";
var seldhosts = "";
var changedprop = {};
var modaltill = idletill - 120000;
var volumelisttable;
var dirtylog = 1;
var firstRequests = 7;

function poolsrefresh() {
	$(".select2.pool").select2({
		placeholder: "Select a state",
		ajax: {
			url: "/api/v1/volumes/poolsinfo",
			data: { 'token': hypetoken },
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

function usersnohomerefresh() {
	// the volume name will get only the username as it is home here
	var newallusersnohome;
	$.ajax({
		url: "/api/v1/users/userlist",
		data: { 'token': hypetoken },
		dataType: "json",
		timeout: 3000,
		// Additional AJAX parameters go here; see the end of this chapter for the full code of this example
		type: "GET",
		async: false,
		DataSrc: "usersnohome",
		success: function (data) {
			newallusersnohome = data["usersnohome"];
			firstRequests = firstRequests - 1;
		},
	});
	if (JSON.stringify(allusersnohome) != JSON.stringify(newallusersnohome)) {
		allusersnohome = JSON.parse(JSON.stringify(newallusersnohome));
		$(".select2.home").select2({
			placeholder: "Select a user",
			data: allusersnohome,
		});
	}
}

function groupsrefresh(first = 0) {
	$(".select2.multiple").select2({
		ajax: {
			url: "api/v1/volumes/grouplist",
			data: { 'token': hypetoken },
			dataType: "json",
			timeout: 3000,
			// Additional AJAX parameters go here; see the end of this chapter for the full code of this example
			type: "GET",
			async: false,
			success: function (data) {
				allgroups = data;
				if (first == 1) firstRequests = firstRequests - 1;
			},
		},
	});
}
poolsrefresh();
usersnohomerefresh();

function refreshrows() {
	$(".usergroups").each(function () {
		var thisvolume = $(this);
		var grps;
		var assignedgrps = thisvolume.data("grps");
		var option;
		thisvolume.addClass("select2");
		if (typeof assignedgrps == "number") {
			grps = [assignedgrps];
		} else {
			grps = assignedgrps.split(",");
		}
		thisvolume.trigger({
			type: "select2:select",
			params: {
				allgroups: allgroups,
			},
		});
		$.each(grps, function (e, t) {
			if (t != "NoGroup" && t in allgroups["results"]) {
				var grp = allgroups["results"][t];
				option = new Option(grp.text, grp.id, true, true);
				thisvolume.append(option);
			}
		});
	});
	$(".changeprop").each(function () {
		updatebtn($(this));
	});
}
//$.post("./pump.php", { req:"VolumeCreate"+prot+".py", name:pools[thepool].name+" "+$("#volname"+prot+"").val()+" "+$("#volsize"+prot+"").val()+"G "+Groupprot, passwd:$("#Address"+prot).val().toString()+" "+$("#Subnet"+prot).val().toString()+" "+myname+" "+pools[thepool].host+" "+myname }, function (data){

$("#createvol").click(function (e) {
	e.preventDefault();
	var thepool = allpools["results"][$("#Pool2").val()]["text"];
	var owner = allpools["results"][$("#Pool2").val()]["owner"];
	var thevol;
	var groups;
	if (prot != "HOME") {
		if ($("#Group").val().toString().length > 0) {
			groups = "";
			$.each($("#Group").val(), function (e, t) {
				groups += allgroups["results"][t]["text"] + ",";
			});
			groups = groups.slice(0, -1);
		} else {
			groups = "NoGroup";
		}
		thevol = $("#volname").val();
	} else {
		thevol = allusersnohome[$("#volname").val()]["text"];
		groups = thevol;
	}
	var apiurl = "api/v1/volumes/create";
	var apidata = {
		type: prot,
		pool: thepool,
		token: hypetoken,
		name: thevol,
		ipaddress: $("#Address").val(),
		Subnet: $("#Subnet").val(),
		groups: groups,
		Myname: "mezo",
		size: $("#volsize").val() + "G",
		owner: owner,
	};

	postdata(apiurl, apidata);
});

function volumelistrefresh() {
	volumelisttable.ajax.reload(function () {
		var option;
		$(".usergroups").each(function () {
			refreshrows();
			groupsrefresh();
		});
	});
	propchange();
	refreshrows();
}
function updatebtn(ths) {
	var changedkey = ths.data("key");
	var oldpropvalue = ths.data("value").toString();
	var newpropvalue = ths.val().toString();
	if (!(ths.data("name") in changedprop)) {
		changedprop[ths.data("name")] = {};
	}
	if (oldpropvalue == "NoGroup") {
		oldpropvalue = "";
	}
	if (oldpropvalue !== newpropvalue) {
		changedprop[ths.data("name")][changedkey] = newpropvalue;
		$("#btn" + ths.data("name")).show();
	} else {
		delete changedprop[ths.data("name")][changedkey];
		if ($.isEmptyObject(changedprop[ths.data("name")])) {
			$("#btn" + ths.data("name")).hide();
			delete changedprop[ths.data("name")];
		}
	}

	if ($.isEmptyObject(changedprop)) {
		$("button.volumes").hide();
	}
	if ($.isEmptyObject(changedprop[ths.data("name")])) {
		$("#btn" + ths.data("name")).hide();
		delete changedprop[ths.data("name")];
	}
}

function propchange() {
	$(".changeprop").on("change", function (e) {
		updatebtn($(this));
	});
}

function initVolumelist() {
	groupsfn(1);
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
				data: null,
				render: function (data, type, row) {
					if ("quota" in row) {
						return row.quota;
					} else {
						return "n/a";
					}
				},
			},
			{
				data: null,
				render: function (data, type, row) {
					if ("usedbysnapshots" in row) {
						return row.usedbysnapshots;
					} else {
						return "n/a";
					}
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
				data: "Subnet",
				render: function (data, type, row) {
					return (
						'<input type="number"  style="font-size: 99.9%;" min="8" max="32" step="8" class="form-control changeprop"' +
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
				data: "groups",
				visible: prot != "HOME",
				render: function (data, type, row) {
					var therow =
						'<select class="multiple changeprop usergroups ' +
						row.name +
						' form-control"' +
						' multiple="multiple" data-name=' +
						row.name +
						"  " +
						'data-grps="' +
						row.groups +
						'" data-key="groups" data-value="' +
						data +
						'" data-name=' +
						row.name +
						' value="' +
						row.groups +
						'" data-change="" id="sel' +
						row.name +
						'"></select>';
					return therow;
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
					$(td).data("grps", "cell-" + cellData);
				},
			},
		],
	});
	firstRequests = firstRequests - 1;
	volumelisttable.buttons().container().appendTo("#VolumeList_wrapper .col-6:eq(0)");
	//volumelistrefresh();
	volumelisttable.errMode = function (settings, helpPage, message) {};
	$.fn.dataTable.ext.errMode = "throw";
	$(".volumes").hide();
	refreshrows();
	groupsrefresh(1);
}
initVolumelist();

function selbtnclickeduser(ths) {
	//$.post("./pump.php", { req:"UnixChangeUser", name:x.id.replace('btnsel',''), passwd:'groups'+$("#"+x.id.replace('btn','')).val()+" "+myname });
	var apiurl = "api/v1/volumes/config";
	nam = $(ths).data("name");
	var apidata = JSON.parse(JSON.stringify(changedprop[nam]));
	apidata["volume"] = nam;
	apidata["token"] = hypetoken;
	if ("groups" in apidata) {
		var newgrps = "";
		if (apidata["groups"] == "") {
			newgrps = "NoGroup";
		} else {
			$.each(apidata["groups"].split(","), function (e, t) {
				try {
					newgrps += allgroups["results"][t]["text"] + ",";
				} catch {
					newgrps += t + ",";
				}
			});
			newgrps = newgrps.slice(0, -1);
		}
		apidata["groups"] = newgrps;
	}
	apidata["type"] = prot;
	postdata(apiurl, apidata);
	volumelistrefresh();
}

function avoldel(volname) {
	var apiurl = "api/v1/volumes/volumedel";
	var apidata = { name: volname, type: "CIFS", user: "mezo", "token": hypetoken };
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

function groupsfn(first) {
	var newallgroups = "new0";
	$.ajax({
		url: "api/v1/volumes/grouplist",
		data: { 'token': hypetoken },
		type: "GET",
		//timeout: 3000,
		async: false,
		//beforeSend: function(xhr){xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://10.11.11.241:8080');},

		success: function (data) {
			newallgroups = data;
			if (JSON.stringify(allgroups) != JSON.stringify(newallgroups)) {
				allgroups = JSON.parse(JSON.stringify(newallgroups));
				groupsrefresh();
			}
			if (first == 1) firstRequests = firstRequests - 1;
		},
	});
}

function refreshall(first = 0) {
	groupsfn(first);
	updatetasks();
	var newallpools = "new0";
	$(".odd").css("background-color", "rgba(41,57,198,.1)");
	$.ajax({
		url: "api/v1/volumes/poolsinfo",
		data: { 'token': hypetoken },
		type: "GET",
		//timeout: 3000,
		async: true,
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
	var newallvolumes = "new0";
	$.ajax({
		url: "api/v1/volumes/" + prot + "/volumesinfo",
		data: { 'token': hypetoken },
		type: "GET",
		//timeout: 3000,
		async: true,
		//beforeSend: function(xhr){xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://10.11.11.241:8080');},

		success: function (data) {
			newallvolumes = data;
			if (JSON.stringify(allvolumes) != JSON.stringify(newallvolumes)) {
				allvolumes = JSON.parse(JSON.stringify(newallvolumes));
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
propchange();
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
setInterval(refreshall, 10000);
//setInterval(function(){allvolumes='refresh';}, 5000);
