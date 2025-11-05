//input mask bundle ip address

disks = [];
kk = 0;
disks[kk] = [];
disks[kk]["pool"] = "disks[kk].pool";
diskdiv2 = "diskdiv2";
poolid = "poolid";
alldgs = { disks: {}, newraid: {}, pools: {}, raids: {} };
col = 1;
disks[kk]["host"] = "disks[kk].host";
disks[kk]["status"] = "disks[kk].status";
disks[kk]["changeop"] = "disks[kk].changeop";
disks[kk]["grouptype"] = "disks[kk].grouptype";
disks[kk]["fromhost"] = "disks[kk].fromhost";
disks[kk]["size"] = 10;
disks[kk]["selected"] = "disks[kk].selected";
imgf = "disk-image.png";
diskimg = "disk-image";
clickdisk = 'href="#"';
var firstRequests = 1;
function getdgs() {
	$.ajax({
		url: "api/v1/pools/dgsinfo",
		//timeout: 3000,
		async: true,
		type: "GET",
		data: {'token': hypetoken },
		success: function (data) {
			dgrefresh(data);
			if (firstRequests == 1) firstRequests = 0;
		},
	});
}

$(".newraid input").click(function (e) {
	$("#createpool").attr("disabled", false);
	$("#createpool").data("redundancy", $(this).prop("id"));
});

//$(".addraid").click(function(){ console.log(this); $(this).find('input').prop('checked','checked'); });
function setdeletesequence(pool) {
	if (alldgs["pools"][pool]["volumes"].length == 0) {
		$("#" + pool + " .poolbtn1").show();
		$("#" + pool + " .poolbtn1").click(function (e) {
			e.preventDefault();
			$("#" + pool + " .poolbtn1").hide();
			$("#" + pool + " .poolbtn1c").show();
			$("#" + pool + " .poolbtn2").show();
		});
		$("#" + pool + " .poolbtn2").click(function (e) {
			e.preventDefault();
			$("#" + pool + " .poolbtn1c").hide();
			$("#" + pool + " .poolbtn2").hide();
			$("#" + pool + " .poolbtn2c").show();
			$("#" + pool + " .poolbtn3").show();
		});
		$("#" + pool + " .poolbtn1c").click(function (e) {
			e.preventDefault();
			$("#" + pool + " .poolbtn1c").hide();
			$("#" + pool + " .poolbtn2").hide();
			$("#" + pool + " .poolbtn1").show();
		});
		$("#" + pool + " .poolbtn2c").click(function (e) {
			e.preventDefault();
			$("#" + pool + " .poolbtn2c").hide();
			$("#" + pool + " .poolbtn3").hide();
			$("#" + pool + " .poolbtn1").show();
		});
		$("#" + pool + " .poolbtn3").click(function (e) {
			e.preventDefault();
			adelpool(pool);
		});
	} else {
		var volumes = " ";
		$.each(alldgs["pools"][pool]["volumes"], function (pe, pv) {
			volumes = volumes + pv.split("_")[0] + ", ";
		});
		if (volumes.length > 0) {
			volumes = volumes.slice(0, -2);
		}
		$("#" + pool + " .volumespan").text(volumes);
		$("#" + pool + " .volumes").show();
	}
}
function initaddgs() {
	if (typeof alldgs == "undefined") {
		return;
	}
	$(" .addraid").hide();
	$.each(alldgs["pools"], function (e, t) {
		pool = e;
		$("#" + pool + " option").remove();

		if ($("#" + pool + " option").length <= 0) {
			$.each(alldgs["newraid"], function (en, tn) {
				if (Object.keys(tn).length > 0) {
					$.each(tn, function (psize, raid) {
						var size = psize.slice(0, 5);
						totalsize = parseFloat(size) + parseFloat(t["available"]);
						var o = new Option(totalsize.toString().slice(0, 5), size);
						$("#" + pool + " .select" + en).append(o);
					});
				}
				if (
					alldgs["pools"][pool]["name"] != "pree" &&
					alldgs["pools"][pool]['raids'].toString().includes("raidz") || 
					alldgs["pools"][pool]['raids'].toString().includes("mirror")
				) {
					$("#" + pool + " .adiv" + en).show();
					$("#" + pool + " .adivvolset").hide();
				} else {
					$("#" + pool + " .adiv" + en).hide();
					$("#" + pool + " .adivvolset").show();
				}
			});
			$("#" + pool + " .addtopool").prop("disabled", "disabled");
			$("#" + pool + " .addtopool").data("pool", pool);
			$("#" + pool + " .addraid").data("pool", pool);
			$("#" + pool + " .addtopool").addClass("addto" + pool);
		}
	});
	$(".addraid").click(function (e) {
		e.preventDefault();
		$(this).find("input").prop("checked", "checked");
		var pool = $(this).data("pool");
		$(".addto" + pool).attr("disabled", false);
		$(".addto" + pool).data("redundancy", $(this).find("input").data("redundancy"));
	});
}

