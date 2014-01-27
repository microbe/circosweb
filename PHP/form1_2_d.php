<?php

$spacings=$_POST['spacingtext'];

$path="../Resource/Ideogram/spacings.txt";
chmod($path,0755);

if(!empty($spacings)){
$clear=fopen($path,"w");
fclose($clear);

file_put_contents($path,$spacings,FILE_APPEND);
}else{
	echo "<script>alert('Please Define Spacings Parameters Before Proceeding');</script>";
};


?>