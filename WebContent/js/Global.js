
function getBeerBrand(num)
{
	var url;
	switch(num) {
    case 1:
        url = 'data/hashigozake.json';
        break;
    case 2:
    	url = 'data/littlebeerquarter.json';
        break;
    case 3:
    	url = 'data/therogueandvagabond.json';
    	break;
    case 4:
    	url ='data/socro.json';
    	break;
    case 5:
        url = 'data/thegreenmanpub.json';
        break;
    case 6:
    	url = 'data/fork&brewer.json';
        break;
    case 7:
    	url = 'data/themalthouse.json';
    	break;
    case 8:
    	url ='data/bin44.json';
    	break;
    case 9:
        url = 'data/d4onfeatherston.json';
        break;
    case 10:
    	url = 'data/thehopgarden.json';
        break;
    case 11:
    	url = 'data/theestablishment.json';
    	break;
    case 12:
    	url ='data/thebruhaus.json';
    	break;
    case 13:
    	url ='data/brewonquay.json';
    	break;
    default:
    	url = 'data/hashigozake.json';
    	break;
	}
	getBeerDetails(url);
			
}

function getBeerDetails(url)
{
	$.getJSON(url, function(response) {
		//to remove starts.
		//$('#result').html(response.data[0].name);
		//$('#result2').html(response.data[1].name);
		//$('#result3').html(response.data[2].name);
		//to remove ends.
		//$("#result2").append('<p><b>Hashigo Zake - Cult Beer Bar</b></p><br>');
		$.each(response.data, function(i, product){
			// this is where what we want from each product to do
			
			$("#result").append('<p><b> Beer Name : '+product.name + '</b></p><br>');
			$("#result").append('<b>Offers: </b>');
				$.each(product.offers, function(j, offers){
					$("#result").append('<p> Category : '+offers.category + ' Price : '+ offers.price + ' Volume : ' + offers.volume + '</p>');
					});
			});

		
		});
}

//Little Beer Quarter
