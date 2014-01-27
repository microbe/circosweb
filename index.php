<!DOCTYPE html>

<html>

 <head>

 	<title>

    "Welcome to Circos Web-based User Interface"
  
    </title>

     <link rel="stylesheet" type="text/css" href="./CSS/index.css"></link>

     <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>

     <script type="text/javascript" src="./jQuery/index.js"></script>

     <script src="http://malsup.github.com/jquery.form.js"></script>

 </head>


 <body>

  <h1>Welcome to Web Circos</h1>

<!--the first form-->
  <div id='form1'>

    <p>1st, upload your file</p>
  	
  	<form id='kform' action='./PHP/kform.php' method='post'>

  		<input type='file' name='kkfile' id='kkfile' class='kkfile'/>
  		<br>
  		<input type='submit' disabled value='Upload' id='ksubmit'/>

  		<div class='kprogress'>

  			<div class='kbar'></div>
  			<div class='kpercent'>0%</div>
  			<div class='kstatus'></div>

  		</div>

    </form>

  </div> 
<!--the first form end here-->

<!--the 1.1 form--> 
  <div id='form1'>   
    <p>1st, Ideogram</p>

    <p>1.1st, Select karyotypes/ideograms to draw</p>

    <div id='kproceed'></div>
    <div id='selecta'></div>

    <form id='form1_1a' action='form1_1a.php' method='post'>
    <input type="text" name='ideotext' id="ideotext"><br>
    <input type="submit" id="ideosubmit" disabled value="OK">
    </form>

    <p>1.2nd, radius, zooms and spacing</p>
    
    <p>1.2.1st, radius</p>
     <button id="radius_proceed" disabled>Proceed</button>
      <form id='form1_2_a' method='POST'>
       <input type="text" id="radiusdata" name="radiusdata">
       <input type="submit" id="radiussubmit" value="OK" disabled>
      </form>

    <p>1.2.2nd, ticks</p>
      <button id="ticks_proceed" disabled>Proceed</button>
       <form id='form1_2_b' method='POST'>
        <p>What genome are you working with?</p>
        <div id="ticks">
         <input type="radio" name="ticks" value="bacteria">1, Bacteria
         <input type="radio" name="ticks" value="higher">2, Higher Organism
        </div>
        <input type="submit" id="tickssubmit" value="OK" disabled>
       </form>

    <p>1.2.3rd, zooms</p>
      <button id="zooms_proceed" disabled>Proceed</button>
      <div id="zoomsdiv"></div>
       <form id='form1_2_c' method='POST'>
        <input type="text" id="zoomstext" name="zoomstext">
        <input type="submit" id="zoomssubmit" value="OK" disabled>
       </form>

    <p>1.2.4th, spacings</p>
    <button id="spacings_proceed" disabled>Proceed</button>
    <div id="spacingsdiv"></div>
     <form id="form1_2_d" method="POST">
      <input type="text" id="spacingtext" name="spacingtext">
      <input type="submit" id="spacingssubmit" value="OK" disabled>
     </form>

   </div> 
<!--the 1.1 form end here-->

<!--Choose Outer Data Track--> 
<p>Do you need to set outer data vidsualization?</p>
<button type="button" id="yesout" disabled>YES</button>
<button type="button" id="noout" disabled>NO</button>
<!--end here-->  

<!--the second form -->


<!--the second form -->

  <div id='form2'>

  <p>2nd, set outer data track options</p>
  <p>Visualization Type</p>
  
  <button type="button" id='out_highlight' disabled>Highlight</button>
  <button type="button" id='out_scatter' disabled>Scatter</button>
  <button type="button" id='out_line' disabled>Line</button>
  <button type="button" id='out_histogram' disabled>Histogram</button>
  <button type="button" id='out_tile' disabled>Tile</button>
  <button type="button" id='out_heat' disabled>Heat Map</button>
  <button type="button" id='out_text' disabled>Text Label</button>
  
  <div id="outdiv">
    
    <form id='form2_a' action="./PHP/Out/outhighlight.php" method='post'>
     
     <input type='file' name='outfile' id='outfile' class='outfile' disabled />
      <br>
      <input type='submit' disabled value='Upload' id='outsubmit'/>

      <div class='outprogress'>

        <div class='outbar'></div>
        <div class='outpercent'>0%</div>
        <div class='outstatus'></div>

      </div>
    </form>

    <form id="form2_a_1" action="" method="POST">
      <div id="form2_a_1div">

