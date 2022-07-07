$(document).ready(function()
{
    $.getJSON('displaycoursesjson',{ajax:true},function(data)
        {
               $.each(data,function(i,item)
               {
 $('#courses').append($('<option>').text(item.coursename).val(item.courseid));
                });
        });
});


$(document).ready(function()
{
    $.getJSON('displaybatchtimejson',{ajax:true},function(data)
        {
               $.each(data,function(i,item)
               {
/* $('#fromtime').append($('<option>').text(item.fromtime));
 */$('#fromtime').append($('<option>').text(item.fromtime).val(item.fromtime));
 
                });
        });
});


$(document).ready(function()
{
    $.getJSON('displaybatchtimejson',{ajax:true},function(data)
        {
               $.each(data,function(i,item)
               {
$('#totime').append($('<option>').text(item.totime).val(item.totime));
                });
        });
});





$(document).ready(function()
{
    $.getJSON('displaybatchjson',{ajax:true},function(data)
        {
               $.each(data,function(i,item)
               {
     $('#batch').append($('<option>').text(item.batchname).val(item.batchid));
                });
        });
});


 




 
