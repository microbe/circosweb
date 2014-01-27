#!usr/bin/perl 

#received patameters:
@parameters=("","<<include colors_fonts_patterns.conf>>","","<fonts>","<<include etc/fonts.conf>>",
          "</fonts>","<<include ticks.conf>>","<<include ideogram.conf>>",
          "Karyotype= ../parameters/Karyotype_File","chromosomes_display_default=no",
          "<image>","<<include etc/image.conf>>","</image>",
          "chromosomes_units=1000000","chromosomes=hs1,hs2","chromosomes_radius=rn1:0.8r;rn2:0.8r;rn3:0.8r",
          "<<include etc/housekeeping.conf>>");

#ticks settings:
@ticks_m=("show_ticks=yes","show_tick_labels=yes","<ticks>","radius=dims(ideogram,radius_outer)",
	      "multiplier=1/1u","label_offset=0.05r","color=black",
	      "thickness=2p","show_label=yes","<tick>","spacing=20u",
	      "size=10p","label_size=15p","format=%d",
	      "suffix=Mb","label_offset=30p","</tick>","</ticks>");
#insert a judgement to change if necssary, spacing=0.1u,suffix=kb

#ideogram——conf settings:
@ideogram_conf=("<ideogram>","<spacing>",
                "default=0.02r",#<pairwise rn1,rn2>spacing=0.02r</pairwise>,
	            "</spacing>","radius=0.8r","thickness=0.1r","fill=yes",
	            "fill_color=red","stroke_thickness=0.02r","stroke_color=51,204,9",
	            "show_label=yes","label_font=bold","label_radius=dims(ideogram,radius)+0.15r",
	            "label_color=red","label_with_tag=no","label_size=30",
	            "label_parallel=yes","show_bands=yes","fill_bands=yes",
	            "band_stroke_thickness=2","band_stroke_color=white","band_transparency=4",                       
              #dynamic zooms settings<zooms><zoom>chr=hs1start=100uend=120uscale=2</zoom></zooms>,
	            "</ideogram>");

#program to know if outer space is desired, if so, push label further and set font smaller.

#programs:
##########################1st--choose chrosomes############################
#open resource file
open(RAW,"../Resource/Ideogram/ideochoose.txt");
$raw=<RAW>;
#convert to array
@raw=split(/,/,$raw);
#process array to desired format
$rawlen=@raw;
for ($i=0;$i<$rawlen;$i++)
{
	@raw[$i]=~ s/\s(.*)\s(.*)/$1/;
}
#further process array to fit circos format
$postraw=join ",",@raw;
$fit="chromosomes=".$postraw;
#insert to parameters
@parameters[14]=$fit;

############################2nd--radius########################
#open resource file
open(RAD,"../Resource/Ideogram/radius.txt");
$rad=<RAD>;
#convert to array
@rad=split(/,/,$rad);
#process array to desired format
@newrad=@raw;
$i=0;
for ($i=0;$i<$rawlen;$i++)
{
	@newrad[$i]=@newrad[$i].":".@rad[$i]."r";
}
#further process array to fit circos format
$postrad=join ";",@newrad;
$fitrad="chromosomes_radius=".$postrad;
#insert to parameters
@parameters[15]=$fitrad;

############################3rd--ticks########################
#open resource file and process
open(TIC,"../Resource/Ideogram/ticks.txt");
$tic=<TIC>;
if ($tic=~ m/bacteria/)
{
	@ticks_m[10]="spacing=0.1u";
	@ticks_m[14]="suffix=Kb";
} elsif ($tic=~ m/higher/)
   {
    @ticks_m[10]="spacing=20u";
    @ticks_m[14]="suffix=Mb";
   }

############################4th--zooms########################
#open resource file and process
open(ZOO,"../Resource/Ideogram/zooms.txt");
$zoo=<ZOO>;
@zoo=split(/,/,$zoo);

#create a new array to store formatted data
#housekeeping settings
$zooms="<zooms>";
$zsend="</zooms>";
$zoom="<zoom>";
$zend="</zoom>";
@newzoom=[];
push @newzoom,$zooms;

$i=0;
for ($i=0;$i<$rawlen;$i++)
{
  $pzch="chr=".@raw[$i];
  $j=3*$i;
  $scale=@zoo[$j];
  $start=@zoo[$j+1];
  $end=@zoo[$j+2];
  $scale="scale=".$scale;
  $start=$start/1000000;
  $start="start=".$start."u";
  $end=$end/1000000;
  $end="end=".$end."u";

  push @newzoom,$zoom;
  push @newzoom,$pzch;
  push @newzoom,$start;
  push @newzoom,$end;
  push @newzoom,$zend;

}
push @newzoom,$zsend;
#remove the first element in array:@newzoom
splice(@newzoom,0,1);
#write to ideogram_conf
$currentideolen=@ideogram_conf;
$insertideo=$currentideolen-2;
splice @ideogram_conf,$insertideo,0,@newzoom;

############################5th--spacings########################
#open resource file and process
open(SPA,"../Resource/Ideogram/spacings.txt");
$spa=<SPA>;
@spa=split(/,/,$spa);
#create a new array to store formatted data
#housekeeping settings
$pairwise="</pairwise>";

@newspa=[];

