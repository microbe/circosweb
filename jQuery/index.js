$(document).ready(function(){

$('.kkfile').change(function(){
                  var file = this.files[0];
                  var name = file.name;
                  var size = file.size;
                  var type = file.type;
                  var all="File:"+name+"\r Size:"+size+"\r Type:"+type;
                  var p_UploadFile="<p id='uTag' class='uTag'></p>";
                  $("#form1").append(p_UploadFile);
                  $("#uTag").text(all);
                  
                  $('#ksubmit').removeAttr('disabled');
                 
                  });
$(function(){
            var bar = $('.kbar');
            var percent = $('.kpercent');
            var status = $('.kstatus'); 
    $('#ksubmit').click(function(){

            $('#kform').ajaxForm({
            
             beforeSend: function() {
             status.empty();
             var percentVal = '0%';
             bar.width(percentVal)
             percent.html(percentVal);
                               },
    
            uploadProgress: function(event, position, total, percentComplete) {
            var percentVal = percentComplete + '%';
            bar.width(percentVal)
            percent.html(percentVal);
            },
    
            success: function() {
            var percentVal = '100%';
            bar.width(percentVal)
            percent.html(percentVal);
            },
  
            complete: function(xhr) {
            status.html(xhr.responseText);
            } 
            
            });
          });
});

$("#kproceed").click(function(){
    
    $("#selecta").load("./PHP/kselect.php",function(){
                                          $("#ideosubmit").removeAttr("disabled");

                                           $("#form1_1a").submit(function(event){
                                              event.preventDefault();
                                              var lengt=$(".keach").length;
                                              var sum=[];
                                              for(var i=0;i<lengt;i++){
                                                if($("#k"+i).prop("checked")){
                                                  sum.push($("#k"+i).next().text());
                                                  };
                                              };
                                              var together=sum.join();
                                              $("#ideotext").val(together);
                                              var posting=$.post("../PHP/form1_1a.php",$("#form1_1a").serialize());
                                              posting.done(function() {
                                               $('#radius_proceed').removeAttr('disabled');
  });
                                            });
                                           
                                         });
                                                  });
///////radius begin/////////////////////////////////////////
$("#radius_proceed").click(function(){
  var selectedideo=$("#ideotext").val();
  arrayideo=selectedideo.split(",");
  lengthideo=arrayideo.length;
  $("#form12aid").empty();
  
  for(var i=0;i<lengthideo;i++){
    var radiusset=$('<div id=form12aid><input type=text value=0.8 class=radiusc id=radius'+i+'><span>r'+arrayideo[i]+'</span></div>');
    $("#form1_2_a").prepend(radiusset);
    delete radiusset;
   };

  $("#radiussubmit").removeAttr("disabled");
});


$("#form1_2_a").submit(function(event){
  event.preventDefault();

  var sumradius=[];
  var lenradius=$(".radiusc").length;

  for (var i=0;i<lenradius;i++){
    sumradius.push($("#radius"+i).val());
  };
  var togetherradius=sumradius.join();
  $("#radiusdata").val(togetherradius);
  
   var posting=$.post("../PHP/form1_2_a.php",$("#form1_2_a").serialize());
   posting.done(function() {
                             $('#ticks_proceed').removeAttr('disabled');
                           });
                                            });
/////////////radius end/////////////////////////////////

//ticks begin/////////////////////////////////////////////////////////////////////////
$('#ticks_proceed').click(function(){
  
  $("#ticks").show();

});

$("#ticks").click(function(){
  $("#tickssubmit").removeAttr("disabled");
});

$("#form1_2_b").submit(function(event){

  event.preventDefault();
  var posting=$.post("../PHP/form1_2_b.php",$("#form1_2_b").serialize());
   posting.done(function() {
                             $('#zooms_proceed').removeAttr('disabled');
                           });
                                            });
 /////////////ticks end/////////////////////////////////

//////zooms begin//////////////////////////////////////////////////
 $("#zooms_proceed").click(function(){
    
    $("#zoomsdiv").load("./PHP/form1_2_c_proceed.php",function(){
                                          $("#zoomssubmit").removeAttr("disabled");

                                           $("#form1_2_c").submit(function(event){
                                              event.preventDefault();
                                              var lengt=$(".zooms").length;
                                              var sum=[];
                                              for(var i=0;i<lengt;i++){
                                                
                                                  sum.push($("#zooms"+i).val());
                                                  sum.push($("#zoomsstart"+i).val());
                                                  sum.push($("#zoomsend"+i).val());
                                            
                                              };
                                              var together=sum.join();
                                              $("#zoomstext").val(together);
                                              var posting=$.post("../PHP/form1_2_c.php",$("#form1_2_c").serialize());
                                              posting.done(function() {
                                               $('#spacings_proceed').removeAttr('disabled');
  });
                                            });
                                           
                                         });
                                                  });

 /////////////zooms end/////////////////////////////////

////////spacings start///////////////////////////////////
$("#spacings_proceed").click(function(){
    
    $("#spacingsdiv").load("./PHP/form1_2_d_proceed.php",function(){
                                           $("#spacingssubmit").removeAttr("disabled");

                                           $("#form1_2_d").submit(function(event){
                                              event.preventDefault();
                                              var lengtspacing=$(".spacings").length;
                                              var sumspacing=[];
                                              for(var i=0;i<lengtspacing;i++){
                                                
                                                  sumspacing.push($("#spacings"+i).val());
                                            
                                              };
                                              var togetherspacing=sumspacing.join();
                                              $("#spacingtext").val(togetherspacing);
                                              var posting=$.post("../PHP/form1_2_d.php",$("#form1_2_d").serialize());
                                              posting.done(function() {
                                               $('#yesout').removeAttr('disabled');
                                               $('#noout').removeAttr('disabled');
                                                                    });
                                            });
                                           
                                         });
                                                  });
//////////spacings end/////////////////////////////////

//indicator for storing information related to whether or not data track is chosen or abondoned or merged with others
var indicator=[];
//hint for storing information related to what kind of visualization is desired
var hint=[];
//sumudata for storing information related to choices in scatter as well as other settings
var sumodata=[];

//if need outer data visualization
$("#yesout").click(function(){
    $("#out_highlight,#out_scatter,#out_line,#out_histogram,#out_tile,#out_heat,#out_text").removeAttr("disabled");
    indicator[0]="yesouter";
  });
//if no, open inner data visualization choice, this choice could also be opened through submit button after setting outer data visualization
$("#noout").click(function(){
  $("#innerdiv").show();
  indicator[0]="noouter";
});

//if highlight
  $("#out_highlight").click(function(){
    $("#outfile").removeAttr("disabled");
    $("#form2_a").attr("action","./PHP/Out/outhighlight.php");
    $("#form2_a_1div").hide();
    $(".oshadiv").hide();
    $("#form2_a_1_b").hide();
    hint[0]="1";
  });
//some housekeeping parameters
//greater than
        $("#ogreshow").click(function()
        {
         sumodata[0]=$("#ogreter").val();
        });
        $("#ogrehide").click(function()
        {
         sumodata[0]=$("#ogreter").val()+"hide";
        });
        //lower than
        $("#olowshow").click(function()
        {
         sumodata[2]=$("#olower").val(); 
        });
        $("#olowhide").click(function()
        {
         sumodata[2]=$("#olower").val()+"hide";
        });
//if scatter
        $("#out_scatter").click(function(){
        $("#outfile").removeAttr("disabled");
        $("#form2_a_1div").show();
        $(".oshadiv").show();
        $("#form2_a_1_b").hide();
        $("#form2_a").attr("action","./PHP/Out/outscatter.php");
        $("#form2_a_1").attr("action","./PHP/Out/outscattersettings.php");
        $("#ogreter").val("1");
        $("#olower").val("0");

        hint[0]="2";
  });

//if line
$("#out_line").click(function(){
        $("#outfile").removeAttr("disabled");
        $("#form2_a_1div").show();
        $("#form2_a").attr("action","./PHP/Out/outline.php");
        $("#form2_a_1").attr("action","./PHP/Out/outlinesettings.php");
        $(".oshadiv").hide();
        $("#form2_a_1_b").hide();
        $("#ogreter").val("1");
        $("#olower").val("0");
        hint[0]="3";
});

//if histogram
$("#out_histogram").click(function(){
        $("#outfile").removeAttr("disabled");
        $("#form2_a_1div").show();
        $("#form2_a").attr("action","./PHP/Out/outhistogram.php");
        $("#form2_a_1").attr("action","./PHP/Out/outhistogramsettings.php");
        $(".oshadiv").hide();
        $("#form2_a_1_b").hide();
        $("#ogreter").val("1");
        $("#olower").val("0");
        hint[0]="4";
});


//if tile
$("#out_tile").click(function(){
        $("#outfile").removeAttr("disabled");
        $("#form2_a_1div").show();
        $("#form2_a").attr("action","./PHP/Out/outtile.php");
        $("#form2_a_1").attr("action","./PHP/Out/outtilesettings.php");
        $(".oshadiv").hide();
        $("#form2_a_1_b").hide();
        $("#ogreter").val("100kb");
        $("#olower").val("1kb");
        hint[0]="5";
});

//if heatmap
$("#out_heat").click(function(){
        $("#outfile").removeAttr("disabled");
        $("#form2_a_1div").hide();
        $("#form3bchoice").show();
        $("#form2_a").attr("action","./PHP/Out/outheat.php");
        $("#form2_a_1_b").attr("action","./PHP/Out/outheatmapsettings.php");
        hint[0]="6";
});
//if text
$("#out_text").click(function(){
    $("#outfile").removeAttr("disabled");
    $("#form2_a").attr("action","./PHP/Out/outtext.php");
    $("#form2_a_1div").hide();
    $(".oshadiv").hide();
    $("#form2_a_1_b").hide();
    hint[0]="7";
  });

//at the end, press OK
  $("#form2_a_1").submit(function(event){
  event.preventDefault();

  sumodata[1]=$("input[name='ogreshowshape']:checked","#form2_a_1").val();
  sumodata[3]=$("input[name='olowshowshape']:checked","#form2_a_1").val();
  
  var together=sumodata.join();
  $("#outdata").val(together);

   var settingout=$("#form2_a_1").attr("action");
   var posting=$.post(settingout,$("#form2_a_1").serialize());

   posting.done(function() {
                             $("#innerdiv").show();
                           });
                                            });
//settings for heatmap
$("#form2_a_1_b").submit(function(event){
  event.preventDefault();

  sumodata[0]=$("#omax").val();
  sumodata[1]=$("#omin").val();
  
  var together=sumodata.join();
  $("#outdatab").val(together);

   var settingout=$("#form2_a_1_b").attr("action");
   var posting=$.post(settingout,$("#form2_a_1_b").serialize());

   posting.done(function() {
                             $("#innerdiv").show();
                           });
                                            });
///////Upload File Global Settings Begin//////////////////////
  $('.outfile').change(function(){
                  var file = this.files[0];
                  var name = file.name;
                  var size = file.size;
                  var type = file.type;
                  var all="File:"+name+"\r Size:"+size+"\r Type:"+type;
                  var o_UploadFile="<p id='oTag' class='uTag'></p>";
                  $("#outdiv").append(o_UploadFile);
                  $("#oTag").text(all);
                  
                  $('#outsubmit').removeAttr('disabled');
                 
                  });
$(function(){
            var bar = $('.outbar');
            var percent = $('.outpercent');
            var status = $('.outstatus'); 
    $('#outsubmit').click(function(){

            $('#form2_a').ajaxForm({
            
             beforeSend: function() {
             status.empty();
             var percentVal = '0%';
             bar.width(percentVal)
             percent.html(percentVal);
                               },
    
            uploadProgress: function(event, position, total, percentComplete) {
            var percentVal = percentComplete + '%';
            bar.width(percentVal)
            percent.html(percentVal);
            },
    
            success: function() {
            var percentVal = '100%';
            bar.width(percentVal)
            percent.html(percentVal);

            //open inner data visualization choice
            $("#innerdiv").show();
            },
  
            complete: function(xhr) {
            status.html(xhr.responseText);
            } 
            
            });
          });
});

///////Upload File Global Settings End//////////////////////

//inner visualization if yes
  $("#inyes").click(function(){
    $("#inlinksdiv").show();
    indicator[1]="yesinner";
  });
//inner visualization if no
  $("#inno").click(function(){
    $("#inlinksdiv").hide();
    indicator[1]="noinner";
    $.merge(indicator,hint);
    var indicatorsum=indicator.join();
    $("#indicator").val(indicatorsum);
    var posting=$.post("../PHP/Indicator/indicator.php",$("#indiform").serialize());
  });


//open links settings
  $("#inlinks").click(function(){
    $("#form3a").show();
    indicator[2]="links";
  });

//links file upload settings
  $('#inlinfile').change(function(){
                  
                  var file = this.files[0];
                  var name = file.name;
                  var size = file.size;
                  var type = file.type;
                  var all="File:"+name+"\r Size:"+size+"\r Type:"+type;
                  var UploadFile="<p id='inlinksTag' class='inlinksTag'></p>";
                  $("#form3adiv").append(UploadFile);
                  $("#inlinksTag").text(all);
                  
                  $('#inlinsubmit').removeAttr('disabled');
                 
                  });

$(function(){
            var bar = $('.inlinbar');
            var percent = $('.inlinpercent');
            var status = $('.inlinstatus'); 
    
    $('#inlinsubmit').click(function(){

            $('#form3a').ajaxForm({
            
             beforeSend: function() {
             status.empty();
             var percentVal = '0%';
             bar.width(percentVal)
             percent.html(percentVal);
                               },
    
            uploadProgress: function(event, position, total, percentComplete) {
            var percentVal = percentComplete + '%';
            bar.width(percentVal)
            percent.html(percentVal);
            },
    
            success: function() {
            var percentVal = '100%';
            bar.width(percentVal)
            percent.html(percentVal);
            },
  
            complete: function(xhr) {
            status.html(xhr.responseText);
            //after inner link uploaded, start visualizing
           $("#ltodraw").click(function()
          {
           alert("good!");
          });
            } 
            
            });
          });
});



//other inner visualization choices
$("#inother").click(function(){
  $("#dt4div").show();
  $("#form3a").hide();
  indicator[2]="otherlink";
});


//data track4 choices 4444444444444444444444444444444444444444444444444444444444444
//storing data related to scatter and other setting choices
var sumdata4=[];
//if yes
$("#dt4y").click(function(){
  $("#inother4choose").show();
  indicator[3]="1";
});
  //if highlight
  $("#inother4highlight").click(function(){
    $("#form3b4").show();
    $("#form3b4").attr("action","../PHP/In/4th/highlight.php");
    $("#form3b4s").hide();
    $("#form4bchoice").hide();
    hint[1]="1";
  });
  //some housekeeping settings
  //greater than
        $("#inother4show").click(function()
        {
         sumdata4[0]=$("#inother4greter").val();
        });
        $("#inother4hide").click(function()
        {
         sumdata4[0]=$("#inother4greter").val()+"hide";
        });
        //lower than
        $("#inother4lowshow").click(function()
        {
         sumdata4[2]=$("#inother4lower").val(); 
        });
        $("#inother4lowshow").click(function()
        {
         sumdata4[2]=$("#inother4lower").val()+"hide";
        });
  //if scatter
  $("#inother4scatter").click(function(){
    $("#form3b4").show();
    $("#form3b4").attr("action","../PHP/In/4th/scatter.php");
    $("#form3b4s").show();
    $("#form3b4s").attr("action","../PHP/In/4th/scattersettings.php");
    $(".inother4div").show();
    $("#form4bchoice").hide();
    $("#inother4greter").val("1");
    $("#inother4lower").val("0");

    hint[1]="2";
  });
  //if line
  $("#inother4line").click(function(){
    $("#form3b4").show();
    $("#form3b4").attr("action","../PHP/In/4th/line.php");
    $("#form3b4s").show();
    $("#form3b4s").attr("action","../PHP/In/4th/linesettings.php");
    $(".inother4div").hide();
    $("#inother4greter").val("1");
    $("#inother4lower").val("0");
    $(".inother4shadiv").hide();
    $("#form4bchoice").hide();
    hint[1]="3";
  });
  //if histogram
  $("#inother4histogram").click(function(){
    $("#form3b4").show();
    $("#form3b4").attr("action","../PHP/In/4th/histogram.php");
    $("#form3b4s").attr("action","../PHP/In/4th/histogramsettings.php");
    $("#form3b4s").show();
    $(".inother4div").hide();
    $("#inother4greter").val("1");
    $("#inother4lower").val("0");
    $(".inother4shadiv").hide();
    $("#form4bchoice").hide();
    hint[1]="4";
  });
  //if tile
  $("#inother4tile").click(function(){
    $("#form3b4").show();
    $("#form3b4").attr("action","../PHP/In/4th/tile.php");
    $("#form3b4s").attr("action","../PHP/In/4th/tilesettings.php");
    $("#form3b4s").show();
    $(".inother4div").hide();
    $("#inother4greter").val("100kb");
    $("#inother4lower").val("1kb");
    $(".inother4shadiv").hide();
    $("#form4bchoice").hide();
    hint[1]="5";
  });
  //if heatmap
  $("#inother4heat").click(function(){
    $("#form3b4").show();
    $("#form3b4").attr("action","../PHP/In/4th/heatmap.php");
    $("#form3b4sb").attr("action","../PHP/In/4th/heatmapsettings.php");
    $("#form3b4s").hide();
    $("#form4bchoice").show();
    $(".inother4div").hide();
    $("#inother4greter").val("100kb");
    $("#inother4lower").val("1kb");
    $(".inother4shadiv").hide();
    hint[1]="6";
  });
  //if text label
  $("#inother4text").click(function(){
    $("#form3b4").show();
    $("#form3b4").attr("action","../PHP/In/4th/text.php");
    $("#form3b4s").hide();
    $("#form4bchoice").hide();
    hint[1]="7";
  });

  //at the end, press OK
  $("#form3b4s").submit(function(event){
  event.preventDefault();
  
  sumdata4[1]=$("input[name='inother4showshape']:checked","#form3b4s").val();
  sumdata4[3]=$("input[name='inother4lowshowshape']:checked","#form3b4s").val();

  var together=sumdata4.join();
  $("#in4thdata").val(together);
   var settingsp4=$("#form3b4s").attr("action");
   var posting=$.post(settingsp4,$("#form3b4s").serialize());

   posting.done(function() {
                             $("#dt5div").show();
                           });
                                            });
  //settings for heatmap
$("#form3b4sb").submit(function(event){
  event.preventDefault();

  sumdata4[0]=$("#in4max").val();
  sumdata4[1]=$("#in4min").val();
  
  var together=sumdata4.join();
  $("#in4data").val(together);

   var settingsp4=$("#form3b4sb").attr("action");
   var posting=$.post(settingsp4,$("#form3b4sb").serialize());

   posting.done(function() {
                             $("#dt5div").show();
                           });
                                            });

//if no
$("#dt4n").click(function(){
  $("#form3b4").hide();
  $("#dt5div").show();
  $("#inother4choose").hide();
  indicator[3]="0";
});

//if merge
$("#dt4m").click(function(){
  $("#form3b4").hide();
  $("#dt5div").show();
  $("#dt5").text("4-5");
  $("#inother4choose").hide();
  indicator[3]=$("#dt4").text();
  $("#dt5n").attr("disabled","disabled");

});

//data track 4 file upload settings
  $('#inother4file').change(function(){
                  
                  var file = this.files[0];
                  var name = file.name;
                  var size = file.size;
                  var type = file.type;
                  var all="File:"+name+"\r Size:"+size+"\r Type:"+type;
                  var UploadFile="<p id='inother4Tag' class='inother4Tag'></p>";
                  $("#form3b4div").append(UploadFile);
                  $("#inother4Tag").text(all);
                  
                  $('#inother4submit').removeAttr('disabled');
                 
                  });

$(function(){
            var bar = $('.inother4bar');
            var percent = $('.inother4percent');
            var status = $('.inother4status'); 
    $('#inother4submit').click(function(){

            $('#form3b4').ajaxForm({
            
             beforeSend: function() {
             status.empty();
             var percentVal = '0%';
             bar.width(percentVal)
             percent.html(percentVal);
                               },
    
            uploadProgress: function(event, position, total, percentComplete) {
            var percentVal = percentComplete + '%';
            bar.width(percentVal)
            percent.html(percentVal);
            },
    
            success: function() {
            var percentVal = '100%';
            bar.width(percentVal)
            percent.html(percentVal);
            },
  
            complete: function(xhr) {
            status.html(xhr.responseText);
            $("#dt5div").show();
            } 
            
            });
          });
});

//data track5 choices 555555555555555555555555555555555555555555555555555555555555555555555
//storing data related to scatter and other setting choices
var sumdata5=[];
//if yes
$("#dt5y").click(function(){
  $("#inother5choose").show();
  indicator[4]="1";
});
  //if highlight
  $("#inother5highlight").click(function(){
    $("#form3b5").show();
    $("#form3b5").attr("action","../PHP/In/5th/highlight.php");
    $("#form3b5s").hide();
    $("#form5bchoice").hide();
    hint[2]="1";
  });
  //some housekeeping settings
  //greater than
        $("#inother5show").click(function()
        {
         sumdata5[0]=$("#inother5greter").val();
        });
        $("#inother5hide").click(function()
        {
         sumdata5[0]=$("#inother5greter").val()+"hide";
        });
        //lower than
        $("#inother5lowshow").click(function()
        {
         sumdata5[2]=$("#inother5lower").val(); 
        });
        $("#inother5lowshow").click(function()
        {
         sumdata5[2]=$("#inother5lower").val()+"hide";
        });
  //if scatter
  $("#inother5scatter").click(function(){
    $("#form3b5").show();
    $("#form3b5").attr("action","../PHP/In/5th/scatter.php");
    $("#form3b5s").show();
    $("#form3b5s").attr("action","../PHP/In/5th/scattersettings.php");
    $(".inother5div").show();
    $("#form5bchoice").hide();
    $("#inother5greter").val("1");
    $("#inother5lower").val("0");
   
    hint[2]="2";
  });
  //if line
  $("#inother5line").click(function(){
    $("#form3b5").show();
    $("#form3b5").attr("action","../PHP/In/5th/line.php");
    $("#form3b5s").show();
    $("#form3b5s").attr("action","../PHP/In/5th/linesettings.php");
    $(".inother5div").hide();
    $("#form5bchoice").hide();
    $("#inother5greter").val("1");
    $("#inother5lower").val("0");
    hint[2]="3";
  });
  //if histogram
  $("#inother5histogram").click(function(){
    $("#form3b5").show();
    $("#form3b5").attr("action","../PHP/In/5th/histogram.php");
    $("#form3b5s").attr("action","../PHP/In/5th/histogramsettings.php");
    $("#form3b5s").show();
    $(".inother5div").hide();
    $("#form5bchoice").hide();
    $("#inother5greter").val("1");
    $("#inother5lower").val("0");
    $(".inother5shadiv").hide();
    hint[2]="4";
  });
  //if tile
  $("#inother5tile").click(function(){
    $("#form3b5").show();
    $("#form3b5").attr("action","../PHP/In/5th/tile.php");
    $("#form3b5s").attr("action","../PHP/In/5th/tilesettings.php");
    $("#form3b5s").show();
    $(".inother5div").hide();
    $("#form5bchoice").hide();
    $("#inother5greter").val("100kb");
    $("#inother5lower").val("1kb");
    $(".inother5shadiv").hide();
    hint[2]="5";
  });
  //if heatmap
  $("#inother5heat").click(function(){
    $("#form3b5").show();
    $("#form3b5").attr("action","../PHP/In/5th/heatmap.php");
    $("#form3b5sb").attr("action","../PHP/In/5th/heatmapsettings.php");
    $("#form3b5s").hide();
    $("#form5bchoice").hide();
    $(".inother5div").hide();
    hint[2]="6";
  });
  //if text label
  $("#inother5text").click(function(){
    $("#form3b5").show();
    $("#form3b5").attr("action","../PHP/In/5th/text.php");
    $("#form3b5s").hide();
    $("#form5bchoice").hide();
    hint[2]="7";
  });
  
  //at the end, press OK
  $("#form3b5s").submit(function(event){
  event.preventDefault();

sumdata5[1]=$("input[name='inother5showshape']:checked","#form3b5s").val();
sumdata5[3]=$("input[name='inother5lowshowshape']:checked","#form3b5s").val();
  
  var together=sumdata5.join();
  $("#in5thdata").val(together);
   
   var settingsp5=$("#form3b5s").attr("action");
   var posting=$.post(settingsp5,$("#form3b5s").serialize());


   posting.done(function() {
                             $("#dt6div").show();
                           });
                                            });
   //settings for heatmap
$("#form3b5sb").submit(function(event){
  event.preventDefault();

  sumdata5[0]=$("#in5max").val();
  sumdata5[1]=$("#in5min").val();
  
  var together=sumdata5.join();
  $("#in5data").val(together);

   var settingsp5=$("#form3b5sb").attr("action");
   var posting=$.post(settingsp5,$("#form3b5sb").serialize());

   posting.done(function() {
                             $("#dt6div").show();
                           });
                                            });

//if no
  $("#dt5n").click(function(){
  $("#form3b5").hide();
  $("#dt6div").show();
  $("#inother5choose").hide();
  indicator[4]="0"

});

//if merge
$("#dt5m").click(function(){
  $("#form3b5").hide();
  $("#dt6div").show();
  var text1=$("#dt5").text();
  $("#dt6").text(text1+"-6");
  indicator[4]=$("#dt5").text();
  $("#dt6n").attr("disabled","disabled");
});

//data track 5 file upload settings
  $('#inother5file').change(function(){
                  
                  var file = this.files[0];
                  var name = file.name;
                  var size = file.size;
                  var type = file.type;
                  var all="File:"+name+"\r Size:"+size+"\r Type:"+type;
                  var UploadFile="<p id='inother5Tag' class='inother5Tag'></p>";
                  $("#form3b5div").append(UploadFile);
                  $("#inother5Tag").text(all);
                  
                  $('#inother5submit').removeAttr('disabled');
                 
                  });
$(function(){
            var bar = $('.inother5bar');
            var percent = $('.inother5percent');
            var status = $('.inother5status'); 
    $('#inother5submit').click(function(){

            $('#form3b5').ajaxForm({
            
             beforeSend: function() {
             status.empty();
             var percentVal = '0%';
             bar.width(percentVal)
             percent.html(percentVal);
                               },
    
            uploadProgress: function(event, position, total, percentComplete) {
            var percentVal = percentComplete + '%';
            bar.width(percentVal)
            percent.html(percentVal);
            },
    
            success: function() {
            var percentVal = '100%';
            bar.width(percentVal)
            percent.html(percentVal);
            },
  
            complete: function(xhr) {
            status.html(xhr.responseText);
            $("#dt6div").show();
            } 
            
            });
          });
});


//data track6 choices 6666666666666666666666666666666666666666666666666666666666666666666666666666
//storing data related to scatter and other setting choices
var sumdata6=[];
//if yes
$("#dt6y").click(function(){
  $("#inother6choose").show();
  indicator[5]="1";
});
  //if highlight
  $("#inother6highlight").click(function(){
    $("#form3b6").show();
    $("#form3b6").attr("action","../PHP/In/6th/highlight.php");
    $("#form3b6s").hide();
    $("#form6bchoice").hide();
    hint[3]="1";
  });
  //some housekeeping settings
  //greater than
        $("#inother6show").click(function()
        {
         sumdata6[0]=$("#inother6greter").val();
        });
        $("#inother6hide").click(function()
        {
         sumdata6[0]=$("#inother6greter").val()+"hide";
        });
        //lower than
        $("#inother6lowshow").click(function()
        {
         sumdata6[2]=$("#inother6lower").val(); 
        });
        $("#inother6lowshow").click(function()
        {
         sumdata6[2]=$("#inother6lower").val()+"hide";
        });
  //if scatter
  $("#inother6scatter").click(function(){
    $("#form3b6").show();
    $("#form3b6").attr("action","../PHP/In/6th/scatter.php");
    $("#form3b6s").show();
    $("#form3b6s").attr("action","../PHP/In/6th/scattersettings.php");
    $(".inother6div").show();
    $("#form6bchoice").hide();
    $("#inother6greter").val("1");
    $("#inother6lower").val("0");

    hint[3]="2";
  });
  //if line
  $("#inother6line").click(function(){
    $("#form3b6").show();
    $("#form3b6").attr("action","../PHP/In/6th/line.php");
    $("#form3b6s").show();
    $("#form3b6s").attr("action","../PHP/In/6th/linesettings.php");
    $(".inother6div").hide();
    $("#inother6greter").val("1");
    $("#inother6lower").val("0");
    $(".inother6shadiv").hide();
    $("#form6bchoice").hide();
    hint[3]="3";
  });
  //if histogram
  $("#inother6histogram").click(function(){
    $("#form3b6").show();
    $("#form3b6").attr("action","../PHP/In/6th/histogram.php");
    $("#form3b6s").attr("action","../PHP/In/6th/histogramsettings.php");
    $("#form3b6s").show();
    $(".inother6div").hide();
    $("#inother6greter").val("1");
    $("#inother6lower").val("0");
    $(".inother6shadiv").hide();
    $("#form6bchoice").hide();
    hint[3]="4";
  });
  //if tile
  $("#inother6tile").click(function(){
    $("#form3b6").show();
    $("#form3b6").attr("action","../PHP/In/6th/tile.php");
    $("#form3b6s").attr("action","../PHP/In/6th/tilesettings.php");
    $("#form3b6s").show();
    $(".inother6div").hide();
    $("#inother6greter").val("100kb");
    $("#inother6lower").val("1kb");
    $(".inother6shadiv").hide();
    $("#form6bchoice").hide();
    hint[3]="5";
  });
  //if heatmap
  $("#inother6heat").click(function(){
    $("#form3b6").show();
    $("#form3b6").attr("action","../PHP/In/6th/heatmap.php");
    $("#form3b6sb").attr("action","../PHP/In/6th/heatmapsettings.php");
    $("#form3b6s").hide();
    $(".inother6div").hide();
    $(".inother6shadiv").hide();
    $("#form6bchoice").show();
    hint[3]="6";
  });
  //if text label
  $("#inother6text").click(function(){
    $("#form3b6").show();
    $("#form3b6").attr("action","../PHP/In/6th/text.php");
    $("#form3b6s").hide();
    $("#form6bchoice").hide();
    hint[3]="7";
  });
  //at the end, press OK
  $("#form3b6s").submit(function(event){
  event.preventDefault();
  
  sumdata6[1]=$("input[name='inother6showshape']:checked","#form3b6s").val();
  sumdata6[3]=$("input[name='inother6lowshowshape']:checked","#form3b6s").val();

  var together=sumdata6.join();
  $("#in6thdata").val(together);
   var settingsp6=$("#form3b6s").attr("action");
   var posting=$.post(settingsp6,$("#form3b6s").serialize());

   posting.done(function() {
                             $("#dt7div").show();
                           });
                                            });
//settings for heatmap
$("#form3b6sb").submit(function(event){
  event.preventDefault();

  sumdata6[0]=$("#in6max").val();
  sumdata6[1]=$("#in6min").val();
  
  var together=sumdata6.join();
  $("#in6data").val(together);

   var settingsp6=$("#form3b6sb").attr("action");
   var posting=$.post(settingsp6,$("#form3b6sb").serialize());

   posting.done(function() {
                             $("#dt7div").show();
                           });
                                            });


//if no
$("#dt6n").click(function(){
  $("#form3b6").hide();
  $("#dt7div").show();
  $("#inother6choose").hide();
  indicator[5]="0";
});

//if merge
$("#dt6m").click(function(){
  $("#form3b6").hide();
  $("#dt7div").show();
  var text2=$("#dt6").text();
  $("#dt7").text(text2+"-7");
  indicator[5]=$("#dt6").text();
  $("#dt7n").attr("disabled","disabled");
});

//data track 6 file upload settings
  $('#inother6file').change(function(){
                  
                  var file = this.files[0];
                  var name = file.name;
                  var size = file.size;
                  var type = file.type;
                  var all="File:"+name+"\r Size:"+size+"\r Type:"+type;
                  var UploadFile="<p id='inother6Tag' class='inother6Tag'></p>";
                  $("#form3b6div").append(UploadFile);
                  $("#inother6Tag").text(all);
                  
                  $('#inother6submit').removeAttr('disabled');
                 
                  });

$(function(){
            var bar = $('.inother6bar');
            var percent = $('.inother6percent');
            var status = $('.inother6status'); 
    $('#inother6submit').click(function(){

            $('#form3b6').ajaxForm({
            
             beforeSend: function() {
             status.empty();
             var percentVal = '0%';
             bar.width(percentVal)
             percent.html(percentVal);
                               },
    
            uploadProgress: function(event, position, total, percentComplete) {
            var percentVal = percentComplete + '%';
            bar.width(percentVal)
            percent.html(percentVal);
            },
    
            success: function() {
            var percentVal = '100%';
            bar.width(percentVal)
            percent.html(percentVal);
            },
  
            complete: function(xhr) {
            status.html(xhr.responseText);
            $("#dt7div").show();
            } 
            
            });
          });
});

//data track7 choices 77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
//storing data related to scatter and other setting choices
var sumdata7=[];
//if yes
$("#dt7y").click(function(){
  $("#inother7choose").show();
  indicator[6]="1";
});

 //if highlight
  $("#inother7highlight").click(function(){
    $("#form3b7").show();
    $("#form3b7").attr("action","../PHP/In/7th/highlight.php");
    $("#form3b7s").hide();
    $("#form7bchoice").hide();
    hint[4]="1";
  });
  //some housekeeping settings
  //greater than
        $("#inother7show").click(function()
        {
         sumdata7[0]=$("#inother7greter").val();
        });
        $("#inother7hide").click(function()
        {
         sumdata7[0]=$("#inother7greter").val()+"hide";
        });
        //lower than
        $("#inother7lowshow").click(function()
        {
         sumdata7[2]=$("#inother7lower").val(); 
        });
        $("#inother7lowshow").click(function()
        {
         sumdata7[2]=$("#inother7lower").val()+"hide";
        });
  //if scatter
  $("#inother7scatter").click(function(){
    $("#form3b7").show();
    $("#form3b7").attr("action","../PHP/In/7th/scatter.php");
    $("#form3b7s").show();
    $("#form3b7s").attr("action","../PHP/In/7th/scattersettings.php");
    $(".inother7div").show();
    $("#form7bchoice").hide();
    $("#inother7greter").val("1");
    $("#inother7lower").val("0");
    
    hint[4]="2";
  });
  //if line
  $("#inother7line").click(function(){
    $("#form3b7").show();
    $("#form3b7").attr("action","../PHP/In/7th/line.php");
    $("#form3b7s").show();
    $("#form3b7s").attr("action","../PHP/In/7th/linesettings.php");
    $(".inother7div").hide();
    $("#form7bchoice").hide();
    $("#inother7greter").val("1");
    $("#inother7lower").val("0");
    hint[4]="3";
  });
  //if histogram
  $("#inother7histogram").click(function(){
    $("#form3b7").show();
    $("#form3b7").attr("action","../PHP/In/7th/histogram.php");
    $("#form3b7s").attr("action","../PHP/In/7th/histogramsettings.php");
    $("#form3b7s").show();
    $(".inother7div").hide();
    $("#inother7greter").val("1");
    $("#inother7lower").val("0");
    $(".inother7shadiv").hide();
    $("#form7bchoice").hide();
    hint[4]="4";
  });
  //if tile
  $("#inother7tile").click(function(){
    $("#form3b7").show();
    $("#form3b7").attr("action","../PHP/In/7th/tile.php");
    $("#form3b7s").attr("action","../PHP/In/7th/tilesettings.php");
    $("#form3b7s").show();
    $(".inother7div").hide();
    $("#inother7greter").val("100kb");
    $("#inother7lower").val("1kb");
    $(".inother7shadiv").hide();
    $("#form7bchoice").hide();
    hint[4]="5";
  });
  //if heatmap
  $("#inother7heat").click(function(){
    $("#form3b7").show();
    $("#form3b7").attr("action","../PHP/In/7th/heatmap.php");
    $("#form3b7sb").attr("action","../PHP/In/7th/heatmapsettings.php");
    $("#form3b7s").hide();
    $(".inother7div").hide();
    $(".inother7shadiv").hide();
    $("#form7bchoice").show();
    hint[4]="6";
  });
  //if text label
  $("#inother7text").click(function(){
    $("#form3b7").show();
    $("#form3b7").attr("action","../PHP/In/7th/text.php");
    $("#form3b7s").hide();
    $("#form7bchoice").hide();
    hint[4]="7";
  });
  //at the end, press OK
  $("#form3b7s").submit(function(event){
  event.preventDefault();

  sumdata7[1]=$("input[name='inother7showshape']:checked","#form3b7s").val();
  sumdata7[3]=$("input[name='inother7lowshowshape']:checked","#form3b7s").val();

  var together=sumdata7.join();
  $("#in7thdata").val(together);
   var settingsp7=$("#form3b7s").attr("action");
   var posting=$.post(settingsp7,$("#form3b7s").serialize());

   posting.done(function() {
                             $("#dt8div").show();
                           });
                                            });
//settings for heatmap
$("#form3b7sb").submit(function(event){
  event.preventDefault();

  sumdata7[0]=$("#in7max").val();
  sumdata7[1]=$("#in7min").val();
  
  var together=sumdata7.join();
  $("#in7data").val(together);

   var settingsp7=$("#form3b7sb").attr("action");
   var posting=$.post(settingsp7,$("#form3b7sb").serialize());

   posting.done(function() {
                             $("#dt8div").show();
                           });
                                            });

//if no
$("#dt7n").click(function(){
  $("#form3b7").hide();
  $("#dt8div").show();
  $("#inother7choose").hide();
  indicator[6]="0";
});
//if merge
$("#dt7m").click(function(){
  $("#form3b7").hide();
  $("#dt8div").show();
  var text3=$("#dt7").text();
  $("#dt8").text(text3+"-8");
  indicator[6]=$("#dt7").text();
  $("#dt8n").attr("disabled","disabled");
});

//data track 7 file upload settings
  $('#inother7file').change(function(){
                  
                  var file = this.files[0];
                  var name = file.name;
                  var size = file.size;
                  var type = file.type;
                  var all="File:"+name+"\r Size:"+size+"\r Type:"+type;
                  var UploadFile="<p id='inother7Tag' class='inother7Tag'></p>";
                  $("#form3b7div").append(UploadFile);
                  $("#inother7Tag").text(all);
                  
                  $('#inother7submit').removeAttr('disabled');
                 
                  });

$(function(){
            var bar = $('.inother7bar');
            var percent = $('.inother7percent');
            var status = $('.inother7status'); 
    $('#inother7submit').click(function(){

            $('#form3b7').ajaxForm({
            
             beforeSend: function() {
             status.empty();
             var percentVal = '0%';
             bar.width(percentVal)
             percent.html(percentVal);
                               },
    
            uploadProgress: function(event, position, total, percentComplete) {
            var percentVal = percentComplete + '%';
            bar.width(percentVal)
            percent.html(percentVal);
            },
    
            success: function() {
            var percentVal = '100%';
            bar.width(percentVal)
            percent.html(percentVal);
            },
  
            complete: function(xhr) {
            status.html(xhr.responseText);
            $("#dt8div").show();
            } 
            
            });
          });
});

//data track8 choices 888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
//storing data related to scatter and other setting choices
var sumdata8=[];
//if yes
$("#dt8y").click(function(){
  $("#inother8choose").show();
  indicator[7]="1";
});

 //if highlight
  $("#inother8highlight").click(function(){
    $("#form3b8").show();
    $("#form3b8").attr("action","../PHP/In/8th/highlight.php");
    $("#form3b8s").hide();
    $("#form8bchoice").hide();
    hint[5]="1";
  });
  //some housekeeping settings
  //greater than
        $("#inother8show").click(function()
        {
         sumdata8[0]=$("#inother8greter").val();
        });
        $("#inother8hide").click(function()
        {
         sumdata8[0]=$("#inother8greter").val()+"hide";
        });
        //lower than
        $("#inother8lowshow").click(function()
        {
         sumdata8[2]=$("#inother8lower").val(); 
        });
        $("#inother8lowshow").click(function()
        {
         sumdata8[2]=$("#inother8lower").val()+"hide";
        });
  //if scatter
  $("#inother8scatter").click(function(){
    $("#form3b8").show();
    $("#form3b8").attr("action","../PHP/In/8th/scatter.php");
    $("#form3b8s").show();
    $("#form3b8s").attr("action","../PHP/In/8th/scattersettings.php");
    $(".inother8div").show();
    $("#form8bchoice").hide();
    $("#inother8greter").val("1");
    $("#inother8lower").val("0");

    hint[5]="2";
  });
  //if line
  $("#inother8line").click(function(){
    $("#form3b8").show();
    $("#form3b8").attr("action","../PHP/In/8th/line.php");
    $("#form3b8s").show();
    $("#form3b8s").attr("action","../PHP/In/8th/linesettings.php");
    $(".inother8div").hide();
    $("#inother8greter").val("1");
    $("#inother8lower").val("0");
    $(".inother8shadiv").hide();
    $("#form8bchoice").hide();
    hint[5]="3";
  });
  //if histogram
  $("#inother8histogram").click(function(){
    $("#form3b8").show();
    $("#form3b8").attr("action","../PHP/In/8th/histogram.php");
    $("#form3b8s").attr("action","../PHP/In/8th/histogramsettings.php");
    $("#form3b8s").show();
    $(".inother8div").hide();
    $("#inother8greter").val("1");
    $("#inother8lower").val("0");
    $(".inother8shadiv").hide();
    $("#form8bchoice").hide();
    hint[5]="4";
  });
  //if tile
  $("#inother8tile").click(function(){
    $("#form3b8").show();
    $("#form3b8").attr("action","../PHP/In/8th/tile.php");
    $("#form3b8s").attr("action","../PHP/In/8th/tilesettings.php");
    $("#form3b8s").show();
    $(".inother8div").hide();
    $("#inother8greter").val("100kb");
    $("#inother8lower").val("1kb");
    $(".inother8shadiv").hide();
    $("#form8bchoice").hide();
    hint[5]="5";
  });
  //if heatmap
  $("#inother8heat").click(function(){
    $("#form3b8").show();
    $("#form8bchoice").show();
    $("#form3b8").attr("action","../PHP/In/8th/heatmap.php");
    $("#form3b8sb").attr("action","../PHP/In/8th/heatmapsettings.php");
    $("#form3b8s").hide();
    $(".inother8div").hide();
    $(".inother8shadiv").hide();
    hint[5]="6";
  });
  //if text label
  $("#inother8text").click(function(){
    $("#form3b8").show();
    $("#form3b8").attr("action","../PHP/In/8th/text.php");
    $("#form3b8s").hide();
    $("#form8bchoice").hide();
    hint[5]="7";
  });

  //at the end, press OK
  $("#form3b8s").submit(function(event){
  event.preventDefault();

  sumdata8[1]=$("input[name='inother8showshape']:checked","#form3b8s").val();
  sumdata8[3]=$("input[name='inother8lowshowshape']:checked","#form3b8s").val();

  var together=sumdata8.join();
  $("#in8thdata").val(together);

   var settingsp8=$("#form3b8s").attr("action");
   var posting=$.post(settingsp8,$("#form3b8s").serialize());

   posting.done(function() {
                             $("#dt9div").show();
                           });
                                            });
//settings for heatmap
$("#form3b8sb").submit(function(event){
  event.preventDefault();

  sumdata8[0]=$("#in8max").val();
  sumdata8[1]=$("#in8min").val();
  
  var together=sumdata8.join();
  $("#in8data").val(together);

   var settingsp8=$("#form3b8sb").attr("action");
   var posting=$.post(settingsp8,$("#form3b8sb").serialize());

   posting.done(function() {
                             $("#dt9div").show();
                           });
                                            });

//if no
$("#dt8n").click(function(){
  $("#form3b8").hide();
  $("#dt9div").show();
  $("#inother8choose").hide();
  indicator[7]="0";
});
//if merge
$("#dt8m").click(function(){
  $("#form3b8").hide();
  $("#dt9div").show();
  var text4=$("#dt8").text();
  $("#dt9").text(text4+"-9");
  indicator[7]=$("#dt8").text();
  $("#dt9n").attr("disabled","disabled");
});

//data track 8 file upload settings
  $('#inother8file').change(function(){
                  
                  var file = this.files[0];
                  var name = file.name;
                  var size = file.size;
                  var type = file.type;
                  var all="File:"+name+"\r Size:"+size+"\r Type:"+type;
                  var UploadFile="<p id='inother8Tag' class='inother8Tag'></p>";
                  $("#form3b8div").append(UploadFile);
                  $("#inother8Tag").text(all);
                  
                  $('#inother8submit').removeAttr('disabled');
                 
                  });

$(function(){
            var bar = $('.inother8bar');
            var percent = $('.inother8percent');
            var status = $('.inother8status'); 
    $('#inother8submit').click(function(){

            $('#form3b8').ajaxForm({
            
             beforeSend: function() {
             status.empty();
             var percentVal = '0%';
             bar.width(percentVal)
             percent.html(percentVal);
                               },
    
            uploadProgress: function(event, position, total, percentComplete) {
            var percentVal = percentComplete + '%';
            bar.width(percentVal)
            percent.html(percentVal);
            },
    
            success: function() {
            var percentVal = '100%';
            bar.width(percentVal)
            percent.html(percentVal);
            },
  
            complete: function(xhr) {
            status.html(xhr.responseText);
            $("#dt9div").show();
            } 
            
            });
          });
});

//data track9 choices 9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
//storing data related to scatter and other setting choices
var sumdata9=[];
//if yes
$("#dt9y").click(function(){
  $("#inother9choose").show();
  indicator[8]="1";
});
 
 //if highlight
  $("#inother9highlight").click(function(){
    $("#form3b9").show();
    $("#form3b9").attr("action","../PHP/In/9th/highlight.php");
    $("#form3b9s").hide();
    $("#form9bchoice").hide();
    hint[6]="1";
  });
  //some housekeeping settings
  //greater than
        $("#inother9show").click(function()
        {
         sumdata9[0]=$("#inother9greter").val();
        });
        $("#inother9hide").click(function()
        {
         sumdata9[0]=$("#inother9greter").val()+"hide";
        });
        //lower than
        $("#inother9lowshow").click(function()
        {
         sumdata9[2]=$("#inother9lower").val(); 
        });
        $("#inother9lowshow").click(function()
        {
         sumdata9[2]=$("#inother9lower").val()+"hide";
        });
  //if scatter
  $("#inother9scatter").click(function(){
    $("#form3b9").show();
    $("#form3b9").attr("action","../PHP/In/9th/scatter.php");
    $("#form3b9s").show();
    $("#form3b9s").attr("action","../PHP/In/9th/scattersettings.php");
    $(".inother9div").show();
    $("#form9bchoice").hide();
    $("#inother9greter").val("1");
    $("#inother9lower").val("0");

    hint[6]="2";
  });
  //if line
  $("#inother9line").click(function(){
    $("#form3b9").show();
    $("#form3b9").attr("action","../PHP/In/9th/line.php");
    $("#form3b9s").show();
    $("#form3b9s").attr("action","../PHP/In/9th/linesettings.php");
    $(".inother9div").hide();
    $("#inother9greter").val("1");
    $("#inother9lower").val("0");
    $(".inother9shadiv").hide();
    $("#form9bchoice").hide();
    hint[6]="3";
  });
  //if histogram
  $("#inother9histogram").click(function(){
    $("#form3b9").show();
    $("#form3b9").attr("action","../PHP/In/9th/histogram.php");
    $("#form3b9s").attr("action","../PHP/In/9th/histogramsettings.php");
    $("#form3b9s").show();
    $(".inother9div").hide();
    $("#inother9greter").val("1");
    $("#inother9lower").val("0");
    $(".inother9shadiv").hide();
    $("#form9bchoice").hide();
    hint[6]="4";
  });
  //if tile
  $("#inother9tile").click(function(){
    $("#form3b9").show();
    $("#form3b9").attr("action","../PHP/In/9th/tile.php");
    $("#form3b9s").attr("action","../PHP/In/9th/tilesettings.php");
    $("#form3b9s").show();
    $(".inother9div").hide();
    $("#inother9greter").val("100kb");
    $("#inother9lower").val("1kb");
    $(".inother9shadiv").hide();
    $("#form9bchoice").hide();
    hint[6]="5";
  });
  //if heatmap
  $("#inother9heat").click(function(){
    $("#form3b9").show();
    $("#form9bchoice").show();
    $("#form3b9").attr("action","../PHP/In/9th/heatmap.php");
    $("#form3b9sb").attr("action","../PHP/In/9th/heatmapsettings.php");
    $("#form3b9s").hide();
    $(".inother9div").hide();
    $(".inother9shadiv").hide();
    hint[6]="6";
  });
  //if text label
  $("#inother9text").click(function(){
    $("#form3b9").show();
    $("#form3b9").attr("action","../PHP/In/9th/text.php");
    $("#form3b9s").hide();
    $("#form9bchoice").hide();
    hint[6]="7";
  });
  //at the end, press OK
  $("#form3b9s").submit(function(event){
  event.preventDefault();

  sumdata9[1]=$("input[name='inother9showshape']:checked","#form3b9s").val();
  sumdata9[3]=$("input[name='inother9lowshowshape']:checked","#form3b9s").val();

  var together=sumdata9.join();
  $("#in9thdata").val(together);

   var settingsp9=$("#form3b9s").attr("action");
   var posting=$.post(settingsp9,$("#form3b9s").serialize());

   posting.done(function() {
                             $.merge(indicator,hint);
                             var indicatorsum=indicator.join();
                             $("#indicator").val(indicatorsum);
                             var posting=$.post("../PHP/Indicator/indicator.php",$("#indiform").serialize());
                             
                             posting.done(function(){alert("set perl")});
                           });
                                            });
//settings for heatmap
$("#form3b9sb").submit(function(event){
  event.preventDefault();

  sumdata9[0]=$("#in9max").val();
  sumdata9[1]=$("#in9min").val();
  
  var together=sumdata9.join();
  $("#in9data").val(together);

   var settingsp9=$("#form3b9sb").attr("action");
   var posting=$.post(settingsp9,$("#form3b9sb").serialize());

   posting.done(function() {
                             posting.done(function(){alert("set perl")});
                           });
                                            });

//if no
$("#dt9n").click(function(){
  $("#form3b9").hide();
  $("#inother9choose").hide();
  indicator[8]="0";
  $.merge(indicator,hint);
  var indicatorsum=indicator.join();
  $("#indicator").val(indicatorsum);
  var posting=$.post("../PHP/Indicator/indicator.php",$("#indiform").serialize());
});

//data track 9 file upload settings
  $('#inother9file').change(function(){
                  
                  var file = this.files[0];
                  var name = file.name;
                  var size = file.size;
                  var type = file.type;
                  var all="File:"+name+"\r Size:"+size+"\r Type:"+type;
                  var UploadFile="<p id='inother9Tag' class='inother9Tag'></p>";
                  $("#form3b9div").append(UploadFile);
                  $("#inother9Tag").text(all);
                  
                  $('#inother9submit').removeAttr('disabled');
                 
                  });

$(function(){
            var bar = $('.inother9bar');
            var percent = $('.inother9percent');
            var status = $('.inother9status'); 
    $('#inother9submit').click(function(){

            $('#form3b9').ajaxForm({
            
             beforeSend: function() {
             status.empty();
             var percentVal = '0%';
             bar.width(percentVal)
             percent.html(percentVal);
                               },
    
            uploadProgress: function(event, position, total, percentComplete) {
            var percentVal = percentComplete + '%';
            bar.width(percentVal)
            percent.html(percentVal);
            },
    
            success: function() {
            var percentVal = '100%';
            bar.width(percentVal)
            percent.html(percentVal);
            },
  
            complete: function(xhr) {
            status.html(xhr.responseText);
            $.merge(indicator,hint);
            var indicatorsum=indicator.join();
            $("#indicator").val(indicatorsum);
            var posting=$.post("../PHP/Indicator/indicator.php",$("#indiform").serialize());
            } 
            
            });
          });
});

})

