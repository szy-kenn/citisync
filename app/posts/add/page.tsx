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
        // const dummyReports = [
        //         {
        //           category: "Infrastructure",
        //           content: "Lubak na kalsada sa Maginhawa Street. Maraming motorsiklo at kotse ang nahihirapan dumaan. Mahigit 3 buwan na ganito ang kondisyon at hindi pa rin naaayos.",
        //           createdAt: serverTimestamp(),
        //           likes: 45,
        //           dislikes: 2,
        //           feedback: [
        //             "Same situation sa kabilang street",
        //             "Nagreport na ako sa barangay last week"
        //           ],
        //           image_url: "",
        //           isResolved: false,
        //           location: "Quezon City",
        //           title: "Damaged Road Needs Immediate Repair",
        //           user: "Anonymous",
        //           userId: "user123"
        //         },
        //         {
        //           category: "Health",
        //           content: "There's been an increase in dengue cases in our barangay. We need immediate fogging operations and clean-up drive. At least 5 cases reported this week alone.",
        //           createdAt: serverTimestamp(),
        //           likes: 89,
        //           dislikes: 0,
        //           feedback: [
        //             "My neighbor's child was also diagnosed yesterday",
        //             "We should organize a community clean-up"
        //           ],
        //           image_url: "",
        //           isResolved: false,
        //           location: "Parañaque",
        //           title: "Rising Dengue Cases in Brgy. Sun Valley",
        //           user: "Anonymous",
        //           userId: "user456"
        //         },
        //         {
        //           category: "Violence",
        //           content: "May nag-aaway na mga gang sa kanto tuwing gabi. Nagiging delikado na po ang situation lalo na sa mga estudyanteng pauwi ng gabi.",
        //           createdAt: serverTimestamp(),
        //           likes: 156,
        //           dislikes: 5,
        //           feedback: [
        //             "Nakita ko rin to kagabi",
        //             "Need more police patrol in the area"
        //           ],
        //           image_url: "",
        //           isResolved: false,
        //           location: "Manila",
        //           title: "Gang Violence in Sampaguita Street",
        //           user: "Anonymous",
        //           userId: "user789"
        //         },
        //         {
        //           category: "Education",
        //           content: "Our public elementary school needs more classrooms. Students are cramped in small rooms, some even having to share chairs. We need immediate attention from DepEd.",
        //           createdAt: serverTimestamp(),
        //           likes: 234,
        //           dislikes: 1,
        //           feedback: [
        //             "My child experiences this too",
        //             "We should write a formal petition"
        //           ],
        //           image_url: "",
        //           isResolved: false,
        //           location: "Caloocan",
        //           title: "Overcrowded Classrooms in Public School",
        //           user: "Anonymous",
        //           userId: "user101"
        //         },
        //         {
        //           category: "Environmental",
        //           content: "Grabe ang illegal dumping sa creek. Kapag bumabaha, lalong lumalalim dahil sa dumi. Kailangan ng regular cleanup at bantay para mahuli ang mga illegal dumpers.",
        //           createdAt: serverTimestamp(),
        //           likes: 67,
        //           dislikes: 3,
        //           feedback: [
        //             "Nakakita ako ng truck kagabi nagbababa ng basura",
        //             "Let's organize weekly cleanup drive"
        //           ],
        //           image_url: "",
        //           isResolved: false,
        //           location: "Marikina",
        //           title: "Illegal Dumping in Creek",
        //           user: "Anonymous",
        //           userId: "user202"
        //         },
        //         {
        //           category: "Public Services",
        //           content: "No water supply for 3 days now. Maynilad hasn't given any proper advisory. Many residents are struggling, especially the elderly.",
        //           createdAt: serverTimestamp(),
        //           likes: 321,
        //           dislikes: 4,
        //           feedback: [
        //             "Same situation in Block 5",
        //             "Called Maynilad hotline but no response"
        //           ],
        //           image_url: "",
        //           isResolved: false,
        //           location: "Parañaque",
        //           title: "Extended Water Service Interruption",
        //           user: "Anonymous",
        //           userId: "user303"
        //         },
        //         {
        //           category: "Transportation",
        //           content: "Kulang ang mga jeep sa umaga. Mahigit 1 oras na pila bago makasakay. Maraming late na sa trabaho at eskwela. Sana madagdagan ang units.",
        //           createdAt: serverTimestamp(),
        //           likes: 178,
        //           dislikes: 2,
        //           feedback: [
        //             "Everyday ganito sa terminal",
        //             "Need more transport options here"
        //           ],
        //           image_url: "",
        //           isResolved: false,
        //           location: "Quezon City",
        //           title: "Lack of Public Transportation",
        //           user: "Anonymous",
        //           userId: "user404"
        //         }
        //       ];

        // dummyReports.forEach(async report => {
        //     await addPost(report);
        // });
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