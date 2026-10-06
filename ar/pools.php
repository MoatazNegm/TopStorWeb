<!DOCTYPE html>
<?php session_start();
 if( $_REQUEST["idd"] != session_id() || $_SESSION["user"]=="") {  header('Location:Login.php');}
?>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>QuickStor</title>
    <!--META TAGS-->
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width">
    <link rel="icon" type="image/png" href="../assets/images/Qonly.png">

    <!--BOOTSTRAP CSS STYLE-->
    <link href="../assets/css/tether.min.css" rel="stylesheet" type="text/css">
    <link href="../assets/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css">

    <!--Font Awesome css-->
    <link href="../assets/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">

    <!--CUSTOME CSS-->
    <link href="../assets/css/main.css" rel="stylesheet" type="text/css">
</head>
<body>
<form  id="userpassform" type="hidden" method="post" action="../userpass.php">
			<input type="hidden" id="idduserpass" name="idd">
				<input type="hidden" value="Submit">
		</form>
<!--NAVBAR-->
<nav class="navbar">
    <!--<div class="container row">-->
    <div class="col-md-12">
        <a class="navbar-brand" href="#"><img src="../assets/images/logo.png"></a>
        <ul class="navbar-nav pull-right">
            <li class="nav-item dropdown user-dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink"
                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span><img src="../assets/images/user-icon.png"> </span><?php echo $_SESSION["user"] ?>
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <a class="dropdown-item ref" href="#" id="changepassword">كلمة السر</a>
                    <a class="dropdown-item ref" href="#" id="Login">خروج</a>
                </div>
            </li>
        </ul>
        <!--</div>-->
    </div>
</nav>
<!--MESSAGES-->
<div class="dr-messages">
    <div class="bg-warning">
        <button type="button" class="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="bg-danger">
        <button type="button" class="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="bg-success"><div id="texthere" dir="rtl"></div>
        <button type="button" id="close-success" style="margin-top: -2.4rem" class="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
