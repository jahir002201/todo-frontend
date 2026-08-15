"use client";

import { FormEvent, useEffect, useState } from "react";

import {
  createTodo,
  Todo,
  updateTodo,
} from "@/lib/api";
import { getAccessToken } from "@/lib/auth";

interface Props {
  todo?: Todo | null;
  onSaved: (todo: Todo) => void;
  onCancel?: () => void;
}

export default function TodoForm({
  todo,
  onSaved,
  onCancel,
}: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description || "");
      setCompleted(todo.completed);
    } else {
      setTitle("");
      setDescription("");
      setCompleted(false);
    }
  }, [todo]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const token = getAccessToken();

    if (!token) {
      setError("You are not logged in.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      if (todo) {
        const updated = await updateTodo(token, todo.id, {
          title,
          description,
          completed,
        });

        onSaved(updated);
      } else {
        const created = await createTodo(token, {
          title,
          description,
          completed,
        });

        onSaved(created);

        setTitle("");
        setDescription("");
        setCompleted(false);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border bg-white p-6 shadow-sm"
    >
      <h2 className="text-xl font-semibold">
        {todo ? "Edit Todo" : "Create Todo"}
      </h2>

      {error && (
        <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="mt-5 space-y-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Todo title"
          required
          className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-black"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          rows={4}
          className="w-full resize-none rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-black"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />

          <span className="text-sm">
            Completed
          </span>
        </label>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-black px-5 py-3 font-medium text-white hover:bg-gray-800 disabled:opacity-50"
          >
            {loading
              ? "Saving..."
              : todo
              ? "Update Todo"
              : "Create Todo"}
          </button>

          {todo && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg border px-5 py-3 font-medium hover:bg-gray-50"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
}