<?php
 
 ini_set('auto_detect_line_endings', true);

          $path='../Resource/karyotype.txt';

          $rawdata=file($path);
  
          $rawdata1=implode(',',$rawdata);

          preg_match_all("/chr\s\-(.*)\s\d+\s\d+/", $rawdata1, $data1, PREG_SET_ORDER);
          preg_match_all("/\s0\s(\d+)/", $rawdata1, $data2, PREG_SET_ORDER);



          for($i=0;$i<count($data1);$i++){

          echo "<input type=text class='zooms' name='zooms' value='1' id=zooms"."$i".'>'."<span>scale".$data1[$i][1]."</span>";
          echo "<input type=text class='zoomsstart' name='zoomsstart' value='0' id=zoomsstart".$i.">"."<span>Start</span>";
          echo "<input type=text class='zoomsend' name='zoomsend' value="."'".$data2[$i][1]."'"."id=zoomsend"."$i".">"."<span>End</span><br>";

        };
        

?>