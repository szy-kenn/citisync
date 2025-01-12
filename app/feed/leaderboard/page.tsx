import { Leaderboard } from "./components/header";

export default function Page() {

    interface City {
        rank: number;
        name: string;
        score: number | string;
        imageUrl: string;
      }
      
      const cities: City[] = [
        {
          rank: 1,
          name: "Cebu City",
          score: 1200,
          imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-YVvNATv6sRw0TjtRJ3RmTJ4GcUMUeI.png"
        },
        {
          rank: 2,
          name: "Davao City",
          score: 1150,
          imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-YVvNATv6sRw0TjtRJ3RmTJ4GcUMUeI.png"
        },
        {
          rank: 3,
          name: "Makati City",
          score: 36,
          imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-YVvNATv6sRw0TjtRJ3RmTJ4GcUMUeI.png"
        },
        {
          rank: 4,
          name: "Dasmariñas City",
          score: 36,
          imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-YVvNATv6sRw0TjtRJ3RmTJ4GcUMUeI.png"
        },
        {
          rank: 5,
          name: "Baguio City",
          score: 36,
          imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-YVvNATv6sRw0TjtRJ3RmTJ4GcUMUeI.png"
        },
        {
          rank: 6,
          name: "Iloilo City",
          score: 36,
          imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-YVvNATv6sRw0TjtRJ3RmTJ4GcUMUeI.png"
        },
        {
          rank: 7,
          name: "Zamboanga City",
          score: 36,
          imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-YVvNATv6sRw0TjtRJ3RmTJ4GcUMUeI.png"
        },
        {
          rank: 4,
          name: "Manila",
          score: 36,
          imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-YVvNATv6sRw0TjtRJ3RmTJ4GcUMUeI.png"
        },
        {
          rank: 4,
          name: "Tagaytay City",
          score: 36,
          imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-YVvNATv6sRw0TjtRJ3RmTJ4GcUMUeI.png"
        },
        {
          rank: 4,
          name: "Quezon City",
          score: 36,
          imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-YVvNATv6sRw0TjtRJ3RmTJ4GcUMUeI.png"
        }
      ]
      

    return (
        <div>
            <Leaderboard title="City Leaderboard" subtitle="Top 10 Cities" date="September 2021" cities={cities} />
        </div>
    )
}