$i=0;
for ($i=0;$i<$rawlen-1;$i++)
{
  $pairs="<pairwise"." ".@raw[$i].",".@raw[$i+1].">";
  $spacing="spacing=".@spa[$i]."r";

  push @newspa,$pairs;
  push @newspa,$spacing;
  push @newspa,$pairwise;

}
  $endpairs="<pairwise"." ".@raw[$rawlen-1].",".@raw[0].">";
  $endspacing="spacing=".@spa[$rawlen-1]."r";
  push @newspa,$endpairs;
  push @newspa,$endspacing;
  push @newspa,$pairwise;

#remove the first element in newspa array
splice @newspa,0,1;

#write to ideogram_conf
splice @ideogram_conf,3,0,@newspa;

############################6th--outer & inner settings########################
#settings for links
@link=("<links>","<link>","ribbon=yes","twist=yes","thickness=2","stroke_color=dgrey","stroke_thickness=2","file=../Resource/In/Link/link.txt","radius=0.98r","crest=1","color=red","bezier_radius=0r","</link>","</links>");

#resevered for the location information, based on highlight
@location=("1.01","1.04",
           "0.99","0.87",
           "0.86","0.74",
           "0.73","0.61",
           "0.60","0.48",
           "0.47","0.35",
           "0.34","0.22");
#parameters for highlight:
@highlight3=("<highlight>","file=../Resource/Out/outhighlight.txt","r0=1.01r","r1=1.04r","</highlight>");
@highlight4=("<highlight>","file=../Resource/In/4th/inhighlight.txt","r0=0.99r","r1=0.87r","</highlight>");
@highlight5=("<highlight>","file=../Resource/In/5th/inhighlight.txt","r0=0.86r","r1=0.74r","</highlight>");
@highlight6=("<highlight>","file=../Resource/In/6th/inhighlight.txt","r0=0.73r","r1=0.61r","</highlight>");
@highlight7=("<highlight>","file=../Resource/In/7th/inhighlight.txt","r0=0.60r","r1=0.48r","</highlight>");
@highlight8=("<highlight>","file=../Resource/In/8th/inhighlight.txt","r0=0.47r","r1=0.35r","</highlight>");
@highlight9=("<highlight>","file=../Resource/In/9th/inhighlight.txt","r0=0.34r","r1=0.22r","</highlight>");
@highlight=("<highlights>","</highlights>");
#plots
@plot=("<plots>","</plots>");

#scatters:
@scatter3=("<plot>","type=scatter","stroke_thickness=1","file=../Resource/Out/outscatter.txt","fill_color=red","stroke_color=red","glyph_size=10","max=1","min=0","r0=1.01r","r1=1.04r","<axes>","<axis>","color=green","thickness=1","spacing=0.1r","</axis>","</axes>","<rules>","<rule>","condition=var(value)<1","show=yes","glyph=circle","</rule>","<rule>","condition=var(value)>0","show=yes","glyph=circle","</rule>","</rules>","</plot>");
@scatter4=("<plot>","type=scatter","stroke_thickness=1","file=../Resource/In/4th/inscatter.txt","fill_color=red","stroke_color=red","glyph_size=10","max=1","min=0","r0=0.99r","r1=0.87r","<axes>","<axis>","color=vlgreen","thickness=1","spacing=0.05r","</axis>","<axis>","color=lgreen","thickness=2","spacing=0.1r","</axis>","<axis>","color=lred","thickness=2","spacing=1r","</axis>","</axes>","<rules>","<rule>","condition=var(value)<1","show=yes","glyph=circle","</rule>","<rule>","condition=var(value)>0","show=yes","glyph=circle","</rule>","</rules>","</plot>");
@scatter5=("<plot>","type=scatter","stroke_thickness=1","file=../Resource/In/5th/inscatter.txt","fill_color=red","stroke_color=red","glyph_size=10","max=1","min=0","r0=0.86r","r1=0.74r","<axes>","<axis>","color=vlgreen","thickness=1","spacing=0.05r","</axis>","<axis>","color=lgreen","thickness=2","spacing=0.1r","</axis>","<axis>","color=lred","thickness=2","spacing=1r","</axis>","</axes>","<rules>","<rule>","condition=var(value)<1","show=yes","glyph=circle","</rule>","<rule>","condition=var(value)>0","show=yes","glyph=circle","</rule>","</rules>","</plot>");
@scatter6=("<plot>","type=scatter","stroke_thickness=1","file=../Resource/In/6th/inscatter.txt","fill_color=red","stroke_color=red","glyph_size=10","max=1","min=0","r0=0.73r","r1=0.61r","<axes>","<axis>","color=vlgreen","thickness=1","spacing=0.05r","</axis>","<axis>","color=lgreen","thickness=2","spacing=0.1r","</axis>","<axis>","color=lred","thickness=2","spacing=1r","</axis>","</axes>","<rules>","<rule>","condition=var(value)<1","show=yes","glyph=circle","</rule>","<rule>","condition=var(value)>0","show=yes","glyph=circle","</rule>","</rules>","</plot>");
@scatter7=("<plot>","type=scatter","stroke_thickness=1","file=../Resource/In/7th/inscatter.txt","fill_color=red","stroke_color=red","glyph_size=10","max=1","min=0","r0=0.60r","r1=0.48r","<axes>","<axis>","color=vlgreen","thickness=1","spacing=0.05r","</axis>","<axis>","color=lgreen","thickness=2","spacing=0.1r","</axis>","<axis>","color=lred","thickness=2","spacing=1r","</axis>","</axes>","<rules>","<rule>","condition=var(value)<1","show=yes","glyph=circle","</rule>","<rule>","condition=var(value)>0","show=yes","glyph=circle","</rule>","</rules>","</plot>");
@scatter8=("<plot>","type=scatter","stroke_thickness=1","file=../Resource/In/8th/inscatter.txt","fill_color=red","stroke_color=red","glyph_size=10","max=1","min=0","r0=0.47r","r1=0.35r","<axes>","<axis>","color=vlgreen","thickness=1","spacing=0.05r","</axis>","<axis>","color=lgreen","thickness=2","spacing=0.1r","</axis>","<axis>","color=lred","thickness=2","spacing=1r","</axis>","</axes>","<rules>","<rule>","condition=var(value)<1","show=yes","glyph=circle","</rule>","<rule>","condition=var(value)>0","show=yes","glyph=circle","</rule>","</rules>","</plot>");
@scatter9=("<plot>","type=scatter","stroke_thickness=1","file=../Resource/In/9th/inscatter.txt","fill_color=red","stroke_color=red","glyph_size=10","max=1","min=0","r0=0.34r","r1=0.22r","<axes>","<axis>","color=vlgreen","thickness=1","spacing=0.05r","</axis>","<axis>","color=lgreen","thickness=2","spacing=0.1r","</axis>","<axis>","color=lred","thickness=2","spacing=1r","</axis>","</axes>","<rules>","<rule>","condition=var(value)<1","show=yes","glyph=circle","</rule>","<rule>","condition=var(value)>0","show=yes","glyph=circle","</rule>","</rules>","</plot>");

