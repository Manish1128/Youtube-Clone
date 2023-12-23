import React, {useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'

// import {setResult} from "useState"
import { fetchDataFromApi } from "../utils/api"
import { Context } from '../context/contextApi'
import LeftNav from "./LeftNav"
import SearchResultVideoCard from "./SearchResultVideoCard"

const SearchResult = () => {
  // here i got a robust error , i spent 2 hours to debug it after that i found that it was silly typo mistake i wrote {} instead of []
  const [ result, setResult ] = useState();
  const {searchQuery} =useParams();
  const {setLoading} = useContext(Context);

  useEffect(() => {
    document?.getElementById("root")?.classList?.remove("custom-h");
    fetchSearchResults();
  }, [searchQuery]);

  const fetchSearchResults = () => {
    setLoading(true);
    fetchDataFromApi(`search/?q=${searchQuery}`).then((res) => {
      console.log(res);
      setResult(res?.contents);
      setLoading(false);
    })
  }

  return (
    <div className='flex flex-row h-[calc(100%-56px)]'>
      <LeftNav/>
      <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
        <div className="grid grid-cols-1 gap-2 P-5">
          {result?.map((item) => {
            if (item?.type !== "video") return false;
            let video = item.video
            return (
              <SearchResultVideoCard key={video.videoId} video={video}/>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SearchResult
