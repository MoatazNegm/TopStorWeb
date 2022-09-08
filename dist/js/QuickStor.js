//input mask bundle/ ip address
var refresh = 0;
var trendstamps = [];
var newtrends;
var trendsizes = [];
var allhosts = {};
var newallhosts;
var newdisks;
var newonedaylog;
var newallconns;
var newallusers;
var vols = {};
var dskperf;
var allhostsready = -1;
var allhostsactive = -1;
var thost = 0;
var thostcolor = "red";
var allusers = 0;
var allconns = 0;
var tusercolor = "blue";
var alldgs = "init";
var totalstorage = 0;
var totalstoragealloc = 0;
var iodata = {};
var tcpu = 0;
var firstRequests = 6;

iodata["tps"] = Array.from({ length: 50 }).map((x) => 0);
iodata["thru"] = Array.from({ length: 50 }).map((y) => 0);
iodata["readpercent"] = Array.from({ length: 50 }).map((z) => 0);

var emergency = { 0.0009: "#1C35F4", 25: "#687ee6", 50: "#F4D31C", 75: "#eb2a45", 98: "#F4341C" };
var emergencylist = [
	[0, "#1C35F4"],
	[25, "#687ee6"],
	[50, "#F4D31C"],
	[75, "#eb2a45"],
	[98, "#F4341C"],
];
var tstorage = 0;
var tstoragecolor = "grey";
col = 1;
function clrcomp(xx) {
	var clr = "darkblue";
	if (parseFloat(xx) > 25) {
		clr = "#687ee6";
	}
	if (parseFloat(xx) > 50) {
		clr = "yellow";
	}
	if (parseFloat(xx) > 75) {
		clr = "#eb2a45";
	}
	if (parseFloat(xx) > 95) {
		clr = "red";
	}
	return clr;
}
function getdata(url, fn, first = 0) {
	var newdgs;
	$.ajax({
		url: url,
		//timeout: 3000,
		async: true,
		type: "GET",
		data: { token: hypetoken },
		success: function (data) {
			fn(data);
			{
				if (first == 1) {
					firstRequests = firstRequests - 1;
				}
			}
		},
	});
}

function loadfn(data) {
	if (typeof dskperf == "undefined") {
		return;
	}
	dskperf = data;
	var thecpucolor = 0;
	var newtcpu = 0;
	$.each(dskperf["cpu"], function (e, t) {
		newtcpu += parseFloat(dskperf["cpu"][e]["cpu"]);
	});
	newtcpu = newtcpu / dskperf["cpu"].length;
	tcpu = newtcpu;
	thecpucolor = clrcomp(tcpu);
	$(".tload").trigger("configure", { fgColor: thecpucolor, step: "0.01", skin: "tron" });

	$(".tload").val(tcpu);
	$(".tload").trigger("change");
}
function extractdskperf() {
	dskperf = getdata("api/v1/stats/dskperf", dskperffn);
}
function dskperffn(data) {
	dskperf = data;
	if (typeof dskperf == "undefined") {
		return;
	}
	var tps = 0;
	var thru = 0;
	var readn = 0;
	$.each(dskperf["dsk"], function (e, t) {
		tps += parseFloat(t["tps"]);
		thru += parseFloat(t["thr"]);
		readn += parseFloat(t["readpercent"]);
	});
	readn = readn / dskperf["dsk"].length;
	iodata["tps"].shift();
	iodata["thru"].shift();
	iodata["readpercent"].shift();
	iodata["tps"].push(tps);
	iodata["thru"].push(thru);
	iodata["readpercent"].push(readn);
	loadfn(data);
}
function extracttrends() {
	getdata("api/v1/volumes/stats", trendsfn);
}
function trendsfn(data) {
	var allnewtrends = data;
	newtrends = allnewtrends["trends"];
	trendstamps = [];
	trendsizes = [];
	var trendict = {};
	$.each(newtrends, function (vol, trends) {
		if (trends != -1) {
			$.each(trends.split("/"), function (e, trend) {
				tth = trend.split("-")[0];
				var tt = new Date(parseInt(tth) * 1000);
				ttd = tt.toLocaleString("default", { month: "short" });
				trendict[ttd] = [];
			});
		}
	});
	var tt, tth, ttd;
	$.each(newtrends, function (vol, trends) {
		if (trends != -1) {
			$.each(trends.split("/"), function (e, trend) {
				tth = trend.split("-")[0];
				var tt = new Date(parseInt(tth) * 1000);
				ttd = tt.toLocaleString("default", { month: "short" });
				trendict[ttd].push(trend.split("-")[1]);
			});
		}
	});
	$.each(trendict, function (stamp, sizes) {
		trendstamps.push(stamp);
		var tsizes = 0;
		$.each(sizes, function (e, size) {
			tsizes += parseFloat(size);
		});
		trendsizes.push(tsizes);
	});

	//console.log(trendstamps,trendsizes);

	linechartpls();
}