function initdgs() {
	$("[data-toggle='popover']").popover('hide');
	var poolcard;
	var col;
	var colsmean;
	var pool, host, status, grouptype, raid, changeop, shortdisk, size;
	if (typeof alldgs == "undefined") {
		return;
	}
	$(".phdcp").remove();
	$.each(alldgs["pools"], function (e, t) {
		if (e.includes("pree") < 1) {
			pool = e;
			poolcard = $(".toclone").clone();
			poolcard.insertBefore($("#freepools"));
			poolcard.removeClass("toclone");
			poolcard.addClass("phdcp");
			poolcard.prop("id", pool);
			$("#" + pool + " .title").text(pool);
			var allsize = Math.round(100 * (parseFloat(t["available"]) + parseFloat(t["used"]))) / 100;
			$("#" + pool + " .spansize").text("size:" + allsize.toString() + "GB");
			$("#" + pool + " .spanused").text("used:" + t["used"].toString().slice(0, 5) + "GB");
			var avtype = "Highly Available";
			var avcolor = "blue";
			if (t["name"] != "pree" && t['raids'].toString().includes('strip')) {
				avtype = "No Redundancy";
				avcolor = "red";
			} else {
				balanced = ", balanced";
				$.each(t["raids"], function (traide, traid) {
					if (alldgs["raids"][traid]["missingdisks"][0] != 0) {
						avcolor = "red";
						balanced = ", missing disks";
						return false;
					}
					if (alldgs["raids"][traid]["raidrank"][0] < 0) {
						avcolor = "#f39c12";
						balanced = ", not balanced";
						return false;
					}
				});
				avtype = avtype + balanced;
			}
			$("#" + pool + " .spanredundancy").text(avtype);
			$("#" + pool + " .spanredundancy").css("color", avcolor);
			$("#" + pool + " .spandedup").text("dedup:" + t["dedup"]);

			$.each(t["raids"], function (ee, tt) {
				raid = tt;
				dcols = 0
				$.each(alldgs["raids"][raid]["disks"], function (eee, disk) {
                                        if(alldgs["disks"][disk]["name"].includes('dm-') > 0) { return true; }
					dcols = dcols + 1
				});
				//cols = alldgs["raids"][raid]["disks"].length + alldgs["raids"][raid]["missingdisks"][0];
				var dms = 0
				 $.each(alldgs["raids"][raid]["disks"], function (eee, disk) {
					if(alldgs["disks"][disk]["name"].includes('dm-') > 0) { dms += 1 }
				 else { if(alldgs["disks"][disk]['changeop'].includes('ONLINE') <= 0) { dms -= 1 } }
				 });
				if(dms < 0) dms = 0 ;
				cols =  dcols + alldgs["raids"][raid]["missingdisks"][0] - dms;
				cols =  dcols + dms;
				colsmean = Math.ceil(12 / cols);
				$("#" + pool + " .disks").append(
					'<div class="col-' +
						cols +
						'">' +
						'<sub id="sub' +
						raid +
						'">' +
						raid.split("_")[0] +
						"</sub>" +
						'<div class="row" id=' +
						raid +
						' style="border: solid; border-color: grey; border-width:1px;"></div>' +
						"</div>"
				);

				$.each(alldgs["raids"][raid]["disks"], function (eee, disk) {
					var silvering = ''
					if(alldgs["disks"][disk]["name"].includes('dm-') > 0) {  return true; }
					shortdisk = disk.slice(-5);
					status = alldgs["disks"][disk]["status"];
					host = alldgs["disks"][disk]["host"];
					if(alldgs["disks"][disk]["silvering"] != 'no') { silvering = 'silvering' } else { silvering = '' }
					//console.log('short silver', shortdisk, silvering)
					changeop = alldgs["disks"][disk]["changeop"];
					size = parseFloat(alldgs["disks"][disk]["size"]).toFixed(2);
					if (
						status.includes("ONLINE") ||
						(status.includes("NA") && alldgs["disks"][disk]["raid"].includes("stripe"))
					) {
						imgf = "disk-image.png";
					} else {
						imgf = "invaliddisk.png";
					}
					$("#" + raid).append(
						'<div class="col-' +
							colsmean +
							'">' +
							'<div id="' +
							disk +
							'" data-disk="' +
							disk +
							'" class="' +
							raid +
							" " +
							pool +
							" " +
							status +
							" " +
							changeop +
							'" ' + 
							'data-toggle="popover" data-html="true" tabindex="0"' 
							+ '>' +
							"  <a href=\"javascript:memberclick('#" +
							disk +
							'\')" class="'+silvering+' img-clck" >' +
							'     <img class=" img412 imgstyle ' +
							diskimg +
							" " +
							disk +
							'" src="img/' +
							imgf +
							'" />' +
							'  <p class="psize">' +
							size +
							'</p></a><p class="ptext">' +
							shortdisk +
							"</p>" +
							//+' <p class="pimage">'+changeop+'</p><p class="pimage">'+e+'</p>'
							"  </a>" +
							"</div>" +
							"</div>"
					);
			let diskPool = e;
			let apiurl = "api/v1/pools/actionOnDisk";	
			let diskStatus = alldgs['disks'][disk]['status'];
			const popoverContent = `<div id="` + diskPool + '_' + disk + `">
							<a id = 'popover-offline_` + diskPool + '-' + disk + `' type="button" class="btn btn-sm btn-danger">Offline</a>
    							<a id = 'popover-online_` + diskPool  + '-' + disk + `'type="button" class="btn btn-sm btn-success">Online</a>
						</div>`;
 			$('#'+ disk).popover({
				trigger: 'click',
    				placement: 'bottom',
    				html: true,
    				title: 'Control Disk',
    				content: popoverContent,
			}).click(function (event) {
		    		event.stopPropagation();
				$("[data-toggle='popover']").not(this).popover('hide'); //all but this
  			}).on('inserted.bs.popover', function() {
				if (diskStatus == 'ONLINE')
				{
					$("#popover-offline_" + diskPool + '-' + disk).on('click', function(event){
						event.stopPropagation();
						var apidata = alldgs["disks"][disk];
						apidata['action'] = 'offline';
						apidata['token'] = hypetoken; 
						postdata(apiurl, apidata);
    						$('#' + disk).popover('hide');
					});
					$("#popover-online_" + diskPool + '-' + disk).unbind();
					$("#popover-online_" + diskPool + '-' + disk).addClass('disabled');
					$("#popover-offline_" + diskPool + '-' + disk).removeClass('disabled');
				} 
				else
				{
					$("#popover-online_" + diskPool + '-' + disk).on('click', function(){
						event.stopPropagation();
						var apidata = alldgs["disks"][disk];
						apidata['action'] = 'online';
						apidata['token'] = hypetoken; 
						postdata(apiurl, apidata);
    						$('#' + disk).popover('hide');
					});
					$("#popover-offline_" + diskPool + '-' + disk).unbind();
					$("#popover-offline_" + diskPool + '-' + disk).addClass('disabled');
					$("#popover-online_" + diskPool + '-' + disk).removeClass('disabled');
				}
			});
			//$('#' + disk).on('hidden.bs.popover', function(){
			// 	$("#popover-offline_" + diskPool + '-' + disk).off('click');
			// 	$("#popover-online_" + diskPool + '-' + disk).off('click');
			//});
			$(document).click(function () {
    				$('#' + disk).popover('hide');
  			})	
		
		});

				//for (x = 0; x < alldgs["raids"][raid]["missingdisks"][0]-dms; x++) {
				for (x = 0; x < dms; x++) {
					imgf = "invaliddisk.png";
					$("#" + raid).css("border-color", "red");
					$("#sub" + raid).css("color", "red");
					$("#" + raid).append(
						'<div class="col-' +
							colsmean +
							'">' +
							'<div id="' +
							raid["name"] +
							"dm_" +
							x +
							'" data-disk="' +
							raid["name"] +
							"dm_" +
							x +
							'" class=" col-' +
							col +
							" " +
							raid +
							" " +
							pool +
							" " +
							status +
							" " +
							changeop +
							'">' +
							"  <a href=\"javascript:memberclick('#" +
							raid["name"] +
							"dm_" +
							x +
							'\')" class="img-clck" >' +
							'     <img class="img412 imgstyle ' +
							diskimg +
							" " +
							raid["name"] +
							"dm_" +
							x +
							'" src="img/' +
							imgf +
							'" />' +
							'  <p class="psize">' +
							"-" +
							'</p></a><p class="ptext">' +
							"missing" +
							"</p>" +
							//+' <p class="pimage">'+changeop+'</p><p class="pimage">'+e+'</p>'
							"  </a>" +
							"</div>" +
							"</div>"
					);
				}
			});

			$.each($(".btna"), function (k, v) {
				$(v).data("pool", pool);
				$(v).removeClass("btna");
				$(v).addClass("updatepool");
			});
			setdeletesequence(pool);
			poolcard.show();
		}
	});
	$(".freedisks").children().remove();
	$(".newraid").hide();
	$(".newraid option").remove();
	if ("free" in alldgs["raids"]) {
		$.each(alldgs["raids"]["free"]["disks"], function (e, disk) {
			shortdisk = disk.slice(-5);
			status = alldgs["disks"][disk]["status"];
			host = alldgs["disks"][disk]["host"];
			changeop = alldgs["disks"][disk]["changeop"];
			size = parseFloat(alldgs["disks"][disk]["size"]).toFixed(2);
			if (status.includes("free")) {
				imgf = "disk-image.png";
			} else {
				imgf = "invaliddisk.png";
			}
			var diskHtml = 
				'<div id="' +
					disk +
					'" data-disk="' +
					disk +
					'" class=" col-' +
					col +
					" " +
					status +
					" " +
					changeop +
					'" style="position: relative;">' + // Added position: relative for the label
					// Added a hidden cache label
					'<p class="cache-label" style="display: none; position: absolute; top: 0; left: 5px; background-color: rgba(255,0,0,0.7); color: white; font-weight: bold; padding: 2px 5px; z-index: 10; border-radius: 3px;">CACHE</p>' +
					"  <a href=\"javascript:memberclick('#" +
					disk +
					'\')" class="img-clck" >' +
					'     <img class="img412 imgstyle ' +
					diskimg +
					" " +
					disk +
					'" src="img/' +
					imgf +
					'" />' +
					'  <p class="psize">' +
					size +
					'</p></a><p class="pimage">' +
					shortdisk +
					"</p>" +
					"  </a>" +
					"</div>";
			
			$(".freedisks").append(diskHtml);

			// Add the context menu (right-click) handler to toggle cache selection
			$("#" + disk).on('contextmenu', function(e) {
				e.preventDefault(); // Prevent the default browser right-click menu
				var $img = $(this).find('img');
				var $label = $(this).find('.cache-label');

				if ($img.hasClass('SelectedCache')) {
					// Toggle off: Remove cache selection
					$img.removeClass('SelectedCache SelectedFreered');
					$img.addClass('SelectedFreewhite');
					$label.hide();
				} else {
					// Toggle on: Mark as cache
					// First, remove data disk selection (if any)
					$img.removeClass('SelectedFreewhite SelectedFreered');
					// Add cache selection (SelectedFreered provides the border)
					$img.addClass('SelectedCache SelectedFreered'); 
					$label.show();
				}
			});
		});
		$.each(alldgs["newraid"], function (e, t) {
			if (e == "single") {
				if (Object.keys(t).length > 0) {
					$.each(t, function (psize, value) {
						var size = psize.slice(0, 5);
						var o = new Option((size * 0.9).toString().slice(0, 5), size);
						$("#selectsingle").append(o);
					});
				}
				$(".divsingle").show();
			} else {
				if (Object.keys(t).length > 0 ) {
                                        $.each(t, function (psize, raid) {
                                                var diskcount = raid["diskcount"];
                                                var size = psize.slice(0, 5);
                                                var o = new Option((size * 0.9).toString().slice(0, 5), size);
                                                if (e != 'volset' || (e == 'volset' && diskcount != 1))
                                                {
                                                        $("#select" + e).append(o);
                                                }
                                        });
                                }
                                let volsetOptions = $("#select" + e + " option").length;
                                if (e != 'volset' || (e == 'volset' && volsetOptions > 0))
                                {
                                        $(".div" + e).show();
                                }
			}
		});
	}
	$("tr:visible").each(function (index) {
		$(this).css("background-color", !!(index & 1) ? "rgba(0,0,0,.05)" : "rgba(0,0,0,0)");
	});
}
firstRequestsInterval = setInterval(() => {
	if (firstRequests <= 0) {
		$("#Loading").addClass("show_or_hide_other");
		setTimeout(() => {
			console.log("FirstRequests Done");
			clearInterval(firstRequestsInterval);
		}, 10);
	}
}, 100);
$(".updatepool").click(function (e) {
	e.preventDefault();
	var pool = $(this).data("pool");
	var therole = $(this).data("therole");
});
function adelpool(pool) {
	var apiurl = "api/v1/pools/delpool";
	var apidata = { pool: pool, user: "mezo" , 'token': hypetoken };
	postdata(apiurl, apidata);
}

