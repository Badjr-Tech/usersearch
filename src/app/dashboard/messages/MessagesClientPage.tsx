'use client';

import { useState, useEffect, useRef, useActionState } from "react";
import { sendMessage, getIndividualMessages } from "./actions";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Message {
  id: number;
  senderId: number;
  recipientId: number;
  content: string;
  timestamp: Date;
  sender: User;
  recipient: User;
}

interface MessagesClientPageProps {
  initialExternalUsers: User[];
  currentUserId: number;
}

export default function MessagesClientPage({
  initialExternalUsers,
  currentUserId,
}: MessagesClientPageProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [sendState, sendAction] = useActionState(sendMessage, undefined);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (selectedUser) {
      async function fetchMessages() {
        const fetchedMessages = await getIndividualMessages(currentUserId, selectedUser.id);
        setMessages(fetchedMessages as Message[]);
      }
      fetchMessages();
    }
  }, [selectedUser, currentUserId, sendState]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* User List */}
      <div className="w-1/3 border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold">External Users</h2>
        </div>
        <ul className="overflow-y-auto">
          {initialExternalUsers.map((user) => (
            <li
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className={`p-4 cursor-pointer hover:bg-gray-100 ${
                selectedUser?.id === user.id ? "bg-gray-200" : ""
              }`}
            >
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Window */}
      <div className="w-2/3 flex flex-col">
        {selectedUser ? (
          <>
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold">{selectedUser.name}</h2>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex mb-4 ${
                    message.senderId === currentUserId ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`p-3 rounded-lg max-w-md ${
                      message.senderId === currentUserId
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    <p>{message.content}</p>
                    <p className="text-xs mt-1 text-right">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-gray-200">
              <form action={sendAction}>
                <input type="hidden" name="recipientId" value={selectedUser.id} />
                <div className="flex">
                  <input
                    type="text"
                    name="content"
                    placeholder="Type a message..."
                    className="flex-1 p-2 border border-gray-300 rounded-l-md"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-r-md"
                  >
                    Send
                  </button>
                </div>
                {sendState?.message && <p className="text-green-500 text-sm mt-2">{sendState.message}</p>}
                {sendState?.error && <p className="text-red-500 text-sm mt-2">{sendState.error}</p>}
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500">Select a user to start a conversation.</p>
          </div>
        )}
      </div>
    </div>
  );
}
