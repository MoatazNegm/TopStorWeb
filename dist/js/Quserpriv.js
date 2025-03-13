var allusers = ["init"];
var currentuser = "init";
var firstRequests = 1;
$(".checkboxy").css("margin-top", "0.36rem");
$(".form-check").css("margin-bottom", "0.6rem");
function sortsofts() {
	var options = $("#softs option");
	var arr = options
		.map(function (_, o) {
			return { t: $(o).text(), v: o.value };
		})
		.get();
	arr.sort(function (o1, o2) {
		return o1.t < o2.t ? 1 : o1.t > o2.t ? -1 : 0;
	});
	options.each(function (i, o) {
		o.value = arr[i].v;
		$(o).text(arr[i].t);
	});
}
sortsofts();
function updateauths(event) {
	var cuser = $("#UserList").val();
	if (cuser == null) {
		return;
	}
	if (cuser.length > 0) {
		var auths = allusers[cuser]["priv"];
		var cpriv;
		$.each($(".checkboxy"), function (e, t) {
			cpriv = $(t).prop("id");
			if (auths.includes(cpriv + "-" + "true") > 0) {
				$("#" + cpriv).prop("checked", true);
			} else {
				$("#" + cpriv).prop("checked", false);
			}
		});
	}
	if (currentuser == "init") {
		currentuser = 0;
	}
	if (event != "manual") {
		$("#UserList").val(currentuser);
		$("#UserList").trigger("change");
	}
}

function userschange() {
	var newallusers;
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
			newallusers = data["allusers"];
			if (firstRequests == 1) firstRequests = 0;
		},
	});
	var diff = 0;
	if (allusers.length == newallusers.length) {
		$.each(allusers, function (c, v) {
			if (
				allusers[c]["name"] != newallusers[c]["name"] ||
				allusers[c]["priv"] != newallusers[c]["priv"]
			) {
				diff = 1;
				return false;
			}
		});
	} else {
		diff = 1;
	}
	if (diff) {
		allusers = JSON.parse(JSON.stringify(newallusers));

		$.each(allusers, function (e, v) {
			allusers[e]["text"] = allusers[e]["name"];
		});
		$(".select2.users option").remove();
		var selectusers = { results: allusers };
		$(".select2.users").select2({
			placeholder: "Select a user",
			data: allusers,
		});
		updateauths("changeevent");
	}
}
userschange();
firstRequestsInterval = setInterval(() => {
	if (firstRequests == 0) {
		$("#Loading").addClass("show_or_hide_other");
		setTimeout(() => {
			console.log("FirstRequests Done");
			clearInterval(firstRequestsInterval);
		}, 10);
	}
}, 100);
$("#SubmitPriv").click(function (e) {
	var auths = [];
	$.each($(".checkboxy"), function (e, t) {
		auths.push($(t).prop("id") + "-" + $(t).prop("checked"));
	});
	apiurl = "api/v1/users/usersauth";
	apidata = { 'tochange': allusers[$("#UserList").val()]["name"], 'auths': auths.join(), 'token': hypetoken };
	postdata(apiurl, apidata);
});
$("#UserList").change(function (e) {
	updateauths("manual");
	currentuser = $("#UserList").val();
});
setInterval(function () {
	updatetasks();
	userschange();
}, 2000);
