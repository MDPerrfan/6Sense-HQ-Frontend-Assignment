import { useState } from "react";
import { Minus, Plus, Send } from "lucide-react";

export default function Form() {
    const [formData, setFormData] = useState([{ name: "", role: "" }]);
    const [errors, setErrors] = useState([{ name: "", role: "" }]);
    const [submittedData, setSubmittedData] = useState([]);

    const handleOnChange = (index, field, value) => {
        const updated = [...formData];
        updated[index][field] = value;
        setFormData(updated);
        const updatedErrors = [...errors];
        updatedErrors[index][field] = "";
        setErrors(updatedErrors);
    };

    const addField = () => {
        setFormData([...formData, { name: "", role: "" }]);
        setErrors([...errors, { name: "", role: "" }]);
    };

    const deleteField = (index) => {
        if (formData.length > 1) {
            const updatedData = formData.filter((_, i) => i !== index);
            const updatedErrors = errors.filter((_, i) => i !== index);
            setFormData(updatedData);
            setErrors(updatedErrors);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = formData.map((item) => ({
            name: !item.name.trim() ? "Name is required" : "",
            role: !item.role ? "Role is required" : "",
        }));

        setErrors(newErrors);

        const isValid = newErrors.every(
            (err) => !err.name && !err.role
        );

        if (isValid) {
            setSubmittedData([...formData]);
            setFormData([{ name: "", role: "" }]);
            setErrors([{ name: "", role: "" }]);
        }
    };

    return (
        <div className="w-full min-h-screen bg-gray-100 p-4 md:p-8 py-4 md:py-20">
            <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
                <div className="bg-orange-500 p-6">
                    <h2 className="text-2xl font-bold text-white">
                        Information Form
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="max-h-[400px] overflow-y-auto space-y-6 pr-2 mb-6">
                        {formData.map((item, index) => (
                            <div key={index} className="space-y-2">
                                <div className="flex flex-col md:flex-row gap-4 items-start">

                                    {/* Input */}
                                    <div className="flex-1 w-full">
                                        <input
                                            type="text"
                                            placeholder="Enter name"
                                            value={item.name}
                                            onChange={(e) =>
                                                handleOnChange(index, "name", e.target.value)
                                            }
                                            className={`border rounded-lg p-3 w-full outline-none transition-all focus:ring-2 ${
                                                errors[index]?.name
                                                    ? "border-red-500 focus:ring-red-200"
                                                    : "border-gray-200 focus:border-orange-400 focus:ring-orange-100"
                                            }`}
                                        />
                                        {errors[index]?.name && (
                                            <p className="text-red-500 text-xs mt-1 ml-1 italic">
                                                {errors[index].name}
                                            </p>
                                        )}
                                    </div>

                                    {/* Select */}
                                    <div className="flex-1 w-full">
                                        <select
                                            value={item.role}
                                            onChange={(e) =>
                                                handleOnChange(index, "role", e.target.value)
                                            }
                                            className={`border rounded-lg p-3 w-full outline-none transition-all focus:ring-2 appearance-none bg-white ${
                                                errors[index]?.role
                                                    ? "border-red-500 focus:ring-red-200"
                                                    : "border-gray-200 focus:border-orange-400 focus:ring-orange-100"
                                            }`}
                                        >
                                            <option value="">Select role</option>
                                            <option value="Frontend">Frontend</option>
                                            <option value="Backend">Backend</option>
                                            <option value="Full Stack">Full Stack</option>
                                            <option value="QA">QA</option>
                                        </select>
                                        {errors[index]?.role && (
                                            <p className="text-red-500 text-xs mt-1 ml-1 italic">
                                                {errors[index].role}
                                            </p>
                                        )}
                                    </div>

                                    {/* Buttons */}
                                    <div className="flex gap-2 pt-1">
                                        {index === formData.length - 1 && (
                                            <button
                                                type="button"
                                                onClick={addField}
                                                className="p-3 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition-colors shadow-sm"
                                            >
                                                <Plus className="size-5" />
                                            </button>
                                        )}

                                        <button
                                            type="button"
                                            onClick={() => deleteField(index)}
                                            className={`p-3 bg-gray-400 text-white rounded-lg transition-all shadow-sm ${
                                                formData.length === 1
                                                    ? "opacity-0 pointer-events-none"
                                                    : "hover:bg-gray-500"
                                            }`}
                                        >
                                            <Minus className="size-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                        <button
                            type="submit"
                            className="flex items-center justify-center gap-2 w-full md:w-auto px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all transform active:scale-95 shadow-lg"
                        >
                            <Send className="size-4" />
                            Submit Information
                        </button>
                    </div>
                </form>

                {/* Table Output */}
                <div className="bg-gray-50 p-6 border-t border-gray-200">
                    <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
                        <span className="w-2 h-6 bg-orange-500 rounded-full"></span>
                        Form State
                    </h3>

                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="w-full text-left bg-white">
                            <thead className="bg-gray-100 text-gray-600 uppercase text-xs font-bold">
                                <tr>
                                    <th className="px-4 py-3 border-b">ID</th>
                                    <th className="px-4 py-3 border-b">Name</th>
                                    <th className="px-4 py-3 border-b">Role</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {submittedData.length > 0 ? (
                                    submittedData.map((data, idx) => (
                                        <tr key={idx} className="hover:bg-orange-50 transition-colors">
                                            <td className="px-4 py-3 text-gray-500 font-mono">
                                                #{idx + 1}
                                            </td>
                                            <td className="px-4 py-3 font-medium text-gray-800">
                                                {data.name}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-sm">
                                                    {data.role}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="3"
                                            className="px-4 py-8 text-center text-gray-400 italic"
                                        >
                                            No data submitted yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}