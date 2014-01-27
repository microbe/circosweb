<?php
         //Сheck that we have a file
         if((!empty($_FILES["inother8file"])) && ($_FILES['inother8file']['error'] == 0)) {
          
           $filename = "intext.txt";
           $newname = '../../../Resource/In/8th/'.$filename;

           if (file_exists($newname)) {
              
              unlink($newname);

             if ($_FILES["inother8file"]["size"] < 3500000) {
              
                   if ((move_uploaded_file($_FILES['inother8file']['tmp_name'],$newname))) {
                         echo "<script>var proceed=$('<button type=button>Proceed</button>');$('#in8thdone').empty().append(proceed);</script>";
                              } else {
                                        echo "Error: A problem occurred during file upload!";
                                            }
                      } else {
                                 echo "Error: Only files under 3500Kb are accepted";
                             }
              } else {
                          if ($_FILES["inother8file"]["size"] < 3500000) {
              
                   if ((move_uploaded_file($_FILES['inother8file']['tmp_name'],$newname))) {
                         echo "<script>var proceed=$('<button type=button>Proceed</button>');$('#in8thdone').empty().append(proceed);</script>";
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