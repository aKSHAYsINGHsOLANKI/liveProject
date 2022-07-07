$('document').ready(function()
{

	 $('#vpic').dialog({

			modal:true,
      autoOpen:false,
      
      title:'STUDENT DETAILS',
      
      width:'50%',
      draggable: false, 
      resizable: false,
      
   });
     
      
    
      
   



    $.getJSON('/studentrr/displayrrjson',{ajax:true},function(data){
       

               $.each(data,function(key,row)
               {
                                     $('#batch').append($('<option>').text(row.batchname).val(row.batchid));
                
        

               });

               });
            

$('#batch').change(function(){

  

    $.getJSON('/studentrr/displaystudentjson',{ajax:true,batchid:$('#batch').val()},function(data)
        {
          
          
          $(document).ready(function(){

$('#example').DataTable();

        });



        
          htm=''
         htm+='<table id ="example" cellspacing="8" class="table table-striped table-bordered" style="margin-right:25%"    style="width:65%" style="height:70%"  ><tr><th>TRANSACTIONID</th> <th>STUDENT NAME/GENDER</th><th>MOBILE NO</th> <th>COLLEGE/SEM/BRANCH</th><th>COURSE NAME</th><th>BATCH NAME</th><th>STATUS</th><th>FEES</th><th>AMOUNT PAID</th><th>DUE AMOUNT</th> <th>UPDATE</th></tr>'
               $.each(data,function(key,row)
               {
                
                btnstatus='PAY'
                due=row.fees
                 paid=0   
                  if(row.amountpaid!=null)
                     {due=parseInt(row.fees)-parseInt(row.amountpaid)
                     if(due==0)
                      { 
                        
                       btnstatus='PAID'
                       
      
                    
                    
                    }
                    paid=row.amountpaid

                     }
                     j=(btnstatus=='PAID')?'PAID' :"<input type='button'   id='button'  class ='btnpay'    tid='"+row.transactionid+"' studentname='"+row.studentname+"' courseid='"+row.courseid+"'  coursedetails='"+row.courseid+" / " +row.coursename+"'  batchid='"+row.batchid+"' batchdetails='"+row.batchid+" / " +row.batchname+"'    amountpay='"+row.fees+"'      dueamount='"+due+"'  style='background-color:DodgerBlue;'      value='"+btnstatus+"'>"
                     
                    
                      
                                     htm+='<tr><td>'+row.transactionid+"</td><td><img src='http://localhost:3000/images/"+row.picture+"' width='30' height='30'/> <br/>"  +row.studentname+"/"+row.gender+" </td><td>"+row.mobileno+"</td><td>"+row.collegename+" / "+row.semester+" / "+row.branch+"</td><td>"+row.courseid+" / " +row.coursename+"</td><td>"+row.batchid+" / " +row.batchname+"</td><td>"+row.status+"</td>&nbsp<td><img src='http://localhost:3000/images/rupee.png' width='13' height='13'/>&nbsp"+row.fees+"</td>&nbsp<td><img src='http://localhost:3000/images/rupee.png' width='13' height='13'/>&nbsp"+paid+"</td><td><img src='http://localhost:3000/images/rupee.png' width='13' height='13'/>&nbsp"+due+"</td><td>"+j+"</td></tr>";
                });


                              
          

                 $('#result').html(htm);
        });
    
});

$('#result').on('click','.btnpay',function(){
  //alert($(this).attr('vid'));

  
  
d=new Date()
cd=(d.getFullYear())+"/"+(d.getMonth()+1)+"/"+(d.getDate())
ct=d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()
 
  htm=''
  htm+="<form><div class='container'><div class='md-form'> <div class='row'><div class='col-xl-6'><label for='form3'>Transaction-Id:</label><input type='number'  id='tid' class='form-control' value='"+$(this).attr('tid')+"' > </div> <div class='col-md-6'><label for='form3'>Student Name</label><input type='text' id='studentname'  class='form-control'   value='"+$(this).attr('studentname')+"'></div></div></div></div><div class='container'><div class='md-form'> <div class='row'><div class='col-xl-6'> <label for='form3'>COURSEDETAIL</label> <input type='text' id='coursedetails' class='form-control' value='"+$(this).attr('coursedetails')+"'></div> <div class='col-md-6'>  <label for='form3'>BATCHDETAIL</label> <input type='text' class='form-control' id='batchdetails' value='"+$(this).attr('batchdetails')+"'></div></div></div></div><div class='container'><div class='md-form'> <div class='row'><div class='col-xl-6'> <label for='form3'>CURRENT DATE</label>  <input type='text' id='currentdate'  class='form-control' value='"+cd+"'></div> <div class='col-md-6'>  <label for='form3'>CURRENT TIME</label><input type='text' id='currenttime' class='form-control' value='"+ct+"'></div></div></div></div><div class='container'><div class='md-form'> <div class='row'><div class='col-xl-6'> <label for='form3'>AMOUNT PAYING</label>  <input type='number' class='form-control' id='amountpaying' ></div> <div class='col-md-6'>  <label for='form3'>FEES</label><input type='number' id='amountpay' class='form-control' value='"+$(this).attr('amountpay')+"' ></div></div></div></div><div class='container'><div class='md-form'> <div class='row'><div class='col-xl-6'> <label for='form3'>AMOUNT REMAIN</label><input type='number' id='remamount'  class='form-control' ></div> <div class='col-md-6'>  <label for='form3'>DUE AMOUNT</label><input type='number' class='form-control' id='dueamount' value='"+$(this).attr('dueamount')+"' ></div></div></div></div></br><tr><td><div class='text-center'><input type='button'  class='btnsub'  tid='"+$(this).attr('tid')+"'   studentname='"+$(this).attr('studentname')+"'  coursedetails='"+$(this).attr('coursedetails')+"' batchdetails='"+$(this).attr('batchdetails')+"'  status='"+$(this).attr('status')+"'  batchid='"+$(this).attr('batchid')+"'  courseid='"+$(this).attr('courseid')+"'     amountpay='"+$(this).attr('amountpay')+"'  remamount='"+$(this).attr('remamount')+"'  style='background-color:white'  value='SUBMIT'></input></div></td></tr></form></div>"


  

	  $('#vpic').html(htm); 
    $('#vpic').dialog('open');
    
	 
		
  });        
  
  $('#vpic').on('click','.btnsub',function(){
    
    
    
    alert('Your fees has submitted successfully!')
    data={'transactionid':$(this).attr('tid'),'courseid':$(this).attr('courseid'),'batchid':$(this).attr('batchid'),'feeamountpay':$(this).attr('amountpay'),'feeamountpaid':$('#amountpaying').val(),'feedate':$('#currentdate').val(),'feetime':$('#currenttime').val(),'amountdue':$('#remamount').val(),'dueamount':$('#dueamount').val(),'status':$(this).attr('status')}
        $.getJSON('/studentrr/studentpay',{ajax:true,body:data},function(result){
          alert(result)    
                       
  });
  });

  
 $('#vpic').on('keyup','#amountpaying',function(){
  amt=parseInt($('#dueamount').val())-parseInt($('#amountpaying').val())
  if(amt<0)
  {$(".btnsub").attr('disabled',true);}
  else{$(".btnsub").attr('disabled',false);}
  parseInt($('#remamount').val(amt)) 







  
    

 });
  
 

 

 





});