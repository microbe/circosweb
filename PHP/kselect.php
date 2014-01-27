<?php 
    
          ini_set('auto_detect_line_endings', true);

          $path='../Resource/karyotype.txt';

          $rawdata=file($path);
  
          $rawdata1=implode(',',$rawdata);

          preg_match_all("/chr\s\-(.*)\s\d+\s\d+/", $rawdata1, $data1, PREG_SET_ORDER);


          for($i=0;$i<count($data1);$i++){

          echo "<input type=checkbox class='keach' name='ideo' checked id=k"."$i".'>'."<span>".$data1[$i][1]."</span>";
        };
        
          
            ?>