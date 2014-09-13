window.data = {"Mike's OMPA, ParrotDog, Kereru For Great Justice, Tuatara, ParrotDog, Panhead, Young Henry's"};

function getBeerInfo(){
	$.get( " http://craftbeercapital.com/api/beta/?key=R8GK0IRJX5&output=xml&request=beer", function( data ) {
		$( ".result" ).html( data );
		alert( "Load was performed." );
	});
}


