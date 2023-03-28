export const FieldService =  {
	getField: function(id) {
		// return field
	},
	saveField: function (requestObject) {
		// Add the code here to call the API (or temporarily, just log fieldJson to the console)

        const jsonToBeSaved = JSON.stringify(requestObject);

		fetch('http://www.mocky.io/v2/566061f21200008e3aabd919',{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: jsonToBeSaved
		}).then((response) => {
			if(response.ok) {
				alert("data saved successfully!!")
				console.log(jsonToBeSaved)
			}
		})
	}
}