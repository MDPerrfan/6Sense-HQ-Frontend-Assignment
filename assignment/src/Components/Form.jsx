import { useState } from "react";
import { Minus, Plus } from "lucide-react";

export default function Form() {
    const [formData, setFormData] = useState([
        { name: "", role: "" }
    ]);

    const handleOnChange = (index, field, value) => {
        const updated = [...formData];
        updated[index][field] = value;
        setFormData(updated);
    };

    const addField = () => {
        setFormData([...formData, { name: "", role: "" }]);
    };

    const deleteField = (index) => {
        const updated = formData.filter((_, i) => i !== index);
        setFormData(updated);
    };

    return (
        <div className="w-full h-screen/2 flex flex-col bg-gray-100">

            <h2 className="text-xl font-semibold py-4 text-orange-600">Information Form</h2>

            <form className="flex-1 p-4 bg-white overflow-y-auto space-y-4">

                {formData.map((item, index) => (
                    <div key={index} className="flex gap-4 items-center">

                        <input
                            type="text"
                            placeholder="Enter name"
                            className="border ml-9 border-gray-200 rounded p-2 w-full outline-none focus:border-1 focus:border-green-500 focus:ring-green-500"
                            value={item.name}
                            onChange={(e) =>
                                handleOnChange(index, "name", e.target.value)
                            }
                        />

                        <select
                            value={item.role}
                            onChange={(e) =>
                                handleOnChange(index, "role", e.target.value)
                            }
                            className="border border-gray-200 rounded p-2 w-full text-gray-500 outline-none focus:border-1 focus:border-green-500 focus:ring-green-500"
                        >
                            <option value="">Select role</option>
                            <option value="frontend">Frontend</option>
                            <option value="backend">Backend</option>
                            <option value="backend">Full Stack</option>
                            <option value="backend">QA</option>
                        </select>


                        <div className="flex items-center justify-center gap-1">
                            <button
                                type="button"
                                onClick={addField}
                                className="px-3 cursor-pointer py-2 bg-orange-400 rounded shadow-md text-white hover:bg-orange-500"
                            >
                                <Plus className="size-5" />
                            </button>

                            <button
                                type="button"
                                onClick={() => deleteField(index)}
                                className={`px-3 py-2 cursor-pointer bg-gray-400 rounded shadow-md text-white hover:bg-gray-500 
                                ${formData.length === 1 ? "invisible pointer-events-none" : "visible"}`}
                            >
                                <Minus className="size-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </form>
        </div>
    );
}