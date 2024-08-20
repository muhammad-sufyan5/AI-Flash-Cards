'use client';
import FlashcardDashboard from '@/components/dashboard/FlashcardDashboard';
import Navbar from '@/components/landing-page/Navbar';
import { useParams } from 'next/navigation';
import React from 'react'

const CardPage = () => {
  const params = useParams();
  let title = params?.title;
  if (Array.isArray(title)) {
    title = title.join(' ');
  }

  title = title?.replace(/-/g, ' ');

  return (
    <>
    {/* <Navbar/> */}
    <FlashcardDashboard title={title.toString()} />
    </>
  )
}

export default CardPage
