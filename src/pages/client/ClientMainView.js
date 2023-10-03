import React, { useState } from 'react';

const uData =  {
  name: 'ferit',
  email: 'feritzcan93@gmail.com',
  surname: 'ozcan',
  phone: '5325596676',
  taxType: 1,
  files: [
    {
      fileName: null,
      fileUrl: null,
      fileStatus: 0,
      requiredFileDetails: {
        index: 0,
        fileName: 'Şengen Vize Başvuru Formu',
        helpLink: 'https://www.google.com',
        exampleDocumentLink: null,
        description:
          'Lütfen shengen vize başvuıru formunu doldurduktan sonra indiriniz.\\n sadasdsadsadsaasd',
        uploadRequired: true,
        id: 1,
      },
      id: 7,
    },
    {
      fileName: null,
      fileUrl: null,
      fileStatus: 0,
      requiredFileDetails: {
        index: 0,
        fileName: 'Uçak Biletleri',
        helpLink: 'https://www.google.com',
        exampleDocumentLink: null,
        description: 'DSAADSDASDSADSAAAADSASDSDA',
        uploadRequired: true,
        id: 2,
      },
      id: 8,
    },
    {
      fileName: null,
      fileUrl: null,
      fileStatus: 2,
      requiredFileDetails: {
        index: 0,
        fileName: 'Otel Biletleri',
        helpLink: 'https://www.google.com',
        exampleDocumentLink: null,
        description:
          'Lütfen shengen vize başvuıru formunu doldurduktan sonra indiriniz.\\n sadasdsadsadsaasd',
        uploadRequired: true,
        id: 3,
      },
      id: 9,
    },
    {
      fileName: null,
      fileUrl: null,
      fileStatus: 1,
      requiredFileDetails: {
        index: 0,
        fileName: 'Only Student',
        helpLink: 'https://www.google.com',
        exampleDocumentLink: null,
        description: 'adsadsdsasdas',
        uploadRequired: true,
        id: 4,
      },
      id: 10,
    },// Store an array of file objects
  ]
}

function CustomerForm() {
  const [customerData, setCustomerData] = useState(uData);

  const [customers, setCustomers] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData({
      ...customerData,
      [name]: value,
    });
  };

  const handleFileChange = (e, index) => {
    const files = Array.from(e.target.files);
    console.log(files);
    const updatedFiles = [...customerData.files];
    updatedFiles[index] = files; // Update the files at the specified index
    setCustomerData({
      ...customerData,
      files: updatedFiles.name,
      ...requiredFileDetails
    });
  };

  const handleAddCustomer = () => {
    // Ensure that all required fields are filled
    if (!customerData.name || !customerData.email || !customerData.surname) {
      alert('Please fill in all required fields (Name, Email, Surname)');
      return;
    }

    // Create a new customer object
    const newCustomer = {
      ...customerData,
      taxType: 1,
      id: customers.length + 1, // Assign a unique ID for the new customer
    };

    // Add the new customer to the list
    setCustomers([...customers, newCustomer]);

    // Reset the form fields (except for files)
    setCustomerData({
      name: '',
      email: '',
      surname: '',
      phone: '',
      files: customerData.files, // Preserve uploaded files
    });
  };

  return (
    <div>
      <h1>Customer Information</h1>
      <form>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={customerData.name}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={customerData.email}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="surname">Surname:</label>
        <input
          type="text"
          id="surname"
          name="surname"
          value={customerData.surname}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="phone">Phone:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={customerData.phone}
          onChange={handleChange}
        />
        <br />

        {customerData.files.map((file, index) => (
          <div key={index}>
            <label htmlFor={`file_${index}`}>Upload: {file.requiredFileDetails.fileName}</label>
            <input
              type="file"
              id={`file_${index}`}
              name={`file_${index}`}
              onChange={(e) => handleFileChange(e, index)}
            />
            <br />
          </div>
        ))}

        <button type="button" onClick={handleAddCustomer}>
          Add Customer
        </button>
      </form>

      <h2>Current Customers</h2>
      <ul>
        {customers.map((customer, index) => (
          <li key={index}>
            {customer.name} {customer.surname}
            <ul>
              {customer.files.map((file, fileIndex) => (
                <li key={fileIndex}>
                  File Name: {file.name}, File Size: {file.size} bytes
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomerForm;
