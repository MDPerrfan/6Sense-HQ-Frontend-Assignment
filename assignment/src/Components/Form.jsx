import { useState } from "react";

export default function Form() {
  const [formData, setFormData] = useState([
    { name: "", role: "" }
  ]);

  return (
    <form className="p-4 space-y-4">
      {formData.map((item, index) => (
        <div key={index} className="flex gap-2">
          <input
            type="text"
            placeholder="Enter name"
            className="border p-2 w-full"
          />

          <select className="border p-2 w-full">
            <option value="">Select role</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
          </select>
        </div>
      ))}
    </form>
  );
}