#lines:
@line3=("<plot>","type=line","thickness=1","file=../Resource/Out/outline.txt","fill_color=red","max=1","min=0","r0=1.01r","r1=1.04r","<axes>","<axis>","color=green","thickness=1","spacing=0.1r","</axis>","</axes>","<rules>","<rule>","condition=var(value)<1","show=yes","</rule>","<rule>","condition=var(value)>0","show=yes","</rule>","</rules>","</plot>");
@line4=("<plot>","type=line","thickness=1","file=../Resource/In/4th/inline.txt","fill_color=red","max=1","min=0","r0=0.99r","r1=0.87r","<axes>","<axis>","color=vlgreen","thickness=1","spacing=0.05r","</axis>","<axis>","color=lgreen","thickness=2","spacing=0.1r","</axis>","<axis>","color=lred","thickness=2","spacing=1r","</axis>","</axes>","<rules>","<rule>","condition=var(value)<1","show=yes","</rule>","<rule>","condition=var(value)>0","show=yes","</rule>","</rules>","</plot>");
@line5=("<plot>","type=line","thickness=1","file=../Resource/In/5th/inline.txt","fill_color=red","max=1","min=0","r0=0.86r","r1=0.74r","<axes>","<axis>","color=vlgreen","thickness=1","spacing=0.05r","</axis>","<axis>","color=lgreen","thickness=2","spacing=0.1r","</axis>","<axis>","color=lred","thickness=2","spacing=1r","</axis>","</axes>","<rules>","<rule>","condition=var(value)<1","show=yes","</rule>","<rule>","condition=var(value)>0","show=yes","</rule>","</rules>","</plot>");
@line6=("<plot>","type=line","thickness=1","file=../Resource/In/6th/inline.txt","fill_color=red","max=1","min=0","r0=0.73r","r1=0.61r","<axes>","<axis>","color=vlgreen","thickness=1","spacing=0.05r","</axis>","<axis>","color=lgreen","thickness=2","spacing=0.1r","</axis>","<axis>","color=lred","thickness=2","spacing=1r","</axis>","</axes>","<rules>","<rule>","condition=var(value)<1","show=yes","</rule>","<rule>","condition=var(value)>0","show=yes","</rule>","</rules>","</plot>");
@line7=("<plot>","type=line","thickness=1","file=../Resource/In/7th/inline.txt","fill_color=red","max=1","min=0","r0=0.60r","r1=0.48r","<axes>","<axis>","color=vlgreen","thickness=1","spacing=0.05r","</axis>","<axis>","color=lgreen","thickness=2","spacing=0.1r","</axis>","<axis>","color=lred","thickness=2","spacing=1r","</axis>","</axes>","<rules>","<rule>","condition=var(value)<1","show=yes","</rule>","<rule>","condition=var(value)>0","show=yes","</rule>","</rules>","</plot>");
@line8=("<plot>","type=line","thickness=1","file=../Resource/In/8th/inline.txt","fill_color=red","max=1","min=0","r0=0.47r","r1=0.35r","<axes>","<axis>","color=vlgreen","thickness=1","spacing=0.05r","</axis>","<axis>","color=lgreen","thickness=2","spacing=0.1r","</axis>","<axis>","color=lred","thickness=2","spacing=1r","</axis>","</axes>","<rules>","<rule>","condition=var(value)<1","show=yes","</rule>","<rule>","condition=var(value)>0","show=yes","</rule>","</rules>","</plot>");
@line9=("<plot>","type=line","thickness=1","file=../Resource/In/9th/inline.txt","fill_color=red","max=1","min=0","r0=0.34r","r1=0.22r","<axes>","<axis>","color=vlgreen","thickness=1","spacing=0.05r","</axis>","<axis>","color=lgreen","thickness=2","spacing=0.1r","</axis>","<axis>","color=lred","thickness=2","spacing=1r","</axis>","</axes>","<rules>","<rule>","condition=var(value)<1","show=yes","</rule>","<rule>","condition=var(value)>0","show=yes","</rule>","</rules>","</plot>");
#histograms:
@histogram3=("<plot>","type=histogram","thickness=1","file=../Resource/Out/outhistogram.txt","color=red","max=1","min=0","r0=1.01r","r1=1.04r","<axes>","<axis>","color=green","thickness=1","spacing=0.1r","</axis>","</axes>","<rules>","<rule>","condition=var(value)<1","show=yes","</rule>","<rule>","condition=var(value)>0","show=yes","</rule>","</rules>","</plot>");
@histogram4=("<plot>","type=histogram","thickness=1","file=../Resource/In/4th/inhistogram.txt","color=red","max=1","min=0","r0=0.99r","r1=0.87r","<axes>","<axis>","color=vlgreen","thickness=1","spacing=0.05r","</axis>","<axis>","color=lgreen","thickness=2","spacing=0.1r","</axis>","<axis>","color=lred","thickness=2","spacing=1r","</axis>","</axes>","<rules>","<rule>","condition=var(value)<1","show=yes","</rule>","<rule>","condition=var(value)>0","show=yes","</rule>","</rules>","</plot>");
@histogram5=("<plot>","type=histogram","thickness=1","file=../Resource/In/5th/inhistogram.txt","color=red","max=1","min=0","r0=0.86r","r1=0.74r","<axes>","<axis>","color=vlgreen","thickness=1","spacing=0.05r","</axis>","<axis>","color=lgreen","thickness=2","spacing=0.1r","</axis>","<axis>","color=lred","thickness=2","spacing=1r","</axis>","</axes>","<rules>","<rule>","condition=var(value)<1","show=yes","</rule>","<rule>","condition=var(value)>0","show=yes","</rule>","</rules>","</plot>");
@histogram6=("<plot>","type=histogram","thickness=1","file=../Resource/In/6th/inhistogram.txt","color=red","max=1","min=0","r0=0.73r","r1=0.61r","<axes>","<axis>","color=vlgreen","thickness=1","spacing=0.05r","</axis>","<axis>","color=lgreen","thickness=2","spacing=0.1r","</axis>","<axis>","color=lred","thickness=2","spacing=1r","</axis>","</axes>","<rules>","<rule>","condition=var(value)<1","show=yes","</rule>","<rule>","condition=var(value)>0","show=yes","</rule>","</rules>","</plot>");
@histogram7=("<plot>","type=histogram","thickness=1","file=../Resource/In/7th/inhistogram.txt","color=red","max=1","min=0","r0=0.60r","r1=0.48r","<axes>","<axis>","color=vlgreen","thickness=1","spacing=0.05r","</axis>","<axis>","color=lgreen","thickness=2","spacing=0.1r","</axis>","<axis>","color=lred","thickness=2","spacing=1r","</axis>","</axes>","<rules>","<rule>","condition=var(value)<1","show=yes","</rule>","<rule>","condition=var(value)>0","show=yes","</rule>","</rules>","</plot>");
@histogram8=("<plot>","type=histogram","thickness=1","file=../Resource/In/8th/inhistogram.txt","color=red","max=1","min=0","r0=0.47r","r1=0.35r","<axes>","<axis>","color=vlgreen","thickness=1","spacing=0.05r","</axis>","<axis>","color=lgreen","thickness=2","spacing=0.1r","</axis>","<axis>","color=lred","thickness=2","spacing=1r","</axis>","</axes>","<rules>","<rule>","condition=var(value)<1","show=yes","</rule>","<rule>","condition=var(value)>0","show=yes","</rule>","</rules>","</plot>");
@histogram9=("<plot>","type=histogram","thickness=1","file=../Resource/In/9th/inhistogram.txt","color=red","max=1","min=0","r0=0.34r","r1=0.22r","<axes>","<axis>","color=vlgreen","thickness=1","spacing=0.05r","</axis>","<axis>","color=lgreen","thickness=2","spacing=0.1r","</axis>","<axis>","color=lred","thickness=2","spacing=1r","</axis>","</axes>","<rules>","<rule>","condition=var(value)<1","show=yes","</rule>","<rule>","condition=var(value)>0","show=yes","</rule>","</rules>","</plot>");
#tile
@tile=("<highlights>","<highlight>","file=../Resource/Out/outhighlight.txt","r0=1.01r","r1=1.04r","</highlight>",
                           "<highlight>","file=../Resource/In/4th/inhighlight.txt","r0=0.99r","r1=0.87r","</highlight>",
                           "<highlight>","file=../Resource/In/5th/inhighlight.txt","r0=0.86r","r1=0.74r","</highlight>",
                           "<highlight>","file=../Resource/In/6th/inhighlight.txt","r0=0.73r","r1=0.61r","</highlight>",
                           "<highlight>","file=../Resource/In/7th/inhighlight.txt","r0=0.60r","r1=0.48r","</highlight>",
                           "<highlight>","file=../Resource/In/8th/inhighlight.txt","r0=0.47r","r1=0.35r","</highlight>",
                           "<highlight>","file=../Resource/In/9th/inhighlight.txt","r0=0.34r","r1=0.22r","</highlight>",
            "</highlights>");
