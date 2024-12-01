'use client';
import React, { FormEvent, useState, useTransition } from 'react'
import {
    Dialog,

    DialogContent,
    DialogDescription,

    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from './ui/button';
import { toast } from 'sonner';

import { Input } from './ui/input';
import * as Y from 'yjs';
import { BotIcon, MessageCircleCode } from 'lucide-react';
import Markdown from 'react-markdown';


function ChatToDocument({ doc }: {
    doc: Y.Doc
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [summary, setSummary] = useState('');
    const [question, setQuestion] = useState('');
    const [isPending, startTransition] = useTransition()

    const handleAskQuestion = async (e: FormEvent) => {
        e.preventDefault();
        setQuestion(input);
        startTransition(async () => {
            const documentData = doc.get('document-store').toJSON();
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/chattodocument`,
                // `http://localhost:8787/chattodocument`,
                {
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        documentData,
                        question:input
                    })
                }
            );
            if(res.ok){
                const {message} = await res.json();
                // console.log(message);
                setSummary(message?.response);
                setInput('');
                toast.success('Question asked successfully');
            }else{
                toast.error('Failed to ask question');
            }
        });
    }


    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button asChild variant={"outline"}><DialogTrigger><MessageCircleCode />Chat to Document</DialogTrigger></Button>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Chat to Document</DialogTitle>
                    <DialogDescription>
                        Ask a question and chat to the document with AI.
                    </DialogDescription>
                    <hr className='mt-5'/>
                    {
                        question && (<p className='mt-5 text-gray-500'>Q: {question}</p>)
                    }
                </DialogHeader>
                {summary && (
                    <div className="flex flex-col items-start gap-2 max-h-96 overflow-y-scroll p-5 bg-gray-100">
                        <div className="flex">
                            <BotIcon className="w-10 flex-shrink-0" />
                            <p className="font-bold">
                                AI {isPending ? 'is thinking...' : 'Says:'}
                            </p>
                        </div>
                        <div>{isPending ? <p>'Thinking...'</p> : <Markdown>{summary}</Markdown>}</div>
                    </div>
                )}

                <form onSubmit={handleAskQuestion} className='flex gap-2'>
                    <Input placeholder='i.e What is this about?' className='w-full' type='text' value={input} onChange={(e) => setInput(e.target.value)} />
                    <Button type='submit' disabled={!input || isPending}>{isPending ? 'Asking...' : 'Ask'}</Button>
                </form>

            </DialogContent>
        </Dialog>

    )
}

export default ChatToDocument;