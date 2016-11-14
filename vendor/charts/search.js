// When you click on #search
  $("#searchButton").on('input', function(){

    var value = $(this).val()


    $(".department").each(function(){
        // $(this).find("h3").css({
        //   "background-color":"red"
        // });

        if( $(this).find("h3").text().toLowerCase().indexOf(value.toLowerCase()) >= 0 )
        {
          $(this).show()
        }
        else{
          $(this).hide()
        }
    })
  });
