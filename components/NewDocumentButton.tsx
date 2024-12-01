'use client'
import React, { useTransition } from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation';
import { createNewDocument } from '@/actions/actions';

function NewDocumentButton() {
    const [isPending, startTransition] = useTransition();
    const router = useRouter(); //next navigation hook
    const handleCreateNewDocument = () => {
        startTransition(async()=>{
            const {docId} = await createNewDocument();
            router.push(`/document/${docId}`);
        })
    }
  return (
    <div>
        <Button onClick={handleCreateNewDocument} disabled={isPending}>
            {isPending? 'Creating...' : 'Create New Document'}    
        </Button>
    </div>
  )
}

export default NewDocumentButton