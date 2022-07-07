$('document').ready(function(){
    $.getJSON('/fee/displaycoursesjson',{ajax:true},function(data){
     $.each(data,function(key,row){
    $('#courses').append($('<option>').text(row.coursename).val(row.courseid));
     });
    });
    
    $('#courses').change(function(){
        $('#courses').empty();
        $('#courses').append($('<option>').text("course"));
        $.getJSON('/fee/displaycoursesjson',{ajax:true,courseid:$('#courses').val()},function(data){
            $.each(data,function(key,row){
           $('#courses').append($('<option>').text(row.courseid).val(row.courseid));
            });
           });
           
    
    });
    
    });