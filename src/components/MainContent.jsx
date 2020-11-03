import React, {useState, useEffect} from 'react'

export default function MainContent() {     
    const [data, setData] = useState({})
    const handleErrors = response => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }
    useEffect(() => {
        fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_API_KEY}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setData(data)
                console.log(data);
            })
            .then(handleErrors)
            .catch(error => alert("Uh-oh. The server isn't responding. Please try again later."));
        }, [])
    return (
        <div className='Container'>
            <h1 id="title">{data.title}</h1>
            <a href={data.url} target="_blank" rel="noreferrer"><img src={data.hdurl} id="astroimg" width="100%" alt=""/></a>
            <div className="astrotext">
                {data.date}
                <h1>Explanation:</h1>
                <p>{data.explanation}.</p>
                <div className="caption">Picture by {data.copyright}.</div>
            </div>
        </div>
    )
}
