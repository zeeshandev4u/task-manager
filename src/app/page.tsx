import TaskPage from "@/components/Task/TaskPage";

export default async function Home() {
  return (
    <div className="min-h-screen">
      <h2 className="text-center font-bold text-4xl pt-11 text-gray-900">Manage Your Tasks</h2>
      <TaskPage />
    </div>
  );
}
