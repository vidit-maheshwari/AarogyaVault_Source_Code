import React from 'react'
import FileUpload from './FileUpload'
import PrescriptionGrid from './PriscriptionGrid'
import UserCard from './UserCard'
import FileUpload2 from './FileUpload2'

function Home() {
  return (
    <div>
        <div className='flex mt-5 justify-center gap-10'>
        <FileUpload2 /> 
        <UserCard />
        </div>
     
      <PrescriptionGrid/>
    </div>
  )
}

export default Home