</div>
<!--BODY CONTENT-->
<main class="col-md-12">
    <div class="row">
        <div class="col-md-1 main-menu">
          <ul class="nav flex-column" role="tablist">
              <li class="nav-item accounts">
                  <a class="ref nav-link " id="accounts" data-toggle="tab" href="#" role="tab">
                      <div></div>
                      الحسابات</a>
              </li>
              <li class="nav-item status">
                  <a class="ref nav-link " id="arstatus" href="#" role="tab">
                      <div></div>
                    الحالة  </a>
              </li>
              <li class="nav-item protocol">
                  <a class=" ref nav-link " id="protocol" href="#" role="tab">
                      <div></div>
                       المجلدات</a>
              </li>
              <li class="nav-item replication">
                  <a class="nav-link ref" href="#" id="replication" role="tab">
                      <div></div>
                      التوزيع</a>
              </li>
              <li class="nav-item pools">
                  <a class=" ref nav-link active" id="pools"  href="#" role="tab">
                      <div></div>
                      الحاويات</a>
              </li>
              <li class="nav-item config">
                  <a class="nav-link ref" href="#" id="config" role="tab">
                      <div></div>
                      الاعدادات</a>
              </li>
          </ul>
        </div>
        <div class="col-md-2 second-menu">
            <div class="tab-content">
                <div class="tab-pane active" id="pools" role="tabpanel">
                    <ul class="nav flex-column" role="tablist">
                        <li class="nav-item diskGroups">
                            <a id="diskGroupspane" class="nav-link active" data-toggle="tab" href="#diskGroups" role="tab">
                                <div></div>
                                <span>مجموعات الأقراص</span></a>
                        </li>
                        <li class="nav-item snapshots">
                            <a id="snapshotspane" class="nav-link" data-toggle="tab" href="#snapshots" role="tab">
                                <div></div>
                                <span>اللقطات</span></a>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
        <div class="col-md-9 main-content">
            <div class="tab-content">
                <div class="tab-pane active" id="diskGroups" role="tabpanel">
                <div class="col-2 pull-right text-right msgtype" style="margin-top: 0.4rem;">
                      <a href="javascript:getdisk=1;"><img src="../assets/images/refresh.png"> </a>
                </div>
                    <div id="diskimg">

                    </div>

                    <h1 id="poolmsg">لا يوجد حاويات عاملة. نرجو تكوين حاوية باختيار الأقراص المناسبة</h1>

                    <div id="requesttable" class="row table-responsive">
                        <table class="col-12 table  dr-table-show">
                            <thead>
                            <tr>
                                <th class="text-center">اختيار</th>
                                <th class="text-center">الاسم</th>
                                <th class="text-center">المساحة المستخدمة</th>
                                <th class="text-center">تكوين</th>
                                <th class="text-center">حذف</th>
                            </tr>
                            </thead>
                            <tbody id="DG">
                               <tr id="Pooldelete" style="font-size: 2rem; background: lightgrey;height: 12rem; text-align: center;">
                                <td class="text-center poolcrdel ">
                                    <div  class="poolcrdel">الحاويات العاملة </div>
                                </td>
                                <td id="poolname" class="poolcrdel text-center">p1</td>
                                <td id="poolsize" class="poolcrdel text-center">20G</td>
                               <td></td>
                                <td  class="poolcrdel" ><a href="javascript:pooldelete()"><div type="button"  class=" btn btn-danger ">حذف الحاوية</div></a></td>
                            	</tr>
										<tr id="Poolcreate" style="font-size: 2rem; background: lightgrey;height: 12rem; text-align: center;">
                                <td class="text-center poolcrdel ">
                                    <div  class="poolcrdel"> الحاويات العاملة</div>
                                </td>
                                <td id="poolname" class="poolcrdel text-center">p1</td>
                                <td id="crpoolsize" class="poolcrdel text-center">20G</td>
                                <td  class="poolcrdel"><a  href="javascript:poolcreatesingle()"><div type="button" class=" btn btn-submit ">تكوين الحاوية</div></a></td>
										  <td></td>
                            	</tr>

                            <tr id="Addspare">
                                <td class="text-center ">
                                    <input type="radio" class="form-check-input" name="diskRadios" checked="checked">
                                </td>
                                <td class="text-center">احتياطي</td>
                                <td class="text-center"></td>
                                <td class="text-center"><a href="javascript:pooladdspare()"><img
                                        src="../assets/images/plus-symbol-in-a-rounded-black-square.png"
                                        alt="can't upload Create icon"></a>
                                </td>

                            </tr>
                            <tr id="Addreadcache">
                                <td class="text-center ">
                                    <input type="radio" class="form-check-input" name="diskRadios" checked="checked">
                                </td>
                                <td class="text-center">مسرع للقراءة</td>
                                <td class="text-center"></td>
                                <td class="text-center"><a href="javascript:pooladdcache()"><img
                                        src="../assets/images/plus-symbol-in-a-rounded-black-square.png"
                                        alt="can't upload Create icon"></a>
                                </td>

                            </tr>
                            <tr id="Addwritecache">
                                <td class="text-center ">
                                    <input type="radio" class="form-check-input" name="diskRadios" checked="checked">
                                </td>
                                <td class="text-center">مسرع للقراءة و الكتابة</td>
                                <td class="text-center"></td>
                                <td class="text-center"><a href="javascript:pooladdlog()"><img
                                        src="../assets/images/plus-symbol-in-a-rounded-black-square.png"
                                        alt="can't upload Create icon"></a>
                                </td>

                            </tr>

                            <tr id="Delspecial">
                                <td class="text-center ">
                                    <input type="radio" class="form-check-input" name="diskRadios" checked="checked">
                                </td>
                                <td id="typeofdisk" class="text-center">دوره</td>
                                <td class="text-center"></td>
                                <td class="text-center"><div href="#">حذفه</div>
                                </td>
                                <td class="text-center"><a href="javascript:pooldelspecial()"><img src="../assets/images/delete.png"
                                                                         alt="can't upload delete icon"></a>
                                </td>
                            </tr>
                            <tr id="mirror">
                                <td class="text-center">
                                    <input type="radio" class="form-check-input" name="diskRadios">
                                </td>
                                <td class="text-center">مطابقة</td>
                                <td id="Mirrorsize" class="sizegb text-center">97.9GB</td>
                                <td class="text-center"><a href="javascript:poolcreatemirror()"><img
                                        src="../assets/images/plus-symbol-in-a-rounded-black-square.png"
                                        alt="can't upload Create icon"></a>
                                </td>

                            </tr>

                            <tr id="Addmirror">
                                <td class="text-center">
                                    <input type="radio" class="form-check-input" name="diskRadios">
                                </td>
                                <td class="text-center">إضافة زوج من الالأقراص المتطابقة</td>
                                <td id="Addmirrorsize" class="sizegb text-center">97.9GB</td>
                                <td class="text-center"><a href="javascript:pooladdmirror()"><img
                                        src="../assets/images/plus-symbol-in-a-rounded-black-square.png"
                                        alt="can't upload Create icon"></a>
                                </td>

                            </tr>
                            <tr id="Attachmirrored">
                                <td class="text-center">
                                    <input type="radio" class="form-check-input" name="diskRadios">
                                </td>
                                <td class="text-center">إضافة أقراص متطابقة</td>
                                <td id="Attachmirroredsize" class="sizegb text-center">97.9GB</td>
                                <td class="text-center"><a href="javascript:poolattachemirror()"><img
                                        src="../assets/images/plus-symbol-in-a-rounded-black-square.png"
                                        alt="can't upload Create icon"></a>
                                </td>

                            </tr>
                            <tr id="striped">
                                <td class="text-center">
                                    <input type="radio" class="form-check-input" name="diskRadios">
                                </td>
                                <td class="text-center" dir="rtl">موزع(بدون وفرة)</td>
                                <td id="Stripesize" class="sizegb text-center">97.9GB</td>
                                <td class="text-center"><a href="javascript:poolcreatestripe()"><img
                                        src="../assets/images/plus-symbol-in-a-rounded-black-square.png"
                                        alt="can't upload Create icon"></a>
                                </td>

                            </tr>

                            <tr id="raid-SingleRed">
                                <td class="text-center">
                                    <input type="radio" class="form-check-input" name="diskRadios">
                                </td>
                                <td class="text-center">وفرة أحادية</td>
                                <td id="SingleRed" class="sizegb text-center">97.9GB</td>
                                <td class="text-center"><a href="javascript:poolcreateraidsingle()"><img
                                        src="../assets/images/plus-symbol-in-a-rounded-black-square.png"
                                        alt="can't upload Create icon"></a>
                                </td>

                            </tr>
                            <tr id="addraid-SingleRed">
                                <td class="text-center">
                                    <input type="radio" class="form-check-input" name="diskRadios">
                                </td>
                                <td class="text-center">وفرة أحادية</td>
                                <td id="addSingleRed" class="sizegb text-center">97.9GB</td>
                                <td class="text-center"><a href="javascript:pooladdraidsingle()"><img
                                        src="../assets/images/plus-symbol-in-a-rounded-black-square.png"
                                        alt="can't upload Create icon"></a>
                                </td>

                            </tr>
                            <tr id="addraid-DualRed">
                                <td class="text-center">
                                    <input type="radio" class="form-check-input" name="diskRadios">
                                </td>
                                <td class="text-center">وفرة ثنائية</td>
                                <td id="adddualraid" class="sizegb text-center">97.9GB</td>
                                <td class="text-center"><a href="javascript:pooladdraiddual()"><img
                                        src="../assets/images/plus-symbol-in-a-rounded-black-square.png"
                                        alt="can't upload Create icon"></a>
                                </td>
                             </tr>
                             <tr id="addraid-TripleRed">
                                <td class="text-center">
                                    <input type="radio" class="form-check-input" name="diskRadios">
                                </td>
                                <td class="text-center">وفرة ثلاثية</td>
                                <td id="addtripleraid" class="sizegb text-center">97.9GB</td>
                                <td class="text-center"><a href="javascript:pooladdraidtriple()"><img
                                        src="../assets/images/plus-symbol-in-a-rounded-black-square.png"
                                        alt="can't upload Create icon"></a>
                                </td>
                             </tr>
                             <tr id="raid-DualRed">
                                <td class="text-center">
                                    <input type="radio" class="form-check-input" name="diskRadios">
                                </td>
                                <td class="text-center">وفرة ثنائية</td>
                                <td id="dualraid" class="sizegb text-center">97.9GB</td>
                                <td class="text-center"><a href="javascript:poolcreateraiddual()"><img
                                        src="../assets/images/plus-symbol-in-a-rounded-black-square.png"
                                        alt="can't upload Create icon"></a>
                                </td>
                             </tr>
                             <tr id="raid-TripleRed">
                                <td class="text-center">
                                    <input type="radio" class="form-check-input" name="diskRadios">
                                </td>
                                <td class="text-center">وفرة ثلاثية</td>
                                <td id="tripleraid" class="sizegb text-center">97.9GB</td>
                                <td class="text-center"><a href="javascript:poolcreateraidtriple()"><img
                                        src="../assets/images/plus-symbol-in-a-rounded-black-square.png"
                                        alt="can't upload Create icon"></a>
                                </td>
                             </tr>
                              <tr id="Addstriped">
                                <td class="text-center">
                                    <input type="radio" class="form-check-input" name="diskRadios">
                                </td>
                                <td class="text-center" dir="rtl">إضافة إلى التوزيعة الموجودة(بدون وفرة)</td>
                                <td id="AddStripesize" class="sizegb text-center">97.9GB</td>
                                <td class="text-center"><a href="javascript:pooladdstripe()"><img
                                        src="../assets/images/plus-symbol-in-a-rounded-black-square.png"
                                        alt="can't upload Create icon"></a>
                                </td>

                            </tr>
                             <tr id="splitmirror">
                                <td class="text-center poolcrdel">
                                    <input type="radio" class=" form-check-input" name="diskRadios">
                                </td>
                                <td class="text-center poolcrdel ">فصل التطابق</td>
                                <td id="MirrorSize" class="sizgb poolcrdel text-center">97.9GB</td>
                                <td class="text-center poolcrdel "><a href="#"><img
                                        src="../assets/images/plus-symbol-in-a-rounded-black-square.png"
                                        alt="can't upload Create icon"></a>
                                </td>
                                <td class="text-center"><a href="#"><div type="button" class=" btn btn-submit" >فصل التطابق<div></a>
                                </td>
                            </tr>
                            <tr id="readcache">
                                <td class="text-center">
                                    <input type="radio" class="form-check-input" name="diskRadios">
                                </td>
                                <td class="text-center">مسرع للقراءة فقط</td>
                                <td class="text-center" class="sizegb text-center">97.9GB</td>
                                <td class="text-center"><a href="#"><img
                                        src="../assets/images/plus-symbol-in-a-rounded-black-square.png"
                                        alt="can't upload Create icon"></a>
                                </td>
                                <td class="text-center"><a href="#"><img src="../assets/images/delete.png"
                                                                         alt="can't upload delete icon"></a>
                                </td>
                            </tr>
                              </tr>
                            <tr id="readwritecache">
                                <td class="text-center">
                                    <input type="radio" class="form-check-input" name="diskRadios">
                                </td>
                                <td class="text-center">مسرع متطابق للقراءة و الكتابة</td>
                                <td class="text-center" class="sizegb text-center">97.9GB</td>
                                <td class="text-center"><a href="#"><img
                                        src="../assets/images/plus-symbol-in-a-rounded-black-square.png"
                                        alt="can't upload Create icon"></a>
                                </td>
                                <td class="text-center"><a href="#"><img src="../assets/images/delete.png"
                                                                         alt="can't upload delete icon"></a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
                <div class="tab-pane " id="snapshots" role="tabpanel">
                    <form class="dr-form">
                        <div class="form-group row">
                            <label class="col-2 col-form-label">الحاوية</label>
                            <div class="col-5">
                                <select id="Pool" class="form-control">

                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-2 col-form-label">المجلدات</label>
                            <div class="col-5">
                                <select id="Vol" class="form-control">

                                </select>
                            </div>
                        </div>
                        <div class="form-group row" hidden>
                            <label class="col-2 col-form-label">To</label>
                            <div class="col-5">
                                <select class="form-control">
                                    <option>255.255.255.1</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label class="col-2 col-form-label">التكرار</label>
                            <div class="col-5">
                                <ul class="nav nav-pills" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link active" data-toggle="tab" href="#snapshotsOnce" role="tab">مرة واحدة</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" data-toggle="tab" href="#snapshotsHourly"
                                           role="tab">بالساعة</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" data-toggle="tab" href="#snapshotsMinutely" role="tab">بالدقيقة</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" data-toggle="tab" href="#snapshotsWeekly"
                                           role="tab">إسبوعياً</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="row tab-content">
                            <div class="tab-pane active" id="snapshotsOnce" role="tabpanel">
                                <label class="col-2 col-form-label">اسم اللقطة</label>
                                <div class="col-5">
                                    <input id="Oncename"  class="form-control" type="text">
                                </div>
                                <br>
                                <div class="margin-top col-md-12">
                                <a id="goodname" href="javascript:SnapshotCreate()" class="" >
                                    <div id="oncecreate" type="button" class="btn btn-submit col-3">أخذ اللقطة</div>
                                </a>
                                <div id="shortname" href="#" class="" >
                                    <div id="" type="button" class="btn ">اسم اللقطة صغير جداً</div>
                                </div>
                                </div>
                                <h1 class="col-md-12">اللقطات المتوافرة لهذا المجلد</h1>
                                <div class="row table-responsive">
                                    <table class="col-12 table dr-table-show">
                                        <thead>
                                        <tr>
                                       	  <th class="text-center">التاريخ</th>
                                       	   <th class="text-center">التوقيت</th>

                                            <th class="text-center">الحاوية</th>
                                            <th class="text-center">المجلد</th>
                                             <th class="text-center">الاسم</th>
                                            <th class="text-center">حذف</th>
                                            <th class="text-center">الرجوع للسابق</th>
                                        </tr>
                                        </thead>
                                        <tbody class="Snaplist">


                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="tab-pane " id="snapshotsHourly" role="tabpanel">
                                <label class="col-2 col-form-label">اللقطة دقيقة</label>
                                <div class="col-2">
                                    <input class="form-control" type="number"  id="Sminute" min="0" max="59" value="0">
                                </div>
                                <label class="col-1 col-form-label">كل..ساعة</label>
                                <div class="col-2">
                                    <input class="form-control" type="number" id="Hour" min="1" max="24" value="1">
                                </div>
                                <label class="col-1 col-form-label">احتفاظ</label>
                                <div class="col-2">
                                    <input class="form-control" type="number"  id="KeepHourly" min="1" value="1">
                                </div>
                                <div class="margin-top col-md-12">
                                	 <a  href="javascript:SnapshotCreate()" class="" >
                                    <div type="button" class="btn btn-submit SnapshotCreate col-3">إضافة مدة اللقطة</div>
                                  </a>
                                </div>
                                <h1 class="col-md-12" dir="rtl">جدولة اللقطة : بالساعة</h1>
                                <div class="row table-responsive">
                                    <table class=" table dr-table-show">
                                        <thead>
                                        <tr>
                                            <th class="text-center" dir="rtl">كل (ساعات)</th>
                                            <th class="text-center" dir="rtl">في (دقائق)</th>
                                            <th class="text-center" dir="rtl">احتفاظ (لقطات)</th>
                                            <th class="text-center">معرف</th>
                                            <th class="text-center">حذف</th>
                                        </tr>
                                        </thead>
                                        <tbody id="Hourlylist">


                                        </tbody>
                                    </table>
                                </div>
											 <h1 class="col-md-12">اللقطات المتوافرة لهذا المجلد</h1>
                                <div class="row table-responsive">
                                    <table class=" table dr-table-show">
                                        <thead>
                                        <tr>
                                         <th class="text-center">تاريخ</th>
                                       	   <th class="text-center">توقيت</th>

                                            <th class="text-center">حاوية</th>
                                            <th class="text-center">مجلد</th>
                                             <th class="text-center">اسم</th>
                                            <th class="text-center">حذف</th>
                                            <th class="text-center">الرجوع للسابق</th>
                                        </tr>
                                        </thead>
                                        <tbody class="Snaplist">


                                        </tbody>
                                    </table>
                                </div>

                            </div>
                            <div class="tab-pane" id="snapshotsMinutely" role="tabpanel">
                                <label class="col-2 col-form-label">كل.. دقيقة</label>
                                <div class="col-2">
                                    <input class="form-control" type="number"  id="Minute" min="1" max="59" value="1">
                                </div>
                                <label class="col-1 col-form-label">احتفظ</label>
                                <div class="col-2">
                                    <input class="form-control" type="number"  id="KeepMinutely" mi="1" value="1">
                                </div>
                                <div class="margin-top col-md-12">
                                	 <a  href="javascript:SnapshotCreate()" class="" >
                                    <div type="button" class="btn btn-submit SnapshotCreate col-3">تكوين مدة اللقطة</div>
                                  </a>
                                </div>
                                <h1 class="col-md-12">جدولة اللقطة: بالدقيقة</h1>

                                <div class="row table-responsive">
                                    <table class=" table dr-table-show">
                                        <thead>
                                        <tr>
                                            <th class="text-center" dir="rtl">كل (دقائق)</th>
                                            <th class="text-center" dir="rtl">احتفظ (لقطات)</th>
                                            <th class="text-center">معرف</th>
                                            <th class="text-center">حذف</th>

                                        </tr>
                                        </thead>
                                        <tbody id="Minutelylist">


                                        </tbody>
                                    </table>
                                </div>
											  <h1 class="col-md-12">اللطقات المتوافره لهذا المجلد</h1>
                                <div class="row table-responsive">
                                    <table class=" table dr-table-show">
                                        <thead>
                                        <tr>
                                         <th class="text-center">تاريخ</th>
                                       	   <th class="text-center">توقيت</th>

                                            <th class="text-center">حاوية</th>
                                            <th class="text-center">مجلد</th>
                                             <th class="text-center">اسم</th>
                                            <th class="text-center">حذف</th>
                                            <th class="text-center">الرجوع للسابق</th>
                                        </tr>
                                        </thead>
                                        <tbody class="Snaplist">

                                        </tbody>
                                    </table>
                                </div>

                            </div>
                            <div class="tab-pane" id="snapshotsWeekly" role="tabpanel">
                                <label class="col-2 col-form-label">اللقطة دقيقة</label>
                                <div class="col-2">
                                    <input  id="Stime" class="form-control" type="time" min="00:00" max="23:59" value="00:00">
                                </div>
                                <label class="col-2 col-form-label">كل يوم من الإسبوع</label>
                                <div class="col-2">
                                    <select id="Week" class="form-control">
                                    	<option value="Sat">السبت</option><option value="Sun">الأحد</option><option value="Mon">الإثنين</option><option value="Tue">الثلاثاء</option><option value="Wed">الأربعاء</option><option value="Thu">الخميس</option><option value="Fri">الجمعة</option>
												</select>
                                </div>
                                <label class="col-1 col-form-label">احتفظ</label>
                                <div class="col-2">
                                    <input class="form-control" type="number" min="1" id="KeepWeekly" value="1">
                                </div>

                                <div class="margin-top col-md-12">
                                	 <a  href="javascript:SnapshotCreate()" class="" >
                                    <div type="button" class="btn btn-submit SnapshotCreate col-3">تكوين جدولة اللقطة</div>
                                  </a>
                                </div>
                                <h1 class="col-md-12"dir="rtl">جدولة اللقطة: بالإسبوع</h1>
                                <div class="row table-responsive">
                                    <table class=" table dr-table-show">
                                        <thead>
                                        <tr>
                                            <th class="text-center"dir="rtl">توقيت(س.س:د.د)</th>
                                            <th class="text-center">يوم الإسبوع</th>
                                            <th class="text-center"dir="rtl">احتفظ (لقطات)</th>
                                            <th class="text-center">معرف</th>
                                            <th class="text-center">حذف</th>
                                        </tr>
                                        </thead>
                                        <tbody id="Weeklylist">

                                        </tbody>
                                    </table>
                                </div>
										  <h1 class="col-md-12">اللطقات المتوافر لهذا المجلد</h1>
                                <div class="row table-responsive">
                                    <table class=" table dr-table-show">
                                        <thead>
                                        <tr>
                                         <th class="text-center">التاريخ</th>
                                       	   <th class="text-center">التوقيت</th>

                                            <th class="text-center">االحاوية</th>
                                            <th class="text-center">المجلد</th>
                                             <th class="text-center">الاسم</th>
                                            <th class="text-center">حذف</th>
                                            <th class="text-center"الرجوع للسابق</th>
                                        </tr>
                                        </thead>
                                        <tbody class="Snaplist">

                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                        <!--<div>-->
                            <!--<button type="submit" class="btn btn-danger btn-rollback  col-3">rollback to snapshots-->
                            <!--</button>-->
                        <!--</div>-->
                    </form>
                </div>

            </div>
        </div>
    </div>
