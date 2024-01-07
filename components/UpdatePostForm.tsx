import { useEditPost, usePostForm } from '@/atom'
import Link from 'next/link'
import React from 'react'
import QuillEditorUpdate from './QuillEditorUpdate';

type Props = {
    title: string,
    content: string,
    error: string,
    handleSubmit: (post: any)=> void
}

const UpdatePostForm = ({title, content, error, handleSubmit}:Props) => {

  const { postForm, setPostForm } = usePostForm();

  const handleChange = (event: any) => {
    setPostForm({...postForm, content: event})
}

  return (
    <>
    <div className='p-20 bg-font-blue'>
        <div className='grid grid-rows-3 grid-flow-col gap-4'>
            <section className='m-auto row-span-3 h-screen bg-fixed bg-right bg-cover bg-deep-safari'>
                <div className='p-20'>
                    <h1 className='text-center font-mono' style={{fontSize:"2rem"}}>...Update POST...</h1>
                </div>
            </section>
            <div className='col-span row-span-3 pt-20'>
                <form onSubmit={handleSubmit}>
                    <div className="sm:col-span-4">
                        <label htmlFor="title" className="block text-sm font-medium leading-6 text-font-sand p-2 text-center">Title</label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input onChange={(e) => setPostForm({...postForm, title: e.target.value})} defaultValue={title} type="text" name="title" id="title" autoComplete="title" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder=" Next js..." />
                                </div>
                            </div>
                        <label htmlFor="content" className="block text-sm font-medium leading-6 text-font-sand p-2 text-center">Content</label>
                            <div className='bg-white'>
                                <QuillEditorUpdate value={content} onChange={handleChange} />
                            </div>
                            {/* <div className="mt-2">
                                <textarea onChange={(e) => setPostForm({...postForm,content: e.target.value})} defaultValue={content} id="content" name="content" rows={3} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                            </div> */}
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button type="submit" className="rounded-md bg-font-sand px-3 py-2 text-sm font-semibold text-deep-blue shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save change</button>
                        { error && (
                            <p className='bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2'>
                                {error}
                            </p>
                            )
                        }
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div className='p-5 bg-deep-header text-center'>
        <Link href="/dashboard" className='font-mono hover:outline-double'>...Back home...</Link>
    </div>
</>
  )
}

export default UpdatePostForm