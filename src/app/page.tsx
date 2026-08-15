import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900">
          Todo API
        </h1>

        <p className="mt-4 max-w-xl text-lg text-gray-600">
          A full-stack Todo application powered by Next.js and FastAPI JWT
          authentication.
        </p>

        <div className="mt-8 flex gap-4">
          <Link
            href="/login"
            className="rounded-lg bg-black px-6 py-3 font-medium text-white hover:bg-gray-800"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-900 hover:bg-gray-100"
          >
            Register
          </Link>
        </div>
      </section>
    </main>
  );
}