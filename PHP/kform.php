<?php
         //Сheck that we have a file
         if((!empty($_FILES["kkfile"])) && ($_FILES['kkfile']['error'] == 0)) {
          
           $filename = "karyotype.txt";
           $newname = '../Resource/'.$filename;

           if (file_exists($newname)) {
              
              unlink($newname);

             if ($_FILES["kkfile"]["size"] < 3500000) {
              
                   if ((move_uploaded_file($_FILES['kkfile']['tmp_name'],$newname))) {
                         echo "<script>var proceed=$('<button type=button>Proceed</button>');$('#kproceed').empty().append(proceed);</script>";
                              } else {
                                        echo "Error: A problem occurred during file upload!";
                                            }
                      } else {
                                 echo "Error: Only files under 3500Kb are accepted";
                             }
              } else {
                          if ($_FILES["kkfile"]["size"] < 3500000) {
              
                   if ((move_uploaded_file($_FILES['kkfile']['tmp_name'],$newname))) {
                         echo "It's done! The file has been saved as: ".$newname;
                              } else {
                                        echo "Error: A problem occurred during file upload!";
                                            }
                      } else {
                                 echo "Error: Only files under 3500Kb are accepted";
                             }
                     }
        } else {
                    echo "Error: your file is empty";
                                                }
?>