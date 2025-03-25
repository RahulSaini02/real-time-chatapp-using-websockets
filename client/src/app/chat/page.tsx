import { ChatInbox } from '@/components/UI/Chat/ChatInbox'
import { ChatWindow } from '@/components/UI/Chat/ChatWindow'
import React from 'react'

const chat = () => {
  return (
    <div className="min-h-screen font-[family-name:var(--font-nunito-sans)] bg-white/90 grid grid-cols-12 text-secondary">
      <div className='grid col-span-3 bg-white'>
        <ChatInbox />
      </div>
      <div className='grid col-span-9 bg-white/70'>
        <ChatWindow />
      </div>
    </div>
  )
}

export default chat