#6
#heatmaps:
@heatmap3=("<plot>","type=heatmap","stroke_thickness=1","file=../Resource/Out/outheatmap.txt","stroke_color=red","max=999999","min=0","r0=1.01r","r1=1.04r","<axes>","<axis>","stroke_color=green","stroke_thickness=1","spacing=0.1r","</axis>","</axes>","</plot>");
@heatmap4=("<plot>","type=heatmap","stroke_thickness=1","file=../Resource/In/4th/inheatmap.txt","stroke_color=red","max=999999","min=0","r0=0.99r","r1=0.87r","<axes>","<axis>","stroke_color=vlgreen","stroke_thickness=1","spacing=0.05r","</axis>","<axis>","stroke_color=lgreen","stroke_thickness=2","spacing=0.1r","</axis>","<axis>","stroke_color=lred","stroke_thickness=2","spacing=1r","</axis>","</axes>","</plot>");
@heatmap5=("<plot>","type=heatmap","stroke_thickness=1","file=../Resource/In/5th/inheatmap.txt","stroke_color=red","max=999999","min=0","r0=0.86r","r1=0.74r","<axes>","<axis>","stroke_color=vlgreen","stroke_thickness=1","spacing=0.05r","</axis>","<axis>","stroke_color=lgreen","stroke_thickness=2","spacing=0.1r","</axis>","<axis>","stroke_color=lred","stroke_thickness=2","spacing=1r","</axis>","</axes>","</plot>");
@heatmap6=("<plot>","type=heatmap","stroke_thickness=1","file=../Resource/In/6th/inheatmap.txt","stroke_color=red","max=999999","min=0","r0=0.73r","r1=0.61r","<axes>","<axis>","stroke_color=vlgreen","stroke_thickness=1","spacing=0.05r","</axis>","<axis>","stroke_color=lgreen","stroke_thickness=2","spacing=0.1r","</axis>","<axis>","stroke_color=lred","stroke_thickness=2","spacing=1r","</axis>","</axes>","</plot>");
@heatmap7=("<plot>","type=heatmap","stroke_thickness=1","file=../Resource/In/7th/inheatmap.txt","stroke_color=red","max=999999","min=0","r0=0.60r","r1=0.48r","<axes>","<axis>","stroke_color=vlgreen","stroke_thickness=1","spacing=0.05r","</axis>","<axis>","stroke_color=lgreen","stroke_thickness=2","spacing=0.1r","</axis>","<axis>","stroke_color=lred","stroke_thickness=2","spacing=1r","</axis>","</axes>","</plot>");
@heatmap8=("<plot>","type=heatmap","stroke_thickness=1","file=../Resource/In/8th/inheatmap.txt","stroke_color=red","max=999999","min=0","r0=0.47r","r1=0.35r","<axes>","<axis>","stroke_color=vlgreen","stroke_thickness=1","spacing=0.05r","</axis>","<axis>","stroke_color=lgreen","stroke_thickness=2","spacing=0.1r","</axis>","<axis>","stroke_color=lred","stroke_thickness=2","spacing=1r","</axis>","</axes>","</plot>");
@heatmap9=("<plot>","type=heatmap","stroke_thickness=1","file=../Resource/In/9th/inheatmap.txt","stroke_color=red","max=999999","min=0","r0=0.34r","r1=0.22r","<axes>","<axis>","stroke_color=vlgreen","stroke_thickness=1","spacing=0.05r","</axis>","<axis>","stroke_color=lgreen","stroke_thickness=2","spacing=0.1r","</axis>","<axis>","stroke_color=lred","stroke_thickness=2","spacing=1r","</axis>","</axes>","</plot>");
#7
#text
@text3=("<plot>","type=text","file=../Resource/Out/outtext.txt","r0=1.01r","r1=1.04r","show_links=yes","show_links=yes","link_dims=0p,0p,150p,0p,0p","link_thickness=2p","link_color=black","label_size=24p","label_font=condensed","padding=0p","rpadding=0p","label_snuggle=yes","snuggle_refine=yes","</plot>");
@text4=("<plot>","type=text","file=../Resource/In/4th/intext.txt","r0=0.87r","r1=0.99r","show_links=yes","show_links=yes","link_dims=0p,0p,150p,0p,0p","link_thickness=2p","link_color=black","label_size=24p","label_font=condensed","padding=0p","rpadding=0p","label_snuggle=yes","snuggle_refine=yes","</plot>");
@text5=("<plot>","type=text","file=../Resource/In/5th/intext.txt","r0=0.74r","r1=0.86r","show_links=yes","show_links=yes","link_dims=0p,0p,150p,0p,0p","link_thickness=2p","link_color=black","label_size=24p","label_font=condensed","padding=0p","rpadding=0p","label_snuggle=yes","snuggle_refine=yes","</plot>");
@text6=("<plot>","type=text","file=../Resource/In/6th/intext.txt","r0=0.61r","r1=0.73r","show_links=yes","show_links=yes","link_dims=0p,0p,150p,0p,0p","link_thickness=2p","link_color=black","label_size=24p","label_font=condensed","padding=0p","rpadding=0p","label_snuggle=yes","snuggle_refine=yes","</plot>");
@text7=("<plot>","type=text","file=../Resource/In/7th/intext.txt","r0=0.48r","r1=0.60r","show_links=yes","show_links=yes","link_dims=0p,0p,150p,0p,0p","link_thickness=2p","link_color=black","label_size=24p","label_font=condensed","padding=0p","rpadding=0p","label_snuggle=yes","snuggle_refine=yes","</plot>");
@text8=("<plot>","type=text","file=../Resource/In/8th/intext.txt","r0=0.35r","r1=0.47r","show_links=yes","show_links=yes","link_dims=0p,0p,150p,0p,0p","link_thickness=2p","link_color=black","label_size=24p","label_font=condensed","padding=0p","rpadding=0p","label_snuggle=yes","snuggle_refine=yes","</plot>");
@text9=("<plot>","type=text","file=../Resource/In/9th/intext.txt","r0=0.22r","r1=0.34r","show_links=yes","show_links=yes","link_dims=0p,0p,150p,0p,0p","link_thickness=2p","link_color=black","label_size=24p","label_font=condensed","padding=0p","rpadding=0p","label_snuggle=yes","snuggle_refine=yes","</plot>");
#refer to indicator for further information
open(IDIC,"../Resource/Indicator.txt");
$indicator=<IDIC>;
#convert to array
@indicator=split(/,/,$indicator);
#outer
$indiouter=@indicator[0];
$hintouter=@indicator[9];
#inner
$preinner=@indicator[1];
$whichinner=@indicator[2];
@indiinner=splice @indicator,3,8;
@hintinner=splice @indicator,3,8;