</main>
<form id="Loginref" action="Login.php" method="post">
	<input type="hidden" name="idd" value="<?php print session_id();?>" >
</form>
<form id="changepasswordref" action="changepassword.php" method="post">
	<input type="hidden" name="idd" value="<?php print session_id();?>" >
</form>
<form id="accountsref" action="accounts.php" method="post">
	<input type="hidden" name="idd" value="<?php print session_id();?>" >
</form>
<form id="arstatusref" action="../arstatus.php" method="post">
	<input type="hidden" name="idd" value="<?php print session_id();?>" >
</form>
<form id="protocolref" action="protocol.php" method="post">
	<input type="hidden" name="idd" value="<?php print session_id();?>" >
</form>
<form id="replicationref" action="replication.php" method="post">
	<input type="hidden" name="idd" value="<?php print session_id();?>" >
</form>
<form id="poolsref" action="pools.php" method="post">
	<input type="hidden" name="idd" value="<?php print session_id();?>" >
</form>
<form id="configref" action="config.php" method="post">
	<input type="hidden" name="idd" value="<?php print session_id();?>" >

<!--JAVA SCRIPT-->
<!--JQUERY SCROPT-->
<script src="../assets/js/jquery.min.js"></script>

<!--BOOTSTRAP SCRIPT-->
<script src="../assets/js/tether.min.js"></script>
<script src="../assets/bootstrap/js/bootstrap.min.js"></script>

<script src="../assets/js/chartist-js-develop/dist/chartist.min.js"></script>

<script src="../assets/js/dropzen.js"></script>

