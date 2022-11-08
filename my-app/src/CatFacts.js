import React from "react";
import { useState, useEffect } from "react";

function CatFacts() {
    const [facts, setFacts] = useState([]);
    const [pFacts, setPFacts] = useState([]);
    const [fav, setFav] = useState(false);
    const [counter, setCounter] = useState(0);
    const fetchData = async () => {
        const response = await fetch("https://catfact.ninja/fact");
        const data = await response.json();
        if (facts != null && facts.fact != null) {
            pFacts.unshift({favorite: fav, fact: facts.fact});
            setFav(false);
        }
        setPFacts(pFacts);
        setFacts(data);
    };
    const favorite = () => {
        setFav(true);
    }
    const nextTen = () => {
        setCounter(Math.min(counter+10, pFacts.length - pFacts.length % 10));
    }
    const prevTen = () => {
        setCounter(Math.max(0, counter-10));
    }
    const forceUpdate = (index) => {
        const copy = [...pFacts];
        const entry = copy[index];
        entry.favorite = !entry.favorite;
        copy[index] = entry;
        setPFacts(copy);
    }
    useEffect(() => {
        fetchData();
    }, []);

    let c = 0;

    return (
        <div className="continer">
            <p style={{fontSize: 30}}>{facts.fact}</p>
            <button onClick={fetchData}>New Fact</button>
            <button onClick={favorite}>Favorite Fact</button>
            <p style={{fontWeight: 'bold'}}>Previous Facts</p>
            {
                pFacts.filter((_, index) => index >= counter && index < (counter + 10)).map((prev, index) => {
                    return <div key={index}>
                        <p style={{display: "inline"}} className={prev.favorite ? "favorite" : "fact"}>{prev.fact}</p>
                        <button onClick={() => forceUpdate(index)}>{prev.favorite ? "Unfavorite" : "Favorite"}</button>
                    </div>
                })
            }
            <button onClick={nextTen}>Next 10 facts</button>
            <button onClick={prevTen}>Prev 10 facts</button>
        </div>
    )
}



export default CatFacts;