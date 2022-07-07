function vdisplay(){
	
	$.getJSON('VehicleByCityJSON',{ajax:true,city:$('#city').val(),tp:$('#tp').val()},function(data){
		$htm='<table cellspacing=5>';
		$c=1;
		 $.each(data,function(i,item){
		if($c==1)
			{$htm+='<tr>';}
	 
		$htm+='<td>'
		$htm+='<table cellspacing=10 cellpadding=7 border=1>';
		$htm+='<tr>';
		$htm+="<td valign=top><img src='picture/"+item.VEHICLEPICTURE+"' width=150 height=150><br><br><input type=Button class='btnpic' vid='"+item.VEHICLEID+"' value='View More'></td>";
		$htm+='<td>';
		$htm+="Vehicle:"+item.VEHICLENAME+'<br>';
		$htm+="Model:"+item.MODELYEAR+'<br>';
		$htm+="Color:"+item.VEHICLECOLOR+'<br>';
		$htm+="Type:"+item.VEHICLETYPE+'<br>';
		$htm+="Capacity:"+item.CAPACITY+'<br>';
		$htm+="Insurance:"+item.INSURANCE+'<br>';
		$htm+="AC Status:"+item.AIRCONDITIONAR+'<br>';
		$htm+="Fuel Type:"+item.FUELTYPE+'<br><br>';
		$htm+="<input type=Button class='btc' vid='"+item.VEHICLEID+"' vn='"+item.VEHICLENAME+"' vmodel='"+item.MODELYEAR+"' vcolor='"+item.VEHICLECOLOR+"' vtype='"+item.VEHICLETYPE+"' vcapacity='"+item.CAPACITY+"' vins='"+item.INSURANCE+"' vac='"+item.AIRCONDITIONAR+"' vftype='"+item.FUELTYPE+"' vpicture='"+item.VEHICLEPICTURE+"' from='"+$('#from').val()+"' to='"+$('#to').val()+"' city='"+$('#city').val()+"' dcity='"+$('#dcity').val()+"' value='Book This Cab'></td></tr></table></td>";
		 $c++;
		 if($c==3)
			 {$htm+='</tr>';
			 $c=1;}

		
		  });	
			
		 $htm+='</table>';
		$('#result').html($htm);	
		});	
	
}
$(document).ready(
 function(){
	 $('#vpic').dialog({
			modal:true,
			autoOpen:false,
			title:'Pictures',
			
		});		

	
	 
	 
	 $.getJSON('CityAllJSON',{ajax:true},function(data){
		 $('#city').empty();
		 $('#city').append($('<option>').text("Select City"));
		 $('#dcity').empty();
		 $('#dcity').append($('<option>').text("Select City"));
	 $.each(data,function(i,item){
		 $('#city').append($('<option>').val(item.CITYID).text(item.CITYNAME));
		 $('#dcity').append($('<option>').val(item.CITYID).text(item.CITYNAME));
	  });	 
	 });
$('#city').change(function(){
	
	vdisplay();
	
	
});	 

$('#city').change(function(){
	
	vdisplay();
	
});	

$('#tp').keyup(function(){
	
	vdisplay();
	
});	

	
$('#result').on('click','.btnpic',function(){
	//alert($(this).attr('vid'));
	$.getJSON('VehiclePictureJSON',{ajax:true,vid:$(this).attr('vid')},function(data){
	$htm='<table cellspacing=5>';
	$c=1;
	 $.each(data,function(i,item){
	if($c==1)
		{$htm+='<tr>';}
	    $htm+='<td><img src=picture/'+item.PHOTO+" width=130 height=130></td>";
	    $c++;
	   if($c==3)
		   {$htm+='</tr>';
		   $c=1;
		   }
		   });
	 $htm+='</table>';

	  $('#vpic').html($htm); 
	  $('#vpic').dialog('open');
	 
		
	});
	
});


$('#result').on('click','.btc',function(){
	
window.location.href="ClientVehicleRequest?vid="+$(this).attr('vid')+"&vn="+$(this).attr('vn')+"&vmodel="+$(this).attr('vmodel')+"&vcolor="+$(this).attr('vcolor')+"&vtype="+$(this).attr('vtype')+"&vcapacity="+$(this).attr('vcapacity')+"&vins="+$(this).attr('vins')+"&vac="+$(this).attr('vac')+"&vftype="+$(this).attr('vftype')+"&vpicture="+$(this).attr('vpicture')+"&from="+$(this).attr('from')+"&to="+$(this).attr('to')+"&city="+$(this).attr('city')+"&dcity="+$(this).attr('dcity');	
	
	
});


 });







