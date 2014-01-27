<?php

$zooms=$_POST['zoomstext'];

$path="../Resource/Ideogram/zooms.txt";
chmod($path,0755);

if(!empty($zooms)){
$clear=fopen($path,"w");
fclose($clear);

file_put_contents($path,$zooms,FILE_APPEND);
}else{
	echo "<script>alert('Please Define Zooms Parameters Before Proceeding');</script>";
};


?>