<!-------------------------         Fileter Settings Begin                      ------------>
    
    <p>Filter Greater Than:</p>
<!------------------Greater Than Filter Begin------------------>   
    <input type="text" value="1.0" name="ogreater" id="ogreter"><span>Greater Than</span><br>
    <button type="button" id="ogreshow">Show</button>
    <button type="button" id="ogrehide">Hide</button>
    <div id="ogreshape" class="oshadiv">
    <p>Shape:</p>    <input type="radio" name="ogreshowshape" value="circle"><span>Circle</span>
                     <input type="radio" name="ogreshowshape" value="rectangle"><span>Rectangle</span>
                     <input type="radio" name="ogreshowshape" value="triangle"><span>Triangle</span><br>
    </div>


<!--------------       Lower Than Filter Begin          ------------>
    <p>Filter Lower Than:</p>
    <input type="text" value="0" name="olower" id="olower"><span>Lower Than</span><br>
    <button type="button" id="olowshow">Show</button>
    <button type="button" id="olowhide">Hide</button>
    <div id="olowshape" class="oshadiv">
    <p>Shape:</p>    <input type="radio" name="olowshowshape" value="circle"><span>Circle</span>
                     <input type="radio" name="olowshowshape" value="rectangle"><span>Rectangle</span>
                     <input type="radio" name="olowshowshape" value="triangle"><span>Triangle</span><br>
    </div>

    <input type="text" id="outdata" name="outdata">

    <input type="submit" id="form2submit" value="OK">
    </form>
  </div>
    
<div id="form3bchoice">
<form id="form2_a_1_b" action="" method="POST">
 <p>please define the range to show</p>
 <input type="text" value="0" name="omax" id="omax"><span>Max</span><br>
 <input type="text" value="999999" name="omin" id="omin"><span>Min</span><br>
 <input type="text" id="outdatab" name="outdatab"><br>
 <input type="submit" id="form2bsubmit" value="OK">
</form>
</div>

<div id="inproceed"></div>
<!----the -- second -- form -- end -- here---->


<!--Whether or not open inner data visualization-->
<div id="innerdiv">
<p>Do you need to set inner data visualization?</p>
<button type="button" id="inyes">YES</button>
<button type="button" id="inno">NO</button>
</div>

<!--Determin what format to use-->
<div id="inlinksdiv">
<p class="infor">3rd, Are you going to use Links or other visualization formats?</p>
  <button class="infor" type="button" id="inlinks">Link</button>
  <button class="inother" type="button" id="inother">Other Types</button>
</div>

<!----Form 3a Inner Links Begins Here---->
<div id="form3adiv">

 <form id="form3a" action="../PHP/In/Link/link.php" method="POST">
      
      <input type='file' name='inlinfile' id='inlinfile' class='inlinfile'/>
        <br>
      <input type='submit' disabled value='Upload' id='inlinsubmit'/>

      <div class='inlinprogress'>

        <div class='inlinbar'></div>
        <div class='inlinpercent'>0%</div>
        <div class='inlinstatus'></div>

      </div>

</form>

</div>
<div id="ltodraw"></div>
<!--end of div id="form3adiv"-->

<!------------------------------------------------------------------------------------------------------------------------------------>
<!--job done, ready for visualizing-->
<div id="linkdone"></div>
<!------------------------------------------------------------------------------------------------------------------------------------>

<!----Form 3a Inner Links Ends Here---->

<!--Open Data Track 4-->
<div id="dt4div">
<p>Data Track <span id="dt4">4</span> Settings, do you want to use Data Track 4(YES/NO) or merge it with Data Track 5?</p>
<button type="button" id="dt4y">YES</button>
<button type="button" id="dt4n">NO</button>
<button type="button" id="dt4m">Merge</button>
</div>

<!----Form 3b Data Track 4th Starts Here---->
<div id="form3b4div">

  <div id="inother4choose">
  <p>Choose Visualization Type</p>
  
  <button type="button" id='inother4highlight'>Highlight</button>
  <button type="button" id='inother4scatter'>Scatter</button>
  <button type="button" id='inother4line'>Line</button>
  <button type="button" id='inother4histogram'>Histogram</button>
  <button type="button" id='inother4tile'>Tile</button>
  <button type="button" id='inother4heat'>Heat Map</button>
  <button type="button" id='inother4text'>Text Label</button>
  </div>

