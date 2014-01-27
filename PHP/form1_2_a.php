<?php

$radius=$_POST['radiusdata'];
$pathradius="../Resource/Ideogram/radius.txt";

if(!empty($radius)){
$clear=fopen($pathradius,"w");
fclose($clear);

file_put_contents($pathradius,$radius,FILE_APPEND);
}else{
	echo "<script>alert('Please Define Radius Before Proceeding');</script>";
};

?>