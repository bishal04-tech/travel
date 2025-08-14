import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import axiosInstance from '../../utils/axiosInstance'
import TravelStoryCard from '../../components/Cards/TravelStoryCard'
import { ToastContainer, toast } from 'react-toastify';
import {MdAdd} from "react-icons/md";
import Modal from 'react-modal'  
import AddEditTravelStory from './AddEditTravelStory'
import ViewTravelStory from './ViewTravelStory'
import EmptyCard from '../../components/Cards/EmptyCard'
import EmptyImg from '../../assets/images/add-story.jpg'
import { DayPicker } from 'react-day-picker'
import moment from 'moment'
import FilterInfoTitle from '../../components/Cards/FilterInfoTitle'
import { getEmptyCardMessage } from '../../utils/helper'
const Home = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] =useState(null);
  const [allStories, setAllStories] = useState([]);
  const [searchQuery,setSearchQuery]=useState('')

  const [filterType,setFilterType]=useState("")

  const [dateRange,setDateRange]=useState({ form: null, to: null})
  const [openAddEditModal,setOpenAppEditModal]=useState({
    isShown:false,
    type:"add",
    data:null,

  });
   const [openViewModal,setOpenViewModal]=useState({
     isShown:false,
     data:null
   })
  
  //get user info from local storage
  const getUserInfo=async()=>{
    try {
      const response = await axiosInstance.get('/api/get')

      if(response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if(error.response && error.response.status === 401) {
        // If unauthorized, redirect to login
        localStorage.clear();
        navigate('/api/login');
      }
    }
  }
    // Fetch all stories
    const getAllTravelStories = async () => {
      try {

        const response = await axiosInstance.get('/get-all-stories');
        if (response.data && response.data.stories) {
          setAllStories(response.data.stories);
        }
        
      } catch (error) {
        console.error('Error fetching stories:', error);
        if (error.response && error.response.status === 401) {
          // If unauthorized, redirect to login
          localStorage.clear();
          navigate('/api/login');
        }
      }  
    }

  const handleEdit = (data) => {
       setOpenAppEditModal({
        isShown:true,
        type:"edit",
        data:data
       })
  }

  const handleVewStory = (data) => {
    setOpenViewModal({
      isShown:true,
      data
    })
  }

  
   
  const updateIsFavourite = async (storyData) => {

  const storyId = storyData._id;

  // Optimistically update the UI
  setAllStories(prevStories =>
    prevStories.map(story =>
      story._id === storyId
        ? { ...story, isFavorite: !story.isFavorite }
        : story
    )
  );

  try {
    await axiosInstance.put(
      'update-is-favourite/' + storyId,
      { isFavorite: !storyData.isFavorite }
      
    );

    toast.success("Story Updated Successfully")
  } catch (error) {
    console.log('An unexpected error occurred. Please try again.');
    // If request fails, revert the change
    setAllStories(prevStories =>
      prevStories.map(story =>
        story._id === storyId
          ? { ...story, isFavorite: storyData.isFavorite }
          : story
      )
    );
  }
};

const deleteTravelStory=async(data)=>{
  const storyId=data._id;
  try {
    const response=await axiosInstance.delete('/delete-story/'+storyId)
    if(response.data && !response.data.error)
    {
      setOpenViewModal((prevState)=>({
        ...prevState,
        isShown:false
        
      }))
      getAllTravelStories();
    }
  } catch (error) {
    console.log("an erorr occured")
  }
}

const onSearchStory=async (query) =>{
   try {
    const response=await axiosInstance.get('/search',{
      params:{
        
         searchQuery: query,
      }
    })
    if(response.data && response.data.stories)
    {
      setFilterType("search");
      setAllStories(response.data.stories)
    }
  } catch (error) {
    console.log("an erorr occured due to bad request")
  }
}

const handleClearSearch=()=>{
  setFilterType("");
  getAllTravelStories();
}

//  const filterStoriesByDate=async(day)=>{
//     try {
//       const startDate=day.from ? moment(day.from).valueOf():null;

//       const endDate=day.to?moment(day.to).valueOf():null;

//       if(startDate && endDate)
//       {
//         const response=await axiosInstance.get('/travel-stories/filter',{
//           params:{startDate,endDate}
//         })
//       }

//       if(response.data && response.data.stories){
//         setFilterType("date");
//         setAllStories(response.data.stories)
//       }
//     } catch (error) {
//       console.log("An unexpected error occured when filtering by date")
//     }
//  }
const filterStoriesByDate = async (day) => {
  try {
    // require at least one boundary; optional: return all stories if none
    if (!day?.from && !day?.to) {
      console.warn('No date filter provided');
      return;
    }

    // include whole days (so filtering by the same day works)
    const startDate = day.from ? moment(day.from).startOf('day').valueOf() : undefined;
    const endDate   = day.to   ? moment(day.to).endOf('day').valueOf()   : undefined;

    // if both provided and start > end, swap them
    let params = {};
    if (startDate !== undefined && endDate !== undefined) {
      if (startDate > endDate) {
        console.warn('Start date is after end date — swapping them');
        params.startDate = endDate;
        params.endDate = startDate;
      } else {
        params.startDate = startDate;
        params.endDate = endDate;
      }
    } else {
      // include whichever boundary was provided
      if (startDate !== undefined) params.startDate = startDate;
      if (endDate !== undefined) params.endDate = endDate;
    }

    // make request (response defined here and available after await)
    const response = await axiosInstance.get('/travel-stories/filter', { params });

    // defensive checks
    if (response?.data?.stories) {
      setFilterType('date');
      setAllStories(response.data.stories);
    } else {
      console.warn('Filter returned no stories or unexpected payload', response?.data);
      setAllStories([]); // or keep previous, depending on desired UX
    }
  } catch (error) {
    // show detailed error in console so you can debug the server response
    console.error('Error filtering stories by date:', error.response?.data || error.message || error);
  }
};

 const handleDayClick=(day)=>{
    setDateRange(day);
    filterStoriesByDate(day);
  }
   const resetFilter=()=>{
     setDateRange({from:null,to:null})
     setFilterType("");
     getAllTravelStories();
   }
  useEffect(() => {
    getUserInfo();
    getAllTravelStories();
  }, []);
  return (
   <>
   <Navbar userInfo={userInfo}
    searchQuery={searchQuery} 
   setSearchQuery={setSearchQuery} 
   onSearchNote={onSearchStory}
   handleClearSearch={handleClearSearch}
  />
   <div className='container mx-auto py-10'>
            <FilterInfoTitle
            filterType={filterType}
            filterDates={dateRange}
            onClear={()=>{
               resetFilter();
            }}
            />
    
          <div className='flex gap-7'>
            <div className='flex-1 grid grid-cols-1 sm:grid-cols-2 gap-7'>
                {allStories.length > 0 ? (
                 allStories.map((item)=>{
                  return (
                    <TravelStoryCard
                    key={item._id}
                    imgUrl={item.imageUrl}
                    title={item.title}
                    story={item.story}
                    date={item.visitedDate}
                    visitedLocation={item.visitedLocation}
                    isFavorite={item.isFavorite}
                   
                    onClick={()=>handleVewStory(item)}
                    onFavoriteClick={()=>updateIsFavourite(item)}
                    />
                  )
                 })
                ): (
                  <EmptyCard imgSrc={EmptyImg} message={getEmptyCardMessage(filterType)}/>
                )}
            </div>

            <div className='w-[340px]'>
              
             <div className='bg-white border border-slate-200 shadow-lg 
             shadow-slate-200/60 rounded-lg'>
             <div className='p-3'>
                <DayPicker
                captionLayout="dropdown-buttons"
                mode="range"
                selected={dateRange}
                onSelect={handleDayClick}
                pagedNavigation
                />
             </div>
             </div>

               </div>

            
          </div>
   </div>
     {/* view travel story model */}
   <Modal
      isOpen={openAddEditModal.isShown}
      onRequestClose={()=>{}}
      style={{
        overlay:{
          backgroundColor:"rgba(0,0,0,0.2)",
          zIndex:999,

        }
      }}
      appElement={document.getElementById("root")}
      className="modal-box"
     >
      <AddEditTravelStory
      type={openAddEditModal.type}
      storyInfo={openAddEditModal.data}
      onClose={()=>{
        setOpenAppEditModal({
          isShown:false,
          type:"add",
          data:null
        })
      }}
      getAllTravelStories={getAllTravelStories}
      />
     </Modal>
       <Modal
      isOpen={openViewModal.isShown}
      onRequestClose={()=>{}}
      style={{
        overlay:{
          backgroundColor:"rgba(0,0,0,0.2)",
          zIndex:999,

        }
      }}
      appElement={document.getElementById("root")}
      className="modal-box"
     >
      <ViewTravelStory
       
       storyInfo={openViewModal.data || null} 
       onClose={()=>{
        setOpenViewModal((prevState)=>({
           ...prevState,isShown:false
        })

        )
       }}
       onEditClick={()=>{
           setOpenViewModal((prevState)=>({
           ...prevState,isShown:false
        })

        )
        handleEdit(openViewModal.data || null)

       }}
       onDeleteClick={()=>{
        deleteTravelStory(openViewModal.data || null)
       }}
      />
     </Modal>

      <button
    className="fixed right-10 bottom-10 w-16 h-16 flex items-center justify-center rounded-full bg-[#0586D3] hover:bg-cyan-400 z-[9999]"
     onClick={()=>{
        setOpenAppEditModal({
          isShown:true,
          type:"add",
          data:null,
        })
      }}
  >
  <MdAdd className="text-[32px] text-white"/>
   </button>

    
   <ToastContainer  />
  
   </>
  )
}

export default Home