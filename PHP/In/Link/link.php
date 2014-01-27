<?php
         //Сheck that we have a file
         if((!empty($_FILES["inlinfile"])) && ($_FILES['inlinfile']['error'] == 0)) {
          
           $filename = "link.txt";
           $newname = '../../../Resource/In/Link/'.$filename;

           if (file_exists($newname)) {
              
              unlink($newname);

             if ($_FILES["inlinfile"]["size"] < 3500000) {
              
                   if ((move_uploaded_file($_FILES['inlinfile']['tmp_name'],$newname))) {
                         echo "<script>var proceed=$('<button type=button>Proceed</button>');$('#ltodraw').empty().append(proceed);</script>";
                              } else {
                                        echo "Error: A problem occurred during file upload!";
                                            }
                      } else {
                                 echo "Error: Only files under 3500Kb are accepted";
                             }
              } else {
                          if ($_FILES["inlinfile"]["size"] < 3500000) {
              
                   if ((move_uploaded_file($_FILES['inlinfile']['tmp_name'],$newname))) {
                         echo "<script>var proceed=$('<button type=button>Proceed</button>');$('#in4thdone').empty().append(proceed);</script>";
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