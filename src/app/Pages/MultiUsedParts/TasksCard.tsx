import React from 'react'
import "../../Styles/MultiUsedStyles/TasksCard.css"

export default function TasksCard(obj: {title: string, count: number}) {
  return (
    <div className='taskCardStyle'>
      <div className='taskTextStyle'>{obj.title}</div>
      <div className='taskTextStyle'>{obj.count}</div>
    </div>
  )
}
