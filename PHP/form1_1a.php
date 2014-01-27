<?php

$ideo=$_POST['ideotext'];
$path="../Resource/Ideogram/ideochoose.txt";

if(!empty($ideo)){
$clear=fopen($path,"w");
fclose($clear);

file_put_contents($path,$ideo,FILE_APPEND);
}else{
	echo "<script>alert('Please Choose Karyotype\Ideogram Before Proceeding');</script>";
};

?>