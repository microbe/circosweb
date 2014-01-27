<?php
         //Сheck that we have a file
         if((!empty($_FILES["inother5file"])) && ($_FILES['inother5file']['error'] == 0)) {
          
           $filename = "inline.txt";
           $newname = '../../../Resource/In/5th/'.$filename;

           if (file_exists($newname)) {
              
              unlink($newname);

             if ($_FILES["inother5file"]["size"] < 3500000) {
              
                   if ((move_uploaded_file($_FILES['inother5file']['tmp_name'],$newname))) {
                         echo "<script>var proceed=$('<button type=button>Proceed</button>');$('#in5thdone').empty().append(proceed);</script>";
                              } else {
                                        echo "Error: A problem occurred during file upload!";
                                            }
                      } else {
                                 echo "Error: Only files under 3500Kb are accepted";
                             }
              } else {
                          if ($_FILES["inother5file"]["size"] < 3500000) {
              
                   if ((move_uploaded_file($_FILES['inother5file']['tmp_name'],$newname))) {
                         echo "<script>var proceed=$('<button type=button>Proceed</button>');$('#in5thdone').empty().append(proceed);</script>";
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