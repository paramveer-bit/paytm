import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='flex justify-center items-center flex-col gap-10'>
      <h1 className='text-4xl font-bold mt-10'>SignUp Page</h1>
      <SignUp />
    </div>
  )
}

// hiiiiiiiii