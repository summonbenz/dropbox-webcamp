import { db } from '@/db';

async function getMessages() {
  return await db.message.findMany();
}

export default async function Wall() {
  const messages = await getMessages()

  return (
    <div>
      <h1>All Posts</h1>
      <ul>
        {messages.map((message) => (
          <li key={message.mid}>{message.message}</li>
        ))}
      </ul>
    </div>
  );
}