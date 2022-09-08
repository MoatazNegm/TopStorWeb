//input mask bundle ip address
var refresherprop = 2;
var refresherpartner = 2;
var partnerpass = "hi";
var proptime = "55:55:55";
var olddata = 0;
var propdata = "hi";
var oldproprdata = "dakfj";
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
var allpartners = "init";
var allgroups = { results: [{ id: "0", text: "NoGroup" }] };
var allpools = "init";
var selvalues = {};
var grpolddata;
var myidhash;
var mytimer;
var mymodal;
var cgrp = {};
var cpartner = {};
var partnerlistflag = 0;
var partnerdata = "dksfj";
var oldpartnerdata = "ksksksks";
var voldata = "hihihi";
var oldvoldata = "n;nolnlnn";
var volumes = { NoHome: "NoHome" };
var idletill = 480000;
var oldhdata = "dkd";
var oldpdata = "dkedfd";
var oldddata = "dkjlf";
var oldrdata = "kfld";
var selhosts = "";
var seldhosts = "";
var modaltill = idletill - 120000;
var partnerlisttable;
var myid = "<?php echo $_REQUEST['myid'] ?>";
var firstRequests = 1;
$("#AddPartner").prop("disabled", true);
function commondisable() {
	if (
		($("#DNSname").val().length > 2 || $("#address").val().length > 6) &&
		$("#alias").val().length > 2 &&
		$("#ppass").val().length > 2
	) {
		$("#AddPartner").prop("disabled", false);
	} else {
		$("#AddPartner").prop("disabled", true);
	}
}

$("#DNSname").change(function (e) {
	commondisable();
});
$("#alias").change(function (e) {
	commondisable();
});
$("#address").change(function (e) {
	commondisable();
});

$("#ppass").change(function (e) {
	commondisable();
});

function partnerlistrefresh() {
	partnerlisttable.ajax.reload();
}

function initPartnerlist() {
	partnerlisttable = $("#PartnerList").DataTable({
		order: [[1, "desc"]],
		ajax: {
			url: "api/v1/partners/partnerlist",
			async: false,
			type: "GET",
			dataSrc: "allpartners",
		},
		columns: [
			{
				data: function (data) {
					return data.alias.split("_")[0];
				},
			},
			{ data: "ip" },
			{ data: "port" },
			{ data: "type" },
			{
				data: null,
				render: function (data, type, row) {
					return (
						'<a class="delpartner" val="' +
						data.alias +
						'" href="javascript:apartnerdel(\'' +
						data.alias +
						"')\" >" +
						'<img  src="dist/img/delete.png" alt="cannott upload delete icon">' +
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

	if (firstRequests == 1) firstRequests = 0;
	partnerlisttable.buttons().container().appendTo("#PartnerList_wrapper .col-6:eq(0)");
	//partnerlistrefresh();
}
initPartnerlist();

firstRequestsInterval = setInterval(() => {
	if (firstRequests == 0) {
		$("#Loading").addClass("show_or_hide_other");
		setTimeout(() => {
			console.log("FirstRequests Done");
			clearInterval(firstRequestsInterval);
		}, 10);
	}
}, 100);

var ipv4_address = $(".ipaddress");
ipv4_address.inputmask();
$("#AddPartner").click(function (e) {
	var apiurl = "api/v1/partners/AddPartner";
	var ipaddr = $("#address").val();
	var name = $("#address").val();
	if ($("#address").val() == "") {
		name = $("#DNSname").val();
	}
	var apidata = {
		ip: name,
		pass: $("#ppass").val(),
		port: $("#port").val(),
		type: $("#type").val(),
		alias: $("#alias").val(),
	};
	console.log("submit", apidata);
	postdata(apiurl, apidata);

	e.preventDefault();
});

function apartnerdel() {
	var apiurl = "api/v1/partners/partnerdel";
	var apidata = { name: arguments[0] };
	postdata(apiurl, apidata);
}

function refreshall() {
	var newallgroups = "new0";
	$(".odd").css("background-color", "rgba(41,57,198,.1)");
	updatetasks();
	var newallpools = "new0";
	var newallpartners = "new0";
	$.ajax({
		url: "api/v1/partners/partnerlist",
		async: true,
		type: "GET",
		dataSrc: "allpartners",
		success: function (data) {
			newallpartners = data;
			if (JSON.stringify(allpartners) != JSON.stringify(newallpartners)) {
				allpartners = newallpartners;
				partnerlistrefresh();
			}
		},
	});
}
setInterval(refreshall, 2000);
