import { Eye, MessageSquareDot, ThumbsUp } from 'lucide-react'
import React from 'react'

const SuggestPostCard = () => {
  return (
    <div className="my-3">
          <div className="p-5 rounded-lg border">
            <h2 className="text-sm">Campus Buddy App</h2>
            <p className="text-xs mt-2 text-muted-foreground">
              Lorem ipsum dolor. Reicien, quas quisquam soluta aut eaque? Eius
            </p>
            <div className="flex mt-3 gap-4 text-gray-600 text-sm">
              <div className="flex items-center gap-1">
                <Eye size={14} /> {20}
              </div>
              <div className="flex items-center gap-1">
                <MessageSquareDot size={14} /> {10}
              </div>
              <div className="flex items-center gap-1">
                <ThumbsUp size={14} /> {100}
              </div>
            </div>
          </div>
        </div>
  )
}

export default SuggestPostCard