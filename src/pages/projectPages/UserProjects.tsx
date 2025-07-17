import React, { useState } from 'react'
import { useTheme} from '@/contexts/ThemeContext'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {NavLink, Link,useNavigate, useLocation} from 'react-router-dom'

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
  
} from "@/components/ui/card"
import {  Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
export default function UserProjects() {
    const {theme}=useTheme()
    const [showMobileMenu,setShowMobileMenu]=useState(false)
    const navigate=useNavigate()
    const userName='ak'
     const handleView= (id) => {
    navigate(`/project/${userName}/teams/${teamId}/projects/${id}`,{
      state: { id },
    });
  };
  const location=useLocation()
  const { teamId } = location.state || {};
  alert("dkfjd")
  

     

    const myTeam = [
  { 
    id: 1,
    tName: 'Tech-rex',
    admin: 'Asif',
    isCompleted: false
  },
  {
    id: 2,
    tName: 'Code Ninjas',
    admin: 'Neha',
    isCompleted: true
  },
  {
    id: 3,
    tName: 'AlgoWarriors',
    admin: 'Raj',
    isCompleted: false
  },
  {
    id: 4,
    tName: 'ByteForce',
    admin: 'Ishita',
    isCompleted: true
  },
  {
    id: 5,
    tName: 'Stack Hackers',
    admin: 'Aman',
    isCompleted: false
  },
  {
    id: 6,
    tName: 'Dev Drillers',
    admin: 'Nikita',
    isCompleted: true
  },
  {
    id: 7,
    tName: 'ScriptSquad',
    admin: 'Aditya',
    isCompleted: false
  },
  {
    id: 8,
    tName: 'UI Avengers',
    admin: 'Sana',
    isCompleted: true
  },
]
  return (
    <div>
        {/* //header */}
      




    <section
      className={`w-full  flex flex-col gap-6 p-4 rounded-xl shadow-2xl border backdrop-blur-xl 
        ${theme === 'dark' 
          ? 'bg-gradient-to-r from-black to-gray-800 border-white/30 text-white' 
          : 'bg-white/10 text-black'}`}
    >
      <h2 className="text-2xl font-semibold mb-4">TeamName projects</h2>
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className='hidden md:inline-block   justify-around '>
          <TabsTrigger value="overview" className='text-xs md:text-sm'>ALL</TabsTrigger>
          <TabsTrigger value="features" className='text-xs md:text-sm'>Your Projects</TabsTrigger>
          <TabsTrigger value="contact" className='text-xs md:text-sm'>Upcoming</TabsTrigger>
         <TabsTrigger value="completed"className='text-xs md:text-sm'>completed</TabsTrigger>
        </TabsList>
       

        <div className="md:hidden">
          <button onClick={(e)=>setShowMobileMenu(!showMobileMenu)}>
            <Menu/>
          </button> 
          {showMobileMenu&&(
             <TabsList className='w-auto p-2  flex  justify-around '>
          <TabsTrigger value="overview" className='text-xs md:text-sm'>ALL</TabsTrigger>
          <TabsTrigger value="features" className='text-xs md:text-sm'>Your Projects</TabsTrigger>
          <TabsTrigger value="contact" className='text-xs md:text-sm'>Upcoming</TabsTrigger>
         <TabsTrigger value="completed"className='text-xs md:text-sm'>completed</TabsTrigger>
        </TabsList>
          )}
        </div>

        <TabsContent value="overview">
            <div className="flex  flex-wrap justify-around ">
        {myTeam.map((e)=>[
     <Card className='m-4 w-full sm:w-auto '>
            <CardContent className="p-4">
               <Card className="w-full h-auto sm:w-60 sm:h-auto ">
      <CardHeader>
        <CardTitle className='text-sm sm:text-xl'>{e.tName}</CardTitle>
        <CardDescription >Admin: {e.admin}</CardDescription>
      </CardHeader>
      <CardContent>
        {/* you could put stats, avatars, etc. here */}
        <p className='text-sm'>
          Status:{" "}
          <span
            className={
              e.isCompleted
                ? "text-green-600 font-semibold"
                : "text-yellow-600 font-semibold"
            }
          >
            {e.isCompleted ? "Completed" : "In Progress"}
          </span>
        </p>
      </CardContent>
      <CardFooter className="justify-end">
        <button className="text-sm underline hover:no-underline" onClick={()=>handleView(e.id)}>
          View
        </button>
      </CardFooter>
    </Card>
            </CardContent>
          </Card>
        ])}
        </div>
        </TabsContent>

        <TabsContent value="features">
          <Card>
            <CardContent className="p-4">
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Fast and responsive UI</li>
                <li>Easy to integrate</li>
                <li>Highly customizable</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardContent className="p-4">
              <p className="text-muted-foreground">
                Reach us at <a href="mailto:support@example.com" className="text-blue-600 underline">support@example.com</a>
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>

    </div>
  )
}
