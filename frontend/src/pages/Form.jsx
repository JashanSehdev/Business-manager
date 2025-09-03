import React,{useState} from 'react'

const Form = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
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
    <div>
        <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input 
          type="text" 
          id="name" 
          name='name'
          value={formData.name} 
          onChange={handleChange} 
        />

        <label htmlFor="email">Email</label>
        <input 
          type="email" 
          id="email" 
          name='email'
          value={formData.email} 
          onChange={handleChange} 
        />

        <label htmlFor="phone">Phone</label>
        <input 
          type="tel" 
          id="phone" 
          name='phone'
          value={formData.phone} 
          onChange={handleChange} 
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Form