import { useState } from "react"
import './Search.css'
import {TbSearch} from 'react-icons/tb'
import {GrClose} from 'react-icons/gr'

export const Search = ({onSearch, setLoading}) => {
    const [query, setQuery] = useState("")

    const handleSubmit = (e) =>{
        e.preventDefault();
        setLoading(true)
        onSearch(query)
    }

    return (
        <div className="search-wraper">
            <form onSubmit={handleSubmit} className="search-form">
                <input 
                    placeholder="Wpisz miasto..."
                    value={query}
                    onChange={e=>{ setQuery(e.target.value)}}
                    className="search-input"
                />
                {query !== "" ?
                <GrClose 
                    size={26} 
                    className="search-clear"
                    onClick={()=>setQuery("")}
                />
                : <></>}
                <span className="search-line" ></span>
                <button type="submit">
                    <TbSearch size={25} className="search-icon"
                    />
                </button>
            </form>
        </div>
    )
}