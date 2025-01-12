"use client";
import BackButton from '@/components/back-button'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { findPlaces, formatTimestamp } from '@/lib/utils'
import React, { useState } from 'react'
import { PiCaretLeftBold } from 'react-icons/pi'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import Map from '@/components/map';
import { MapPin, Search } from 'lucide-react'
import { AnimatePresence, motion } from "framer-motion"
import AdvancedSearchBar from './components/location-search';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { addPost } from '@/lib/firebase/posts';
import { getAuth } from 'firebase/auth';
import { redirect } from 'next/navigation';
import { db } from '@/lib/firebase/firebaseConfig';
import { FieldValue, Firestore, serverTimestamp } from 'firebase/firestore';

const Page = () => {

    const auth = getAuth();
    const [query, setQuery] = useState<any>("");
    const [fullQuery, setFullQuery] = useState<any>("");
    const [marker, setMarker] = useState<any[]>([]);
    
    const formSchema = z.object({
        reportType: z.string().nonempty(),
        title: z.string().nonempty(),
        description: z.string().nonempty(),
        location: z.string().nonempty(),
    });
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        },
      })

    const onSubmit = (values: any) => {
        addPost({
            category: values.reportType,
            content: values.description,
            createdAt: serverTimestamp(),
            likes: 0,
            dislikes: 0,
            feedback: [],
            image_url: "",
            isResolved: false,
            location: values.location,
            title: values.title,
            user: "Anonymous",
            userId: auth.currentUser?.uid,
        });
        redirect("/feed");
    };

  return (
    <div className='flex flex-col gap-2 pt-4'>
        <div className='flex gap-2 justify-between items-center py-1 p-4'>
            <BackButton />
            <p className='font-bold'>Submit a New Report</p>
            <p className='text-sm font-bold text-gray opacity-0'>Next</p>
        </div>
        <Separator />
        <Card className='rounded-none'>
            <div className="flex items-center gap-4 p-4">
                <div className="relative h-10 w-10">
                    <div className="flex justify-center items-center bg-slate-500 h-12 aspect-square rounded-full">D</div>
                </div>
                <div className="space-y-1">
                    <div className="flex flex-col gap-1">
                        <span className="font-medium">{"user"}</span>
                        <p className="text-xs">{formatTimestamp(new Date())}</p>
                    </div>
                </div>
            </div>
        </Card>

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col space-y-3 px-4'>
                <FormField
                    control={form.control}
                    name='reportType'
                    render={({ field }) => (
                        <FormItem>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Type of Report" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent className='bg-white'>
                                <SelectItem value="health">Health</SelectItem>
                                <SelectItem value="violence">Violence</SelectItem>
                                <SelectItem value="drug & crime">Drug & Crime</SelectItem>
                                <SelectItem value="infrastructure">Infrastructure</SelectItem>
                                <SelectItem value="incident">Incident</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <Input placeholder="Enter a brief title for the issue" {...field} className='p-0 px-2 text-sm' />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <Textarea placeholder="Provide a detailed description of the issue" {...field} className='py-2 px-3 text-sm h-32' />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <div>
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <Input placeholder="Enter the location of the issue" {...field} className='p-0 px-2 text-sm' />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                    <Map markers={[fullQuery]} />
                </div>
                <button type="submit" className='bg-blue text-white rounded-md py-2'>Submit</button>
            </form>
        </Form>
    </div>
  )
}

export default Page