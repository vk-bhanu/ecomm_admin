"use client"
import { DataTable } from '@/components/custom ui/DataTable'
import React, { useEffect, useState } from 'react'
import { columns } from '@/components/collections/CollectionColumns'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useRouter } from 'next/navigation'
import Loader from '@/components/custom ui/Loader'

const Collections = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true)
  const [collections, setCollections] = useState([])
 
  const getCollections = async () => {
    try{
        const res = await fetch("/api/collections", {
            method: "GET",
        });

        const data = await res.json()
        setCollections(data)
        setLoading(false)
    } catch (err){
        console.log("[collections_GET]", err)
    }
  }

  useEffect(() => {
    getCollections()
  },[])

  return loading ? <Loader /> : (
    <div className='px-10 py-5'>
      <div className='flex items-center justify-between'>
        <p className='text-heading2-bold'>Collections</p>
        <Button className='bg-blue-600 text-white' onClick={() => router.push("/collections/new")} >
            <Plus className='h-4 w-4 mr-2'/>
            Create Collection
        </Button>
      </div>
      <Separator className='my-4 bg-blue-600'/>
      <DataTable columns={columns} data={collections} searchKey="title"/>
    </div>
  )
}

export default Collections