<form id="form3b4" action="" method="POST">
<input type='file' name='inother4file' id='inother4file' class='inother4file'/>
        <br>
      <input type='submit' disabled value='Upload' id='inother4submit'/>

      <div class='inother4progress'>

        <div class='inother4bar'></div>
        <div class='inother4percent'>0%</div>
        <div class='inother4status'></div>

      </div>
</form>

<!--Form 3b Data Track 4th Settings Begin Here-->

<!------------------------        Fileter Settings Begin                      ------------>
    <form id="form3b4s" action="" method="POST">

    <p>Filter Greater Than:</p>
<!------------------Greater Than Filter Begin------------------>   
    <input type="text" value="1.0" name="inother4greater" id="inother4greter"><span>Greater Than</span><br>
    <button type="button" id="inother4show">Show</button>
    <button type="button" id="inother4hide">Hide</button>
    <div id="inother4shape" class="inother4shadiv">
    <p>Shape:</p>    <input type="radio" name="inother4showshape" value="circle"><span>Circle</span>
                     <input type="radio" name="inother4showshape" value="rectangle"><span>Rectangle</span>
                     <input type="radio" name="inother4showshape" value="triangle"><span>Triangle</span><br>
    </div>


<!--------------       Lower Than Filter Begin          ------------>
    <p>Filter Lower Than:</p>
    <input type="text" value="0" name="inother4lower" id="inother4lower"><span>Lower Than</span><br>
    <button type="button" id="inother4lowshow">Show</button>
    <button type="button" id="inother4lowhide">Hide</button>
    <div id="inother4lowshape" class="inother4shadiv">
    <p>Shape:</p>    <input type="radio" name="inother4lowshowshape" value="circle"><span>Circle</span>
                     <input type="radio" name="inother4lowshowshape" value="rectangle"><span>Rectangle</span>
                     <input type="radio" name="inother4lowshowshape" value="triangle"><span>Triangle</span><br>
    </div>

    <input type="text" id="in4thdata" name="in4thdata">
    <input type="submit" id="form3b4ssubmit" value="OK">
    </form>

<div id="form4bchoice">
<form id="form3b4sb" action="" method="POST">
 <p>please define the range to show</p>
 <input type="text" value="0" name="in4max" id="in4max"><span>Max</span><br>
 <input type="text" value="999999" name="in4min" id="in4min"><span>Min</span><br>
 <input type="text" id="in4data" name="in4data"><br>
 <input type="submit" id="form3b4sasubmit" value="OK">
</form>
</div>

<!--Form 3b Data Track 4th Settings End Here-->
<div id="in4thdone"></div>
</div>


<!----Form 3b Data Track 4th Ends Here---->
<!--End Data Track 4-->

<!--Open Data Track 5-->
<div id="dt5div">
<p>Data Track <span id="dt5">5</span> Settings, do you want to use Data Track 5(YES/NO) or merge it with Data Track 6?</p>
<button type="button" id="dt5y">YES</button>
<button type="button" id="dt5n">NO</button>
<button type="button" id="dt5m">Merge</button>
</div>
<!----Form 3b Data Track 5th Starts Here---->
<div id="form3b5div">

<div id="inother5choose">
  <p>Choose Visualization Type</p>
  
  <button type="button" id='inother5highlight'>Highlight</button>
  <button type="button" id='inother5scatter'>Scatter</button>
  <button type="button" id='inother5line'>Line</button>
  <button type="button" id='inother5histogram'>Histogram</button>
  <button type="button" id='inother5tile'>Tile</button>
  <button type="button" id='inother5heat'>Heat Map</button>
  <button type="button" id='inother5text'>Text Label</button>
  </div>

<form id="form3b5" action="" method="POST">
<input type='file' name='inother5file' id='inother5file' class='inother5file'/>
        <br>
      <input type='submit' disabled value='Upload' id='inother5submit'/>

      <div class='inother5progress'>

        <div class='inother5bar'></div>
        <div class='inother5percent'>0%</div>
        <div class='inother5status'></div>

      </div>
