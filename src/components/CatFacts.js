import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
const CatFacts = () => {
  const [Data, setData] = useState({});
  const [animal, setAnimal] = useState("cat");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const result = await axios.get(
        `https://cat-fact.herokuapp.com/facts/random?animal_type=${animal}`
      );
      setData(result.data);
      setLoading(false);
    };
    fetchData();
  }, []);
  const fetchNewFact = async (e, animal) => {
    e.preventDefault();
    setLoading(true);
    setAnimal(animal);
    const result = await axios.get(
      `https://cat-fact.herokuapp.com/facts/random?animal_type=${animal}`
    );
    setData(result.data);
    setLoading(false);
  };
  return loading ? (
    <div class="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  ) : (
    <div className="container">
      <h1 className="title">Random Cat Facts !</h1>
      <p className="fact">{Data.text}</p>
      <div className="btn-container">
        <button
          className="btn"
          type="button"
          onClick={(e) => fetchNewFact(e, animal)}>
          Get another one
        </button>
        {animal === "cat" ? (
          <button
            className="btn"
            type="button"
            onClick={(e) => fetchNewFact(e, "dog")}>
            Change to Dog Facts
          </button>
        ) : (
          <button
            className="btn"
            type="button"
            onClick={(e) => fetchNewFact(e, "cat")}>
            Change to Cat Facts
          </button>
        )}
      </div>
    </div>
  );
};

export default CatFacts;
