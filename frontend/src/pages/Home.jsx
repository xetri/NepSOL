import React from 'react'

import Navbar from '../Components/Navbar/Navbar'
import Body from '../Components/Body/Body'
import Features from '../Components/Contents/Features'
import TestimonialSection from '../Components/Comments/TestimonialSection'
import Footer from '../Components/Last/Footer'

export default function Home() {
    return (<>
        <Navbar/>
        <Body/>
        <Features/>
        <TestimonialSection/>
        <Footer/>
      </>)
}