</form>

<!--Form 3b Data Track 5th Settings Begin Here-->

<!------------------------        Fileter Settings Begin                      ------------>
    <form id="form3b5s" action="" method="POST">
      
    <p>Filter Greater Than:</p>
<!------------------Greater Than Filter Begin------------------>   
    <input type="text" value="1.0" name="inother5greater" id="inother5greter"><span>Greater Than</span><br>
    <button type="button" id="inother5show">Show</button>
    <button type="button" id="inother5hide">Hide</button>
    <div id="inother5shape" class="inother5div">
    <p>Shape:</p>    <input type="radio" name="inother5showshape" value="circle"><span>Circle</span>
                     <input type="radio" name="inother5showshape" value="rectangle"><span>Rectangle</span>
                     <input type="radio" name="inother5showshape" value="triangle"><span>Triangle</span><br>
    </div>


<!--------------       Lower Than Filter Begin          ------------>
    <p>Filter Lower Than:</p>
    <input type="text" value="0" name="inother5lower" id="inother5lower"><span>Lower Than</span><br>
    <button type="button" id="inother5lowshow">Show</button>
    <button type="button" id="inother5lowhide">Hide</button>
    <div id="inother5lowshape" class="inother5shadiv">
    <p>Shape:</p>    <input type="radio" name="inother5lowshowshape" value="circle"><span>Circle</span>
                     <input type="radio" name="inother5lowshowshape" value="rectangle"><span>Rectangle</span>
                     <input type="radio" name="inother5lowshowshape" value="triangle"><span>Triangle</span><br>
    </div>

    <input type="text" id="in5thdata" name="in5thdata">
    <input type="submit" id="form3b5ssubmit" value="OK">
    </form>
<!--Form 3b Data Track 5th Settings End Here-->
<div id="form5bchoice">
<form id="form3b5sb" action="" method="POST">
 <p>please define the range to show</p>
 <input type="text" value="0" name="in5max" id="in5max"><span>Max</span><br>
 <input type="text" value="999999" name="in5min" id="in5min"><span>Min</span><br>
 <input type="text" id="in5data" name="in5data"><br>
 <input type="submit" id="form3b5sasubmit" value="OK">
</form>
</div>
</div>

<!----Form 3b Data Track 5th Ends Here---->
<!--End Data Track 5-->

<!--Open Data Track 6-->
<div id="dt6div">
<p>Data Track <span id="dt6">6</span> Settings, do you want to use Data Track 6(YES/NO) or merge it with Data Track 7?</p>
<button type="button" id="dt6y">YES</button>
<button type="button" id="dt6n">NO</button>
<button type="button" id="dt6m">Merge</button>

<!----Form 3b Data Track 6th Starts Here---->
<div id="form3b6div">

<div id="inother6choose">
  <p>Choose Visualization Type</p>
  
  <button type="button" id='inother6highlight'>Highlight</button>
  <button type="button" id='inother6scatter'>Scatter</button>
  <button type="button" id='inother6line'>Line</button>
  <button type="button" id='inother6histogram'>Histogram</button>
  <button type="button" id='inother6tile'>Tile</button>
  <button type="button" id='inother6heat'>Heat Map</button>
  <button type="button" id='inother6text'>Text Label</button>
  </div>

<form id="form3b6" action="" method="POST">
<input type='file' name='inother6file' id='inother6file' class='inother6file'/>
        <br>
      <input type='submit' disabled value='Upload' id='inother6submit'/>

      <div class='inother6progress'>

        <div class='inother6bar'></div>
        <div class='inother6percent'>0%</div>
        <div class='inother6status'></div>

      </div>
</form>

<!--Form 3b Data Track 6th Settings Begin Here-->

<!------------------------        Fileter Settings Begin                      ------------>
    <form id="form3b6s" action="" method="POST">
      
    <p>Filter Greater Than:</p>
<!------------------Greater Than Filter Begin------------------>   
    <input type="text" value="1.0" name="inother6greater" id="inother6greter"><span>Greater Than</span><br>
    <button type="button" id="inother6show">Show</button>
    <button type="button" id="inother6hide">Hide</button>
    <div id="inother6shape" class="inother6div">
    <p>Shape:</p>    <input type="radio" name="inother6showshape" value="circle"><span>Circle</span>
                     <input type="radio" name="inother6showshape" value="rectangle"><span>Rectangle</span>
                     <input type="radio" name="inother6showshape" value="triangle"><span>Triangle</span><br>
    </div>


