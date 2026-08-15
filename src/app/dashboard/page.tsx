"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/Navbar";
import TodoForm from "@/components/TodoForm";

import {
  deleteTodo,
  getMe,
  getTodos,
  Todo,
  User,
} from "@/lib/api";

import {
  clearTokens,
  getAccessToken,
} from "@/lib/auth";

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);

  const [editingTodo, setEditingTodo] =
    useState<Todo | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadData() {
    const token = getAccessToken();

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const [currentUser, todoList] =
        await Promise.all([
          getMe(token),
          getTodos(token),
        ]);

      setUser(currentUser);
      setTodos(todoList);
    } catch (err) {
      clearTokens();
      router.push("/login");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleDelete(id: number) {
    const token = getAccessToken();

    if (!token) {
      router.push("/login");
      return;
    }

    const confirmed = window.confirm(
      "Delete this todo?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteTodo(token, id);

      setTodos((current) =>
        current.filter((todo) => todo.id !== id)
      );

      if (editingTodo?.id === id) {
        setEditingTodo(null);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not delete todo"
      );
    }
  }

  function handleSaved(todo: Todo) {
    setTodos((current) => {
      const exists = current.some(
        (item) => item.id === todo.id
      );

      if (exists) {
        return current.map((item) =>
          item.id === todo.id ? todo : item
        );
      }

      return [todo, ...current];
    });

    setEditingTodo(null);
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="mx-auto max-w-6xl px-6 py-8">
        <div>
          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>

          {user && (
            <p className="mt-2 text-gray-600">
              Welcome, {user.username}
            </p>
          )}
        </div>

        {error && (
          <div className="mt-6 rounded-lg bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        <div className="mt-8 grid gap-8 lg:grid-cols-[380px_1fr]">
          <div>
            <TodoForm
              todo={editingTodo}
              onSaved={handleSaved}
              onCancel={() => setEditingTodo(null)}
            />
          </div>

          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-semibold">
                My Todos
              </h2>

              <span className="rounded-full bg-gray-200 px-3 py-1 text-sm">
                {todos.length}
              </span>
            </div>

            {todos.length === 0 ? (
              <div className="rounded-xl border bg-white p-10 text-center">
                <p className="text-gray-500">
                  No todos yet.
                </p>

                <p className="mt-1 text-sm text-gray-400">
                  Create your first todo.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {todos.map((todo) => (
                  <article
                    key={todo.id}
                    className="rounded-xl border bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex items-center gap-3">
                          <h3
                            className={`text-lg font-semibold ${
                              todo.completed
                                ? "text-gray-400 line-through"
                                : "text-gray-900"
                            }`}
                          >
                            {todo.title}
                          </h3>

                          {todo.completed && (
                            <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-700">
                              Done
                            </span>
                          )}
                        </div>

                        {todo.description && (
                          <p className="mt-2 text-gray-600">
                            {todo.description}
                          </p>
                        )}
                      </div>

                      <div className="flex shrink-0 gap-2">
                        <button
                          onClick={() =>
                            setEditingTodo(todo)
                          }
                          className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(todo.id)
                          }
                          className="rounded-lg bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}