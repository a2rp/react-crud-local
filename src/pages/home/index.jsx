import { useEffect, useMemo, useState } from "react";
import { MdAdd, MdCheckCircle, MdDeleteOutline, MdEdit, MdStorage } from "react-icons/md";
import { Styled } from "./styled";

const STORAGE_KEY = "react-crud-local-items";
const starterItems = [{
    id: "welcome-record",
    title: "Welcome to your local workspace",
    details: "Create, update and remove records without a backend.",
    completed: false,
    updatedAt: new Date().toISOString(),
}];

const readItems = () => {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
        return Array.isArray(saved) ? saved : starterItems;
    } catch { return starterItems; }
};

const makeId = () => typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `record-${Date.now()}`;
const formatDate = (value) => new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));

const Home = () => {
    const [items, setItems] = useState(readItems);
    const [form, setForm] = useState({ title: "", details: "" });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); }, [items]);

    const completedCount = useMemo(() => items.filter((item) => item.completed).length, [items]);
    const handleChange = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    const resetForm = () => { setForm({ title: "", details: "" }); setEditingId(null); };

    const handleSubmit = (event) => {
        event.preventDefault();
        const title = form.title.trim();
        const details = form.details.trim();
        if (!title) return;
        const updatedAt = new Date().toISOString();

        if (editingId) {
            setItems((current) => current.map((item) => item.id === editingId ? { ...item, title, details, updatedAt } : item));
        } else {
            setItems((current) => [{ id: makeId(), title, details, completed: false, updatedAt }, ...current]);
        }
        resetForm();
    };

    const editItem = (item) => { setEditingId(item.id); setForm({ title: item.title, details: item.details }); };
    const deleteItem = (id) => { setItems((current) => current.filter((item) => item.id !== id)); if (editingId === id) resetForm(); };
    const toggleItem = (id) => setItems((current) => current.map((item) => item.id === id ? { ...item, completed: !item.completed, updatedAt: new Date().toISOString() } : item));
    const clearItems = () => { setItems([]); resetForm(); };

    return (
        <Styled.Wrapper>
            <Styled.Hero>
                <div>
                    <span className="eyebrow">LOCAL CRUD WORKSPACE</span>
                    <h1>Keep small records simple.</h1>
                    <p>A focused React workspace for creating, editing and managing records directly in your browser.</p>
                </div>
                <div className="storageBadge"><MdStorage aria-hidden="true" /><span><strong>Private by default</strong><small>Saved in localStorage</small></span></div>
            </Styled.Hero>
            <Styled.Stats>
                <article><strong>{items.length}</strong><span>Total records</span></article>
                <article><strong>{completedCount}</strong><span>Completed</span></article>
                <article><strong>{items.length - completedCount}</strong><span>Open records</span></article>
            </Styled.Stats>
            <Styled.ContentGrid>
                <Styled.FormCard>
                    <div className="cardHeading"><div><span className="eyebrow">{editingId ? "UPDATE RECORD" : "NEW RECORD"}</span><h2>{editingId ? "Edit a record" : "Add a record"}</h2></div><MdAdd aria-hidden="true" /></div>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="record-title">Title</label>
                        <input id="record-title" name="title" value={form.title} onChange={handleChange} placeholder="e.g. Plan the next release" maxLength={80} required />
                        <label htmlFor="record-details">Details</label>
                        <textarea id="record-details" name="details" value={form.details} onChange={handleChange} placeholder="Add a short note" rows={5} maxLength={240} />
                        <div className="formActions">
                            <button type="submit">{editingId ? <MdEdit aria-hidden="true" /> : <MdAdd aria-hidden="true" />}{editingId ? "Update record" : "Add record"}</button>
                            {editingId && <button type="button" className="quiet" onClick={resetForm}>Cancel</button>}
                        </div>
                    </form>
                </Styled.FormCard>
                <Styled.ListCard>
                    <div className="listHeader"><div><span className="eyebrow">YOUR RECORDS</span><h2>Recent activity</h2></div>{items.length > 0 && <button type="button" className="quiet" onClick={clearItems}>Clear all</button>}</div>
                    {items.length === 0 ? (
                        <div className="emptyState"><MdStorage aria-hidden="true" /><strong>Your workspace is empty</strong><span>Add a record to get started.</span></div>
                    ) : (
                        <div className="recordList">
                            {items.map((item) => (
                                <article className={item.completed ? "record completed" : "record"} key={item.id}>
                                    <button type="button" className="recordCheck" onClick={() => toggleItem(item.id)} aria-label={item.completed ? "Mark as open" : "Mark as complete"} title={item.completed ? "Mark as open" : "Mark as complete"}><MdCheckCircle aria-hidden="true" /></button>
                                    <div className="recordBody"><h3>{item.title}</h3><p>{item.details || "No details added."}</p><small>Updated {formatDate(item.updatedAt)}</small></div>
                                    <div className="recordActions"><button type="button" onClick={() => editItem(item)} aria-label="Edit record" title="Edit record"><MdEdit aria-hidden="true" /></button><button type="button" onClick={() => deleteItem(item.id)} aria-label="Delete record" title="Delete record"><MdDeleteOutline aria-hidden="true" /></button></div>
                                </article>
                            ))}
                        </div>
                    )}
                </Styled.ListCard>
            </Styled.ContentGrid>
        </Styled.Wrapper>
    );
};

export default Home;
