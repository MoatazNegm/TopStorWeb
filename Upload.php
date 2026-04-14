<!DOCTYPE html>
<?php session_start(); 
 if( $_REQUEST["idd"] != session_id() || $_SESSION["user"]=="") {  header('Location:/Login.php');}
 
?>
<?php

if( $_FILES['file']['name'] != "" )
{

    move_uploaded_file( $_FILES['file']['tmp_name'], "Data/".$_FILES['file']['name']); 
					switch ($_FILES['file']['error']) {
						case UPLOAD_ERR_OK:
								$message = "File uplodaded successfully";
								break;
            case UPLOAD_ERR_INI_SIZE:
                $message = "The uploaded file exceeds the upload_max_filesize directive in php.ini";
                break;
            case UPLOAD_ERR_FORM_SIZE:
                $message = "The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form";
                break;
            case UPLOAD_ERR_PARTIAL:
                $message = "The uploaded file was only partially uploaded";
                break;
            case UPLOAD_ERR_NO_FILE:
                $message = "No file was uploaded";
                break;
            case UPLOAD_ERR_NO_TMP_DIR:
                $message = "Missing a temporary folder";
                break;
            case UPLOAD_ERR_CANT_WRITE:
                $message = "Failed to write file to disk";
                break;
            case UPLOAD_ERR_EXTENSION:
                $message = "File upload stopped by extension";
                break;

            default:
                $message = "Unknown upload error";
                break;
				
        }   
       
        

}
else
{
    
    $message = "No file specified !";
    
}
$myfile = fopen("Data/fileupload.txt", "w");
fwrite($myfile, $_FILES['file']['tmp_name']);
fclose($myfile);
?>
