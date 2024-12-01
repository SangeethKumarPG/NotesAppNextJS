"use client";
import React, { useState, useTransition } from "react";
import * as Y from "yjs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { BotIcon, LanguagesIcon } from "lucide-react";
import { toast } from "sonner";



type Language =
  | 'malayalam'
  | "english"
  | "spanish"
  | "portuguese"
  | "french"
  | "german"
  | "italian"
  | "japanese"
  | "korean"
  | "russian"
  | "chinese"
  | "arabic"
  | "hebrew"
  | "urdu"
  | "hindi";

const languages: Language[] = [
  'english',
  'spanish',
  'portuguese',
  'french',
  'german',
  'italian',
  'japanese',
  'korean',
  'russian',
  'chinese',
  'arabic',
  'hebrew',
  'urdu',
  'hindi',
  'malayalam'
];
import Markdown from "react-markdown";

function TranslateDocument({ doc }: { doc: Y.Doc }) {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      // console.log("Raw document store : ", doc.get('document-store'));
      const documentData = doc.get('document-store').toJSON();
      // console.log("Document data: ", documentData);
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/translatedocument`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            documentData,
            targetLanguage: language
          })
        }
      );

      if(res.ok){
        const response = await res.json();
        // console.log("Translated text: ", response.translatedText);
        setSummary(response?.translatedText?.translated_text);
        toast.success('Document translated successfully');
      }
    })
  }

  return <Dialog open={isOpen} onOpenChange={setIsOpen}>
    <Button asChild variant={"outline"}><DialogTrigger><LanguagesIcon />Translate</DialogTrigger></Button>

    <DialogContent>
      <DialogHeader>
        <DialogTitle>Translate the document</DialogTitle>
        <DialogDescription>
          Select a language and the AI will translate the summary of the document into the selected language.
        </DialogDescription>
        <hr className="mt-5" />
        {question && <p className="mt-5 text-gray-500">Q: {question}</p>}
      </DialogHeader>

      { summary && (
        <div className="flex flex-col items-start gap-2 max-h-96 overflow-y-scroll p-5 bg-gray-100">
          <div className="flex">
            <BotIcon className="w-10 flex-shrink-0"/>
            <p className="font-bold">
              AI {isPending? 'is thinking...':'Says:'}
            </p>
          </div>
          <div>{isPending? <p>'Thinking...'</p>: <Markdown>{summary}</Markdown>}</div>
        </div>
      ) 

      }
      <form onSubmit={handleAskQuestion} className='flex gap-2'>
        <Select value={language} onValueChange={(value) => setLanguage(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a language" />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang} value={lang}>
                {lang}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button type='submit' disabled={!language || isPending}>{isPending ? 'Translating...' : 'Translate'}</Button>
      </form>

    </DialogContent>
  </Dialog>;
}

export default TranslateDocument;
