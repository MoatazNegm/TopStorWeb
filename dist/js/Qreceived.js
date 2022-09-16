var allpools = "init";
var allvolumes = "init";
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

$("#Pool2").change(function (e) {
	volumesrefresh();
});
