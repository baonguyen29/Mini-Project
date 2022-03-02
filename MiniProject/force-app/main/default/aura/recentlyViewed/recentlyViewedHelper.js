({
	getRecords: function(component) {
    var action = component.get("c.getRecords");
    
        //call back method
    action.setCallback(this, function(data) {
        //checking the request's state and get the responses
        var state = data.getState();
        if (state ==="SUCCESS"){
            var records = data.getReturnValue();
      		component.set("v.recs", records);
        }
        else {
            console.log("Failed due to state:" + state);
        }
    });
        
    $A.enqueueAction(action);
  }
})