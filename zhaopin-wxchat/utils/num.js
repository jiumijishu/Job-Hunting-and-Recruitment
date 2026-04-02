
export default{
	n(v) {
	    if(isNaN(v)){  
	         return v;  
	     }  
	     v = v/1000+'k';//10000;  
	   
	     return v; 
	}
}

