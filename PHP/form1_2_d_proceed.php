<?php
 
 ini_set('auto_detect_line_endings', true);

          $path='../Resource/karyotype.txt';

          $rawdata=file($path);
  
          $rawdata1=implode(',',$rawdata);

          preg_match_all("/chr\s\-(.*)\s\d+\s\d+/", $rawdata1, $data1, PREG_SET_ORDER);

          $length=count($data1)-1;
   

          for($i=0;$i<$length;$i++){

          echo "<input type=text class='spacings' name='spacings' value='0.02' id=spacings".$i.'>'."<span>r".$data1[$i][1]."to".$data1[$i+1][1]."</span>";
          

        };

          echo "<input type=text class='spacings' name='spacings' value='0.02' id=spacings".$length.'>'."<span>r".$data1[$length][1]."to".$data1[0][1]."</span>";
        

?>