#outer visualization
#no outer
if ($indiouter=~ m/noouter/)
{
  @highlight3=();
  @scatter3=();
  @line3=();
  @histogram3=();
  @heatmap3=();
  @text3=();
}
#if links
if ($whichinner=~ m/links/)
{
  #remove all other inner settings
  @highlight4=();@highlight5=();@highlight6=();@highlight7=();@highlight8=();@highlight9=();
  @scatter4=();@scatter5=();@scatter6=();@scatter7=();@scatter8=();@scatter9=();
  @line4=();@line5=();@line6=();@line7=();@line8=();@line9=();
  @histogram4=();@histogram5=();@histogram6=();@histogram7=();@histogram8=();@histogram9=();
  @heatmap4=();@heatmap5=();@heatmap6=();@heatmap7=();@heatmap8=();@heatmap9=();
  @text4=();@text5=();@text6=();@text7=();@text8=();@text9=();
  #add links to parameters
  splice @parameters,-1,0,@link;

}
#if yes
if ($indiouter=~ m/yesouter/ && $hintouter=~ m/1/)
{
  @scatter3=();@line3=();@histogram3=();@heatmap3=();@text3=();
}
elsif ($indiouter=~ m/yesouter/ && $hintouter=~ m/2/) 
         { #scatter
           @highlight3=();@line3=();@histogram3=();@heatmap3=();@text3=();
           open (OSSET,"../Resource/Out/outscattersettings.txt");
           $osset=<OSSET>;
           @osset=split(/,/,$osset);
           close OSSET;
           
           if (@osset[0]!~ m/hide/){@scatter3[27]="glyph=".@osset[1];@scatter3[25]="condition=var(value)>".@osset[0];@scatter3[26]="show=yes";} else {@scatter3[25]="condition=var(value)>".@osset[0];@scatter3[26]="show=no";}
           if (@osset[2]!~ m/hide/){@scatter3[22]="glyph=".@osset[1];@scatter3[20]="condition=var(value)<".@osset[0];@scatter3[21]="show=yes";} else {@scatter3[20]="condition=var(value)<".@osset[0];@scatter3[21]="show=no";}

         }
