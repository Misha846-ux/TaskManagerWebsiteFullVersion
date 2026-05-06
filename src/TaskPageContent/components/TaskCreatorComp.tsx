import React, { useState } from 'react'
import { useRevalidator } from 'react-router-dom'
import "../styles/Tasks.css";

// const SERVER_BASE = import.meta.env.VITE_API_URL

export default function TaskCreatorComp() {
  const revalidator = useRevalidator()
  const [title, setTitle] = useState('')
  const [projectName, setProjectName] = useState('')
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

    setSubmitting(true)
    try {

      const projectId = await fetch(`${import.meta.env.VITE_API_URL}/Projects/by-name/${projectName.trim()}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
          'Content-Type': 'application/json'
        }
      }).then((res) => res.json()).then((project) => project?.id).catch(() => null);

      const payload = {
      taskName: title.trim(),
      description: descriptionFull.trim(),
      priority,
      deadline: dueDate || null,
      projectId: projectId,
    }

      const url = `${import.meta.env.VITE_API_URL}/Task/AddTask`
      const res = await fetch(url, {
        method: 'POST',
        headers: { 
          'Authorization':`Bearer ${localStorage.getItem("accessToken")}`,
          'Content-Type': 'application/json' },
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
      setProjectName('')
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
        <div className="label-text">Project</div>
        <input
          className="input"
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
      </label>

      <label>
        <div className="label-text">Description</div>
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