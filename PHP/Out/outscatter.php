<?php
         //Сheck that we have a file
         if((!empty($_FILES["outfile"])) && ($_FILES['outfile']['error'] == 0)) {
          
           $filename = "outscatter.txt";
           $newname = '../../Resource/Out/'.$filename;

           if (file_exists($newname)) {
              
              unlink($newname);

             if ($_FILES["outfile"]["size"] < 3500000) {
              
                   if ((move_uploaded_file($_FILES['outfile']['tmp_name'],$newname))) {
                         echo "<script>var proceed=$('<button type=button>Proceed</button>');$('#outproceed').empty().append(proceed);</script>";
                              } else {
                                        echo "Error: A problem occurred duroutg file upload!";
                                            }
                      } else {
                                 echo "Error: Only files under 3500Kb are accepted";
                             }
              } else {
                          if ($_FILES["outfile"]["size"] < 3500000) {
              
                   if ((move_uploaded_file($_FILES['outfile']['tmp_name'],$newname))) {
                         echo "It's done! The file has been saved as: ".$newname;
                              } else {
                                        echo "Error: A problem occurred duroutg file upload!";
                                            }
                      } else {
                                 echo "Error: Only files under 3500Kb are accepted";
                             }
                     }
        } else {
                    echo "Error: your file is empty";
                                                }
?>