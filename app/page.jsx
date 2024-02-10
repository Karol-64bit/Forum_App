import React from 'react'
import AllSections from './(components)/AllSections'
import Settings from '@/app/(models)/Settings'
import Description from './(components)/Description'
import Footer from './(components)/Footer'

const Home = async () => {

  const settings = await Settings.findOne();
  
  return (
    <div>
      {settings.displayDescription ? <Description/> : " "}

      <AllSections />

      {settings.displayFooter ? <Footer/> : " "}
    </div>
  )
}

export default Home
