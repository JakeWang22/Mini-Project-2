import React from "react";
import { useState, useEffect } from "react";

function CatFacts() {
    const [facts, setFacts] = useState([]);
    const [pFacts, setPFacts] = useState([]);
    const [fav, setFav] = useState([false]);
    const fetchData = async () => {
        const response = await fetch("https://catfact.ninja/fact");
        const data = await response.json();
        if (facts != null) {
            pFacts.push({favorite: fav, fact: facts.fact});
            setFav(false);
        }
        if (pFacts.length > 10) {
            pFacts.shift();
        } 
        setPFacts(pFacts);
        setFacts(data);
    };
    const favorite = () => {
        setFav(true);
    }
    const nextTen = () => {
        counter+=10;
    }
    const prevTen = () => {
        counter -=10;
    }
    useEffect(() => {
        fetchData();
    }, []);

    let counter = 1;

    return (
        <div className="continer">
            <p>{facts.fact}</p>
            <button onClick={fetchData}>New Fact</button>
            <button onClick={favorite}>Favorite Fact</button>
            <p>Previous Facts</p>
            {
                pFacts.map(prev => {
                    return <p className={prev.favorite ? "favorite" : "fact"} key={counter}>{prev.fact}</p>
                })
            }
            <button onClick={nextTen}>Next 10 facts</button>
            <button onClick={prevTen}>Prev 10 facts</button>
        </div>
    )
}



export default CatFacts;