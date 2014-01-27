<?php

$settoutgs=$_POST['outdata'];

$path="../../Resource/Out/outhistogramsettings.txt";
chmod($path,0755);

if(!empty($settoutgs)){
$clear=fopen($path,"w");
fclose($clear);

file_put_contents($path,$settoutgs,FILE_APPEND);
}else{
	echo "<script>alert('Please Defoute Relevant Parameters Before Proceedoutg');</script>";
};


?>