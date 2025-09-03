import React,{useState} from 'react'

const Supplier = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        city: '',
        state: '',
        phone: ''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name] : value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        const data = JSON.stringify(formData);
        fetch('http://localhost:3000/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        })
        .then(response => response.text())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    
   



    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-12">
                <div className="border-b border-white/10 pb-12">
                    <h2 className="text-base/7 font-semibold text-white">Supplier Information</h2>
                    <p className="mt-1 text-sm/6 text-gray-400">Use a permanent address where you can receive mail.</p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="first-name" className="block text-sm/6 font-medium text-white">Supplier name</label>
                            <div className="mt-2">
                                <input require ="true" value={formData.name} onChange={handleChange} id="first-name" type="text" name="name" autoComplete="given-name" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="email" className="block text-sm/6 font-medium text-white">Email address</label>
                            <div className="mt-2">
                                <input value={formData.email} onChange={handleChange} id="email" type="email" name="email" autoComplete="email" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                            </div>
                        </div>

                        <div className="sm:col-span-2 sm:col-start-1">
                            <label htmlFor="city" className="block text-sm/6 font-medium text-white">City</label>
                            <div className="mt-2">
                                <input value={formData.city} onChange={handleChange} id="city" type="text" name="city" autoComplete="address-level2" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="region" className="block text-sm/6 font-medium text-white">State</label>
                            <div className="mt-2">
                                <input id="state" value={formData.state} onChange={handleChange}type="text" name="state" autoComplete="address-level1" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="phone" className="block text-sm/6 font-medium text-white">Contact number</label>
                            <div className="mt-2">
                                <input id="phone" value={formData.phone} onChange={handleChange} type="text" name="phone" autoComplete="address-level1" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                            </div>
                        </div>

                    </div>
                </div>


            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm/6 font-semibold text-white">Cancel</button>
                <button type="submit" className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">next</button>
            </div>
        </form>

    )
}

export default Supplier