$("#Loading").toggle();
//var ipv4_address = $(".ipaddress");
//ipv4_address.inputmask();
function postdata(url, data) {
	$.ajax({
		url: url,
		dataType: "json",
		data: data,
	});
}
var hypetoken = localStorage.getItem("token");

var initurl = "api/v1/logout";
localStorage.setItem("token", "0");
postdata(initurl, { token: hypetoken });
function postlogin(url, data) {
	$.ajax({
		url: url,
		dataType: "json",
		type: "GET",
		async: false,
		data: data,
		success: function (token) {
			hypetoken = token["token"];
		},
	});
	if (hypetoken.includes("init") < 1) {
		if (hypetoken.includes("baduser") < 1) {
			localStorage.setItem("token", hypetoken);
			var wloc = localStorage.getItem("lastlocation");
			if (wloc == null || wloc == "") {
				wloc = "QuickStor.html";
			}
			location.replace(wloc);
		} else {
			console.log("token", hypetoken);
			$("#user").prop("disabled", false);
			$("#pass").prop("disabled", false);
			$("#Loading").toggle();
			$("#signin").text("Username or Password is invalid");
			$("#signin").show();
			$('#user').focus();
		}
	}
}
var globalnotif = { msgcode: "init", time: "init" };

if (typeof Storage !== "undefined") {
	// Store
	//localStorage.setItem("lastname", "Smith");
	// Retrieve
	console.log("it is ok :", localStorage.getItem("lastname"));
} else {
	console.log("Sorry, your browser does not support Web Storage...");
}

$("#signInButton").click(function (e) {
	$("#Loading").toggle();
	setTimeout(function () {
		urlapi = "api/v1/login";
		datapi = { user: $("#user").val(), pass: $("#pass").val() };
		localStorage.setItem("user", $("#user").val());
		$("#user").prop("disabled", true);
		$("#pass").prop("disabled", true);
		$("#signin").hide();
		postlogin(urlapi, datapi);
	}, 10);
});

$('#user').keydown(function (e) {
	var key = e.which;
	if(key == 13 || key == 9)  // the enter key code
	{
		$('#pass').focus();
		return false;
	}
});

$('#pass').keydown(function (e) {
	var key = e.which;
	if(key == 13)  // the enter key code
	{
		$('#signInButton').click();
		return false;
	}
	if(key == 9)  // the enter key code
        {
		$('#signInButton').focus();
		return false;
	}
});

dirtylog = 1;

$(".main-sidebar").css("background", "#131010");
var ipv4_address = $(".ipaddress");
ipv4_address.inputmask({ clearIncomplete: true });
//Initialize Select2 Elements
jQuery(function ($) {
	$(".card-header").each(function () {
		let $card_header = $(this);
		let $collapse_element = $card_header.next();
		$collapse_element.on("show.bs.collapse", function () {
			let $card_header_top = $card_header.offset().top;
			let $visible_collapse = $(".collapse.show");
			if ($visible_collapse.length) {
				let $visible_collapse_top = $visible_collapse.offset().top;
				if ($visible_collapse_top < $card_header_top) {
					$card_header_top -= $visible_collapse.height();
				}
			}
			$([document.documentElement, document.body]).animate({
				scrollTop: $card_header_top,
			});
		});
	});
});
var bg = {
	warning: { class: "bg-warning", loc: "bottomLeft", delay: 10000 },
	error: { class: "bg-danger", loc: "topRight", delay: 10000 },
	info: { class: "bg-info", loc: "bottomRight", delay: 4000 },
};