<!--CUSTOM JS-->
<script>

			var Vollisttime="44:333:222";
			var Vollisttime2="44:333:222";
			var times= { "snaps":"30:43:433", "periods":"30:43:433" };
			var requiredtime={ "snaps":"33==:433", "periods":"30==erwe:43:433" }
			var Vollisttimenew="23:434:34543";
			var status=0;
			var olddata=[]
			var panesel="hifirst";
			var snapsel="hihi";
			var syscounter=10;
			var syscounter2=1000;
			var getdisk=0;
			var runningpool=0;
			var runningroup=0;
			var dd=[];
			var olddiskpool=0;
			var oldcurrentinfo="";
			var disks=[];
			var pools=[];
			var gdata;
			var ddk;
			var minspace; var maxspace;
		$(".ref").click(function() {
					//console.log("session before","<?php print session_id(); ?>");
					if($(this).attr('id')=="Login")
					{
						$.post("sessionout.php",function(data){
						document.getElementById('Login'+'ref').submit();
						//console.log("session after",data);
						});
						//console.log("login");

					} else {
					document.getElementById($(this).attr('id')+'ref').submit();
					}
		 //console.log($(this).attr('id'));
		});


			$(".bg-success").show();$(".bg-danger").hide();$(".bg-warning").hide();
			$("#DG tr").hide();
			$("#deletePool").hide();$("#submitdiskgroup").hide();$(".finish").hide();$("#SnapshotCreatediv").hide();
		function SS(){

				   var alltabsAcco=0;var alltabsStat=0;var alltabsProt=0;var alltabsRepli=0;var alltabsPool=0;var alltabsUP=0;
				   var userprivAccoAD="false"; var userprivAccoBU="false"; var userprivAccoEr="false";
					var userprivStatSC="false"; var userprivStatLo="false";
					var userprivProtCI="false"; var userprivProtNF="false";
					var userprivRepliPa="false"; var userprivRepliSe="false"; var userprivRepliRe="false";
					var userprivPoolDG="false"; var userprivPoolSS="false";
					var userprivUserPrivileges="false"; var userprivUpload="false";
					var curuser="<?php echo $_SESSION["user"] ?>";
					if(curuser!="admin"){
					$.get("../requestdata.php", { file: 'Data/userpriv.txt' },function(data){
						var gdata = jQuery.parseJSON(data);
						for (var prot in gdata){
							if(gdata[prot].user=="<?php echo $_SESSION["user"] ?>") {
								userprivAccoAD=gdata[prot].Active_Directory; userprivAccoBU=gdata[prot].Box_Users; userprivAccoEr=gdata[prot].Error
								userprivStatSC=gdata[prot].Service_Charts;userprivStatLo=gdata[prot].Logs;
								userprivProtCI=gdata[prot].CIFS; userprivProtNF=gdata[prot].NFS;
								userprivRepliPa=gdata[prot].Partners; userprivRepliRe=gdata[prot].Replication; userprivRepliSe=gdata[prot].Senders;
								userprivPoolDG=gdata[prot].DiskGroups; userprivPoolSS=gdata[prot].SnapShots;
								userprivUserPrivileges=gdata[prot].UserPrivilegesch;userprivUpload=gdata[prot].Uploadch;

							}
						};
						if(userprivAccoAD!="true") { $(".activeDirectory").hide(); $("#activeDirectory").hide(); alltabsAcco=1;}
						if(userprivAccoBU!="true") { $(".boxUsers").hide(); $("#boxUsers").hide(); alltabsAcco=alltabsAcco+1;}
						if(userprivAccoEr!="true") { $(".boxProperties").hide(); $("#boxProperties").hide(); alltabsAcco=alltabsAcco+1;}
						if(alltabsAcco==3) { $(".accounts").hide()}
						if(userprivStatSC!="true") { $(".servicestatus").hide(); $("#servicestatus").hide(); alltabsStat=1;} 	else { $(".servicestatus").show(); $("#servicestatus").show();}
						if(userprivStatLo!="true") { $("#Logs").hide(); $("#Logspanel").hide();alltabsStat=alltabsStat+1;}
						if(alltabsStat==2) { $(".status").hide();}
						if(userprivProtCI!="true") { $(".cifs").hide(); $("#cifspane").hide(); alltabsProt=1;}
						if(userprivProtNF!="true") { $(".nfs").hide(); $("#nfspane").hide(); alltabsProt=alltabsProt+1;}
						if(alltabsProt==2) { $(".protocol").hide()}
						if(userprivRepliPa!="true") { $(".partner").hide(); $("#partner").hide(); alltabsRepli=1;}
						if(userprivRepliSe!="true") { $(".sender").hide(); $("#sender").hide(); alltabsRepli=alltabsRepli+1;}
						if(userprivRepliRe!="true") { $(".recive").hide(); $("#receiver").hide(); alltabsRepli=alltabsRepli+1;}
						if(alltabsRepli==3) { $(".replication").hide()}
						if(userprivPoolDG!="true") { $(".diskGroups").hide(); $("#diskGroups").hide(); alltabsPool=1;}
						if(userprivPoolSS!="true") { $(".snapshots").hide(); $("#snapshots").hide(); alltabsPool=alltabsPool+1;}
						if(alltabsPool==2) { $(".pools").hide()}
						if(userprivUserPrivileges!="true") { $(".userPrivlliges").hide(); $("#userPrivlliges").hide(); alltabsUP=1;}
						if(userprivUpload!="true") { $(".firmware").hide(); $("#firmware").hide(); alltabsUP=alltabsUP+1;}
						if(alltabsUP==2) { $(".config").hide()}

					});
				};
			};
			function refreshList3(request,listid,fileloc) {
				if(syscounter2==1000) { $.post("../pump.php", { req: request, name:"a" }); }

				$.get("../requestdatein.php", { file: fileloc+"updated" }, function(data){

					var objdate = jQuery.parseJSON(data);
					Vollisttimenew=objdate.updated;

				});
				if(Vollisttime==Vollisttimenew) {
				} else {
					Vollisttime=Vollisttimenew;

					$(listid+" option.vvariable").remove();
					$.get("../requestdata.php", { file: fileloc }, function(data){
						var gdata = jQuery.parseJSON(data);
						$(listid+" option.vvariable").remove();
						$("#Pool option.variable2").remove();
						chartdata=[];
						for (var prot in gdata){
							if ($.inArray(gdata[prot].Pool,pools) < 0 ) {
										pools.push(gdata[prot].Pool);
										$("#Pool").append($('<option class="variable2">').text(gdata[prot].uPool).val(gdata[prot].class));
										chartdata.push(gdata[prot].class);
										//chartdata[gdata[prot].class]=[];
							}

							$(listid).append($('<option class="vvariable '+gdata[prot].class+'">').text(gdata[prot].name).val(gdata[prot].name));
							console.log("listid",listid)
							//chartdata.push([gdata[prot].Volumes[x].name,parseFloat(gdata[prot].Volumes[x].properties[0].volsize)])

						}
						$("#Pool").change()
							pools = [];
					});
				}
			};

			function snaponce(txtin,but,altbut,comp){

						var chars=$(txtin).val().length;

						if ( chars < 3 ) {  $(but).show();$(comp).addClass("NotComplete")
												 $(altbut).hide();
						} else 					{	$(but).hide();
												 $(altbut).show();$(comp).removeClass("NotComplete")
						};
			};

			function refreshall() { //check pool status

				$.get("requestdata3.php", { file: '../Data/currentinfo2.log2' }, function(data){ if(data!=oldcurrentinfo){oldcurrentinfo=data;  $(".bg-success").show(); $("#texthere").text(data);}});
				if($("#diskGroupspane").hasClass('active'))  { if (panesel !="diskgroup") { syscounter2=1000; Vollisttime2="skldjfadks"; panesel="diskgroup";}};
				if($("#snapshotspane").hasClass('active'))  { if (panesel !="snapshot") { syscounter2=1000; Vollisttime2="skldjfadks"; panesel="snapshot"; snaponce("#Oncename","#shortname","#goodname","#Oncename");}};
				if (panesel == "diskgroup") {
				if(getdisk==1 ){getdisk=0; $.post("../pump.php", { req: "GetDisklist", name:"a" }); }

					$.get("../requestdata.php", { file: "Data/disklist.txt" },function(data){
						if(data!=olddiskpool) {


						var jdata = jQuery.parseJSON(data);
						if(typeof jdata =='object') {
							console.log("changed")
								$("#DG tr").hide();
							olddiskpool=data
						disks=[];
						var k;
						 $(".disk-image").remove();
						for (var disk in jdata){

							disks.push(jdata[disk].id)
							k=jdata[disk].id;
							disks[jdata[disk].id]=[]
							disks[jdata[disk].id]["name"]=jdata[disk].name;
							disks[jdata[disk].id]["host"]=jdata[disk].host;
							disks[jdata[disk].id]["pool"]=jdata[disk].pool;
							disks[jdata[disk].id]["size"]=jdata[disk].size;
							disks[jdata[disk].id]["poolsize"]=jdata[disk].poolsize;
							disks[jdata[disk].id]["grouptype"]=jdata[disk].grouptype;
							disks[jdata[disk].id]["InGroupDisk1"]=jdata[disk].InGroupDisk1;
							disks[jdata[disk].id]["InGroupDisk2"]=jdata[disk].InGroupDisk2;
							disks[jdata[disk].id]["id"]=jdata[disk].id;
							disks[jdata[disk].id]["class"]="empty";

							$("#diskimg").append('<a id="'+k+'" href="javascript:diskclick(\''+k+'\')"> <img class="img-fluid disk-image disk'+k+'" src="../assets/images/disk-image.png" alt="can\'t upload disk images"></a>')
							disks[k]["selected"]=0;

						}
						setstatus();
					}
					} else {}

					});

				}


				if (panesel == "snapshot") {
					refreshList("GetSnaplist",".Snaplist","Data/listsnaps.txt","snaps","snaps");
					refreshList("GetPoolperiodlist","#all","Data/periodlist.txt","periods","periods")
					refreshList3("GetPoolVollist","#Vol","Data/Vollist.txt");
					if($("#snapshotsOnce").hasClass('active'))  { ;if (snapsel !="Once") {times["snaps"]="hithihi"; syscounter2=1000; Vollisttime2="skldjfadks"; snapsel="Once";}};
					if($("#snapshotsHourly").hasClass('active'))  { ;if (snapsel !="Hourly") { syscounter2=1000; Vollisttime2="skldjfadks"; snapsel="Hourly";}};
					if($("#snapshotsMinutely").hasClass('active'))  { ;if (snapsel !="Minutely") { syscounter2=1000; Vollisttime2="skldjfadks"; snapsel="Minutely";}};
					if($("#snapshotsWeekly").hasClass('active'))  { ;if (snapsel !="Weekly") { syscounter2=1000; Vollisttime2="skldjfadks"; snapsel="Weekly";}};

				}
			}
	function setstatus() {
		runningpool=0;

		for (k in disks) {
	/*  if grouptype is free  status free, if pool=pxx   poolstatus="exists" ,if poolstats=exists : "grouptype:stripe :  .. disktstatus=single;, grouptype=mirror, raidsingle, raid-dual readwritecache ,  : diskstatus=grouped next,preceding=join

	*/	$(".disk"+k).addClass(disks[k].grouptype)
			if(disks[k].grouptype=="stripe") {
					$("#poolmsg").text("Pool p1 is running on disk: "+k); $("#poolsize").text(disks[k].poolsize+"GB")
					$("#Pooldelete").show();
					runningpool=disks[k].pool;

			}

		}
		setaction();
	}
	function setaction()	{
		var freedisk=0;
		var possiblenotstripe=0;
		var foundselected=0;
		var selectingdisks;
		var selectingdisks2;
		var poolmsg="";

		   var diskid=0;
		runningpool=0;
		runningroup="";
		dd=[];
		for (k in disks) {
			if(k > 0 ) {

				if(disks[k].selected==1 && (disks[k].grouptype=="free" || disks[k].grouptype=="spare" || disks[k]["grouptype"]=="cache" || disks[k]["grouptype"]=="log")) {
					foundselected=1
					possiblenotstripe=possiblenotstripe+1; dd[possiblenotstripe]=disks[k];
				//console.log('1hi',possiblenotstripe, dd[1])

				}
		   	if(disks[k].pool!="free"){
		   		runningpool=disks[k].pool;
		   		selectingdisks=disks[k].grouptype;
		   		if(selectingdisks=="cache"){ selectingdisks="read cache"}
		   		if(selectingdisks=="log"){ selectingdisks="read/write cache"}
		   		runningroup=runningroup+selectingdisks
		   	}


			}
			for(k in dd) {
				if(k > 0) {
					if(dd[k].grouptype=="spare" || dd[k]["grouptype"]=="cache" || dd[k]["grouptype"]=="log") {;foundselected=-1; console.log("hi",foundselected) }
		   		console.log(k,foundselected)

				}

			}

		}
		if(foundselected==-1) {

			$("#DG tr").hide();
			if(possiblenotstripe==1) { $("#poolmsg").text("remove the "+dd["1"].grouptype+" disk"+dd["1"].id);
			selectingdisks="spare"
				if(dd["1"].grouptype=="cache"){selectingdisks="read cache"}
				if(dd["1"].grouptype=="log"){selectingdisks="read/write cache"}
				$("#Delspecial").show();$("#typeofdisk").text(selectingdisks);
			}
		}
		if(possiblenotstripe > 0 && foundselected==1)  {
			$("#DG tr").hide();
			if(possiblenotstripe==1 && runningpool==0) {
					$("#poolmsg").text("Pool p1 with no redundancy can be created from disk : "+dd["1"].id+" please choose below to create it"); $("#crpoolsize").text(dd["1"].size+"GB")
					$("#Poolcreate").show();

			}
			if(possiblenotstripe==2 && runningpool==0) {

			$("#poolmsg").text("Pool p1 with mirrored disks: disk"+dd["1"].id+", disk"+dd["2"].id+"  can be created. please choose below"); $("#crpoolsize").text(dd["1"].size+"GB")
					$("#mirror").show(); $("#striped").show()
					$("#Stripesize").text((parseInt(dd["1"].size)+parseInt(dd["2"].size))+"GB");
					$("#Mirrorsize").text(dd["1"].size+"GB");
					if (parseInt(dd["1"].size) > parseInt(dd["2"].size)) {$("#Mirrorsize").text(dd["2"].size+"GB"); }



			}
			if(possiblenotstripe==3 && runningpool==0) {

				$("#poolmsg").text("Pool p1 with one disk redundancy or no redundancy using disk"+dd["1"].id+", disk"+dd["2"].id+", disk"+dd["3"].id+"  can be created. please choose below"); $("#crpoolsize").text(dd["1"].size+"GB")
					$("#raid-SingleRed").show(); $("#striped").show();


					minspace=parseInt(dd["1"].size); maxspace=0;

					for(ddk in dd){

						if (ddk > 0) {
							if (parseInt(dd[ddk].size) < minspace) { minspace=parseInt(dd[ddk].size)}
							maxspace=maxspace+parseInt(dd[ddk].size)

						}

					}

					$("#SingleRed").text((minspace*2)+"GB"); $("#Stripesize").text(maxspace+"GB")
				}
				if(possiblenotstripe==4 && runningpool==0) {
					poolsmg="Pool p1 with : one/dual disk redundancy or no redunancy using disk";
				//$("#poolmsg").text("Pool p1 with : one disk redundancy/dual disk or no redunancy using disk"+dd["1"].id+", disk"+dd["2"].id+", disk"+dd["3"].id+"  can be created. please choose below"); $("#crpoolsize").text(dd["1"].size+"GB")
					$("#raid-SingleRed").show(),$("#raid-DualRed").show();$("#striped").show();
					diskcount=0;
					minspace=parseInt(dd["1"].size)
					maxspace=0;
					for(ddk in dd){
						if (ddk > 0) {
							poolsmg=poolsmg+dd[ddk].id+", disk"
							if (parseInt(dd[ddk].size) < minspace) { minspace=parseInt(dd[ddk].size)}
							maxspace=maxspace+parseInt(dd[ddk].size)
							diskcount=diskcount+1;
						}

					}
					selectingdisks=poolsmg
					$("#poolmsg").text(selectingdisks+" can be created. please choose below");
					$("#SingleRed").text((minspace*(diskcount-1))+"GB");$("#Stripesize").text(maxspace+"GB"); $("#dualraid").text(minspace*(diskcount-2)+"GB")
				}
				if(possiblenotstripe>4 && runningpool==0) {
					poolsmg="Pool p1 with : one/dual/triple disk redundancy or no redunancy using disk";
				//$("#poolmsg").text("Pool p1 with : one disk redundancy/dual disk or no redunancy using disk"+dd["1"].id+", disk"+dd["2"].id+", disk"+dd["3"].id+"  can be created. please choose below"); $("#crpoolsize").text(dd["1"].size+"GB")
					$("#raid-SingleRed").show(),$("#raid-DualRed").show(); $("#raid-TripleRed").show();$("#striped").show();
					diskcount=0;
					minspace=parseInt(dd["1"].size)
					maxspace=0;
					for(ddk in dd){
						if (ddk > 0) {
							poolsmg=poolsmg+dd[ddk].id+", disk"
							if (parseInt(dd[ddk].size) < minspace) { minspace=parseInt(dd[ddk].size)}
							maxspace=maxspace+parseInt(dd[ddk].size)
							diskcount=diskcount+1;
						}

					}
					selectingdisks=poolsmg
					$("#poolmsg").text(selectingdisks+" can be created. please choose below");
					$("#SingleRed").text((minspace*(diskcount-1))+"GB");$("#Stripesize").text(maxspace+"GB"); $("#dualraid").text(minspace*(diskcount-2)+"GB");$("#tripleraid").text(minspace*(diskcount-3)+"GB")
				}

			if(possiblenotstripe==1 && runningpool!=0) {
				var sparevalid;
				if(dd[possiblenotstripe].grouptype=="free"){
					maxspace=parseInt(dd["1"].size);
					minspace=parseInt(dd["1"].size)
					var sparevalid=0;
					for(ddk in disks){
						if(disks[ddk].grouptype!="free" && ddk > 0){

							maxspace=maxspace+parseInt(disks[ddk].size)
							//console.log(maxspace, minspace, disks[ddk].grouptype, parseInt(disks[ddk].poolsize), minspace-parseInt(disks[ddk].poolsize))
							if(parseInt(dd["1"].size) >= parseInt(disks[ddk].size) ) { sparevalid=1;}
							if (parseInt(disks[ddk].poolsize)<=minspace) { minspace=parseInt(disks[ddk].poolsize); } else { minspace=0;}
							if(disks[ddk].grouptype=="mirror" || disks[ddk].grouptype=="stripe") {dd["2"]=disks[ddk]}
							//console.log(maxspace, minspace, disks[ddk].grouptype, parseInt(disks[ddk].poolsize))

						}


					}

					if(runningroup.indexOf('stripe') > -1){
						poolmsg="Pool p1 can be expanded by adding disk"+dd["1"].id+" (no redundancy) or mirrored. please select from below"
						$("#poolmsg").text(poolmsg);
						$("#Addstriped").show();
						$("#AddStripesize").text(maxspace+"GB"); if(minspace > 0) {$("#Attachmirrored").show(); $("#Attachmirroredsize").text(minspace+"GB")};

					}
					if(runningroup.indexOf('mirror') > -1 && minspace > 0) {


						poolmsg="Pool p1 can be more redundant by adding disk"+dd["1"].id+"  mirrored. please select from below"
						$("#poolmsg").text(poolmsg);
						$("#Attachmirrored").show(); $("#Attachmirroredsize").text(minspace+"GB");
						if(sparevalid==1) { $("#Addspare").show();}
						$("#Addreadcache").show(); $("#Addwritecache").show()


					}
					if(runningroup.indexOf('stripe') < 0) {

					poolmsg="Pool p1 performance can be increased by adding cache using disk"+dd["1"].id+"please select from below"
					if(sparevalid==1) { $("#Addspare").show();poolmsg="Pool p1 performance or recoverability can be increased by adding cache or spare using disk"+dd["1"].id+"please select from below"}
					$("#Addreadcache").show(); $("#Addwritecache").show()


					}
				}


			}
			if(possiblenotstripe>1 && runningpool!=0) {
				selectingdisks4=0;
				maxspace=0

				for(ddk in disks){
					if(disks[ddk].grouptype!="free" && ddk > 0){
							maxspace=maxspace+parseInt(disks[ddk].size)
							minspace=parseInt(disks[ddk].poolsize);


					}
				}
				if(runningroup.indexOf('stripe') > -1){
					poolmsg="Pool p1 can be expanded by adding disk"

					;
					for(ddk in dd) { if(ddk > 0){ maxspace=maxspace+parseInt(dd[ddk].size);poolmsg=poolmsg+dd[ddk].id+", "}}
					$("#poolmsg").text(poolmsg.slice(0,-2)+" (no redundancy)  please select from below");
					$("#Addstriped").show();
					$("#AddStripesize").text(maxspace+"GB");
				}
				if(runningroup.indexOf('stripee') < 0 && possiblenotstripe==2) {
					maxspace=parseInt(dd["1"].size);

				poolmsg="Pool p1 can be expanded by adding a pair of mirrored disks using disks: "
					for(ddk in dd) { if(ddk > 0){ if(parseInt(dd[ddk].size) <= maxspace){ maxspace=parseInt(dd[ddk].size) };poolmsg=poolmsg+dd[ddk].id+", "}}
					minspace=minspace+maxspace;
					$("#poolmsg").text(poolmsg.slice(0,-2)+" (no redundancy)  please select from below");
					$("#Addmirror").show();
					$("#Addmirrorsize").text(minspace+"GB");



				}
				if(runningroup.indexOf('stripe') < 0 && possiblenotstripe==3) {
					poolmsg="Pool p1 can be expanded by adding a single redunancy group of disks using disk "
					minspace=parseInt(dd["1"].size); maxspace=0;
					for(ddk in dd){

						if (ddk > 0) {
							if (parseInt(dd[ddk].size) < minspace) { minspace=parseInt(dd[ddk].size)}

							poolmsg=poolmsg+dd[ddk].id+", ";

						}

					}
					for(ddk in disks) { if(disks[ddk].pool!="free"){ maxspace=parseInt(disks[ddk].poolsize)}}
					$("#addraid-SingleRed").show();
					$("#poolmsg").text(poolmsg.slice(0,-2)+" please select from below");
					$("#addSingleRed").text((maxspace+(minspace*2))+"GB");
				}
				if(runningroup.indexOf('stripe') < 0 && possiblenotstripe==4) {
					poolmsg="Pool p1 can be expanded by adding a single/Dual redundancy group of disks using disk "
					minspace=parseInt(dd["1"].size); maxspace=0;
					for(ddk in dd){

						if (ddk > 0) {
							if (parseInt(dd[ddk].size) < minspace) { minspace=parseInt(dd[ddk].size)}

							poolmsg=poolmsg+dd[ddk].id+", ";

						}

					}
					for(ddk in disks) { if(disks[ddk].pool!="free"){ maxspace=parseInt(disks[ddk].poolsize)}}
					$("#addraid-SingleRed").show();$("#addraid-DualRed").show();
					$("#poolmsg").text(poolmsg.slice(0,-2)+" please select from below");
					$("#addSingleRed").text((maxspace+(minspace*3))+"GB"); $("#adddualraid").text((maxspace+(minspace*2))+"GB");
				}
				if(runningroup.indexOf('stripe') < 0 && possiblenotstripe>4) {
					poolmsg="Pool p1 can be expanded by adding a single/Dual or Triple redunancy group of disks using disk "
					minspace=parseInt(dd["1"].size); maxspace=0;
					var diskcount=0;
					for(ddk in dd){

						if (ddk > 0) {
							if (parseInt(dd[ddk].size) < minspace) { minspace=parseInt(dd[ddk].size)}
							diskcount=diskcount+1;
							poolmsg=poolmsg+dd[ddk].id+", ";

						}

					}

					for(ddk in disks) { if(disks[ddk].pool!="free"){ maxspace=parseInt(disks[ddk].poolsize)}}
					$("#addraid-SingleRed").show();$("#addraid-DualRed").show();$("#addraid-TripleRed").show();
					$("#poolmsg").text(poolmsg.slice(0,-2)+" please select from below");
					$("#addSingleRed").text((maxspace+(minspace*(diskcount-1)))+"GB"); $("#adddualraid").text((maxspace+(minspace*(diskcount-2)))+"GB"); $("#addtripleraid").text((maxspace+(minspace*(diskcount-3)))+"GB");
				}



		}
		}

		if((possiblenotstripe==0 ) && runningpool!=0) {

			$("#DG tr").hide(); $("#Pooldelete").show();

		   for (id in disks) {
		   	if(disks[id]["pool"]!="free" && disks[id]["class"]=="empty") {
		   		selectingdisks2=disks[id].grouptype;
		   		if(selectingdisks2=="cache"){ selectingdisks2="read cache"}
		   		if(selectingdisks2=="log"){ selectingdisks2="read/write cache"}
					disks[id]["class"]=selectingdisks2+" for disks: "+id
   				selectingdisks=disks[id]["InGroupDisk2"]
					while(selectingdisks != "notavailable") {

						diskid=toggleDiskselect(selectingdisks,2,"InGroupDisk2","inpool");
						disks[id]["class"]=disks[id]["class"]+","+diskid
						disks[diskid]["class"]=disks[id]["class"]+diskid+", "
						//console.log(id, diskid, disks[id]["class"])
						selectingdisks=toggleDiskselect(selectingdisks,disks[id]["selected"],"InGroupDisk2","Inpool");


					}
					selectingdisks=disks[id]["InGroupDisk2"]

					while(selectingdisks != "notavailable") {
						diskid=toggleDiskselect(selectingdisks,2,"InGroupDisk2","inpool");
						disks[diskid]["class"]=disks[id]["class"]
						selectingdisks=toggleDiskselect(selectingdisks,disks[id]["selected"],"InGroupDisk2","Inpool");
					}

		    	}
		   }
		   selectingdisks="الحاوية تحتوي على: "
		   for (id in disks) {
				if(disks[id]["pool"]!="free" && id > 0) {

				if(selectingdisks.indexOf(disks[id]["class"]) < 0 ) { ; selectingdisks=selectingdisks+disks[id]["class"]+", "}
				$("#poolsize").text(disks[id]["poolsize"]+"GB")
				$(".disk"+id).addClass(disks[id].grouptype);
				}
		   selectingdisks2=selectingdisks.replace("raid1","وفرة أحادية القرص");
		   var selectingdisks3=selectingdisks2.replace("raid2","وفرة ثنائية القرص");
		   var selectingdisks4=selectingdisks3.replace("raid3","وفرة ثلاثية القرص");
       selectingdisks4=selectingdisks4.replace("stripe for disks","توزيعة على الأقراص")
;		   $("#poolmsg").text(selectingdisks4.slice(0,-2));

		   }
		}

		if(possiblenotstripe==0 && runningpool==0) { $("#DG tr").hide(); $("#poolmsg").text("لا يوجد حاوية عاملة، نرجو تكوين حاوية عن طريق اختيار الأقراص الملائمة")};
	}
		function diskclick(id) {
			  var selectingdisks;
			  syscounter2=800
					$(".disk"+id).toggleClass("SelectedFree");
					if($(".disk"+id).hasClass("SelectedFree")) {
						disks[id]["selected"]=1;
						if(disks[id]["grouptype"]!="free") {
							for (k in disks) {
								if (k != id) {
									if(disks[k]["grouptype"]!="free"){
										disks[k]["selected"]=0;
										$(".disk"+k).removeClass("SelectedFree");
									}
								}
							}
						}
					} else { disks[id]["selected"]=0; }
					if(disks[id]["grouptype"]!="free" && disks[id]["grouptype"]!="spare" && disks[id]["grouptype"]!="cache" && disks[id]["grouptype"]!="log" ) {

						selectingdisks=disks[id]["InGroupDisk1"]
						while(selectingdisks != "notavailable") {

							selectingdisks=toggleDiskselect(selectingdisks,disks[id]["selected"],"InGroupDisk1","SelectedFree");
						}
						selectingdisks=disks[id]["InGroupDisk2"]
						while(selectingdisks != "notavailable") {

							selectingdisks=toggleDiskselect(selectingdisks,disks[id]["selected"],"InGroupDisk2","SelectedFree");
						}
					}
				setaction();
			}

			function toggleDiskselect(dd,sel,nextd,webclass) {
				var nextdisk="notavailable"
				for (k in disks){

				  	if (disks[k]["name"]==dd) {
						if(sel==1){
							$(".disk"+k).addClass(webclass); disks[k]["selected"]=1; nextdisk=disks[k][nextd]
					 	}
						if(sel==0) {

					 		$(".disk"+k).removeClass(webclass); disks[k]["selected"]=0; nextdisk=disks[k][nextd]
					 	}
				  	}

				  if(sel==2) {
				  	if (disks[k]["name"]==dd) {
						nextdisk=disks[k]["id"]
					}
				  }
				}
				return nextdisk;
			}

			function refreshList(req,listid,fileloc,showtime,update) {
				if(syscounter2==1000){$.post("../pump.php", { req: req, name:"a" }, function (data1){});};
					$.get("../requestdatein.php", { file: fileloc+"updated" }, function(data){
					var objdate = jQuery.parseJSON(data);
					requiredtime[showtime]=objdate.updated;

				});

				if(times[showtime]==requiredtime[showtime]) {
				}
				else {
					times[showtime]=requiredtime[showtime];
					//$(listid+" tr.variable").remove();
					$.get("../requestdata.php", { file: fileloc }, function(data){
						if(data!=olddata[showtime]) {
							olddata[showtime]=data
						var gdata = jQuery.parseJSON(data);

						$("."+update).remove();
					console.log(gdata)
						for (var prot in gdata){

								if(showtime=="snaps" ) {
									//$(listid).append($('<option class="variable">').text(gdata[prot].onlyname+" on  "+gdata[prot].creation+ " "+ gdata[prot].time).val(gdata[prot].name));
							//	$(listid).append($('<option class="variable '+update+' '+gdata[prot].pool+' '+gdata[prot].father+'">').text(gdata[prot].onlyname+" on  "+gdata[prot].creation+ " "+ gdata[prot].time).val(gdata[prot].name));
								$(listid).append('<tr class="variable '+update+' '+gdata[prot].pool+' '+gdata[prot].father+'"><td class="text-center">'+gdata[prot].creation+"</td><td class='text-center'>"+ gdata[prot].time+"</td><td class='text-center'>"+gdata[prot].pool+"</td><td class='text-center'>"+gdata[prot].father+"</td><td class='text-center'>"+gdata[prot].onlyname+'</td><td class="text-center"><a href="javascript:SnapshotDelete(\''+gdata[prot].name+'\')"><img src="../assets/images/delete.png"</td><td class="text-center"><a href="javascript:SnapshotRollback(\''+gdata[prot].name+'\')"><img src="../assets/images/return.png" alt="can\'t upload delete icon"></a></td></tr>');
								$("#Vol").change();
							}
							if (showtime=="periods") {

									switch (gdata[prot].period) {
									//	case "hourly": $("#Hourlylist").append($('<option class="variable">').text('Every:'+gdata[prot].t3+"hrs At:"+gdata[prot].t2+ "mins Keep:"+ gdata[prot].t1+"snaps").val("hourly."+gdata[prot].t1+"."+gdata[prot].t2+"."+gdata[prot].t3));	 break;
									//	case "Minutely": $("#Minutelylist").append($('<option class="variable">').text('Every:'+gdata[prot].t2+"mins Keep:"+gdata[prot].t1+"snaps").val("Minutely."+gdata[prot].t1+"."+gdata[prot].t2));	 break;
									//	case "Weekly" : $("#Weeklylist").append($('<option class="variable">').text('Every:'+gdata[prot].t4+" At:"+gdata[prot].t2+":"+gdata[prot].t3+" Keep:"+gdata[prot].t1+"snaps").val("Weekly."+gdata[prot].t1+"."+gdata[prot].t2+"."+gdata[prot].t3+"."+gdata[prot].t4));	 break;
									//switch (gdata[prot].period) {
										case "hourly": $("#Hourlylist").append('<tr class="variable '+update+' '+gdata[prot].father+' '+gdata[prot].pool+' '+gdata[prot].period+' '+'"><td class="text-center">'+gdata[prot].t3+"</td><td class='text-center'>"+gdata[prot].t2+ "</td><td class='text-center'>"+ gdata[prot].t1+"</td><td class='text-center'>"+gdata[prot].stamp+"</td><td class='text-center'><a href='javascript:SnapshotPeriodDelete(\""+gdata[prot].stamp+"\")'><img src='../assets/images/delete.png'</td></tr>");	 break;
										case "Minutely": $("#Minutelylist").append('<tr class="variable '+update+' '+gdata[prot].father+' '+gdata[prot].pool+' '+gdata[prot].period+' '+'"><td class="text-center">'+gdata[prot].t2+"</td><td class='text-center'>"+gdata[prot].t1+"</td><td class='text-center'>"+gdata[prot].stamp+"</td><td class='text-center'><a href='javascript:SnapshotPeriodDelete(\""+gdata[prot].stamp+"\")'><img src='../assets/images/delete.png'</td></tr>");	 break;
										case "Weekly" : $("#Weeklylist").append('<tr class="variable '+update+' '+gdata[prot].father+' '+gdata[prot].pool+' '+gdata[prot].period+' '+'"><td class="text-center">'+gdata[prot].t4+"</td><td class='text-center'>"+gdata[prot].t2+":"+gdata[prot].t3+"</td><td class='text-center'>"+gdata[prot].t1+"</td><td class='text-center'>"+gdata[prot].stamp+"</td><td class='text-center'><a href='javascript:SnapshotPeriodDelete(\""+gdata[prot].stamp+"\")'><img src='../assets/images/delete.png'</td></tr>");	 break;



								}

							//chartdata.push([gdata[prot].Volumes[x].name,parseFloat(gdata[prot].Volumes[x].properties[0].volsize)])
							}
						}
						}
					});

				};
			};
			function refresh2(textareaid) {

				$.get("../requestdata2.php", { file: 'Data/'+textareaid+'.log' }, function(data){
					$('#'+textareaid).val(data);
					});
			}	;


			var config = 1;
			$("[class*='xdsoft']").hide();
			$(".DiskGroups").hide(); $(".SnapShots").hide();
			function pooladdlog(){
				var userpriv="false";
					var curuser="<?php echo $_SESSION["user"] ?>";
				$.get("../requestdata.php", { file: 'Data/userpriv.txt' },function(data){
					var gdata = jQuery.parseJSON(data);
					for (var prot in gdata){
						if(gdata[prot].user=="<?php echo $_SESSION["user"] ?>") {
							userpriv=gdata[prot].DiskGroups
						}
					};

					if(userpriv=="true" | curuser=="admin" ) {

				//	 config= 0; $("h2").css("background-image","url('img/diskconfigs.png')").text("Disk Groups"); status=1; $(".ullis").hide();$(".finish").show();$(".DiskGroups").show();
					$.post("../pump.php", { req: "DGsetPool", name:"addlog " + "<?php echo $_SESSION["user"] ?>"+" "+dd[1].host+" "+dd[1].name });
					syscounter2=980;

					}
				});
			};
			function pooladdcache(){
				var userpriv="false";
					var curuser="<?php echo $_SESSION["user"] ?>";
				$.get("../requestdata.php", { file: 'Data/userpriv.txt' },function(data){
					var gdata = jQuery.parseJSON(data);
					for (var prot in gdata){
						if(gdata[prot].user=="<?php echo $_SESSION["user"] ?>") {
							userpriv=gdata[prot].DiskGroups
						}
					};

					if(userpriv=="true" | curuser=="admin" ) {

				//	 config= 0; $("h2").css("background-image","url('img/diskconfigs.png')").text("Disk Groups"); status=1; $(".ullis").hide();$(".finish").show();$(".DiskGroups").show();
					$.post("../pump.php", { req: "DGsetPool", name:"addcache " + "<?php echo $_SESSION["user"] ?>"+" "+dd[1].host+" "+dd[1].name });
					syscounter2=980;

					}
				});
			};
			function pooladdspare(){
				var userpriv="false";
					var curuser="<?php echo $_SESSION["user"] ?>";
				$.get("../requestdata.php", { file: 'Data/userpriv.txt' },function(data){
					var gdata = jQuery.parseJSON(data);
					for (var prot in gdata){
						if(gdata[prot].user=="<?php echo $_SESSION["user"] ?>") {
							userpriv=gdata[prot].DiskGroups
						}
					};

					if(userpriv=="true" | curuser=="admin" ) {

				//	 config= 0; $("h2").css("background-image","url('img/diskconfigs.png')").text("Disk Groups"); status=1; $(".ullis").hide();$(".finish").show();$(".DiskGroups").show();
					$.post("../pump.php", { req: "DGsetPool", name:"addspare " + "<?php echo $_SESSION["user"] ?>"+" "+dd[1].host+" "+dd[1].name });
					syscounter2=980;

					}
				});
			};

			function pooldelspecial(){
				var userpriv="false";
					var curuser="<?php echo $_SESSION["user"] ?>";
				$.get("../requestdata.php", { file: 'Data/userpriv.txt' },function(data){
					var gdata = jQuery.parseJSON(data);
					for (var prot in gdata){
						if(gdata[prot].user=="<?php echo $_SESSION["user"] ?>") {
							userpriv=gdata[prot].DiskGroups
						}
					};

					if(userpriv=="true" | curuser=="admin" ) {

				//	 config= 0; $("h2").css("background-image","url('img/diskconfigs.png')").text("Disk Groups"); status=1; $(".ullis").hide();$(".finish").show();$(".DiskGroups").show();
					$.post("../pump.php", { req: "DGsetPool", name:"delspecial " + "<?php echo $_SESSION["user"] ?>"+" "+dd[1].host+" "+dd[1].name });
					syscounter2=0;

					}
				});
			};
			function poolcreatesingle(){
				var userpriv="false";
					var curuser="<?php echo $_SESSION["user"] ?>";
				$.get("../requestdata.php", { file: 'Data/userpriv.txt' },function(data){
					var gdata = jQuery.parseJSON(data);
					for (var prot in gdata){
						if(gdata[prot].user=="<?php echo $_SESSION["user"] ?>") {
							userpriv=gdata[prot].DiskGroups
						}
					};

					if(userpriv=="true" | curuser=="admin" ) {

				//	 config= 0; $("h2").css("background-image","url('img/diskconfigs.png')").text("Disk Groups"); status=1; $(".ullis").hide();$(".finish").show();$(".DiskGroups").show();
					$.post("../pump.php", { req: "DGsetPool", name:"Single " + "<?php echo $_SESSION["user"] ?>"+" "+dd[1].host+" "+dd[1].name });
					syscounter2=980;

					}
				});
			};
			function pooladdraidtriple(){
			var userpriv="false";
					var curuser="<?php echo $_SESSION["user"] ?>";
				$.get("../requestdata.php", { file: 'Data/userpriv.txt' },function(data){
					var gdata = jQuery.parseJSON(data);
					for (var prot in gdata){
						if(gdata[prot].user=="<?php echo $_SESSION["user"] ?>") {
							userpriv=gdata[prot].DiskGroups
						}
					};

					if(userpriv=="true" | curuser=="admin" ) {
					var stripeset=dd["1"].host+" "
					for(var k in dd) {
						if(k > 0){
						 stripeset=stripeset+dd[k].name+" "
						}
					}

				//	 config= 0; $("h2").css("background-image","url('img/diskconfigs.png')").text("Disk Groups"); status=1; $(".ullis").hide();$(".finish").show();$(".DiskGroups").show();
					$.post("../pump.php", { req: "DGsetPool", name:"addparity3 " + "<?php echo $_SESSION["user"] ?>"+" "+stripeset });

					syscounter2=980;

					}
				});


			}
			function poolcreateraidtriple(){
			var userpriv="false";
					var curuser="<?php echo $_SESSION["user"] ?>";
				$.get("../requestdata.php", { file: 'Data/userpriv.txt' },function(data){
					var gdata = jQuery.parseJSON(data);
					for (var prot in gdata){
						if(gdata[prot].user=="<?php echo $_SESSION["user"] ?>") {
							userpriv=gdata[prot].DiskGroups
						}
					};

					if(userpriv=="true" | curuser=="admin" ) {
					var stripeset=dd["1"].host+" "
					for(var k in dd) {
						if(k > 0){
						 stripeset=stripeset+dd[k].name+" "
						}
					}

				//	 config= 0; $("h2").css("background-image","url('img/diskconfigs.png')").text("Disk Groups"); status=1; $(".ullis").hide();$(".finish").show();$(".DiskGroups").show();
					$.post("../pump.php", { req: "DGsetPool", name:"parity3 " + "<?php echo $_SESSION["user"] ?>"+" "+stripeset });

					syscounter2=980;

					}
				});


			}
			function pooladdraiddual(){
			var userpriv="false";
					var curuser="<?php echo $_SESSION["user"] ?>";
				$.get("../requestdata.php", { file: 'Data/userpriv.txt' },function(data){
					var gdata = jQuery.parseJSON(data);
					for (var prot in gdata){
						if(gdata[prot].user=="<?php echo $_SESSION["user"] ?>") {
							userpriv=gdata[prot].DiskGroups
						}
					};

					if(userpriv=="true" | curuser=="admin" ) {
					var stripeset=dd["1"].host+" "
					for(var k in dd) {
						if(k > 0){
						 stripeset=stripeset+dd[k].name+" "
						}
					}

				//	 config= 0; $("h2").css("background-image","url('img/diskconfigs.png')").text("Disk Groups"); status=1; $(".ullis").hide();$(".finish").show();$(".DiskGroups").show();
					$.post("../pump.php", { req: "DGsetPool", name:"addparity2 " + "<?php echo $_SESSION["user"] ?>"+" "+stripeset });

					syscounter2=980;

					}
				});


			}
			function poolcreateraiddual(){
			var userpriv="false";
					var curuser="<?php echo $_SESSION["user"] ?>";
				$.get("../requestdata.php", { file: 'Data/userpriv.txt' },function(data){
					var gdata = jQuery.parseJSON(data);
					for (var prot in gdata){
						if(gdata[prot].user=="<?php echo $_SESSION["user"] ?>") {
							userpriv=gdata[prot].DiskGroups
						}
					};

					if(userpriv=="true" | curuser=="admin" ) {
					var stripeset=dd["1"].host+" "
					for(var k in dd) {
						if(k > 0){
						 stripeset=stripeset+dd[k].name+" "
						}
					}

				//	 config= 0; $("h2").css("background-image","url('img/diskconfigs.png')").text("Disk Groups"); status=1; $(".ullis").hide();$(".finish").show();$(".DiskGroups").show();
					$.post("../pump.php", { req: "DGsetPool", name:"parity2 " + "<?php echo $_SESSION["user"] ?>"+" "+stripeset });

					syscounter2=980;

					}
				});


			}
			function pooladdraidsingle(){
			var userpriv="false";
					var curuser="<?php echo $_SESSION["user"] ?>";
				$.get("../requestdata.php", { file: 'Data/userpriv.txt' },function(data){
					var gdata = jQuery.parseJSON(data);
					for (var prot in gdata){
						if(gdata[prot].user=="<?php echo $_SESSION["user"] ?>") {
							userpriv=gdata[prot].DiskGroups
						}
					};

					if(userpriv=="true" | curuser=="admin" ) {
					var stripeset=dd["1"].host+" "
					for(var k in dd) {
						if(k > 0){
						 stripeset=stripeset+dd[k].name+" "
						}
					}

				//	 config= 0; $("h2").css("background-image","url('img/diskconfigs.png')").text("Disk Groups"); status=1; $(".ullis").hide();$(".finish").show();$(".DiskGroups").show();
					$.post("../pump.php", { req: "DGsetPool", name:"addparity " + "<?php echo $_SESSION["user"] ?>"+" "+stripeset });

					syscounter2=980;

					}
				});




			}
			function poolcreateraidsingle(){
			var userpriv="false";
					var curuser="<?php echo $_SESSION["user"] ?>";
				$.get("../requestdata.php", { file: 'Data/userpriv.txt' },function(data){
					var gdata = jQuery.parseJSON(data);
					for (var prot in gdata){
						if(gdata[prot].user=="<?php echo $_SESSION["user"] ?>") {
							userpriv=gdata[prot].DiskGroups
						}
					};

					if(userpriv=="true" | curuser=="admin" ) {
					var stripeset=dd["1"].host+" "
					for(var k in dd) {
						if(k > 0){
						 stripeset=stripeset+dd[k].name+" "
						}
					}

				//	 config= 0; $("h2").css("background-image","url('img/diskconfigs.png')").text("Disk Groups"); status=1; $(".ullis").hide();$(".finish").show();$(".DiskGroups").show();
					$.post("../pump.php", { req: "DGsetPool", name:"parity " + "<?php echo $_SESSION["user"] ?>"+" "+stripeset });

					syscounter2=980;

					}
				});




			}
			function pooladdstripe(){
				var userpriv="false";
					var curuser="<?php echo $_SESSION["user"] ?>";
				$.get("../requestdata.php", { file: 'Data/userpriv.txt' },function(data){
					var gdata = jQuery.parseJSON(data);
					for (var prot in gdata){
						if(gdata[prot].user=="<?php echo $_SESSION["user"] ?>") {
							userpriv=gdata[prot].DiskGroups
						}
					};

					if(userpriv=="true" | curuser=="admin" ) {
					var stripeset=dd["1"].host+" "
					for(k in dd) {
						if(k>0){if(dd[k].grouptype=="free") {stripeset=stripeset+dd[k].name+" "	}	}
					}

				//	 config= 0; $("h2").css("background-image","url('img/diskconfigs.png')").text("Disk Groups"); status=1; $(".ullis").hide();$(".finish").show();$(".DiskGroups").show();
					$.post("../pump.php", { req: "DGsetPool", name:"add " + "<?php echo $_SESSION["user"] ?>"+" "+stripeset });

					syscounter2=980;

					}
				});
			};
			function poolcreatestripe(){
				var userpriv="false";
					var curuser="<?php echo $_SESSION["user"] ?>";
				$.get("../requestdata.php", { file: 'Data/userpriv.txt' },function(data){
					var gdata = jQuery.parseJSON(data);
					for (var prot in gdata){
						if(gdata[prot].user=="<?php echo $_SESSION["user"] ?>") {
							userpriv=gdata[prot].DiskGroups
						}
					};

					if(userpriv=="true" | curuser=="admin" ) {
					var stripeset=dd["1"].host+" "
					for(k in dd) {
						 stripeset=stripeset+dd[k].name+" "
					}

				//	 config= 0; $("h2").css("background-image","url('img/diskconfigs.png')").text("Disk Groups"); status=1; $(".ullis").hide();$(".finish").show();$(".DiskGroups").show();
					$.post("../pump.php", { req: "DGsetPool", name:"stripeset " + "<?php echo $_SESSION["user"] ?>"+" "+stripeset });

					syscounter2=980;

					}
				});
			};
			function pooladdmirror(){

			var userpriv="false";
					var curuser="<?php echo $_SESSION["user"] ?>";
				$.get("../requestdata.php", { file: 'Data/userpriv.txt' },function(data){
					var gdata = jQuery.parseJSON(data);
					for (var prot in gdata){
						if(gdata[prot].user=="<?php echo $_SESSION["user"] ?>") {
							userpriv=gdata[prot].DiskGroups
						}
					};

					if(userpriv=="true" | curuser=="admin" ) {


				//	 config= 0; $("h2").css("background-image","url('img/diskconfigs.png')").text("Disk Groups"); status=1; $(".ullis").hide();$(".finish").show();$(".DiskGroups").show();
					$.post("../pump.php", { req: "DGsetPool", name:"addmirror " + "<?php echo $_SESSION["user"] ?>"+" "+dd["1"].host+" "+dd["1"].name+" "+dd["2"].name});

					syscounter2=980;

					}
				});
			}
			function poolattachemirror(){

			var userpriv="false";
					var curuser="<?php echo $_SESSION["user"] ?>";
				$.get("../requestdata.php", { file: 'Data/userpriv.txt' },function(data){
					var gdata = jQuery.parseJSON(data);
					for (var prot in gdata){
						if(gdata[prot].user=="<?php echo $_SESSION["user"] ?>") {
							userpriv=gdata[prot].DiskGroups
						}
					};

					if(userpriv=="true" | curuser=="admin" ) {


				//	 config= 0; $("h2").css("background-image","url('img/diskconfigs.png')").text("Disk Groups"); status=1; $(".ullis").hide();$(".finish").show();$(".DiskGroups").show();
					$.post("../pump.php", { req: "DGsetPool", name:"attachmirror " + "<?php echo $_SESSION["user"] ?>"+" "+dd["1"].host+" "+dd["2"].name+" "+dd["1"].name});

					syscounter2=980;

					}
				});



			}
			function poolcreatemirror() {
				var userpriv="false";
					var curuser="<?php echo $_SESSION["user"] ?>";
				$.get("../requestdata.php", { file: 'Data/userpriv.txt' },function(data){
					var gdata = jQuery.parseJSON(data);
					for (var prot in gdata){
						if(gdata[prot].user=="<?php echo $_SESSION["user"] ?>") {
							userpriv=gdata[prot].DiskGroups
						}
					};

					if(userpriv=="true" | curuser=="admin" ) {


				//	 config= 0; $("h2").css("background-image","url('img/diskconfigs.png')").text("Disk Groups"); status=1; $(".ullis").hide();$(".finish").show();$(".DiskGroups").show();
					$.post("../pump.php", { req: "DGsetPool", name:"mirror " + "<?php echo $_SESSION["user"] ?>"+" "+dd[1].host+" "+dd[1].name+" "+dd[2].name});

					syscounter2=980;

					}
				});

			}
			$("#SnapShots").click(function (){
				if(config== 1){
					var userpriv="false";
					var curuser="<?php echo $_SESSION["user"] ?>";
					$.get("../requestdata.php", { file: 'Data/userpriv.txt' },function(data){
						var gdata = jQuery.parseJSON(data);
						for (var prot in gdata){
							if(gdata[prot].user=="<?php echo $_SESSION["user"] ?>") {
								userpriv=gdata[prot].SnapShots
							}
						};

						if( userpriv=="true" | curuser=="admin" ) {
							config = 0; status="snaps"; $("h2").css("background-image","url('img/snapshot.png')").text("SnapShots"); Vollisttime="44:333:22";times= { "snaps":"30:43:433", "periods":"30:43:433" }; $(".ullis").hide();$(".finish").show();$(".SnapShots").show();
							 $("#Vol").change();
						}
					});
				};
			});

			$(".finish").click(function (){ config = 1; status=0; $(".DiskGroups").hide(); $(".SnapShots").hide(); $(".ullis").show();$(".finish").hide()});



			$("#Onceset").hide();$("#Hourlyset").hide();$("#Minutelyset").hide();$("#Weeklyset").hide();
			$("#Once").change(function() {
				$("#Onceset").hide();$("#Hourlyset").hide();$("#Minutelyset").hide();$("#Weeklyset").hide();
				$("#Onceset").show(); snaponce("#Oncename","#disableddiv","#SnapshotCreatediv");
			});
			$("#Hourly").change(function() {
				$("#Onceset").hide();$("#Hourlyset").hide();$("#Minutelyset").hide();$("#Weeklyset").hide();
				$("#Hourlyset").show();$("#SnapshotCreatediv").show();
			});
			$("#Minutely").change(function() {
				$("#Onceset").hide();$("#Hourlyset").hide();$("#Minutelyset").hide();$("#Weeklyset").hide();
				$("#Minutelyset").show();$("#SnapshotCreatediv").show();
			});
			$("#Weekly").change(function() {
				$("#Onceset").hide();$("#Hourlyset").hide();$("#Minutelyset").hide();$("#Weeklyset").hide();
				$("#Weeklyset").show();$("#SnapshotCreatediv").show();
			});
			$("#Vol").change(function() {
				//Vollisttime="44:333:222";
				var poolsel=$("#Pool option:selected").text();
				var volsel=$("#Vol option:selected").val();
				//times= { "snaps":"30:43:433", "periods":"30:43:433" };
				$(".variable").hide();
				if(volsel!=""){


				if(panesel=="snapshot") {
					$("."+poolsel+"."+volsel).show();

				//$(" tr.variable").remove();
				}
				}
			});
			$("#Pool").change(function () {

				var selection=$("#Pool option:selected").val();

				$('#Vol option.'+selection+':first').prop('selected', true);
				$(".vvariable").hide();
				$(".vvariable."+selection).show();

					$('#Vol').change();
		/*			if(plotflag > 0 ) {
										plotb.destroy();
									}
					plotchart('chartNFS',chartdata[$("#Pool2").val()]);
		*/


			});
		function diskgetsize(fileloc,spanid1,spanid2,spanid3) {
			$.post("../pump.php", { req:"DiskSize", name:fileloc }, function(data1){
				$.get("../requestdata.php", { file: fileloc }, function(data){
					var jdata = jQuery.parseJSON(data);
					$(spanid1).text(jdata.size);$(spanid2).text(jdata.count);$(spanid3).text(jdata.onedisk);
					$("#R10").text(jdata.R10);$("#R5").text(jdata.R5);$("#R6").text(jdata.R6);

				});

			});
		};


		//refreshList("GetPoollist","#Pool","Data/Poollist.txt",3);
		//refreshList2("GetPoolVollist","#Vol","Data/Vollist2.txt","Volumes");

		$("#submitdiskgroup").click( function (){ $.post("../pump.php", { req:"DGsetPool", name:$('input[name=Raidselect]:checked').val()+" "+$('input[name=Raidselect]:checked').attr("id")+" "+"<?php echo $_SESSION["user"]; ?>" }, function (data){
				 refresh2("DGstatus");
		});
	 });

		function pooldelete(p){
			var userpriv="false";
					var curuser="<?php echo $_SESSION["user"] ?>";
				$.get("../requestdata.php", { file: 'Data/userpriv.txt' },function(data){
					var gdata = jQuery.parseJSON(data);
					for (var prot in gdata){
						if(gdata[prot].user=="<?php echo $_SESSION["user"] ?>") {
							userpriv=gdata[prot].DiskGroups
						}
					};

					if(userpriv=="true" | curuser=="admin" ) {
						$.post("../pump.php", { req:"DGdestroyPool "+runningpool+" "+"<?php echo $_SESSION["user"]; ?>" });
						syscounter2=980
					}
				});
		};


		$("#DeleteSnapshot").click( function (){ $.post("../pump.php", { req:"SnapShotDelete", name:$("#Pool").val()+" "+$("#Snaplist option:selected").val()+" "+"<?php echo $_SESSION["user"]; ?>" }, function (data){
				 refresh2("Snapsstatus"); $("#Vol").change();
				 });
			});
		$("#RollbackSnapshot").click( function (){ $.post("../pump.php", { req:"SnapShotRollback", name:$("#Pool").val()+" "+$("#Snaplist option:selected").val()+" "+"<?php echo $_SESSION["user"]; ?>" }, function (data){
				 refresh2("Snapsstatus"); $("#Vol").change();
				 });
			});
		function SnapshotDelete(k){console.log("highere",k); $.post("../pump.php", { req:"SnapShotDelete", name:$("#Pool").val()+" "+k+" "+"<?php echo $_SESSION["user"]; ?>" }, function (data){
				 refresh2("Snapsstatus"); $("#Vol").change();
				 });
		};
		function SnapshotRollback(k){ $.post("../pump.php", { req:"SnapShotRollback", name:$("#Pool").val()+" "+k+" "+"<?php echo $_SESSION["user"]; ?>" }, function (data){
				 refresh2("Snapsstatus"); $("#Vol").change();
				 });
			};
		function SnapshotPeriodDelete(k){ $.post("../pump.php", { req:"SnapShotPeriodDelete", name:k+" "+"<?php echo $_SESSION["user"]; ?>" }, function (data){
				 refresh2("Snapsstatus"); $("#Vol").change();
				 });
			};
		$("#DeleteMinutely").click( function (){ $.post("../pump.php", { req:"SnapShotPeriodDelete", name:$("#Minutelylist option:selected").val()+" "+"<?php echo $_SESSION["user"]; ?>" }, function (data){
				 refresh2("Snapsstatus"); $("#Vol").change();
				 });
			});
		$("#DeleteWeekly").click( function (){ $.post("../pump.php", { req:"SnapShotPeriodDelete", name:$("#Weeklylist option:selected").val()+" "+"<?php echo $_SESSION["user"]; ?>" }, function (data){
				 refresh2("Snapsstatus"); $("#Vol").change();
				 });
			});
		function SnapshotCreate(){
				var period=$('input[name=Period]:checked').val();

				var oper="";
				switch(snapsel) {
					case "Once" : oper = $("#Oncename").val();  break;
					case "Hourly": oper = $("#Sminute").val()+" "+$("#Hour").val()+" "+$("#KeepHourly").val(); break;
					case "Minutely": oper = $("#Minute").val()+" "+$("#KeepMinutely").val(); break;
					case "Weekly" : oper = $("#Stime").val()+" "+$("#Week option:selected").val()+" "+$("#KeepWeekly").val(); break;
				}
				oper =oper+" "+$("#Pool option:selected").val()+" "+$("#Vol option:selected").val();
				console.log(oper,snapsel);
				$.post("../pump.php", { req:"SnapshotCreate"+snapsel, name: oper+" "+"<?php echo $_SESSION["user"]; ?>" }, function (data){
				 refresh2("Snapsstatus"); $("#Vol").change();
				 });
			};

		$("#Oncename").keyup(function(){
				snaponce("#Oncename","#shortname","#goodname","#Oncename.form-control");
		});
		$("#Stime").change(function() {
			if($("#Stime").val()=="") {
				$("#Stime").addClass("NotComplete");
			} else {
				$("#Stime").removeClass("NotComplete");
			}


		});


