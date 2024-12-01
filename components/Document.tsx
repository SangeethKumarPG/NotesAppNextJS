'use client';
import React, { FormEvent, useEffect, useState, useTransition } from 'react'
import { Input } from './ui/input';
import { Button } from './ui/button';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase';

import { useDocument } from 'react-firebase-hooks/firestore';
import useOwner from '@/lib/useOwner';
import Editor from './Editor';
import DeleteDocument from './DeleteDocument';
import InviteUser from './InviteUser';
import ManageUsers from './ManageUsers';
import Avatars from './Avatars';

function Document({ id }: { id: string }) {
    const [data, loading, error] = useDocument(doc(db, 'documents', id));
    const [input, setInput] = useState('');
    const [isUpdating, startTransition] = useTransition();
    const isOwner = useOwner();
    useEffect(() => {
        if (data) {
            setInput(data?.data()?.title)
        }
    }, [data])

    const updateTitle = (e: FormEvent) => {
        e.preventDefault();

        if (input.trim()) {
            startTransition(async () => {
                await updateDoc(doc(db, 'documents', id), {
                    title: input
                })
            })
        }
    }
    return (
        <div className='flex-1 h-full bg-white p-5 '>
            <div className='flex max-w-6xl mx-auto justify-between p-5'>
                <form onSubmit={updateTitle} className='flex flex-1 space-x-2'>
                    {/* update title */}
                    <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter title" />
                    <Button disabled={isUpdating} type='submit'>{isUpdating ? 'Updating...' : 'Update'}</Button>
                    {isOwner && (
                        <>
                            <InviteUser />
                            <DeleteDocument />
                        </>
                        
                    )}
                </form>
            </div>
            <div className='flex max-w-6xl mx-auto justify-between  items-center mb-5'>
                {/* Manage users */}
                    <ManageUsers/>

                {/* Avatars */}
                <Avatars/>
            </div>
            <hr className='pb-10' />

            {/* Collaborative editor */}
            <Editor />
        </div>
    )
}

export default Document