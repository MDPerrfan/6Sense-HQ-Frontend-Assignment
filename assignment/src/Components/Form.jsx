import { useState } from "react";
import { Minus, Plus, Send } from "lucide-react";


//helper functions
const generateId = () => crypto.randomUUID();
const createRow = () => ({ id: generateId(), name: "", role: "" });

export default function Form() {
    const [formData, setFormData] = useState([createRow()]);
    const [errors, setErrors] = useState({});
    const [submittedData, setSubmittedData] = useState([]);

    // onChange function
    const handleOnChange = (id, field, value) => {

        setFormData(prev =>
            prev.map(item => item.id === id
                ? { ...item, [field]: value }
                : item)
        );

        setErrors(prev => ({ ...prev, [id]: { ...prev[id], [field]: "" } }));
    };


    // add new form  row
    const addField = () => {
        setFormData(prev => [...prev, createRow()]);
    };

    //delete form rows
    const deleteField = (id) => {
        if (formData.length > 1) {
            setFormData(prev => prev.filter(item => item.id !== id));
            setErrors(prev => {
                const updated = { ...prev };
                delete updated[id];
                return updated;
            });
        }
    };

    //Submit form data
    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};
        formData.forEach(item => {
            newErrors[item.id] = {
                name: !item.name.trim() ? "Name is required" : "",
                role: !item.role ? "Role is required" : "",
            };
        });
        setErrors(newErrors);

        const isValid = Object.values(newErrors).every(err => !err.name && !err.role);

        if (isValid) {
            setSubmittedData(prev => [...prev, ...formData]);
            setFormData([createRow()]);
            setErrors({});
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

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="max-h-[400px] overflow-y-auto space-y-6 pr-2 mb-6">
                        {formData.map((item, index) => (
                            <div key={item.id} className="space-y-2">
                                <div className="flex flex-col md:flex-row gap-4 items-start">

                                    {/* Input */}
                                    <div className="flex-1 w-full">
                                        <input
                                            type="text"
                                            placeholder="Enter name"
                                            value={item.name}
                                            onChange={(e) =>
                                                handleOnChange(item.id, "name", e.target.value)
                                            }
                                            className={`border rounded-lg p-3 w-full outline-none transition-all focus:ring-2 ${errors[item.id]?.name
                                                ? "border-red-500 focus:ring-red-200"
                                                : "border-gray-200 focus:border-orange-400 focus:ring-orange-100"
                                                }`}
                                        />
                                        {errors[item.id]?.name && (
                                            <p className="text-red-500 text-xs mt-1 ml-1 italic">
                                                {errors[item.id].name}
                                            </p>
                                        )}
                                    </div>

                                    {/* Select */}
                                    <div className="flex-1 w-full">
                                        <select
                                            value={item.role}
                                            onChange={(e) =>
                                                handleOnChange(item.id, "role", e.target.value)
                                            }
                                            className={`border rounded-lg p-3 w-full outline-none transition-all focus:ring-2 appearance-none bg-white  ${errors[item.id]?.role
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
                                        {errors[item.id]?.role && (
                                            <p className="text-red-500 text-xs mt-1 ml-1 italic">
                                                {errors[item.id].role}
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
                                            onClick={() => deleteField(item.id)}
                                            className={`p-3 bg-gray-400 text-white rounded-lg transition-all shadow-sm ${formData.length === 1
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

                    {/* Submit */}
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

                {/* Live Form State */}
                <div className="px-6 pb-6">
                    <div className="bg-orange-50 border border-orange-100 rounded-xl p-5">
                        <h3 className="text-sm font-bold text-orange-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <span className="w-2 h-5 bg-orange-500 rounded-full"></span>
                            Live Form State
                        </h3>
                        <div className="space-y-3">
                            {formData.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="flex flex-col sm:flex-row gap-1 sm:gap-6 text-gray-700"
                                >
                                    <h3 className="text-sm font-semibold text-gray-400 w-16 shrink-0">
                                        Row {index + 1}
                                    </h3>
                                    <h3 className="text-sm">
                                        <span className="text-gray-400 font-medium">Name: </span>
                                        <span className="font-semibold text-gray-700">
                                            {item.name || "—"}
                                        </span>
                                    </h3>
                                    <h3 className="text-sm">
                                        <span className="text-gray-400 font-medium">Role: </span>
                                        <span className="font-semibold text-gray-700">
                                            {item.role || "—"}
                                        </span>
                                    </h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Submitted Data Table */}
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
                                    submittedData.map((data, index) => (
                                        <tr key={data.id} className="hover:bg-orange-50 transition-colors">
                                            <td className="px-4 py-3 text-gray-500 font-mono">
                                                {index + 1}
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