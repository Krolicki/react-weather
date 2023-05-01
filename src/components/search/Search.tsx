import React, { useEffect, useRef, useState } from "react"
import './Search.css'
import {TbSearch} from 'react-icons/tb'
import {GrClose} from 'react-icons/gr'

type SearchProps = {
    onSearch: (query : string) => void
    setLoading: (loading : boolean) => void
}

export const Search = ({onSearch, setLoading} : SearchProps) => {
    const [query, setQuery] = useState("")
    const [searchFocus, setSearchFocus] = useState(false)

    const searchRef = useRef<HTMLInputElement>(null)

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) =>{
        if(query !== ""){
            e.preventDefault();
            setLoading(true)
            onSearch(query)
        }
    }

    useEffect(()=>{
        searchRef.current?.focus()
    },[searchRef])

    return (
        <div className={`search-wraper ${searchFocus ? "search-focus" : ""}`}>
            <form onSubmit={handleSubmit} className="search-form">
                <input 
                    placeholder="Wpisz miasto..."
                    value={query}
                    onChange={e=>{ setQuery(e.target.value)}}
                    className="search-input"
                    ref={searchRef}
                    onFocus={()=>setSearchFocus(true)}
                    onBlur={()=>setSearchFocus(false)}
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