import React, { useState } from 'react'
import { useRevalidator } from 'react-router-dom'
import "../styles/Tasks.css";

const SERVER_BASE = import.meta.env.VITE_Tasks_SERVER_URL

export default function TaskCreatorComp() {
  const revalidator = useRevalidator()
  const [title, setTitle] = useState('')
  const [descriptionShort, setDescriptionShort] = useState('')
  const [descriptionFull, setDescriptionFull] = useState('')
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Low')
  const [dueDate, setDueDate] = useState('') // YYYY-MM-DD
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!title.trim()) {
      setError('Title is required')
      return
    }

    const payload = {
      id: Date.now(),
      title: title.trim(),
      description_short: descriptionShort.trim(),
      description_full: descriptionFull.trim(),
      isCompleted: false,
      priority,
      dueDate: dueDate || null
    }

    setSubmitting(true)
    try {
      const url = `${SERVER_BASE.replace(/\/$/, '')}`
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) {
        const text = await res.text()
        throw new Error(`${res.status} ${res.statusText} - ${text}`)
      }
      const created = await res.json()
      // revalidate loader so task list refreshes
      try { revalidator.revalidate() } catch {}
      // clear form on success
      setTitle('')
      setDescriptionShort('')
      setDescriptionFull('')
      setPriority('Low')
      setDueDate('')
      alert('Task created' + (created?.id ? ` (id: ${created.id})` : ''))
    } catch (err: any) {
      setError(err?.message ?? String(err))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="task-creator" onSubmit={handleSubmit}>
      {error && <div className="error" role="alert">{error}</div>}

      <label>
        <div className="label-text">Title</div>
        <input
          className="input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>

      <label>
        <div className="label-text">Short description</div>
        <input
          className="input"
          type="text"
          value={descriptionShort}
          onChange={(e) => setDescriptionShort(e.target.value)}
        />
      </label>

      <label>
        <div className="label-text">Full description</div>
        <textarea
          className="input"
          value={descriptionFull}
          onChange={(e) => setDescriptionFull(e.target.value)}
          rows={6}
        />
      </label>

      <label>
        <div className="label-text">Priority</div>
        <select className="input" value={priority} onChange={(e) => setPriority(e.target.value as any)}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </label>

      <label>
        <div className="label-text">Due date</div>
        <input className="input" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      </label>

      <div className="creator-actions">
        <button className="btn btn--primary" type="submit" disabled={submitting}>
          {submitting ? 'Creating...' : 'Create Task'}
        </button>
      </div>
    </form>
  )
}
