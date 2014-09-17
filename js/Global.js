
function getBeerBrand(num)
{
	var url;
	switch(num) {
    case 1:
        //url = 'data/hashigozake.json';
    	url = 'http://maltlist.seriousorange.com/api/products.json?local_business_id=1';
        break;
    case 2:
    	url = 'http://maltlist.seriousorange.com/api/products.json?local_business_id=2';
        break;
    case 3:
    	url = 'http://maltlist.seriousorange.com/api/products.json?local_business_id=3';
    	break;
    case 4:
    	url ='http://maltlist.seriousorange.com/api/products.json?local_business_id=4';
    	break;
    case 5:
        url = 'http://maltlist.seriousorange.com/api/products.json?local_business_id=5';
        break;
    case 6:
    	url = 'http://maltlist.seriousorange.com/api/products.json?local_business_id=6';
        break;
    case 7:
    	url = 'http://maltlist.seriousorange.com/api/products.json?local_business_id=7';
    	break;
    case 8:
    	url ='http://maltlist.seriousorange.com/api/products.json?local_business_id=8';
    	break;
    case 9:
        url = 'http://maltlist.seriousorange.com/api/products.json?local_business_id=9';
        break;
    case 10:
    	url = 'http://maltlist.seriousorange.com/api/products.json?local_business_id=10';
        break;
    case 11:
    	url = 'http://maltlist.seriousorange.com/api/products.json?local_business_id=11';
    	break;
    case 12:
    	url ='http://maltlist.seriousorange.com/api/products.json?local_business_id=12';
    	break;
    case 13:
    	url ='http://maltlist.seriousorange.com/api/products.json?local_business_id=13';
    	break;
    default:
    	url = 'http://maltlist.seriousorange.com/api/products.json?local_business_id=1';
    	break;
	}
	getOnTapBeerDetails(url);
			
}

function getBeerDetails(brandURL)
{
	
	$.ajax({
	    	
		url: brandURL,
		dataType: "json",
	    // tell YQL what we want and that we want JSON
	    success: function( response ) {
	        console.log( response.data ); // server response
             $("#result").append('<table>');
	        response.data.forEach(function(product){
				// this is where what we want from each product to do
				
				$("#result").append('<p><b> Beer Name : '+product.name + '</b></p><br>');
				$("#result").append('<b>Offers: </b>');
					$.each(product.offers, function(j, offers){
						$("#result").append('<p> Category : '+offers.category + ' Price : '+ offers.price + ' Volume : ' + offers.volume + '</p>');
						});
				});
             $("#result").append('</table>');
	    }
	
	});
	 
	
}

function getOnTapBeerDetails(brandURL)
{
    
    $.ajax({
            
        url: brandURL,
        dataType: "json",
        // tell YQL what we want and that we want JSON
        success: function( response ) {
            console.log( response.data ); 
            $("#result").empty();
            $("#result").append('<table><thead><tr><th>Beer Name</th><th>Volume</th><th>Price</th></tr></thead><tbody></tbody></table>');
            response.data.forEach(function(product){
                // this is where what we want from each product to do
                
               // $("#result").append('<p><b> Beer Name : '+product.name + '</b></p><br>');
                //$("#result").append('<b>Offers: </b>');
                   $.each(product.offers, function(j, offers){
                        if(offers.category==="tap"){
                            $("#result table tbody").append('<tr><td> '+product.name +'</td><td>'  + (offers.volume ? offers.volume : "N/A") +'</td><td>' + (offers.price === 0 ? "N/A" : "$" + offers.price.toFixed(2)) +'</td></tr>');
                            //$("#result").append('<p> Category : '+offers.category + ' Price : '+ offers.price + ' Volume : ' + offers.volume + '</p>');    
                            }
                        
                        });
                });
        }
    
    });
        
}

function getLocation(callback) {
    navigator.geolocation.getCurrentPosition(function(position){
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        var location = {};
        location.latitude = Math.round(latitude*10000000)/10000000;
        location.longitude = Math.round(longitude*10000000)/10000000;

        callback(location);
    })
}

function getLocalBusinesses(location) {
    var url = 
        "http://maltlist.seriousorange.com/api/local_businesses.json?" +
        "&latitude=" + location.latitude +
        "&longitude=" + location.longitude;

    return $.getJSON(url);
};

function displayNearbyPubs() {
    $("#loading").show();
    getLocation(function(location) {
        getLocalBusinesses(location).done(function(businesses) {
            $("#loading").hide();
            $("#result").append('<table><thead><tr><th>Pub Name</th><th>Address</th><th>Distance</th></tr></thead><tbody></tbody></table>');
            console.log(businesses);
               $.each(businesses.data, function(j, data){
                 $("#result table tbody").append('<tr><td> '+data.name +'</td><td>'  + data.address +'</td><td>'  +data.distance.toFixed(2) +' km </td></tr>');
               });
        });
    });
}

