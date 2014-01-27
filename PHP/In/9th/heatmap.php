<?php
         //Сheck that we have a file
         if((!empty($_FILES["inother9file"])) && ($_FILES['inother9file']['error'] == 0)) {
          
           $filename = "inheatmap.txt";
           $newname = '../../../Resource/In/9th/'.$filename;

           if (file_exists($newname)) {
              
              unlink($newname);

             if ($_FILES["inother9file"]["size"] < 3500000) {
              
                   if ((move_uploaded_file($_FILES['inother9file']['tmp_name'],$newname))) {
                         echo "<script>var proceed=$('<button type=button>Proceed</button>');$('#in9thdone').empty().append(proceed);</script>";
                              } else {
                                        echo "Error: A problem occurred during file upload!";
                                            }
                      } else {
                                 echo "Error: Only files under 3500Kb are accepted";
                             }
              } else {
                          if ($_FILES["inother9file"]["size"] < 3500000) {
              
                   if ((move_uploaded_file($_FILES['inother9file']['tmp_name'],$newname))) {
                         echo "<script>var proceed=$('<button type=button>Proceed</button>');$('#in9thdone').empty().append(proceed);</script>";
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