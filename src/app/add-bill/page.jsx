import BillForm from "./BillForm";

export const metadata = {
  title: "Add Bill",
  description: "Create a new bill",
};

export default function AddBillPage() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans p-8">
      <main className="mx-auto max-w-2xl rounded-md bg-white  p-8 shadow">
        <h1 className="text-2xl font-semibold text-black">
          Add a Bill
        </h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Use this form to create a new bill.
        </p>

        <div className="mt-6">
          <BillForm />
        </div>
      </main>
    </div>
  );
}