<!--------------       Lower Than Filter Begin          ------------>
    <p>Filter Lower Than:</p>
    <input type="text" value="0" name="inother6lower" id="inother6lower"><span>Lower Than</span><br>
    <button type="button" id="inother6lowshow">Show</button>
    <button type="button" id="inother6lowhide">Hide</button>
    <div id="inother6lowshape" class="inother6shadiv">
    <p>Shape:</p>    <input type="radio" name="inother6lowshowshape" value="circle"><span>Circle</span>
                     <input type="radio" name="inother6lowshowshape" value="rectangle"><span>Rectangle</span>
                     <input type="radio" name="inother6lowshowshape" value="triangle"><span>Triangle</span><br>
    </div>

    <input type="text" id="in6thdata" name="in6thdata">
    <input type="submit" id="form3b6ssubmit" value="OK">
    </form>
<!--Form 3b Data Track 6th Settings End Here-->
</div>
<!----Form 3b Data Track 6th Ends Here---->
<div id="form6bchoice">
<form id="form3b6sb" action="" method="POST">
 <p>please define the range to show</p>
 <input type="text" value="0" name="in6max" id="in6max"><span>Max</span><br>
 <input type="text" value="999999" name="in6min" id="in6min"><span>Min</span><br>
 <input type="text" id="in6data" name="in6data"><br>
 <input type="submit" id="form3b6sasubmit" value="OK">
</form>
</div>

</div>
<!--End Data Track 6-->

<!--Open Data Track 7-->
<div id="dt7div">
<p>Data Track <span id="dt7">7</span> Settings, do you want to use Data Track 7(YES/NO) or merge it with Data Track 8?</p>
<button type="button" id="dt7y">YES</button>
<button type="button" id="dt7n">NO</button>
<button type="button" id="dt7m">Merge</button>

<!----Form 3b Data Track 7th Starts Here---->
<div id="form3b7div">

<div id="inother7choose">
  <p>Choose Visualization Type</p>
  
  <button type="button" id='inother7highlight'>Highlight</button>
  <button type="button" id='inother7scatter'>Scatter</button>
  <button type="button" id='inother7line'>Line</button>
  <button type="button" id='inother7histogram'>Histogram</button>
  <button type="button" id='inother7tile'>Tile</button>
  <button type="button" id='inother7heat'>Heat Map</button>
  <button type="button" id='inother7text'>Text Label</button>
  </div>

<form id="form3b7" action="" method="POST">
<input type='file' name='inother7file' id='inother7file' class='inother7file'/>
        <br>
      <input type='submit' disabled value='Upload' id='inother7submit'/>

      <div class='inother7progress'>

        <div class='inother7bar'></div>
        <div class='inother7percent'>0%</div>
        <div class='inother7status'></div>

      </div>
</form>

<!--Form 3b Data Track 7th Settings Begin Here-->

<!------------------------        Fileter Settings Begin                      ------------>
    <form id="form3b7s" action="" method="POST">
      
    <p>Filter Greater Than:</p>
<!------------------Greater Than Filter Begin------------------>   
    <input type="text" value="1.0" name="inother7greater" id="inother7greter"><span>Greater Than</span><br>
    <button type="button" id="inother7show">Show</button>
    <button type="button" id="inother7hide">Hide</button>
    <div id="inother7shape" class="inother7div">
    <p>Shape:</p>    <input type="radio" name="inother7showshape" value="circle"><span>Circle</span>
                     <input type="radio" name="inother7showshape" value="rectangle"><span>Rectangle</span>
                     <input type="radio" name="inother7showshape" value="triangle"><span>Triangle</span><br>
    </div>