//			$("#Stime").timepicker({
//								appendWidgetTo: 'body',
 //               minuteStep: 1,
//								showMeridian: false,////

//            });

			setInterval("refreshall()",500);
			//refreshList3("GetPoolVollist","#Vol","Data/Vollist.txt");
			refreshList("GetSnaplist",".Snaplist","Data/listsnaps.txt","snaps","snaps");
			refreshList("GetPoolperiodlist","#all","Data/periodlist.txt","periods","periods");
			$.post("../pump.php", { req: "GetPoolperiodlist", name:"a" });
			$.post("../pump.php", { req: "GetPoolVollist", name:"a" });
			$.post("../pump.php", { req: "GetSnaplist", name:"a" });
			function starting() {
				$(".ullis").hide();
				if(config == 1 ) {
						var userprivDiskGroups="false"; var userprivSnapShots="false";
						var curuser="<?php echo $_SESSION["user"] ?>";
						if (curuser !="admin") {
							$.get("../requestdata.php", { file: 'Data/userpriv.txt' },function(data){
								var gdata = jQuery.parseJSON(data);
								for (var prot in gdata){
									if(gdata[prot].user=="<?php echo $_SESSION["user"] ?>") {
										userprivDiskGroups=gdata[prot].DiskGroups;
										userprivSnapShots=gdata[prot].SnapShots;
									}
								};

								if( userprivDiskGroups =="true") { $("#DiskGroups").show(); } else { $("#DiskGroups").hide(); } ; if( userprivSnapShots =="true") { $("#SnapShots").show(); } else { $("#SnapShots").hide(); };;
						});
					}
					$(".ullis").show();
			}
		}
				$("#close-success").click(function() { $(".bg-success").hide(); });
				SS();
		</script>


</body>
</html>