$("#createpool").click(function (e) {
	e.preventDefault();

	var dataDisks = [];
	var cacheDisks = [];

	// Find all selected disks in the 'freedisks' area
	$(".freedisks img.SelectedFreered").each(function () {
		var $img = $(this);
		// Get the disk name from the parent div's data-disk attribute
		var diskId = $img.closest('[data-disk]').data('disk');

		if ($img.hasClass('SelectedCache')) {
			// It's a cache disk
			cacheDisks.push(diskId);
		} else {
			// It's a data disk
			dataDisks.push(diskId);
		}
	});

	// --- Validation ---
	if (dataDisks.length === 0) {
		alert("Please select at least one data disk to create the pool.");
		return;
	}

	var apiurl = "api/v1/pools/newpool";
	var redundancy = $(this).data("redundancy");
	var useable = $("#select" + redundancy).val();

	// Create the new apidata object with disk and cache lists
	var apidata = {
		redundancy: redundancy,
		useable: useable,
		disks: dataDisks,   // Array of data disk names
		cache: cacheDisks,  // Array of cache disk names
		'token': hypetoken,
		user: "mezo"
	};

	console.log("Creating pool with:", apidata);
	postdata(apiurl, apidata);
});

//$('.addtopool').click(function(e){
$("body").on("click", ".addtopool", function (e) {
	e.preventDefault();
	var apiurl = "api/v1/pools/addtopool";
	var redundancy = $(this).data("redundancy");
	var pool = $(this).data("pool");
	var useable = $("#" + pool + " .select" + redundancy).val();
	var apidata = { pool: pool, redundancy: redundancy, useable: useable, 'token': hypetoken, user: "mezo" };
	console.log("addtopol", apidata);
	postdata(apiurl, apidata);
});


