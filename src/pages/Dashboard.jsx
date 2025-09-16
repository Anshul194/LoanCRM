import React from 'react'
import OptionsBox from '../components/homepage/OptionsBox'
import MyTasks from '../components/homepage/MyTasks'
import MyLeads from '../components/homepage/MyLeads'
import SalesChart from '../components/homepage/SalesChart'
import EnquriesTable from '../components/homepage/EnquriesTable'

const Dashboard = () => {
  return (
    <div className='p-2 md:p-4 lg:p-6'>
        <OptionsBox/>
        <div className='flex flex-col lg:flex-row gap-8 min-h-96'>
            <MyTasks/>
            <MyLeads/>
        </div>
        <div className='flex mt-10 flex-col lg:flex-row gap-8 min-h-96'>
            <SalesChart/>
            {/* <MyLeads/> */}
            <EnquriesTable/>
        </div>
    </div>
  )
}

export default Dashboard