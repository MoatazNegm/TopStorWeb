<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        
        <link rel="stylesheet" href="css/bootstrap.min.css" type="text/css" />
        <link rel="stylesheet" href="css/bootstrap-timepicker.min.css" type="text/css" />
        <script src="js/jquery.js"></script>
        <script src="js/bootstrap.min.js"></script>
        <script src="js/bootstrap-timepicker.min.js"></script>
    </head>
    <body class="row">
        <div class=" input-group   bootstrap-timepicker col-sm-offset-2 col-sm-4">
            <input id="timepicker1" type="text" class="form-control input-small">
            <span class=" input-group-addon"><i class="glyphicon glyphicon-time"></i></span>
            </input>
        </div>
			
        <script type="text/javascript">
            $('#timepicker1').timepicker({
                minuteStep: 1,


                showMeridian: false,

            });
        </script>
    </body>
</html>