function memberclick(thisclck) {
	var $img = $(thisclck + " img");
	var $label = $(thisclck).find('.cache-label'); // Find the label

	// If it's already a cache disk, a left-click should do nothing
	// (Right-click is used to toggle cache)
	if ($img.hasClass('SelectedCache')) {
		console.log("This is a cache disk. Right-click to change.");
		return;
	}

	// Standard toggle logic for data disks
	if ($img.hasClass("SelectedFreered")) { // It's a selected data disk
		$img.removeClass("SelectedFreered");
		$img.addClass("SelectedFreewhite");
		selhosts = "";
		$("#RhostForget").attr("disabled", true);
	} else { // It's not a selected data disk
		// This part deselects other 'server' images (as per original code)
		$("img.server").removeClass("SelectedFreered");
		$("img.server").addClass("SelectedFreewhite");

		$img.removeClass("SelectedFreewhite");
		$img.addClass("SelectedFreered"); // Mark as data disk
		selhosts = $(thisclck).data('disk'); // Use the data-disk attribute
		$("#RhostForget").attr("disabled", false);
	}
}


function getChanges(prev, now) {
	var changes = {};
	for (var prop in now) {
		if (!prev || prev[prop] !== now[prop]) {
			if (typeof now[prop] == "object") {
				var c = getChanges(prev[prop], now[prop]);
				if (!$.isEmptyObject(c))
					// underscore
					changes[prop] = c;
			} else {
				changes[prop] = now[prop];
			}
		}
	}

	return changes;
}