<!--------------       Lower Than Filter Begin          ------------>
    <p>Filter Lower Than:</p>
    <input type="text" value="0" name="inother7lower" id="inother7lower"><span>Lower Than</span><br>
    <button type="button" id="inother7lowshow">Show</button>
    <button type="button" id="inother7lowhide">Hide</button>
    <div id="inother7lowshape" class="inother7shadiv">
    <p>Shape:</p>    <input type="radio" name="inother7lowshowshape" value="circle"><span>Circle</span>
                     <input type="radio" name="inother7lowshowshape" value="rectangle"><span>Rectangle</span>
                     <input type="radio" name="inother7lowshowshape" value="triangle"><span>Triangle</span><br>
    </div>

    <input type="text" id="in7thdata" name="in7thdata">

    <input type="submit" id="form3b7ssubmit" value="OK">
    </form>
<!--Form 3b Data Track 7th Settings End Here-->
</div>
<!----Form 3b Data Track 7th Ends Here---->
<div id="form7bchoice">
<form id="form3b7sb" action="" method="POST">
 <p>please define the range to show</p>
 <input type="text" value="0" name="in7max" id="in7max"><span>Max</span><br>
 <input type="text" value="999999" name="in7min" id="in7min"><span>Min</span><br>
 <input type="text" id="in7data" name="in7data"><br>
 <input type="submit" id="form3b7sasubmit" value="OK">
</form>
</div>
</div>
<!--End Data Track 7-->

<!--Open Data Track 8-->
<div id="dt8div">
<p>Data Track <span id="dt8">8</span> Settings, do you want to use Data Track 8(YES/NO) or merge it with Data Track 9?</p>
<button type="button" id="dt8y">YES</button>
<button type="button" id="dt8n">NO</button>
<button type="button" id="dt8m">Merge</button>
<!----Form 3b Data Track 8th Starts Here---->
<div id="form3b8div">

<div id="inother8choose">
  <p>Choose Visualization Type</p>
  
  <button type="button" id='inother8highlight'>Highlight</button>
  <button type="button" id='inother8scatter'>Scatter</button>
  <button type="button" id='inother8line'>Line</button>
  <button type="button" id='inother8histogram'>Histogram</button>
  <button type="button" id='inother8tile'>Tile</button>
  <button type="button" id='inother8heat'>Heat Map</button>
  <button type="button" id='inother8text'>Text Label</button>
  </div>

<form id="form3b8" action="" method="POST">
<input type='file' name='inother8file' id='inother8file' class='inother8file'/>
        <br>
      <input type='submit' disabled value='Upload' id='inother8submit'/>

      <div class='inother8progress'>

        <div class='inother8bar'></div>
        <div class='inother8percent'>0%</div>
        <div class='inother8status'></div>

      </div>
</form>

<!--Form 3b Data Track 8th Settings Begin Here-->

<!------------------------        Fileter Settings Begin                      ------------>
    <form id="form3b8s" action="" method="POST">
      
    <p>Filter Greater Than:</p>
<!------------------Greater Than Filter Begin------------------>   
    <input type="text" value="1.0" name="inother8greater" id="inother8greter"><span>Greater Than</span><br>
    <button type="button" id="inother8show">Show</button>
    <button type="button" id="inother8hide">Hide</button>
    <div id="inother8shape" class="inother8div">
    <p>Shape:</p>    <input type="radio" name="inother8showshape" value="circle"><span>Circle</span>
                     <input type="radio" name="inother8showshape" value="rectangle"><span>Rectangle</span>
                     <input type="radio" name="inother8showshape" value="triangle"><span>Triangle</span><br>
    </div>


<!--------------       Lower Than Filter Begin          ------------>
    <p>Filter Lower Than:</p>
    <input type="text" value="0" name="inother8lower" id="inother8lower"><span>Lower Than</span><br>
    <button type="button" id="inother8lowshow">Show</button>
    <button type="button" id="inother8lowhide">Hide</button>
    <div id="inother8lowshape" class="inother8shadiv">
    <p>Shape:</p>    <input type="radio" name="inother8lowshowshape" value="circle"><span>Circle</span>
                     <input type="radio" name="inother8lowshowshape" value="rectangle"><span>Rectangle</span>
                     <input type="radio" name="inother8lowshowshape" value="triangle"><span>Triangle</span><br>
    </div>
    
    <!-------------------------------------------------------------------------------------->
    <input type="text" id="in8thdata" name="in8thdata">
    <!-------------------------------------------------------------------------------------->
    <input type="submit" id="form3b8ssubmit" value="OK">
    </form>
