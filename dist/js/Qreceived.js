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
