import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [term, setTerm] = useState("");
  const [result, setResult] = useState([]);

  useEffect(() => {
    const search = async () => {
      const respond = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: term,
        },
      });

      setResult(respond.data.query.search);
    };
  const debounceSearch= setTimeout(() => {
    if(term){
      search();
    }
  }, 1500);
  return ()=>{
    clearTimeout(debounceSearch);
  }
  
  }, [term]);

  const fetchResult = result.map((ele, idx) => {
    return (
      <tr key={ele.pageid}>
        <td>{idx}</td>
        <td>{ele.title}</td>
        <td> <span dangerouslySetInnerHTML={{'__html' : ele.snippet}}/> </td>
      </tr>
    );
  });
  return (
    <div className="container">
      <div className="search">
        <label htmlFor="inputSearch">Search Input</label>
        <input
          id="inputSearch"
          type="text"
          onChange={(e) => setTerm(e.target.value)}
          value={term}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Desc</th>
          </tr>
        </thead>
        <tbody>{fetchResult}</tbody>
      </table>
     
    
    </div>
  );
};
export default App;