elsif ($indiouter=~ m/yesouter/ && $hintouter=~ m/3/) 
         { #line
           @highlight3=();@scatter3=();@histogram3=();@heatmap3=();@text3=();
           open (OLSET,"../Resource/Out/outlinesettings.txt");
           $olset=<OLSET>;
           @olset=split(/,/,$olset);
           
           if (@olset[0]!~ m/hide/){@line3[22]="condition=var(value)>".@olset[0];@line3[23]="show=yes";} else {@line3[22]="condition=var(value)>".@olset[0];@line3[23]="show=no";}
           if (@olset[2]!~ m/hide/){@line3[18]="condition=var(value)<".@olset[0];@line3[19]="show=yes";} else {@line3[18]="condition=var(value)<".@olset[0];@line3[19]="show=no";}

         }
elsif ($indiouter=~ m/yesouter/ && $hintouter=~ m/4/) 
         { #histogram
           @highlight3=();@scatter3=();@line3=();@heatmap3=();@text3=();
           open (OHSET,"../Resource/Out/outhistogramsettings.txt");
           $ohset=<OHSET>;
           @ohset=split(/,/,$ohset);
           
           if (@ohset[0]!~ m/hide/){@histogram3[22]="condition=var(value)>".@ohset[0];@histogram3[23]="show=yes";} else {@histogram3[22]="condition=var(value)>".@olset[0];@histogram3[23]="show=no";}
           if (@ohset[2]!~ m/hide/){@histogram3[18]="condition=var(value)<".@ohset[0];@histogram3[19]="show=yes";} else {@histogram3[18]="condition=var(value)<".@olset[0];@histogram3[19]="show=no";}

         }
elsif ($indiouter=~ m/yesouter/ && $hintouter=~ m/6/) 
         { #heatmap
           @highlight3=();@scatter3=();@line3=();@histogram3=();@text3=();
           open (OHESET,"../Resource/Out/outheatmapsettings.txt");
           $oheset=<OHESET>;
           @oheset=split(/,/,$oheset);
           
           @heatmap3[5]="max=".@oheset[1];
           @hearmap3[6]="ming=".@oheset[0];

         }

elsif ($indiouter=~ m/yesouter/ && $hintouter=~ m/7/)
{
  @highlight3=();@scatter3=();@line3=();@histogram3=();@heatmap3=();
}
#inner visualization