function extracthosts(first) {
	getdata("api/v1/hosts/allinfo", hostsfn, first);
}
function hostsfn(data) {
	newallhosts = data;
	//if (typeof(newallhosts) == "undefined") { return; }
	if (
		allhostsready != newallhosts["ready"].length ||
		allhostsactive != newallhosts["active"].length
	) {
		allhostsready = newallhosts["ready"].length;
		allhostsactive = newallhosts["active"].length;
		$("#totalhosts").text(allhostsactive);
		thost = allhostsready;
		$.each(emergencylist.reverse(), function (e, t) {
			if (100 * (thost / allhostsactive) >= t[0]) {
				(thostcolor = t[1]), console.log(thostcolor);
			}
		});
	}

	$(".thost").trigger("configure", {
		fgColor: thostcolor,
		min: 0,
		max: allhostsactive,
		skin: "tron",
	});
	$(".thost").val(thost);
	$(".thost").trigger("change");
	$("#thost").css("color", "black");
}
function extractdisks(first) {
	getdata("api/v1/pools/dgsinfo", disksfn, first);
}
function disksfn(data) {
	newdisks = data;
	disks = newdisks["disks"];
	$("#disks").text(Object.keys(disks).length);
}
function extractsnaps(first) {
	var newsnaps;
	getdata("api/v1/volumes/snapshots/snapshotsinfo", snapsfn, first);
}
function snapsfn(data) {
	var newsnaps = data;
	snaps = newsnaps["allsnaps"];
	var today = new Date();
	var lstweeksnaps = 0;
	var lstweek = new Date();
	lstweek.setDate(today.getDate() - 8);
	$.each(snaps, function (e, t) {
		var creation = new Date(snaps[e]["creation"]);
		if (creation > lstweek) {
			lstweeksnaps += 1;
		}
	});
	$("#weeksnaps").text(lstweeksnaps);
	$("#allsnaps").text(snaps.length);
}
var overallcount = 0;
function extractvolumes(first) {
	getdata("api/v1/volumes/volumesinfo", volumesfn, first);
}
function volumesfn(data) {
	vols = data;
	overallcount = vols["allvolumes"].length;
	$("#allvols").text(overallcount);
}

function extractonedaylog() {
	var tot = 0;
	tot = onedaylog["error"].length - onedaylog["failedlogon"].length + onedaylog["warning"].length;

	var tconn = 0;

	$("#error").text(onedaylog["error"].length - onedaylog["failedlogon"].length);
	$("#warning").text(onedaylog["warning"].length);
	$("#failedlogon").text(onedaylog["failedlogon"].length);
}

