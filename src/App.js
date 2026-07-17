import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";



/**
// const heading = React.createElement("h1",{id:"heading"},"hello wolrd");
const heading = <span id="heading">Namaste from JSX🚀</span> // react element written in jsx

//react element     
const Title1 = (
    <h1>
        {heading}
        Namaste
    </h1>
)

// functional component
const Title = () =>  (
    <h1 id="heading">
                Namaste from JSX🚀
            </h1>
);

const number =10000; 

const HeadingComponent = () => (
    <div id="container">
        <Title></Title>
        {Title1} 
        {number}
        <h2>{number}</h2>
        <Title/>
        <h1>Namaste functional component</h1>
    </div>
);

 */



// const styleCard = {
//     backgroundColor:"#f0f0f0"
// }




const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Body />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout />);