#no selected inner
$hintinlen=@hintinner;
for ($i=1;$i<$hintinlen;$i++)
{
  if (@hintinner[$i]=~ m/\s*/)
  {
    $hintindex=$i+4;
    $remove="highlight".$hintindex;
    @$remove=();
    $remove="scatter".$hintindex;
    @$remove=();
    $remove="line".$hintindex;
    @$remove=();
    $remove="histogram".$hintindex;
    @$remove=();
    $remove="heatmap".$hintindex;
    @$remove=();
    $remove="text".$hintindex;
    @$remove=();

  }
}
#yes but merge with other data track
$indiinlen=@indiinner;
for ($i=1;$i<$indiinlen;$i++)
{
  if (@indiinner[$i]=~ m/1/ && @indiinner[$i-1]!~ m/0|1/)
  {
    $range=@indiinner[$i-1];
    @range=split("-",$range);
    $min=@range[0];
    $max=@range[-1];
    $realmax=$max+1;
    $rmrange=$max-$min;
    ###remove irrelevant data tracks
     for ($j=0;$j<$rmrange+1;$j++)
     {
       $minj=$min+$j;
       $rm="highlight".$minj;
       @$rm=();
       $rm="scatter".$minj;
       @$rm=();
       $rm="line".$minj;
       @$rm=();
       $rm="histogram".$minj;
       @$rm=();
       $rm="heatmap".$minj;
       @$rm=();
       $rm="text".$minj;
       @$rm=();
     }
  } 
}

###set workable data track 
for ($i=0;$i<$indiinlen;$i++)
{  
    if (@hintinner[$i]=~ m/1/)
    {
      ##highlight
      #remove other settings
      $rem="scatter".$realmax;@$rem=();
      $rem="line".$realmax;@$rem=();
      $rem="histogram".$realmax;@$rem=();
      $rem="heatmap".$realmax;@$rem=();
      $rem="text".$realmax;@$rem=();
      #set new parameters
      #new data track aera, the most inner parameter
      $innermost=2*$min-6;
      $location=@location[$innermost];
      $location="r0=".$location."r";
      $working="highlight".$realmax;
      @$working[2]=$location;
    } 
    elsif (@hintinner[$i]=~ m/2/)
    {
      #scatter
      #remove other settings
      $rem="highlight".$realmax;@$rem=();
      $rem="line".$realmax;@$rem=();
      $rem="histogram".$realmax;@$rem=();
      $rem="heatmap".$realmax;@$rem=();
      $rem="text".$realmax;@$rem=();
      #set new parameters
      #new data track aera, the most inner parameter
      $innermost=2*$min-6;
      $location=@location[$innermost];
      $location="r0=".$location."r";
      $working="scatter".$realmax;
      @$working[9]=$location;
      #other related settings      
           open (OSSETA,"../Resource/In/".$realmax."th/inscattersettings.txt");
           $osseta=<OSSETA>;
           @osseta=split(/,/,$osseta);
           
           if (@osseta[0]!~ m/hide/){@$working[37]="glyph=".@osseta[1];@$working[35]="condition=var(value)>".@osseta[0];@$working[36]="show=yes";} else {@$working[35]="condition=var(value)>".@osseta[0];@$working[36]="show=no";}
           if (@osseta[2]!~ m/hide/){@$working[32]="glyph=".@osseta[1];@$working[30]="condition=var(value)<".@osseta[0];@$working[31]="show=yes";} else {@$working[30]="condition=var(value)<".@osseta[0];@$working[31]="show=no";}
           
           close OSSETA;
    }
    elsif (@hintinner[$i]=~ m/3/)
    {
      ##line
      #remove other settings
      $rem="highlight".$realmax;@$rem=();
      $rem="scatter".$realmax;@$rem=();
      $rem="histogram".$realmax;@$rem=();
      $rem="heatmap".$realmax;@$rem=();
      $rem="text".$realmax;@$rem=();
      #set new parameters
      #new data track aera, the most inner parameter
      $innermost=2*$min-6;
      $location=@location[$innermost];
      $location="r0=".$location."r";
      $working="line".$realmax;
      @$working[7]=$location;
      #other related settings      
           open (OLSETA,"../Resource/In/".$realmax."th/inlinesettings.txt");
           $olseta=<OLSETA>;
           @olseta=split(/,/,$olseta);
           
           if (@olseta[0]!~ m/hide/){@$working[32]="condition=var(value)>".@olseta[0];@$working[33]="show=yes";} else {@$working[32]="condition=var(value)>".@olseta[0];@$working[33]="show=no";}
           if (@olseta[2]!~ m/hide/){@$working[28]="condition=var(value)<".@olseta[0];@$working[29]="show=yes";} else {@$working[28]="condition=var(value)<".@olseta[0];@$working[29]="show=no";}
           
           close OLSETA;
    }
    elsif (@hintinner[$i]=~ m/4/)
    {
      ##histogram
      #remove other settings
      $rem="highlight".$realmax;@$rem=();
      $rem="scatter".$realmax;@$rem=();
      $rem="line".$realmax;@$rem=();
      $rem="heatmap".$realmax;@$rem=();
      $rem="text".$realmax;@$rem=();
      #set new parameters
      #new data track aera, the most inner parameter
      $innermost=2*$min-6;
      $location=@location[$innermost];
      $location="r0=".$location."r";
      $working="histogram".$realmax;
      @$working[7]=$location;
      #other related settings      
           open (OHSETA,"../Resource/In/".$realmax."th/inhistogramsettings.txt");
           $ohseta=<OHSETA>;
           @ohseta=split(/,/,$ohseta);
           
           if (@ohseta[0]!~ m/hide/){@$working[32]="condition=var(value)>".@ohseta[0];@$working[33]="show=yes";} else {@$working[32]="condition=var(value)>".@ohseta[0];@$working[33]="show=no";}
           if (@ohseta[2]!~ m/hide/){@$working[28]="condition=var(value)<".@ohseta[0];@$working[29]="show=yes";} else {@$working[28]="condition=var(value)<".@ohseta[0];@$working[29]="show=no";}
           
           close OHSETA;
    }
    elsif (@hintinner[$i]=~ m/6/)
    {
      ##heatmap
      #remove other settings
      $rem="highlight".$realmax;@$rem=();
      $rem="scatter".$realmax;@$rem=();
      $rem="line".$realmax;@$rem=();
      $rem="histogram".$realmax;@$rem=();
      $rem="text".$realmax;@$rem=();
      #set new parameters
      #new data track aera, the most inner parameter
      $innermost=2*$min-6;
      $location=@location[$innermost];
      $location="r0=".$location."r";
      $working="heatmap".$realmax;
      @$working[7]=$location;
      #other related settings      
           open (OHESETA,"../Resource/In/".$realmax."th/inheatmapsettings.txt");
           $oheseta=<OHESETA>;
           @oheseta=split(/,/,$oheseta);
           
           @$working[5]="max=".@oheseta[1];
           @$working[6]="min=".@oheseta[0];
          
           
           close OHESETA;
    }
    elsif (@hintinner[$i]=~ m/7/)
    {
      #remove other settings
      $rem="highlight".$realmax;@$rem=();
      $rem="scatter".$realmax;@$rem=();
      $rem="line".$realmax;@$rem=();
      $rem="histogram".$realmax;@$rem=();
      $rem="heatmap".$realmax;@$rem=();
      #set new parameters
      #new data track aera, the most inner parameter
      $innermost=2*$min-6;
      $location=@location[$innermost];
      $location="r1=".$location."r";
      $working="text".$realmax;
      @$working[4]=$location;
    }
}