function extractconns(first) {
	getdata("api/v1/volumes/connections", connsfn, first);
}
function connsfn(data) {
	newallconns = data;
	getdata("api/v1/users/userlist", consusersfn);
}
function consusersfn(data) {
	newallusers = data;
	var tconn = 0;
	if (
		allusers != newallusers["allusers"].length ||
		allconns.length != newallconns["connections"].length
	) {
		allusers = newallusers["allusers"];
		allconns = newallconns["connections"];
		$("#totalusers").text(allusers.length);
		tuser = allconns.length;
	}
	$(".tuser").trigger("configure", {
		fgColor: emergency[0],
		min: 0,
		max: allusers.length,
		skin: "tron",
	});
	$(".tuser").val(tuser);
	$(".tuser").trigger("change");
	$(".tuser").css("color", "black");
}
function extractstorage(first) {
	getdata("api/v1/pools/dgsinfo", storagefn, first);
}
function storagefn(data) {
	alldgs = data;
	var newtotalstorage = 0;
	var newtotalstoragealloc = 0;
	var change = 0;
	$.each(alldgs["pools"], function (pname, pool) {
		if (pname.includes("dhcp") > 0) {
			newtotalstorage = newtotalstorage + pool["alloc"] + pool["available"];
			newtotalstoragealloc = newtotalstoragealloc + pool["alloc"];
		}
	});

	change = 1;
	totalstorage = newtotalstorage;
	totalstoragealloc = newtotalstoragealloc;
	tstorage = totalstoragealloc;
	$.each(emergency, function (e, t) {
		if (tstorage > e) {
			tstoragecolor = t;
		}
	});
	totalstorage = parseFloat(totalstorage.toString().slice(0, 5));
	tstorage = parseFloat(tstorage.toString().slice(0, 5));

	$("#TotalStorage").text(totalstorage + "GB");
	$(".tstorage").trigger("configure", {
		fgColor: tstoragecolor,
		min: 0,
		max: totalstorage * 1000,
		skin: "tron",
	});
	$(".tstorage").val(tstorage * 1000);
	$(".tstorage").trigger("change");
	$("#tstorage").css("color", "black");
}
//$(".addraid").click(function(){ console.log(this); $(this).find('input').prop('checked','checked'); });

function refreshdash(first = 0) {
	if (refresh == 0) {
		refresh = 1;
		extractstorage(first);
		extracthosts(first);
		extractconns(first);
		extractonedaylog(first);
		extractsnaps(first);
		extractvolumes(first);
		extractdisks(first);
		refresh = 0;
	} else {
		refresh += 1;
	}
	//$(".tstorage").trigger('configure', {'fgColor': tstoragecolor});
}
refreshdash(1);
firstRequestsInterval = setInterval(() => {
	if (firstRequests == 0) {
		$("#Loading").addClass("show_or_hide_other");
		setTimeout(() => {
			console.log("FirstRequests Done");
			clearInterval(firstRequestsInterval);
		}, 10);
	}
}, 100);

setInterval(refreshdash, 100000);

/* jQueryKnob */

$(".knob").knob({
	/*change : function (value) {
   //console.log("change : " + value);
   },
   release : function (value) {
   console.log("release : " + value);
   },
   cancel : function () {
   console.log("cancel : " + this.value);
   },*/
	draw: function () {
		// "tron" case
		if (this.$.data("skin") == "tron") {
			var a = this.angle(this.cv), // Angle
				sa = this.startAngle, // Previous start angle
				sat = this.startAngle, // Start angle
				ea, // Previous end angle
				eat = sat + a, // End angle
				r = true;

			this.g.lineWidth = this.lineWidth;

			this.o.cursor && (sat = eat - 0.3) && (eat = eat + 0.3);

			if (this.o.displayPrevious) {
				ea = this.startAngle + this.angle(this.value);
				this.o.cursor && (sa = ea - 0.3) && (ea = ea + 0.3);
				this.g.beginPath();
				this.g.strokeStyle = this.previousColor;
				this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, sa, ea, false);
				this.g.stroke();
			}

			this.g.beginPath();
			this.g.strokeStyle = r ? this.o.fgColor : this.fgColor;
			this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, sat, eat, false);
			this.g.stroke();

			this.g.lineWidth = 2;
			this.g.beginPath();
			this.g.strokeStyle = this.o.fgColor;
			this.g.arc(
				this.xy,
				this.xy,
				this.radius - this.lineWidth + 1 + (this.lineWidth * 2) / 3,
				0,
				2 * Math.PI,
				false
			);
			this.g.stroke();

			return false;
		}
	},
});
function linechartpls() {
	/* END JQUERY KNOB */

	//-------------
	//- LINE CHART -
	//--------------
	var areaChartData = {
		//labels  : ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
		labels: trendstamps,
		datasets: [
			{
				label: "Digital Goods",
				backgroundColor: "rgba(60,141,188,0.9)",
				borderColor: "rgba(60,141,188,0.8)",
				pointRadius: false,
				pointColor: "#3b8bba",
				pointStrokeColor: "rgba(60,141,188,1)",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(60,141,188,1)",
				data: trendsizes,
			},
		],
	};

	var areaChartOptions = {
		maintainAspectRatio: false,
		responsive: true,
		legend: {
			display: false,
		},
		scales: {
			xAxes: [
				{
					gridLines: {
						display: false,
					},
				},
			],
			yAxes: [
				{
					gridLines: {
						display: false,
					},
				},
			],
		},
	};
	var lineChartCanvas = $("#lineChart").get(0).getContext("2d");
	var lineChartOptions = $.extend(true, {}, areaChartOptions);
	var lineChartData = $.extend(true, {}, areaChartData);
	lineChartData.datasets[0].fill = false;
	//lineChartData.datasets[1].fill = false;
	lineChartOptions.datasetFill = false;

	var lineChart = new Chart(lineChartCanvas, {
		type: "line",
		data: lineChartData,
		options: lineChartOptions,
	});
}
/*
 * Flot Interactive Chart
 * -----------------------
 */
