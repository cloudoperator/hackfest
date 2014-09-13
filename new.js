window.data = {"Mike's OMPA, "};

function getBeerInfo(){
	$.get( " http://craftbeercapital.com/api/beta/?key=R8GK0IRJX5request=beer", function( data ) {
		$( ".result" ).html( data );
		alert( "Load was performed." );
	});
}