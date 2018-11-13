var list1 = []

$( function() {
    $( "#sortable" ).sortable();
    $( "#sortable" ).disableSelection();
  } );

$( "#target" ).submit(function( event ) {
    $('#sortable>li').text((index, text) => {
        list1.push(text)
    })
    $('#rolePref').val(list1)
  });
