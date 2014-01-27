<?php
$ticks=$_POST['ticks'];

$path="../Resource/Ideogram/ticks.txt";
chmod($path,0755);
if(!empty($ticks)){
$clear=fopen($path,"w");
fclose($clear);

file_put_contents($path,$ticks,FILE_APPEND);
}else{
	echo "<script>alert('Please Define Genome Type Before Proceeding');</script>";
};



?>

