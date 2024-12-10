import { useState } from "react";

const PersonForm = ({
    classes,
    formStudent,
    setFormStudent,
    handleSaveStudent,
    handleUpdateStudent,
}) => {
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setFormStudent((values) => ({ ...values, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (formStudent.id) {
            handleUpdateStudent(formStudent);
        } else {
            const student = { ...formStudent };
            delete student.id;

            handleSaveStudent(student);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="id">Id</label>
            <input
                id="id"
                name="id"
                value={formStudent.id}
                type="number"
                readOnly
                placeholder="id"
                onChange={handleChange}
            />
            <label htmlFor="name">Name</label>
            <input
                id="name"
                name="name"
                value={formStudent.name}
                type="text"
                placeholder="Enter name"
                onChange={handleChange}
            />
            <label htmlFor="age">Age</label>
            <input
                id="age"
                name="age"
                value={formStudent.age}
                type="number"
                min="1"
                max="120"
                placeholder="Enter age"
                onChange={handleChange}
            />
            <label htmlFor="email">Email</label>
            <input
                id="email"
                name="email"
                type="email"
                value={formStudent.email}
                placeholder="Enter email"
                onChange={handleChange}
            />
            <label htmlFor="classes">Class</label>
            <select id="classes" name="classes">
                <option value="Math 101">Math 101</option>
                <option value="History 201">History 201</option>
            </select>
            <button type="submit">Save</button>
        </form>
    );
};

export default PersonForm;