// We use an inline data source in the example, usually data would
// be fetched from a server
var data = [],
	totalPoints = iodata["tps"].length;

function getRandomDatatps() {
	extractdskperf();

	// Zip the generated y values with the x values
	var res = [];
	for (var i = 0; i < iodata["tps"].length; ++i) {
		res.push([i, iodata["tps"][i]]);
	}

	return res;
}
var sampledata;
function getRandomDatathru() {
	// Zip the generated y values with the x values
	var res = [];
	for (var i = 0; i < iodata["thru"].length; ++i) {
		res.push([i, iodata["thru"][i]]);
	}
	sampledata = res;
	return res;
}

var interactive_plottps = $.plot(
	"#interactivetps",
	[
		{
			data: getRandomDatatps(),
		},
	],
	{
		grid: {
			borderColor: "#f3f3f3",
			borderWidth: 1,
			tickColor: "#f3f3f3",
		},
		series: {
			color: "#2626F1",
			lines: {
				lineWidth: 2,
				show: true,
				fill: true,
			},
		},
		yaxis: {
			min: 0,
			max: Math.max(...iodata["tps"]) + 3,
			show: true,
		},
		xaxis: {
			show: true,
		},
	}
);
var interactive_plotthru = $.plot(
	"#interactivethru",
	[
		{
			data: getRandomDatathru(),
		},
	],
	{
		grid: {
			borderColor: "#f3f3f3",
			borderWidth: 1,
			tickColor: "#f3f3f3",
		},
		series: {
			color: "#2626F1",
			lines: {
				lineWidth: 2,
				show: true,
				fill: true,
			},
		},
		yaxis: {
			min: 0,
			max: Math.max(...iodata["thru"]) + 3,
			show: true,
		},
		xaxis: {
			show: true,
		},
	}
);

var updateInterval = 3000; //Fetch data ever x milliseconds
var realtime = "on"; //If == to on then fetch data every x seconds. else stop fetching
function update() {
	interactive_plottps.setData([getRandomDatatps()]);
	interactive_plotthru.setData([getRandomDatathru()]);

	// Since the axes don't change, we don't need to call plot.setupGrid()
	interactive_plottps.getOptions().yaxes[0].max = Math.max(...iodata["tps"]) + 3;
	interactive_plotthru.getOptions().yaxes[0].max = Math.max(...iodata["thru"]) + 3;

	interactive_plottps.setupGrid();
	interactive_plotthru.setupGrid();
	interactive_plottps.draw();
	interactive_plotthru.draw();

	if (realtime === "on") {
		setTimeout(update, updateInterval);
	}
}

//INITIALIZE REALTIME DATA FETCHING
if (realtime === "on") {
	update();
}
//REALTIME TOGGLE
$(".realtime .btn").click(function () {
	if ($(this).data("toggle") === "on") {
		realtime = "on";
	} else {
		realtime = "off";
	}
	update();
});
/*
 * END INTERACTIVE CHART
 */

$("body").click(function (e) {
	var apiurl = "api/v1/login/renewtoken";
	var apidata = { token: hypetoken };
	postdata(apiurl, apidata);
});

$("li.auths a.active").css("background-color", "#0d0d7f");
$(".btn-add").css("opacity", "1");

//$('li.selpages a.active').click(function (){
//  console.log('first',$(this))
// $("li.selpages a.active").css('background-color','#0d0d7f');
//$(this).css('background-color','#4558fc');

//});
