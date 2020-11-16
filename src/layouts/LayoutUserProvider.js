import React, {Component, Fragment, useState, useContext} from "react";
import UserContext from "./userContext";
  
  function LayoutUserProvider(props) {
	let [state, setState] = useState({});

	  return (
		<UserContext.Provider value={{
			user: state,
			setUser: (user) => {
				setState(user)
			}
		  }}>
		  {props.children}
		</UserContext.Provider>
	  );
  }

export default LayoutUserProvider;