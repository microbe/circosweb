<?php

$settings=$_POST['in8thdata'];

$path="../../../Resource/In/8th/inhistogramsettings.txt";
chmod($path,0755);

if(!empty($settings)){
$clear=fopen($path,"w");
fclose($clear);

file_put_contents($path,$settings,FILE_APPEND);
}else{
	echo "<script>alert('Please Define Relevant Parameters Before Proceeding');</script>";
};


?>