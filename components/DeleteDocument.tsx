'use client';
import React, { useState, useTransition } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from './ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { deleteDocument } from '@/actions/actions';


function DeleteDocument() {
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition()
    const pathName = usePathname();
    const router = useRouter();

    const handleDelete = async () => {
        const roomId = pathName.split('/').pop();
        if(!roomId){
            return;
        }
        startTransition(async()=>{
            const {success} = await deleteDocument(roomId);

            if(success){
                setIsOpen(false);
                router.replace('/');
                toast.success("Room deleted successfully");
            }else{
                toast.error("Failed to delete room");
            }
        })

    }
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button asChild variant={"destructive"}><DialogTrigger>Delete</DialogTrigger></Button>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure that you want to delete this document?</DialogTitle>
                    <DialogDescription>
                        This will remove all the contents and the users from the document.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className='sm:justify-end gap-2'>
                    <Button type='button' variant={'destructive'} disabled={isPending} onClick={handleDelete}>{isPending ? 'Deleting...' : 'Delete'}</Button>
                    <DialogClose asChild>
                        <Button type='button' variant={'secondary'}>Close</Button>
                    </DialogClose>

                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default DeleteDocument