function dgrefresh(newdgs) {
	var needupdate = 0;
	if (
		JSON.stringify(alldgs["disks"]) != JSON.stringify(newdgs["disks"]) ||
		JSON.stringify(alldgs["raids"]) != JSON.stringify(newdgs["raids"])
	) {
		needupdate = 1;
	}
	if (
		JSON.stringify(Object.keys(alldgs["pools"])) != JSON.stringify(Object.keys(newdgs["pools"]))
	) {
		needupdate = 1;
	} else {
		$.each(newdgs["pools"], function (e, t) {
			if (
				t["changeop"] != alldgs["pools"][e]["changeop"] ||
				t["status"] != alldgs["pools"][e]["status"]
			) {
				needupdate = 1;
			}
		});
	}
	if (needupdate) {
		alldgs = JSON.parse(JSON.stringify(newdgs));

		initdgs();
		initaddgs();
	}
}
var dirty = 1
var  ajaxPromises = [];
async function refreshall() {
	updatetasks();
	if (dirty == 1){
		initdgs();
		initaddgs();
		dirty = 0
	}
    	ajaxPromises = [];
    	ajaxPromises.push(
        	new Promise((resolve, reject) => {
			$.ajax({
				url: "api/v1/pools/dgsinfo",
				//timeout: 3000,
				async: false,
				type: "GET",
				data: {'token': hypetoken },
				success: function (data) {
					dgrefresh(data);
					if (firstRequests == 1) firstRequests = 0;
					resolve(); // Resolve the Promise
				},
				error: function (err) {
			    		reject(err); // Reject the Promise on error
				},
			});
		})
	)
    	await Promise.all(ajaxPromises);
    	console.log('ajaxes',ajaxPromises);
}

//setInterval(refreshall, 2000);
async function iterRefresh(){
	var waiting;
	while(true){
		console.log('start refresh');
		await refreshall();
		console.log('finish refresh');
		waiting=5000;
		if(firstRequests > 0){ waiting=10; }
		await new Promise(resolve => setTimeout(resolve, waiting));
	}
}
iterRefresh()


initdgs();
//getdgs();
initaddgs();

