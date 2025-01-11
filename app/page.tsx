import Background from '/public/background.svg'

export default function Page() {
  return (
    <div className="min-h-screen bg-[url('/background.svg')] bg-no-repeat bg-cover bg-blue-dark text-white">
      <div className='flex flex-col items-center pt-20'>
        <h1 className='text-5xl font-bold'>CitiSync</h1>
        <p className='text-sm'>Your City, Your Voice, Our Sync</p>
      </div>
    </div>
  )
}