<!--Form 3b Data Track 8th Settings End Here-->
</div>
<!----Form 3b Data Track 8th Ends Here---->
<div id="form8bchoice">
<form id="form3b8sb" action="" method="POST">
 <p>please define the range to show</p>
 <input type="text" value="0" name="in8max" id="in8max"><span>Max</span><br>
 <input type="text" value="999999" name="in8min" id="in8min"><span>Min</span><br>
 <input type="text" id="in8data" name="in8data"><br>
 <input type="submit" id="form3b8sasubmit" value="OK">
</form>
</div>
</div>
<!--End Data Track 8-->

<!--Open Data Track 9-->
<div id="dt9div">
<p>Data Track <span id="dt9">9</span> Settings, do you want to use Data Track 9(YES/NO)?</p>
<button type="button" id="dt9y">YES</button>
<button type="button" id="dt9n">NO</button>
<!----Form 3b Data Track 9th Starts Here---->
<div id="form3b9div">

<div id="inother9choose">
  <p>Choose Visualization Type</p>
  
  <button type="button" id='inother9highlight'>Highlight</button>
  <button type="button" id='inother9scatter'>Scatter</button>
  <button type="button" id='inother9line'>Line</button>
  <button type="button" id='inother9histogram'>Histogram</button>
  <button type="button" id='inother9tile'>Tile</button>
  <button type="button" id='inother9heat'>Heat Map</button>
  <button type="button" id='inother9text'>Text Label</button>
  </div>

<form id="form3b9" action="" method="POST">
<input type='file' name='inother9file' id='inother9file' class='inother9file'/>
        <br>
      <input type='submit' disabled value='Upload' id='inother9submit'/>

      <div class='inother9progress'>

        <div class='inother9bar'></div>
        <div class='inother9percent'>0%</div>
        <div class='inother9status'></div>

      </div>
</form>

<!--Form 3b Data Track 9th Settings Begin Here-->

<!------------------------        Fileter Settings Begin                      ------------>
    <form id="form3b9s" action="" method="POST">
      
    <p>Filter Greater Than:</p>
<!------------------Greater Than Filter Begin------------------>   
    <input type="text" value="1.0" name="inother9greater" id="inother9greter"><span>Greater Than</span><br>
    <button type="button" id="inother9show">Show</button>
    <button type="button" id="inother9hide">Hide</button>
    <div id="inother9shape" class="inother9div">
    <p>Shape:</p>    <input type="radio" name="inother9showshape" value="circle"><span>Circle</span>
                     <input type="radio" name="inother9showshape" value="rectangle"><span>Rectangle</span>
                     <input type="radio" name="inother9showshape" value="triangle"><span>Triangle</span><br>
    </div>


<!--------------       Lower Than Filter Begin          ------------>
    <p>Filter Lower Than:</p>
    <input type="text" value="0" name="inother9lower" id="inother9lower"><span>Lower Than</span><br>
    <button type="button" id="inother9lowshow">Show</button>
    <button type="button" id="inother9lowhide">Hide</button>
    <div id="inother9lowshape" class="inother9shadiv">
    <p>Shape:</p>    <input type="radio" name="inother9lowshowshape" value="circle"><span>Circle</span>
                     <input type="radio" name="inother9lowshowshape" value="rectangle"><span>Rectangle</span>
                     <input type="radio" name="inother9lowshowshape" value="triangle"><span>Triangle</span><br>
    </div>

    <input type="text" id="in9thdata" name="in9thdata">


    <input type="submit" id="form3b9ssubmit" value="OK">
    </form>
<!--Form 3b Data Track 9th Settings End Here-->
</div>
<!----Form 3b Data Track 9th Ends Here---->
<div id="form9bchoice">
<form id="form3b9sb" action="" method="POST">
 <p>please define the range to show</p>
 <input type="text" value="0" name="in9max" id="in9max"><span>Max</span><br>
 <input type="text" value="999999" name="in9min" id="in9min"><span>Min</span><br>
 <input type="text" id="in9data" name="in9data"><br>
 <input type="submit" id="form3b9sasubmit" value="OK">
</form>
</div>

</div>
<!--End Data Track 9-->

<!--This one here serves for sending indicator information-->
<form id="indiform" name="indiform" method="POST" action="">
    <input type="text" id="indicator" name="indicator">
</form>

</body>

</html>