#insert detailed settings into setting handler together
splice @highlight,1,0,@highlight9;
splice @highlight,1,0,@highlight8;
splice @highlight,1,0,@highlight7;
splice @highlight,1,0,@highlight6;
splice @highlight,1,0,@highlight5;
splice @highlight,1,0,@highlight4;
splice @highlight,1,0,@highlight3;

splice @plot,-1,0,@scatter3;
splice @plot,-1,0,@scatter4;
splice @plot,-1,0,@scatter5;
splice @plot,-1,0,@scatter6;
splice @plot,-1,0,@scatter7;
splice @plot,-1,0,@scatter8;
splice @plot,-1,0,@scatter9;

splice @plot,-1,0,@line3;
splice @plot,-1,0,@line4;
splice @plot,-1,0,@line5;
splice @plot,-1,0,@line6;
splice @plot,-1,0,@line7;
splice @plot,-1,0,@line8;
splice @plot,-1,0,@line9;

splice @plot,-1,0,@histogram3;
splice @plot,-1,0,@histogram4;
splice @plot,-1,0,@histogram5;
splice @plot,-1,0,@histogram6;
splice @plot,-1,0,@histogram7;
splice @plot,-1,0,@histogram8;
splice @plot,-1,0,@histogram9;

splice @plot,-1,0,@heatmap3;
splice @plot,-1,0,@heatmap4;
splice @plot,-1,0,@heatmap5;
splice @plot,-1,0,@heatmap6;
splice @plot,-1,0,@heatmap7;
splice @plot,-1,0,@heatmap8;
splice @plot,-1,0,@heatmap9;

splice @plot,-1,0,@text9;
splice @plot,-1,0,@text8;
splice @plot,-1,0,@text7;
splice @plot,-1,0,@text6;
splice @plot,-1,0,@text5;
splice @plot,-1,0,@text4;
splice @plot,-1,0,@text3;

#insert each detailed settings into circos.conf
splice @parameters,-1,0,@highlight;

splice @parameters,-1,0,@plot;


#######################further organize configuration file
#insert new line
#parameters
$parlen=@parameters;
for ($i=0;$i<$parlen;$i++)
{
	@parameters[$i]=@parameters[$i]."\n";
}

#ideogram_conf
$ideolen=@ideogram_conf;
for ($i=0;$i<$ideolen;$i++)
{
	@ideogram_conf[$i]=@ideogram_conf[$i]."\n";
}

#ticks_m
$tickslen=@ticks_m;
for ($i=0;$i<$tickslen;$i++)
{
	@ticks_m[$i]=@ticks_m[$i]."\n";
}
########################write to related files
#write to circos.conf
$pcircos="./Formatted/circos.conf";
open PCI,">",$pcircos;
print PCI @parameters;
close PCI;
#write to ideogram.conf
$pideogram="./Formatted/ideogram.conf";
open IDE,">",$pideogram;
print IDE @ideogram_conf;
close IDE;
#write to ticks.conf
$pticks="./Formatted/ticks.conf";
open TICK,">",$pticks;
print TICK @ticks_m;
close TICK;


#close file handler:
close RAW;
close RAD;
close TIC;
close ZOO;
close SPA;