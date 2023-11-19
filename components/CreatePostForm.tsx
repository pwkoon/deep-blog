import Link from 'next/link'
import React from 'react'

const CreatePostForm = () => {
  return (
    <>
        <div className='p-5 h-screen bg-deep-blue'>
            <div>
                <h1 className='font-mono text-xl p-4'>Create. your own POST..</h1>
                <Link href="/dashboard">Back to dashboard</Link>
            </div>
            <form>
                <div className="sm:col-span-4">
                    <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">Title</label>
                        <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <input type="text" name="title" id="title" autoComplete="title" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder=" Next js..." />
                            </div>
                        </div>
                    <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">Content</label>
                        <div className="mt-2">
                            <textarea id="about" name="about" rows={3} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                        </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                </div>
            </form>
        </div>
    </>
  )
}

export default CreatePostForm