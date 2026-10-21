import { useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'chat-with-myself:messages';

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
  } catch {
    return [];
  }
}

export default function App() {
  const [messages, setMessages] = useState(load);
  const [draft, setDraft] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // storage unavailable (private mode etc.); chat still works for this session
    }
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function send(e) {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setMessages((m) => [...m, { id: crypto.randomUUID(), text, at: Date.now() }]);
    setDraft('');
  }

  function remove(id) {
    setMessages((m) => m.filter((x) => x.id !== id));
  }

  function clearAll() {
    if (messages.length && window.confirm('Delete the whole conversation?')) setMessages([]);
  }

  return (
    <div className="chat">
      <header>
        <h1>Chat with Myself</h1>
        <button className="ghost" onClick={clearAll} disabled={!messages.length}>
          Clear
        </button>
      </header>

      <main>
        {messages.length === 0 && <p className="empty">Nothing here yet. Say something to yourself.</p>}
        {messages.map((m) => (
          <div className="bubble" key={m.id}>
            <p>{m.text}</p>
            <footer>
              <time>{new Date(m.at).toLocaleString()}</time>
              <button className="ghost" onClick={() => remove(m.id)} aria-label="Delete message">
                ✕
              </button>
            </footer>
          </div>
        ))}
        <div ref={bottomRef} />
      </main>

      <form onSubmit={send}>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Message yourself…"
          autoFocus
        />
        <button type="submit" disabled={!draft.trim()}>
          Send
        </button>
      </form>
    </div>
  );
}
