(function () {
	
	
    // CLOSING ERROR MESSAGES
    $(".close").click(function () {
        $(".dr-messages").fadeOut("fast");
    });
    $(".main-menu a.nav-link").click(function () {
        $(".second-menu .tab-content>div").removeClass("active");
    });
    
    // FOR STATUS CHARTS
    var cpuUtilizationdata, storageLoopsdata, memoryUseddata, storagethroughputdata, networkthroughputdata, storageNeeddata;
   // STATUS CHARTS DATA
    cpuUtilizationdata = {
        // A labels array that can contain any sort of values
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        // Our series array that contains series objects or in this case series data arrays
        series: [
            [5, 2, 4, 2, 0]
        ]
    };

    storageLoopsdata = {
        // A labels array that can contain any sort of values
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        // Our series array that contains series objects or in this case series data arrays
        series: [
            [5, 2, 4, 2, 0]
        ]
    };

    memoryUseddata = {
        // A labels array that can contain any sort of values
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        // Our series array that contains series objects or in this case series data arrays
        series: [
            [5, 2, 4, 2, 0]
        ]
    };
    storagethroughputdata = {
        // A labels array that can contain any sort of values
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        // Our series array that contains series objects or in this case series data arrays
        series: [
            [5, 2, 4, 2, 0]
        ]
    };
    networkthroughputdata = {
        // A labels array that can contain any sort of values
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        // Our series array that contains series objects or in this case series data arrays
        series: [
            [5, 2, 4, 2, 0]
        ]
    };
    storageNeeddata = {
        // A labels array that can contain any sort of values
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        // Our series array that contains series objects or in this case series data arrays
        series: [
            [5, 2, 4, 2, 0]
        ]
    };

    var options = {
        width: 300,
        height: 200
    };

    var responsiveOptions = [
        ['screen and (min-width: 641px) and (max-width: 1024px)', {
            seriesBarDistance: 10,
            axisX: {
                labelInterpolationFnc: function (value) {
                    return value;
                }
            }
        }],
        ['screen and (max-width: 640px)', {
            seriesBarDistance: 5,
            axisX: {
                labelInterpolationFnc: function (value) {
                    return value[0];
                }
            }
        }]
    ];

   // new Chartist.Line('#cpuUtilization', cpuUtilizationdata, options, responsiveOptions);
    //new Chartist.Line('#storageLoops', storageLoopsdata, options, responsiveOptions);

   // new Chartist.Line('#memoryUsed', memoryUseddata, options, responsiveOptions);
   // new Chartist.Line('#storagethroughput', storagethroughputdata, options, responsiveOptions);

   // new Chartist.Line('#networkthroughput', networkthroughputdata, options, responsiveOptions);
   // new Chartist.Line('#storageNeed', storageNeeddata, options, responsiveOptions);

    // FOR IP, DNS , GATEWAY INPUT
  $('.ip_address').mask('099.099.099.099');
    

})();
