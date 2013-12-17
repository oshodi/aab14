<?php
$content_type = "application/json";
function response($data,$status){
			$jsonArray = json_encode($data);
			$code = ($status)?$status:200;
			header("HTTP/1.1 ".$code." ".get_status_message());
			header("Content-Type:".$content_type);
			echo $jsonArray;
			exit;
}

function get_status_message(){
			$status = array(
						100 => 'Continue',  
						101 => 'Switching Protocols',  
						200 => 'OK',
						201 => 'Created',  
						202 => 'Accepted',  
						203 => 'Non-Authoritative Information',  
						204 => 'No Content',  
						205 => 'Reset Content',  
						206 => 'Partial Content',  
						300 => 'Multiple Choices',  
						301 => 'Moved Permanently',  
						302 => 'Found',  
						303 => 'See Other',  
						304 => 'Not Modified',  
						305 => 'Use Proxy',  
						306 => '(Unused)',  
						307 => 'Temporary Redirect',  
						400 => 'Bad Request',  
						401 => 'Unauthorized',  
						402 => 'Payment Required',  
						403 => 'Forbidden',  
						404 => 'Not Found',  
						405 => 'Method Not Allowed',  
						406 => 'Not Acceptable',  
						407 => 'Proxy Authentication Required',  
						408 => 'Request Timeout',  
						409 => 'Conflict',  
						410 => 'Gone',  
						411 => 'Length Required',  
						412 => 'Precondition Failed',  
						413 => 'Request Entity Too Large',  
						414 => 'Request-URI Too Long',  
						415 => 'Unsupported Media Type',  
						416 => 'Requested Range Not Satisfiable',  
						417 => 'Expectation Failed',  
						500 => 'Internal Server Error',  
						501 => 'Not Implemented',  
						502 => 'Bad Gateway',  
						503 => 'Service Unavailable',  
						504 => 'Gateway Timeout',  
						505 => 'HTTP Version Not Supported');
			return ($status[$code])?$status[$code]:$status[500];
		}
		
function get_request_method(){
			return $_SERVER['REQUEST_METHOD'];
}

$allowedExts = array("gif", "jpeg", "jpg", "png");
$temp = explode(".", $_FILES["file"]["name"]);
$extension = end($temp);
if ((($_FILES["file"]["type"] == "image/gif")
|| ($_FILES["file"]["type"] == "image/jpeg")
|| ($_FILES["file"]["type"] == "image/jpg")
|| ($_FILES["file"]["type"] == "image/pjpeg")
|| ($_FILES["file"]["type"] == "image/x-png")
|| ($_FILES["file"]["type"] == "image/png"))
&& ($_FILES["file"]["size"] < 20000)
&& in_array($extension, $allowedExts))
  {
  if ($_FILES["file"]["error"] > 0)
    {
    	$message = array("Return Code: " => $_FILES["file"]["error"]);
    	response($message,403);
    }
  else
    {

    	$message = array('upload' => $_FILES["file"]["name"] , 'type' =>  $_FILES["file"]["type"], 'size' => ($_FILES["file"]["size"] / 1024) . ' kB', 'temp_file' => $_FILES["file"]["tmp_name"]);
    	response($message,200);

    if (file_exists("img/speakers/" . $_FILES["file"]["name"]))
      {
      	$message = array('file_exists' => $_FILES["file"]["name"]);
      	response($message,200);
      }
    else
      {
      move_uploaded_file($_FILES["file"]["tmp_name"],
      "img/speakers/" . $_FILES["file"]["name"]);
      
      $message = array('success' => $_FILES["file"]["name"]);
      response($message,200);
  
      }
    }
  }
else
  {
  	$message = array('error' => 'file type not accepted');
    response($message,204);
  }
?>